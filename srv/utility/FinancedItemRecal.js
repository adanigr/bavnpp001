'use strict';
const moment = require('moment-timezone');
const Helpers = require('./Helpers.js');
const ErrorBA = require('./ErrorBA.js');
const FinancedItemInterestDocGen = require('./FinancedItemInterestDocGen.js');
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
	FinancedItemsRecal_001
} = cds.entities('BD.VN.PP.XDATA');
const {
	FinOperAccs_001,
	TransferAccs_001
} = cds.entities('BD.VN.PP.XCFG');
module.exports = class FinancedItemRecal {
	constructor(oRECAL, user) {
		this.oRECAL = oRECAL;
		this.oFinItem = {};
		this.sCallingApp = "BAVNPP001";
		this.user = user;
	}

	/**
	 * Obtiene elemento
	 */
	getElement() {
		return this.oRECAL;
	}

	/**
	 * Anular operación
	 */
	async reverseMethodFunction() {
		try {
			await this._reverseMethodFunctionGetData();
			await this._reverseMethodFunctionRevDocs();
			await this._reverseMethodFunctionSave();
		} catch (ex) {
			console.log(ex);
			return false;
		}
		return true;
	}

	/**
	 * Guardar anulación BD
	 */
	async _reverseMethodFunctionSave() {
		var aPromise = [];
		aPromise.push(this._reverseMethodFunctionSaveOrg());
		aPromise.push(this._reverseMethodFunctionSaveRecal());
		await Promise.all(aPromise);
	}

	/**
	 * Actualizar atributos elemento financiado
	 */
	async _reverseMethodFunctionSaveOrg() {
		//Guardar en FinancedItems_001
		try {
			var oQuery =
				UPDATE(FinancedItems_001).set({
					dateStart: this.oRECAL.oldDateStart,
					dateEnd: this.oRECAL.oldDateEnd
				}).where({
					"ID": this.oRECAL.finItem_ID
				});
			await cds.run(oQuery);
		} catch (err) {
			console.log(err);
			throw new ErrorBA("Error desconocido _reverseMethodFunctionSaveOrg");
		}
	}

	/**
	 * Actualizar atributos recalendarización
	 */
	async _reverseMethodFunctionSaveRecal() {
		//Guardar en FinancedItemsRecal_001
		try {
			var oQuery =
				UPDATE(FinancedItemsRecal_001).set({
					flagReverse: true
				}).where({
					"ID": this.oRECAL.ID
				});
			await cds.run(oQuery);
		} catch (err) {
			console.log(err);
			throw new ErrorBA("Error desconocido _reverseMethodFunctionSaveRecal");
		}
	}

	/**
	 * Anula elementos relacionados
	 */
	async _reverseMethodFunctionRevDocs() {
		await FinancedItemInterestDocGen.anulateRelItem(this.oRECAL.ID, this.user);
	}

	/**
	 * Obtiene elemntos relacionados
	 */
	async _reverseMethodFunctionGetData() {
		//Obtener elemento a financiar:
		var oQuery = SELECT.from(FinancedItemsRecal_001).where({
			"flagReverse": false,
			"finItem_ID": this.oRECAL.finItem_ID
		}).orderBy({
			secuence: "desc"
		}).limit(1, 0);
		var oRes = await cds.run(oQuery);
		if (oRes.length === 0) {
			throw new ErrorBA("Elemento recalendarización no encontrado");
		}
		this.oRECAL = oRes[0];
		this.oFinItem = await this._createMethod_getOrg();
	}

	/**
	 * Crea nuevo elemento
	 */
	async createMethodFunction() {
		try {
			this.oRECAL.ID = uuid();
			await this._createMethod();
			await this._createMethodSave();
		} catch (ex) {
			console.log(ex);
			return false;
		}
		return true;
	}

	/**
	 * Guarda entidades generadas recalendarización
	 */
	async _createMethodSave() {
		//Guardar documentos:
		try {
			var oQuery =
				INSERT.into(FinancedItemsRecal_001).entries([this.oRECAL]);
			await cds.run(oQuery);
		} catch (err) {
			console.log(err);
			throw new ErrorBA("Error desconocido _createMethodSave 1");
		}
		//Guardar en FinancedItems_001
		try {
			var oDateFinish = moment(this.oRECAL.dateStart)
				.add(parseInt(this.oRECAL.finDays), 'days')
				.format();
			var oQuery =
				UPDATE(FinancedItems_001).set({
					dateStart: this.oRECAL.dateStart,
					dateEnd: oDateFinish
				}).where({
					"ID": this.oRECAL.finItem_ID
				});
			await cds.run(oQuery);
		} catch (err) {
			console.log(err);
			throw new ErrorBA("Error desconocido _createMethodSave 2");
		}
	}

	/**
	 * Genera nueva entidad y genera documentos FI
	 */
	async _createMethod() {
		this.oFinItem = await this._createMethod_getOrg();
		this.createMethod_SetDefault();
		await this._createMethod_flagGen();
		await this._createMethod_generateKRKZ();
	}

	/**
	 * Genera documentos KRKZ
	 */
	async _createMethod_generateKRKZ() {
		if (Number(this.oRECAL.intAmt) === 0) {
			return;
		}
		var helperKZ = new FinancedItemInterestDocGen(moment().format(), this.oRECAL.intAmt,
			this.oFinItem, false, "flagCal", this.user, this.oRECAL.ID);
		var res = await helperKZ.generateFinDocKRKZ();
		if (res === false) {
			throw new ErrorBA("Error póliza intereses");
		}
	}

	/**
	 * Obtiene entidad original
	 */
	async _createMethod_getOrg() {
		//Obtener elemento a financiar:
		var oQuery = SELECT.from(FinancedItems_001).where({
			"ID": this.oRECAL.finItem_ID
		});
		var oRes = await cds.run(oQuery);
		if (oRes.length === 0) {
			throw new ErrorBA("Elemento financiado no encontrado");
		}
		return oRes[0];
	}

	/**
	 * Parametriza entidad
	 */
	createMethod_SetDefault() {
		if (this.oRECAL.secuence === null) {
			this.oRECAL.secuence = 0;
		}
		if (this.oRECAL.finDays === null) {
			throw new ErrorBA("Falta campo finDays");
		}
		if (this.oRECAL.intAmt === null) {
			throw new ErrorBA("Falta campo intAmt");
		}
		this.oRECAL.oldDateStart = this.oFinItem.dateStart;
		this.oRECAL.oldDateEnd = this.oFinItem.dateEnd;
	}

	/**
	 * Establece banderas
	 */
	async _createMethod_flagGen() {
		//Si no tiene el flag, ignorar.
		this.oRECAL.secuence = await Helpers.getLastSecuenceRecal(this.oRECAL.finItem_ID);
		this.oRECAL.secuence++;
	}
}