'use strict';
const moment = require('moment-timezone');
const Helpers = require('./Helpers.js');
const ErrorBA = require('./ErrorBA.js');
const {
	uuid
} = require('uuidv4');
const {
	FinancedItems_001
} = cds.entities('BD.VN.PP.XDATA');
module.exports = class DoUnitExit {
	constructor(sUUID) {
		this.oFinancedItem = {};
		this.oFinancedItem.ID = sUUID;
	}

	/**
	 * Registra salida de unidad
	 */
	async registerOut() {
		try {
			await this._registerOutGetDB();
			var res = await this._registerOutGetUpdate();
			return res;
		} catch (ex) {
			console.log(ex);
		}
		return false;
	}

	/**
	 * Obtiene información en BD
	 */
	async _registerOutGetDB() {
		var oQuery = SELECT.from(FinancedItems_001).where({
			ID: this.oFinancedItem.ID,
			status_status: "PAG"
		});
		var res = await cds.run(oQuery);
		if (res.length === 0) {
			throw new ErrorBA("No se encontró unidad en estatus PAG");
		}
		this.oFinancedItem = res[0];
	}

	/**
	 * Obtiene información en BD
	 */
	async _registerOutGetUpdate() {
		var oQuery = UPDATE(FinancedItems_001).set({
			status_status: "SAL",
			dateUnitExit: moment().format(),
		}).where({
			unidadID: this.oFinancedItem.unidadID,
			status_status: "PAG"
		});
		var res = await cds.run(oQuery);
		return res != 0;
	}
}