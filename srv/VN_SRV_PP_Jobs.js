const cds = require('@sap/cds');
const InterestProvision = require("./utility/InterestProvision.js");

module.exports = cds.service.impl((srv) => {
	//Servicio para generar pólizas provisión
	srv.on("interestProvision", async(req) => {
		var oHelper = new InterestProvision(req);
		var sRes = await oHelper.doProvision();
		return sRes;
	});
	//Servicio para generar anular pólizas provisión
	srv.on("interestReverse", async(req) => {
		var oHelper = new InterestReverse(req);
		var sRes = await oHelper.doReverseProvision();
		return sRes;
	});
	//Servicio para generar pagos pólizas provisión
	srv.on("interestPayment", async(req) => {

	});
});