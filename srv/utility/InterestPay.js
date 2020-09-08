'use strict';
const moment = require('moment-timezone');
const TablaInteres = require('./types/TablaInteres.js');
const CalIntereses = require('./CalIntereses.js');
const Helpers = require('./Helpers.js');
module.exports = class InterestPay {

	constructor(item) {
			this.InterestPayItem = item;
			this.FinancedItem = {};
			this.FinancedItem.ID = this.InterestPayItem.FinancedItemID;
			moment.tz.setDefault("America/Mexico_City");
		}
		/**
		 * Obtiene elemento de interés redondeado a dos decimales
		 */
	getItem() {
		this.InterestPayItem.intRecalAmt = Number(Number(this.InterestPayItem.intRecalAmt).toFixed(2));
		return this.InterestPayItem;
	}

	/**
	 * Obtiene información del elemento financiado
	 */
	async getFinancedItem() {
		const {
			FinancedItems_001
		} = cds.entities('BD.VN.PP.XDATA');
		//Realizar query
		let oQueryRateType = SELECT.from(FinancedItems_001)
			.where({
				"ID": this.FinancedItem.ID,
			})
			.limit(1, 0);
		let aRes = await cds.run(oQueryRateType);
		this.FinancedItem = aRes[0];
		await this._getFinType();
	}

	/**
	 * Calcula los intereses a pagar a partir de una unidad.
	 */
	async getIntPayAmt() {
		this.InterestPayItem.intRecalAmt = 0;
		this.FinancedItem.balanceAmt = Number(this.InterestPayItem.payedAmt);
		let calIntereses = new CalIntereses(this.FinancedItem);
		let res = await calIntereses.getInterests(moment(this.InterestPayItem.datePay));
		this.FinancedItem = res;
		this.InterestPayItem.intRecalAmt = this.FinancedItem.intMonthSum;
	}

	/**
	 * Obtiene tipo de financiamiento
	 */
	async _getFinType() {
		const {
			ViewInterestPay_001
		} = cds.entities('BD.VN.PP.XVIEW');
		//Realizar query
		let oQueryRateType = SELECT.from(ViewInterestPay_001)
			.where({
				"ID": this.FinancedItem.ID,
			})
			.limit(1, 0);
		let aRes = await cds.run(oQueryRateType);
		this.ViewInterestPay_001 = aRes[0];
	}

}