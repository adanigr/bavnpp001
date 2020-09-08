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
const {
	uuid
} = require('uuidv4');
const {
	FinancedItems_001,
	FinancedItemsPayments_001,
	FinancedItemsRecal_001,
	FinancedInterest_001
} = cds.entities('BD.VN.PP.XDATA');
const {
	FinOperAccs_001,
	TransferAccs_001
} = cds.entities('BD.VN.PP.XCFG');
const {
	ViewFinSrvCredits_001
} = cds.entities('BD.VN.PP.XVIEW');
module.exports = class FinancedItemInterestDocGen {
	constructor(oDocDate, oIntAmt, oFinItem, bBackground, sFlag, user, relItem) {
		this.oFinItem = oFinItem;
		this.oTransferAccs_001 = {};
		this.oFinOperAccs_001 = {};
		this.sCallingApp = "BAVNPP001";
		this.oDocDate = oDocDate;
		this.oHeaderTxt = "PAGO INTERES PP " + this.oFinItem.finSrv_finCode;
		this.user = user;
		this.oIntAmt = oIntAmt;
		this.bBackground = bBackground;
		this.sFlag = sFlag;
		this.relItem = relItem;
	}

	/**
	 * Anula documentos de intereses relacionados
	 */
	static async anulateRelItem(relId, userID) {
		this.sCallingApp = "BAVNPP001";
		try {
			var oItem = await this._anulateRelItem_getData(relId);
			if (oItem === null) {
				return true; //Nada que anular
			}
			var oFinItem = await this._anulateRelItem_getFinItem(oItem);
			oItem = await this._anulateRelItem_AnulateDoc(oItem, oFinItem, userID);
			await this._anulateRelItem_UpdateDoc(oItem);
		} catch (ex) {
			console.log(ex);
			return false;
		}
		return true;
	}

	/**
	 * Actualiza documentos con marca de anulación
	 */
	static async _anulateRelItem_UpdateDoc(oItem) {
		var oQuery = UPDATE(FinancedInterest_001).set({
			sapSTBLGKR: oItem.sapSTBLGKZ,
			sapSTBLGKZ: oItem.sapSTBLGKZ,
			flagReverse: true
		}).where({
			ID: oItem.ID
		});
		try {
			await cds.run(oQuery);
		} catch (ex) {
			console.log("_doReverseTransf_ChangeStatus_New", ex);
			throw ex;
		}
	}

	/**
	 * Obtiene elemento a financiar relacionado
	 */
	static async _anulateRelItem_getFinItem(oItem) {
		var oQuery = SELECT.from(FinancedItems_001).where({
			"ID": oItem.finItem_ID
		});
		var res = await cds.run(oQuery);
		if (res.length === 0) {
			return null;
		}
		return res[0];
	}

	/**
	 * Obtiene información relacionada del elemento anular
	 */
	static async _anulateRelItem_getData(relId) {
		var oQuery = SELECT.from(FinancedInterest_001).where({
			"relItem": relId,
			"flagReverse": false
		});
		var res = await cds.run(oQuery);
		if (res.length === 0) {
			return null;
		}
		return res[0];
	}

	/**
	 * Prepara peticiones de anulación
	 */
	static async _anulateRelItem_AnulateDoc(oItem, oFinItem, userID) {
		var aPromise = [];
		oItem.sapSTBLGKR = await this._anulateRelItem_AnulateDoc_Key(oItem.sapBELNRKR, oItem.sapBUKRSKR, oItem.sapGJAHRKR, oFinItem.unidadID,
			userID);
		oItem.sapSTBLGKZ = await this._anulateRelItem_AnulateDoc_Key(oItem.sapBELNRKZ, oItem.sapBUKRSKZ, oItem.sapGJAHRKZ, oFinItem.unidadID,
			userID);
		return oItem;
	}

	/**
	 * Realiza anulación de documentos indicados
	 */
	static async _anulateRelItem_AnulateDoc_Key(belnr, bukrs, gjahr, unidadID, userID) {
		var sKey = belnr + bukrs + gjahr;
		if (sKey === "") {
			return "";
		}
		//Anular en SAP:
		const doc = CancelFinDocSet.builder()
			.idvehi(unidadID)
			.docid(sKey)
			.scpuser(userID)
			.scpapp(this.sCallingApp)
			.cancelind("")
			.canceldoc("")
			.build();
		try {
			let res = await CancelFinDocSet.requestBuilder().create(doc)
				.execute({
					destinationName: Helpers.getDestinationName()
				});
			Helpers.updateLogSTBLG(belnr, bukrs, gjahr, res.canceldoc);
			return res.canceldoc;
		} catch (err) {
			console.log("ERROR ANULACION", err);
			return "";
		}
	}

	/**
	 * Genera documentos KR y KZ de intereses
	 */
	async generateFinDocKRKZ() {
		try {
			await this._generateFinDoc_getTables();
			await this._generateFinDoc_generateKRKZ();
			await this._generateFinDoc_saveKRKZ();
		} catch (ex) {
			console.log(ex);
			return false;
		}
		return true;
	}

	/**
	 * Obtiene los registros a generar o actualizar
	 */
	async _generateFinDoc_saveKRKZ() {
		if (this.bBackground) { //Se tiene que buscar registro
			await this._generateFinDoc_saveKRKZ_updateData();
		} else { //Se tiene que insertar registro
			await this._generateFinDoc_saveKRKZ_insertData();
		}

	}

	/**
	 * Inserta los datos en entidad
	 */
	async _generateFinDoc_saveKRKZ_insertData() {
		var oBBVA = {
			finItem_ID: this.oFinItem.ID,
			sapGJAHR: moment(this.oDocDate).format("YYYY"),
			sapMONAT: moment(this.oDocDate).format("MM"),
			interestAmt: Number(this.oIntAmt),
			flagGen: false,
			flagTra: false,
			flagPay: false,
			flagCal: false,
			//	userTxt: this.sUser,
			sapBELNRKR: this.oKr.belnr,
			sapBUKRSKR: this.oKr.bukrs,
			sapGJAHRKR: this.oKr.gjahr,
			sapBLDATKR: moment().format(),
			sapBELNRKZ: this.oKz.belnr,
			sapBUKRSKZ: this.oKz.bukrs,
			sapGJAHRKZ: this.oKz.gjahr,
			sapBLDATKZ: moment().format(),
			flagReverse: false,
			relItem: this.relItem
		};
		oBBVA[this.sFlag] = true;
		//Insertar dato:
		var oQuery =
			INSERT.into(FinancedInterest_001).entries([oBBVA]);
		try {
			await cds.run(oQuery);
		} catch (ex) {
			console.log(ex);
			throw new ErrorBA("Error al generar  _generateFinDoc_saveKRKZ_insertData");
		}
	}

	/**
	 * Actualiza la información con los docuemntos generados
	 */
	async _generateFinDoc_saveKRKZ_updateData() {
		//Obtener cuentas para KR:
		var oQuery =
			UPDATE(FinancedInterest_001).set({
				sapBELNRKR: this.oKr.belnr,
				sapBUKRSKR: this.oKr.bukrs,
				sapGJAHRKR: this.oKr.gjahr,
				sapBLDATKR: moment().format(),
				sapBELNRKZ: this.oKz.belnr,
				sapBUKRSKZ: this.oKz.bukrs,
				sapGJAHRKZ: this.oKz.gjahr,
				sapBLDATKZ: moment().format()
			}).where({
				"finItem_ID": this.oFinItem.ID,
				"sapGJAHR": moment(this.oDocDate).format("YYYY"),
				"sapMONAT": moment(this.oDocDate).format("MM"),
				"flagReverse": false
			});
		try {
			var oRes = await cds.run(oQuery);
			if (oRes === 0) {
				throw new ErrorBA("Configuración FinancedInterest_001 no encontrada _generateFinDoc_saveKRKZ_updateData");
			}
		} catch (ex) {
			console.log(ex);
			throw ex;
		}
	}

	/**
	 * Prepara peticiones KR y KZ
	 */
	async _generateFinDoc_generateKRKZ() {
		this.oKr = await this._generateFinDoc_generateKRKZ_DocGen_KR();
		this.oKz = await this._generateFinDoc_generateKRKZ_DocGen_KZ();
	}

	/**
	 * Genera documentos KR
	 */
	async _generateFinDoc_generateKRKZ_DocGen_KR() {
		const _KR = CreateFinDocSet.builder()
			.hdid(this.oFinItem.ID)
			.idvehi(this.oFinItem.unidadID)
			.vin(this.oFinItem.serial)
			.company(this.oFinItem.companyCode)
			.finoper("PI_KR")
			.account(this.oFinOperAccs_001.sapHKONT)
			.costcenter(this.oFinOperAccs_001.sapKOSTL.padStart(10, "0"))
			.docDate(moment(this.oDocDate).format("YYYYMMDD"))
			.hdtext(this.oHeaderTxt)
			.scpuser(this.user)
			.scpapp(this.sCallingApp)
			.itemsSet([
				ItemsSet.builder()
				.assignment("INT" + Helpers.getVinReference(this.oFinItem.serial))
				.hdid(this.oFinItem.ID)
				.vendorNo(this.oViewFinSrvCredits_001.sapLifnr)
				.segment(this.oFinItem.segment)
				.division(this.oFinItem.center)
				.itemtext(this.oHeaderTxt + " " + this.oFinItem.serial)
				.currency(this.oFinItem.currency)
				.amount(this.oIntAmt)
				.build()
			]).retSet([])
			.build();
		try {
			let res = await CreateFinDocSet
				.requestBuilder()
				.create(_KR)
				.execute({
					destinationName: Helpers.getDestinationName()
				});
			//console.log("RESPUESTAJCBG KR", JSON.stringify(res));
			if (res.retSet[0].type === "S") {
				var oDocuments = Helpers.getDocNumbers(res.retSet[0]);
				var oLog = Helpers.getDocLogEntity(this.oFinItem.unidadID, oDocuments, "", this.user, this.oHeaderTxt,
					"KRINTEREST");
				Helpers.insertLogEntries([oLog]);
				return oDocuments;
			} else {
				Helpers.documentFIErrorLog(retSet, this.oTransfer.ID);
				throw new ErrorBA('Error en generación de póliza');
			}
		} catch (err) {
			if (err.name !== "BAVNPP001") {
				throw new ErrorBA("Error desconocido KR");
			} else {
				throw err;
			}
		}
		return null;
	}

	/**
	 * Genera documentos KZ
	 */
	async _generateFinDoc_generateKRKZ_DocGen_KZ() {
		const _KZ = CreateFinDocSet.builder()
			.hdid(this.oFinItem.ID)
			.idvehi(this.oFinItem.unidadID)
			.vin(this.oFinItem.serial)
			.company(this.oFinItem.companyCode)
			.finoper("PI_KZ")
			.account(this.oTransferAccs_001.sapHkont)
			.docDate(moment(this.oDocDate).format("YYYYMMDD"))
			.hdtext(this.oHeaderTxt)
			.scpuser(this.user)
			.scpapp(this.sCallingApp)
			.itemsSet([
				ItemsSet.builder()
				.assignment("INT" + Helpers.getVinReference(this.oFinItem.serial))
				.hdid(this.oFinItem.ID)
				.vendorNo(this.oViewFinSrvCredits_001.sapLifnr)
				.segment(this.oFinItem.segment)
				.division(this.oFinItem.center)
				.itemtext(this.oHeaderTxt + " " + this.oFinItem.serial)
				.currency(this.oFinItem.currency)
				.amount(this.oIntAmt)
				.build()
			]).retSet([])
			.build();
		try {
			let res = await CreateFinDocSet
				.requestBuilder()
				.create(_KZ)
				.execute({
					destinationName: Helpers.getDestinationName()
				});
			//console.log("RESPUESTAJCBG KZ", JSON.stringify(res));
			if (res.retSet[0].type === "S") {
				var oDocuments = Helpers.getDocNumbers(res.retSet[0]);
				var oLog = Helpers.getDocLogEntity(this.oFinItem.unidadID, oDocuments, "", this.user, this.oHeaderTxt,
					"KZINTEREST");
				Helpers.insertLogEntries([oLog]);
				return oDocuments;
			} else {
				Helpers.documentFIErrorLog(retSet, this.oTransfer.ID);
				throw new ErrorBA('Error en generación de póliza');
			}
		} catch (err) {
			if (err.name !== "BAVNPP001") {
				throw new ErrorBA("Error desconocido KZ");
			} else {
				throw err;
			}
		}
		return null;
	}

	/**
	 * Obtiene tablas de configuración relacionadas
	 */
	async _generateFinDoc_getTables() {
		await this._generateFinDoc_getTables_SrvCredits();
		var aPromise = [];
		aPromise.push(this._generateFinDoc_getTables_OperAccs());
		aPromise.push(this._generateFinDoc_getTables_TransferAccs());
		await Promise.all(aPromise);
	}

	/**
	 * Obtiene líneas de crédito relacionadas
	 */
	async _generateFinDoc_getTables_SrvCredits() {
		//Obtener cuentas para KZ:
		var oQuery = SELECT.from(ViewFinSrvCredits_001).where({
			"sapVKORG": this.oFinItem.center,
			"finServ_finCode": this.oFinItem.finSrv_finCode,
			"flagUnitPayInterest": true
		});
		try {
			var oRes = await cds.run(oQuery);
			if (oRes.length === 0) {
				throw new ErrorBA("Combinación para ViewFinSrvCredits_001 no encontrada " + this.oFinItem.center + "|" + this.oFinItem.finSrv_finCod +
					"|flagUnitPayInterest");
			}
			this.oViewFinSrvCredits_001 = oRes[0];
		} catch (ex) {
			console.log(ex);
			throw ex;
		}
	}

	/**
	 * Obtiene cuentas relacionadas
	 */
	async _generateFinDoc_getTables_TransferAccs() {
		//Obtener cuentas para KZ:
		var oQuery = SELECT.from(TransferAccs_001).where({
			"flagIntKZ": true,
			"center": this.oFinItem.center,
			"finServ_finCode": this.oFinItem.finSrv_finCode,
			"currency": this.oFinItem.currency
		});
		try {
			var oRes = await cds.run(oQuery);
			if (oRes.length === 0) {
				throw new ErrorBA("Combinación para TransferAccs_001 no encontrada. flagIntKZ|" + this.oFinItem.center + "|" + this.oFinItem.finSrv_finCode +
					"|" + this.oFinItem.currency);
			}
			this.oTransferAccs_001 = oRes[0];
		} catch (ex) {
			console.log(ex);
			throw ex;
		}
	}

	/**
	 * Obtiene configuración documentos FI relacionadas
	 */
	async _generateFinDoc_getTables_OperAccs() {
		//Obtener cuentas para KR:
		var oQuery = SELECT.from(FinOperAccs_001).where({
			"sapFINOPER": "PI_KR",
			"sapVKORG": this.oFinItem.center,
			"sapSEGMENT": this.oFinItem.segment.padStart(10, "0")
		});
		try {
			var oRes = await cds.run(oQuery);
			if (oRes.length === 0) {
				throw new ErrorBA("Combinación para FinOperAccs_001 no encontrada. PI_KR|" + this.oFinItem.center + "|" + this.oFinItem.segment);
			}
			this.oFinOperAccs_001 = oRes[0];
		} catch (ex) {
			console.log(ex);
			throw ex;
		}
	}
}