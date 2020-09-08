'use strict';
const moment = require('moment-timezone');
const Helpers = require('./Helpers.js');
const ErrorBA = require('./ErrorBA.js');
const CalIntereses = require('./CalIntereses.js');
const {
	uuid
} = require('uuidv4');
const {
	ViewFinancedItems_001
} = cds.entities('BD.VN.PP.XVIEW');
module.exports = class GetTableInterest {
	constructor(sUUID) {
		this.oFinancedItem = {};
		this.oFinancedItem.ID = sUUID;
		this.oInterestTable = [];
		moment.tz.setDefault("America/Mexico_City");
	}

	/**
	 * Genera la tabla de intereses a partir de la información recibida
	 */
	async getTable() {
		await this._getFinancedItem();
		var aInterests = await this._getInterests();
		var iSecuence = 1;
		var oRet = aInterests.map(x => {
			return {
				"finItem_ID": this.oFinancedItem.ID,
				"secuence": iSecuence++,
				"bPayFlag": x.bPayFlag,
				"dDateStart": moment(x.dDateStart).format('YYYY-MM-DD'),
				"dDateEnd": moment(x.dDateEnd).format('YYYY-MM-DD'),
				"dDateRate": moment(x.dDateRate).format('YYYY-MM-DD'),
				"fBalanceAmt": Number(Number(x.fBalanceAmt).toFixed(2)),
				"iYear": parseInt(x.iYear),
				"iPeriod": parseInt(x.iPeriod),
				"iDay": parseInt(x.iDay),
				"fRateValue": Number(Number(x.fRateValue).toFixed(5)),
				"iIntDays": parseInt(x.iIntDays),
				"fIntSum": Number(Number(x.fIntSum).toFixed(2)),
				"fAmtPay": Number(Number(x.fAmtPay).toFixed(2)),
				"fIntPay": Number(Number(x.fIntPay).toFixed(2))
			};
		});
		return oRet;
	}

	/**
	 * Obtiene elemento financiado desde la base de datos
	 */
	async _getFinancedItem() {
		var oQuery = SELECT.from(ViewFinancedItems_001).where({
			ID: this.oFinancedItem.ID
		});
		var res = await cds.run(oQuery);
		this.oFinancedItem = res[0];
	}

	/**
	 * Calcula los intereses y obtiene la tabla de intereses
	 */
	async _getInterests() {
		var Intereses = new CalIntereses(this.oFinancedItem);
		await Intereses.getInterests(moment(), false);
		return Intereses.getInterestTable();
	}
}