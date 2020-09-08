'use strict';
const moment = require('moment-timezone');
const Helpers = require('./Helpers.js');
const ErrorBA = require('./ErrorBA.js');
const FinancedItemInterestDocGen = require('./FinancedItemInterestDocGen.js');
const InterestPay = require('./InterestPay.js');

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
	FinancedItemsPayments_001
} = cds.entities('BD.VN.PP.XDATA');
const LayoutManager = require('./LayoutManager.js');
/**
 * Esta clase maneja lo relacionado con el proceso de pago.
 */
module.exports = class FinancedItemsPayments {
	constructor(payment, user) {
		this.oPayment = payment;
		this.sCallingApp = "BAVNPP001";
		this.user = user;
		moment.tz.setDefault("America/Mexico_City");
	}

	/**
	 * Regresa arreglo con las posiciones adicionales a anular en caso de que existan
	 */
	static async getMultiItemsReverse(aInput) {
		try {
			var aReturn = [...aInput];
			//Espera un obj tipo { ID: oObj.ID, flagDel: true }
			var aID = [];
			aReturn.forEach(x => {
				if (aID.indexOf(x.ID) === -1) {
					aID.push("'" + x.ID + "'");
				}
			});
			//Generar query para obtener la lista de documentos anular que sean múltiples:
			var sQueryWhere = "flagMulti = true AND ID IN (" + aID.join() + ")";
			var oQueryWhere = cds.parse.expr(sQueryWhere);
			var oQuery = SELECT.from(FinancedItemsPayments_001, [
				"sapBELNRKZ",
				"sapBUKRSKZ",
				"sapGJAHRKZ"
			]).where(oQueryWhere);

			var oRes = await cds.run(oQuery);
			//Si no hay nada terminar
			if (oRes.length === 0) {
				return aReturn;
			}
			//Buscar los demás documentos que tengan ese mismo documento KZ
			var sQueryWhere2 = "ID NOT IN (" + aID.join() + ") AND (";
			var aBelnrQuery = [];
			for (var oRow of oRes) {
				var oOther = " (" +
					" sapBUKRSKZ = '" + oRow.sapBUKRSKZ + "' AND " +
					" sapGJAHRKZ = '" + oRow.sapGJAHRKZ + "' AND " +
					" sapBELNRKZ = '" + oRow.sapBELNRKZ + "'  " +
					") ";
				aBelnrQuery.push(oOther);
			}
			sQueryWhere2 = sQueryWhere2 + aBelnrQuery.join(" OR ") + ")";
			var oQueryWhere2 = cds.parse.expr(sQueryWhere2);
			var oQuery2 = SELECT.from(FinancedItemsPayments_001, ["ID"]).where(oQueryWhere2);
			var oRes2 = await cds.run(oQuery2);
			//Si no hay nada terminar
			for (var oRow2 of oRes2) {
				aReturn.push({
					ID: oRow2.ID,
					flagDel: true
				});
			}
			return aReturn;
		} catch (ex) {
			console.log(ex);
			return aInput;
		}
	}

	/**
	 * Regresa un arreglo de dos posiciones, en la primera posición vienen todos los pagos
	 * a procesar de forma individual y en el segundo vienen los pagos a procesar con un solo
	 * documento KZ/FD Indv / Multi
	 */
	static async getIndivMult(aInput) {
		var oRes = {
			Indv: [],
			Multi: []
		};
		for (var oItem of aInput) {
			var sameUnidadID = aInput.filter(x => x.unidadID === oItem.unidadID);
			if (sameUnidadID.length === 1) {
				oItem.flagMulti = false;
				oRes.Indv.push(oItem);
			} else {
				oItem.flagMulti = true;
				oRes.Multi.push(oItem);
			}
		}
		return oRes;
	}

	/**
	 * Anular pago:
	 */
	async reverseMethodFunction() {
		try {
			//Obtener info de BD y unir con petición
			await this._reverseMethodFunctionDB();
			//Generar documentos
			await this.reversePayment();
			//Guardar cambios
			await this._reverseMethodFunctionUpdateDB();
			//Eventos adicionales
			await this._reverseMethodFunctionUpdateExtra();
			return true
		} catch (ex) {
			console.log(ex);
		}
		return false;
	}

	/**
	 * Realiza actualizaciones relacionadas con la anulación
	 */
	async _reverseMethodFunctionUpdateExtra() {
		var aPromise = [];
		aPromise.push(LayoutManager.anulateRelItem(this.oPayment.ID));
		var oRes = await Promise.all(aPromise);
		//console.log(oRes);
	}

	/**
	 * Guardar documentos generados durante la anulación de pago
	 */
	async _reverseMethodFunctionUpdateDB() {
		//console.log("_reverseMethodFunctionUpdateDB");
		//Guardar documentos:
		var oQuery =
			UPDATE(FinancedItemsPayments_001).set({
				flagDel: true,
				sapSTBLGKZ: this.oPayment.sapSTBLGKZ,
				sapSTBLGFD: this.oPayment.sapSTBLGFD
			}).where({
				"ID": this.oPayment.ID
			});
		try {
			await cds.run(oQuery);
		} catch (err) {
			console.log(err);
			throw new ErrorBA("Error desconocido _reverseMethodFunctionUpdateDB");
		}
	}

	/**
	 * Obtener información de pago a anular
	 */
	async _reverseMethodFunctionDB() {
		//Obtener info pago
		var oQuery = SELECT.from(FinancedItemsPayments_001).where({
			"ID": this.oPayment.ID
		});
		var res = await cds.run(oQuery);
		if (res.length === 0) {
			throw new ErrorBA("Pago no encontrado");
		}
		var oTmp = res[0];
		this.oPayment = oTmp;
		this.oPayment.secuence = parseInt(this.oPayment.secuence);
		this.oPayment.flagDel = true;
		this.oPayment.flagConf = true;
		this.oPayment.financedAmt = Number(this.oPayment.financedAmt);
		this.oPayment.balanceAmt = Number(this.oPayment.balanceAmt);
		this.oPayment.payedAmt = Number(this.oPayment.payedAmt);
		this.oPayment.intMonthDay = parseInt(this.oPayment.intMonthDay);
		this.oPayment.intMonthSum = Number(this.oPayment.intMonthSum);
		this.oPayment.sapBELNRKZ = oTmp.sapBELNRKZ;
		this.oPayment.sapBUKRSKZ = oTmp.sapBUKRSKZ;
		this.oPayment.sapGJAHRKZ = oTmp.sapGJAHRKZ;
		this.oPayment.sapBLARTKZ = oTmp.sapBLARTKZ;
		this.oPayment.sapSTBLGKZ = oTmp.sapSTBLGKZ;
		this.oPayment.sapBELNRFD = oTmp.sapBELNRFD;
		this.oPayment.sapBUKRSFD = oTmp.sapBUKRSFD;
		this.oPayment.sapGJAHRFD = oTmp.sapGJAHRFD;
		this.oPayment.sapBLARTFD = oTmp.sapBLARTFD;
		this.oPayment.sapSTBLGFD = oTmp.sapSTBLGFD;
		this.oPayment.userPay = oTmp.userPay;
	}

	/**
	 * Confirmar pago múltiple, una sola KZ para todos los documentos
	 */
	async multiMethodPayment(aItems) {
		try {
			//Obtener info de BD y unir con petición
			await this._confirmMethodFunctionDB();
			//Generar documentos
			await this.confirmPayment(aItems);
			//Guardar cambios
			await this._confirmMethodFunctionUpdateDB();
			return this;
		} catch (ex) {
			console.log(ex);
		}
		return false;
	}

	/**
	 * Confirmar pago individual
	 */
	async confirmMethodFunction() {
		try {
			//Obtener info de BD y unir con petición
			await this._confirmMethodFunctionDB();
			//Generar documentos
			await this.confirmPayment();
			//Guardar cambios
			await this._confirmMethodFunctionUpdateDB();
			return this;
		} catch (ex) {
			console.log(ex);
		}
		return false;
	}

	/**
	 * Guardar documentos generados durante la propuesta de pago
	 */
	async _confirmMethodFunctionUpdateDB() {
		//console.log("_confirmMethodFunctionUpdateDB");
		//Guardar documentos:
		var oQuery =
			UPDATE(FinancedItemsPayments_001).set({
				flagDel: false,
				flagConf: this.oPayment.flagConf,
				unidadID: this.oFinancedItems_001.unidadID,
				payedAmt: this.oPayment.payedAmt,
				intPayAmt: this.oPayment.intPayAmt,
				datePay: this.oPayment.datePay,
				sapBELNRKZ: this.oPayment.sapBELNRKZ,
				sapBUKRSKZ: this.oPayment.sapBUKRSKZ,
				sapGJAHRKZ: this.oPayment.sapGJAHRKZ,
				sapBLARTKZ: this.oPayment.sapBLARTKZ,
				sapSTBLGKZ: this.oPayment.sapSTBLGKZ,
				userPay: this.oPayment.userPay,
				flagMulti: this.oPayment.flagMulti
			}).where({
				"ID": this.oPayment.ID
			});
		try {
			await cds.run(oQuery);
		} catch (err) {
			console.log(err);
			throw new ErrorBA("Error desconocido _confirmMethodFunctionUpdateDB");
		}
	}

	/**
	 * Guarda la información en la base de datos
	 */
	async _confirmMethodFunctionDB() {
		//Obtener info pago
		var oQuery = SELECT.from(FinancedItemsPayments_001).where({
			"ID": this.oPayment.ID
		});
		var res = await cds.run(oQuery);
		if (res.length === 0) {
			throw new ErrorBA("Pago no encontrado");
		}
		var oTmp = res[0];
		this.oPayment.secuence = parseInt(oTmp.secuence);
		this.oPayment.flagDel = false;
		this.oPayment.flagConf = true;
		this.oPayment.financedAmt = Number(oTmp.financedAmt);
		this.oPayment.balanceAmt = Number(oTmp.balanceAmt);
		this.oPayment.payedAmt = Number(this.oPayment.payedAmt);
		this.oPayment.intMonthDay = parseInt(oTmp.intMonthDay);
		this.oPayment.intMonthSum = Number(this.oPayment.intMonthSum);
		this.oPayment.sapBELNRKZ = "";
		this.oPayment.sapBUKRSKZ = "";
		this.oPayment.sapGJAHRKZ = "";
		this.oPayment.sapBLARTKZ = "";
		this.oPayment.sapSTBLGKZ = "";
		this.oPayment.userPay = this.user;
	}

	/**
	 * Generar template y correr secuencia:
	 */
	async createMethodFunction() {
		try {
			this.oPayment.ID = uuid();
			await this._registerPaymentProposal();
			await this.registerPayment_save();
			return true;
		} catch (ex) {
			console.log(ex);
		}
		return false;
	}

	/**
	 * Obtiene el último pago confirmado
	 */
	static async getLastPaymentConf(financedItem_ID) {
		//Obtener info pago
		var oQuery = SELECT.from(FinancedItemsPayments_001, [
			'ID'
		]).where({
			"financedItem_ID": financedItem_ID,
			flagConf: true,
			flagDel: false
		}).orderBy({
			secuence: "desc"
		}).limit(1, 0);
		var res = await cds.run(oQuery);
		if (res.length === 0) {
			return "";
		}
		return res[0].ID;
	}

	/**
	 * Elimina propuestas de pagos perdidas
	 */
	static async fallBackDelPro(financedItem_ID) {
		//Actualizar:
		var oQuery =
			UPDATE(FinancedItems_001).set({
				status_status: "FIN"
			}).where({
				"ID": financedItem_ID
			});
		await cds.run(oQuery);
	}

	/**
	 * Obtiene la última propuesta de pago
	 */
	static async getLastPaymentPro(financedItem_ID) {

		//Obtener info pago
		var oQuery = SELECT.from(FinancedItemsPayments_001, [
			'ID'
		]).where({
			"financedItem_ID": financedItem_ID,
			flagConf: false
		}).orderBy({
			secuence: "desc"
		}).limit(1, 0);
		var res = await cds.run(oQuery);
		return res[0].ID;
	}

	/**
	 * Elimina una propuesta de pago
	 */
	static async doDelete(ID, financedItem_ID) {

		//Cambiar a estatus FIN:
		var oQueryFin =
			UPDATE(FinancedItems_001).set({
				status_status: "FIN"
			}).where({
				"ID": financedItem_ID
			});
		await cds.run(oQueryFin);
		//Eliminar
		return await cds.run(DELETE.from(FinancedItemsPayments_001).where({
			"ID": ID
		}));
	}

	/**
	 * Obtiene si es posible o no eliminar un pago
	 */
	static async allowDelete(ID) {
		//Obtener secuencia:
		var oQuery = SELECT.from(FinancedItemsPayments_001, [
			'ID'
		]).where({
			"ID": ID,
			"flagConf": false
		}).orderBy({
			secuence: "desc"
		}).limit(1, 0);
		var oRes = await cds.run(oQuery);
		if (oRes.length === 0) {
			throw new ErrorBA("Imposible eliminar registro, pago ya confirmado.");
		}
		return parseInt(oRes[0].ID);
	}

	/**
	 * Regresa el ojeto modificado
	 */
	getPayment() {
		this.oPayment.flagDel = Boolean(this.oPayment.flagDel);
		this.oPayment.flagConf = Boolean(this.oPayment.flagConf);
		this.oPayment.financedAmt = Number(this.oPayment.financedAmt);
		this.oPayment.balanceAmt = Number(this.oPayment.balanceAmt);
		this.oPayment.payedAmt = Number(this.oPayment.payedAmt);
		this.oPayment.intMonthDay = parseInt(this.oPayment.intMonthDay);
		this.oPayment.intMonthSum = Number(this.oPayment.intMonthSum);
		return this.oPayment;
	}

	/**
	 * Guarda la propuesta de pago
	 */
	async registerPayment_save() {
		//Insertar secuencia:
		var oQuery =
			INSERT.into(FinancedItemsPayments_001).entries([this.oPayment]);
		await cds.run(oQuery);
	}

	/**
	 * Anulación de pago
	 */
	async reversePayment() {
		//Pago:
		if (this.oPayment.datePay !== null && Boolean(this.oPayment.flagDel) && Boolean(this.oPayment.flagConf)) {
			//Obtener datos item financiado
			this.oFinancedItems_001 = await this._getFinancedItem();
			await this._reversePaymentDocuments();
			var aPromise = [];
			aPromise.push(this._reversePaymentChangeStatus());
			aPromise.push(this._reversePaymentIntDocs());
			await Promise.all(aPromise);
		}
	}

	/**
	 * Anulación de pago: Anular documentos Intereses:
	 */
	async _reversePaymentIntDocs() {
		var res = await FinancedItemInterestDocGen.anulateRelItem(this.oPayment.ID, this.user);
		if (res) {
			//console.log("Borrado DOCFI intereses OK");
		} else {
			//console.log("Borrado DOCFI intereses error");
		}
	}

	/**
	 * Anulación de pago: Anular en SAP
	 */
	async _reversePaymentDocuments() {
		//Exista documento a anular
		if (!this.oPayment.sapBELNRKZ || !this.oPayment.sapBUKRSKZ || !this.oPayment.sapGJAHRKZ) {
			return;
		}
		//No se haya anulado antes
		if (!!this.oPayment.sapSTBLGKZ) {
			return;
		}
		var sDocID = this.oPayment.sapBELNRKZ + this.oPayment.sapBUKRSKZ + this.oPayment.sapGJAHRKZ;
		//Anular en SAP:
		const doc = CancelFinDocSet.builder()
			.idvehi(this.oFinancedItems_001.unidadID)
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
			this.oPayment.sapSTBLGKZ = res.canceldoc;
			Helpers.updateLogSTBLG(this.oPayment.sapBELNRKZ, this.oPayment.sapBUKRSKZ, this.oPayment.sapGJAHRKZ, this.oPayment.sapSTBLGKZ);

		} catch (err) {
			console.log("ERRORJCBG", err);
		}
	}

	/**
	 * Anulación de pago: Cambiar estatus en unidad a pagar
	 */
	async _reversePaymentChangeStatus() {
		try {
			this.oFinancedItems_001.balanceAmt = Number(this.oFinancedItems_001.balanceAmt);
			this.oFinancedItems_001.payedAmt = Number(this.oFinancedItems_001.payedAmt);
			this.oFinancedItems_001.balanceAmt += Number(this.oPayment.payedAmt);
			this.oFinancedItems_001.payedAmt -= Number(this.oPayment.payedAmt);
			this.oFinancedItems_001.status_status = "FIN";
			//Actualizar:
			var oQuery =
				UPDATE(FinancedItems_001).set({
					status_status: this.oFinancedItems_001.status_status,
					balanceAmt: this.oFinancedItems_001.balanceAmt,
					payedAmt: this.oFinancedItems_001.payedAmt,
					dateLastPay: this.oPayment.oldLastPay
				}).where({
					"ID": this.oPayment.financedItem_ID
				});
			await cds.run(oQuery);
		} catch (err) {
			throw new ErrorBA("Error desconocido _reversePaymentChangeStatus");
		}
	}

	/**
	 * Confirmar una propuesta de pago
	 */
	async confirmPayment(aItems) {
		if (this.oPayment.datePay !== null && !Boolean(this.oPayment.flagDel) && Boolean(this.oPayment.flagConf)) {
			this._confirmPaymentCheck();
			await this._confirmPaymentDocuments(aItems);
			var aPromise = [];
			aPromise.push(this._confirmPaymentChangeStatus());
			aPromise.push(this._confirmPaymentDoInt());
			await Promise.all(aPromise);
		}
	}

	/**
	 * Generar intereses KR KZ 
	 **/
	async _confirmPaymentDoInt() {
		this.oPayment.intPayAmt = Number(this.oPayment.intPayAmt);
		if (this.oPayment.intPayAmt <= 0 || this.oFinancedItems_001.balanceAmt !== 0) {
			return;
		}
		var oFinItem = await this._getFinancedItem();
		var helperKZ = new FinancedItemInterestDocGen(moment(this.oPayment.datePay).format(),
			this.oPayment.intPayAmt,
			oFinItem, false, "flagPay", this.user, this.oPayment.ID);
		var res = await helperKZ.generateFinDocKRKZ();
		if (res === true) {
			//console.log("KR KZ Intereses generado.");
		} else {
			//console.log("KR KZ Intereses no generado.");
		}
	}

	/**
	 * Validaciones para confirmar pago
	 */
	_confirmPaymentCheck() {
		//Validar fecha
		if (moment(this.oPayment.datePay).isAfter(moment(), 'day')) {
			throw new ErrorBA("Verifique fecha pago");
		}
		//Validar montos
		if (Number(this.oPayment.balanceAmt) < Number(this.oPayment.payedAmt)) {
			throw new ErrorBA("Verifique cantidad.");
		}
		//Validar datos para pago:
		if (!this.oPayment.sapHBKID || !this.oPayment.sapUKONT || !this.oPayment.sapHKTID || !this.oPayment.sapZLSCH) {
			throw new ErrorBA("Verifique datos pago.");
		}
	}

	/**
	 * Cambia el estatus de acuerdo a si hay saldo pendiente a financiar o no
	 */
	async _confirmPaymentChangeStatus(req) {
		this.oFinancedItems_001.balanceAmt = Number(this.oFinancedItems_001.balanceAmt);
		this.oFinancedItems_001.payedAmt = Number(this.oFinancedItems_001.payedAmt);
		this.oFinancedItems_001.balanceAmt -= Number(this.oPayment.payedAmt);
		this.oFinancedItems_001.payedAmt += Number(this.oPayment.payedAmt);
		this.oFinancedItems_001.status_status = "PAG";
		if (this.oFinancedItems_001.balanceAmt > 0) {
			this.oFinancedItems_001.status_status = "FIN";
		}

		//Actualizar:
		var oQuery =
			UPDATE(FinancedItems_001).set({
				status_status: this.oFinancedItems_001.status_status,
				balanceAmt: Number(this.oFinancedItems_001.balanceAmt),
				payedAmt: Number(this.oFinancedItems_001.payedAmt),
				dateLastPay: moment(this.oPayment.datePay).format()
			}).where({
				"ID": this.oPayment.financedItem_ID
			});
		try {
			await cds.run(oQuery);
		} catch (ex) {
			console.log("_confirmPaymentChangeStatus", ex);
			throw ex;
		}
	}

	/**
	 * Obtiene el elemento financiado
	 */
	getFinItem() {
		return this.oFinancedItems_001;
	}

	/**
	 * Obtiene la línea de crédito
	 */
	getFinSrv() {
		return this.ViewFinSrvCredits_001;
	}

	/**
	 * Generar documentos de propuesta de pago
	 */
	async _confirmPaymentDocuments(aItems) {
		this.oFinancedItems_001 = await this._getFinancedItem();
		await this._getFinSrvs(this.oFinancedItems_001.fundSubType_ID);
		var oItemDocN = undefined;
		var oPayAmt = this.oPayment.payedAmt
		if (aItems !== undefined) {
			var aItemsUnit = aItems
				.filter(x => x.unidadID === this.oFinancedItems_001.unidadID);
			//Si ya tiene uno documento KZ copiar y concluir
			if (aItemsUnit.some(x => x.docNumbers !== undefined)) {
				oItemDocN = aItemsUnit.find(x => x.docNumbers !== undefined);
				this.oPayment.sapBELNRKZ = oItemDocN.docNumbers.belnr;
				this.oPayment.sapBUKRSKZ = oItemDocN.docNumbers.bukrs;
				this.oPayment.sapGJAHRKZ = oItemDocN.docNumbers.gjahr;
				this.oPayment.sapBLARTKZ = oItemDocN.docNumbers.blart;
				this.oPayment.userPay = this.user;
				return;
			}
			oItemDocN = aItemsUnit[0];
			oPayAmt = 0;
			aItemsUnit.forEach(x => {
				x.sapUKONT = this.oPayment.sapUKONT;
				oPayAmt += Number(x.payedAmt);
			});
		}
		var aItemSet = [
			ItemsSet.builder()
			.hdid(this.oPayment.ID)
			.assignment(this.oFinancedItems_001.accIncome)
			.vendorNo(this.ViewFinSrvCredits_001.sapLifnr)
			.segment(this.oFinancedItems_001.segment)
			.division(this.oFinancedItems_001.center)
			.itemtext("Pago Parcial de Pedido de Unidades")
			.currency(this.oFinancedItems_001.currency)
			.amount(oPayAmt)
			.build()
		];
		const _kz = CreateFinDocSet.builder()
			.hdid(this.oPayment.ID)
			.idvehi(this.oFinancedItems_001.unidadID)
			.vin(this.oFinancedItems_001.serial)
			.company(this.oFinancedItems_001.companyCode)
			.finoper("CP_KZ")
			.hdtext("PAGO PLAN PISO")
			.docDate(moment(this.oPayment.datePay).format("YYYYMMDD"))
			.account(this.oPayment.sapUKONT)
			.scpuser(this.user)
			.scpapp(this.sCallingApp)
			.itemsSet(aItemSet)
			.retSet([])
			.build();
		try {
			let res = await CreateFinDocSet
				.requestBuilder()
				.create(_kz)
				.execute({
					destinationName: Helpers.getDestinationName()
				});
			//console.log("RESPUESTAJCBG KZ", JSON.stringify(res));
			if (res.retSet[0].type === "S") {
				let docNumbers = Helpers.getDocNumbers(res.retSet[0]);
				this.oPayment.sapBELNRKZ = docNumbers.belnr;
				this.oPayment.sapBUKRSKZ = docNumbers.bukrs;
				this.oPayment.sapGJAHRKZ = docNumbers.gjahr;
				this.oPayment.sapBLARTKZ = docNumbers.blart;
				this.oPayment.userPay = this.user;
				var oLog = Helpers.getDocLogEntity(this.oFinancedItems_001.unidadID, docNumbers, "", this.user, "Registro pago", "CONFIRMPAYMENT");
				Helpers.insertLogEntries([oLog]);
				if (oItemDocN !== undefined) {
					oItemDocN.docNumbers = docNumbers;
				}
			} else {
				this._confirmPaymentDocumentsLog(res.retSet);
				throw new ErrorBA('Error en generación de póliza');
			}
		} catch (err) {
			if (err.name !== "BAVNPP001") {
				console.log(err);
				throw new ErrorBA("Error desconocido");
			} else {
				throw err;
			}
		}
	}

	/**
	 * Guarda registro de errores en tabla FIErrDocs_001
	 */
	async _confirmPaymentDocumentsLog(retSet) {
		Helpers.documentFIErrorLog(retSet, this.oPayment.ID);
	}

	/**
	 * Registrar información adicional de propuesta de pago
	 */
	async _registerPaymentProposal() {
		let aPromises = [];
		aPromises.push(this._registerPaymentProposal_secuence());
		aPromises.push(this._getFinancedItem());
		let aRes = await Promise.all(aPromises);
		this.oPayment.secuence = aRes[0];
		this.oFinancedItems_001 = aRes[1];
		if (this.oFinancedItems_001 === null) {
			return false;
		}
		this.oPayment.payedAmt = Number(this.oPayment.payedAmt);
		this.oPayment.financedAmt = Number(this.oFinancedItems_001.financedAmt);
		this.oPayment.balanceAmt = Number(this.oFinancedItems_001.balanceAmt);
		this.oPayment.intMonthDay = parseInt(this.oFinancedItems_001.intMonthDay);
		this.oPayment.intMonthSum = Number(this.oFinancedItems_001.intMonthSum);
		this.oPayment.intPayAmt = await this.getInterestPayAmt();
		this.oPayment.userPro = this.user;
		this.oPayment.oldLastPay = this.oFinancedItems_001.dateLastPay;
		if (this.oPayment.balanceAmt < this.oPayment.payedAmt) {
			return false;
		}
		await this._registerPaymentProposal_update();
		return true;
	}

	/**
	 * Obtiene cantidad propuesta para intereses
	 */
	async getInterestPayAmt() {
		var item = {
			"FinancedItemID": this.oFinancedItems_001.ID,
			"datePay": this.oPayment.datePay,
			"payedAmt": this.oPayment.payedAmt,
			"intRecalAmt": this.oFinancedItems_001.intMonthSum
		};
		let helper = new InterestPay(item);
		await helper.getFinancedItem();
		await helper.getIntPayAmt();
		var oRes = await helper.getItem();
		return oRes.intRecalAmt;
	}

	/*
	 * Cambiar el estatus de FIN a PRO
	 */
	async _registerPaymentProposal_update() {

		//Actualizar:
		var oQuery =
			UPDATE(FinancedItems_001).set({
				status_status: "PRO"
			}).where({
				"ID": this.oPayment.financedItem_ID
			});
		await cds.run(oQuery);
	}

	/*
	 * Agregar secuencia a la propuesta de pago
	 */
	async _registerPaymentProposal_secuence() {
		//Solo puede haber una propuesta;
		var oQueryDel =
			DELETE.from(FinancedItemsPayments_001).where({
				"flagConf": false,
				"financedItem_ID": this.oPayment.financedItem_ID
			});
		await cds.run(oQueryDel);
		//Obtener secuencia:
		var oQuery = SELECT.from(FinancedItemsPayments_001, [
			'secuence'
		]).where({
			"financedItem_ID": this.oPayment.financedItem_ID
		}).orderBy({
			secuence: "desc"
		}).limit(1, 0);
		var oRes = await cds.run(oQuery);
		if (oRes.length === 0 || oRes[0].secuence === null) {
			return 1;
		}
		return parseInt(oRes[0].secuence) + 1;
	}

	/*
	 * Obtiene el item a financiar relacionado
	 */
	async _getFinancedItem() {

		//Obtener elemento a financiar:
		var oQuery = SELECT.from(FinancedItems_001).where({
			"ID": this.oPayment.financedItem_ID
		});
		var oRes = await cds.run(oQuery);
		if (oRes.length === 0) {
			cds.run(DELETE.from(FinancedItemsPayments_001).where({
				"ID": this.oPayment.ID
			}));
			this.oPayment = null;
			return null;
		}
		return oRes[0];
	}

	/*
	 * Obtiene la línea de crédito bajo el contexto privado
	 */
	async _getFinSrvs(fundSubType_ID) {
		this.ViewFinSrvCredits_001 = await Helpers.getFinSrvs(fundSubType_ID, this.oFinancedItems_001.center, this.oFinancedItems_001.finSrv_finCode);
	}
}