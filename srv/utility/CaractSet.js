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
	CaracteriticasSet
} = require('../odata-client/z-od-scp-core-0001-service');
const {
	uuid
} = require('uuidv4');
module.exports = class CaractSet {
	constructor(oFilter, oSelect, oSkip, oTop) {
		this.oFilter = oFilter;
		this.oSelect = oSelect;
		this.oSkip = oSkip;
		this.oTop = oTop;
		this.aItems = [];
	}

	/**
	 * Regresa la información solicitada al servicio de características
	 */
	async getItems() {
		try {
			await this.getFilters();
			await this.setFilters();
			await this.getInfo();
		} catch (ex) {
			console.log(ex);
		}
		return this.aItems;
	}

	/**
	 * Obtiene información de las características desde S/4
	 */
	async getInfo() {
		try {
			var request = CaracteriticasSet.requestBuilder().getAll();
			request = request.skip(this.oSkip).top(this.oTop);
			if (this.oFilterS4 !== undefined) {
				request = request.filter(this.oFilterS4);
			}
			var res = await request.execute({
				destinationName: Helpers.getDestinationName()
			});
			if (this.DescriptionLong !== undefined && this.DescriptionLong.length > 0) {
				res = res.filter(x => x.descriptionLong.indexOf(this.DescriptionLong) !== -1);
			}
			this.aItems = res.map(x => {
				var oRet = {};
				if (this.oSelect.indexOf("Charactname" !== -1)) {
					oRet.Charactname = x.charactname;
				}
				if (this.oSelect.indexOf("ValueCharLong" !== -1)) {
					oRet.ValueCharLong = x.valueCharLong;
				}
				if (this.oSelect.indexOf("DescriptionLong" !== -1)) {
					oRet.DescriptionLong = x.descriptionLong;
				}
				return oRet;
			});
			//Top y skip
			var iStart = 0 + parseInt(this.oSkip);
			var iEnd = iStart + parseInt(this.oTop);
			if (iEnd > this.aItems.length) {
				iEnd = -1;
			}
			this.aItems = this.aItems.slice(iStart, iEnd);
			//console.log(iStart, iEnd, this.aItems.length);
		} catch (ex) {
			console.log(ex);
		}
	}

	/**
	 * Establece filtro para servicio servicio S/4
	 */
	async setFilters() {
		this.oFilterS4 = undefined;
		//Generar filtro para S/4 con los centros:
		var filterAnd = [];
		if (this.Charactname !== undefined) {
			filterAnd.push(CaracteriticasSet.CHARACTNAME.equals(this.Charactname));
		}
		if (filterAnd.length === 0) {
			return;
		}
		this.oFilterS4 = new FilterList(filterAnd, []).flatten();
		//console.log(this.oFilterS4);
	}

	/**
	 * Obtiene características desde servicio S/4
	 */
	async getFilters() {
		this.DescriptionLong = undefined;
		this.Charactname = this.oFilter.split("Charactname").map(x => {
			var separado = x.split("'");
			if (separado.length >= 2) {
				return separado[1];
			}
			return false;
		}).find(x => x !== false);
		var iLen = this.oFilter.indexOf("DescriptionLong");
		if (iLen === -1) {
			return;
		}
		var sDesLong = this.oFilter.substr(iLen, this.oFilter.length);
		this.DescriptionLong = sDesLong.split("DescriptionLong").map(x => {
			var separado = x.split("'");
			if (separado.length >= 2) {
				return separado[1];
			}
			return false;
		}).find(x => x !== false);
	}
}