'use strict';
const moment = require('moment-timezone');
const Helpers = require('./Helpers.js');
const {
	CancelFinDocSet
} = require('../odata-client/z-od-scp-bavnpp-001-service');

const {
	uuid
} = require('uuidv4');

const {
	FinancedItems_001,
} = cds.entities('BD.VN.PP.XDATA');

const {
	FIGenDocs_001
} = cds.entities('BD.VN.PP.XLOG');

module.exports = class ReverseInvoice {
	constructor(unidadID, sUser, sCallingApp, pSAPBELNR1T, pSAPBUKRS1T, pSAPGJAHR1T, pSAPBELNRKA, pSAPBUKRSKA, pSAPGJAHRKA) {
		this.unidadID = unidadID;
		this.sUser = sUser;
		this.pSAPBELNR1T = pSAPBELNR1T;
		this.pSAPBUKRS1T = pSAPBUKRS1T;
		this.pSAPGJAHR1T = pSAPGJAHR1T;
		this.pSAPBELNRKA = pSAPBELNRKA;
		this.pSAPBUKRSKA = pSAPBUKRSKA;
		this.pSAPGJAHRKA = pSAPGJAHRKA;
		this.sCallingApp = sCallingApp;
		this.sDestinationName = Helpers.getDestinationName();
		this.sAPIApp = "BAVNPP001";
		this.aMsgs = [];
		this.aStbgl = [];
		this.HdId = uuid();
	}

	/**
	 * Realiza la anulación de un elemento financiado
	 */
	async revUnit() {
		try {
			var aPromise = [];
			await this._revFinItem();

		} catch (ex) {
			this.aMsgs.push({
				HdId: this.HdId,
				"Idvehi": this.unidadID,
				"Type": "E",
				"Number": "1",
				"Message": "Error desconocido: " + ex.message,
				"LogNo": "9",
				"LogMsgNo": "9",
				"MessageV1": JSON.stringify(ex),
				"MessageV2": "",
				"MessageV3": "",
				"MessageV4": "",
				"Parameter": "FinancedItems_001",
				"Row": "",
				"Field": "",
				"System": this.sAPIApp
			})
		}
		return this.aMsgs;
	}

	/**
	 * Obtiene elemento financiado y sus documentos
	 */
	async _revFinItem() {
		await this._revFinItemGetItem();
		await this._revFinItemFinDocs(); //Anula domunetos FI en S4
		await this._revFinItemBD();
	}

	/**
	 * Obtiene elementos financiados por unidadID
	 */
	async _revFinItemGetItem() {
		
		var sQueryWhere = "unidadID = '" + this.unidadID + "' AND  status_status = 'FIN'" + " AND SAPBELNR1T = '" + this.pSAPBELNR1T + "' AND SAPBUKRS1T = '" + this.pSAPBUKRS1T + "' AND SAPGJAHR1T = '" + this.pSAPGJAHR1T 
		+ "' AND SAPBELNRKA = '" + this.pSAPBELNRKA + "' AND SAPBUKRSKA = '" + this.pSAPBUKRSKA + "' AND SAPGJAHRKA = '" + this.pSAPGJAHRKA + "'";

		var oQueryWhere = cds.parse.expr(sQueryWhere);
		var oQuery = SELECT.from(FinancedItems_001).where(oQueryWhere);
		this.oFinItems = await cds.run(oQuery);
		if (this.oFinItems.length === 0) {
			this.aMsgs.push({
				"HdId": this.HdId,
				"Idvehi": this.unidadID,
				"Type": "S",
				"Number": "1",
				"Message": "No existen elementos en plan piso para ese ID Vehículo",
				"LogNo ": "1",
				"LogMsgNo": "1",
				"MessageV1 ": "",
				"MessageV2": "",
				"MessageV3": "",
				"MessageV4": "",
				"Parameter": "FinancedItems_001",
				"Row": "",
				"Field": "",
				"System": this.sAPIApp
			});
		}
	}

	/**
	 * Prepara para anular documentos KA y 1T
	 */
	async _revFinItemFinDocs() {
		var aPromise = [];
		this.oFinItems.forEach(x => {
			aPromise.push(this._revFinItemFinDocsDo(x, "KA"));
			aPromise.push(this._revFinItemFinDocsDo(x, "1T"));
		}, this);
		await Promise.all(aPromise);
	}

	/**
	 * Elimina los documentos FI
	 */
	async _revFinItemFinDocsDo(oFinItem, sType) {
		let sDocID = "";
		var oDoc = {
			belnr: "",
			burks: "",
			gjahr: "",
			stbgl: "",
		};
		switch (sType) {
		case "1T":
			oDoc.belnr = oFinItem.sapBELNR1T;
			oDoc.burks = oFinItem.sapBUKRS1T;
			oDoc.gjahr = oFinItem.sapGJAHR1T;
			break;
		case "KA":
			oDoc.belnr = oFinItem.sapBELNRKA;
			oDoc.burks = oFinItem.sapBUKRSKA;
			oDoc.gjahr = oFinItem.sapGJAHRKA;
			break;
		default:
			throw "Documento desconocido";
			break;
		}
		sDocID = oDoc.belnr + oDoc.burks + oDoc.gjahr;
		if (sDocID === "") { //Nada que anular
			return;
		}
		const doc = CancelFinDocSet.builder()
			.idvehi(oFinItem.unidadID)
			.docid(sDocID)
			.scpuser(this.sUser)
			.scpapp(this.sAPIApp)
			.cancelind("")
			.canceldoc("")
			.build();
		try {
			let res = await CancelFinDocSet.requestBuilder().create(doc)
				.execute({
					destinationName: this.sDestinationName
				});
			this.aStbgl.push(res.canceldoc + oDoc.burks + moment().format("YYYY"));
			Helpers.updateLogSTBLG(oDoc.belnr, oDoc.burks, oDoc.gjahr, res.canceldoc);
		} catch (err) {
			this.aMsgs.push({
				"HdId": this.HdId,
				"Idvehi": this.unidadID,
				"Type": "W",
				"Number": "1",
				"Message": "No se pudo anular documento: " + sDocID,
				"LogNo": "1",
				"LogMsgNo": "1",
				"MessageV1": oFinItem.unidadID,
				"MessageV2": sDocID,
				"MessageV3": sType,
				"MessageV4": oFinItem.ID,
				"Parameter": "Cancel Doc",
				"Row": "",
				"Field": "",
				"System": this.sAPIApp
			});
		}
	}

	/**
	 * Elimina los elementos financiados
	 */
	async _revFinItemBD() {
		var sQueryWhere = "unidadID = '" + this.unidadID + "' AND  status_status = 'FIN'" + " AND SAPBELNR1T = '" + this.pSAPBELNR1T + "' AND SAPBUKRS1T = '" + this.pSAPBUKRS1T + "' AND SAPGJAHR1T = '" + this.pSAPGJAHR1T 
		+ "' AND SAPBELNRKA = '" + this.pSAPBELNRKA + "' AND SAPBUKRSKA = '" + this.pSAPBUKRSKA + "' AND SAPGJAHRKA = '" + this.pSAPGJAHRKA + "'";
		var oQueryWhere = cds.parse.expr(sQueryWhere);
		var oQuery = UPDATE(FinancedItems_001).set({
			status_status: "ANU"
		}).where(oQueryWhere);
		var oRes = await cds.run(oQuery);
		if (oRes !== 0) {
			this.aMsgs.push({
				"HdId": this.HdId,
				"Idvehi": this.unidadID,
				"Type": "S",
				"Number": "1",
				"Message": "Se ha anulado elemento financiado.",
				"LogNo": "1",
				"LogMsgNo": "1",
				"MessageV1": this.aStbgl.join("|"),
				"MessageV2": oRes,
				"MessageV3": "",
				"MessageV4": "",
				"Parameter": "FinancedItems_001",
				"Row": "",
				"Field": "",
				"System": this.sAPIApp
			});
		}
	}
}