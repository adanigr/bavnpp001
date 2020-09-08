const cds = require('@sap/cds');
const moment = require('moment-timezone');
const CalIntereses = require('./utility/CalIntereses.js');
module.exports = cds.service.impl((srv) => {
	const {
		FinancedItemsSet
	} = srv.entities('srv.vn.pp');
	const {
		FinancedItemsTransfers_001,
		FinancedItemsPayments_001
	} = srv.entities('BD.VN.PP.XDATA');
	// Calcular intereses para la línea principal
	srv.on('READ', 'FinancedItemsSet', async(req, next) => {
		console.time("FinancedItemsSet");
		const aSetDatos = await next();
		var aSetProc = [];
		for (const dato of aSetDatos) {
			let Intereses = new CalIntereses(dato);
			aSetProc.push(Intereses.getInterests(moment(), true));
		}
		var res = await Promise.all(aSetProc);
		console.timeEnd("FinancedItemsSet");
		return res;
	})
})