'use strict';
const moment = require('moment-timezone');
const Helpers = require('./Helpers.js');
const ErrorBA = require('./ErrorBA.js');
const {
	CancelFinDocSet,
	CreateFinDocSet,
	ItemsSet,
	RetSet
} = require('../odata-client/z-od-scp-bavnpp-001-service');
const {
	AlmacenesSet,
	SociedadSet,
	CentrosSet,
} = require('../odata-client/z-od-scp-core-0001-service');
const {
	FilterList,
	serializeEntity,
	retrieveJwt
 } = require('@sap-cloud-sdk/core'); //Permite Filtros con multiples registros
const {
	uuid
} = require('uuidv4');
const {
	FinancedItems_001,
	FinancedItemsTransfers_001,
	FinancedItemCurrEx_001,
	FinancedItemsPayments_001
} = cds.entities('BD.VN.PP.XDATA');
const {
	FIGenDocs_001
} = cds.entities('BD.VN.PP.XLOG');

module.exports = class FinancedItemRev {
	constructor(unidadID, sUser, sCallingApp) {
		this.unidadID = unidadID;
		this.sUser = sUser;
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
			aPromise.push(this._checkPayments());
			aPromise.push(this._checkTransfer());
			aPromise.push(this._checkCurrEx());
			var oRes = await Promise.all(aPromise);
			//Revisar pagos
			var bPayOK = oRes[0];
			//Revisar traspasos
			var bTraOK = oRes[1];
			//Revisar cambios de moneda
			var bCurrOK = oRes[2];
			//Anular plan piso
			if (bPayOK && bTraOK && bCurrOK) {
				await this._revFinItem();
				await this._revFinItemAdditional();
			}

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
		await this._revFinItemFinDocs();
		await this._revFinItemBD();
	}

	/**
	 * Obtiene elementos financiados por unidadID
	 */
	async _revFinItemGetItem() {
		var sQueryWhere = "unidadID = '" + this.unidadID + "' AND  status_status <> 'ANU'";
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
	 * Eliminar documentos adicionales
	 */
	async _revFinItemAdditional() {
		var oQuery = SELECT.from(FIGenDocs_001)
			.where({
				unidadID: this.unidadID,
				STBLG: ""
			});
		var oRes = await cds.run(oQuery);
		for (var oRow of oRes) {
			this._revAdditionalS4(oRow);
		}
	}

	/**
	 * Anulación en S/4
	 */
	async _revAdditionalS4(oRow) {
		let sDocID = "";
		sDocID = oRow.BELNR + oRow.BUKRS + oRow.GJAHR;
		if (sDocID === "") { //Nada que anular
			return;
		}
		const doc = CancelFinDocSet.builder()
			.idvehi(this.unidadID)
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
			this.aStbgl.push(res.canceldoc + oRow.BUKRS + moment().format("YYYY"));
			Helpers.updateLogSTBLG(oRow.BELNR, oRow.BUKRS, oRow.GJAHR, res.canceldoc);
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
		var sQueryWhere = "unidadID = '" + this.unidadID + "' AND status_status <> 'ANU'";
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

	/**
	 * Verifica no tenga pagos
	 */
	async _checkPayments() {
		var oQuery = SELECT.from(FinancedItemsPayments_001, ["ID"]).where({
			unidadID: this.unidadID,
			flagDel: false
		});
		var oRes = await cds.run(oQuery);
		var iItems = oRes.length;
		if (iItems > 0) {
			this.aMsgs.push({
				"HdId": this.HdId,
				"Idvehi": this.unidadID,
				"Type": "E",
				"Number": "1",
				"Message": "Existen pagos en plan piso pendientes de anular",
				"LogNo": "1",
				"LogMsgNo": "1",
				"MessageV1": "Total de pagos " + iItems,
				"MessageV2": "",
				"MessageV3": "",
				"MessageV4": "",
				"Parameter": "FinancedItemsPayments_001",
				"Row": "",
				"Field": "",
				"System": this.sAPIApp
			});
		}
		return iItems === 0;
	}

	/**
	 * Verifica no tenga cambios de moneda
	 */
	async _checkCurrEx() {
		var oQuery = SELECT.from(FinancedItemCurrEx_001, ["ID"]).where({
			unidadID: this.unidadID,
			flagReverse: false
		});
		var oRes = await cds.run(oQuery);
		var iItems = oRes.length;
		if (iItems > 0) {
			this.aMsgs.push({
				"HdId": this.HdId,
				"Idvehi": this.unidadID,
				"Type": "E",
				"Number": "1",
				"Message": "Existen cambios de moneda en plan piso pendientes de anular",
				"LogNo": "1",
				"LogMsgNo": "1",
				"MessageV1": "Total de Cambios de Moneda " + iItems,
				"MessageV2": "",
				"MessageV3": "",
				"MessageV4": "",
				"Parameter": "FinancedItemsTransfers_001",
				"Row": "",
				"Field": "",
				"System": this.sAPIApp
			});
		}
		return iItems === 0;
	}

	/**
	 * Verifica no tenga traspasos
	 */
	async _checkTransfer() {
		var oQuery = SELECT.from(FinancedItemsTransfers_001, ["ID"]).where({
			unidadID: this.unidadID,
			flagReverse: false
		});
		var oRes = await cds.run(oQuery);
		var iItems = oRes.length;
		if (iItems > 0) {
			this.aMsgs.push({
				"HdId": this.HdId,
				"Idvehi": this.unidadID,
				"Type": "E",
				"Number": "1",
				"Message": "Existen traspasos financieros en plan piso pendientes de anular",
				"LogNo": "1",
				"LogMsgNo": "1",
				"MessageV1": "Total de traspasos financieros " + iItems,
				"MessageV2": "",
				"MessageV3": "",
				"MessageV4": "",
				"Parameter": "FinancedItemsTransfers_001",
				"Row": "",
				"Field": "",
				"System": this.sAPIApp
			});
		}
		return iItems === 0;
	}

}