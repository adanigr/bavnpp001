const {
	FinancedItemsSecFin_001,
	FinancedItemsTransfers_001,
	FinancedInterest_001,
	FinancedItems_001,
	FinancedItemsRecal_001,
	FinancedItemCurrEx_001
} = cds.entities('BD.VN.PP.XDATA');
const {
	FIErrDocs_001,
	FIGenDocs_001
} = cds.entities('BD.VN.PP.XLOG');

module.exports = class Helpers {

	/**
	 * Obtiene el nombre del destination a utilizar
	 */
	static getDestinationName() {
		return "SCP-TO-DEVVIRTUALNEO";
	}

	/**
	 * Obtiene los últimos 8 caracteres del VIN; utilizado como referencia en docs. FI
	 * @returns {string} Referencia a 8 caracteres
	 */
	static getVinReference(VIN) {
		return VIN.substr(VIN.length - 8);
	}

	/**
	 * Obtiene la secuencia del último cambio de moneda del elemento financiado.
	 * @param {string} finItem_ID ID del elemento 
	 * @returns {integer} número de secuencia
	 */
	static async getLastSecuenceCurrEx(finItem_ID) {
		//Obtener secuencia:
		var oQuery = SELECT.from(FinancedItemCurrEx_001, [
			'secuence'
		]).where({
			"oldFinItem_ID": finItem_ID
		}).orderBy({
			secuence: "desc"
		}).limit(1, 0);
		var oRes = await cds.run(oQuery);
		if (oRes.length === 0 || oRes[0].secuence === null) {
			return 0;
		}
		return parseInt(oRes[0].secuence);
	}

	/**
	 * Obtiene la secuencia del último movimiento tipo recalendarización
	 * del elemento financiado.
	 * @param {string} finItem_ID ID del elemento 
	 * @returns {integer} número de secuencia
	 */
	static async getLastSecuenceRecal(finItem_ID) {
		//Obtener secuencia:
		var oQuery = SELECT.from(FinancedItemsRecal_001, [
			'secuence'
		]).where({
			"finItem_ID": finItem_ID
		}).orderBy({
			secuence: "desc"
		}).limit(1, 0);
		var oRes = await cds.run(oQuery);
		if (oRes.length === 0 || oRes[0].secuence === null) {
			return 0;
		}
		return parseInt(oRes[0].secuence);
	}

	/**
	 * Obtiene la secuencia del último movimiento tipo segunda financiera
	 * del elemento financiado.
	 * @param {string} unidadID ID de la unidad 
	 * @returns {integer} número de secuencia
	 */
	static async getLastSecuenceSecFin(unidadID) {
		//Obtener secuencia:
		var oQuery = SELECT.from(FinancedItemsSecFin_001, [
			'secuence'
		]).where({
			"unidadID": unidadID
		}).orderBy({
			secuence: "desc"
		}).limit(1, 0);
		var oRes = await cds.run(oQuery);
		if (oRes.length === 0 || oRes[0].secuence === null) {
			return 0;
		}
		return parseInt(oRes[0].secuence);
	}

	/**
	 * Obtiene la secuencia del último movimiento tipo traspaso financiero
	 * del elemento financiado.
	 * @param {string} unidadID ID de la unidad 
	 * @returns {integer} número de secuencia
	 */
	static async getLastSecuenceTrans(unidadID) {

		//Obtener secuencia:
		var oQuery = SELECT.from(FinancedItemsTransfers_001, [
			'secuence'
		]).where({
			"unidadID": unidadID
		}).orderBy({
			secuence: "desc"
		}).limit(1, 0);
		var oRes = await cds.run(oQuery);
		if (oRes.length === 0 || oRes[0].secuence === null) {
			return 0;
		}
		return parseInt(oRes[0].secuence);
	}

	/**
	 * Obtiene la secuencia para Financed Item
	 * @param {string} serial Número de serie del vehículo
	 * @returns {integer} número de secuencia
	 */
	static async getLastSecuenceFI(serial) {
		//Obtener secuencia:
		var oQuery = SELECT.from(FinancedItems_001, [
			'secuence'
		]).where({
			"serial": serial
		}).orderBy({
			secuence: "desc"
		}).limit(1, 0);
		var oRes = await cds.run(oQuery);
		if (oRes.length === 0 || oRes[0].secuence === null) {
			return 0;
		}
		return parseInt(oRes[0].secuence);
	}

	/**
	 * Obtiene líneas de crédito para un elemento
	 * @param {string} fundSubType_ID Subtipo de financiamiento
	 * @param {string} center Centro / División a buscar
	 * @param {finSrv_finCode} Código de financiera
	 * @retorns {object} Línea de crédito para elemento solicitado.
	 */
	static async getFinSrvs(fundSubType_ID, center, finSrv_finCode) {
		//Bandera de línea de crédito
		var sFlag = Helpers.getSrvCredFlag(fundSubType_ID);
		const {
			ViewFinSrvCredits_001
		} = cds.entities('BD.VN.PP.XVIEW');
		//Realizar query
		let oQueryRateType = SELECT.from(ViewFinSrvCredits_001)
			.where({
				"sapVKORG": center,
				"finServ_finCode": finSrv_finCode,
				[sFlag]: true
			})
			.limit(1, 0);
		let aRes = await cds.run(oQueryRateType);
		if (aRes.length > 0) {
			return aRes[0];
		} else {
			throw "No se ha encontrado FinSrv";
		}
	}

	/**
	 * Vacía log de errores de S/4 en tabla de errores SCP
	 * @param {Array} retSet tabla de retorno S/4
	 * @param {string} ID  Identificador elemento relacionado
	 */
	static documentFIErrorLog(retSet, ID) {
		//Vaciar log
		var aLog = retSet.map(function (row) {
			return {
				docLog: ID,
				idvehi: row.idvehi,
				type: row.type,
				idsap: row.id,
				number: row.number,
				message: row.message,
				logNo: row.logNo,
				logMsgNo: row.logMsgNo,
				messageV1: row.messageV1,
				messageV2: row.messageV2,
				messageV3: row.messageV3,
				messageV4: row.messageV4,
				parameter: row.parameter,
				row: row.row.toString(),
				field: row.field,
				system: row.system
			}
		}, this);

		//Insertar secuencia:
		var oQuery2 =
			INSERT.into(FIErrDocs_001).entries(aLog);
		try {
			cds.run(oQuery2);
		} catch (ex) {
			throw ex;
		}
	}

	/**
	 * Inserta documento de anulación para documento FI anulado
	 * @param {string} BELNR Número de documento a anular
	 * @param {string} BUKRS Sociedad
	 * @param {string} GJAHR Ejercicio
	 * @param {string} STBLG Documento de anulación
	 */
	static updateLogSTBLG(BELNR, BUKRS, GJAHR, STBLG) {
		//Insertar secuencia:
		var oQuery =
			UPDATE(FIGenDocs_001).set({
				STBLG: STBLG
			}).where({
				"BELNR": BELNR,
				"BUKRS": BUKRS,
				"GJAHR": GJAHR
			});
		try {
			cds.run(oQuery);
		} catch (ex) {
			console.log("updateLogSTBLG", ex);
			throw ex;
		}
	}

	/**
	 * Inserta documentos FI generados a registro
	 * @param {Array} aEntries Registros a insertar
	 */
	static insertLogEntries(aEntries) {
		//Insertar secuencia:
		var oQuery =
			INSERT.into(FIGenDocs_001).entries(aEntries);
		try {
			cds.run(oQuery);
		} catch (ex) {
			console.log("ENTRIES", ex);
			throw ex;
		}
	}

	/**
	 * Genera entidad de registro a partir de un documento generado en S/4
	 * @param {string} unidadID ID de la unidad a la que corresponde el doc
	 * @param {DocNumber} docNumbers entidad con información del doc. generado
	 * @param {string} stblg documento de anulación generado
	 * @param {string} user ID de usuario para log
	 * @param {string} text Descripción del documento
	 * @param {string} process Proceso al que pertenece el documento
	 * @param {string} hdid ID del proceso, para caso de reproceso retomar
	 */
	static getDocLogEntity(unidadID, docNumbers, stblg, user, text, process, hdid = null) {
			return {
				unidadID: unidadID,
				hdId: hdid,
				BELNR: docNumbers.belnr,
				BUKRS: docNumbers.bukrs,
				GJAHR: docNumbers.gjahr,
				BLART: docNumbers.blart,
				STBLG: stblg,
				logUser: user,
				logText: text,
				logProc: process
			}
		}
		// BOM DSN ID:0001{
	static getDataInvoice(unidadID, serial, companyCode, center, sapBELNRRE, sapLIFNRRE, secuence, currency) {
		return {
			unidadID: unidadID,
			companyCode: companyCode,
			center: center,
			sapBELNRRE: sapBELNRRE,
			secuence: secuence,
			serial: serial,
			sapLIFNRRE: sapLIFNRRE,
			currency: currency
		}
	}

	// }EOM DSN ID:0001

	/**
	 * Convierte una fila de retSet en un objeto con solo los documentos generados
	 * @param {object} retSetRow fila de tabla Ret Set (BAPIRET2 en S/4)
	 * @returns {DocNumber} Objeto con info del documento
	 */
	static getDocNumbers(retSetRow) {
		return {
			belnr: retSetRow.messageV2.substring(0, 10),
			bukrs: retSetRow.messageV2.substring(10, 14),
			gjahr: retSetRow.messageV2.substring(14, 18),
			blart: retSetRow.messageV4
		}
	}

	/**
	 * Obtiene flag necesario para buscar la línea de crédito.
	 * @param {string} fundSubType_ID Subtipo de financiamiento a buscar
	 * @returns {string} Flag para buscar [flagNew,flagUsed,flagCession...]
	 */
	static getSrvCredFlag(fundSubType_ID) {
		let sText = "flagNew";
		switch (fundSubType_ID) {
		case "UN_VN":
			sText = "flagNew";
			break;
		case "UN_VU":
			sText = "flagUsed";
			break;
		case "UN_VC":
			sText = "flagCession";
			break;
		case "UN_VD":
			sText = "flagDemo";
			break;
		case "ACCS_1":
			sText = "flagAccesory";
			break;
		case "ACCS_FE":
			sText = "flagAccesory";
			break;
		}
		return sText;
	}
}