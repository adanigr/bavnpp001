'use strict';
const moment = require('moment-timezone');
const Helpers = require('./Helpers.js');
const ErrorBA = require('./ErrorBA.js');
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
const {
	FinancedItems_001,
	FinancedItemsPayments_001,
	FinancedItemsRecal_001,
	FinancedItemCurrEx_001
} = cds.entities('BD.VN.PP.XDATA');
const {
	FinOperAccs_001,
	TransferAccs_001
} = cds.entities('BD.VN.PP.XCFG');
module.exports = class FinancedItemCurrExSet {
	constructor(oCURREX, user) {
		this.oCURREX = oCURREX;
		this.oldFinancedItem = {};
		this.newFinancedItemm = {};
		this.sCallingApp = "BAVNPP001";
		this.user = user;
		this.headerTxt = "Cambio de Moneda"
	}

	/**
	 * Obtiene el elemento
	 */
	async getElement() {
		return this.oCURREX;
	}

	/**
	 * Guarda elemento en tabla
	 */
	static async saveElement(oCURREX) {
		//Guardar documentos:
		var oQuery =
			UPDATE(FinancedItemCurrEx_001).set({
				secuence: parseInt(oCURREX.secuence),
				oldCost: Number(oCURREX.oldCost),
				oldAmount: Number(oCURREX.oldAmount),
				oldBalance: Number(oCURREX.oldBalance),
				oldPayed: Number(oCURREX.oldPayed),
				sapBUKRS1T: oCURREX.sapBUKRS1T,
				sapBELNR1T: oCURREX.sapBELNR1T,
				sapGJAHR1T: oCURREX.sapGJAHR1T,
				sapSTBLG1T: oCURREX.sapSTBLG1T,
				sapBUKRSKA: oCURREX.sapBUKRSKA,
				sapBELNRKA: oCURREX.sapBELNRKA,
				sapGJAHRKA: oCURREX.sapGJAHRKA,
				sapSTBLGKA: oCURREX.sapSTBLGKA,
				newFinItem_ID: oCURREX.newFinItem_ID
			}).where({
				"ID": oCURREX.ID
			});
		try {
			var res = await cds.run(oQuery);
		} catch (err) {
			throw new ErrorBA("Error desconocido saveElement_update");
		}
	}

	/**
	 * Inserta nuevos elementos
	 */
	static async createMethodFunction_SaveItems(aItems) {
		var res = 0;
		//Guardar documentos:
		var oQuery =
			INSERT.into(FinancedItemCurrEx_001).entries(aItems);
		try {
			res = await cds.run(oQuery);
		} catch (err) {
			console.log(err);
		}
		return res;
	}

	/**
	 * Crea nuevo elemento
	 */
	async createMethodFunction() {
		var oOriginal = Object.assign({}, this.oCURREX);
		try {
			this.oCURREX.ID = uuid();
			this.oCURREX.flagReverse = false;
			await this.createMethod();
			this.oCURREX.exchangeRate = Number(this.oCURREX.exchangeRate);
			this.oCURREX.oldCost = Number(this.oCURREX.oldCost);
			this.oCURREX.oldAmount = Number(this.oCURREX.oldAmount);
			this.oCURREX.oldBalance = Number(this.oCURREX.oldBalance);
			this.oCURREX.oldPayed = Number(this.oCURREX.oldPayed);
			return this.oCURREX;
		} catch (ex) {
			console.log(ex);
			return false;
		}
	}

	/**
	 * Obtiene nuevos valores por defecto
	 */
	async createMethod() {
		this.oldFinancedItem = await this._createMethod_getOrg();
		this.newFinancedItem = await this._createMethod_getNew();
		this.ViewFinSrvCredits_001 = await Helpers.getFinSrvs(
			this.oldFinancedItem.fundSubType_ID,
			this.oldFinancedItem.center,
			this.oldFinancedItem.finSrv_finCode);
		await this.createMethod_SetDefault();
		await this._createMethod_generateKA1T();
		await this._createMethod_finItems();
	}

	/**
	 * Genera nuevo elemento a financiar y modifica el anterior
	 */
	async _createMethod_finItems() {
		await this._createMethod_finItems_New();
		await this._createMethod_finItems_Old();
	}

	/**
	 * Inserta nuevo elemento a financiar
	 */
	async _createMethod_finItems_New() {
		const {
			FinancedItems_001
		} = cds.entities('BD.VN.PP.XDATA');
		//Actualizar:
		var oQuery =
			INSERT.into(FinancedItems_001).entries([this.newFinancedItem]);
		try {
			this.resNew = await cds.run(oQuery);
		} catch (err) {
			console.log(err);
			throw new ErrorBA("Error desconocido _createMethod_finItems_New");
		}
	}

	/**
	 * Actualiza el elemento anterior
	 */
	async _createMethod_finItems_Old() {
		const {
			FinancedItems_001
		} = cds.entities('BD.VN.PP.XDATA');
		//Guardar documentos:
		var oQuery =
			UPDATE(FinancedItems_001).set({
				status_status: "ANU"
			}).where({
				"ID": this.oldFinancedItem.ID
			});
		try {
			this.resOld = await cds.run(oQuery);
		} catch (err) {
			throw new ErrorBA("Error desconocido _createMethod_finItems_Old");
		}
	}

	/**
	 * Genera documentos KA y 1T
	 */
	async _createMethod_generateKA1T() {
		await this._createMethod_generateKA1T_KA();
		await this._createMethod_generateKA1T_1T();
	}

	/**
	 * Genera documento KA
	 */
	async _createMethod_generateKA1T_KA() {
		try {
			const _KA = CreateFinDocSet.builder()
				.hdid(this.oCURREX.ID)
				.idvehi(this.oldFinancedItem.unidadID)
				.vin(this.oldFinancedItem.serial)
				.company(this.oldFinancedItem.companyCode)
				.finoper("CM_KA")
				.account("")
				.docDate(moment().format("YYYYMMDD"))
				.hdtext(this.headerTxt)
				.scpuser(this.user)
				.scpapp(this.sCallingApp)
				.exchRate(this.oCURREX.exchangeRate)
				.itemsSet([
					ItemsSet.builder()
					.hdid(this.oCURREX.ID)
					.vendorNo(this.ViewFinSrvCredits_001.sapLifnr)
					.segment(this.oldFinancedItem.segment)
					.division(this.oldFinancedItem.center)
					.itemtext(this.headerTxt)
					.currency(this.oldFinancedItem.currency)
					.amount(this.oldFinancedItem.balanceAmt)
					.build()
				]).retSet([])
				.build();

			let res = await CreateFinDocSet
				.requestBuilder()
				.create(_KA)
				.execute({
					destinationName: Helpers.getDestinationName()
				});
			if (res.retSet[0].type === "S") {
				var oDocuments = Helpers.getDocNumbers(res.retSet[0]);
				var oLog = Helpers.getDocLogEntity(this.oldFinancedItem.unidadID, oDocuments, "", this.user, this.headerTxt,
					"FICURREX");
				Helpers.insertLogEntries([oLog]);
				this.oCURREX.sapBELNRKA = oDocuments.belnr;
				this.oCURREX.sapBUKRSKA = oDocuments.bukrs;
				this.oCURREX.sapGJAHRKA = oDocuments.gjahr;
				this.oCURREX.sapSTBLGKA = "";
			} else {
				Helpers.documentFIErrorLog(retSet, this.oCURREX.ID);
				throw new ErrorBA('Error en generación de póliza KA');
			}
		} catch (err) {
			if (err.name !== "BAVNPP001") {
				throw new ErrorBA("Error desconocido");
			} else {
				throw err;
			}
		}
		return true;
	}

	/**
	 * Genera documento 1t
	 */
	async _createMethod_generateKA1T_1T() {
		try {
			const _1T = CreateFinDocSet.builder()
				.hdid(this.oCURREX.ID)
				.idvehi(this.newFinancedItem.unidadID)
				.vin(this.newFinancedItem.serial)
				.company(this.newFinancedItem.companyCode)
				.finoper("CM_1T")
				.account("")
				.docDate(moment().format("YYYYMMDD"))
				.hdtext(this.headerTxt)
				.scpuser(this.user)
				.scpapp(this.sCallingApp)
				.itemsSet([
					ItemsSet.builder()
					.hdid(this.oCURREX.ID)
					.vendorNo(this.ViewFinSrvCredits_001.sapLifnr)
					.segment(this.newFinancedItem.segment)
					.division(this.newFinancedItem.center)
					.itemtext(this.headerTxt)
					.currency(this.newFinancedItem.currency)
					.amount(this.newFinancedItem.balanceAmt)
					.build()
				]).retSet([])
				.build();
			let res = await CreateFinDocSet
				.requestBuilder()
				.create(_1T)
				.execute({
					destinationName: Helpers.getDestinationName()
				});
			if (res.retSet[0].type === "S") {
				var oDocuments = Helpers.getDocNumbers(res.retSet[0]);
				var oLog = Helpers.getDocLogEntity(this.oldFinancedItem.unidadID, oDocuments, "", this.user, this.headerTxt,
					"FICURREX");
				Helpers.insertLogEntries([oLog]);
				this.oCURREX.sapBELNR1T = oDocuments.belnr;
				this.oCURREX.sapBUKRS1T = oDocuments.bukrs;
				this.oCURREX.sapGJAHR1T = oDocuments.gjahr;
				this.oCURREX.sapSTBLG1T = "";
			} else {
				Helpers.documentFIErrorLog(retSet, this.oCURREX.ID);
				throw new ErrorBA('Error en generación de póliza 1T');
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

	/**
	 * Parametriza el nuevo elemento a financiar
	 */
	async _createMethod_getNew() {
		var newObj = Object.assign({}, this.oldFinancedItem);
		newObj.ID = uuid();
		this.oCURREX.newFinItem_ID = newObj.ID;
		//Obtener secuencia:
		newObj.secuence = parseInt(newObj.secuence);
		newObj.secuence++;
		//Nueva moneda
		newObj.currency = this.oCURREX.newCurrency;
		//Nueva tasa
		newObj.rateType_rate = "TIIE";
		//Nuevos costos
		newObj.costAmt = Number(newObj.costAmt) * Number(this.oCURREX.exchangeRate);
		newObj.financedAmt = Number(newObj.financedAmt) * Number(this.oCURREX.exchangeRate);
		newObj.balanceAmt = Number(newObj.balanceAmt) * Number(this.oCURREX.exchangeRate);
		newObj.payedAmt = Number(newObj.payedAmt) * Number(this.oCURREX.exchangeRate);
		newObj.intMonthSum = Number(newObj.intMonthSum) * Number(this.oCURREX.exchangeRate);
		newObj.intAllSum = Number(newObj.intAllSum) * Number(this.oCURREX.exchangeRate);
		newObj.intSumPay = Number(newObj.intSumPay) * Number(this.oCURREX.exchangeRate);
		//Nueva fecha inicio:
		var a = moment(newObj.dateStart);
		var b = moment(newObj.dateEnd);
		var iDays = b.diff(a, 'days') + 1;
		newObj.dateStart = this.oCURREX.exchangeDate;
		newObj.dateEnd = moment(newObj.dateStart).add(iDays, 'days').format("YYYY-MM-DD");
		return newObj;
	}

	/**
	 * Obtiene el elemento a financiar original
	 */
	async _createMethod_getOrg() {
		//Obtener elemento a financiar:
		var oQuery = SELECT.from(FinancedItems_001).where({
			"status_status": "FIN",
			"ID": this.oCURREX.oldFinItem_ID
		});
		var oRes = await cds.run(oQuery);
		if (oRes.length === 0) {
			throw new ErrorBA("Elemento financiado no encontrado");
		}
		return oRes[0];
	}

	/**
	 * Parametriza elemento a insertar
	 */
	async createMethod_SetDefault() {
		this.oCURREX.secuence = await Helpers.getLastSecuenceCurrEx(this.oldFinancedItem.ID);
		this.oCURREX.secuence++;
		if (!this.oCURREX.exchangeDate) {
			throw new ErrorBA("Falta campo exchangeDate");
		}
		if (!this.oCURREX.exchangeRate) {
			throw new ErrorBA("Falta campo exchangeRate");
		}
		if (!this.oCURREX.newCurrency) {
			throw new ErrorBA("Falta campo newCurrency");
		}
		this.oCURREX.oldCost = Number(this.oldFinancedItem.costAmt);
		this.oCURREX.oldAmount = Number(this.oldFinancedItem.financedAmt);
		this.oCURREX.oldBalance = Number(this.oldFinancedItem.balanceAmt);
		this.oCURREX.oldPayed = Number(this.oldFinancedItem.payedAmt);
	}
}