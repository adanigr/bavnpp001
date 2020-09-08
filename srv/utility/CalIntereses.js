'use strict';
const moment = require('moment-timezone');
const TablaInteres = require('./types/TablaInteres.js');
const Helpers = require('./Helpers.js');
const BigNumber = require('bignumber.js');
module.exports = class CalIntereses {
	/**
	 *  Constructor para cláse de cálculo de intereses
	 * @param {Object} oFinancedItem Objeto a calcular intereses
	 */
	constructor(oFinancedItem) {
		this._oFinancedItem = oFinancedItem;
		this.oInterestTable = [];
		moment.tz.setDefault("America/Mexico_City");
		BigNumber.set({
			DECIMAL_PLACES: 20
		});
	}

	/**
	 * Obtiene los valores tipados
	 */
	getValue() {
		//Redondear valores
		this._oFinancedItem.intMonthSum = Number(this._oFinancedItem.intMonthSum).toFixed(2);
		this._oFinancedItem.intMonthSum = Number(this._oFinancedItem.intMonthSum);
		this._oFinancedItem.intAllSum = Number(this._oFinancedItem.intAllSum).toFixed(2);
		this._oFinancedItem.intAllSum = Number(this._oFinancedItem.intAllSum);
		return this._oFinancedItem;
	}

	/**
	 * Obtiene la tabla de intereses
	 */
	getInterestTable() {
		return this.oInterestTable;
	}

	/**
	 * Obtiene el número de recalendarizaciones para un elemento financiado
	 */
	async _getRecal() {
		const {
			FinancedItemsRecal_001
		} = cds.entities('BD.VN.PP.XDATA');
		//Realizar query
		var oQueryRateType = SELECT.from(FinancedItemsRecal_001, ["ID"])
			.where({
				flagReverse: false,
				finItem_ID: this._oFinancedItem.ID
			});
		var res = await cds.run(oQueryRateType);
		this._oFinancedItem.recalNum = res.length;
	}

	/**
	 * Obtiene los intereses de acuerdo a una fecha de entrada.
	 * @param {Date} oDateCalculate Fecha fin cálculo intereses
	 * @param {Boolean} bUpdate Indicador de si actualizar al finalizar consulta
	 */
	async getInterests(oDateCalculate = moment(), updInterest = false) {
		try {
			this._oDateCalculate = moment(oDateCalculate);
			var aPromise = [];
			aPromise.push(this._getInterest_FinType());
			aPromise.push(this._getRecal());
			var oPromiseRes = await Promise.all(aPromise);
			this.sFinType = oPromiseRes[0];
			await this._getInterests_wrap();
			if (updInterest) {
				this.updateInterests();
			}
		} catch (ex) {
			console.log("ERROR CALCULO INTERESES", this._oFinancedItem.ID, ex);
		}
		return this.getValue();
	}

	/**
	 * Ejecuta intereses de acuerdo a tipo financiera
	 */
	async _getInterests_wrap() {
		switch (this.sFinType) {
		case 'BBVA':
			await this._getInterest_BBVA(this._oDateCalculate);
			this._oFinancedItem.displayDay = false;
			break;
		case 'DAIMLER':
			await this._getInterest_DAIMLER(this._oDateCalculate);
			this._oFinancedItem.displayDay = false;
			break;
		case 'SCOTIA':
			await this._getInterest_SCOTIABANK_1(this._oDateCalculate);
			this._oFinancedItem.displayDay = true;
			break;
		case 'CORP':
			await this._getInterest_CORP_1(this._oDateCalculate);
			this._oFinancedItem.displayDay = true;
			break;
		case 'CITI_CAP':
			await this._getInterest_CITI_CAP(this._oDateCalculate);
			this._oFinancedItem.displayDay = true;
			break;
		case 'SANT_CAP':
			await this._getInterest_SANT_CAP(this._oDateCalculate);
			this._oFinancedItem.displayDay = true;
			break;
		default:
			break;
		}
		if (this._oFinancedItem.intMonthSum < 0) {
			this._oFinancedItem.intMonthSum = 0;
			this._oFinancedItem.intAllSum = 0;
		}
		this._prepareInterestTable();
	}

	/**
	 * Realiza ajustes para tabla de amortización en caso de ser calculado diario
	 */
	_prepareInterestTable() {
		for (var oItem of this.oInterestTable) {
			if (oItem.bPayFlag) {
				//Dividir intereses de un pago x días
				switch (this.sFinType) {
				case "SCOTIA":
				case "CORP":
					var oNumDias = Math.abs(moment(oItem.dDateStart).diff(moment(oItem.dDateEnd), "days"));
					var iValOrg = oItem.fIntSum;
					oItem.fIntSum = oItem.fIntSum / oNumDias;
					if (moment(oItem.dDatePay).add(-1, "days").isSame(oItem.dDateRate, "day")) {
						oItem.fBalanceAmt -= fAmtPay;
					} else {
						delete oItem.fAmtPay;
					}
					break;
				}
			}
		}
	}

	/**
	 * Actualiza los valores de los intereses obtenidos
	 */
	async updateInterests() {
		if (this._oFinancedItem.status_status !== "FIN") {
			return;
		}
		const {
			FinancedItems_001
		} = cds.entities('BD.VN.PP.XDATA');
		let oUpdate = UPDATE(FinancedItems_001).set({
			rateValue: this._oFinancedItem.rateValue,
			diffPerc: this._oFinancedItem.diffPerc,
			intAllDay: this._oFinancedItem.intAllDay,
			intAllSum: this._oFinancedItem.intAllSum,
			intMonthDay: this._oFinancedItem.intMonthDay,
			intMonthSum: this._oFinancedItem.intMonthSum,
			displayDay: this._oFinancedItem.displayDay
		}).where({
			"ID": this._oFinancedItem.ID
		});
		cds.run(oUpdate);
	}

	/**
	 * Obtiene el tipo de financiera determinado
	 */
	async _getInterest_FinType() {
		const {
			FinSrvs_001
		} = cds.entities('BD.VN.PP.XMD');
		//Realizar query
		let oQueryRateType = SELECT.from(FinSrvs_001, ["finType_finType"])
			.where({
				"finCode": this._oFinancedItem.finSrv_finCode
			})
			.limit(1, 0);
		let aRes = await cds.run(oQueryRateType);
		return aRes[0].finType_finType;
	}

	/**
	 * Realiza cálculo de intereses de un tipo de financiamiento CitiBanamex CAPITAL.
	 * @param {Date} oDateCalculate Fecha fin cálculo intereses
	 */
	async _getInterest_CITI_CAP(oDateCalculate) {
		var aPromiseUno = [];
		//Porcentaje  dif y fechas
		aPromiseUno.push(this._getInterest_getDates());
		aPromiseUno.push(this._getInterest_PorDiff());
		var oPromiseUno = await Promise.all(aPromiseUno);
		//Fecha hasta donde se van a calcular los intereses
		let aTableInterestsDates = oPromiseUno[0];

		//Inicializar intereses
		this._oFinancedItem.intMonthDay = 0;
		this._oFinancedItem.intMonthSum = 0;
		this._oFinancedItem.intAllSum = 0;
		this._oFinancedItem.intAllDay = 0;

		//Calculo intereses para CITI CAPITAL:
		for (const itemPago of aTableInterestsDates) {
			let oDateWhile = moment(itemPago.dDateStart).startOf('month');
			if (oDateWhile > itemPago.dDateEnd) {
				throw "Fecha inicio inválida";
			}
			while (oDateWhile <= itemPago.dDateEnd) {
				//Obtiene la tasa (TIEE/LIBOR) / Número de días / Fecha tasa
				let oRateVal = await this._getInterest_CITI_CAP_RateVal(oDateWhile, itemPago);
				//Generar cálculos
				let fAcumulador = this._oFinancedItem.diffPerc; //1.6
				fAcumulador = fAcumulador / 100; //0.016
				fAcumulador = fAcumulador + (this._oFinancedItem.rateValue / 100); //0.016 + 0.087
				fAcumulador = fAcumulador / 360; //0.002861
				fAcumulador = fAcumulador * itemPago.fBalanceAmt;
				fAcumulador = fAcumulador * oRateVal.iNumDias;
				this._oFinancedItem.intAllSum += fAcumulador;
				this._oFinancedItem.intAllDay += oRateVal.iNumDias;
				//bPayFlag, dDateStart, dDateEnd, fBalance, iYear, iPeriod, fRateValue, iIntDays, fIntSum
				let oInteres = new TablaInteres(
					itemPago.bPayFlag,
					itemPago.dDateStart, itemPago.dDateEnd, oRateVal.dDateRate,
					itemPago.fBalanceAmt,
					oDateWhile.format("YYYY"), oDateWhile.format("MM"), oDateWhile.format("DD"),
					this._oFinancedItem.rateValue,
					oRateVal.iNumDias, fAcumulador, itemPago.fIntPay, itemPago.fAmtPay);
				//Agregar tabla Int.
				this.addInterestTable(oInteres, oDateCalculate, itemPago.dDatePay, oDateWhile);
				//Avanzar oDateWhile
				oDateWhile.add(1, 'months');
			}
		}
		return;
	}

	/**
	 * Realiza cálculo de intereses de un tipo de financiamiento SANTANDER CAPITAL.
	 * @param {Date} oDateCalculate Fecha fin cálculo intereses
	 */
	async _getInterest_SANT_CAP(oDateCalculate) {
		var aPromiseUno = [];
		//Porcentaje  dif y fechas
		aPromiseUno.push(this._getInterest_getDates());
		aPromiseUno.push(this._getInterest_PorDiff());
		var oPromiseUno = await Promise.all(aPromiseUno);
		//Fecha hasta donde se van a calcular los intereses
		let aTableInterestsDates = oPromiseUno[0];
		//Inicializar intereses
		this._oFinancedItem.intMonthDay = 0;
		this._oFinancedItem.intMonthSum = 0;
		this._oFinancedItem.intAllSum = 0;
		this._oFinancedItem.intAllDay = 0;
		//Calculo intereses para SANTANDER CAPITAL:
		for (const itemPago of aTableInterestsDates) {
			//Fecha Inicio y fin
			let oDateStart = moment(itemPago.dDateStart);
			let oDateEnd_1 = moment(itemPago.dDateEnd);
			let iNumDias = 0;
			if (moment(oDateStart).isSame(moment(), 'day')) {
				oDateEnd_1.add(1, 'days');
			}
			//2.1) Obtener columnas Dias Intereses:
			iNumDias = oDateEnd_1.diff(oDateStart, 'days');
			let oDateEnd_2 = moment(itemPago.dDateEnd);
			if (iNumDias >= 2) {
				oDateEnd_2.subtract(1, 'days');
			}
			let iDiasInteres = 1;
			//Obtener valor de tasas
			let aTasas = await this._getInterest_SANT_CAP_RateVal(this._oFinancedItem.rateType_rate, oDateStart, oDateEnd_2);
			for (const oTasa of aTasas) {
				let fAcumulador = this._oFinancedItem.diffPerc / 100;
				let fRate = Number(oTasa.rateValue) / 100; //7.1
				fAcumulador = fAcumulador + fRate;
				fAcumulador = fAcumulador * (itemPago.fBalanceAmt / 360);
				this._oFinancedItem.rateValue = Number(oTasa.rateValue);
				fAcumulador = Number(fAcumulador);
				if (!isNaN(fAcumulador) && fAcumulador !== 0) {
					this._oFinancedItem.intAllSum += fAcumulador;
					this._oFinancedItem.intAllDay++;
				}
				let oInteres = new TablaInteres(itemPago.bPayFlag,
					itemPago.dDateStart, itemPago.dDateEnd, oTasa.date,
					itemPago.fBalanceAmt,
					oTasa.date.format("YYYY"), oTasa.date.format("MM"), oTasa.date.format("DD"),
					this._oFinancedItem.rateValue, 1, fAcumulador,
					itemPago.fIntPay, itemPago.fAmtPay);
				//Agregar tabla Int.
				this.addInterestTable(oInteres, oDateCalculate, itemPago.dDatePay, oTasa.date);
			}
		}
	}

	/**
	 * Realiza cálculo de intereses de un tipo de financiamiento Corporación Zapata.
	 * @param {Date} oDateCalculate Fecha fin cálculo intereses
	 */
	async _getInterest_CORP_1(oDateCalculate) {
		var aPromiseUno = [];
		//Porcentaje  dif y fechas
		aPromiseUno.push(this._getInterest_getDates());
		aPromiseUno.push(this._getInterest_PorDiff());
		var oPromiseUno = await Promise.all(aPromiseUno);
		//Fecha hasta donde se van a calcular los intereses
		let aTableInterestsDates = oPromiseUno[0];

		//Inicializar intereses
		this._oFinancedItem.intMonthDay = 0;
		this._oFinancedItem.intMonthSum = 0;
		this._oFinancedItem.intAllSum = 0;
		this._oFinancedItem.intAllDay = 0;

		//Calculo intereses para CORP ZAPATA:
		for (const itemPago of aTableInterestsDates) {
			//Fecha Inicio y fin
			let oDateStart = moment(itemPago.dDateStart);
			let oDateEnd_1 = moment(itemPago.dDateEnd);
			let iNumDias = 0;
			if (moment(oDateStart).isSame(moment(), 'day')) {
				oDateEnd_1.add(1, 'days');
			}
			//2.1) Obtener columnas Dias Intereses:
			iNumDias = oDateEnd_1.diff(oDateStart, 'days');
			let oDateEnd_2 = moment(itemPago.dDateEnd);
			if (iNumDias >= 2) {
				oDateEnd_2.subtract(1, 'days');
			}
			let iDiasInteres = 1;
			//Obtener valor de tasas
			let aTasas = await this._getInterest_CORP_1_RateVal(this._oFinancedItem.rateType_rate, oDateStart, oDateEnd_2);
			for (const oTasa of aTasas) {
				let fAcumulador = this._oFinancedItem.diffPerc / 100;
				let fRate = Number(oTasa.rateValue) / 100; //7.1
				fAcumulador = fAcumulador + fRate;
				fAcumulador = fAcumulador * (itemPago.fBalanceAmt / 360);
				this._oFinancedItem.rateValue = Number(oTasa.rateValue);
				fAcumulador = Number(fAcumulador);
				if (!isNaN(fAcumulador) && fAcumulador !== 0) {
					this._oFinancedItem.intAllSum += fAcumulador;
					this._oFinancedItem.intAllDay++;
				}
				let oInteres = new TablaInteres(itemPago.bPayFlag,
					itemPago.dDateStart, itemPago.dDateEnd, oTasa.date,
					itemPago.fBalanceAmt,
					oTasa.date.format("YYYY"), oTasa.date.format("MM"), oTasa.date.format("DD"),
					this._oFinancedItem.rateValue, 1, fAcumulador,
					itemPago.fIntPay, itemPago.fAmtPay);
				//Agregar tabla Int.
				this.addInterestTable(oInteres, oDateCalculate, itemPago.dDatePay, oTasa.date);
			}
		}
	}

	/**
	Obtiene los valores de tasas variables para las fechas determinadas
	*/
	async _getInterest_SANT_CAP_RateVal(sRate, oDateStart, oDateFinish) {
		const {
			RateTypesValues_001
		} = cds.entities('BD.VN.PP.XDATA');
		//Obtener fecha del mes
		var oDateQueryStart = moment(oDateStart).startOf('month').format();
		var oDateQueryEnd = moment(oDateFinish).endOf('month').format();

		//Realizar query
		var oQueryRateType = SELECT.from(RateTypesValues_001)
			.where(
				[{
					ref: ["rate"]
				}, "=", {
					val: sRate
				}, "and", {
					ref: ["date"]
				}, ">=", {
					val: oDateQueryStart
				}, "and", {
					ref: ["date"]
				}, "<=", {
					val: oDateQueryEnd
				}])
			.orderBy({
				date: "asc"
			});
		let aRates = await cds.run(oQueryRateType);
		if (aRates.length === 0) {
			aRates.push({
				rate: sRate,
				date: oDateMonthStart,
				rateValue: 0
			});
		}
		//Pasar fechas a moment:
		aRates.forEach(x => {
			x.date = moment(x.date);
		});
		//Solo se carga una vez por mes
		var aRatesEnd = [];
		let currentIndex = 0;
		for (var m = moment(oDateStart); m.diff(oDateFinish, 'days') <= 0; m.add(1, 'days')) {
			//Buscar cualquier tasa para el mes
			let oFind = aRates.find(x => moment(x.date).isSame(m, 'month'));
			let oRate = Object.assign({}, oFind);
			//Si no existe utilizar la anterior
			if (oFind === undefined && aRatesEnd[currentIndex - 1] !== undefined) {
				oRate = Object.assign({}, aRatesEnd[currentIndex - 1]);
			}
			oRate.date = moment(m);
			aRatesEnd.push(oRate);
			currentIndex++;
		}
		return aRatesEnd;
	}

	/**
	 * Obtiene los valores de tasas variables para las fechas determinadas
	 */
	async _getInterest_CORP_1_RateVal(sRate, oDateStart, oDateFinish) {
		const {
			RateTypesValues_001
		} = cds.entities('BD.VN.PP.XDATA');
		//Obtener fecha del mes
		var oDateQueryStart = moment(oDateStart).startOf('month').format();
		var oDateQueryEnd = moment(oDateFinish).endOf('month').format();

		//Realizar query
		var oQueryRateType = SELECT.from(RateTypesValues_001)
			.where(
				[{
					ref: ["rate"]
				}, "=", {
					val: sRate
				}, "and", {
					ref: ["date"]
				}, ">=", {
					val: oDateQueryStart
				}, "and", {
					ref: ["date"]
				}, "<=", {
					val: oDateQueryEnd
				}])
			.orderBy({
				date: "asc"
			});
		let aRates = await cds.run(oQueryRateType);
		if (aRates.length === 0) {
			aRates.push({
				rate: sRate,
				date: oDateMonthStart,
				rateValue: 0
			});
		}
		//Pasar fechas a moment:
		aRates.forEach(x => {
			x.date = moment(x.date);
		});
		//Solo se carga una vez por mes
		var aRatesEnd = [];
		let currentIndex = 0;
		for (var m = moment(oDateStart); m.diff(oDateFinish, 'days') <= 0; m.add(1, 'days')) {
			//Buscar cualquier tasa para el mes
			let oFind = aRates.find(x => moment(x.date).isSame(m, 'month'));
			let oRate = Object.assign({}, oFind);
			//Si no existe utilizar la anterior
			if (oFind === undefined && aRatesEnd[currentIndex - 1] !== undefined) {
				oRate = Object.assign({}, aRatesEnd[currentIndex - 1]);
			}
			oRate.date = moment(m);
			aRatesEnd.push(oRate);
			currentIndex++;
		}
		return aRatesEnd;
	}

	/**
	 * Realiza cálculo de intereses de un tipo de financiamiento Scotiabank.
	 * @param {Date} oDateCalculate Fecha fin cálculo intereses
	 */
	async _getInterest_SCOTIABANK_1(oDateCalculate) {
		var aPromiseUno = [];
		//Porcentaje  dif y fechas
		aPromiseUno.push(this._getInterest_getDates());
		aPromiseUno.push(this._getInterest_PorDiff());
		var oPromiseUno = await Promise.all(aPromiseUno);
		//Fecha hasta donde se van a calcular los intereses
		let aTableInterestsDates = oPromiseUno[0];

		//Inicializar intereses
		this._oFinancedItem.intMonthDay = 0;
		this._oFinancedItem.intMonthSum = 0;
		this._oFinancedItem.intAllSum = 0;
		this._oFinancedItem.intAllDay = 0;
		//Calculo intereses para SCOTIA:
		for (const itemPago of aTableInterestsDates) {
			let oDateWhile = moment(itemPago.dDateStart).startOf('month');
			if (oDateWhile > itemPago.dDateEnd) {
				throw "Fecha inicio inválida";
			}

			//Fecha Inicio y fin
			let oDateStart = moment(itemPago.dDateStart);
			let oDateEnd_1 = moment(itemPago.dDateEnd);
			let iNumDias = 0;
			if (oDateStart.isSame(moment(), 'day')) {
				oDateEnd_1.add(1, 'days');
			}
			//2.1) Obtener columnas Dias Intereses:
			iNumDias = oDateEnd_1.diff(oDateStart, 'days');
			let oDateEnd_2 = moment(itemPago.dDateEnd);
			if (iNumDias >= 2) {
				oDateEnd_2.subtract(1, 'days');
			}
			let iDiasInteres = 1;
			//Obtener valor de tasas
			let aTasas = await this._getInterest_SCOTIABANK_1_RateVal(this._oFinancedItem.rateType_rate, oDateStart, oDateEnd_2);
			for (const oTasa of aTasas) {
				let fAcumulador = this._oFinancedItem.diffPerc / 100;
				let fRate = Number(oTasa.rateValue) / 100; //7.1
				fAcumulador = fAcumulador + fRate;
				fAcumulador = fAcumulador * (itemPago.fBalanceAmt / 360);
				this._oFinancedItem.intAllSum += fAcumulador;
				this._oFinancedItem.intAllDay++;
				this._oFinancedItem.rateValue = oTasa.rateValue;
				//bPayFlag, dDateStart, dDateEnd, 
				//fBalance, iYear, iPeriod, 
				//fRateValue, iIntDays, fIntSum //Siempre 1 día
				let oInteres = new TablaInteres(itemPago.bPayFlag,
					itemPago.dDateStart, itemPago.dDateEnd, oTasa.date,
					itemPago.fBalanceAmt,
					oTasa.date.format("YYYY"), oTasa.date.format("MM"), oTasa.date.format("DD"),
					this._oFinancedItem.rateValue, 1, fAcumulador, itemPago.fIntPay, itemPago.fAmtPay);
				//Agregar tabla Int.
				this.addInterestTable(oInteres, oDateCalculate, itemPago.dDatePay, oTasa.date);
			}
		}
	}

	/**
	 * Obtiene los valores de tasas variables para las fechas determinadas
	 */
	async _getInterest_SCOTIABANK_1_RateVal(sRate, oDateStart, oDateFinish) {
		const {
			RateTypesValues_001
		} = cds.entities('BD.VN.PP.XDATA');
		//Realizar query
		var oQueryRateType = SELECT.from(RateTypesValues_001)
			.where(
				[{
					ref: ["rate"]
				}, "=", {
					val: sRate
				}, "and", {
					ref: ["date"]
				}, ">=", {
					val: oDateStart.toISOString().substring(0, 10)
				}, "and", {
					ref: ["date"]
				}, "<=", {
					val: oDateFinish.toISOString().substring(0, 10)
				}])
			.orderBy({
				date: "asc"
			});
		let aRates = await cds.run(oQueryRateType);
		//Si no hay TIEE para el primer día, entonces tomar el primer TIIE ascendente
		let bFirst = moment(aRates[0].date).isSame(oDateStart, 'day');
		if (bFirst === false) {
			var oQueryFirstRate = SELECT.from(RateTypesValues_001)
				.where(
					[{
						ref: ["rate"]
					}, "=", {
						val: sRate
					}, "and", {
						ref: ["date"]
					}, "<=", {
						val: oDateStart.toISOString().substring(0, 10)
					}])
				.orderBy({
					date: "desc"
				}).limit(1, 0);
			let aFirstRate = await cds.run(oQueryFirstRate);
			aFirstRate[0].date = oDateStart.toISOString().substring(0, 10);
			aRates.splice(0, 0, aFirstRate[0]);
		}
		let currentIndex = 0;
		for (var m = moment(oDateStart); m.diff(oDateFinish, 'days') <= 0; m.add(1, 'days')) {
			let oRate = aRates[currentIndex];
			if (oRate === undefined) {
				oRate = aRates[currentIndex - 1];
			}
			let bDateOK = moment(oRate.date).isSame(m, 'day');
			if (!bDateOK) {
				let oRatePrev = aRates[currentIndex - 1];
				oRatePrev.date = m.format('YYYY-MM-DD');
				aRates.splice(currentIndex, 0, oRatePrev);
			}
			currentIndex++;
		}
		return aRates.map(x => {
			x.date = moment(x.date);
			return x;
		});
	}

	/**
	 * Realiza cálculo de intereses de un tipo de financiamiento Scotiabank.
	 * @param {Date} oDateCalculate Fecha fin cálculo intereses
	 */
	async _getInterest_SANTANDER_1(oDateCalculate) {
		var aPromiseUno = [];
		//Porcentaje  dif y fechas
		aPromiseUno.push(this._getInterest_getDates());
		aPromiseUno.push(this._getInterest_PorDiff());
		var oPromiseUno = await Promise.all(aPromiseUno);
		//Fecha hasta donde se van a calcular los intereses
		let aTableInterestsDates = oPromiseUno[0];

		//Inicializar intereses
		this._oFinancedItem.intMonthDay = 0;
		this._oFinancedItem.intMonthSum = 0;
		this._oFinancedItem.intAllSum = 0;
		this._oFinancedItem.intAllDay = 0;
		//Calculo intereses para SCOTIA:
		for (const itemPago of aTableInterestsDates) {
			let oDateWhile = moment(itemPago.dDateStart).startOf('month');
			if (oDateWhile > itemPago.dDateEnd) {
				throw "Fecha inicio inválida";
			}
			while (oDateWhile <= itemPago.dDateEnd) {
				//Fecha Inicio y fin
				let oDateStart = moment(itemPago.dDateStart);
				let oDateEnd_1 = moment(itemPago.dDateEnd);
				let iNumDias = 0;
				if (oDateStart.isSame(moment(), 'day')) {
					oDateEnd_1.add(1, 'days');
				}
				//2.1) Obtener columnas Dias Intereses:
				iNumDias = oDateEnd_1.diff(oDateStart, 'days');
				let oDateEnd_2 = moment(itemPago.dDateEnd);
				if (iNumDias >= 2) {
					oDateEnd_2.subtract(1, 'days');
				}
				let iDiasInteres = 1;
				//Obtener valor de tasas
				let aTasas = await this._getInterest_SANTANDER_1_RateVal(this._oFinancedItem.rateType_rate, oDateStart, oDateEnd_2);
				for (const oTasa of aTasas) {
					let fAcumulador = this._oFinancedItem.diffPerc / 100;
					let fRate = Number(oTasa.rateValue) / 100; //7.1
					fAcumulador = fAcumulador + fRate;
					fAcumulador = fAcumulador * (itemPago.fBalanceAmt / 360);
					this._oFinancedItem.intAllSum += fAcumulador;
					this._oFinancedItem.intAllDay++;
					//bPayFlag, dDateStart, dDateEnd, 
					//fBalance, iYear, iPeriod, 
					//fRateValue, iIntDays, fIntSum //Siempre 1 día
					let oInteres = new TablaInteres(itemPago.bPayFlag,
						itemPago.dDateStart, itemPago.dDateEnd, oTasa.date,
						itemPago.fBalanceAmt,
						oTasa.date.format("YYYY"), oTasa.date.format("MM"), oTasa.date.format("DD"),
						this._oFinancedItem.rateValue, 1, this._oFinancedItem.intMonthSum, itemPago.fIntPay, itemPago.fAmtPay);
					//Agregar tabla Int.
					this.addInterestTable(oInteres, oDateCalculate, itemPago.dDatePay, oDateWhile);
					//Avanzar oDateWhile
					oDateWhile.add(1, 'months');
				}
			}
		}
	}

	/**
	Obtiene los valores de tasas variables para las fechas determinadas
	*/
	async _getInterest_SANTANDER_1_RateVal(sRate, oDateStart, oDateFinish) {
		const {
			RateTypesValues_001
		} = cds.entities('BD.VN.PP.XDATA');
		//Realizar query
		var oQueryRateType = SELECT.from(RateTypesValues_001)
			.where(
				[{
					ref: ["rate"]
				}, "=", {
					val: sRate
				}, "and", {
					ref: ["date"]
				}, ">=", {
					val: oDateStart.toISOString().substring(0, 10)
				}, "and", {
					ref: ["date"]
				}, "<=", {
					val: oDateFinish.toISOString().substring(0, 10)
				}])
			.orderBy({
				date: "asc"
			});
		let aRates = await cds.run(oQueryRateType);
		//Si no hay TIEE para el primer día, entonces tomar el primer TIIE ascendente
		let bFirst = moment(aRates[0].date).isSame(oDateStart, 'day');
		if (bFirst === false) {
			var oQueryFirstRate = SELECT.from(RateTypesValues_001)
				.where(
					[{
						ref: ["rate"]
					}, "=", {
						val: sRate
					}, "and", {
						ref: ["date"]
					}, "<=", {
						val: oDateStart.toISOString().substring(0, 10)
					}])
				.orderBy({
					date: "desc"
				}).limit(1, 0);
			let aFirstRate = await cds.run(oQueryFirstRate);
			aFirstRate[0].date = oDateStart.toISOString().substring(0, 10);
			aRates.splice(0, 0, aFirstRate[0]);
		}
		let currentIndex = 0;
		for (var m = moment(oDateStart); m.diff(oDateFinish, 'days') <= 0; m.add(1, 'days')) {
			let oRate = aRates[currentIndex];
			if (oRate === undefined) {
				oRate = aRates[currentIndex - 1];
			}
			let bDateOK = moment(oRate.date).isSame(m, 'day');
			if (!bDateOK) {
				let oRatePrev = aRates[currentIndex - 1];
				oRatePrev.date = m.format('YYYY-MM-DD');
				aRates.splice(currentIndex, 0, oRatePrev);
			}
			currentIndex++;
		}
		return aRates;
	}

	/**
	 * Realiza cálculo de intereses de un tipo de financiamiento DAIMLER.
	 * @param {Date} oDateCalculate Fecha fin cálculo intereses
	 */
	async _getInterest_DAIMLER(oDateCalculate) {
		var aPromiseUno = [];
		//Porcentaje  dif y fechas
		aPromiseUno.push(this._getInterest_getDates());
		aPromiseUno.push(this._getInterest_PorDiff());
		var oPromiseUno = await Promise.all(aPromiseUno);
		//Fecha hasta donde se van a calcular los intereses
		let aTableInterestsDates = oPromiseUno[0];

		//Inicializar intereses
		this._oFinancedItem.intMonthDay = 0;
		this._oFinancedItem.intMonthSum = 0;
		this._oFinancedItem.intAllSum = 0;
		this._oFinancedItem.intAllDay = 0;

		//Calculo intereses para DAIMLER:
		for (const itemPago of aTableInterestsDates) {
			let oDateWhile = moment(itemPago.dDateStart).startOf('month');
			if (oDateWhile > itemPago.dDateEnd) {
				throw "Fecha inicio inválida";
			}
			while (oDateWhile <= itemPago.dDateEnd) {
				//Obtiene la tasa (TIEE/LIBOR) / Número de días / Fecha tasa
				let oRateVal = await this._getInterest_DAIMLER_RateVal(oDateWhile, itemPago);
				//Generar cálculos
				let fAcumulador = this._oFinancedItem.diffPerc; //1.6
				fAcumulador = fAcumulador / 100; //0.016
				fAcumulador = fAcumulador + (this._oFinancedItem.rateValue / 100); //0.016 + 0.087
				fAcumulador = fAcumulador / 360; //0.002861
				fAcumulador = fAcumulador * itemPago.fBalanceAmt;
				fAcumulador = fAcumulador * oRateVal.iNumDias;
				this._oFinancedItem.intAllSum += fAcumulador;
				this._oFinancedItem.intAllDay += oRateVal.iNumDias;
				//bPayFlag, dDateStart, dDateEnd, fBalance, iYear, iPeriod, fRateValue, iIntDays, fIntSum
				let oInteres = new TablaInteres(
					itemPago.bPayFlag,
					itemPago.dDateStart, itemPago.dDateEnd, oRateVal.dDateRate,
					itemPago.fBalanceAmt,
					oDateWhile.format("YYYY"), oDateWhile.format("MM"), oDateWhile.format("DD"),
					this._oFinancedItem.rateValue,
					oRateVal.iNumDias, fAcumulador, itemPago.fIntPay, itemPago.fAmtPay);
				//Agregar tabla Int.
				this.addInterestTable(oInteres, oDateCalculate, itemPago.dDatePay, oDateWhile);
				//Avanzar oDateWhile
				oDateWhile.add(1, 'months');
			}
		}
		return;
	}

	/**
	 * Realiza cálculo de intereses de un tipo de financiamiento BBVA.
	 * @param {Date} oDateCalculate Fecha fin cálculo intereses
	 */
	async _getInterest_BBVA(oDateCalculate) {
		var aPromiseUno = [];
		//Porcentaje  dif y fechas
		aPromiseUno.push(this._getInterest_getDates());
		aPromiseUno.push(this._getInterest_PorDiff());
		var oPromiseUno = await Promise.all(aPromiseUno);
		//Fecha hasta donde se van a calcular los intereses
		let aTableInterestsDates = oPromiseUno[0];
		//Inicializar intereses
		this._oFinancedItem.intMonthDay = 0;
		this._oFinancedItem.intMonthSum = 0;
		this._oFinancedItem.intAllSum = 0;
		this._oFinancedItem.intAllDay = 0;
		//Calculo intereses para BBVA:
		for (const itemPago of aTableInterestsDates) {
			let oDateWhile = moment(itemPago.dDateStart).startOf('month');
			if (oDateWhile > itemPago.dDateEnd) {
				throw "Fecha inicio inválida";
			}
			while (oDateWhile <= itemPago.dDateEnd) {
				//Obtiene la tasa (TIEE/LIBOR) / Número de días / Fecha tasa
				let oRateVal = await this._getInterest_BBVA_RateVal(oDateWhile, itemPago);
				//Generar cálculos
				let fAcumulador = BigNumber(this._oFinancedItem.diffPerc); //1.6
				fAcumulador = fAcumulador.div(100); //0.016
				fAcumulador = fAcumulador.plus(BigNumber(this._oFinancedItem.rateValue).div(100)); //0.016 + 0.087
				fAcumulador = fAcumulador.dp(20).div(360); //0.002861
				fAcumulador = fAcumulador.times(itemPago.fBalanceAmt);
				fAcumulador = fAcumulador.times(oRateVal.iNumDias);
				fAcumulador = fAcumulador.toNumber();

				this._oFinancedItem.intAllSum += fAcumulador;
				this._oFinancedItem.intAllDay += oRateVal.iNumDias;
				//bPayFlag, dDateStart, dDateEnd, fBalance, iYear, iPeriod, fRateValue, iIntDays, fIntSum
				let oInteres = new TablaInteres(
					itemPago.bPayFlag,
					itemPago.dDateStart, itemPago.dDateEnd, oRateVal.dDateRate,
					itemPago.fBalanceAmt,
					oRateVal.dDateRate.format("YYYY"), oRateVal.dDateRate.format("MM"), oRateVal.dDateRate.format("DD"),
					this._oFinancedItem.rateValue,
					oRateVal.iNumDias, fAcumulador, itemPago.fIntPay, itemPago.fAmtPay);
				//Agregar tabla Int.
				this.addInterestTable(oInteres, oDateCalculate, itemPago.dDatePay, oDateWhile);
				//Avanzar oDateWhile
				oDateWhile.add(1, 'months');
			}
		}
	}

	/**
	 * Agrega elemento a la tabla de intereses
	 */
	addInterestTable(oItem, oDateCalculate, dDatePay, dDateProcess) {
		//Si es un pago 
		if (oItem.bPayFlag) {
			if (dDatePay.isSame(dDateProcess, 'month')) {
				//Cambiar cantidades a sumar
				oItem.fIntSum = oItem.fIntPay;
			} else {
				//Dejar en blanco
				delete oItem.fIntPay;
				delete oItem.fAmtPay;
			}
		}
		if (oItem.iIntDays > 0 && oItem.fIntSum > 0) {
			//Sumar intereses mes
			if (moment(dDateProcess).isSame(oDateCalculate, 'month')) {
				switch (this.sFinType) {
				case "BBVA":
				case "SCOTIA":
				case "CORP":
				case "SANT_CAP":
					this._oFinancedItem.intMonthDay += oItem.iIntDays;
					break;
				default:
					this._oFinancedItem.intMonthDay = oItem.iIntDays;
					break;
				}
				this._oFinancedItem.intMonthSum += oItem.fIntSum;
			}
			oItem.dDatePay = dDatePay;
			this.oInterestTable.push(oItem);
		}
	}

	/**
	 * Obtiene tasa variable para una fecha de inicio determinada y modifica el objeto  _oFinancedItem
	 * @param {Date} oDateWhile Fecha obtención de tasa variable
	 * @param {Object} itemPago Fecha ciclo a procesar
	 * @returns {Object<Integer,Date>} Número de días transcurridos y fecha tasa
	 */
	async _getInterest_BBVA_RateVal(oDateWhile, itemPago) {
		let iNumDias = 0;
		let dDateRate = moment();

		if (oDateWhile.isSame(itemPago.dDateEnd, 'month')) {
			//1) Si es el último mes a calcular, utilizar TASA día anterior a la fecha de inicio de financiamiento
			if (itemPago.dDateEnd.isSame(itemPago.dDateStartInt, 'month')) {
				//Si la fecha a fin es mismo mes a la fecha inicio
				//Tomar la tasa del dia anterior a la fecha de inicio
				dDateRate = itemPago.dDateStartInt;
			} else {
				//Tomar la ultima tasa del mes anterior
				dDateRate = oDateWhile;
			}
			//1.1) Obtener columnas Dias Intereses / Mes:
			let oFechaMes = moment(itemPago.dDateEnd).startOf('month');
			iNumDias = itemPago.dDateEnd.diff(dDateRate, 'days') + 1;

		} else {
			//2) Si no es el último mes, utilizar últ. TASA mes que se está calculando (último día mes)
			let oFechaMes = moment(oDateWhile).endOf('month');
			dDateRate = oDateWhile;
			if (oDateWhile < itemPago.dDateStartInt) {
				dDateRate = itemPago.dDateStartInt;
			}
			//2.1) Obtener columnas Dias Intereses:
			iNumDias = oFechaMes.diff(dDateRate, 'days') + 1;
		}
		//Cuando es el primer mes del calculo no sumar dia extra
		if (oDateWhile.isSame(itemPago.dDateStartOrg, 'month')) {
			iNumDias--;
		}
		//3) Realizar cálculos
		//Obtener TASA
		this._oFinancedItem.rateValue = await this._getInterest_BBVA_RateVal_Value(this._oFinancedItem.rateType_rate, dDateRate, oDateWhile);
		//Regresar número de días y fecha tasa
		let oRet = {};
		oRet.dDateRate = dDateRate;
		oRet.iNumDias = iNumDias;
		return oRet;
	}

	/**
	 * Obtiene tasa variable para una fecha de inicio determinada y modifica el objeto  _oFinancedItem
	 * @param {Date} oDateWhile Fecha obtención de tasa variable
	 * @param {Object} itemPago Fecha ciclo a procesar
	 * @returns {Object<Integer,Date>} Número de días transcurridos y fecha tasa
	 */
	async _getInterest_CITI_CAP_RateVal(oDateWhile, itemPago) {
		let iNumDias = 0;
		let dDateRate = moment(itemPago.dDateStart).startOf('month');
		//Obtener TASA
		this._oFinancedItem.rateValue = await this._getInterest_CITI_CAP_RateVal_Value(this._oFinancedItem.rateType_rate, dDateRate,
			oDateWhile);
		//Regresar número de días y fecha tasa
		//Si While es  mes de la fecha inicial, usar fecha calculo como fin
		let oDateStart = oDateWhile;
		let oDateFinish = itemPago.dDateEnd;
		if (moment(oDateStart).isSame(itemPago.dDateStart, 'month')) {
			oDateStart = itemPago.dDateStart;
		}
		//Si while es distinto mes de la fecha final, usar fecha calculo como fin
		if (!moment(oDateWhile).isSame(itemPago.dDateEnd, 'month')) {
			oDateFinish = moment(oDateStart).endOf('month');
		}
		iNumDias = oDateFinish.diff(oDateStart, 'days');
		iNumDias++;
		let oRet = {};
		oRet.dDateRate = dDateRate;
		oRet.iNumDias = iNumDias;
		return oRet;
	}

	/**
	 * Obtiene tasa variable para una fecha de inicio determinada y modifica el objeto  _oFinancedItem
	 * @param {Date} oDateWhile Fecha obtención de tasa variable
	 * @param {Object} itemPago Fecha ciclo a procesar
	 * @returns {Object<Integer,Date>} Número de días transcurridos y fecha tasa
	 */
	async _getInterest_DAIMLER_RateVal(oDateWhile, itemPago) {
		let iNumDias = 0;
		let dDateRate = moment(itemPago.dDateStart).startOf('month');
		//Obtener TASA
		this._oFinancedItem.rateValue = await this._getInterest_DAIMLER_RateVal_Value(this._oFinancedItem.rateType_rate, dDateRate,
			oDateWhile);
		//Regresar número de días y fecha tasa
		//Si While es  mes de la fecha inicial, usar fecha calculo como fin
		let oDateStart = oDateWhile;
		let oDateFinish = itemPago.dDateEnd;
		if (moment(oDateStart).isSame(itemPago.dDateStart, 'month')) {
			oDateStart = itemPago.dDateStart;
		}
		//Si while es distinto mes de la fecha final, usar fecha calculo como fin
		if (!moment(oDateWhile).isSame(itemPago.dDateEnd, 'month')) {
			oDateFinish = moment(oDateStart).endOf('month');
		}
		iNumDias = oDateFinish.diff(oDateStart, 'days');
		iNumDias++;
		let oRet = {};
		oRet.dDateRate = dDateRate;
		oRet.iNumDias = iNumDias;
		return oRet;
	}

	/**
	 * Obtiene la tasa variable correspondiente a la fecha para CITI CAPITAL
	 * @param {string} sRate Tipo de tasa a obtener
	 * @param {Date} dateRate Fecha obtención de tasa variable
	 * @param {Date} dateRate Fecha ciclo a procesar
	 * @returns {String} Valor de tasa para elemento buscado
	 */
	async _getInterest_CITI_CAP_RateVal_Value(sRate, dateRate, oDateWhile) {
		const {
			RateTypesValues_001
		} = cds.entities('BD.VN.PP.XDATA');
		//Realizar query
		var oQueryRateType = SELECT.from(RateTypesValues_001)
			.where(
				[{
					ref: ["rate"]
				}, "=", {
					val: sRate
				}, "and", {
					ref: ["date"]
				}, "<", {
					val: dateRate.toISOString().substring(0, 10)
				}])
			.orderBy({
				date: "desc"
			})
			.limit(1, 0);
		var res = await cds.run(oQueryRateType);
		if (res.length === 0) {
			throw "No se han encontrado coincidencias: _getInterest_CITI_CAP_RateVal_Value";
		}
		var value = res[0];
		value = value.rateValue;
		//Retornar acierto
		return value;
	}

	/**
	 * Obtiene la tasa variable correspondiente a la fecha para DAIMLER
	 * @param {string} sRate Tipo de tasa a obtener
	 * @param {Date} dateRate Fecha obtención de tasa variable
	 * @param {Date} dateRate Fecha ciclo a procesar
	 * @returns {String} Valor de tasa para elemento buscado
	 */
	async _getInterest_DAIMLER_RateVal_Value(sRate, dateRate, oDateWhile) {
		const {
			RateTypesValues_001
		} = cds.entities('BD.VN.PP.XDATA');
		//Realizar query
		var oQueryRateType = SELECT.from(RateTypesValues_001)
			.where(
				[{
					ref: ["rate"]
				}, "=", {
					val: sRate
				}, "and", {
					ref: ["date"]
				}, ">=", {
					val: oDateWhile.format("YYYY-MM-DD")
				}])
			.orderBy({
				date: "asc"
			})
			.limit(1, 0);
		var res = await cds.run(oQueryRateType);
		if (res.length === 0) {
			throw "No se han encontrado coincidencias: _getInterest_DAIMLER_RateVal_Value";
		}
		var value = res[0];
		value = value.rateValue;
		//Retornar acierto
		return value;
	}

	/**
	 * Obtiene la tasa variable correspondiente a la fecha para BBVA
	 * @param {string} sRate Tipo de tasa a obtener
	 * @param {Date} dateRate Fecha obtención de tasa variable
	 * @param {Date} dateRate Fecha ciclo a procesar
	 * @returns {String} Valor de tasa para elemento buscado
	 */
	async _getInterest_BBVA_RateVal_Value(sRate, dateRate, oDateWhile) {
		const {
			RateTypesValues_001
		} = cds.entities('BD.VN.PP.XDATA');
		//Realizar query
		var oQueryRateType = SELECT.from(RateTypesValues_001)
			.where(
				[{
					ref: ["rate"]
				}, "=", {
					val: sRate
				}, "and", {
					ref: ["date"]
				}, "<", {
					val: dateRate.toISOString().substring(0, 10)
				}])
			.orderBy({
				date: "desc"
			})
			.limit(1, 0);
		var res = await cds.run(oQueryRateType);
		if (res.length === 0) {
			throw "No se han encontrado coincidencias: _getRateValBBVA";
		}
		var value = res[0];
		value = value.rateValue;
		//3.1) Si ya existe una tie para ese mes, utilizarla
		var oTableInterestsRev = this.oInterestTable.slice().reverse();
		var res = oTableInterestsRev.find(
			res => res.bPayFlag === true && res.iYear === oDateWhile.format("YYYY") && res.iPeriod === oDateWhile.format("MM")
		);
		if (res !== undefined) {
			value = res.fRateValue;
		}
		//Retornar acierto
		return value;
	}

	/**
	 * Obtiene el porcentaje diferencial a utilizar y lo asigna al objeto _oFinancedItem
	 * El porcentaje diferencial obtenido es para BBVA.
	 */
	async _getInterest_PorDiff() {
		//CDSs
		const {
			ViewFinSrvCredits_001
		} = cds.entities('BD.VN.PP.XVIEW');
		//Bandera de línea de crédito
		var sFlag = Helpers.getSrvCredFlag(this._oFinancedItem.fundSubType_ID);
		//Realizar query
		var oFinSrvCredQuery = SELECT.from(ViewFinSrvCredits_001, ["diffPerMXN", "diffPerUSD"])
			.where({
				finServ_finCode: this._oFinancedItem.finSrv_finCode,
				sapVKORG: this._oFinancedItem.center,
				[sFlag]: true
			}).limit(1, 0);
		var aRes = await cds.run(oFinSrvCredQuery);
		if (aRes.length === 0) {
			throw "No se han encontrado coincidencias: _getPorDiff";
		}
		//Definir porcentaje diferencial
		switch (this._oFinancedItem.currency) {
		case "MXN":
			this._oFinancedItem.diffPerc = Number(aRes[0].diffPerMXN);
			break;
		case "USD":
			this._oFinancedItem.diffPerc = Number(aRes[0].diffPerUSD);
			break;
		}
	}

	/**
	 * Obtiene la tabla de los intereses a calcular.
	 * @param bPayment	Indicador de que es un pago
	 * @param bTransfer Indicador de que es un traspaso
	 * @param bCompens Indicador de que es un pago por compensación
	 * Tipo tabla de retorno:
	 * iSecuence		int		Secuencia del pago.
	 * dDateStart	moment	Fecha inicio.
	 * dDateEnd		moment	Fecha fin.
	 * bPayFlag		boolean	Indicador de pago.
	 * fFinancedAmt	number	Importe financiar.
	 * fBalanceAmt	number	Saldo a financiar.
	 * fPayedAmt	number	Importe pagado.
	 */
	async _getInterest_getDates(bPayment = false, bTransfer = false, bCompens = false) {
		var dFechaInicio = moment(this._oFinancedItem.dateStart);
		var dFechaInicioOrg = moment(this._oFinancedItem.dateStart);
		var dFechaInicioInt = moment(this._oFinancedItem.dateStart);
		const {
			FinancedItemsPayments_001
		} = cds.entities('BD.VN.PP.XDATA');
		//Obtener lista de pagos
		var oPagosQuery = cds.read(FinancedItemsPayments_001)
			.where(
				[{
					ref: ["financedItem_ID"]
				}, "=", {
					val: this._oFinancedItem.ID
				}, "and", {
					ref: ["flagDel"]
				}, "=", {
					val: false
				}, "and", {
					ref: ["flagConf"]
				}, "=", {
					val: true
				}])
			.orderBy({
				secuence: "asc"
			});
		var aPagos = await cds.run(oPagosQuery);

		//Borrar última línea si es pago comp.
		if (bCompens === true && this.aPagos.length !== 0) {
			aPagos.pop();
		}
		//Armar tabla de fechas con los pagos
		var aTablaPagos = aPagos.map(function (pago) {
			var oRow = {
				iSecuence: parseInt(pago.secuence),
				dDateStartOrg: moment(dFechaInicioOrg),
				dDateStart: null,
				dDateEnd: moment(pago.datePay),
				bPayFlag: true,
				fFinancedAmt: Number(pago.financedAmt),
				fBalanceAmt: Number(pago.balanceAmt),
				fPayedAmt: Number(pago.payedAmt),
				fIntPay: Number(pago.intPayAmt),
				fAmtPay: Number(pago.payedAmt),
				dDatePay: moment(pago.datePay)
			}
			return oRow;
		});
		//Obtener fechas de inicio:
		aTablaPagos.forEach(function (itemPago, index, array) {
			if (index === 0) {
				itemPago.dDateStart = dFechaInicio;
			} else {
				//Tomar como fecha inicio la fin del pago anterior
				itemPago.dDateStart = aTablaPagos[index - 1].dDateEnd;
			}
			itemPago.dDateStartInt = itemPago.dDateStart;
		}, this);
		//Si es el último es pago a realizar, ignorar
		if (bPayment === true && aTablaPagos.length != 0) {
			aTablaPagos.pop();
		}
		//Agregar el cálculo de interés actual a partir del último pago:
		if (aTablaPagos.length !== 0) {
			dFechaInicio = moment(aTablaPagos[aTablaPagos.length - 1].dDateEnd);
			dFechaInicioInt = moment(dFechaInicio).add(1, 'days');
		}
		var oRow = {
			iSecuence: 0,
			dDateStartOrg: moment(dFechaInicioOrg),
			dDateStartInt: dFechaInicioInt,
			dDateStart: dFechaInicio,
			dDateEnd: this._oDateCalculate,
			bPayFlag: false,
			fFinancedAmt: Number(this._oFinancedItem.financedAmt),
			fBalanceAmt: Number(this._oFinancedItem.balanceAmt),
			fPayedAmt: Number(0),
			dDatePay: null
		}
		if (bPayment === true) {
			oRow.fFinancedAmt = Number(this._oFinancedItem.payedAmt);
		}
		aTablaPagos.push(oRow)

		//Para DAIMLER y SCOTIABANK se tiene que recorrer las fechas de fin
		switch (this.sFinType) {
			//case 'DAIMLER':
		case 'SCOTIABANK':
			aTablaPagos = aTablaPagos.map(oFila => {
				let oNewDate = moment(oFila.dDateEnd);
				oNewDate.subtract(1, 'days');
				oFila.dDateEnd = oNewDate;
				return oFila;
			});
			break;
		default:
			break;
		}
		return aTablaPagos;
	}
}