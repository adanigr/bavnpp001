const cds = require('@sap/cds');
const NewFinancedItem = require('./utility/NewFinancedItem.js');
const FinancedItemsSecFin = require("./utility/FinancedItemsSecFin.js");
const FinancedItemInterestDocGen = require("./utility/FinancedItemInterestDocGen.js");
const FinancedItemBBVA = require("./utility/FinancedItemBBVA.js");
module.exports = cds.service.impl((srv) => {

	//FinancedItemBBVA------------------------------------------------------------------
	srv.on('CREATE', "FinancedItemBBVA", async(req, next) => {
		//	Registrar elementos BBVA
		var oDatos = await next();
		var helper = new FinancedItemBBVA(oDatos, "TESTSCP");
		try {
			await helper.createMethod();
			return helper.getElement();
		} catch (ex) {
			console.log(ex);
			req.reject(500, ex.toString());
		}
	});
	srv.after("CREATE", "FinancedItemBBVA", (oBBVA) => {
		//Guardar segunda financiera
		FinancedItemBBVA.saveElement(oBBVA);
	});
	srv.before(["UPDATE", "DELETE"], "FinancedItemBBVA", (req, next) => {
		//	Registrar elemento BBVA
		req.reject(405, "Imposible modificar");
	});
});