'use strict';
const moment = require('moment-timezone');
const Helpers = require('./Helpers.js');
const ErrorBA = require('./ErrorBA.js');
const FinancedItemInterestDocGen = require('./FinancedItemInterestDocGen.js');
const {
	LayoutHeader_001,
	LayoutUnits_001
} = cds.entities('BD.VN.PP.XDATA');
const {
	CodPro_001
} = cds.entities('BD.VN.PP.XCFG');
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
const XLSX = require('xlsx');
module.exports = class LayoutManager {
	constructor(sGenMark, sUser) {
		this.BMXTerceros = "TercerosBanamex";
		this.sSplitChar = "|*|";
		this.sGenMark = sGenMark;
		this.sUser = sUser;
		this.BanknBBVA = "012";
		this.BanknBMX = "002";
		this.sBBVATra = "Traspaso Financiero: BBVA CIE";
		this.sBMXTra = "Traspaso Financiero: CitiBanamex Terceros";
		this.sBBVAPay = "Pago Unidad: BBVA CIE";
		this.sBMXPay = "Pago Unidad: CitiBanamex Terceros";
	}

	/**
	 * Anula el layout generado a partir de un ID relacionado
	 * @param {string} sUUID ID elemento para anular
	 */
	static async anulateRelItem(sUUID) {
		var oQueryIn = SELECT.from(LayoutUnits_001, ["ID", "relatedID", "layoutHead_ID"]).where({
			relatedID: sUUID
		});
		var oResIn = await cds.run(oQueryIn);
		if (oResIn.length === 0) {
			return true;
		}
		var aID = [];
		oResIn.forEach(x => {
			if (aID.indexOf(x.layoutHead_ID) === -1) {
				aID.push("'" + x.layoutHead_ID + "'");
			}
		});
		var sQueryWhere = "ID IN(" + aID.join() + ") ";
		var oQueryWhere = cds.parse.expr(sQueryWhere);
		var oQuery = UPDATE(LayoutHeader_001).set({
			flagDel: true
		}).where(oQueryWhere);
		var oRes = await cds.run(oQuery);
		return oRes.length !== 0;
	}

	/**
	 * Obtiene los layouts de pagos
	 * @param {Array} aFinancedItemsPayments arreglo con pagos
	 * 
	 */
	async getPaymentsLayouts(aFinancedItemsPayments) {
		try {
			this.aLayoutGroups = [];
			this.aPayments = aFinancedItemsPayments;
			await this._getPaymentsLayoutsGroups();
			await this._getLayoutsData();
			await this._getLayoutsSave();
		} catch (ex) {
			console.log("LayoutManager", ex);
		}
	}

	/**
	 * Agrupa la información de los layouts utilizando como común denominador
	 * el ID de la unidad
	 */
	async _getPaymentsLayoutsGroups() {
		var aUnidadID = [];
		for (var oPaymentHelper of this.aPayments) {
			let oPayment = oPaymentHelper.getPayment();
			let oFinItem = oPaymentHelper.getFinItem();
			let oFinSrv = oPaymentHelper.getFinSrv();
			let bSave = true;
			var oLayoutHeader = {
				ID: uuid(),
				genMark: this.sGenMark,
				downCount: 0,
				genUser: this.sUser,
				lines: [],
				units: []
			};
			oLayoutHeader.companyCode = oFinItem.companyCode;
			oLayoutHeader.center = oFinItem.center;
			//Obtener tipo de layout a generar:
			oLayoutHeader.title = await this._getPaymentTitle(oPayment);
			if (oLayoutHeader.title === "") {
				continue;
			}
			if (aUnidadID.find(x => x === oPayment.unidadID) !== undefined) {
				continue;
			}
			//Ver si ya se generó un layout de ese tipo:
			var oCoincidence = this.aLayoutGroups.find(x =>
				x.companyCode === oLayoutHeader.companyCode && x.center === oLayoutHeader.center && x.title === oLayoutHeader.title);
			if (oCoincidence !== undefined) {
				oLayoutHeader = oCoincidence;
				bSave = false;
			}
			aUnidadID.push(oPayment.unidadID);
			oLayoutHeader.units.push({
				//ID: uuid(),
				layoutHead_ID: oLayoutHeader.ID,
				unidadID: oPayment.unidadID,
				relatedID: oPayment.ID
			});
			//Generar línea:
			oLayoutHeader.lines.push(await this._getPaymentLine(oPayment, oFinItem, oFinSrv, oLayoutHeader.title));
			//Agregar Unidad a lista de procesados
			//Guardar datos si es nuevo registro:
			if (bSave) {
				this.aLayoutGroups.push(oLayoutHeader);
			}
		}
	}

	/**
	 * Obtiene título del layout
	 * @param {object} oPayment Entidad del pago
	 * @returns {string} Título del layout
	 */
	async _getPaymentTitle(oPayment) {
		var aCtaOrg = oPayment.fromAcc.split(this.sSplitChar);
		if (aCtaOrg[1] === this.BanknBBVA && (parseInt(aCtaOrg[4]) > 0)) {
			return this.sBBVAPay;
		}
		if (aCtaOrg[1] === this.BanknBMX && (parseInt(aCtaOrg[4]) > 0)) {
			return this.sBMXPay;
		}
		return "";
	}

	/**
	 * Suma los importes de los pagos para la unidad actual
	 * @param {object} oPayment Entidad Pago
	 * @param {object} oFinItem Entidad elemento financiado
	 * @param {object} oFinSrv Entidad Financiamiento
	 * @param {string} sTitle Título del layout
	 * @returns {Array} Línea de layout
	 */
	async _getPaymentLine(oPayment, oFinItem, oFinSrv, sTitle) {
		//Obtener suma importes pagados:
		var fPayedAmt = 0;
		this.aPayments
			.filter(x => x.oPayment.unidadID === oPayment.unidadID)
			.forEach(function (x) {
				fPayedAmt += x.oPayment.payedAmt;
			});
		//Calcular datos para la línea
		switch (sTitle) {
		case this.sBBVAPay:
			return await this._getPaymentLine_BBVACIE(oPayment, oFinItem, oFinSrv, fPayedAmt);
			break;
		case this.sBMXPay:
			return await this._getPaymentLine_BMXTerc(oPayment, oFinItem, oFinSrv, fPayedAmt);
			break;
		}
		throw new ErrorBA("Verifique layout");
	}

	/**
	 * Obtiene la línea de pago para layout BBVA CIE
	 * @param {object} oPayment Entidad Pago
	 * @param {object} oFinItem Entidad elemento financiado
	 * @param {object} oFinSrv Entidad Financiamiento
	 * @param {float} fPayedAmt cantidad pagada
	 * @returns {Array} Línea de layout
	 */
	async _getPaymentLine_BBVACIE(oPayment, oFinItem, oFinSrv, fPayedAmt) {
		var sCurrency = (oFinItem.currency === "MXN") ? "MXP" : "USD";
		var sDatosOrg = oPayment.fromAcc.split(this.sSplitChar);
		var sDatosDest = oPayment.destAcc.split(this.sSplitChar);
		var sCodPro = await this._getGetCodPro(oFinItem.finSrv_finCode, oFinItem, oFinSrv, this.BanknBBVA);
		var sCIE = sDatosDest[2].padStart(7, "0");
		var sVin5 = oFinItem.serial.substr(-5);
		var sVin8 = oFinItem.serial.substr(-8);
		var sRef = sCodPro + sVin5;
		var sBPNum = oFinSrv.sapLifnr.padStart(10, "0");
		var sRefVin1 = sVin8.padEnd(20);
		var sCtaOrg = sDatosOrg[0].padStart(18, "0");
		var sAmount = Number(fPayedAmt).toFixed(2).padStart(16, "0");
		var sRef1 = sRef.padEnd(30);
		var sRef2 = sRef.padEnd(20);
		return sBPNum + sRefVin1 + sCIE + sCtaOrg + sAmount + sRef1 + sRef2;
	}

	/**
	 * Obtiene la línea de pago para layout BBVA CIE
	 * @param {object} oPayment Entidad Pago
	 * @param {object} oFinItem Entidad elemento financiado
	 * @param {object} oFinSrv Entidad Financiamiento
	 * @param {float} fPayedAmt cantidad pagada
	 * @returns {Array} Línea de layout
	 */
	async _getPaymentLine_BMXTerc(oPayment, oFinItem, oFinSrv, fPayedAmt) {
		var sAmount = Number(fPayedAmt).toFixed(2);
		var sDatosOrg = oPayment.fromAcc.split(this.sSplitChar);
		var sDatosDest = oPayment.destAcc.split(this.sSplitChar);
		var sVin5 = oFinItem.serial.substr(-5);
		var sOrgSuc = sDatosOrg[2];
		var sOrgCta = sDatosOrg[0];
		var sOrigen = sOrgSuc + "/" + sOrgCta;
		var sDesSuc = sDatosDest[3];
		var sDesCta = sDatosDest[0];
		var sBeneficiario = sDatosDest[1];
		var sDestino = sDesSuc + "/" + sDesCta;
		var sCodPro = await this._getGetCodPro(oFinItem.finSrv_finCode, oFinItem, oFinSrv, this.BanknBMX);
		var sRef = sCodPro + sVin5;
		return [this.BMXTerceros, sOrigen, sDestino, sBeneficiario, sAmount, sRef, sRef];
	}

	/**
	 * Obtiene layouts para traspasos
	 * @param {Array} aFinancedItemsPayments arreglo con traspasos
	 */
	async getTransferLayouts(aFinancedItemsTransfers) {
		try {
			this.aLayoutGroups = [];
			this.aTransfers = aFinancedItemsTransfers;
			await this._getTransferLayoutsGroups();
			await this._getLayoutsData();
			await this._getLayoutsSave();
		} catch (ex) {
			console.log("LayoutManager", ex);
		}
	}

	/**
	 * Agrupa la información de los layouts utilizando como común denominador
	 * el ID de la unidad
	 */
	async _getTransferLayoutsGroups() {
		var aUnidadID = [];
		for (var oTransferHelper of this.aTransfers) {
			let oTransfer = oTransferHelper.getTransfer();
			let oFinItem = oTransferHelper.getFinItem();
			let oFinSrv = oTransferHelper.getFinSrv();
			let bSave = true;
			var oLayoutHeader = {
				ID: uuid(),
				genMark: this.sGenMark,
				downCount: 0,
				genUser: this.sUser,
				lines: [],
				units: []
			};
			oLayoutHeader.companyCode = oFinItem.companyCode;
			oLayoutHeader.center = oFinItem.center;
			//Obtener tipo de layout a generar:
			oLayoutHeader.title = await this._getTransferTitle(oTransfer);
			if (oLayoutHeader.title === "") {
				continue;
			}
			if (aUnidadID.find(x => x === oTransfer.unidadID) !== undefined) {
				continue;
			}
			//Ver si ya se generó un layout de ese tipo:
			var oCoincidence = this.aLayoutGroups.find(x =>
				x.companyCode === oLayoutHeader.companyCode && x.center === oLayoutHeader.center && x.title === oLayoutHeader.title);
			if (oCoincidence !== undefined) {
				oLayoutHeader = oCoincidence;
				bSave = false;
			}
			aUnidadID.push(oTransfer.unidadID);
			oLayoutHeader.units.push({
				//ID: uuid(),
				layoutHead_ID: oLayoutHeader.ID,
				unidadID: oTransfer.unidadID,
				relatedID: oTransfer.ID
			});
			//Generar línea:
			oLayoutHeader.lines.push(await this._getTransferLine(oTransfer, oFinItem, oFinSrv, oLayoutHeader.title));
			//Agregar Unidad a lista de procesados
			//Guardar datos si es nuevo registro:
			if (bSave) {
				this.aLayoutGroups.push(oLayoutHeader);
			}
		}
	}

	/**
	 * Obtiene título del layout
	 * @param {object} oPayment Entidad del pago
	 * @returns {string} Título del layout
	 */
	async _getTransferTitle(oTransfer) {
		if (Boolean(oTransfer.flagTR_L_BBVA_I) && Boolean(oTransfer.flagTR_L_BBVA_E)) {
			return this.sBBVATra;
		}
		if (Boolean(oTransfer.flagTR_L_BMX_I) && Boolean(oTransfer.flagTR_L_BMX_E)) {
			return this.sBMXTra;
		}
		return "";
	}

	/**
	 * Obtiene la línea de traspaso para layouts
	 * @param {object} oPayment Entidad Pago
	 * @param {object} oFinItem Entidad elemento financiado
	 * @param {object} oFinSrv Entidad Financiamiento
	 * @param {string} sTitle Título del layout
	 * @returns {Array} Línea de layout
	 */
	async _getTransferLine(oTransfer, oFinItem, oFinSrv, sTitle) {
		//Obtener suma importes financiados:
		var fFinancedAmt = 0;
		this.aTransfers
			.filter(x => x.oTransfer.unidadID === oTransfer.unidadID)
			.forEach(function (x) {
				fFinancedAmt += x.oTransfer.financedAmt;
			});
		//Calcular datos para la línea
		switch (sTitle) {
		case this.sBBVATra:
			return await this._getTransferLine_BBVACIE(oTransfer, oFinItem, oFinSrv, fFinancedAmt);
			break;
		case this.sBMXTra:
			return await this._getTransferLine_BMXTerc(oTransfer, oFinItem, oFinSrv, fFinancedAmt);
			break;
		}
		throw new ErrorBA("Verifique layout");
	}

	/**
	 * Obtiene la línea de pago para layout BBVA CIE
	 * @param {object} oPayment Entidad Pago
	 * @param {object} oFinItem Entidad elemento financiado
	 * @param {object} oFinSrv Entidad Financiamiento
	 * @param {float} fFinancedAmt Importe traspaso
	 * @returns {Array} Línea de layout
	 */
	async _getTransferLine_BBVACIE(oTransfer, oFinItem, oFinSrv, fFinancedAmt) {
		var sCurrency = (oFinItem.currency === "MXN") ? "MXP" : "USD";
		var sDatosOrg = decodeURI(oTransfer.flagTR_L_CtaOrg).split(this.sSplitChar);
		var sDatosDest = decodeURI(oTransfer.flagTR_L_CtaDest).split(this.sSplitChar);
		var sCodPro = await this._getGetCodPro(oTransfer.oldFinCode, oFinItem, oFinSrv, this.BanknBBVA);
		var sCIE = sDatosDest[2].padStart(7, "0");
		var sVin5 = oFinItem.serial.substr(-5);
		var sVin8 = oFinItem.serial.substr(-8);
		var sRef = sCodPro + sVin5;
		var sBPNum = oFinSrv.sapLifnr.padStart(10, "0");
		var sRefVin1 = sVin8.padEnd(20);
		var sCtaOrg = sDatosOrg[0].padStart(18, "0");
		var sAmount = Number(fFinancedAmt).toFixed(2).padStart(16, "0");
		var sRef1 = sRef.padEnd(30);
		var sRef2 = sRef.padEnd(20);
		return sBPNum + sRefVin1 + sCIE + sCtaOrg + sAmount + sRef1 + sRef2;
	}

	/**
	 * Obtiene la línea de pago para layout Banamex Terceros
	 * @param {object} oPayment Entidad Pago
	 * @param {object} oFinItem Entidad elemento financiado
	 * @param {object} oFinSrv Entidad Financiamiento
	 * @param {float} fFinancedAmt Importe traspaso
	 * @returns {Array} Línea de layout
	 */
	async _getTransferLine_BMXTerc(oTransfer, oFinItem, oFinSrv, fFinancedAmt) {
		var sAmount = Number(fFinancedAmt).toFixed(2);
		var sDatosOrg = decodeURI(oTransfer.flagTR_L_CtaOrg).split(this.sSplitChar);
		var sDatosDest = decodeURI(oTransfer.flagTR_L_CtaDest).split(this.sSplitChar);
		var sVin5 = oFinItem.serial.substr(-5);
		var sOrgSuc = sDatosOrg[2];
		var sOrgCta = sDatosOrg[3];
		var sOrigen = sOrgSuc + "/" + sOrgCta;
		var sDesSuc = sDatosDest[3];
		var sDesCta = sDatosDest[0];
		var sBeneficiario = sDatosDest[1];
		var sDestino = sDesSuc + "/" + sDesCta;
		var sCodPro = await this._getGetCodPro(oTransfer.oldFinCode, oFinItem, oFinSrv, this.BanknBMX);
		var sRef = sCodPro + sVin5;
		return [this.BMXTerceros, sOrigen, sDestino, sBeneficiario, sAmount, sRef, sRef];
	}

	/**
	 * Obtiene el código proveedor para el layout
	 * @param {sFinCode} oPayment Entidad Pago
	 * @param {object} oFinItem Entidad elemento financiado
	 * @param {object} oFinSrv Entidad Financiamiento
	 * @param {string} sBANKL Banco
	 * @returns {string} Código proveedor
	 */
	async _getGetCodPro(sFinCode, oFinItem, oFinSrv, sBANKL) {
		var oQuery = SELECT.from(CodPro_001).where({
			sapVKORG: oFinItem.center,
			sapBANKL: sBANKL,
			finSrv_finCode: sFinCode
		});
		var res = await cds.run(oQuery);
		if (res.length === 0) {
			throw new ErrorBA("Verifique CodPro_001: " +
				oFinItem.center + "|" + sBANKL + "|" + sFinCode);
		}
		return res[0].codPro;
	}

	/**
	 * Obtiene información de los layouts de acuerdo al título
	 */
	async _getLayoutsData() {
		var aPromise = [];
		for (var oLayout of this.aLayoutGroups) {
			switch (oLayout.title) {
			case this.sBBVATra:
				aPromise.push(this._getDataBBVA(oLayout, "Traspaso"));
				break;
			case this.sBMXTra:
				aPromise.push(this._getDataBMX(oLayout, "Traspaso"));
				break;
			case this.sBBVAPay:
				aPromise.push(this._getDataBBVA(oLayout, "Pago"));
				break;
			case this.sBMXPay:
				aPromise.push(this._getDataBMX(oLayout, "Pago"));
				break;
			}
		}
		await Promise.all(aPromise);
	}

	/**
	 * Genera documento BBVA CIE
	 */
	async _getDataBBVA(oLayout, sName) {
			var sLayout = "";
			for (var oLine of oLayout.lines) {
				sLayout = sLayout + oLine + "\n";
			}
			oLayout.file = Buffer.from(sLayout, 'utf8').toString("base64");;
			oLayout.fileName = "BBVC_" + moment().format("YYYYMMDDHHmmss") + "_" + sName + "_" + oLayout.center;
			oLayout.fileMime = "text/plain";
			oLayout.fileExt = "txt";
			oLayout.fileCharset = "utf-8";
			delete oLayout.lines;
		}
		/**
		 * Genera documento BANAMEX TERCEROS
		 */
	async _getDataBMX(oLayout, sName) {
		var oWb = XLSX.utils.book_new();
		var sWsName = "BANAMEX";
		var aWsData = [
			["TipoPago", "CuentaOrigen", "CuentaDestino", "Beneficiario", "Importe", "RefNum", "RefAlfn"],
			...oLayout.lines
		];
		var oWs = XLSX.utils.aoa_to_sheet(aWsData);
		XLSX.utils.book_append_sheet(oWb, oWs, sWsName);
		var oWbBin = XLSX.write(oWb, {
			bookType: 'biff8',
			type: 'base64'
		});
		oLayout.file = oWbBin
		oLayout.fileName = "BMX_" + moment().format("YYYYMMDDHHmmss") + "_" + sName + "_" + oLayout.center;
		oLayout.fileMime = "application/vnd.ms-excel";
		oLayout.fileExt = "xls";
		oLayout.fileCharset = "Windows-1252";
		delete oLayout.lines;
	}

	/**
	 * Guarda entidad en la base de datos
	 */
	async _getLayoutsSave() {
		var aUnits = [];
		var aHeaders = this.aLayoutGroups.map(x => {
			aUnits = [...aUnits, ...x.units];
			return {
				ID: x.ID,
				companyCode: x.companyCode,
				center: x.center,
				title: x.title,
				genMark: x.genMark,
				downCount: x.downCount,
				genUser: x.genUser,
				flagDel: false,
				file: x.file,
				fileName: x.fileName,
				fileMime: x.fileMime,
				fileExt: x.fileExt,
				fileCharset: x.fileCharset
			}
		});
		var oQuery_header = INSERT.into(LayoutHeader_001).entries(aHeaders);
		var oQuery_units = INSERT.into(LayoutUnits_001).entries(aUnits);
		var res1 = await cds.run(oQuery_header);
		var res2 = await cds.run(oQuery_units);
	}

}