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
	FinancedItemCurrEx_001,
	FinancedItems_001
} = cds.entities('BD.VN.PP.XDATA');
const {
	CancelFinDocSet,
	CreateFinDocSet,
	ItemsSet,
	RetSet
} = require('../odata-client/z-od-scp-bavnpp-001-service');
const {
	uuid
} = require('uuidv4');
module.exports = class FinancedItemCurrExRev {
	constructor(newFinItem_ID, user) {
		this.oCURREX = {};
		this.oCURREX.newFinItem_ID = newFinItem_ID;
		this.oldFinancedItem = {};
		this.newFinancedItem = {};
		this.user = user;
		this.sCallingApp = "BAVNPP001";
	}

	/**
	 * Elimina el cambio de moneda
	 */
	async deleteCurrEx() {
		//Si no es suceptible a anular, omitir:
		if (!this.checkRevCurrEx(this.oCURREX.newFinItem_ID)) {
			return false;
		}
		try {
			//Obtener dato a anular
			this.newFinancedItem = await this._getFinancedItem_new();
			//Debe de existir en la tabla SecFin como newFinancedItem
			this.oCURREX = await this._getCurrEx();
			//Obtener dato a restablecer
			this.oldFinancedItem = await this._getFinancedItem_old();
			//Manipulación de datos:
			await this._deleteCurrEx();
		} catch (ex) {
			console.log("checkRevCurrEx", ex);
			return false;
		}
		return true;
	}

	/**
	 * Lógica de anulación de moneda
	 */
	async _deleteCurrEx() {
		//Anular documentos SAP
		await this._deleteCurrEx_RevDocs();
		//Línea nueva marcar como finalizada:
		await this._deleteCurrEx_New();
		//Insertar la línea reversal:
		await this._deleteCurrEx_Old();
		//Actualizar con documentos anulados y nueva línea
		await this._deleteCurrEx_Model();

	}

	/**
	 * Actualiza el modelo
	 */
	async _deleteCurrEx_Model() {

		//Insertar secuencia:
		var oQuery =
			UPDATE(FinancedItemCurrEx_001).set({
				sapSTBLG1T: this.oCURREX.sapSTBLG1T,
				sapSTBLGKA: this.oCURREX.sapSTBLGKA,
				flagReverse: true
			}).where({
				ID: this.oCURREX.ID
			});
		try {
			cds.run(oQuery);
		} catch (ex) {
			console.log("_deleteCurrEx_Model", ex);
			throw ex;
		}
	}

	/**
	 * Elimina documentos
	 */
	async _deleteCurrEx_RevDocs() {
		var aPromise = [];
		aPromise.push(this._deleteCurrEx_RevDocs_1T());
		aPromise.push(this._deleteCurrEx_RevDocs_KA());
		await Promise.all(aPromise);
	}

	/**
	 * Elimina documento 1t
	 */
	async _deleteCurrEx_RevDocs_1T() {
		var sDocID = this.oCURREX.sapBELNR1T + this.oCURREX.sapBUKRS1T + this.oCURREX.sapGJAHR1T;
		//Anular en SAP:
		const doc = CancelFinDocSet.builder()
			.idvehi(this.newFinancedItem.unidadID)
			.docid(sDocID)
			.scpuser(this.user)
			.scpapp(this.sCallingApp)
			.cancelind("")
			.canceldoc("")
			.build();
		try {
			let res = await CancelFinDocSet.requestBuilder().create(doc)
				.execute({
					destinationName: Helpers.getDestinationName()
				});
			this.oCURREX.sapSTBLG1T = res.canceldoc;
			Helpers.updateLogSTBLG(this.oCURREX.sapBELNR1T, this.oCURREX.sapBUKRS1T, this.oCURREX.sapGJAHR1T, this.oCURREX.sapSTBLG1T);
		} catch (err) {
			console.log("ERRORJCBG_1T", err);
			throw err;
		}
	}

	/**
	 * Elimina documento KA
	 */
	async _deleteCurrEx_RevDocs_KA() {
		var sDocID = this.oCURREX.sapBELNRKA + this.oCURREX.sapBUKRSKA + this.oCURREX.sapGJAHRKA;
		//Anular en SAP:
		const doc = CancelFinDocSet.builder()
			.idvehi(this.newFinancedItem.unidadID)
			.docid(sDocID)
			.scpuser(this.user)
			.scpapp(this.sCallingApp)
			.cancelind("")
			.canceldoc("")
			.build();
		try {
			let res = await CancelFinDocSet.requestBuilder().create(doc)
				.execute({
					destinationName: Helpers.getDestinationName()
				});
			this.oCURREX.sapSTBLGKA = res.canceldoc;
			Helpers.updateLogSTBLG(this.oCURREX.sapBELNRKA, this.oCURREX.sapBUKRSKA, this.oCURREX.sapGJAHRKA, this.oCURREX.sapSTBLGKA);
		} catch (err) {
			console.log("ERRORJCBG_KA", err);
			throw err;
		}
	}

	/**
	 * Restaura elemento anterior
	 */
	async _deleteCurrEx_Old() {

		//Insertar secuencia:
		var oQuery =
			UPDATE(FinancedItems_001).set({
				status_status: "FIN"
			}).where({
				ID: this.oldFinancedItem.ID
			});
		try {
			cds.run(oQuery);
		} catch (ex) {
			console.log("_deleteCurrEx_Old", ex);
			throw ex;
		}
	}

	/**
	 * Elimina nuevo elemento
	 */
	async _deleteCurrEx_New() {

		//Insertar secuencia:
		var oQuery =
			UPDATE(FinancedItems_001).set({
				status_status: "ANU"
			}).where({
				ID: this.newFinancedItem.ID
			});
		try {
			cds.run(oQuery);
		} catch (ex) {
			console.log("_deleteCurrEx_New", ex);
			throw ex;
		}
	}

	/**
	 * Verifica posibilidad de anulación
	 */
	async checkRevCurrEx() {
		try {
			//Obtener dato a anular
			this.newFinancedItem = await this._getFinancedItem_new();
			//Debe de existir en la tabla SecFin como newFinancedItem
			this.oCURREX = await this._getCurrEx();

		} catch (ex) {
			console.log("checkRevCurrEx", ex);
			return false;
		}
		return true;
	}

	/**
	 * Obtiene cambio de moneda
	 */
	async _getCurrEx() {

		//Obtener elemento:
		var oQuery = SELECT.from(FinancedItemCurrEx_001).where({
			"newFinItem_ID": this.oCURREX.newFinItem_ID,
			"flagReverse": false
		});
		var oRes = await cds.run(oQuery);
		if (oRes.length === 0) {
			throw new ErrorBA("Elemento Cambio Moneda no encontrado");
		}
		return oRes[0];
	}

	/**
	 * Busca nuevo elemento a financiar
	 */
	async _getFinancedItem_new() {

		//Obtener elemento a financiar:
		var oQuery = SELECT.from(FinancedItems_001).where({
			"ID": this.oCURREX.newFinItem_ID
		});
		var oRes = await cds.run(oQuery);
		if (oRes.length === 0) {
			throw new ErrorBA("Elemento financiado no encontrado");
		}
		return oRes[0];
	}

	/**
	 * Obtiene elemento previo a cambio de moneda
	 */
	async _getFinancedItem_old() {
		//Obtener elemento a financiar:
		var oQuery = SELECT.from(FinancedItems_001).where({
			"ID": this.oCURREX.oldFinItem_ID
		});
		var oRes = await cds.run(oQuery);
		if (oRes.length === 0) {
			throw new ErrorBA("Elemento financiado no encontrado");
		}
		return oRes[0];
	}

}