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
module.exports = class FinItemsInv {

	constructor(uuidVehicle, user, callingApp) {
		this.uuidVehicle = uuidVehicle;
		this.user = user;
		this.return = {
			Idvehi: "",
			StatusCode: "",
			StatusText: "",
			FinCode: "",
			FinText: ""
		};
		this.oFinancedItem = null;
		this.sCallingApp = callingApp;
	}

	/**
	 * Obtiene elemento de respuesta para retornar al externo
	 */
	getResponse() {
		return this.return;
	}

	/**
	 * Realiza la búsqueda del elemento financiado a aprtir del ID Vehículo
	 */
	async lookupFinancedItem() {
		this.return.Idvehi = this.uuidVehicle;
		//Buscar elemento financiado:
		this.oFinancedItem = await this._getFinancedItemData_Unit();
		if (this.oFinancedItem !== null) {
			this.return.StatusCode = this.oFinancedItem.status_status;
			this.return.StatusText = this.oFinancedItem.status_description;
			this.return.FinCode = this.oFinancedItem.finSrv_finCode;
			this.return.FinText = this.oFinancedItem.finSrv_description;
		}
	}

	/**
	 * Obtiene toda la información del elemento a finacniar
	 */
	async _getFinancedItemData_Unit() {
		const {
			ViewFinancedItems_001
		} = cds.entities('BD.VN.PP.XVIEW');
		//Obtener elemento a financiar:
		var oQuery = SELECT.from(ViewFinancedItems_001, [
			"unidadID", "status_status", "status_description", "finSrv_finCode", "finSrv_description"
		]).where({
			"unidadID": this.uuidVehicle,
			"fundSubType_ID": "UN_VN"
		}).orderBy({
			secuence: "desc"
		}).limit(1, 0);
		var oRes = await cds.run(oQuery);
		if (oRes.length === 0) {
			return null;
		}
		return oRes[0];
	}

}