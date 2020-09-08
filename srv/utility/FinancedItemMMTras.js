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
	FinancedInterest_001,
	FinancedMMTransfer_001
} = cds.entities('BD.VN.PP.XDATA');
const {
	FinOperAccs_001,
	TransferAccs_001,
	MMTrans_001,
	FinSrvCredits_001
} = cds.entities('BD.VN.PP.XCFG');
const {
	ViewFinSrvCredits_001
} = cds.entities('BD.VN.PP.XVIEW');
module.exports = class FinancedItemMMTras {
	constructor(req, oUnit, sUser, sCallingApp) {
		//Definir transacción:
		this.tx = cds.transaction(req);
		this.oUnit = oUnit;
		this.sUser = sUser;
		this.sCallingApp = sCallingApp;
		this.sDestinationName = Helpers.getDestinationName();
		this.sAPIApp = "BAVNPP001";
		this.sapError = [];
		this.headerTxt = "TRASPASO LOGISTICO PP";
		this.aPPDocGens = [];
		this.oRetTemplate = {
			HdId: oUnit.hdid,
			Idvehi: oUnit.unidadID,
			Type: "S",
			Id: "00",
			Number: "",
			Message: "No implementado",
			LogNo: "",
			LogMsgNo: "",
			MessageV1: "",
			MessageV2: "",
			MessageV3: "",
			MessageV4: "",
			Parameter: "",
			Row: "",
			Field: "FinancedItemMMTras",
			System: "BAVNPP001"
		}
	}

	/**
	 * Realiza traspaso logístico
	 */
	async doMMTransfer() {
		//Obtener línea de financiamientos activas.
		var oItems = await this._doMMTransfer_getFinItems();
		if (oItems.length === 0) {
			var oRet = Object.assign({}, this.oRetTemplate);
			oRet.Type = "S";
			oRet.ID = "01";
			oRet.Message = "No hay elementos financiados activos.";
			return [oRet]
		}
		//Por cada item mover a nuevo centro dependiendo de la conf.
		var aRet = [];
		for (var oFinItem of oItems) {
			var bProcess = false;
			var oFinancedMMTransfer = {
				oldFinItem_ID: oFinItem.ID,
				newFinItem_ID: oFinItem.ID,
				flagReverse: false,
				sapBUKRS1T: "",
				sapBELNR1T: "",
				sapGJAHR1T: "",
				sapSTBLG1T: "",
				sapBLART1T: "",
				sapBUKRSKA: "",
				sapBELNRKA: "",
				sapGJAHRKA: "",
				sapSTBLGKA: "",
				sapBLARTKA: ""
			}
			bProcess = await this._doMMTransfer_checkCfg(oFinItem);
			if (!bProcess) {
				var oRet = Object.assign({}, this.oRetTemplate);
				oRet.Type = "S";
				oRet.ID = "01";
				oRet.Message = "Elemento financiado no se va a traspasar a centro por configuración.";
				oRet.MessageV1 = oFinItem.ID;
				oRet.MessageV2 = oFinItem.center + "|" + this.oUnit.center + "|" + oFinItem.finSrv_finCode;
				aRet.push(oRet);
				continue;
			}
			//Verificar saldos:
			bProcess = await this._doMMTransfer_validate_Conf(oFinItem);
			if (!bProcess) {
				var oRet = Object.assign({}, this.oRetTemplate);
				oRet.Type = "E";
				oRet.ID = "02";
				oRet.Message = "Configuración inválida.";
				oRet.MessageV1 = oFinItem.ID;
				oRet.MessageV2 = this.oUnit.center + "|" + oFinItem.finSrv_finCode;
				oRet.MessageV3 = "FinSrvCredits_001|TransferAccs_001"
				aRet.push(oRet);
				continue;
			}
			//Generación documentos KA / 1T
			bProcess = await this._doMMTransfer_genDocs(oFinItem, oFinancedMMTransfer);
			if (!bProcess) {
				var oRet = Object.assign({}, this.oRetTemplate);
				oRet.Type = "E";
				oRet.ID = "03";
				oRet.Message = "No se pudo generar documento FI.";
				oRet.MessageV1 = oFinItem.ID;
				oRet.MessageV2 = this.oUnit.center + "|" + oFinItem.finSrv_finCode;
				aRet.push(oRet);
				if (this.sapError.length !== 0) {
					var error = this.sapError.map(x => {
						var oRet = Object.assign({}, this.oRetTemplate);
						oRet.Type = x.type;
						oRet.Message = x.message;
						oRet.LogNo = x.logNo;
						oRet.LogMsgNo = x.logMsgNo;
						oRet.MessageV1 = x.messageV1;
						oRet.MessageV2 = x.messageV2;
						oRet.MessageV3 = x.messageV3;
						oRet.MessageV4 = x.messageV4;
					});
					aRet = [...aRet, ...error];
				}
				continue;
			}
			//Marcar como anulado y generar nueva linea
			bProcess = await this._doMMTransfer_updateDB(oFinItem, oFinancedMMTransfer);
			if (!bProcess) {
				var oRet = Object.assign({}, this.oRetTemplate);
				oRet.Type = "E";
				oRet.ID = "04";
				oRet.Message = "No fue posible guardar cambios.";
				oRet.MessageV1 = oFinItem.ID;
				oRet.MessageV2 = "FinancedItems_001|FinancedMMTransfer_001";
				aRet.push(oRet);
				continue;
			}
			var oRet = Object.assign({}, this.oRetTemplate);
			oRet.Type = "S";
			oRet.ID = "05";
			oRet.Message = "Se ha transferido elemento financiado a nuevo centro";
			oRet.MessageV1 = oFinItem.ID;
			oRet.MessageV2 = oFinancedMMTransfer.sapBLART1T + oFinancedMMTransfer.sapBELNR1T + oFinancedMMTransfer.sapBUKRS1T +
				oFinancedMMTransfer.sapGJAHR1T;
			oRet.MessageV3 = oFinancedMMTransfer.sapBLARTKA + oFinancedMMTransfer.sapBELNRKA + oFinancedMMTransfer.sapBUKRSKA +
				oFinancedMMTransfer.sapGJAHRKA;
			aRet.push(oRet);
		}
		await this._commitOrRollback(aRet);
		return aRet;
	}

	/**
	 * En caso de que existiera un error realizar rollback y cancelar docs 
	 * generados.
	 */
	async _commitOrRollback(aRet) {
		//Si no contiene error, salir en variable para poder mod. en debugger
		var bError = aRet.some(ret => ret.Type === "E");
		if (bError === false) {
			var oCommit = await this.tx.commit();
			return;
		}
		//Pasar los registros a error
		aRet.filter(y => y.Type === "S").
		forEach(x => {
			x.Type = "W";
		});
		//Anular
		var aPromise = [];
		aPromise.push(this.tx.rollback());
		//Anular docs SAP
		for (const oDocNums of this.aPPDocGens) {
			aPromise.push(this._rollBackDoc(oDocNums));
		}
		await Promise.all(aPromise);
	}

	/**
	 * Anula doc. fin
	 */
	async _rollBackDoc(oDocNums) {
		var sDocID = oDocNums.belnr + oDocNums.bukrs + oDocNums.gjahr;
		//Anular en SAP:
		const doc = CancelFinDocSet.builder()
			.idvehi(oDocNums.unidadID)
			.docid(sDocID)
			.scpuser(this.sUser)
			.scpapp(this.sAPIApp)
			.cancelind("")
			.canceldoc("")
			.build();
		try {
			let res = await CancelFinDocSet
				.requestBuilder()
				.create(doc)
				.execute({
					destinationName: Helpers.getDestinationName()
				});
		} catch (err) {
			console.log("ERRORJCBG", err);
		}
	}

	/**
	 * Generar nueva línea financiamiento
	 */
	async _doMMTransfer_updateDB(oFinItem, oFinancedMMTransfer) {
		var oNewFinItem = Object.assign({}, oFinItem);
		oNewFinItem.ID = uuid();
		oNewFinItem.center = this.oUnit.center;
		oFinancedMMTransfer.newFinItem_ID = oNewFinItem.ID;
		oNewFinItem.secuence = await Helpers.getLastSecuenceFI(oNewFinItem.serial);
		oNewFinItem.secuence++;
		oNewFinItem.costAmt = Number(oNewFinItem.costAmt);
		oNewFinItem.financedAmt = Number(oNewFinItem.financedAmt);
		oNewFinItem.balanceAmt = Number(oNewFinItem.balanceAmt);
		oNewFinItem.payedAmt = Number(oNewFinItem.payedAmt);
		oNewFinItem.rateValue = Number(oNewFinItem.rateValue);
		oNewFinItem.diffPerc = Number(oNewFinItem.diffPerc);
		oNewFinItem.graceDays = parseInt(oNewFinItem.graceDays);
		oNewFinItem.intMonthDay = Number(oNewFinItem.intMonthDay);
		oNewFinItem.intMonthSum = Number(oNewFinItem.intMonthSum);
		oNewFinItem.intAllDay = Number(oNewFinItem.intAllDay);
		oNewFinItem.intAllSum = Number(oNewFinItem.intAllSum);
		oNewFinItem.intSumPay = Number(oNewFinItem.intSumPay);
		oNewFinItem.sapBELNR1T = oFinancedMMTransfer.sapBELNR1T;
		oNewFinItem.sapBUKRS1T = oFinancedMMTransfer.sapBUKRS1T;
		oNewFinItem.sapGJAHR1T = oFinancedMMTransfer.sapGJAHR1T;
		oNewFinItem.sapBELNRKA = oFinancedMMTransfer.sapBELNRKA;
		oNewFinItem.sapBUKRSKA = oFinancedMMTransfer.sapBUKRSKA;
		oNewFinItem.sapGJAHRKA = oFinancedMMTransfer.sapGJAHRKA;
		try {
			var aPromise = [];
			aPromise.push(this._doMMTransfer_updateDB_newFinItem(oNewFinItem));
			aPromise.push(this._doMMTransfer_updateDB_newMMTransfer(oFinancedMMTransfer));
			aPromise.push(this._doMMTransfer_updateDB_oldFinItem(oFinItem));
			aPromise.push(this._doMMTransfer_updateDB_FinSrv());
			await Promise.all(aPromise);
		} catch (ex) {
			console.log(ex);
			return false;
		}
		return true;
	}

	/**
	 * Actualiza líneas de crédito
	 */
	async _doMMTransfer_updateDB_FinSrv() {
		//Guardar status:
		var oQuery_old =
			UPDATE(FinSrvCredits_001).set({
				balanceMXN: this.ViewFinSrvCredits_001_old.balanceMXN,
				balanceUSD: this.ViewFinSrvCredits_001_old.balanceUSD,
			}).where({
				"ID": this.ViewFinSrvCredits_001_old.ID
			});
		try {
			await this.tx.run(oQuery_old);
		} catch (err) {
			console.log(err);
			throw new ErrorBA("Error desconocido _doMMTransfer_updateDB_FinSrv");
		}
		//Guardar status:
		var oQuery_new =
			UPDATE(FinSrvCredits_001).set({
				balanceMXN: this.ViewFinSrvCredits_001_new.balanceMXN,
				balanceUSD: this.ViewFinSrvCredits_001_new.balanceUSD,
			}).where({
				"ID": this.ViewFinSrvCredits_001_new.ID
			});
		try {
			await this.tx.run(oQuery_new);
		} catch (err) {
			console.log(err);
			throw new ErrorBA("Error desconocido _doMMTransfer_updateDB_FinSrv");
		}
	}

	/**
	 * Actualiza status de financiamiento original
	 */
	async _doMMTransfer_updateDB_oldFinItem(oFinItem) {
		//Guardar status:
		var oQuery =
			UPDATE(FinancedItems_001).set({
				status_status: "ANU",
			}).where({
				"ID": oFinItem.ID
			});
		try {
			await this.tx.run(oQuery);
		} catch (err) {
			console.log(err);
			throw new ErrorBA("Error desconocido _doMMTransfer_updateDB_oldFinItem");
		}
	}

	/**
	 * Genera nuevo log en traspaso
	 */
	async _doMMTransfer_updateDB_newMMTransfer(oFinancedMMTransfer) {
		var oQuery =
			INSERT.into(FinancedMMTransfer_001).entries([oFinancedMMTransfer]);
		try {
			var res = await this.tx.run(oQuery);
		} catch (err) {
			console.log(err);
			throw new ErrorBA("Error desconocido _doMMTransfer_updateDB_newMMTransfer");
		}
	}

	/**
	 * Genera nuevo item a financiar
	 */
	async _doMMTransfer_updateDB_newFinItem(oNewFinItem) {
		//Actualizar:
		var oQuery =
			INSERT.into(FinancedItems_001).entries([oNewFinItem]);
		try {
			var res = await this.tx.run(oQuery);
		} catch (err) {
			console.log(err);
			throw new ErrorBA("Error desconocido _doMMTransfer_updateDB_newFinItem");
		}
	}

	/**
	 * Genera documento KA y 1T
	 */
	async _doMMTransfer_genDocs(oFinItem, oFinancedMMTransfer) {
		var res1 = false,
			res2 = false;
		try {
			res1 = await this._doMMTransfer_genDocs_KA(oFinItem, oFinancedMMTransfer);
			res2 = await this._doMMTransfer_genDocs_1T(oFinItem, oFinancedMMTransfer);
		} catch (exception) {
			console.log("_doMMTransfer_genDocs", exception);
			res1 = false;
			res2 = false;
		}
		if (!res1 || !res2) {
			await this._doMMTransfer_genDocs_rollback(oFinItem, oFinancedMMTransfer);
		}
		return res1 && res2;
	}

	/**
	 * Anular en caso de error
	 */
	async _doMMTransfer_genDocs_rollback(oFinItem, oFinancedMMTransfer) {
		let sDocID_1T = oFinancedMMTransfer.sapBELNR1T + oFinancedMMTransfer.sapBUKRS1T + oFinancedMMTransfer.sapGJAHR1T;
		let sDocID_KA = oFinancedMMTransfer.sapBELNRKA + oFinancedMMTransfer.sapBUKRSKA + oFinancedMMTransfer.sapGJAHRKA;
		const doc_1T = CancelFinDocSet.builder()
			.idvehi(oFinItem.unidadID)
			.docid(sDocID_1T)
			.scpuser(this.sUser)
			.scpapp(this.sAPIApp)
			.cancelind("")
			.canceldoc("")
			.build();
		const doc_KA = CancelFinDocSet.builder()
			.idvehi(oFinItem.unidadID)
			.docid(sDocID_1T)
			.scpuser(this.sUser)
			.scpapp(this.sAPIApp)
			.cancelind("")
			.canceldoc("")
			.build();
		try {
			if (sDocID_1T !== "") {
				let res_1T = await CancelFinDocSet.requestBuilder().create(doc)
					.execute({
						destinationName: this.sDestinationName
					});
				Helpers.updateLogSTBLG(oFinancedMMTransfer.sapBELNR1T, oFinancedMMTransfer.sapBUKRS1T, oFinancedMMTransfer.sapGJAHR1T, res_1T.canceldoc);
			}
			if (sDocID_KA !== "") {
				let res_KA = await CancelFinDocSet.requestBuilder().create(doc)
					.execute({
						destinationName: this.sDestinationName
					});
				Helpers.updateLogSTBLG(oFinancedMMTransfer.sapBELNRKA, oFinancedMMTransfer.sapBUKRSKA, oFinancedMMTransfer.sapGJAHRKA, res_KA.canceldoc);
			}
		} catch (err) {
			console.log("ERRORJCBG", err);
		}
	}

	/**
	 * Obtiene la configuración de las financieras:
	 */
	async _doMMTransfer_validate_Conf(oFinItem) {
		try {
			var aPromise = [];
			aPromise.push(this._doMMTransfer_validate_Conf_1(oFinItem));
			aPromise.push(this._doMMTransfer_validate_Conf_2(oFinItem));
			await Promise.all(aPromise);
		} catch (ex) {
			console.log(ex);
			return false;
		}
		return true;
	}

	/**
	 * Obtiene this.ViewFinSrvCredits_001_old y 
	 * this.ViewFinSrvCredits_001_new
	 */
	async _doMMTransfer_validate_Conf_1(oFinItem) {
		this.ViewFinSrvCredits_001_old = await Helpers.getFinSrvs(
			oFinItem.fundSubType_ID,
			oFinItem.center,
			oFinItem.finSrv_finCode);
		this.ViewFinSrvCredits_001_new = await Helpers.getFinSrvs(
			oFinItem.fundSubType_ID,
			this.oUnit.center,
			oFinItem.finSrv_finCode);
		this.ViewFinSrvCredits_001_new.balanceMXN = Number(this.ViewFinSrvCredits_001_new.balanceMXN);
		this.ViewFinSrvCredits_001_old.balanceMXN = Number(this.ViewFinSrvCredits_001_old.balanceMXN);
		this.ViewFinSrvCredits_001_new.balanceUSD = Number(this.ViewFinSrvCredits_001_new.balanceUSD);
		this.ViewFinSrvCredits_001_old.balanceUSD = Number(this.ViewFinSrvCredits_001_old.balanceUSD);
		if (oFinItem.currency === "MXN") {
			this.ViewFinSrvCredits_001_new.balanceMXN -= Number(oFinItem.balanceAmt);
			this.ViewFinSrvCredits_001_old.balanceMXN += Number(oFinItem.balanceAmt);
		} else {
			this.ViewFinSrvCredits_001_new.balanceUSD -= Number(oFinItem.balanceAmt);
			this.ViewFinSrvCredits_001_old.balanceUSD -= Number(oFinItem.balanceAmt);
		}
		if (this.ViewFinSrvCredits_001_new.balanceMXN < 0 || this.ViewFinSrvCredits_001_new.balanceUSD < 0) {
			return false;
		}
	}

	/**Obtiene cuentas de creación 
	 *  this.TransferAccs_001_1T
	 *  this.TransferAccs_001_KA
	 */
	async _doMMTransfer_validate_Conf_2(oFinItem) {
		var sFlag1T = "flagTL_1T";
		var oWhere1T = {
			"center": oFinItem.center,
			"currency": oFinItem.currency,
			[sFlag1T]: true
		};
		var sComb1T = oFinItem.center + "|" + oFinItem.currency;
		if (oFinItem.fundSubType_ID === "ACCS_FE") {
			sFlag1T = "flagTL_1T_FE"
			oWhere1T = {
				"center": oFinItem.center,
				"currency": oFinItem.currency,
				"finServ_fincode": oFinItem.finSrv_finCode,
				[sFlag1T]: true
			};
			sComb1T = oFinItem.center + "|" + oFinItem.currency + "|" + oFinItem.finSrv_finCode;
		}
		//Realizar query
		let oQuery1T = SELECT.from(TransferAccs_001)
			.where(oWhere1T)
			.limit(1, 0);
		let aRes1T = await this.tx.run(oQuery1T);
		if (aRes1T.length > 0) {
			this.TransferAccs_001_1T = aRes1T[0];
		} else {
			throw new ErrorBA("No hay cuenta para " + sFlag1T + " en la sig. combinación: " +
				sComb1T);
		}

		var sFlagKA = "flagTL_KA";
		var oWhereKA = {
			"center": oFinItem.center,
			"currency": oFinItem.currency,
			[sFlagKA]: true
		};
		var sCombKA = oFinItem.center + "|" + oFinItem.currency;
		if (oFinItem.fundSubType_ID === "ACCS_FE") {
			sFlagKA = "flagTL_KA_FE"
			oWhereKA = {
				"center": oFinItem.center,
				"currency": oFinItem.currency,
				"finServ_fincode": oFinItem.finSrv_finCode,
				[sFlagKA]: true
			};
			sCombKA = oFinItem.center + "|" + oFinItem.currency + "|" + oFinItem.finSrv_finCode;
		}
		//Realizar query
		let oQueryKA = SELECT.from(TransferAccs_001)
			.where(oWhereKA)
			.limit(1, 0);
		let aResKA = await this.tx.run(oQueryKA);
		if (aResKA.length > 0) {
			this.TransferAccs_001_KA = aResKA[0];
		} else {
			throw new ErrorBA("No hay cuenta para " + sFlagKA + " en la sig. combinación: " +
				sCombKA);
		}

	}

	/**
	 * Genera documento KA
	 */
	async _doMMTransfer_genDocs_KA(oFinItem, oFinancedMMTransfer) {
		const _ka = CreateFinDocSet.builder()
			.hdid(this.oUnit.hdid)
			.idvehi(oFinItem.unidadID)
			.vin(oFinItem.serial)
			.account(this.TransferAccs_001_KA.sapHkont)
			.company(oFinItem.companyCode)
			.finoper("TL_KA")
			.hdtext(this.headerTxt)
			.scpuser(this.sUser)
			.scpapp(this.sAPIApp)
			.itemsSet([
				ItemsSet.builder()
				.hdid(this.oUnit.hdid)
				.assignment("")
				.vendorNo(this.ViewFinSrvCredits_001_old.sapLifnr)
				.segment(oFinItem.segment)
				.division(oFinItem.center)
				.itemtext(this.headerTxt)
				.currency(oFinItem.currency)
				.amount(oFinItem.balanceAmt)
				.build()
			])
			.retSet([])
			.build();
		try {
			let res = await CreateFinDocSet
				.requestBuilder()
				.create(_ka)
				.execute({
					destinationName: this.sDestinationName
				});
			if (res.retSet[0].type !== "S") {
				Helpers.documentFIErrorLog(res.retSet, this.oUnit.unidadID);
				this.sapError = res.retSet;
				return false;
			} else {
				let docNumbers = Helpers.getDocNumbers(res.retSet[0]);
				var oLog = Helpers.getDocLogEntity(oFinItem.unidadID, docNumbers, "", this.user, this.headerTxt,
					"MMTLKA");
				Helpers.insertLogEntries([oLog]);
				oFinancedMMTransfer.sapBELNRKA = docNumbers.belnr;
				oFinancedMMTransfer.sapBUKRSKA = docNumbers.bukrs;
				oFinancedMMTransfer.sapGJAHRKA = docNumbers.gjahr;
				oFinancedMMTransfer.sapBLARTKA = docNumbers.blart;
				docNumbers.unidadID = oFinItem.unidadID;
				this.aPPDocGens.push(docNumbers);
				return true;
			}
		} catch (err) {
			console.log(err);
			throw new ErrorBA("Error desconocido _doMMTransfer_genDocs_KA");
		}
		return false;
	}

	/**
	 * Genera documento 1T
	 */
	async _doMMTransfer_genDocs_1T(oFinItem, oFinancedMMTransfer) {
		const _1T = CreateFinDocSet.builder()
			.hdid(this.oUnit.hdid)
			.idvehi(oFinItem.unidadID)
			.vin(oFinItem.serial)
			.account(this.TransferAccs_001_1T.sapHkont)
			.company(oFinItem.companyCode)
			.finoper("TL_1T")
			.hdtext(this.headerTxt)
			.scpuser(this.sUser)
			.scpapp(this.sAPIApp)
			.itemsSet([
				ItemsSet.builder()
				.hdid(this.oUnit.hdid)
				.assignment("")
				.vendorNo(this.ViewFinSrvCredits_001_old.sapLifnr)
				.segment(oFinItem.segment)
				.division(this.oUnit.center)
				.itemtext(this.headerTxt)
				.currency(oFinItem.currency)
				.amount(oFinItem.balanceAmt)
				.build()
			])
			.retSet([])
			.build();
		try {
			let res = await CreateFinDocSet
				.requestBuilder()
				.create(_1T)
				.execute({
					destinationName: this.sDestinationName
				});
			if (res.retSet[0].type !== "S") {
				Helpers.documentFIErrorLog(res.retSet, this.oUnit.unidadID);
				this.sapError = res.retSet;
				return false;
			} else {
				let docNumbers = Helpers.getDocNumbers(res.retSet[0]);
				var oLog = Helpers.getDocLogEntity(oFinItem.unidadID, docNumbers, "", this.user, this.headerTxt,
					"MMTL1T");
				Helpers.insertLogEntries([oLog]);
				oFinancedMMTransfer.sapBELNR1T = docNumbers.belnr;
				oFinancedMMTransfer.sapBUKRS1T = docNumbers.bukrs;
				oFinancedMMTransfer.sapGJAHR1T = docNumbers.gjahr;
				oFinancedMMTransfer.sapBLART1T = docNumbers.blart;
				docNumbers.unidadID = oFinItem.unidadID;
				this.aPPDocGens.push(docNumbers);
				return true;
			}
		} catch (err) {
			console.log(err);
			throw new ErrorBA("Error desconocido _doMMTransfer_genDocs_1T");
		}
		return false;
	}

	/**
	 * Ve si por configuración está habilitado ese centro
	 */
	async _doMMTransfer_checkCfg(oFinItem) {
		//Obtener elemento a financiar:
		var oQuery = SELECT.from(MMTrans_001).where({
			"center": this.oUnit.center,
			"finServ_finCode": oFinItem.finSrv_finCode,
			"flagUpdTable": true
		});
		var oRes = await this.tx.run(oQuery);
		var res1 = oRes.length !== 0;
		var res2 = oFinItem.center !== this.oUnit.center;
		return res1 && res2;
	}

	/**
	 * Obtiene items financiados
	 */
	async _doMMTransfer_getFinItems() {
		//Obtener elemento a financiar:
		var oQuery = SELECT.from(FinancedItems_001).where({
			"unidadID": this.oUnit.unidadID,
			"status_status": "FIN"
		});
		var oRes = await this.tx.run(oQuery);
		return oRes;
	}
}