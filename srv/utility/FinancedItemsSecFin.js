'use strict';
const moment = require('moment-timezone');
const Helpers = require('./Helpers.js');
const ErrorBA = require('./ErrorBA.js');
const FinancedItemsTransfer = require('./FinancedItemsTransfer.js');
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
	FinancedItemsSecFin_001,
	FinancedItems_001
} = cds.entities('BD.VN.PP.XDATA');
module.exports = class FinancedItemsSecFin {

	constructor(oSecFin, user) {
		this.oSecFin = oSecFin;
		this.oldFinancedItem = {};
		this.newFinancedItem = {};
		this.user = user;
		this.sCallingApp = "BAVNPP001";
	}

	/**
	 * Realiza validaciones previas a generar una segunda financiera
	 * Busca si no se ha utilizado en pasos previos la financiera seleccionada
	 */
	static async validatePrev(sUnidadID, sFinCode) {
		var res = [1];
		//Guardar documentos:
		var oQuery =
			SELECT.from(FinancedItemsSecFin_001).where({
				"unidadID": sUnidadID,
				"oldFinCode": sFinCode,
				"flagReverse": false
			});
		try {
			res = await cds.run(oQuery);
		} catch (err) {
			console.log(err);
		}
		//Ver si el documento anterior tenía esa fincode
		return res.length === 0;
	}

	/**
	 * Crea nueva entidad para crear en la base de datos
	 */
	async createMethodFunction() {
		try {
			this.oSecFin.ID = uuid();
			await this.createSecFin();
			await this.createMethodFunctionSaveDB();
			return true;
		} catch (ex) {
			console.log(ex);
		}
		return false;
	}

	/**
	 * Guarda nueva entidad en base de datos
	 */
	async createMethodFunctionSaveDB() {
		this.oSecFin.flagReverse = false;
		this.oSecFin.dateTransfer = moment().format();
		var oQuery = INSERT.into(FinancedItemsSecFin_001).entries([this.oSecFin]);
		await cds.run(oQuery);
	}

	/**
	 * Actualiza entidad segunda financiera con la información de los
	 * documentos s4 generados
	 */
	static async saveSecFin(secFin) {
		//Guardar documentos:
		var oQuery =
			UPDATE(FinancedItemsSecFin_001).set({
				secuence: parseInt(secFin.secuence),
				flagReverse: false,
				dateTransfer: moment().format(),
				sapBELNR1T: secFin.sapBELNR1T,
				sapBUKRS1T: secFin.sapBUKRS1T,
				sapGJAHR1T: secFin.sapGJAHR1T,
				accIncome: secFin.accIncome,
				unidadID: secFin.unidadID,
				newFinItem_ID: secFin.newFinItem_ID
			}).where({
				"ID": secFin.ID
			});
		try {
			cds.run(oQuery);
		} catch (err) {
			throw new ErrorBA("Error desconocido FinancedItemsSecFin.saveSecFin");
		}
	}

	/**
	 * Obtiene entidad Segunda Financiera para ser utilizada por otros procesos
	 */
	getSecFin() {
		return this.oSecFin;
	}

	/**
	 * Genera nuevos elementos para entidad
	 * Documentos en S4 e inserta información en BD
	 */
	async createSecFin() {
		//Generar documento
		await this._createSecFin_1t();
		//Obtener insertar nuevo elemento
		await this._setSecFinItem();
	}

	/**
	 * Obtiene información relacionada con la entidad y guardas
	 * los cambios realizados en la entidad previa e inserta la nueva
	 */
	async _setSecFinItem() {
		await this._setSecFinItem_getData();
		await this._setSecFinItem_saveData();
	}

	/**
	 * Guarda nuevas entidades en forma asíncrona de los dos elementos generados.
	 */
	async _setSecFinItem_saveData() {
		var aPromise = [];
		aPromise.push(this._setSecFinItem_saveData_old());
		aPromise.push(this._setSecFinItem_saveData_new());
		await Promise.all(aPromise);
	}

	/**
	 * Actualiza elemento financiado anterior con el estatus de anulado
	 */
	async _setSecFinItem_saveData_old() {
		//Guardar documentos:
		var oQuery =
			UPDATE(FinancedItems_001).set({
				status_status: "ANU"
			}).where({
				"ID": this.oldFinancedItem.ID
			});
		try {
			await cds.run(oQuery);
		} catch (err) {
			throw new ErrorBA("Error desconocido FinancedItemsSecFin._setSecFinItem_saveData_old");
		}
	}

	/**
	 * Inserta nuevo elemento financiado con la nueva financiera
	 */
	async _setSecFinItem_saveData_new() {
		//Actualizar:
		var oQuery =
			INSERT.into(FinancedItems_001).entries([this.newFinancedItem]);
		try {
			var res = await cds.run(oQuery);
		} catch (err) {
			console.log(err);
			throw new ErrorBA("Error desconocido FinancedItemsSecFin._setSecFinItem_saveData_new");
		}
	}

	/**
	 * Obtiene atributos para Segunda Financiera para la nueva entidad a insertara
	 */
	async _setSecFinItem_getData() {
		//Nuevo monto a financiar
		this.newFinancedItem.ID = uuid();
		this.oSecFin.newFinItem_ID = this.newFinancedItem.ID;
		this.newFinancedItem.secuence = await Helpers.getLastSecuenceFI(this.newFinancedItem.serial);
		this.newFinancedItem.secuence++;
		this.newFinancedItem.status_status = "FIN";
		this.newFinancedItem.costAmt = Number(this.newFinancedItem.costAmt);
		this.newFinancedItem.financedAmt = Number(this.oSecFin.financedAmt);
		this.newFinancedItem.balanceAmt = Number(this.oSecFin.financedAmt);
		this.newFinancedItem.payedAmt = 0;
		this.newFinancedItem.rateValue = Number(this.newFinancedItem.rateValue);
		this.newFinancedItem.diffPerc = Number(this.newFinancedItem.diffPerc);
		this.newFinancedItem.graceDays = parseInt(this.oSecFin.graceDays);
		this.newFinancedItem.intMonthDay = 0;
		this.newFinancedItem.intMonthSum = 0;
		this.newFinancedItem.intAllDay = 0;
		this.newFinancedItem.intAllSum = 0;
		this.newFinancedItem.intSumPay = 0;
		this.newFinancedItem.dateStart = this.oSecFin.dateStart;
		this.newFinancedItem.dateEnd = moment(this.newFinancedItem.datestart)
			.add(parseInt(this.oSecFin.finDays), "d")
			.format();
		this.newFinancedItem.finSrv_finCode = this.oSecFin.finCode;
	}

	/**
	 * Genera documento 1t segunda financiera a partir de la información en memoria
	 */
	async _createSecFin_1t() {
		try {
			await this._createSecFin_1t_GetData();
			await this._createSecFin_1t_GenDoc();
		} catch (ex) {
			console.log(ex);
			throw new ErrorBA("Error generación 1T");
		}
	}

	/**
	 * Obtiene información para nueva entidad a través de peticiones asíncronas
	 */
	async _createSecFin_1t_GetData() {
		//Item Anterior:
		this.oldFinancedItem = await this._getFinancedItem_old();
		//Copia para el nuevo
		this.newFinancedItem = Object.assign({}, this.oldFinancedItem);
		//Unidad ID:
		this.oSecFin.unidadID = this.oldFinancedItem.unidadID;
		//Obtener promesas:
		var aPromise = [];
		aPromise.push(Helpers.getFinSrvs(this.oldFinancedItem.fundSubType_ID, this.oldFinancedItem.center,
			this.oldFinancedItem.finSrv_finCode));
		aPromise.push(Helpers.getLastSecuenceSecFin(this.oSecFin.unidadID));
		var resPromise = await Promise.all(aPromise);
		//ViewFinSrvCredits_001
		this.ViewFinSrvCredits_001 = resPromise[0];
		//Obtener la secuencia:
		this.oSecFin.secuence = resPromise[1];
		//Sumar secuencia
		this.oSecFin.secuence++;
		this.oSecFin.dateTransfer = moment().format();
		//Configuración cuenta de ingreso, se utiliza la que tenga guardada.
		this.oSecFin.accIncome = this.oldFinancedItem.accIncome;
		//Texto cabecera
		this.headerTxt = "2da Financiera " + this.oldFinancedItem.finSrv_finCode;
	}

	/**
	 * Obtiene información elemento financiado anterior a través del ID en oldFinItemID
	 */
	async _getFinancedItem_old() {
		const {
			FinancedItems_001
		} = cds.entities('BD.VN.PP.XDATA');
		//Obtener elemento a financiar:
		var oQuery = SELECT.from(FinancedItems_001).where({
			"ID": this.oSecFin.oldFinItemID
		});
		var oRes = await cds.run(oQuery);
		if (oRes.length === 0) {
			throw new ErrorBA("Elemento financiado no encontrado");
		}
		return oRes[0];
	}

	/**
	 * Genera documento 1T en S/4 
	 */
	async _createSecFin_1t_GenDoc() {
		const _1T = CreateFinDocSet.builder()
			.hdid(this.oSecFin.ID)
			.idvehi(this.oldFinancedItem.unidadID)
			.vin(this.oldFinancedItem.serial)
			.company(this.oldFinancedItem.companyCode)
			.finoper("SF_KI")
			.account(this.oSecFin.accIncome)
			.docDate(moment(this.oSecFin.dateStart).format("YYYYMMDD"))
			.hdtext(this.headerTxt)
			.scpuser(this.user)
			.scpapp(this.sCallingApp)
			.itemsSet([
				ItemsSet.builder()
				.assignment(Helpers.getVinReference(this.oldFinancedItem.serial))
				.hdid(this.oSecFin.ID)
				.vendorNo(this.ViewFinSrvCredits_001.sapLifnr)
				.segment(this.oldFinancedItem.segment)
				.division(this.oldFinancedItem.center)
				.itemtext(this.headerTxt)
				.currency(this.oldFinancedItem.currency)
				.amount(this.oSecFin.financedAmt)
				.build()
			]).retSet([])
			.build();
		try {
			let res = await CreateFinDocSet
				.requestBuilder()
				.create(_1T)
				.execute({
					destinationName: Helpers.getDestinationName()
				});
			//console.log("RESPUESTAJCBG 1T", JSON.stringify(res));
			if (res.retSet[0].type === "S") {
				var oDocuments = Helpers.getDocNumbers(res.retSet[0]);
				var oLog = Helpers.getDocLogEntity(this.oldFinancedItem.unidadID, oDocuments, "", this.user, "SEGUNDA FINANCIERA INGRESO",
					"FISECFIN");
				Helpers.insertLogEntries([oLog]);
				this.oSecFin.sapBELNR1T = oDocuments.belnr;
				this.oSecFin.sapBUKRS1T = oDocuments.bukrs;
				this.oSecFin.sapGJAHR1T = oDocuments.gjahr;
				this.oSecFin.sapSTBLG1T = "";
			} else {
				Helpers.documentFIErrorLog(retSet, this.oSecFin.ID);
				throw new ErrorBA('Error en generación de póliza');
			}
		} catch (err) {
			if (err.name !== "BAVNPP001") {
				throw new ErrorBA("Error desconocido");
			} else {
				throw err;
			}
		}
		return null;
	}
}