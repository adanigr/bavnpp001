sap.ui.define([], function () {
	"use strict";
	return {
		StatusColorPago: function (sSapSTBLGKZ, bflagDel) {
			if (sSapSTBLGKZ === "") {
				return "Success";
			}
			return "Error";
		},
		LayoutPaymentOrig: function (sCtaOrg) {
			var oVars = {
				BanklBBVA: "012",
				BanklBMX: "002",
				BanknCIE: "CIE",
				sSeperate: "|*|"
			};

			try {
				var aCtaOrg = sCtaOrg.split(oVars.sSeperate);
				if (aCtaOrg[1] === oVars.BanklBBVA) {
					return aCtaOrg[0];
				}
				if (aCtaOrg[1] === oVars.BanklBMX) {
					return aCtaOrg[3];
				}
			} catch (ex) {
				return "";
			}
			return "";

		},
		//seleccion layout
		LayoutPaymentCtaDest: function (sCtaOrg) {
			var oVars = {
				BanklBBVA: "012",
				BanklBMX: "002",
				BanknCIE: "CIE",
				sSeperate: "|*|"
			};

			try {
				var aCtaOrg = sCtaOrg.split(oVars.sSeperate);
				if (parseInt(aCtaOrg[4], 10) === 0) {
					return false;
				}
				if (aCtaOrg[1] === oVars.BanklBBVA) {
					return true;
				}
				if (aCtaOrg[1] === oVars.BanklBMX) {
					return true;
				}
			} catch (ex) {}
			return false;
		},
		//Nombre del layout a generar en confirmación de pago:
		LayoutPaymentN: function (sCtaOrg) {
			var oVars = {
				BanklBBVA: "012",
				BanklBMX: "002",
				BanknCIE: "CIE",
				sSeperate: "|*|"
			};

			try {
				var aCtaOrg = sCtaOrg.split(oVars.sSeperate);
				if (parseInt(aCtaOrg[3]) === 0) {
					return "Ninguno";
				}
				if (aCtaOrg[1] === oVars.BanklBBVA) {
					return "BBVA: CIE";
				}
				if (aCtaOrg[1] === oVars.BanklBMX) {
					return "CitiBanamex: Terceros";
				}
			} catch (ex) {}
			return "Ninguno";
		},
		//Mostrar cta destino a utilizar
		LayoutTransferCtaOrg: function (bBBVAI, bBBVAE, bBMXI, bBMXE, sBankn, sBnkn2) {
			if (bBBVAI && bBBVAE) {
				return sBankn;
			}
			if (bBMXI && bBMXE) {
				return sBnkn2;
			}
			return sBankn + "/" + sBnkn2;
		},

		//Obtiene el texto del formato a generar
		LayoutTransferT: function (bBBVAI, bBBVAE, bBMXI, bBMXE) {
			if (bBBVAI && bBBVAE) {
				return "BBVA: CIE";
			}
			if (bBMXI && bBMXE) {
				return "CitiBanamex: Terceros";
			}
			return "Ninguno";
		},
		//Indica si se va a generar un layout
		LayoutTransfer: function (bBBVAI, bBBVAE, bBMXI, bBMXE) {
			if (bBBVAI && bBBVAE) {
				return true;
			}
			if (bBMXI && bBMXE) {
				return true;
			}
			return false;
		},
		StatusColor: function (sStatus, sSapLinfr) {
			//sSapLinfr es dummy
			switch (sStatus) {
			case "PAG":
				return 'Success';
			case "FIN":
				return 'Warning';
			case "SAL":
				return 'Success';
			default:
				return 'Information';
			}
		}
	};
});