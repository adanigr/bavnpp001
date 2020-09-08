const moment = require('moment-timezone');
const Helpers = require('./Helpers.js');
const ErrorBA = require('./ErrorBA.js');
const {
	ViewFinancedItems_001,
	ViewFinList_001
} = cds.entities('BD.VN.PP.XVIEW');
const {
	FinancedItemsTransfers_001,
	FinancedItems_001,
	SegmentInterests_001
} = cds.entities('BD.VN.PP.XDATA');
const {
	InterestJobs_001,
	FinOperAccs_001
} = cds.entities('BD.VN.PP.XCFG');
const {
	CancelFinDocSet,
	CreateFinDocSet,
	ItemsSet,
	RetSet
} = require('../odata-client/z-od-scp-bavnpp-001-service');
module.exports = class InterestReverse {

	/**
	 *  Anula pólizas provision
	 * @param {Object} oReq petición para generar transacción
	 */
	constructor(oReq) {
		this.tx = cds.transaction(oReq);
		this.aExcel = [];
		this.aZips = [];
		this.oRes = "";
		this.sFinOper = "PR_KR";
	}

	/**
	 * Anula documentos provision
	 */
	async doReverseProvision() {
		this.oRes = "OK";
		try {
			//Obtener información de BD
			await this._getPeriod();
			//Obtener elementos a anular
			await this._getItems();
			//Anular elementos
			await this._reverseItems();
		} catch (ex) {
			console.log(ex);
			return ex.message;
		}
		return this.oRes;
	}

	/**
	 * Actualizar en BD
	 */
	async _reverseItemUpdate(oDoc) {
		var oQuery =
			UPDATE(SegmentInterests_001).set({
				sapSTBLGKZ: oDoc.sapSTBLGKZ
			}).where({
				ID: oDoc.ID
			});
		var res = await cds.run(oQuery);
	}

	/**
	 * Anular documento en S/4
	 */
	async _reverseItemsDoc(oDoc) {
		var sDocID = oDoc.sapBELNRKZ + oDoc.sapBUKRSKZ + oDoc.sapGJAHRKZ;
		//Anular en SAP:
		const doc = CancelFinDocSet.builder()
			.idvehi("")
			.docid(sDocID)
			.scpuser("BAVNPP001")
			.scpapp("BAVNPP001")
			.cancelind("")
			.canceldoc("")
			.build();
		try {
			let res = await CancelFinDocSet.requestBuilder().create(doc)
				.execute({
					destinationName: Helpers.getDestinationName()
				});
			oDoc.sapSTBLG1T = res.canceldoc;
			Helpers.updateLogSTBLG(oDoc.sapBELNRKZ, oDoc.sapBUKRSKZ, oDoc.sapGJAHRKZ, oDoc.sapSTBLGKZ);
			await this._reverseItemUpdate(oDoc);
		} catch (err) {
			console.log("ERROR_KR", err);
			throw err;
		}
	}

	/**
	 * Manda a llamar servicio de anulación
	 */
	async _reverseItems() {
		//TODO ANULAR DOCS
		for (var oDoc of this.aDocsList) {
			//console.log("Anular documento", oDoc.sapBELNRKZ,
				oDoc.sapBUKRSKZ, oDoc.sapGJAHRKZ);
		}
	}

	/**
	 * Obtiene los datos de BD
	 */
	async _getItems() {
		var aPromise = [];
		for (var oJob of this.aJobs) {
			var oquery = SELECT.from(SegmentInterests_001).
			where({
				sapGJAHR: this.sPeriod.substr(0, 4),
				sapMONAT: this.sPeriod.substr(4, 6)
				sapVKORG: oJob.sapVKORG
			});
			aPromise.push(this.tx.run(oQuery));
		}
		this.aDocsList = await Promise.all(aPromise);
	}

	/**
	 * Obtiene periodo a generar de la tabla InterestJobs_001
	 */
	async _getPeriod() {
		var oQuery = SELECT.from(InterestJobs_001, [
				"period"
			])
			.where({
				indProvision: true,
				indReversal: false
			})
			.orderBy({
				period: "asc"
			}).groupBy(
				"period"
			).limit(1, 0);
		var oRes = await cds.run(oQuery);
		if (oRes.length === 0) {
			throw new ErrorBA("No hay periodo configurado InterestJobs_001");
		}
		this.sPeriod = oRes[0].period;
		oQuery = SELECT.from(InterestJobs_001)
			.where({
				indProvision: true,
				indReversal: false,
				period: this.sPeriod
			});
		this.aJobs = await this.tx.run(oQuery);
		return;
	}
}