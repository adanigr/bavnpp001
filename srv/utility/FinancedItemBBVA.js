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
	FinancedItemsPayments_001,
	FinancedInterest_001
} = cds.entities('BD.VN.PP.XDATA');
module.exports = class FinancedItemBBVA {
	constructor(oBBVA, user) {
		this.oBBVA = oBBVA;
		this.sCallingApp = "BAVNPP001";
		this.user = user;
	}

	/**
	 * Regresa el elemento privado
	 */
	getElement() {
			return this.oBBVA;
		}
		/**
		 * Auxiliar para la generación de banderas
		 */
	async createMethod() {
		this.createMethod_SetDefault();
		await this._createMethod_flagGen();
	}

	/**
	 * Genera datos por defecto
	 */
	createMethod_SetDefault() {
			if (this.oBBVA.flagGen === null) {
				this.oBBVA.flagGen = false;
			}
			if (this.oBBVA.flagTra === null) {
				this.oBBVA.flagTra = false;
			}
			if (this.oBBVA.flagPay === null) {
				this.oBBVA.flagPay = false;
			}
			if (this.oBBVA.flagCal === null) {
				this.oBBVA.flagCal = false;
			}
			if (this.oBBVA.flagReverse === null) {
				this.oBBVA.flagReverse = false;
			}
			if (this.oBBVA.userTxt == null) {
				this.oBBVA.userTxt = "";
			}
			if (this.oBBVA.sapBELNRKR == null) {
				this.oBBVA.sapBELNRKR = "";
			}
			if (this.oBBVA.sapBUKRSKR == null) {
				this.oBBVA.sapBUKRSKR = "";
			}
			if (this.oBBVA.sapGJAHRKR == null) {
				this.oBBVA.sapGJAHRKR = "";
			}
			if (this.oBBVA.sapBLDATKR == null) {
				this.oBBVA.sapBLDATKR = null;
			}
			if (this.oBBVA.sapSTBLGKR == null) {
				this.oBBVA.sapSTBLGKR = "";
			}
			if (this.oBBVA.sapBELNRKZ == null) {
				this.oBBVA.sapBELNRKZ = "";
			}
			if (this.oBBVA.sapBUKRSKZ == null) {
				this.oBBVA.sapBUKRSKZ = "";
			}
			if (this.oBBVA.sapGJAHRKZ == null) {
				this.oBBVA.sapGJAHRKZ = "";
			}
			if (this.oBBVA.sapBLDATKZ == null) {
				this.oBBVA.sapBLDATKZ = null;
			}
			if (this.oBBVA.sapSTBLGKZ == null) {
				this.oBBVA.sapSTBLGKZ = "";
			}

		}
		/**
		 * Actualiza elemento con información recibida
		 */
	static async saveElement(oBBVA) {
		//Guardar documentos:
		var oQuery =
			UPDATE(FinancedInterest_001).set({
				flagGen: Boolean(oBBVA.flagGen),
				flagTra: Boolean(oBBVA.flagTra),
				flagPay: Boolean(oBBVA.flagPay),
				flagCal: Boolean(oBBVA.flagCal),
				//	userTxt: oBBVA.userTxt,
				sapBELNRKR: oBBVA.sapBELNRKR,
				sapBUKRSKR: oBBVA.sapBUKRSKR,
				sapGJAHRKR: oBBVA.sapGJAHRKR,
				sapBLDATKR: oBBVA.sapBLDATKR,
				sapSTBLGKR: oBBVA.sapSTBLGKR,
				sapBELNRKZ: oBBVA.sapBELNRKZ,
				sapBUKRSKZ: oBBVA.sapBUKRSKZ,
				sapGJAHRKZ: oBBVA.sapGJAHRKZ,
				sapBLDATKZ: oBBVA.sapBLDATKZ,
				sapSTBLGKZ: oBBVA.sapSTBLGKZ,
				flagReverse: Boolean(oBBVA.flagReverse)
			}).where({
				"ID": oBBVA.ID
			});
		try {
			cds.run(oQuery);
		} catch (err) {
			throw new ErrorBA("Error desconocido FinancedItemBBVA.saveElement_update");
		}
		if (oBBVA.flagCal === true) {
			//console.log("-----------Se borraran otras propuestas");
			//Borrar todos los demás
			var oDelete =
				DELETE.from(FinancedInterest_001).where(
					[{
						ref: ["finItem_ID"]
					}, "=", {
						val: oBBVA.finItem_ID
					}, "and", {
						ref: ["ID"]
					}, "<>", {
						val: oBBVA.ID
					}, "and", {
						ref: ["flagCal"]
					}, "=", {
						val: true
					}, "and", {
						ref: ["sapGJAHR"]
					}, "=", {
						val: oBBVA.sapGJAHR
					}, "and", {
						ref: ["sapMONAT"]
					}, "=", {
						val: oBBVA.sapMONAT
					}]);
			try {
				cds.run(oDelete);
			} catch (err) {
				throw new ErrorBA("Error desconocido FinancedItemBBVA.saveElement_delete");
			}
		}
	}

	/**
	 * Ingresa el usuario responsable de la acción
	 */
	async _createMethod_flagGen() {
		//Si no tiene el flag, ignorar.
		if (!Boolean(this.oBBVA.flagCal)) {
			return;
		}
		this.oBBVA.userTxt = this.user;
	}
}