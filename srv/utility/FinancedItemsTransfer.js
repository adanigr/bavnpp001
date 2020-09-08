'use strict';
const moment = require('moment-timezone');
const Helpers = require('./Helpers.js');
const ErrorBA = require('./ErrorBA.js');
const FinancedItemInterestDocGen = require('./FinancedItemInterestDocGen.js');
const {
	FinancedItemsTransfers_001,
	FinancedItems_001
} = cds.entities('BD.VN.PP.XDATA');
const {
	TransFinItem_001
} = cds.entities('BD.VN.PP.XREL');
const {
	FilterList,
	serializeEntity,
	retrieveJwt
 } = require('@sap-cloud-sdk/core'); //Permite Filtros con multiples registros
const {
	CancelFinDocSet,
	CreateFinDocSet,
	ItemsSet,
	RetSet
} = require('../odata-client/z-od-scp-bavnpp-001-service');
const {
	uuid
} = require('uuidv4');
module.exports = class FinancedItemsTransfer {

	constructor(oTransfer, user, aCollection) {
		this.aCollection = aCollection;
		this.oTransfer = oTransfer;
		this.user = user;
		this.sCallingApp = "BAVNPP001";
		this.aUUIDAnu = [];
	}

	/**
	 * Realiza validaciones previas a realizar traspaso
	 * Que no se haya utilizado previamente la financiera
	 */
	static async validatePrev(sUnidadID, sFinCode) {
		var res = [1];
		//Revisar FinCodes Traspasos
		var oQuery =
			SELECT.from(FinancedItemsTransfers_001).where({
				"unidadID": sUnidadID,
				"oldFinCode": sFinCode,
				"flagReverse": false
			});
		try {
			res = await cds.run(oQuery);
		} catch (err) {
			console.log(err);
		}
		//Ver si el documento anterior tenía esa fincode
		return res.length === 0;
	}

	/**
	 * Guardar elementos generados:
	 */
	static async createMethodFunction_SaveItems(aItems) {
		var res = 0;
		//Guardar documentos:
		var oQuery =
			INSERT.into(FinancedItemsTransfers_001).entries(aItems);
		try {
			res = await cds.run(oQuery);
		} catch (err) {
			console.log(err);
		}
		return res;
	}

	/**
	 * Generar template y correr secuencia:
	 */
	async createMethodFunction() {
		try {
			//Obtener los fondo estrella:
			await this._validateAccsFe();
			this.oTransfer.ID = uuid();
			this.oTransfer.flagReverse = false;
			await this.registerTransfer();
			await this._createMethodFunctionConsolidate();
			await this._createMethodFunctionSaveDB();
			return this;
		} catch (ex) {
			console.log(ex);
		}
		return false;

	}

	/**
	 * Valida fondo estrella; en caso de que exista una validación a futuro aquí
	 * colocar una excepción para que pare proceso.
	 */
	async _validateAccsFe() {

	}

	/**
	 * Inserta nueva entidad en base de datos con la información
	 * del traspaso
	 */
	async _createMethodFunctionSaveDB() {
		var oClone = {...this.oTransfer
		};
		delete oClone.flagTR_L_BBVA_I;
		delete oClone.flagTR_L_BMX_I;
		delete oClone.flagTR_L_BBVA_E;
		delete oClone.flagTR_L_BMX_E;
		delete oClone.flagTR_L_CtaOrg;
		delete oClone.flagTR_L_CtaDest;
		var res = 0;
		//Guardar documentos:
		var oQuery =
			INSERT.into(FinancedItemsTransfers_001).entries([oClone]);
		try {
			res = await cds.run(oQuery);
		} catch (err) {
			console.log(err);
			throw err;
		}
		return res;
	}

	/**
	 * Consolida los tipos de dato númericos para manipulación de
	 * datos
	 */
	async _createMethodFunctionConsolidate() {
		this.oTransfer.oldBalance = Number(this.oTransfer.oldBalance);
		this.oTransfer.interestAmt = Number(this.oTransfer.interestAmt);
		this.oTransfer.financedAmt = Number(this.oTransfer.financedAmt);
		this.oTransfer.graceDays = parseInt(this.oTransfer.graceDays);
		this.oTransfer.finDays = parseInt(this.oTransfer.finDays);
		this.oTransfer.secuence = parseInt(this.oTransfer.secuence);
	}

	/**
	 * Guardar documentos generados durante la propuesta de pago
	 */
	static async registerTransferSave(transfer) {

		//Guardar documentos:
		var oQuery =
			UPDATE(FinancedItemsTransfers_001).set({
				sapBELNR1T: transfer.sapBELNR1T,
				sapBUKRS1T: transfer.sapBUKRS1T,
				sapGJAHR1T: transfer.sapGJAHR1T,
				sapBELNRKA: transfer.sapBELNRKA,
				sapBUKRSKA: transfer.sapBUKRSKA,
				sapGJAHRKA: transfer.sapGJAHRKA,
				newFinItem_ID: transfer.newFinItem_ID,
				dateTransfer: moment().format(),
				oldBalance: Number(transfer.oldBalance),
				unidadID: transfer.unidadID,
				secuence: parseInt(transfer.secuence)
			}).where({
				"ID": transfer.ID
			});
		try {
			cds.run(oQuery);
		} catch (err) {
			throw new ErrorBA("Error desconocido FinancedItemsTransfers_001");
		}
	}

	getTransfer() {
		return this.oTransfer;
	}

	async registerTransfer() {
		//Validar entrada
		this._registerTransferValidate();
		//Generar documentos
		await this._registerTransferGenDocs();
		var aPromises = [];
		//Actualizar estatus
		aPromises.push(this._registerTransferStatus());
		//Generar nueva línea
		aPromises.push(this._registerTransferNewLine());
		//Generar póliza KR KZ intereses
		aPromises.push(this._registerTransferGenDocsInt());
		await Promise.all(aPromises);

	}
	async _registerTransferGenDocsInt() {
		var helperKZ = new FinancedItemInterestDocGen(moment(this.oTransfer.dateStart).format(),
			this.oTransfer.interestAmt,
			this.oFinancedItems_001_org, false, "flagTra", this.user, this.oTransfer.ID);
		var res = await helperKZ.generateFinDocKRKZ();
		if (res === true) {
			//console.log("KR KZ Intereses generado.");
		} else {
			//console.log("KR KZ Intereses no generado.");
		}
	}
	_registerTransferValidate() {
		if (!this.oTransfer.oldFinItemID) {
			throw new ErrorBA("Verifique ID elemento a transferir");
		}
		if (!this.oTransfer.newFin_finCode) {
			throw new ErrorBA("Verifique nueva financiera");
		}
		if (isNaN(this.oTransfer.graceDays)) {
			throw new ErrorBA("Verifique días de gracia");
		}
		if (isNaN(this.oTransfer.finDays)) {
			throw new ErrorBA("Verifique días de financiamiento");
		}
		if (!this.oTransfer.dateStart) {
			throw new ErrorBA("Verifique fecha traspaso");
		}
		//Validar fecha
		if (moment(this.oTransfer.dateStart).isAfter(moment(), 'day')) {
			throw new ErrorBA("Verifique fecha traspaso no sea posterior a hoy");
		}
		if (!this.oTransfer.accExpense) {
			throw new ErrorBA("Verifique cuenta egreso");
		}
		if (!this.oTransfer.accIncome) {
			throw new ErrorBA("Verifique cuenta ingreso");
		}
		if (!this.oTransfer.accIncome) {
			throw new ErrorBA("Verifique cuenta ingreso");
		}
		//Validar cantidades
		if (Number(this.oTransfer.financedAmt) <= 0) {
			throw new ErrorBA("Verifique cantidad");
		}
	}
	getFinItem() {
		return this.newItem;
	}
	getFinSrv() {
		return this.ViewFinSrvCredits_001_new;
	}
	async _registerTransferGenDocs() {
		this.oFinancedItems_001_org = await this._getFinancedItem_old();
		if (this.oFinancedItems_001_org.fundSubType_ID === "ACCS_FE") {
			throw new ErrorBA("Fondo estrella no se procesa");
		}
		this.oTransfer.oldBalance = Number(this.oFinancedItems_001_org.balanceAmt);
		this.oTransfer.unidadID = this.oFinancedItems_001_org.unidadID;
		this.oTransfer.secuence = await Helpers.getLastSecuenceTrans(this.oTransfer.unidadID);
		this.oTransfer.secuence++;
		this.ViewFinSrvCredits_001_org = await Helpers.getFinSrvs(this.oFinancedItems_001_org.fundSubType_ID, this.oFinancedItems_001_org.center,
			this.oFinancedItems_001_org.finSrv_finCode);
		this.ViewFinSrvCredits_001_new = await Helpers.getFinSrvs(this.oFinancedItems_001_org.fundSubType_ID, this.oFinancedItems_001_org.center,
			this.oTransfer.newFin_finCode);
		let aPromises = [];
		aPromises.push(this._registerTransferGenDocs1T());
		aPromises.push(this._registerTransferGenDocsKA());
		try {
			var res = await Promise.all(aPromises);
			this.oTransfer.sapBELNR1T = res[0].belnr;
			this.oTransfer.sapBUKRS1T = res[0].bukrs;
			this.oTransfer.sapGJAHR1T = res[0].gjahr;
			this.oTransfer.sapBELNRKA = res[1].belnr;
			this.oTransfer.sapBUKRSKA = res[1].bukrs;
			this.oTransfer.sapGJAHRKA = res[1].gjahr;
		} catch (ex) {
			throw ex;
		}
	}

	/*
	 * Obtiene el item a financiar relacionado
	 */
	async _getFinancedItem_old() {
		const {
			FinancedItems_001
		} = cds.entities('BD.VN.PP.XDATA');
		//Obtener elemento a financiar:
		var oQuery = SELECT.from(FinancedItems_001).where({
			"ID": this.oTransfer.oldFinItemID
		});
		var oRes = await cds.run(oQuery);
		if (oRes.length === 0) {
			throw new ErrorBA("Elemento financiado no encontrado");
		}
		return oRes[0];
	}

	/*
	 * Obtiene el item a financiar relacionado
	 */
	async _getFinancedItem_new() {
		const {
			FinancedItems_001
		} = cds.entities('BD.VN.PP.XDATA');
		//Obtener elemento a financiar:
		var oQuery = SELECT.from(FinancedItems_001).where({
			"ID": this.oTransfer.newFinItem_ID
		});
		var oRes = await cds.run(oQuery);
		if (oRes.length === 0) {
			throw new ErrorBA("Elemento financiado no encontrado");
		}
		return oRes[0];
	}

	/**
	 * Genera póliza traspaso 1t
	 */
	async _registerTransferGenDocs1T() {
		var dAmt = await this._get1TAmt();
		const _1T = CreateFinDocSet.builder()
			.hdid(this.oTransfer.ID)
			.idvehi(this.oFinancedItems_001_org.unidadID)
			.vin(this.oFinancedItems_001_org.serial)
			.company(this.oFinancedItems_001_org.companyCode)
			.finoper("TF_KI")
			.account(this.oTransfer.accIncome)
			.docDate(moment(this.oTransfer.dateStart).format("YYYYMMDD"))
			.hdtext("TRASPASO FINANCIERO")
			.scpuser(this.user)
			.scpapp(this.sCallingApp)
			.itemsSet([
				ItemsSet.builder()
				.assignment(Helpers.getVinReference(this.oFinancedItems_001_org.serial))
				.hdid(this.oTransfer.ID)
				.vendorNo(this.ViewFinSrvCredits_001_new.sapLifnr)
				.segment(this.oFinancedItems_001_org.segment)
				.division(this.oFinancedItems_001_org.center)
				.itemtext("TRASPASO FINANCIERA INGRESO")
				.currency(this.oFinancedItems_001_org.currency)
				.amount(dAmt)
				.build()
			]).retSet([])
			.build();
		try {
			let res = await CreateFinDocSet
				.requestBuilder()
				.create(_1T)
				.execute({
					destinationName: Helpers.getDestinationName()
				});
			//console.log("RESPUESTAJCBG 1T", JSON.stringify(res));
			if (res.retSet[0].type === "S") {
				var oDocuments = Helpers.getDocNumbers(res.retSet[0]);
				var oLog = Helpers.getDocLogEntity(this.oFinancedItems_001_org.unidadID, oDocuments, "", this.user, "TRASPASO FINANCIERA INGRESO",
					"FITRANSFER");
				Helpers.insertLogEntries([oLog]);
				return oDocuments;
			} else {
				Helpers.documentFIErrorLog(res.retSet, this.oTransfer.ID);
				throw new ErrorBA('Error en generación de póliza');
			}
		} catch (err) {
			if (err.name !== "BAVNPP001") {
				console.log(err);
				throw new ErrorBA("Error desconocido");
			} else {
				throw err;
			}
		}
		return null;
	}

	/**
	 * Obtiene el importe para la póliza 1T
	 */
	async _get1TAmt() {
		var dValue = Number(this.oTransfer.financedAmt);
		//Obtener los datos por tipo subfinanciamiento e UNIDAD ID
		var oQuery = SELECT.from(FinancedItems_001).where({
			fundSubType_ID: "ACCS_FE",
			status_status: "FIN",
			unidadID: this.oTransfer.unidadID
		});
		var oRes = await cds.run(oQuery);
		for (var x of oRes) {
			var oRelatedT = this.aCollection.find(y => y.oldFinItemID === x.ID);
			dValue += Number(oRelatedT.financedAmt);
		}
		return dValue;
	}

	/**
	 * Genera póliza traspaso KA
	 */
	async _registerTransferGenDocsKA() {

		var dAmt = await this._get1TAmt();
		const _KA = CreateFinDocSet.builder()
			.hdid(this.oTransfer.ID)
			.idvehi(this.oFinancedItems_001_org.unidadID)
			.vin(this.oFinancedItems_001_org.serial)
			.company(this.oFinancedItems_001_org.companyCode)
			.finoper("TF_KA")
			.account(this.oTransfer.accExpense)
			.docDate(moment(this.oTransfer.dateStart).format("YYYYMMDD"))
			.hdtext("TRASPASO FINANCIERO")
			.scpuser(this.user)
			.scpapp(this.sCallingApp)
			.itemsSet([
				ItemsSet.builder()
				.assignment(this.ViewFinSrvCredits_001_new.sapLifnr)
				.hdid(this.oTransfer.ID)
				.vendorNo(this.ViewFinSrvCredits_001_org.sapLifnr)
				.segment(this.oFinancedItems_001_org.segment)
				.division(this.oFinancedItems_001_org.center)
				.itemtext("TRASPASO FINANCIERA EGRESO")
				.currency(this.oFinancedItems_001_org.currency)
				.amount(dAmt)
				.build()
			]).retSet([])
			.build();
		try {
			let res = await CreateFinDocSet
				.requestBuilder()
				.create(_KA)
				.execute({
					destinationName: Helpers.getDestinationName()
				});
			//console.log("RESPUESTAJCBG KA", JSON.stringify(res));
			if (res.retSet[0].type === "S") {
				var oDocuments = Helpers.getDocNumbers(res.retSet[0]);
				var oLog = Helpers.getDocLogEntity(this.oFinancedItems_001_org.unidadID, oDocuments, "", this.user, "TRASPASO FINANCIERA EGRESO",
					"FITRANSFER");
				Helpers.insertLogEntries([oLog]);
				return oDocuments;
			} else {
				Helpers.documentFIErrorLog(res.retSet, this.oTransfer.ID);
				throw new ErrorBA('Error en generación de póliza');
			}
		} catch (err) {
			if (err.name !== "BAVNPP001") {
				throw new ErrorBA("Error desconocido");
			} else {
				throw err;
			}
		}
		return null;
	}
	_registerTransferStatus() {
		const {
			FinancedItems_001
		} = cds.entities('BD.VN.PP.XDATA');
		//Actualizar:
		var oQuery =
			UPDATE(FinancedItems_001).set({
				status_status: "ANU"
			}).where({
				"ID": this.oFinancedItems_001_org.ID
			});
		cds.run(oQuery);
	}
	async _registerTransferNewLine() {
		const {
			FinancedItems_001
		} = cds.entities('BD.VN.PP.XDATA');
		this.newItem = Object.assign({}, this.oFinancedItems_001_org);
		await this._registerTransferNewLineCalculate();
		//Insertar:
		var oQuery =
			INSERT.into(FinancedItems_001).entries([this.newItem]);
		var res = await cds.run(oQuery);
		await this._registerTransferNewLineRelated();
	}
	async _registerTransferNewLineRelated() {
		//Relacionados
		if (this.aUUIDAnu.length !== 0) {
			var oQuery =
				INSERT.into(TransFinItem_001).entries(this.aUUIDAnu);
			var res = await cds.run(oQuery);
			var aIN = this.aUUIDAnu.map(x => {
				return "'" + x.finItem_ID + "'";
			});
			var sQueryWhere = "ID IN (" + aIN.join() + ")";
			var oQueryWhere = cds.parse.expr(sQueryWhere);
			oQuery =
				UPDATE(FinancedItems_001).set({
					status_status: "ANU"
				}).where(oQueryWhere);
			await cds.run(oQuery);
		}
	}
	async _registerTransferNewLineCalculate() {
		//Definir ID:
		this.newItem.ID = uuid();
		this.oTransfer.newFinItem_ID = this.newItem.ID;
		//Obtener secuencia:
		this.newItem.secuence = await Helpers.getLastSecuenceFI(this.newItem.serial);
		this.newItem.secuence++;
		//Obtener fecha inicio y fin:
		this.newItem.dateStart = this.oTransfer.dateStart;
		this.newItem.dateEnd = moment(this.newItem.datestart)
			.add(parseInt(this.oTransfer.finDays), "d")
			.format();
		//Nuevo ID financiera:
		this.newItem.finSrv_finCode = this.oTransfer.newFin_finCode;
		//Datos financiamiento:
		this.newItem.dateDisplay = this.newItem.dateEnd;
		this.newItem.costAmt = Number(this.newItem.costAmt);
		this.newItem.financedAmt = Number(this.oTransfer.financedAmt);
		this.newItem.balanceAmt = this.newItem.financedAmt;
		this.newItem.graceDays = parseInt(this.oTransfer.graceDays);
		this.newItem.rateValue = 0;
		this.newItem.diffPerc = 0;
		this.newItem.intMonthDay = 0;
		this.newItem.intMonthSum = 0;
		this.newItem.intAllDay = 0;
		this.newItem.intAllSum = 0;
		this.newItem.intSumPay = 0;
		this.newItem.payedAmt = 0;
		this.newItem.accExpense = this.oTransfer.accExpense;
		this.newItem.accIncome = this.oTransfer.accIncome;
		this.newItem.sapBELNR1T = this.oTransfer.sapBELNR1T;
		this.newItem.sapBUKRS1T = this.oTransfer.sapBUKRS1T;
		this.newItem.sapGJAHR1T = this.oTransfer.sapGJAHR1T;
		this.newItem.sapBELNRKA = this.oTransfer.sapBELNRKA;
		this.newItem.sapBUKRSKA = this.oTransfer.sapBUKRSKA;
		this.newItem.sapGJAHRKA = this.oTransfer.sapGJAHRKA;
		//Sumar costos financiamiento Fondo estrella
		await this._registerTransferNewLineCalculateFE();
	}
	async _registerTransferNewLineCalculateFE() {
		//Obtener los datos por tipo subfinanciamiento e UNIDAD ID
		var oQuery = SELECT.from(FinancedItems_001).where({
			fundSubType_ID: "ACCS_FE",
			status_status: "FIN",
			unidadID: this.oTransfer.unidadID
		});
		var oRes = await cds.run(oQuery);
		for (var x of oRes) {
			var oRelatedT = this.aCollection.find(y => y.oldFinItemID === x.ID);
			this.newItem.costAmt += Number(x.costAmt);
			this.newItem.financedAmt += Number(oRelatedT.financedAmt);
			this.newItem.balanceAmt = this.newItem.financedAmt;
			this.oTransfer.financedAmt = this.newItem.balanceAmt;
			this.aUUIDAnu.push({
				finTrans_ID: this.oTransfer.ID,
				finItem_ID: x.ID
			});
		}
	}
}