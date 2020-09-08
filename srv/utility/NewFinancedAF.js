'use strict';
const moment = require('moment-timezone');
const oHelpers = require('./Helpers.js');
const ErrorBA = require('./ErrorBA.js');
const NewFinancedItem = require('./NewFinancedItem.js');
const {
	uuid
} = require('uuidv4');
const {
	FinancedItems_001
} = cds.entities('BD.VN.PP.XDATA');
const {
	CaracteriticasSet
} = require('../odata-client/z-od-scp-core-0001-service');
module.exports = class NewFinancedAF {
	constructor(oActFij, sUser, sCallingApp, aCaracts) {
		this.oActFij = oActFij;
		this.sUser = sUser;
		this.sCallingApp = sCallingApp;
		this.aCaracts = aCaracts;
	}

	/**
	 * Genera los filtros de la mara
	 */
	static async getCaracts() {
		var aCaracts = [];
		var aPromises = [];
		var aCaractCat = ["ZAP_MARCA", "ZAP_GAMA", "ZAP_MODELO", "ZAP_COLOR_EXTERNO", "ZAP_COLOR_INTERNO"];
		try {
			var oOrFilter = aCaractCat.map(x => {
				return CaracteriticasSet.CHARACTNAME.equals(x);
			});
			//Obtener características:
			var oFilterCaract_1 = new FilterList([], oOrFilter).flatten();
			aCaracts = await CaracteriticasSet.requestBuilder().getAll()
				.filter(oFilterCaract_1)
				.execute({
					destinationName: oHelpers.getDestinationName()
				});
		} catch (ex) {
			console.log(ex);
		}
		return aCaracts;
	}

	/**
	 * Registrar activo fijo
	 */
	async registerActFij() {
		//Preparar petición:
		this._getObject();
		//Si ya existe salir:
		var bValidate = await this._getActFij();
		if (!bValidate) {
			this.retMsg.Type = "E";
			this.retMsg.Message = "Activo fijo ya existente.";
			this.retMsg.Number = 0;
			return this.retMsg;
		}
		if (Number(this.oActFij.costAmt) < Number(this.oActFij.financedAmt)) {
			this.retMsg.Type = "E";
			this.retMsg.Message = "Verifique cantidad a financiar.";
			this.retMsg.Number = 0;
			return this.retMsg;
		}
		//Instanciar objeto:
		var oHelper = new NewFinancedItem(this.oUnit, 0, this.sUser, this.sCallingApp, this.aCaracts);
		//Generar financiera
		//Validar entrada
		var oMsg = await oHelper.validateInput(true);
		if (oMsg.Type !== "S") {
			console.log(JSON.stringify(oMsg));
			this.retMsg.Type = "E";
			this.retMsg.Message = "Verifique los datos de entrada.";
			this.retMsg.MessageV1 = this.oActFij.serial;
			return this.retMsg;
		}
		//Llenar objeto a insertar:
		oMsg = await oHelper.fillFinancedItem(oMsg);
		if (oMsg.Type !== "S") {
			console.log(JSON.stringify(oMsg));
			this.retMsg.Type = "E";
			this.retMsg.Message = "Verifique la configuración para Financiera.";
			this.retMsg.MessageV1 = this.oActFij.serial;
			return this.retMsg;
		}
		//Actualizar campo AF
		await oHelper.fillFinancedItemAF(this.oActFij.costAmt);
		//Generar pólizas en fondo:
		var oRet = await oHelper.doPromiseRes(oMsg);
		var aFinancedItem = oRet.financedItems;
		var aRes = oRet.logs;
		if (aRes[0].Type === "E") {
			console.log(JSON.stringify(aRes));
			await oHelper.sapDocumentAnulateAll();
			this.retMsg.Type = "E";
			this.retMsg.Message = "No se pudo generar documentos FI.";
			this.retMsg.MessageV1 = this.oActFij.serial;
			return this.retMsg;
		}
		aRes = await NewFinancedItem.insertFinancedItems(aFinancedItem, aRes);
		if (aRes[0].Type === "E") {
			console.log(JSON.stringify(aRes));
			//Anular en caso de error:
			await oHelper.sapDocumentAnulateAll();
			this.retMsg.Type = "E";
			this.retMsg.Message = "No se pudo insertar elemento en Tabla.";
			this.retMsg.MessageV1 = this.oActFij.serial;
			return this.retMsg;
		}
		//console.log(JSON.stringify(aRes));
		this.retMsg.Type = "S";
		this.retMsg.Message = "Activo Fijo agregado.";
		this.retMsg.MessageV1 = this.oActFij.serial;
		this.retMsg.Number = 1;
		return this.retMsg;
	}

	/**
	 * Generar activo fijo en busqueda
	 */
	async _getActFij() {
		var sWhere = "unidadID = '" + this.oActFij.unidadID + "'" +
			" AND status_status <> 'ANU'";
		var oQueryWhere = cds.parse.expr(sWhere);
		var oQuery = SELECT.from(FinancedItems_001).where(oQueryWhere);
		var res = await cds.run(oQuery);
		if (res.length === 0) {
			return true;
		}
		return false;
	}

	_getObject() {
		this.oUnit = {
			"hdId": uuid(),
			"companyCode": this.oActFij.companyCode,
			"center": this.oActFij.center,
			"segment": this.oActFij.segment,
			"serial": this.oActFij.serial,
			"plateNum": this.oActFij.plateNum,
			"extColorCode": this.oActFij.extColorCode,
			"intColorCode": this.oActFij.intColorCode,
			"brandCode": this.oActFij.brandCode,
			"modelCode": this.oActFij.modelCode,
			"gamaCode": this.oActFij.gamaCode,
			"currency": this.oActFij.currency,
			"unidadID": this.oActFij.unidadID,
			"dateStart": this.oActFij.dateStart,
			"finSrv_finCode": this.oActFij.finCode,
			"graceDays": 0,
			"unitLocation": "ACTIVO FIJO",
			"fundSubType_ID": "UN_VD",
			"costs": [{
				"costCode": "AF",
				"costAmt": Number(this.oActFij.financedAmt),
				"sapBELNRRE": "",
				"sapBUKRSRE": "",
				"sapGJAHRRE": "",
				"sapLIFNRRE": this.oActFij.sapPartner
			}]
		}
		this.retMsg = {
			"HdId": uuid(),
			"Idvehi": this.oActFij.unidadID,
			"Type": "I",
			"Id": "0",
			"Number": "0",
			"Message": "MSG",
			"LogNo": "0",
			"LogMsgNo": "0",
			"MessageV1": this.oActFij.serial,
			"MessageV2": "",
			"MessageV3": "",
			"MessageV4": "",
			"Parameter": "",
			"Row": "",
			"Field": "ACTFIJ",
			"System": "BAVNPP001"
		}
	}
}