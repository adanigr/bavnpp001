const cds = require('@sap/cds');
const CaractSet = require('./utility/CaractSet.js');
module.exports = cds.service.impl((srv) => {
	// BOM DSN ID:0001{
	srv.after('READ', 'CostsFinSet', (results, req) => {
		var comp = results;
		var i = 0;
		var length = results.length;
		while (i < length) {
			var oRow = results[i];
			var increment = true;
			for (var j = 0; j < length; j++) {
				var oRowC = results[j];
				if ( (oRowC.companyCode !== oRow.companyCode)&& (oRowC.costCode === oRow.costCode)) {
					results.splice(j, 1);
					increment = false;
					break;
				}
			}
			length = results.length;
			if (increment === true) {
				i++;
			}
		}
	});

	
		// }EOM DSN ID:0001	
	
	//Entregar características
	srv.on("READ", "CaractSet", async(req, next) => {
		var oFilter = "";
		var oSelect = "Charactname,ValueCharLong,DescriptionLong";
		var oSkip = 0;
		var oTop = 900;
		if (req._.query !== undefined && req._.query !== null) {
			oFilter = req._.query.$filter;
			oSelect = req._.query.$select;
			oSkip = req._.query.$skip;
			oTop = req._.query.$top;
		}
		//console.log(oFilter, oSelect, oSkip, oTop);
		var helper = new CaractSet(oFilter, oSelect, oSkip, oTop);
		return await helper.getItems();
	});
	//Evitar marcas repetidas
	srv.after('READ', 'BrandSet', (results, req) => {
		var comp = results;
		var i = 0;
		var length = results.length;
		while (i < length) {
			var oRow = results[i];
			var increment = true;
			for (var j = 0; j < length; j++) {
				var oRowC = results[j];
				if ((oRowC.brandCode === oRow.brandCode) && results.filter(x => x.brandCode === oRow.brandCode).length > 1) {
					results.splice(j, 1);
					increment = false;
					break;
				}
			}
			length = results.length;
			if (increment === true) {
				i++;
			}
		}
	});

	//Evitar financieras  repetidas
	srv.after('READ', 'FinSet', (results, req) => {
		var comp = results;
		var i = 0;
		var length = results.length;
		while (i < length) {
			var oRow = results[i];
			var increment = true;
			for (var j = 0; j < length; j++) {
				var oRowC = results[j];
				if ((oRowC.finCode === oRow.finCode) && (oRowC.companyCode !== oRow.companyCode)) {
					results.splice(j, 1);
					increment = false;
					break;
				}
			}
			length = results.length;
			if (increment === true) {
				i++;
			}
		}
	});
	//Evitar subtipos de financiamiento repetidos
	srv.after('READ', 'SubFunTypeSet', (results, req) => {
		var comp = results;
		var i = 0;
		var length = results.length;
		while (i < length) {
			var oRow = results[i];
			var increment = true;
			for (var j = 0; j < length; j++) {
				var oRowC = results[j];
				if ((oRowC.fundSubType_ID === oRow.fundSubType_ID) && (oRowC.companyCode !== oRow.companyCode)) {
					results.splice(j, 1);
					increment = false;
					break;
				}
			}
			length = results.length;
			if (increment === true) {
				i++;
			}
		}
	});

})