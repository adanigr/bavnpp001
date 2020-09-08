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
const FinancedItemInterestDocGen = require('./FinancedItemInterestDocGen.js');
const LayoutManager = require('./LayoutManager.js');
const {
	FinancedItems_001,
	FinancedItemsTransfers_001
} = cds.entities('BD.VN.PP.XDATA');
const {
	TransFinItem_001
} = cds.entities('BD.VN.PP.XREL');
const {
	uuid
} = require('uuidv4');
module.exports = class FinancedItemsTransferReverse {

	constructor(uuidFinancedItem, user) {
		this.oTransfer = {};
		this.oNewFinItem = {};
		this.oOldFinItem = {};
		this.oRevFinItem = {};
		this.oTransfer.newFinItem_ID = uuidFinancedItem;
		this.user = user;
		this.sCallingApp = "BAVNPP001";
	}

	/**
	 * Realiza la reversa del traspaso
	 */
	async doReverseTransf() {
		try {
			//Obtener info:
			await this._getFinancedItemData();
			//Anular documentos
			await this._doReverseTransf_RevDocs();
			//Generar nueva línea y cambiar estatus si no hubo excepciones
			await this._doReverseTransf_ChangeStatus();
			//Cancelar pólizas Intereses y layouts
			await this._doReverseTransf_Extras();
		} catch (ex) {
			console.log(ex);
			return false;
		}
		return true;
	}

	/**
	 * Procesos adicionales concurrentes del traspaso
	 * Anular póliza intereses
	 * Anular Layouts
	 */
	async _doReverseTransf_Extras() {
		var aPromise = [];
		aPromise.push(this._doReverseTransf_IntDocs())
		aPromise.push(this._doReverseTransf_Layouts())
		await Promise.all(aPromise);
	}

	/**
	 * Elimina pólizas Intereses
	 */
	async _doReverseTransf_Layouts() {
		var res = await LayoutManager.anulateRelItem(this.oTransfer.ID);
		if (res) {
			//console.log("Borrado LAYOUT OK");
		} else {
			//console.log("Borrado LAYOUT Error");
		}

	}

	/**
	 * Anula documentos de intereses relacionados
	 */
	async _doReverseTransf_IntDocs() {
		var res = await FinancedItemInterestDocGen.anulateRelItem(this.oTransfer.ID, this.user);
		if (res) {
			//console.log("Borrado DOCFI intereses OK");
		} else {
			//console.log("Borrado DOCFI intereses error");
		}
	}

	/**
	 * Realiza de forma concurrente la anulación de distintos elementos y reestablece
	 * el elemento original
	 */
	async _doReverseTransf_ChangeStatus() {
		var aPromise1 = [];
		aPromise1.push(this._doReverseTransf_ChangeStatus_New());
		aPromise1.push(this._doReverseTransf_ChangeStatus_Old());
		aPromise1.push(this._doReverseTransf_ChangeStatus_OldRelated());
		await Promise.all(aPromise1);
		await this._doReverseTransf_ChangeStatus_Transfer();

	}

	/**
	 * Restaurar elementos relacionados FE
	 */
	async _doReverseTransf_ChangeStatus_OldRelated() {
		//Buscar relacionados
		var oQuery = SELECT.from(TransFinItem_001, ["finItem_ID"]).where({
			finTrans_ID: this.oTransfer.ID
		});
		var oRes = await cds.run(oQuery);
		//Restaurar relacionados
		var aIN = oRes.map(x => {
			return "'" + x.finItem_ID + "'"
		});
		if (aIN.length === 0) {
			return;
		}
		var sQueryWhere = "ID IN (" + aIN.join() + ")";
		var oQueryWhere = cds.parse.expr(sQueryWhere);
		oQuery =
			UPDATE(FinancedItems_001).set({
				status_status: "FIN"
			}).where(oQueryWhere);
		var res = await cds.run(oQuery);
	}

	/**
	 * Cambia estado del item anulado a financiado
	 */
	async _doReverseTransf_ChangeStatus_Old() {
		var oQuery =
			UPDATE(FinancedItems_001).set({
				status_status: "FIN"
			}).where({
				ID: this.oOldFinItem.ID
			});
		try {
			cds.run(oQuery);
		} catch (ex) {
			console.log("_doReverseTransf_ChangeStatus_New", ex);
			throw ex;
		}
	}

	/**
	 * Cambia el estatus del traspaso a anulado
	 */
	async _doReverseTransf_ChangeStatus_New() {
		var oQuery =
			UPDATE(FinancedItems_001).set({
				status_status: "ANU"
			}).where({
				ID: this.oNewFinItem.ID
			});
		try {
			cds.run(oQuery);
		} catch (ex) {
			console.log("_doReverseTransf_ChangeStatus_New", ex);
			throw ex;
		}
	}

	/**
	 * Marca la anulación en el traspaso y sus documentos de anulación
	 */
	async _doReverseTransf_ChangeStatus_Transfer() {
		const {
			FinancedItemsTransfers_001
		} = cds.entities('BD.VN.PP.XDATA');
		//Insertar secuencia:
		var oQuery =
			UPDATE(FinancedItemsTransfers_001).set({
				flagReverse: true,
				sapSTBLG1T: this.oTransfer.sapSTBLG1T,
				sapSTBLGKA: this.oTransfer.sapSTBLGKA
			}).where({
				ID: this.oTransfer.ID
			});
		try {
			cds.run(oQuery);
		} catch (ex) {
			console.log("_doReverseTransf_ChangeStatus_Transfer", ex);
			throw ex;
		}
	}

	/**
	 * Anulación simultánea de los documentos 1T Y KA en S/4
	 */
	async _doReverseTransf_RevDocs() {
		var aPromise1 = [];
		aPromise1.push(this._doReverseTransf_RevDocs1T());
		aPromise1.push(this._doReverseTransf_RevDocsKA());
		await Promise.all(aPromise1);
	}

	/**
	 * Anulación documento 1T de traspaso
	 */
	async _doReverseTransf_RevDocs1T() {
		var sDocID = this.oTransfer.sapBELNR1T + this.oTransfer.sapBUKRS1T + this.oTransfer.sapGJAHR1T;
		//Anular en SAP:
		const doc = CancelFinDocSet.builder()
			.idvehi(this.oNewFinItem.unidadID)
			.docid(sDocID)
			.scpuser(this.user)
			.scpapp(this.sCallingApp)
			.cancelind("")
			.canceldoc("")
			.build();
		try {
			let res = await CancelFinDocSet.requestBuilder().create(doc)
				.execute({
					destinationName: Helpers.getDestinationName()
				});
			this.oTransfer.sapSTBLG1T = res.canceldoc;
			Helpers.updateLogSTBLG(this.oTransfer.sapBELNR1T, this.oTransfer.sapBUKRS1T, this.oTransfer.sapGJAHR1T, this.oTransfer.sapSTBLG1T);
		} catch (err) {
			console.log("ERRORJCBG_1T", err);
			throw err;
		}
	}

	/**
	 * Anulación documento KA de traspaso
	 */
	async _doReverseTransf_RevDocsKA() {
		var sDocID = this.oTransfer.sapBELNRKA + this.oTransfer.sapBUKRSKA + this.oTransfer.sapGJAHRKA;
		//Anular en SAP:
		const doc = CancelFinDocSet.builder()
			.idvehi(this.oNewFinItem.unidadID)
			.docid(sDocID)
			.scpuser(this.user)
			.scpapp(this.sCallingApp)
			.cancelind("")
			.canceldoc("")
			.build();
		try {
			let res = await CancelFinDocSet.requestBuilder().create(doc)
				.execute({
					destinationName: Helpers.getDestinationName()
				});
			this.oTransfer.sapSTBLGKA = res.canceldoc;
			Helpers.updateLogSTBLG(this.oTransfer.sapBELNRKA, this.oTransfer.sapBUKRSKA, this.oTransfer.sapGJAHRKA, this.oTransfer.sapSTBLGKA);
		} catch (err) {
			console.log("ERRORJCBG_KA", err);
		}
	}

	/**
	 * Obtener información de los elementos a anular
	 */
	async _getFinancedItemData() {
		var aPromise1 = [];
		aPromise1.push(this._getFinancedItemData_NewFinItem());
		aPromise1.push(this._getFinancedItemData_TransferItem());
		await Promise.all(aPromise1);
		var aPromise2 = [];
		aPromise2.push(this._getFinancedItemData_OldFinItem());
		await Promise.all(aPromise2);
	}

	/**
	 * Obtiene información de los elementos a anular
	 * Elemento financiado traspaso
	 */
	async _getFinancedItemData_NewFinItem() {
		//Obtener elemento a financiar:
		var oQuery = SELECT.from(FinancedItems_001).where({
			"ID": this.oTransfer.newFinItem_ID
		});
		var oRes = await cds.run(oQuery);
		if (oRes.length === 0) {
			throw new ErrorBA("Elemento financiado no encontrado");
		}
		this.oNewFinItem = oRes[0];
	}

	/**
	 * Obtiene información de los elementos a restaurar
	 * Elemento financiado anterior
	 */
	async _getFinancedItemData_OldFinItem() {

		//Obtener elemento a financiar:
		var oQuery = SELECT.from(FinancedItems_001).where({
			"ID": this.oTransfer.oldFinItemID
		});
		var oRes = await cds.run(oQuery);
		if (oRes.length === 0) {
			throw new ErrorBA("Elemento financiado no encontrado");
		}
		this.oOldFinItem = oRes[0];
	}

	/**
	 * Obtiene información de los elementos a anular
	 * Tabla de movimientos
	 */
	async _getFinancedItemData_TransferItem() {
		const {
			FinancedItemsTransfers_001
		} = cds.entities('BD.VN.PP.XDATA');
		//Obtener elemento a financiar:
		var oQuery = SELECT.from(FinancedItemsTransfers_001).where({
			"newFinItem_ID": this.oTransfer.newFinItem_ID
		});
		var oRes = await cds.run(oQuery);
		if (oRes.length === 0) {
			throw new ErrorBA("Elemento financiado no encontrado");
		}
		this.oTransfer = oRes[0];
	}
}