'use strict';
const moment = require('moment-timezone');
const Helpers = require('./Helpers.js');
const ErrorBA = require('./ErrorBA.js');
const CalIntereses = require('./CalIntereses.js');

const {
	FinancedItems_001
} = cds.entities('BD.VN.PP.XDATA');
const {
	ViewFinancedItems_001
} = cds.entities('BD.VN.PP.XVIEW');
module.exports = class RelatedItems {
	constructor(oInputUUID) {
		this.oInputUUID = oInputUUID;
		moment.tz.setDefault("America/Mexico_City");
	}
	async getRelatedUUIDs() {
		var oRes = await this._getFinItem();
		return oRes;
	}
	async _getFinItem() {
		var aID = [];
		var aUnidadID = [];
		var aStatus = [];
		this.oInputUUID.forEach(x => {
			if (aID.indexOf(x) === -1) {
				aID.push("'" + x + "'");
			}
		});
		var sQueryWhereIn = "ID IN(" + aID.join() + ")";
		var oQueryWhereIn = cds.parse.expr(sQueryWhereIn);
		var oQueryIn = SELECT.from(FinancedItems_001, ["ID", "unidadID", "status_status"]).where(oQueryWhereIn);
		var oResIn = await cds.run(oQueryIn);
		oResIn.forEach(x => {
			if (aUnidadID.indexOf(x.unidadID) === -1) {
				aUnidadID.push("'" + x.unidadID + "'");
			}
			if (aStatus.indexOf(x.status_status) === -1) {
				aStatus.push("'" + x.status_status + "'");
			}
		});
		var sQueryWhere = "ID NOT IN(" + aID.join() + ") " +
			" AND unidadID IN " +
			"(" + aUnidadID.join() + ") " +
			" AND status_status IN " +
			"(" + aStatus.join() + ") ";
		var oQueryWhere = cds.parse.expr(sQueryWhere);
		var oQuery = SELECT.from(ViewFinancedItems_001).where(oQueryWhere);
		var oRes = await cds.run(oQuery);
		var aSetProc = [];
		for (const dato of oRes) {
			let Intereses = new CalIntereses(dato);
			aSetProc.push(Intereses.getInterests(moment(), true));
		}
		var oResInt = await Promise.all(aSetProc);
		return oResInt;
	}
}