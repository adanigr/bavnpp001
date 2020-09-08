const moment = require('moment-timezone');
const arraySort = require('array-sort');
const Helpers = require('./Helpers.js');
const ErrorBA = require('./ErrorBA.js');
const CalIntereses = require('./CalIntereses.js');
const XLSX = require('xlsx');
const JSZip = require("jszip");
const {
	uuid
} = require('uuidv4');
const {
	ViewFinancedItems_001,
	ViewFinList_001
} = cds.entities('BD.VN.PP.XVIEW');
const {
	FinancedItemsTransfers_001,
	FinancedItems_001,
	SegmentInterests_001
} = cds.entities('BD.VN.PP.XDATA');
const {
	InterestJobs_001,
	FinOperAccs_001
} = cds.entities('BD.VN.PP.XCFG');
const {
	CreatePolizaPmSet,
	CancelFinDocSet,
	CreateFinDocSet,
	ItemsSet,
	RetSet,
	CreatePolizaPmItemSet
} = require('../odata-client/z-od-scp-bavnpp-001-service');
module.exports = class InterestProvision {

	/**
	 *  Genera pólizas provision
	 * @param {Object} oReq petición para generar transacción
	 */
	constructor(oReq) {
		this.tx = cds.transaction(oReq);
		this.aExcel = [];
		this.aZips = [];
		this.oRes = "";
		this.sFinOper = "PR_KR";
	}

	/**
	 * Realiza los documentos de provision y calculos excel
	 */
	async doProvision() {
		this.oRes = "OK";
		try {
			//Obtener información de BD
			await Promise.all([
				this._getFinCodes(),
				this._getPeriod()
			]);
			//Obtener elementos a sumar
			await Promise.all([
				this._getUnitsFin(),
				this._getTransfItems(),
				this._getUnitsPag()
			]);
			//Separar por Segmentos
			await this._generateSegmentSum();

			await Promise.all([
				//Generar doc. excel
				this._genXlsx(),
				//Generar doc. Fi.
				this._genFIDocs()
			]);
			//Envío por correo
			//TODO: Conectar a servicio envio de correo y enviar archivos ZIP
		} catch (ex) {
			console.log(ex);
			return ex.message;
		}
		return this.oRes;
	}

	/**
	 * Obtiene periodo a generar de la tabla InterestJobs_001
	 */
	async _getPeriod() {
		var oQuery = SELECT.from(InterestJobs_001, [
				"period"
			])
			.where({
				indProvision: false
			})
			.orderBy({
				period: "asc"
			}).groupBy(
				"period"
			).limit(1, 0);
		var oRes = await cds.run(oQuery);
		if (oRes.length === 0) {
			throw new ErrorBA("No hay periodo configurado InterestJobs_001");
		}
		this.sPeriod = oRes[0].period;
		oQuery = SELECT.from(InterestJobs_001)
			.where({
				indProvision: false,
				period: this.sPeriod
			});
		this.aJobs = await this.tx.run(oQuery);
		return;
	}

	/**
	 * Obtener lista de financieras
	 */
	async _getFinCodes() {
		var oQuery = SELECT
			.from(ViewFinList_001)
			.where({
				flagSaveInt: true
			});
		this.aFinCodes = await this.tx.run(oQuery);
	}

	/**
	 * Obtener unidades FIN
	 */
	async _getUnitsFin() {
		var oDateEnd = moment(this.sPeriod + "01", "YYYYMMDD").endOf('month');
		var sWhere = "dateStart <= '" + oDateEnd.format("YYYY-MM-DD") + "' " +
			"AND status_status = 'FIN' " +
			"AND flagSaveInt = true  " +
			"AND center IN (";
		var aCenter = [];
		this.aJobs.forEach(x => {
			aCenter.push("'" + x.sapVKORG + "'");
		});
		sWhere = sWhere + aCenter.join() + ")";
		var oWhere = cds.parse.expr(sWhere);
		var oQuery = SELECT
			.from(ViewFinancedItems_001)
			.where(oWhere);
		var aUnits = await this.tx.run(oQuery);
		var aPromise = [];
		var oDate = moment(this.sPeriod + "01", "YYYYMMDD").endOf('month');
		aUnits.forEach(x => {
			let calIntereses = new CalIntereses(x);
			aPromise.push(calIntereses.getInterests(oDate));
		});
		var aRes = await Promise.all(aPromise);
		aRes = aRes.filter(x => x.intMonthSum > 0);
		aRes.forEach(x => {
			this.aExcel.push({
				"FIN": x.finSrv_finCode,
				"BUKRS": x.companyCode,
				"VKORG": x.center,
				"SEGMENT": x.segment,
				"WAERK": x.currency,
				"CHASIS": x.serial,
				"TIPO": "FINANCIADO",
				"FECHA": oDate.format("YYYY-MM-DD"),
				"IMPFIN": x.financedAmt,
				"SALFIN": x.balanceAmt,
				"INTERES": x.intMonthSum,
				"DIAS": x.intMonthDay,
				"IMPPAG": x.payedAmt
			});
		});
		return;
	}

	/**
	 * Obtener unidades TRASPASADAS
	 */
	async _getTransfItems() {
		var oDateStart = moment(this.sPeriod + "01", "YYYYMMDD").startOf('month');
		var oDateEnd = moment(this.sPeriod + "01", "YYYYMMDD").endOf('month');
		var sWhere = "flagReverse = false AND oldFinCode IN (";
		var aCenter = [];
		this.aFinCodes.forEach(x => {
			aCenter.push("'" + x.finCode + "'");
		});
		sWhere = sWhere + aCenter.join() + ")";
		sWhere = sWhere + " AND dateStart BETWEEN '" +
			oDateStart.format("YYYY-MM-DD") + "' AND '" +
			oDateEnd.format("YYYY-MM-DD") + "'";
		var oWhere = cds.parse.expr(sWhere);
		var oQuery = SELECT
			.from(FinancedItemsTransfers_001, [
				"oldFinItemID",
				"interestAmt",
				"dateStart"
			])
			.where(oWhere);
		var aTransfers = await this.tx.run(oQuery);
		if (aTransfers.length === 0) {
			return;
		}
		var aIDs = aTransfers.map(x => {
			return "'" + x.oldFinItemID + "'"
		});
		sWhere = "ID IN (" + aIDs.join() + ")";
		oWhere = cds.parse.expr(sWhere);
		oQuery = SELECT
			.from(FinancedItems_001, [
				"ID",
				"finSrv.finCode",
				"companyCode",
				"center",
				"segment",
				"serial",
				"currency",
				"financedAmt",
				"payedAmt",
				"intMonthDay",
			])
			.where(oWhere);
		var aItems = await this.tx.run(oQuery);
		aItems.forEach(x => {
			var y = aTransfers.find(z => z.oldFinItemID === x.ID);
			var iDays = moment(y.dateStart).diff(moment(oDateStart), 'days');
			this.aExcel.push({
				"FIN": x.finSrv.finCode,
				"BUKRS": x.companyCode,
				"VKORG": x.center,
				"SEGMENT": x.segment,
				"WAERK": x.currency,
				"CHASIS": x.serial,
				"TIPO": "TRASPASO",
				"FECHA": y.dateStart,
				"IMPFIN": x.financedAmt,
				"SALFIN": y.balanceAmt,
				"INTERES": y.interestAmt,
				"DIAS": iDays,
				"IMPPAG": x.payedAmt
			});
		});
	}

	/**
	 * Ordenar unidades pagadas
	 */
	async _getUnitsPag() {
		var oDateStart = moment(this.sPeriod + "01", "YYYYMMDD").startOf('month');
		var oDateEnd = moment(this.sPeriod + "01", "YYYYMMDD").endOf('month');
		var sWhere = "dateStart <= '" + oDateEnd.format("YYYY-MM-DD") + "' " +
			"AND dateLastPay " +
			"BETWEEN '" + oDateStart.format("YYYY-MM-DD") + "' " +
			"AND '" + oDateEnd.format("YYYY-MM-DD") + "' " +
			"AND status_status = 'PAG' " +
			"AND flagSaveInt = true  " +
			"AND center IN (";
		var aCenter = [];
		this.aJobs.forEach(x => {
			aCenter.push("'" + x.sapVKORG + "'");
		});
		sWhere = sWhere + aCenter.join() + ")";
		var oWhere = cds.parse.expr(sWhere);
		var oQuery = SELECT
			.from(ViewFinancedItems_001)
			.where(oWhere);
		var aUnits = await this.tx.run(oQuery);
		var aPromise = [];
		var oDate = moment(this.sPeriod + "01", "YYYYMMDD").endOf('month');
		aUnits.forEach(x => {
			let calIntereses = new CalIntereses(x);
			aPromise.push(calIntereses.getInterests(oDate));
		});
		var aRes = await Promise.all(aPromise);
		aRes = aRes.filter(x => x.intMonthSum > 0);
		aRes.forEach(x => {
			this.aExcel.push({
				"FIN": x.finSrv_finCode,
				"BUKRS": x.companyCode,
				"VKORG": x.center,
				"SEGMENT": x.segment,
				"WAERK": x.currency,
				"CHASIS": x.serial,
				"TIPO": "PAGADO",
				"FECHA": oDate.format("YYYY-MM-DD"),
				"IMPFIN": x.financedAmt,
				"SALFIN": x.balanceAmt,
				"INTERES": x.intMonthSum,
				"DIAS": x.intMonthDay,
				"IMPPAG": x.payedAmt
			});
		});
		return;
	}

	/**
	 * Sumarizar por división y segmentos
	 */
	_generateSegmentSum() {
		//Odenar por llaves:
		this.aExcel = arraySort(this.aExcel, ["FIN", "BUKRS", "VKORG", "SEGMENT", "WAERK", "CHASIS", "TIPO"]);
		this.aSegmentSum = [];
		this.aExcel.forEach(x => {
			this._generateSegmentSumLine(x);
		}, this);
	}

	/**
	 * Procesa cada línea de forma individual para sumar al segmento
	 */
	_generateSegmentSumLine(oLine) {
		//Si el segmento se le va a generar la póliza KR Definitiva, entonces no entra aquí
		var oFinKrDef = this.aFinCodes.find(x =>
			x.flagSaveIntKR === true &&
			x.finCode === oLine.FIN &&
			x.companyCode === oLine.BUKRS
		);
		if (oFinKrDef !== undefined) {
			return;
		}
		//Buscar si ya existe para sumarizar
		var oNewLine = this.aSegmentSum.find(x =>
			x.finCode === oLine.FIN &&
			x.currency === oLine.WAERK &&
			x.sapVKORG === oLine.VKORG &&
			x.sapSEGMENT === oLine.SEGMENT
		);
		//Si no existe crear
		if (oNewLine === undefined) {
			oNewLine = {
				finCode: oLine.FIN,
				currency: oLine.WAERK,
				sapVKORG: oLine.VKORG,
				sapGJAHR: this.sPeriod.substr(0, 4),
				sapMONAT: this.sPeriod.substr(4, 6),
				sapSEGMENT: oLine.SEGMENT,
				docAmt: 0,
				sapBELNRKZ: "",
				sapBUKRSKZ: oLine.BUKRS,
				sapGJAHRKZ: "",
				sapSTBLGKZ: ""
			}
			this.aSegmentSum.push(oNewLine);
		}
		//Sumarizar
		oNewLine.docAmt += Number(oLine.INTERES);
		oNewLine.docAmt = Number(Number(oNewLine.docAmt).toFixed(2));
	}

	/**
	 * Generar Excel por división 
	 */
	async _genXlsx() {
		//Separar arreglos por división
		this.oExcelDiv = {};
		this.aExcel.forEach(x => {
			this.genXlsxLine(x)
		}, this);
		this.aFiles = [];
		var aPromise = [];
		for (var sVkorg in this.oExcelDiv) {
			aPromise.push(this.genXlsxLineData(this.oExcelDiv[sVkorg], sVkorg));
		}
		this.aZips = await Promise.all(aPromise);
		return;
	}

	/**
	 * Obtiene las líneas por cada división
	 * @param {object} oLine Línea de this.oExcelDiv ({BBVA: [], CORP: [], ...})
	 * @param {string} sVkorg División financiera
	 * @returns {Array} Lista de archivos ZIP
	 */
	async genXlsxLineData(oLine, sVkorg) {
		var aPromise = [];
		for (var sFinCode in oLine) { //VKORG this.oExcelDiv
			aPromise.push(this.genXlsxLineDataFinCodeFin(oLine[sFinCode], sVkorg, sFinCode));
		}
		var aXlsxLines = await Promise.all(aPromise);
		var oZip = new JSZip();
		//Generar ZIP
		aXlsxLines.forEach(oFile => {
			oZip.file(oFile.name, oFile.file, {
				base64: true
			});
		});
		var oZip64 = await oZip.generateAsync({
			type: "base64"
		});
		return {
			vkorg: sVkorg,
			fileName: sVkorg + "_PROVISION_INTERESES_" + this.sPeriod + ".zip",
			zipFile: oZip64
		};
	}

	/**
	 * Obtiene las líneas por cada financiera
	 * @param {Array} aLineData Información de División/Financiera
	 * @param {string} sVkorg Nombre de la división
	 * @param {string} sFinCode Nombre de la financiera
	 * @returns {object} Archivo excel por división/financiera
	 */
	async genXlsxLineDataFinCodeFin(aLineData, sVkorg, sFinCode) {
		//Generar Excel por División
		var oWb = XLSX.utils.book_new();
		var sWsName = sVkorg + "_" + sFinCode;
		var aWsData = [
			["FINANCIERA", "SOCIEDAD", "DIVISION", "SEGMENTO", "MONEDA DOC",
				"VIN", "TIPO REGISTRO", "FECHA", "IMPORTE FINANCIAR", "SALDO FINANCIAR",
				"INTERESES", "DIAS INTERES", "IMPORTE PAGADO",
			],
			...aLineData.map(x => {
				return [
					x.FIN, x.BUKRS, x.VKORG, x.SEGMENT, x.WAERK,
					x.CHASIS, x.TIPO, x.FECHA, x.IMPFIN, x.SALFIN,
					x.INTERES, x.DIAS, x.IMPPAG
				]
			})
		];
		var oWs = XLSX.utils.aoa_to_sheet(aWsData);
		XLSX.utils.book_append_sheet(oWb, oWs, sWsName);
		var oWbBin = XLSX.write(oWb, {
			bookType: 'xlsx',
			type: 'base64'
		});
		return {
			name: "PROVISION_" + sVkorg + "_" + sFinCode + "_" + this.sPeriod + ".xlsx",
			file: oWbBin
		};
	}

	/**
	 * Mueves las líneas a su división
	 * @param {object} oLine Línea arreglo this.aExcel
	 * 	this.oExcelDiv.4100 = [DAIMLER: []] 
	 * 	this.oExcelDiv.4100 = [BBVA: []] 
	 */
	genXlsxLine(oLine) {
		//Verifica si existe esa división en el arreglo principal.
		if (this.oExcelDiv[oLine.VKORG] === undefined) {
			Object.defineProperty(this.oExcelDiv, oLine.VKORG, {
				enumerable: true,
				configurable: true,
				writable: true,
				value: {}
			});
		}
		var oObjectVkorg = this.oExcelDiv[oLine.VKORG];
		if (oObjectVkorg[oLine.FIN] === undefined) {
			Object.defineProperty(oObjectVkorg, oLine.FIN, {
				enumerable: true,
				configurable: true,
				writable: true,
				value: []
			});
		}
		var oObjectFin = oObjectVkorg[oLine.FIN];
		oObjectFin.push(oLine);
	}

	/**
	 * Generar Doc FI
	 */
	async _genFIDocs() {
		await this.getConfigFIDocs();
		this.aSegmentSum.forEach(x => {
			this._genFIDocsFIKZ(x);
		}, this);
		//Insertar resultados en tabla
		var aInsert = this.aSegmentSum.filter(x => x.sapBELNRKZ !== "");
		if (aInsert.length === 0) {
			return;
		}
		this.oRes = "";
		aInsert.forEach(x => {
			this.oRes = this.oRes +
				x.sapBELNRKZ + x.sapBUKRSKZ + x.sapGJAHRKZ + "|"
		});
		var oQuery =
			INSERT.into(SegmentInterests_001).entries(aInsert);
		try {
			var res = await this.tx.run(oQuery);
		} catch (err) {
			console.log(err);
			throw new ErrorBA("Error desconocido _genFIDocs");
		}
	}

	/**
	 *Obtiene la configuración de cuentas y centros costo
	 */
	async getConfigFIDocs() {
		var aSapVKORG = [];
		var aSapSEGMENT = [];
		this.aSegmentSum.forEach(x => {
			var sVkorg = "'" + x.sapVKORG + "'";
			var sSegment = "'" + x.sapSEGMENT + "'";
			if (!aSapVKORG.includes(sVkorg)) {
				aSapVKORG.push(sVkorg);
			}
			if (!aSapSEGMENT.includes(sSegment)) {
				aSapSEGMENT.push(sSegment);
			}
		});
		var sWhere = "sapFINOPER = '" + this.sFinOper + "' " +
			"AND sapVKORG IN (" + aSapVKORG.join() + ") " +
			"AND sapSEGMENT IN (" + aSapSEGMENT.join() + ") ";
		var oWhere = cds.parse.expr(sWhere);
		var oQuery = SELECT.from(FinOperAccs_001).where(oWhere);
		this.aFinOperAccs_001 = await this.tx.run(oQuery);
		return;
	}

	/**
	 * Generar documentos KR para provisión
	 */
	async _genFIDocsFIKZ(oLine) {
		//console.log("------------------------");
		var oFinOperAccs = this.aFinOperAccs_001.find(x =>
			x.sapVKORG === oLine.sapVKORG &&
			x.sapSEGMENT === oLine.sapSEGMENT);
		if (oFinOperAccs === undefined) {
			// //console.log("No se va a generar póliza KR");
			// //console.log("FinOperAccs_001 No configurado para",
			// 	"finoper: " + this.sFinOper,
			// 	"vkorg: " + oLine.sapVKORG,
			// 	"segment: " + oLine.sapSEGMENT
			// );
			return;
		}
		var oFinList = this.aFinCodes.find(
			x => x.companyCode === oLine.sapBUKRSKZ &&
			x.finCode === oLine.finCode);
		//console.log("Si se va a generar póliza KR");
		// //console.log(
		// 	"finoper: " + this.sFinOper,
		// 	"fincode: " + oLine.finCode,
		// 	"currency: " + oLine.currency,
		// 	"bukrs: " + oLine.sapBUKRSKZ,
		// 	"vkorg: " + oLine.sapVKORG,
		// 	"segment: " + oLine.sapSEGMENT,
		// 	"hkont: " + oFinOperAccs.sapHKONT,
		// 	"vendorno: " + oFinList.sapLifnr,
		// 	"kostl: " + oFinOperAccs.sapKOSTL,
		// 	"docAmt: " + Number(oLine.docAmt).toFixed(2)
		// );
		try {
			await this._genFIDocsFIKZGenDoc(oLine, oFinOperAccs, oFinList);
			oLine.ID = uuid();
		} catch (ex) {
		console.log("ERROR_KR:", ex);
		}
	}

	// /**
	//  * Invoca rutinas para generar documentos FI
	//  */
	// async _genFIDocsFIKZGenDoc(oLine, oFinOperAccs, oFinList) {
	// 	//Si ya se le generó documento saltar...
	// 	if (oLine.sapBELNRKZ !== "") {
	// 		return;
	// 	}
	// 	//Obtener todas rutinas
	// 	var aItems = this.aSegmentSum.filter(x => x.sapVKORG === oLine.sapVKORG);
	// 	var itemsets = aItems.map(x => {
	// 		return CreatePolizaPmItemSet.builder()
	// 			.assignment("")
	// 			.hdid(uuid())
	// 			.account(oFinOperAccs.sapHKONT)
	// 			.costcenter(oFinOperAccs.sapKOSTL)
	// 			.vendorno(oFinList.sapLifnr)
	// 			.itemtext("PROVISION " + oLine.finCode)
	// 			.segment(x.sapSEGMENT)
	// 			.division(x.sapVKORG)
	// 			.amount(Number(x.docAmt).toFixed(2))
	// 			.build()
	// 	});
	// 	const _genkr = CreatePolizaPmSet.builder()
	// 		.hdtext("PÓLIZA PROVISION" + this.sPeriod)
	// 		.company(oLine.sapBUKRSKZ)
	// 		.finoper(this.sFinOper)
	// 		.currency(oLine.currency)
	// 		.docDate("")
	// 		.scpuser("BAVNPP001")
	// 		.scpapp("BAVNPP001")
	// 		.createPolizaPmItemSet(itemsets)
	// 		.retSet([])
	// 		.build();
	// 	let res = await CreatePolizaPmSet
	// 		.requestBuilder()
	// 		.create(_genkr)
	// 		.execute({
	// 			destinationName: Helpers.getDestinationName()
	// 		});
	// 	//console.log(JSON.stringify(res));
	// 	if (res.retSet[0].type === "S") {
	// 		let docNumbers = Helpers.getDocNumbers(res.retSet[0]);
	// 		aItems.forEach(x => {
	// 			x.sapBELNRKZ = docNumbers.belnr;
	// 			x.sapBUKRSKZ = docNumbers.bukrs;
	// 			x.sapGJAHRKZ = docNumbers.gjahr;
	// 		});
	// 		var oLog = Helpers.getDocLogEntity(uuid(), docNumbers, "", "BAVNPP001", "Registro provision", "PROVISION");
	// 		Helpers.insertLogEntries([oLog]);
	// 	} else {
	// 		Helpers.documentFIErrorLog(res.retSet, uuid());
	// 		//console.log("No se generó documento.");
	// 	}
	// }
};