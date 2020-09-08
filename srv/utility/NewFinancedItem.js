'use strict';
const moment = require('moment-timezone');
const Helpers = require('./Helpers.js');
const ErrorBA = require('./ErrorBA.js');
const FinancedItemRev = require('./FinancedItemRev.js');
const {
	CancelFinDocSet,
	CreateFinDocSet,
	ItemsSet,
	RetSet
} = require('../odata-client/z-od-scp-bavnpp-001-service');
const {
	AlmacenesSet,
	SociedadSet,
	CentrosSet,
} = require('../odata-client/z-od-scp-core-0001-service');
const {
	FilterList,
	serializeEntity,
	retrieveJwt
} = require('@sap-cloud-sdk/core'); //Permite Filtros con multiples registros DSN
const {
	uuid
} = require('uuidv4');
const {
	FinancedItems_001,
	FinancedInvoice_001 // "DSN"
} = cds.entities('BD.VN.PP.XDATA');
const {
	FIGenDocs_001
} = cds.entities('BD.VN.PP.XLOG');
module.exports = class NewFinancedItem {
	constructor(oUnit, index, sUser, sCallingApp, caractSet) {
		this.oUnit = oUnit;
		this.index = index;
		this.aCosts = [];
		this.errorLog = [];
		this.sUser = sUser;
		this.sCallingApp = sCallingApp;
		this.sDestinationName = Helpers.getDestinationName();
		this.aFinancedItem = [];
		this.caractSet = caractSet;
		this.sAPIApp = "BAVNPP001";
		moment.tz.setDefault("America/Mexico_City");

	}

	/**
	 * Hacer promesa para generar documentos
	 */
	async doPromiseRes(oMsg) {
		var ret = {
			financedItems: [],
			logs: []
		}
		var aPromise = [];
		var oDocGen = await this._sapDocumentGenerate(oMsg);
		ret.logs.push(oDocGen);
		if (oDocGen.Type !== "S") {
			ret.logs = this._integrateSAPLog(ret.logs);
		} else {
			ret.financedItems = this.getFinacedItems();
		}
		return ret;
	}

	/**
	 *  Genera documentos en SAP
	 */
	async _sapDocumentGenerate(oMsg) {
		let iLogNo = 0;
		for (const oFinancedItem of this.aFinancedItems) {
			iLogNo++;
			var res = [];
			res.push(await this._sapDocumentGenerate_KA(oFinancedItem, oMsg));
			res.push(await this._sapDocumentGenerate_1T(oFinancedItem, oMsg));
			var test = res.filter(x => x.Type !== "S");
			if (test.length !== 0) {
				oMsg = test[0];
				await this._sapDocumentAnulate_all(oFinancedItem);
				break;
			}
			oMsg = res[0];
			//await this._sapDocumentAnulate_all(oFinancedItem);
			//Guardar Log de pólizas
			//Agregar a entidades a insertar
			this.aFinancedItem.push(oFinancedItem.oFinanced);
		}
		if (oMsg.Type === "S") {
			oMsg.Type = "S";
			oMsg.Number = "1";
			oMsg.Message = "Se va a generar elemento a financiar.";
			oMsg.LogNo = "1";
			oMsg.LogMsgNo = "1";
			oMsg.MessageV1 = "Posiciones a generar en PP:" + iLogNo;
			oMsg.MessageV2 = "";
			oMsg.MessageV3 = "";
			oMsg.MessageV4 = "";
			oMsg.Parameter = "NEWFINANCEDITEM";
			oMsg.Row = "";
			oMsg.Field = "";
			oMsg.System = "SCP";
		}
		return oMsg;
	}
	static async insertFinancedItems(aFinancedItems, aRet) {
		var aNewRet = aRet.filter(x => x.Type !== "S");
		let oReturn = {
			"HdId": "",
			"Idvehi": "",
			"Type": "E",
			"Number": "1",
			"Message": "No se pudieron insertar los elementos.",
			"LogNo": "1",
			"LogMsgNo": "1",
			"MessageV1": "",
			"MessageV2": "",
			"MessageV3": "",
			"MessageV4": "",
			"Parameter": "NEWFINANCEDITEM",
			"Row": "",
			"Field": "insertFinancedItems",
			"System": "SCP"
		}

		let iLen = aFinancedItems.length;
		try {
			let oQuery = INSERT.into(FinancedItems_001).entries(aFinancedItems);
			let oRes = 0;
			if (iLen === 0) {
				oReturn.Type = "E";
				oReturn.Number = "2";
				oReturn.Message = "No hay elementos por insertar";
				aNewRet.push(oReturn);
				return aNewRet;
			}
			oRes = await cds.run(oQuery);
			var count = 1;
			for (const x of aFinancedItems) {
				var oRetFin = Object.assign({}, oReturn);
				oRetFin.HdId = x.hdId;
				oRetFin.Idvehi = x.unidadID;
				oRetFin.Type = "S";
				oRetFin.Number = count;
				oRetFin.Message = "Se ha insertado elemento en plan piso.";
				oRetFin.MessageV1 = "1T" + x.sapBELNR1T + x.sapBUKRS1T + x.sapGJAHR1T;
				oRetFin.MessageV2 = "KA" + x.sapBELNRKA + x.sapBUKRSKA + x.sapGJAHRKA;
				oRetFin.MessageV3 = x.fundSubType_ID;
				oRetFin.MessageV4 = x.ID;
				aNewRet.push(oRetFin);
				count++;
			};
		} catch (ex) {
			oReturn.Type = "E";
			oReturn.Number = "2";
			oReturn.Message = "Error desconocido insertFinancedItems";
			aNewRet.push(oReturn);
			console.log(ex);
		}
		return aNewRet;
	}
	static collectFinancedItems(aFinancedItem_1, aFinancedItem_2) {
		aFinancedItem_1.forEach(x => {
			aFinancedItem_2.push(x);
		});
		return aFinancedItem_2;
	}
	getFinacedItems() {
		return this.aFinancedItem;
	}
	async sapDocumentAnulateAll() {
		for (const oFinancedItem of this.aFinancedItems) {
			this._sapDocumentAnulate_all(oFinancedItem);
		}
	}
	async _sapDocumentAnulate_all(oFinancedItem) {
		var aAnulate = [];
		aAnulate.push(this._sapDocumentAnulate(oFinancedItem, "1T"));
		aAnulate.push(this._sapDocumentAnulate(oFinancedItem, "KA"));
		Promise.all(aAnulate);
	}

	async _sapDocumentAnulate(oFinancedItem, sType) {
		let sDocID = "";
		switch (sType) {
		case "1T":
			sDocID = oFinancedItem.sapBELNR1T + oFinancedItem.sapBUKRS1T + oFinancedItem.sapGJAHR1T;
			break;
		case "KA":
			sDocID = oFinancedItem.sapBELNRKA + oFinancedItem.sapBUKRSKA + oFinancedItem.sapGJAHRKA;
			break;
		default:
			throw "Documento desconocido";
			break;
		}
		if (sDocID === "") { //Nada que anular
			return;
		}
		const doc = CancelFinDocSet.builder()
			.idvehi(oFinancedItem.oFinanced.unidadID)
			.docid(sDocID)
			.scpuser(this.sUser)
			.scpapp(this.sAPIApp)
			.cancelind("")
			.canceldoc("")
			.build();
		try {
			let res = await CancelFinDocSet.requestBuilder().create(doc)
				.execute({
					destinationName: this.sDestinationName
				});
			switch (sType) {
			case "1T":
				oFinancedItem.sapSTBLG1T = res.canceldoc;
				break;
			case "KA":
				oFinancedItem.sapSTBLGKA = res.canceldoc;
				break;
			default:
				break;
			}
		} catch (err) {
			console.log("ERRORJCBG", err);
		}
	}

	//Limpiar ejecuciones previas:
	async clearPreviousExecutions() {
		try {
			//Eliminar financiamiento
			await this._clearPreviousExecutionsItemsDelete();
			//Eliminar documentos adicionales
			await this._clearPreviousExecutionsFIDocsDelete();
		} catch (ex) {
			console.log("clearPreviousExecutions", ex);
		}
	}

	//Elimina a nivel SCP reprocesos previos
	async _clearPreviousExecutionsItemsDelete() {
		var sQueryWhere = "hdId = '" + this.oUnit.hdId + "'" +
			" AND unidadID = '" + this.oUnit.unidadID + "'" +
			" AND status_status <> 'ANU'";
		var oQueryWhere = cds.parse.expr(sQueryWhere);
		var oQuery = SELECT.from(FinancedItems_001, ["unidadID"]).where(oQueryWhere).groupBy("unidadID");
		var oRes = await cds.run(oQuery);
		var aPromise = [];
		for (var oItem of oRes) {
			var helper = new FinancedItemRev(oItem.unidadID, this.sUser, this.sCallingApp);
			aPromise.push(helper.revUnit());
		}
		if (aPromise.length === 0) {
			return;
		}
		var res = await Promise.all(aPromise);
		console.log("clearPreviousExecutions", JSON.stringify(res));
	}

	//Elimina a nivel FI reprocesos previos
	async _clearPreviousExecutionsFIDocsDelete() {
		var sQueryWhere = "hdId = '" + this.oUnit.hdId + "'" +
			" AND unidadID = '" + this.oUnit.unidadID + "'" +
			" AND STBLG = ''";
		var oQueryWhere = cds.parse.expr(sQueryWhere);
		var oQuery = SELECT.from(FIGenDocs_001).where(oQueryWhere);
		var oRes = await cds.run(oQuery);
		var aPromise = [];
		for (var oItem of oRes) {
			aPromise.push(this._clearPreviousExecutionsFIDocsDeleteS4());
		}
		if (aPromise.length === 0) {
			return;
		}
		var res = await Promise.all(aPromise);
		console.log("clearPreviousExecutions", JSON.stringify(res));
	}

	//Elimina en S4 en caso de ser un reproceso
	async _clearPreviousExecutionsFIDocsDeleteS4(oItem) {
		let sDocID = oItem.BELNR + oItem.BUKRS + oItem.GJAHR;
		//Anular en SAP:
		let doc = CancelFinDocSet.builder()
			.idvehi(this.oUnit.unidadID)
			.docid(sDocID)
			.scpuser(this.sUser)
			.scpapp(this.sCallingApp)
			.cancelind("")
			.canceldoc("")
			.build();
		let res = await CancelFinDocSet.requestBuilder().create(doc)
			.execute({
				destinationName: Helpers.getDestinationName()
			});
		Helpers.updateLogSTBLG(oItem.BELNR, oItem.BUKRS, oItem.GJAHR, res.canceldoc);
	}

	//Uno
	async _sapDocumentGenerate_1T(oFinancedItem, oMsg) {
		var oNewMsg = Object.assign({}, oMsg);
		const _1T = CreateFinDocSet.builder()
			.hdid(oFinancedItem.hdId)
			.idvehi(oFinancedItem.oFinanced.unidadID)
			.vin(oFinancedItem.oFinanced.serial)
			.account(oFinancedItem.oFinanced.accIncome)
			.company(oFinancedItem.oFinanced.companyCode)
			.finoper(oFinancedItem.aCosts[0].sap1T_Code)
			.hdtext(oFinancedItem.aCosts[0].sap1T_Text)
			.docDate(moment(oFinancedItem.oFinanced.dateStart).format("YYYYMMDD"))
			.scpuser(this.sUser)
			.scpapp(this.sAPIApp)
			.itemsSet([
				ItemsSet.builder()
				.hdid(oFinancedItem.hdId)
				.assignment(Helpers.getVinReference(oFinancedItem.oFinanced.serial))
				.vendorNo(this.ViewFinSrvCredits_001.sapLifnr)
				.segment(oFinancedItem.oFinanced.segment)
				.division(oFinancedItem.oFinanced.center)
				.itemtext("INGRESOS FINANCIERA")
				.currency(oFinancedItem.oFinanced.currency)
				.amount(oFinancedItem.oFinanced.financedAmt)
				.build()
			])
			.retSet([])
			.build();
		try {
			let res = await CreateFinDocSet
				.requestBuilder()
				.create(_1T)
				.execute({
					destinationName: this.sDestinationName
				});
			//console.log("RESPUESTAJCBG 1T", JSON.stringify(res));
			if (res.retSet[0].type !== "S") {
				oNewMsg.Type = "E";
				oNewMsg.ID = "S4";
				oNewMsg.Field = "CreateFinDocSet";
				oNewMsg.Message = "Error en generación póliza 1T";
				oNewMsg.MessageV1 = "sapDocumentGenerate";
				oNewMsg.MessageV2 = "_sapDocumentGenerate_1T";
				oNewMsg.MessageV3 = oFinancedItem.oFinanced.financedAmt.toString();
				oNewMsg.MessageV4 = oFinancedItem.oFinanced.currency;
				this._addErrorsSAP(res.retSet);
			} else {
				oNewMsg.Type = "S";
				oNewMsg.Message = "Generación póliza 1T OK";
				let docNumbers = Helpers.getDocNumbers(res.retSet[0]);
				var oLog = Helpers.getDocLogEntity(oFinancedItem.oFinanced.unidadID, docNumbers, "", this.sUser, "Nueva financiera: Documento 1T",
					"NEWFINANCEDITEM_1T", oFinancedItem.hdId);
				Helpers.insertLogEntries([oLog]);
				oFinancedItem.sapBELNR1T = docNumbers.belnr;
				oFinancedItem.sapBUKRS1T = docNumbers.bukrs;
				oFinancedItem.sapGJAHR1T = docNumbers.gjahr;
				oFinancedItem.sapBLART1T = docNumbers.blart;
				oFinancedItem.oFinanced.sapBELNR1T = oFinancedItem.sapBELNR1T;
				oFinancedItem.oFinanced.sapBUKRS1T = oFinancedItem.sapBUKRS1T;
				oFinancedItem.oFinanced.sapGJAHR1T = oFinancedItem.sapGJAHR1T;
			}
		} catch (err) {
			oNewMsg.Type = "E";
			oNewMsg.Message = err.message;
			oNewMsg.Id = err.name;
			console.log("ERRORJCBG", err);
		}
		return oNewMsg;
	}

	//Genera con varias posiciones
	async _sapDocumentGenerate_KA(oFinancedItem, oMsg) {

		var oNewMsg = Object.assign({}, oMsg);
		let ka_items = oFinancedItem.aCosts.map(costo => {
			return ItemsSet.builder()
				.hdid(oFinancedItem.hdId)
				.vendorNo(costo.sapVendorNo)
				.segment(oFinancedItem.oFinanced.segment)
				.division(oFinancedItem.oFinanced.center)
				.assignment(costo.sapBELNRRE)
				.itemtext(costo.itemText)
				.currency(oFinancedItem.oFinanced.currency)
				.amount(costo.costAmt)
				.build();
		});

		const _ka = CreateFinDocSet.builder()
			.hdid(oFinancedItem.hdId)
			.idvehi(oFinancedItem.oFinanced.unidadID)
			.vin(oFinancedItem.oFinanced.serial)
			.account(oFinancedItem.oFinanced.accExpense)
			.company(oFinancedItem.oFinanced.companyCode)
			.finoper(oFinancedItem.aCosts[0].sapKA_Code)
			.hdtext(oFinancedItem.aCosts[0].sapKA_Text)
			.docDate(moment(oFinancedItem.oFinanced.dateStart).format("YYYYMMDD"))
			.scpuser(this.sUser)
			.scpapp(this.sAPIApp)
			.itemsSet(ka_items)
			.retSet([])
			.build();
		try {
			let res = await CreateFinDocSet
				.requestBuilder()
				.create(_ka)
				.execute({
					destinationName: this.sDestinationName
				});
			//console.log("RESPUESTAJCBG KA", JSON.stringify(res));
			if (res.retSet[0].type !== "S") {
				oNewMsg.Type = "E";
				oNewMsg.ID = "S4";
				oNewMsg.Field = "CreateFinDocSet";
				oNewMsg.Message = "Error en generación póliza KA";
				oNewMsg.MessageV1 = "sapDocumentGenerate";
				oNewMsg.MessageV2 = "_sapDocumentGenerate_KA";
				oNewMsg.MessageV3 = oFinancedItem.oFinanced.financedAmt.toString();
				oNewMsg.MessageV4 = oFinancedItem.oFinanced.currency;
				this._addErrorsSAP(res.retSet);
			} else {
				oNewMsg.Type = "S";
				oNewMsg.Message = "Generación póliza KA OK";
				let docNumbers = Helpers.getDocNumbers(res.retSet[0]);
				var oLog = Helpers.getDocLogEntity(oFinancedItem.oFinanced.unidadID, docNumbers, "", this.sUser, "Nueva financiera: Documento KA",
					"NEWFINANCEDITEM_KA", oFinancedItem.hdId);
				Helpers.insertLogEntries([oLog]);
				oFinancedItem.sapBELNRKA = docNumbers.belnr;
				oFinancedItem.sapBUKRSKA = docNumbers.bukrs;
				oFinancedItem.sapGJAHRKA = docNumbers.gjahr;
				oFinancedItem.sapBLARTKA = docNumbers.blart;
				oFinancedItem.oFinanced.sapBELNRKA = oFinancedItem.sapBELNRKA;
				oFinancedItem.oFinanced.sapBUKRSKA = oFinancedItem.sapBUKRSKA;
				oFinancedItem.oFinanced.sapGJAHRKA = oFinancedItem.sapGJAHRKA;
			}
		} catch (err) {
			oNewMsg.Type = "E";
			oNewMsg.Message = err.message;
			oNewMsg.Id = err.name;
			console.log("ERRORJCBG", err);
		}
		return oNewMsg;
	}

	_integrateSAPLog(aRes) {
		aRes = [...aRes, ...this.errorLog];
		return aRes;
	}
	_addErrorsSAP(oRetSet) {
		this.errorLog = oRetSet.map(error => {
			return {
				"HdId": error.hdId,
				"Idvehi": error.idvehi,
				"Type": error.type,
				"Id": error.id,
				"Number": error.number,
				"Message": error.message,
				"LogNo": error.logNo,
				"LogMsgNo": error.logMsgNo,
				"MessageV1": error.messageV1,
				"MessageV2": error.messageV2,
				"MessageV3": error.messageV3,
				"MessageV4": error.messageV4,
				"Parameter": error.parameter,
				"Row": error.row,
				"Field": error.field,
				"System": error.system
			}
		});
	}
	async fillFinancedItemAF(oCostAmt) {
		this.aFinancedItems.forEach(x => {
			x.oFinanced.costAmt = Number(oCostAmt);
		});
	}
	async fillFinancedItem(oMsg) {
		let oFinancedItemTemplate = await this._fillFinancedItem_template();
		this.iSecuence = await Helpers.getLastSecuenceFI(this.oUnit.serial);

		let oNewFinancedItem = {
			oFinanced: null,
			sapBELNR1T: "",
			sapBUKRS1T: "",
			sapGJAHR1T: "",
			sapSTBLG1T: "",
			sapBELNRKA: "",
			sapBUKRSKA: "",
			sapGJAHRKA: "",
			sapSTBLGKA: "",
			aCosts: []
		}
		let unidades = 0;
		let accesorios = 0;
		let aNewFinancedItems = [];

		for (const oCosto of this.aCosts) {
			try {

				//Iterar sobre todos los costos para unidad
				if (oCosto.fundSubType_ID.substring(0, 2) === "UN") {
					if (oNewFinancedItem.oFinanced === null) {
						oNewFinancedItem.hdId = oCosto.hdId;
						oNewFinancedItem.oFinanced = await this._fillFinancedItem_fillUndefined(oCosto, "UN", Object.assign({}, oFinancedItemTemplate));
						unidades++;
					}
					oNewFinancedItem.oFinanced.financedAmt += Number(oCosto.costAmt);
					oNewFinancedItem.oFinanced.balanceAmt = oNewFinancedItem.oFinanced.financedAmt;
					oNewFinancedItem.oFinanced.costAmt = oNewFinancedItem.oFinanced.financedAmt;
					oNewFinancedItem.oFinanced.fundSubType_ID = oCosto.fundSubType_ID;
					oNewFinancedItem.oFinanced.ID = uuid();
					oNewFinancedItem.aCosts.push(oCosto);
				}
				//Iterar sobre costos adiconales (Accesorios)
				if (oCosto.fundSubType_ID.substring(0, 4) === "ACCS") {

					let oNewAccesory = {
						oFinanced: null,
						sapBELNR1T: "",
						sapBUKRS1T: "",
						sapGJAHR1T: "",
						sapSTBLG1T: "",
						sapBELNRKA: "",
						sapBUKRSKA: "",
						sapGJAHRKA: "",
						sapSTBLGKA: "",
						aCosts: []
					}
					accesorios++;
					oNewAccesory.hdId = oCosto.hdId;
					oNewAccesory.oFinanced = await this._fillFinancedItem_fillUndefined(oCosto, "ACCS", Object.assign({}, oFinancedItemTemplate));
					oNewAccesory.oFinanced.financedAmt += Number(oCosto.costAmt);
					oNewAccesory.oFinanced.balanceAmt = oNewAccesory.oFinanced.financedAmt;
					oNewAccesory.oFinanced.costAmt = oNewAccesory.oFinanced.financedAmt;
					oNewAccesory.oFinanced.fundSubType_ID = oCosto.fundSubType_ID;
					oNewAccesory.oFinanced.ID = uuid();
					oNewAccesory.aCosts.push(oCosto);
					aNewFinancedItems.push(oNewAccesory);
				}
			} catch (ex) {
				console.log("Error al procesar costo.");
				console.log(ex);
				oMsg.Type = "E";
				oMsg.Message = ex.toString();
				oMsg.MessageV1 = "Error al procesar costo.";
				oMsg.MessageV2 = "";
				return oMsg;
			}

			// BOM DSN ID: 0001 {
			// 			Realizar query
			let oQueryE = SELECT.from(FinancedInvoice_001)
				.where({
					"companyCode": oCosto.sapBUKRSRE,
					"center": oFinancedItemTemplate.center,
					"serial": oFinancedItemTemplate.serial,
					"sapBELNRRE": oCosto.sapBELNRRE,
					"secuence": this.iSecuence,
					"sapLIFNRRE": oCosto.sapLIFNRRE,
					"currency": oFinancedItemTemplate.currency
				})
				.limit(1, 0);

			let aResE = await cds.run(oQueryE);
			if (aResE.length <= 0) {
				var aInvoice = Helpers.getDataInvoice(oFinancedItemTemplate.unidadID, oFinancedItemTemplate.serial,
					oCosto.sapBUKRSRE, oFinancedItemTemplate.center,
					oCosto.sapBELNRRE, oCosto.sapLIFNRRE,
					this.iSecuence,
					oFinancedItemTemplate.currency);

				var oQuery = INSERT.into(FinancedInvoice_001).entries(aInvoice);
				cds.run(oQuery);
			}

			// }EOM DSN ID:0001

		}
	
		if (aNewFinancedItems.fundSubType_ID === "UN") { //DSN colocó
			aNewFinancedItems.splice(0, 0, oNewFinancedItem);
		} //DSN colocó

		this.aFinancedItems = aNewFinancedItems;
		if (aNewFinancedItems.length === 0) {
			oMsg.Type = "W";
			oMsg.Message = "No se generará ningún elemento financiado.";
		} else {
			oMsg.Type = "S";
			oMsg.Message = "Número de elementos a financiar: " + aNewFinancedItems.length;
			oMsg.MessageV1 = "Unidades: " + unidades;
			oMsg.MessageV2 = "Accesorios: " + accesorios;
		}
		return oMsg;
	}
	async _fillFinancedItem_fillUndefined(oCosto, fundType_ID, oFinancedItemTemplate) {
		this.iSecuence++;
		await this._fillFinancedItem_getFinSrvs(oCosto.fundSubType_ID);
		await this._fillFinancedItem_getFinRates();
		await this._fillFinancedItem_getAccs();
		let oFilledUnd = {};
		oFilledUnd = oFinancedItemTemplate;
		oFilledUnd.secuence = this.iSecuence;
		// 		console.log(this.iSecuence);
		oFilledUnd.dateStart = moment(oFinancedItemTemplate.dateStart).format();
		//Add days
		oFilledUnd.dateEnd = moment(oFinancedItemTemplate.dateStart)
			.add(parseInt(this.ViewFinSrvCredits_001.finDays), "d")
			.format();
		oFilledUnd.dateDisplay = oFilledUnd.dateEnd;
		oFilledUnd.financedAmt = 0;
		oFilledUnd.fundType_ID = fundType_ID;
		oFilledUnd.rateType_rate = this.ViewFinRates_001.rate;
		if (this.oUnit.currency === "MXN") {
			oFilledUnd.diffPerc = this.ViewFinSrvCredits_001.diffPerMXN;
		}
		if (this.oUnit.currency === "USD") {
			oFilledUnd.diffPerc = this.ViewFinSrvCredits_001.diffPerUSD;
		}
		oFilledUnd.accExpense = this.TransferAccs_001_KA.sapHkont;
		oFilledUnd.accIncome = this.TransferAccs_001_1T.sapHkont;
		return oFilledUnd;
	}
	async _fillFinancedItem_getFinSrvs(fundSubType_ID) {
		//Bandera de línea de crédito
		var sFlag = Helpers.getSrvCredFlag(fundSubType_ID);
		const {
			ViewFinSrvCredits_001
		} = cds.entities('BD.VN.PP.XVIEW');
		//Realizar query
		let oQueryRateType = SELECT.from(ViewFinSrvCredits_001)
			.where({
				"sapVKORG": this.oUnit.center,
				"finServ_finCode": this.oUnit.finSrv_finCode,
				[sFlag]: true
			})
			.limit(1, 0);
		let aRes = await cds.run(oQueryRateType);
		if (aRes.length > 0) {
			this.ViewFinSrvCredits_001 = aRes[0];
		}
	}

	//Obtiene cuenta de ingreso y egreso
	async _fillFinancedItem_getAccs() {
		const {
			TransferAccs_001
		} = cds.entities('BD.VN.PP.XCFG');
		//Realizar query
		let oQuery1T = SELECT.from(TransferAccs_001)
			.where({
				"center": this.oUnit.center,
				"currency": this.oUnit.currency,
				"finServ_finCode": this.oUnit.finSrv_finCode,
				"flag1T": true
			})
			.limit(1, 0);
		let aRes1T = await cds.run(oQuery1T);
		if (aRes1T.length > 0) {
			this.TransferAccs_001_1T = aRes1T[0];
		} else {
			if (this.oUnit.fundSubType_ID !== "UN_VD") {
				throw new ErrorBA("No hay cuenta para 1T en la sig. combinación: " +
					this.oUnit.center + "|" + this.oUnit.currency + "|" + this.oUnit.finSrv_finCode);
			}

		}
		//Realizar query
		let oQueryKA = SELECT.from(TransferAccs_001)
			.where({
				"center": this.oUnit.center,
				"currency": this.oUnit.currency,
				"finServ_finCode": this.oUnit.finSrv_finCode,
				"flagKA": true
			})
			.limit(1, 0);
		let aResKA = await cds.run(oQueryKA);
		if (aResKA.length > 0) {
			this.TransferAccs_001_KA = aResKA[0];
		} else {
			throw new ErrorBA("No hay cuenta para KA en la sig. combinación: " +
				this.oUnit.center + "|" + this.oUnit.currency + "|" + this.oUnit.finSrv_finCode);
		}
		//Para vehículos demo se usan cuentas virtuales.
		if (this.oUnit.fundSubType_ID === "UN_VD") {
			this.TransferAccs_001_1T = {
				sapHkont: ""
			}
			this.TransferAccs_001_KA = {
				sapHkont: ""
			}
		}
	}
	async _fillFinancedItem_getFinRates() {
		//FinType
		let sFintype = await this._get_FinType(this.oUnit.finSrv_finCode);
		const {
			ViewFinRates_001
		} = cds.entities('BD.VN.PP.XVIEW');
		//Realizar query
		let oQueryRateType = SELECT.from(ViewFinRates_001)
			.where({
				"finType": sFintype,
				"currency": this.oUnit.currency
			})
			.limit(1, 0);
		let aRes = await cds.run(oQueryRateType);
		if (aRes.length > 0) {
			this.ViewFinRates_001 = aRes[0];
		}
	}
	async _fillFinancedItem_template() {
		var oTemplate = {
			"hdId": this.oUnit.hdId,
			"companyCode": this.oUnit.companyCode,
			"socTxt": "PENDIENTE",
			"center": this.oUnit.center,
			"cenTxt": "PENDIENTE",
			"segment": this.oUnit.segment.padStart(10, "0"),
			"serial": this.oUnit.serial,
			"plateNum": this.oUnit.plateNum,
			"secuence": "PENDIENTE",
			"unidadID": this.oUnit.unidadID,
			"currency": this.oUnit.currency,
			"costAmt": this.costAmt,
			"financedAmt": "PENDIENTE",
			"balanceAmt": "PENDIENTE",
			"payedAmt": 0,
			"rateValue": 0,
			"diffPerc": "PENDIENTE",
			"dateStart": this.oUnit.dateStart,
			"dateEnd": "PENDIENTE",
			"dateDisplay": "PENDIENTE",
			"dateLastPay": null,
			"dateUnitExit": null,
			"brandCode": this.oUnit.brandCode,
			"brandText": "PENDIENTE",
			"modelCode": this.oUnit.modelCode,
			"modelText": "PENDIENTE",
			"gamaCode": this.oUnit.gamaCode,
			"gamaTxt": "",
			"extColorCode": this.oUnit.extColorCode,
			"extColorText": "PENDIENTE",
			"intColorCode": this.oUnit.intColorCode,
			"intColorText": "PENDIENTE",
			"unitLocation": this.oUnit.unitLocation,
			"invoiceNum": "",
			"invoiceDate": null,
			"invoiceCust": "",
			"invoiceCustTxt": "",
			"graceDays": this.oUnit.graceDays,
			"intMonthDay": 0,
			"intMonthSum": 0,
			"intAllDay": 0,
			"intAllSum": 0,
			"intSumPay": 0,
			"fundType_ID": "PENDIENTE",
			"fundSubType_ID": this.oUnit.fundSubType_ID,
			"finSrv_finCode": this.oUnit.finSrv_finCode,
			"status_status": "FIN",
			"rateType_rate": "PENDIENTE",
			"accExpense": "PENDIENTE",
			"accIncome": "PENDIENTE",

		};
		//LLENAR SOCIEDAD Y CENTRO
		//Generar filtro sociedad /Solo requiero una sociedad
		var oFilterSociedad = new FilterList([
			SociedadSet.BUKRS.equals(this.oUnit.companyCode)
		]);

		//Sociedad
		const sociedadesSet = await SociedadSet
			.requestBuilder()
			.getAll()
			.filter(oFilterSociedad)
			.execute({
				destinationName: this.sDestinationName
			});
		oTemplate.socTxt = sociedadesSet[0].butxt;
		//Centro;
		var oFilterCentro = new FilterList([
			CentrosSet.WERKS.equals(this.oUnit.center)
		]);
		const centrosSet = await CentrosSet.requestBuilder().getAll().filter(oFilterCentro).execute({
			destinationName: this.sDestinationName
		});
		oTemplate.cenTxt = centrosSet[0].name1;
		//ZAP_MARCA
		oTemplate.brandText = this.getCaracteristica("ZAP_MARCA", this.oUnit.brandCode);
		//ZAP_GAMA
		oTemplate.gamaTxt = this.getCaracteristica("ZAP_GAMA", this.oUnit.gamaCode);
		//ZAP_MODELO
		oTemplate.modelText = this.getCaracteristica("ZAP_MODELO", this.oUnit.modelCode);
		//ZAP_COLOR_EXTERNO
		oTemplate.extColorText = this.getCaracteristica("ZAP_COLOR_EXTERNO", this.oUnit.extColorCode);
		//ZAP_COLOR_INTERNO
		oTemplate.intColorText = this.getCaracteristica("ZAP_COLOR_INTERNO", this.oUnit.intColorCode);

		return oTemplate;
	}
	getCaracteristica(sCharactname, sValue) {
		var res = this.caractSet.find(x => x.charactname === sCharactname && x.valueCharLong === sValue);
		return (res === undefined) ? sValue : res.descriptionLong;
	}
	async validateInput(bActFijo = false) {
		var oMsg = {};
		oMsg.HdId = this.oUnit.hdId;
		oMsg.Idvehi = this.oUnit.unidadID;
		oMsg.Type = "S";
		oMsg.Id = "";
		oMsg.Number = "";
		oMsg.Message = "";
		oMsg.LogNo = "";
		oMsg.LogMsgNo = "";
		oMsg.MessageV1 = "";
		oMsg.MessageV2 = "";
		oMsg.MessageV3 = "";
		oMsg.MessageV4 = "";
		oMsg.Parameter = "";
		oMsg.Row = this.index.toString();
		oMsg.Field = "";
		oMsg.System = "BAVNPP001";
		oMsg = await this._validateInputPass0(oMsg, bActFijo);
		if (oMsg.Type !== "S") {
			return oMsg;
		}
		oMsg = await this._validateInputPass1(oMsg, bActFijo);
		if (oMsg.Type !== "S") {
			return oMsg;
		}
		oMsg = await this._validateInputPass2(oMsg);
		if (oMsg.Type !== "S") {
			return oMsg;
		}
		oMsg.Type = "S";
		oMsg.Message = "El elemento se va a generar.";
		return oMsg;
	}
	async _validateInputPass0(oMsg, bActFij) {
		if (this.oUnit.hdId == null || this.oUnit.hdId == "") {
			oMsg.Message = "Falta ingresar hdId";
			oMsg.Field = "hdId";
			oMsg.Type = "E";
			return oMsg;
		}
		if (this.oUnit.companyCode == null || this.oUnit.companyCode == "") {
			oMsg.Message = "Falta ingresar companyCode";
			oMsg.Field = "companyCode";
			oMsg.Type = "E";
			return oMsg;
		}
		if (this.oUnit.center == null || this.oUnit.center == "") {
			oMsg.Message = "Falta ingresar center";
			oMsg.Field = "center";
			oMsg.Type = "E";
			return oMsg;
		}
		if (this.oUnit.segment == null || this.oUnit.segment == "") {
			oMsg.Message = "Falta ingresar segment";
			oMsg.Field = "segment";
			oMsg.Type = "E";
			return oMsg;
		}
		if (this.oUnit.serial == null || this.oUnit.serial == "") {
			oMsg.Message = "Falta ingresar serial";
			oMsg.Field = "serial";
			oMsg.Type = "E";
			return oMsg;
		}
		if (this.oUnit.extColorCode == null || this.oUnit.extColorCode == "") {
			oMsg.Message = "Falta ingresar extColorCode";
			oMsg.Field = "extColorCode";
			oMsg.Type = "E";
			return oMsg;
		}
		if (this.oUnit.intColorCode == null || this.oUnit.intColorCode == "") {
			oMsg.Message = "Falta ingresar intColorCode";
			oMsg.Field = "intColorCode";
			oMsg.Type = "E";
			return oMsg;
		}
		if (this.oUnit.currency == null || this.oUnit.currency == "") {
			oMsg.Message = "Falta ingresar currency";
			oMsg.Field = "currency";
			oMsg.Type = "E";
			return oMsg;
		}
		if (this.oUnit.unidadID == null || this.oUnit.unidadID == "") {
			oMsg.Message = "Falta ingresar unidadID";
			oMsg.Field = "unidadID";
			oMsg.Type = "E";
			return oMsg;
		}
		if (this.oUnit.dateStart == null || this.oUnit.dateStart == "") {
			oMsg.Message = "Falta ingresar dateStart";
			oMsg.Field = "dateStart";
			oMsg.Type = "E";
			return oMsg;
		}
		if (this.oUnit.brandCode == null || this.oUnit.brandCode == "") {
			oMsg.Message = "Falta ingresar brandCode";
			oMsg.Field = "brandCode";
			oMsg.Type = "E";
			return oMsg;
		}
		if (this.oUnit.modelCode == null || this.oUnit.modelCode == "") {
			oMsg.Message = "Falta ingresar modelCode";
			oMsg.Field = "modelCode";
			oMsg.Type = "E";
			return oMsg;
		}
		if (this.oUnit.gamaCode == null || this.oUnit.gamaCode == "") {
			oMsg.Message = "Falta ingresar gamaCode";
			oMsg.Field = "gamaCode";
			oMsg.Type = "E";
			return oMsg;
		}
		if (this.oUnit.graceDays == null || isNaN(this.oUnit.graceDays) || this.oUnit.graceDays < 0) {
			oMsg.Message = "Falta ingresar graceDays";
			oMsg.Field = "graceDays";
			oMsg.Type = "E";
			return oMsg;
		}
		if (this.oUnit.finSrv_finCode == null || this.oUnit.finSrv_finCode == "") {
			oMsg.Message = "Falta ingresar finSrv_finCode";
			oMsg.Field = "finSrv_finCode";
			oMsg.Type = "E";
			return oMsg;
		}
		if (this.oUnit.fundSubType_ID == null || this.oUnit.fundSubType_ID == "") {
			oMsg.Message = "Falta ingresar fundSubType_ID";
			oMsg.Field = "fundSubType_ID";
			oMsg.Type = "E";
			return oMsg;
		}
		if (this.oUnit.costs == null || this.oUnit.costs.length === 0) {
			oMsg.Message = "Falta ingresar costs";
			oMsg.Field = "costs";
			oMsg.Type = "E";
			return oMsg;
		}
		if (moment(this.oUnit.dateStart).isAfter(moment(), 'day')) {
			oMsg.Message = "dateStart no puede ser mayor a " + moment().format("YYYY-MM-DD");
			oMsg.MessageV1 = this.oUnit.dateStart;
			oMsg.Field = "dateStart";
			oMsg.Type = "E";
			return oMsg;
		}

		return oMsg;
	}
	async _validateInputPass1(oMsg, bActFijo) {
		for (const cost of this.oUnit.costs) {

			if (cost.costCode == null || cost.costCode == "") {
				oMsg.Message = "Falta ingresar cost.costCode";
				oMsg.Field = "costCode";
				oMsg.Type = "E";
				return oMsg;
			}
			if (cost.costAmt == null || isNaN(cost.costAmt) || cost.costAmt < 0) {
				oMsg.Message = "Falta ingresar cost.costAmt";
				oMsg.Field = "costCode";
				oMsg.Type = "E";
				return oMsg;
			}
			if ((cost.sapBELNRRE == null || cost.sapBELNRRE == "") && !bActFijo) {
				oMsg.Message = "Falta ingresar cost.sapBELNRRE";
				oMsg.Field = "sapBELNRRE";
				oMsg.Type = "E";
				return oMsg;
			}
			if ((cost.sapBUKRSRE == null || cost.sapBUKRSRE == "") && !bActFijo) {
				oMsg.Message = "Falta ingresar cost.sapBUKRSRE";
				oMsg.Field = "sapBELNRRE";
				oMsg.Type = "E";
				return oMsg;
			}
			if ((cost.sapGJAHRRE == null || cost.sapGJAHRRE == "") && !bActFijo) {
				oMsg.Message = "Falta ingresar cost.sapGJAHRRE";
				oMsg.Field = "sapGJAHRRE";
				oMsg.Type = "E";
				return oMsg;
			}
			if ((cost.sapLIFNRRE == null || cost.sapLIFNRRE == "")) {
				oMsg.Message = "Falta ingresar cost.sapLIFNRRE";
				oMsg.Field = "sapLIFNRRE";
				oMsg.Type = "E";
				return oMsg;
			}
		}
		return oMsg;
	}

	//Validar financieras y etc.
	async _validateInputPass2(oMsg) {
		let validate_1 = await this._validateInputPass2_FinSrv();
		if (!validate_1) {
			oMsg.Message = "Financiera no encontrada para sociedad.";
			oMsg.Field = "finSrv_finCode";
			oMsg.MessageV1 = "BD.VN.PP.XVIEW.ViewFinList_001";
			oMsg.MessageV2 = this.oUnit.companyCode;
			oMsg.MessageV3 = this.oUnit.finSrv_finCode;
			oMsg.MessageV4 = "";
			oMsg.Type = "E";
			return oMsg;
		}
		let validate_2 = await this._validateInputPass2_FinSrvCredit();
		if (!validate_2) {
			oMsg.Message = "Financiera no encontrada para centro y tipo de elemento.";
			oMsg.Field = "finSrv_finCode";
			oMsg.MessageV1 = "BD.VN.PP.XVIEW.ViewFinSrvCredits_001";
			oMsg.MessageV2 = this.oUnit.center;
			oMsg.MessageV3 = this.oUnit.finSrv_finCode;
			oMsg.MessageV4 = "";
			//oMsg.MessageV4 = this._oFinancedItem.fundSubType_ID;
			oMsg.Type = "E";
			return oMsg;
		}
		if (!await this._validateInputPass2_FinSrvCredit_Limit()) {
			oMsg.Message = "Financiera no tiene suficiente saldo.";
			oMsg.Field = "finSrv_finCode";
			oMsg.MessageV1 = "_validateInputPass2_FinSrvCredit_Limit";
			oMsg.MessageV2 = this.ViewFinSrvCredits_001.balanceMXN;
			oMsg.MessageV3 = this.ViewFinSrvCredits_001.balanceUSD;
			oMsg.MessageV4 = this.fCosto;
			oMsg.Type = "E";
			return oMsg;
		}
		if (this.fCosto <= 0) {
			oMsg.Message = "No va a haber elementos a financiar";
			oMsg.Field = "costs";
			oMsg.MessageV1 = this.fCosto;
			oMsg.MessageV2 = "";
			oMsg.MessageV3 = "";
			oMsg.MessageV4 = "";
			oMsg.Type = "W";
			return oMsg;
		}
		return oMsg;
	}
	async _validateInputPass2_FinSrv() {
		const {
			ViewFinList_001
		} = cds.entities('BD.VN.PP.XVIEW');
		//Realizar query
		let oQueryRateType = SELECT.from(ViewFinList_001)
			.where({
				"companyCode": this.oUnit.companyCode,
				"finCode": this.oUnit.finSrv_finCode
			})
			.limit(1, 0);
		let aRes = await cds.run(oQueryRateType);
		if (aRes.length > 0) {
			this.ViewFinList_001 = aRes[0];
		}
		return aRes.length !== 0;
	}

	async _validateInputPass2_FinSrvCredit() {
		//Bandera de línea de crédito
		var sFlag = Helpers.getSrvCredFlag(this.oUnit.fundSubType_ID);
		const {
			ViewFinSrvCredits_001
		} = cds.entities('BD.VN.PP.XVIEW');
		//Realizar query
		let oQueryRateType = SELECT.from(ViewFinSrvCredits_001)
			.where({
				"sapVKORG": this.oUnit.center,
				"finServ_finCode": this.oUnit.finSrv_finCode,
				[sFlag]: true
			})
			.limit(1, 0);
		let aRes = await cds.run(oQueryRateType);
		if (aRes.length > 0) {
			this.ViewFinSrvCredits_001 = aRes[0];
		}
		return aRes.length !== 0;
	}
	async _validateInputPass2_FinSrvCredit_Limit() {

		let sMoneda = this.oUnit.currency;
		let fSaldo = 0;
		if (sMoneda === "MXN") {
			fSaldo = Number(this.ViewFinSrvCredits_001.balanceMXN);
		} else {
			fSaldo = Number(this.ViewFinSrvCredits_001.balanceUSD);
		}
		//Sumar costos:
		this.fCosto = 0;
		this.costAmt = 0;
		for (let cost of this.oUnit.costs) {
			if (!await this._validateInputPass2_FinSrvCredit_Limit_getCostValid(cost)) {
				this.costAmt += Number(cost.costAmt);
				continue;
			}

			var aNewCost = cost;
			aNewCost.fundSubType_ID = this.ViewCostsFin_001.fundSubType_ID;
			aNewCost.hdId = this.oUnit.hdId;
			aNewCost.sap1T_Code = this.ViewCostsFin_001.sap1T_Code;
			aNewCost.sap1T_Text = this.ViewCostsFin_001.sap1T_Text;
			aNewCost.sapKA_Code = this.ViewCostsFin_001.sapKA_Code;
			aNewCost.sapKA_Text = this.ViewCostsFin_001.sapKA_Text;
			aNewCost.itemText = this.ViewCostsFin_001.itemText;
			aNewCost.sapVendorNo = this.ViewCostsFin_001.sapVendorNo;
			if (Boolean(cost.sapLIFNRRE)) { // undefnined y vacío
				aNewCost.sapVendorNo = cost.sapLIFNRRE;
			}
			this.aCosts.push(aNewCost);
			this.fCosto += Number(cost.costAmt);
		}
		return this.fCosto < fSaldo;
	}
	async _validateInputPass2_FinSrvCredit_Limit_getCostValid(cost) {
		const {
			ViewCostsFin_001
		} = cds.entities('BD.VN.PP.XVIEW');
		//Realizar query
		let sFintype = await this._get_FinType(this.oUnit.finSrv_finCode);
		var oWhere = {
			"companyCode": this.oUnit.companyCode,
			"costCode": cost.costCode,
			//"fundSubType_id": this.oUnit.fundSubType_ID
		};

		let oQueryRateType = SELECT.from(ViewCostsFin_001)
			.where(oWhere)
			.limit(1, 0);
		let aRes = await cds.run(oQueryRateType);
		if (aRes.length > 0) {
			this.ViewCostsFin_001 = aRes[0];
		}

		return aRes.length !== 0;
	}

	async _get_FinType(finSrv_finCode) {
		const {
			FinSrvs_001
		} = cds.entities('BD.VN.PP.XMD');
		//Realizar query
		let oQueryRateType = SELECT.from(FinSrvs_001)
			.where({
				"finCode": finSrv_finCode
			})
			.limit(1, 0);
		let aRes = await cds.run(oQueryRateType);
		return aRes[0].finType_finType;
	}
}