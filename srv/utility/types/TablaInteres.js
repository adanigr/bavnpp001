module.exports = class TablaInteres {
	/**
	 * Genera un objeto de tipo Tabla interés
	 * @param {boolean} bPayFlag Indicador si se trata de pago
	 * @param {Date} dDateStart Fecha Inicio 
	 * @param {Date} dDateEnd Fecha Fin 
	 * @param {Date} dDateRate Fecha tasa
	 * @param {number} fBalanceAmt Saldo a financiar
	 * @param {number} iYear Ejercicio contable (AAAA)
	 * @param {number} iPeriod Periodo contable (MM)
	 * @param {number} iDay Día contable (DD)
	 * @param {number} fRateValue Valor de la tasa
	 * @param {number} iIntDays Días de intereses
	 * @param {number} fIntSum Suma de los intereses
	 * @param {number} fIntPay Intereses pagados
	 * @param {number} fAmtPay Cantidad pagada
	 * @param {Date} dDatePay Fecha del pago
	 */
	constructor(bPayFlag, dDateStart, dDateEnd, dDateRate, fBalanceAmt, iYear, iPeriod, iDay, fRateValue, iIntDays, fIntSum, fIntPay, fAmtPay,
		dDatePay = null) {
		this.bPayFlag = bPayFlag;
		this.dDateRate = dDateRate;
		this.dDateStart = dDateStart;
		this.dDateEnd = dDateEnd;
		this.fBalanceAmt = fBalanceAmt;
		this.iYear = iYear;
		this.iPeriod = iPeriod;
		this.iDay = iDay;
		this.fRateValue = fRateValue;
		this.iIntDays = iIntDays;
		this.fIntSum = fIntSum;
		this.fIntPay = fIntPay;
		this.fAmtPay = fAmtPay;
		this.dDatePay = dDatePay;
	}
};