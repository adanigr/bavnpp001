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
	FinancedItemsSecFin_001,
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
module.exports = class FinancedItemsSecFinRev {

	constructor(newFinItem_ID, user) {
		this.oSecFin = {};
		this.oSecFin.newFinItem_ID = newFinItem_ID;
		this.oldFinancedItem = {};
		this.newFinancedItem = {};
		this.revFinancedItem = {};
		this.user = user;
		this.sCallingApp = "BAVNPP001";
	}

	/**
	 * Elimina segunda financiera reestableciendo los datos anteriores
	 */
	async deleteSecFin() {
		try {
			//Obtener dato a anular
			this.newFinancedItem = await this._getFinancedItem_new();
			//Debe de existir en la tabla SecFin como newFinancedItem
			this.oSecFin = await this._getFinancedSecFin();
			//Obtener dato a restablecer
			this.oldFinancedItem = await this._getFinancedItem_old();
			//Manipulación de datos:
			await this._deleteSecFin();
		} catch (ex) {
			console.log("checkRevSecFin", ex);
			return false;
		}
		return true;
	}

	/**
	 * Anula segundo elemento financiero e inserta la nueva línea
	 */
	async _deleteSecFin() {
		//Anular documentos SAP
		await this._deleteSecFin_RevDocs();
		//Línea nueva marcar como finalizada:
		await this._deleteSecFin_New();
		//Insertar la línea reversal:
		await this._deleteSecFin_Old();
		//Actualizar con documentos anulados y nueva línea
		await this._deleteSecFin_Model();

	}

	/**
	 * Actualiza la información sobre el documento anulado
	 */
	async _deleteSecFin_Model() {
		//Insertar secuencia:
		var oQuery =
			UPDATE(FinancedItemsSecFin_001).set({
				sapSTBLG1T: this.oSecFin.sapSTBLG1T,
				flagReverse: true
			}).where({
				ID: this.oSecFin.ID
			});
		try {
			cds.run(oQuery);
		} catch (ex) {
			console.log("_deleteSecFin_Model", ex);
			throw ex;
		}
	}

	/**
	 * Anulación de documentos SAP
	 */
	async _deleteSecFin_RevDocs() {
		var sDocID = this.oSecFin.sapBELNR1T + this.oSecFin.sapBUKRS1T + this.oSecFin.sapGJAHR1T;
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
			this.oSecFin.sapSTBLG1T = res.canceldoc;
			Helpers.updateLogSTBLG(this.oSecFin.sapBELNR1T, this.oSecFin.sapBUKRS1T, this.oSecFin.sapGJAHR1T, this.oSecFin.sapSTBLG1T);
		} catch (err) {
			console.log("ERRORJCBG_1T", err);
			throw err;
		}
	}

	/**
	 * Regresa elemento original 
	 */
	async _deleteSecFin_Old() {
		var oQuery =
			UPDATE(FinancedItems_001).set({
				status_status: "PAG"
			}).where({
				ID: this.oldFinancedItem.ID
			});
		try {
			cds.run(oQuery);
		} catch (ex) {
			console.log("_deleteSecFin_New", ex);
			throw ex;
		}
	}

	/**
	 * Actualiza el estatus anulado de la nueva financiera
	 */
	async _deleteSecFin_New() {
		var oQuery =
			UPDATE(FinancedItems_001).set({
				status_status: "ANU"
			}).where({
				ID: this.newFinancedItem.ID
			});
		try {
			cds.run(oQuery);
		} catch (ex) {
			console.log("_deleteSecFin_New", ex);
			throw ex;
		}
	}

	/**
	 * Verifica si el elementos a anular si existe
	 */
	async checkRevSecFin() {
		try {
			//Obtener dato a anular
			this.newFinancedItem = await this._getFinancedItem_new();
			//Debe de existir en la tabla SecFin como newFinancedItem
			this.oSecFin = await this._getFinancedSecFin();
		} catch (ex) {
			console.log("checkRevSecFin", ex);
			return false;
		}
		return true;
	}

	/**
	 * Obtiene el elemento a financiar
	 */
	async _getFinancedSecFin() {
		//Obtener elemento a financiar:
		var oQuery = SELECT.from(FinancedItemsSecFin_001).where({
			"newFinItem_ID": this.oSecFin.newFinItem_ID,
			"flagReverse": false
		});
		var oRes = await cds.run(oQuery);
		if (oRes.length === 0) {
			throw new ErrorBA("Elemento segunda financiera no encontrado");
		}
		return oRes[0];
	}

	/**
	 * Obtiene elemento segunda financiera con estatus FIN
	 */
	async _getFinancedItem_new() {
		//Obtener elemento a financiar:
		var oQuery = SELECT.from(FinancedItems_001).where({
			"ID": this.oSecFin.newFinItem_ID,
			"status_status": "FIN",
			"payedAmt": 0
		});
		var oRes = await cds.run(oQuery);
		if (oRes.length === 0) {
			throw new ErrorBA("Elemento financiado no encontrado");
		}
		return oRes[0];
	}

	/**
	 * Obtiene elemento segunda financiera original a reestablecer
	 */
	async _getFinancedItem_old() {
		//Obtener elemento a financiar:
		var oQuery = SELECT.from(FinancedItems_001).where({
			"ID": this.oSecFin.oldFinItemID
		});
		var oRes = await cds.run(oQuery);
		if (oRes.length === 0) {
			throw new ErrorBA("Elemento financiado no encontrado");
		}
		return oRes[0];
	}

}