'use strict';
const moment = require('moment-timezone');
const Helpers = require('./Helpers.js');
const ErrorBA = require('./ErrorBA.js');
const {
	LayoutHeader_001,
	LayoutUnits_001
} = cds.entities('BD.VN.PP.XDATA');
module.exports = class LayoutDownload {
	constructor(oLayoutDownload) {
		this.oLayoutDownload = oLayoutDownload;
	}

	/**
	 * Obtiene todos los elementos relacionados por el ID Unidad
	 */
	static async getRelatedItems(aUUID) {
		var aID = [];
		var oInput = aUUID.map(x => "'" + x + "'");
		var sQueryWhereIn = "unidadID IN(" + oInput.join() + ")";
		var oQueryWhereIn = cds.parse.expr(sQueryWhereIn);
		var oQueryIn = SELECT.from(LayoutUnits_001, ["ID", "unidadID", "layoutHead_ID"]).where(oQueryWhereIn);
		var oResIn = await cds.run(oQueryIn);
		if (oResIn.length === 0) {
			return [];
		}
		oResIn.forEach(x => {
			if (aID.indexOf(x.layoutHead_ID) === -1) {
				aID.push("'" + x.layoutHead_ID + "'");
			}
		});
		var sQueryWhere = "ID IN(" + aID.join() + ") ";
		var oQueryWhere = cds.parse.expr(sQueryWhere);
		var oQuery = SELECT.from(LayoutHeader_001).where(oQueryWhere);
		var oRes = await cds.run(oQuery);
		return oRes;
	}

	/**
	 * Obtiene el binario del layout para descargar
	 */
	async getLayout() {
		this.oLayoutDownload.file = [];
		var aPromise = [];
		aPromise.push(this.getLayoutData());
		await Promise.all(aPromise);
		return this.oLayoutDownload;
	}

	/**
	 * Obtiene la información del layout a partir de la marca de generación
	 */
	async getLayoutData() {
		//Obtener elemento a descargar:
		var oQuery = SELECT.from(LayoutHeader_001).where({
			"genMark": this.oLayoutDownload.genMark
		});
		var oRes = await cds.run(oQuery);
		var aPromise = [];
		for (var oFile of oRes) {
			this.oLayoutDownload.file.push({
				Data: oFile.file,
				FileName: oFile.fileName,
				FileExtension: oFile.fileExt,
				MimeType: oFile.fileMime,
				Charset: oFile.fileCharset,
				ByteOrderMark: false
			});
			var oQueryUpd = UPDATE(LayoutHeader_001).set({
				downCount: parseInt(oFile.downCount) + 1
			}).where({
				ID: oFile.ID
			});
			aPromise.push(cds.run(oQueryUpd));
		}
		var res = await Promise.all(aPromise);
		//console.log(res);
	}
}