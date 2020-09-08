const cds = require('@sap/cds');
const {
	CaracteriticasSet
} = require('./odata-client/z-od-scp-core-0001-service');
const Helpers = require('./utility/Helpers.js');
const NewFinancedItem = require('./utility/NewFinancedItem.js');
const InterestPay = require('./utility/InterestPay.js');
const FinItemsInv = require('./utility/FinItemsInv.js');
const FinancedItemRev = require('./utility/FinancedItemRev.js');
const FinancedItemsPayments = require('./utility/FinancedItemsPayments.js');
const FinancedItemRecal = require('./utility/FinancedItemRecal.js');
const FinancedItemsTransfer = require("./utility/FinancedItemsTransfer.js");
const FinancedItemsTransferReverse = require("./utility/FinancedItemsTransferReverse.js");
const FinancedItemsSecFinRev = require("./utility/FinancedItemsSecFinRev.js");
const FinancedItemsSecFin = require("./utility/FinancedItemsSecFin.js");
const FinancedItemCurrExRev = require("./utility/FinancedItemCurrExRev.js");
const FinancedItemCurrExSet = require("./utility/FinancedItemCurrExSet.js");
const FinancedItemMMTras = require("./utility/FinancedItemMMTras.js");
const GetTableInterest = require("./utility/GetTableInterest.js");
const LayoutDownload = require("./utility/LayoutDownload.js");
const LayoutManager = require("./utility/LayoutManager.js");
const DoUnitExit = require("./utility/DoUnitExit.js");
const RelatedItems = require("./utility/RelatedItems.js");
const NewFinancedAF = require("./utility/NewFinancedAF.js");
const ReverseInvoice = require('./utility/ReverseInvoice.js');
const nodemailer = require('nodemailer');

const {
	FilterList,
	serializeEntity,
	retrieveJwt,
	and,
	on,
	groupBy,
	orderBy,
	join,
	as,
	alias
} = require('@sap-cloud-sdk/core'); //Permite Filtros con multiples registros

const {
	FinancedInvoice_001,
	FinancedItems_001,
	FinancedItemCurrEx_001,
	FinancedItemsTransfers_001,
	FinancedItemsPayments_001
} = cds.entities('BD.VN.PP.XDATA');

module.exports = cds.service.impl((srv) => {

	srv.on("SendMail", async(req, res) => {
		
		
		var Excel = require('exceljs');
		var AdmZip = require('adm-zip');
		var fs = require('fs');

		const subQuery = SELECT.from(FinancedItems_001, [
			"ID",
			"COMPANYCODE",
			"CENTER",
			"SEGMENT",
			"SECUENCE",
			"SOCTXT",
			"CENTXT",
			"SERIAL",
			"PLATENUM",
			"UNIDADID",
			"HDID",
			"CURRENCY",
			"COSTAMT",
			"FINANCEDAMT",
			"BALANCEAMT",
			"PAYEDAMT",
			"RATEVALUE",
			"DIFFPERC",
			"DATESTART",
			"DATEEND",
			"DATEDISPLAY",
			"DATELASTPAY",
			"DATEUNITEXIT",
			"BRANDCODE",
			"BRANDTEXT",
			"MODELCODE",
			"MODELTEXT",
			"GAMACODE",
			"GAMATXT",
			"EXTCOLORCODE",
			"EXTCOLORTEXT",
			"INTCOLORCODE",
			"INTCOLORTEXT",
			"UNITLOCATION",
			"INVOICENUM",
			"INVOICEDATE",
			"INVOICECUST",
			"INVOICECUSTTXT",
			"GRACEDAYS",
			"RECALNUM",
			"INTMONTHDAY",
			"INTMONTHSUM",
			"INTALLDAY",
			"INTALLSUM",
			"INTSUMPAY",
			"ACCEXPENSE",
			"ACCINCOME",
			"SAPBELNR1T",
			"SAPBUKRS1T",
			"SAPGJAHR1T",
			"SAPBELNRKA",
			"SAPBUKRSKA",
			"SAPGJAHRKA",
			"DISPLAYDAY",
			"FUNDTYPE_ID",
			"FUNDSUBTYPE_ID",
			"FINSRV_FINCODE",
			"STATUS_STATUS",
			"RATETYPE_RATE"
		]);
		/*.where({
			unidadID: 'cc943a38-46e0-4ace-a8fa-19508826c001'
		});*/

		var oResPay = await cds.run(subQuery);
		let jsn = await Promise.all(oResPay);

		//console.log("aRes------------");
		//console.log(oResPay);
		//console.log(jsn);
		
		// creating archives
    	var zip = new AdmZip();
    	//var y = 1;
    	
		for (var y = 0; y < 2; y++) {
			//y++;
			var workbook = new Excel.Workbook();
			const worksheet = workbook.addWorksheet("My Sheet");
			
			worksheet.autoFilter = {from: 'A1', to: 'C1',};
	
			worksheet.columns = [
			  {header: 'CompanyCode', key: 'id', width: 10},
			  {header: 'Status', key: 'name', width: 32}, 
			  {header: 'SAPBELNR1T', key: 'dob', width: 15,}
			];
	
			for (var i = 0; i < jsn.length; i++) {
				//data = data + jsn[i].COMPANYCODE + '\t' + jsn[i].STATUS_STATUS + '\t' + jsn[i].SAPBELNR1T + '\n';
				worksheet.addRow({
					id: jsn[i].COMPANYCODE, 
					name: jsn[i].STATUS_STATUS, 
					dob: jsn[i].SAPBELNR1T
				});
			}
			
			console.log("data------------");
			//console.log(data);
			
			// write to a new buffer
			var buffer = await workbook.xlsx.writeBuffer();
			
			console.log("buffer------------");
			//console.log(buffer);
			
	    	zip.addFile(y+"Ejemplo Provision.xlsx", Buffer.alloc(buffer.length, buffer), "Excel report");
		}
		
    	// get everything as a buffer
    	var willSendthis = zip.toBuffer();

	
		// Use Smtp Protocol to send Email
		let transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 587,
			secure: false,
			auth: {
				/*user: 'adanigr@gmail.com',
				pass: 'ueqsqfnlkdtgahws'*/
				/*user: 'aigarcia@zapata.com.mx',
				pass: 'cctidytajskiiuzk'*/
				user: 'scps4hana@zapata.com.mx',
				pass: 'lyedtwkfilovzhog'
			},
			tls: {
				rejectUnauthorized: true
			}
		});

		//console.log("transporter------------");
		//console.log(transporter);

		let info = await transporter.sendMail({
			from: '"Plan piso SCP" <scps4hana@zapata.com.mx>', // sender address,
			//to: 'aigarcia@zapata.com.mx, adanigr@gmail.com, lachaveza@zapata.com.mx',
			to: 'aigarcia@zapata.com.mx',
			subject: 'Prueba desde SCP',
			//text: 'Prueba desde SCP',
			//html: contentHTML
			html: '<b>Mail with attachments</b>', // html body
			/*attachments: [{
				filename: 'Ejemplo Provision.xlsx',
				content: willSendthis,
				contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			}]*/
			attachments: [{
				filename: 'EjemploProvision.zip',
				content: willSendthis,
				contentType: 'application/zip, application/octet-stream'
			}]
		});

		//console.log("info------------");
		//console.log(info);

		//console.log('Message sent: %s', info.messageId);
		// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

		// Preview only available when sending through an Ethereal account
		//console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

		return req.data;
	});

	// StatusDoc51
	//Servico para Notificar si documento 51 esta financiado y pagado
	srv.on("StatusDoc51", async(req) => {
		const {
			Input51
		} = req.data;

		const waitFor = (ms) => new Promise(r => setTimeout(r, ms));

		var RetMsg = [];
		await Input51.forEach(async x => {
			//Seleccionar vehiculo Financiado
			let oQuery = SELECT('BD_VN_PP_XDATA_FINANCEDINVOICE_001.UNIDADID',
					'BD_VN_PP_XDATA_FINANCEDINVOICE_001.COMPANYCODE',
					'BD_VN_PP_XDATA_FINANCEDINVOICE_001.SERIAL',
					'BD_VN_PP_XDATA_FINANCEDINVOICE_001.SAPBELNRRE',
					'BD_VN_PP_XDATA_FINANCEDINVOICE_001.SECUENCE',
					'BD_VN_PP_XDATA_FINANCEDITEMS_001.SAPBELNR1T',
					'BD_VN_PP_XDATA_FINANCEDITEMS_001.SAPBUKRS1T',
					'BD_VN_PP_XDATA_FINANCEDITEMS_001.SAPGJAHR1T',
					'BD_VN_PP_XDATA_FINANCEDITEMS_001.SAPBELNRKA',
					'BD_VN_PP_XDATA_FINANCEDITEMS_001.SAPBUKRSKA',
					'BD_VN_PP_XDATA_FINANCEDITEMS_001.SAPGJAHRKA',
					'BD_VN_PP_XDATA_FINANCEDITEMS_001.HDID',
					'BD_VN_PP_XDATA_FINANCEDITEMS_001.STATUS_STATUS'
				)
				.from('BD_VN_PP_XDATA_FINANCEDINVOICE_001')
				.join('BD_VN_PP_XDATA_FINANCEDITEMS_001')
				.on('BD_VN_PP_XDATA_FINANCEDINVOICE_001.UNIDADID', '=', 'BD_VN_PP_XDATA_FINANCEDITEMS_001.UNIDADID')
				.and('BD_VN_PP_XDATA_FINANCEDINVOICE_001.COMPANYCODE', '=', 'BD_VN_PP_XDATA_FINANCEDITEMS_001.COMPANYCODE')
				.and('BD_VN_PP_XDATA_FINANCEDINVOICE_001.SECUENCE', '=', 'BD_VN_PP_XDATA_FINANCEDITEMS_001.SECUENCE')
				.where([{
					ref: ['BD_VN_PP_XDATA_FINANCEDITEMS_001', 'UNIDADID']
				}, "=", {
					val: x.unidadID
				}, "and", {
					ref: ['BD_VN_PP_XDATA_FINANCEDITEMS_001', 'STATUS_STATUS']
				}, "=", {
					val: 'FIN'
				}, "and", {
					ref: ['BD_VN_PP_XDATA_FINANCEDINVOICE_001', 'SAPBELNRRE']
				}, "=", {
					val: x.sapBELNRRE
				}])
				.limit(1);

			let oResFinance = await cds.run(oQuery);
			let aRes = await Promise.all(oResFinance);
			if (oResFinance.length === 0) {
				//send message error
				RetMsg.push({
					"HdId": "",
					"Idvehi": x.unidadID,
					"Type": "S",
					"Number": "1",
					"Message": "NO existe financiamiento para " + x.sapBELNRRE,
					"LogNo ": "1",
					"LogMsgNo": "1",
					"MessageV1 ": "No Financiado",
					"MessageV2": "",
					"MessageV3": "",
					"MessageV4": "",
					"Parameter": "FinancedItems_001",
					"Row": "",
					"Field": "",
					"System": "BAVNPP001"
				});

				RetMsg.push({
					"HdId": "",
					"Idvehi": x.unidadID,
					"Type": "E",
					"Number": "",
					"Message": "NO se anulan documentos",
					"LogNo": "1",
					"LogMsgNo": "1",
					"MessageV1": "",
					"MessageV2": "",
					"MessageV3": "",
					"MessageV4": "",
					"Parameter": "FinancedItemsTransfers_001",
					"Row": "",
					"Field": "",
					"System": "BAVNPP001"
				});
			}
			aRes.forEach(async item => {

				RetMsg.push({
					"HdId": item.HDID,
					"Idvehi": x.unidadID,
					"Type": "S",
					"Number": "1",
					"Message": "Para este vehículo Existe Financiemiento " + x.sapBELNRRE,
					"LogNo ": "1",
					"LogMsgNo": "1",
					"MessageV1 ": "Financiado",
					"MessageV2": "",
					"MessageV3": "",
					"MessageV4": "",
					"Parameter": "FinancedItems_001",
					"Row": "",
					"Field": "",
					"System": "BAVNPP001"
				});

				//Validar pago
				const subQuery = SELECT.from(FinancedItemsPayments_001, ["ID"])
					.where({
						unidadID: item.UNIDADID,
						secuence: item.SECUENCE,
						flagDel: false
					});

				var oResPay = await cds.run(subQuery);
				if (oResPay.length === 0) {
					RetMsg.push({
						"HdId": "",
						"Idvehi": x.unidadID,
						"Type": "S",
						"Number": "1",
						"Message": "Documento No Pagado",
						"LogNo": "1",
						"LogMsgNo": "1",
						"MessageV1": "Documento NO Pagado " + x.sapBELNRRE,
						"MessageV2": "",
						"MessageV3": "",
						"MessageV4": "",
						"Parameter": "FinancedItemsPayments_001",
						"Row": "",
						"Field": "",
						"System": "BAVNPP001"
					});
				} else {
					RetMsg.push({
						"HdId": "",
						"Idvehi": x.unidadID,
						"Type": "E",
						"Number": "1",
						"Message": "Documento Pagado",
						"LogNo": "1",
						"LogMsgNo": "1",
						"MessageV1": "Documento Pagado " + x.sapBELNRRE,
						"MessageV2": "",
						"MessageV3": "",
						"MessageV4": "",
						"Parameter": "FinancedItemsPayments_001",
						"Row": "",
						"Field": "",
						"System": "BAVNPP001"
					});
				} //Fin pago

				//validar Moneda
				var oQueryM = SELECT.from(FinancedItemCurrEx_001, ["ID"]).where({
					unidadID: item.UNIDADID,
					secuence: item.SECUENCE,
					flagReverse: false
				});
				var oResM = await cds.run(oQueryM);
				var iItemsM = oResM.length;
				if (iItemsM > 0) {
					RetMsg.push({
						"HdId": "",
						"Idvehi": x.unidadID,
						"Type": "E",
						"Number": "1",
						"Message": "Existen cambios de moneda en plan piso pendientes de anular " + x.sapBELNRRE,
						"LogNo": "1",
						"LogMsgNo": "1",
						"MessageV1": "Total de Cambios de Moneda " + iItemsM,
						"MessageV2": "",
						"MessageV3": "",
						"MessageV4": "",
						"Parameter": "FinancedItemsTransfers_001",
						"Row": "",
						"Field": "",
						"System": "BAVNPP001"
					});
				} else {

					RetMsg.push({
						"HdId": "",
						"Idvehi": x.unidadID,
						"Type": "S",
						"Number": "1",
						"Message": "NO Existen cambios de moneda " + x.sapBELNRRE,
						"LogNo": "1",
						"LogMsgNo": "1",
						"MessageV1": "Total de Cambios de Moneda " + iItemsM,
						"MessageV2": "",
						"MessageV3": "",
						"MessageV4": "",
						"Parameter": "FinancedItemsTransfers_001",
						"Row": "",
						"Field": "",
						"System": "BAVNPP001"
					});

				} //Fin Moneda
				//Valida Traspasos
				var oQueryT = SELECT.from(FinancedItemsTransfers_001, ["ID"]).where({
					unidadID: item.UNIDADID,
					secuence: item.SECUENCE,
					flagReverse: false
				});
				var oResT = await cds.run(oQueryT);
				var iItemsT = oResT.length;
				if (iItemsT > 0) {
					RetMsg.push({
						"HdId": "",
						"Idvehi": x.unidadID,
						"Type": "E",
						"Number": "1",
						"Message": "Taspasos financieros en plan piso pendientes de anular" + x.sapBELNRRE,
						"LogNo": "1",
						"LogMsgNo": "1",
						"MessageV1": "Total de traspasos financieros " + iItemsT,
						"MessageV2": "",
						"MessageV3": "",
						"MessageV4": "",
						"Parameter": "FinancedItemsTransfers_001",
						"Row": "",
						"Field": "",
						"System": "BAVNPP001"
					});
				} else {
					RetMsg.push({
						"HdId": "",
						"Idvehi": x.unidadID,
						"Type": "S",
						"Number": "",
						"Message": "NO Existen traspasos financieros en plan piso pendientes de anular " + x.sapBELNRRE,
						"LogNo": "1",
						"LogMsgNo": "1",
						"MessageV1": "Total de traspasos financieros " + iItemsT,
						"MessageV2": "",
						"MessageV3": "",
						"MessageV4": "",
						"Parameter": "FinancedItemsTransfers_001",
						"Row": "",
						"Field": "",
						"System": "BAVNPP001"
					});
				} //Fin Traspasos

				if (!RetMsg.some(msg => msg.Type == 'E')) {
					var aPromise = [];
					var helper = new ReverseInvoice(
						x.unidadID,
						x.scpuser == null ? "SCPABAP10" : x.scpuser,
						x.scpapp == null ? "BAVNPP001" : x.scpapp,
						item.SAPBELNR1T,
						item.SAPBUKRS1T,
						item.SAPGJAHR1T,
						item.SAPBELNRKA,
						item.SAPBUKRSKA,
						item.SAPGJAHRKA
					);

					aPromise.push(helper.revUnit());

					var res = await Promise.all(aPromise);
					console.log("res-----------------");
					console.log(res);
					res[0].forEach(async resItem => {
						RetMsg.push(resItem);
					});
				} else {
					RetMsg.push({
						"HdId": "",
						"Idvehi": x.unidadID,
						"Type": "E",
						"Number": "",
						"Message": "NO se anulan documentos",
						"LogNo": "1",
						"LogMsgNo": "1",
						"MessageV1": "",
						"MessageV2": "",
						"MessageV3": "",
						"MessageV4": "",
						"Parameter": "FinancedItemsTransfers_001",
						"Row": "",
						"Field": "",
						"System": "BAVNPP001"
					});
				}

			}); //Fin Financiamiento
		}); //Fin recorrido de Posiciones de entrada

		await waitFor(3000);
		return await RetMsg;
	});

	//Servicio para dar de baja la unidad
	srv.on("reverseItem", async(req) => {
		const {
			IDVehi,
			User,
			CallingApp
		} = req.data;
		var aPromise = [];
		var aRetMsg = [];
		IDVehi.forEach(x => {
			var oHelp = new FinancedItemRev(x, User, CallingApp);
			aPromise.push(oHelp.revUnit());
		});
		var oRes = await Promise.all(aPromise);
		oRes.forEach(x => {
			aRetMsg = [...aRetMsg, ...x];
		});
		return aRetMsg;

	});
	//Servicio para obtener lista de layouts relacionados:
	srv.on("getLayoutList", async(req) => {
		const {
			Input
		} = req.data;
		return await LayoutDownload.getRelatedItems(Input);
	});
	//Servicio para obtener items relacionados no incluidos en la consulta original
	srv.on("getRelatedItems", async(req) => {
		const {
			Input
		} = req.data;
		var helper = new RelatedItems(Input);
		return await helper.getRelatedUUIDs();
	});
	//Servicio para validar Segunda Financiera
	srv.on("validateSegFin", async(req) => {
		const {
			unidadID,
			finCode
		} = req.data;
		var aPromise = [];
		aPromise.push(FinancedItemsSecFin.validatePrev(unidadID, finCode));
		aPromise.push(FinancedItemsTransfer.validatePrev(unidadID, finCode));
		var oRes = await Promise.all(aPromise);
		return oRes[0] === true && oRes[1] === true;
	});

	//Servicio para validar FI Transfer
	srv.on("validateFITransf", async(req) => {
		const {
			unidadID,
			finCode
		} = req.data;
		var aPromise = [];
		aPromise.push(FinancedItemsSecFin.validatePrev(unidadID, finCode));
		aPromise.push(FinancedItemsTransfer.validatePrev(unidadID, finCode));
		var oRes = await Promise.all(aPromise);
		return oRes[0] === true && oRes[1] === true;
	});

	//Servicio para dar de alta nuevos elementos
	srv.on("doActFijo", async(req) => {
		const {
			Input
		} = req.data;
		console.time("doActFijo");
		var iOkCount = 0;
		var sUser = "TESTSCP";
		var aCaracts = await NewFinancedAF.getCaracts();
		var oRet = [];
		for (const oActFijo of Input) {
			var helper = new NewFinancedAF(oActFijo, sUser, "BAVNPP001", aCaracts);
			oRet.push(await helper.registerActFij());

		}
		console.timeEnd("doActFijo");
		return oRet;
	});

	//Servicio para descargar layouts:
	srv.on("getLayoutDownload", async(req) => {
		const {
			Input
		} = req.data;
		var aPromise = [];
		console.time("getLayoutDownload");
		for (const oLayoutDownload of Input) {
			try {
				var helper = new LayoutDownload(oLayoutDownload);
				aPromise.push(helper.getLayout());
			} catch (ex) {
				console.log(ex);
				continue;
			}
		}
		var oRes = await Promise.all(aPromise);
		console.timeEnd("getLayoutDownload");
		return oRes;
	});
	//Servicio para marcar salida de unidad
	srv.on("doUnitExit", async(req) => {
		const {
			Input
		} = req.data;
		var aPromise = [];
		console.time("doUnitExit");
		for (const uuidFinancedItem of Input) {
			try {
				var helper = new DoUnitExit(uuidFinancedItem);
				aPromise.push(helper.registerOut());
			} catch (ex) {
				console.log(ex);
				continue;
			}
		}
		var oRes = await Promise.all(aPromise);
		console.timeEnd("doUnitExit");
		return oRes.filter(x => x === true).length;
	});
	//Servicio para obtener tabla de intereses:
	srv.on("getInterestTable", async(req) => {
		console.time("getInterestTable");
		var oRes = [];
		try {
			const {
				IDFinancedItem
			} = req.data;
			var aPromise = [];
			for (const financedItemID of IDFinancedItem) {
				var helper = new GetTableInterest(financedItemID);
				aPromise.push(helper.getTable());
			}
			var oPromise = await Promise.all(aPromise);
			for (const oResult of oPromise) {
				oRes = [...oRes, ...oResult];
			}
		} catch (ex) {
			console.log(JSON.stringify(ex));
			throw ex;
		}
		console.timeEnd("getInterestTable");
		return oRes;
	});
	//Servicio para registrar una segunda financiera
	srv.on("newSecFIn", async(req) => {
		console.time("newSecFIn");
		const {
			Input
		} = req.data;
		//console.log("USER ID", req.user.id);
		var aPromise = [];
		for (const oSecFin of Input) {
			try {
				var helper = new FinancedItemsSecFin(oSecFin, "TESTSCP");
				aPromise.push(helper.createMethodFunction());
			} catch (ex) {
				console.log(ex);
				continue;
			}
		}
		var oRes = await Promise.all(aPromise);
		console.timeEnd("newSecFIn");
		return oRes.filter(x => x === true).length;
	});
	//Servicio para anular recalendarización
	srv.on("revRecal", async(req) => {
		console.time("revRecal");
		const {
			Input
		} = req.data;
		//console.log("USER ID", req.user.id);
		var aPromise = [];
		for (const oRecal of Input) {
			try {
				var helper = new FinancedItemRecal(oRecal, "TESTSCP");
				aPromise.push(helper.reverseMethodFunction());
			} catch (ex) {
				console.log(ex);
				continue;
			}
		}
		var oRes = await Promise.all(aPromise);
		console.timeEnd("revRecal");
		return oRes.filter(x => x === true).length;
	});
	//Servicio para recalendarización
	srv.on("recalUnit", async(req) => {
		console.time("recalUnit");
		const {
			Input
		} = req.data;
		//console.log("USER ID", req.user.id);
		var aPromise = [];
		for (const oRecal of Input) {
			try {
				var helper = new FinancedItemRecal(oRecal, "TESTSCP");
				aPromise.push(helper.createMethodFunction());
			} catch (ex) {
				console.log(ex);
				continue;
			}
		}
		var oRes = await Promise.all(aPromise);
		console.timeEnd("recalUnit");
		return oRes.filter(x => x === true).length;
	});
	//Servicio para anular pago
	srv.on("reversePay", async(req) => {
		console.time("reversePay");
		const {
			Input
		} = req.data;
		//console.log("USER ID", req.user.id);
		var aPromise = [];
		var aInput = await FinancedItemsPayments.getMultiItemsReverse(Input);
		for (const oPayment of aInput) {
			try {
				var helper = new FinancedItemsPayments(oPayment, "TESTSCP");
				aPromise.push(helper.reverseMethodFunction());
			} catch (ex) {
				console.log(ex);
				continue;
			}
		}
		var oRes = await Promise.all(aPromise);
		console.timeEnd("reversePay");
		return oRes.filter(x => x === true).length;
	});
	//Servicio para confirmar pago
	srv.on("confPay", async(req) => {
		console.time("confPay");
		const {
			Input,
			genMark
		} = req.data;
		//console.log("USER ID", req.user.id);
		var aPromise = [];
		/*
		for (const oPayment of Input) {
		try {
		var helper = new FinancedItemsPayments(oPayment, "TESTSCP");
		aPromise.push(helper.confirmMethodFunction());
		} catch (ex) {
		console.log(ex);
		continue;
		}
		}
		 */
		let oItems = await FinancedItemsPayments.getIndivMult(Input);
		for (const oPayment of oItems.Indv) {
			try {
				var helper = new FinancedItemsPayments(oPayment, "TESTSCP");
				aPromise.push(helper.confirmMethodFunction());
			} catch (ex) {
				console.log(ex);
				continue;
			}
		}
		var aResMulti = [];
		for (const oPayment of oItems.Multi) {
			try {
				var helper = new FinancedItemsPayments(oPayment, "TESTSCP");
				var oMultiRes = await helper.multiMethodPayment(oItems.Multi);
				aResMulti.push(oMultiRes);
			} catch (ex) {
				console.log(ex);
				continue;
			}
		}
		var oRes = await Promise.all(aPromise);
		aResMulti = aResMulti.filter(x => x !== false);
		var aPaymentsDone = oRes.filter(x => x !== false);
		aPaymentsDone = [...aPaymentsDone, ...aResMulti];
		try {
			var oLayoutManager = new LayoutManager(genMark, "TESTSCP");
			await oLayoutManager.getPaymentsLayouts(aPaymentsDone);
		} catch (ex1) {
			//La generación de layouts no es primordial
			console.log(ex1);
		}
		console.timeEnd("confPay");
		return aPaymentsDone.length;
	});

	//Servicio para Propuesta de Pago
	srv.on("newPayPro", async(req) => {
		console.time("newPayPro");
		const {
			Input
		} = req.data;
		//console.log("USER ID", req.user.id);
		var aPromise = [];
		for (const oPayment of Input) {
			try {
				var helper = new FinancedItemsPayments(oPayment, "TESTSCP");
				aPromise.push(helper.createMethodFunction());
			} catch (ex) {
				console.log(ex);
				continue;
			}
		}
		var oRes = await Promise.all(aPromise);
		console.timeEnd("newPayPro");
		return oRes.filter(x => x === true).length;
	});
	//Servicio para crear Traspasos de Unidad:
	srv.on("newFITrans", async(req) => {
		console.time("newFITrans");
		const {
			Input,
			genMark
		} = req.data;
		//console.log("USER ID", req.user.id);
		try {
			var aPromises = [];
			for (var oDato of Input) {
				var helper = new FinancedItemsTransfer(oDato, "TESTSCP", Input);
				aPromises.push(helper.createMethodFunction());
			}
			var aPromiseResult = await Promise.all(aPromises);
			var aSend = aPromiseResult.filter(x => x !== false);
			try {
				var oLayoutManager = new LayoutManager(genMark, "TESTSCP");
				await oLayoutManager.getTransferLayouts(aSend);
			} catch (ex1) {
				//La generación de layouts no es primordial
				console.log(ex1);
			}
			console.timeEnd("newFITrans");
			return aSend.length;
		} catch (ex) {
			console.timeEnd("newFITrans");
			console.log("newFITrans", ex);
			return 0;
		}
	});
	//Servicio para crear Cambios de Moneda:
	srv.on("newCurrEx", async(req) => {
		console.time("newCurrEx_all");
		const {
			Input
		} = req.data;
		//console.log("USER ID", req.user.id);
		try {
			var aPromises = [];
			for (var oDato of Input) {
				var helper = new FinancedItemCurrExSet(oDato, "TESTSCP");
				aPromises.push(helper.createMethodFunction());
			}
			var aPromiseResult = await Promise.all(aPromises);
			var aSend = aPromiseResult.filter(x => x !== false);
			if (aSend.length === 0) {
				return 0;
			}
			var totalInsert = await FinancedItemCurrExSet.createMethodFunction_SaveItems(aSend);
			console.timeEnd("newCurrEx_all");
			return totalInsert;
		} catch (ex) {
			console.log(ex);
			return 0;
		}
	});
	//Servicio para ver que sea el último pago:
	srv.on("getLastPay", async(req) => {
		const {
			Input
		} = req.data;
		return FinancedItemsPayments.getLastPaymentConf(Input);
	});
	//Servicio para validar  Currency Exchange en caso de querer anular
	srv.on("checkCurrEx", async(req) => {
		const {
			IdFinItem
		} = req.data;
		var helper = new FinancedItemCurrExRev(IdFinItem, "TESTSCP");
		return await helper.checkRevCurrEx();
	});
	//Servicio para anular Currency Exchange
	srv.on("deleteCurrEx", async(req) => {
		const {
			Input
		} = req.data;
		var total = 0;
		var aPromise = [];
		for (const IdFinItem of Input) {
			var helper = new FinancedItemCurrExRev(IdFinItem, "TESTSCP");
			aPromise.push(helper.deleteCurrEx());
		}
		var aPromiseRes = await Promise.all(aPromise);
		return aPromiseRes.filter(x => x === true).length;
	});
	//Servicio para anular segunda financiera
	srv.on("deleteSecFin", async(req) => {
		const {
			Input
		} = req.data;
		var total = 0;
		for (const IdFinItem of Input) {
			var helper = new FinancedItemsSecFinRev(IdFinItem, "TESTSCP");
			var check_1 = await helper.checkRevSecFin(IdFinItem);
			if (!check_1) {
				continue;
			}
			var check_2 = await helper.deleteSecFin();
			if (!check_2) {
				continue;
			}
			total++;
		}
		return total;
	});
	//Servicio para validar anular segunda financiera
	srv.on("checkRevSecFin", async(req) => {
		const {
			IdFinItem
		} = req.data;
		var helper = new FinancedItemsSecFinRev(IdFinItem, "TESTSCP");
		return await helper.checkRevSecFin();
	});
	//Servicio para app inventario
	srv.on("finItemsInv", async(req) => {
		const {
			IdVehiArray,
			User,
			CallingApp
		} = req.data;
		var res = [];
		//console.log("---CONSULTA----");
		//console.log(JSON.stringify(IdVehiArray));
		//console.log("---CONSULTA----");
		for (const uuidVehicle of IdVehiArray) {
			var helper = new FinItemsInv(uuidVehicle, User, CallingApp);
			await helper.lookupFinancedItem();
			res.push(helper.getResponse());
		}
		return res;
	});
	//Eliminar traspaso
	srv.on("deleteTraItem", async(req) => {
		const {
			Input
		} = req.data;
		var aPromise = [];
		for (const uuidFinancedItem of Input) {
			try {
				var helper = new FinancedItemsTransferReverse(uuidFinancedItem, "TESTSCP");
				aPromise.push(helper.doReverseTransf());
			} catch (ex) {
				console.log(ex);
				continue;
			}
		}
		var oRes = await Promise.all(aPromise);
		return oRes.filter(x => x === true).length;
	});
	//Eliminar propuesta de pago
	srv.on("deleteProPag", async(req) => {
		const {
			Input
		} = req.data;
		var res = 0;
		for (const uuidFinancedItem of Input) {
			try {
				var uuidPayment = await FinancedItemsPayments.getLastPaymentPro(uuidFinancedItem);
				await FinancedItemsPayments.allowDelete(uuidPayment);
				res += await FinancedItemsPayments.doDelete(uuidPayment, uuidFinancedItem);
			} catch (ex) {
				var uuidPayment = await FinancedItemsPayments.fallBackDelPro(uuidFinancedItem);
				console.log(ex);
				continue;
			}
		}
		return res;
	});
	srv.on("getInterestPay", async(req) => {
		const {
			Input
		} = req.data;
		var aRes = [];
		for (const item of Input) {
			try {
				let helper = new InterestPay(item);
				await helper.getFinancedItem();
				await helper.getIntPayAmt();
				aRes.push(helper.getItem());
			} catch (ex) {
				//Si hay error, regresar el mismo elemento recibido.
				console.log("getInterestPay", ex);
				console.log("getInterestPay_item", item);
				aRes.push(item);
			}
		}
		return aRes;
	});
	srv.on("transFinancedItem", async(req) => {
		console.time();
		//Definir destino y JWT (Permisos)
		var oJwt = retrieveJwt(req._.req);
		const {
			Units,
			User,
			CallingApp
		} = req.data;
		var oRet = [];
		for (const Unit of Units) {
			var helper = new FinancedItemMMTras(req, Unit, User, CallingApp);
			oRet = [...oRet, ...await helper.doMMTransfer()];
		}
		console.timeEnd();
		return oRet;
	});
	// Nuevo elemento financiado
	srv.on("newFinancedItem", async(req) => {
		console.time();
		//Definir destino y JWT (Permisos)
		var oJwt = retrieveJwt(req._.req);
		const {
			Units,
			User,
			CallingApp
		} = req.data;
		//console.log("--------------PETICIÓN-----------------");
		//console.log("REQDATA", JSON.stringify(req.data));
		//console.log("--------------PETICIÓN-----------------");
		var aRes = [];
		var aCaracts = [];
		var aPromises = [];
		var aCaractCat = ["ZAP_MARCA", "ZAP_GAMA", "ZAP_MODELO", "ZAP_COLOR_EXTERNO", "ZAP_COLOR_INTERNO"];
		try {
			var oOrFilter = aCaractCat.map(x => {
				return CaracteriticasSet.CHARACTNAME.equals(x);
			});
			//Obtener características:
			var oFilterCaract_1 = new FilterList([], oOrFilter).flatten();
			aCaracts = await CaracteriticasSet.requestBuilder().getAll()
				.filter(oFilterCaract_1)
				.execute({
					destinationName: Helpers.getDestinationName()
				});
		} catch (ex) {
			console.log(ex);
		}
		//Colección de items a insertar:
		var aFinancedItem = [];
		//Colección de objetos generados:
		var aFinacedObjects = [];
		aPromises = [];
		for (const Unit of Units) {
			let index = Units.indexOf(Unit);
			//Instancia de clase de ayuda:
			var helper = new NewFinancedItem(Unit, index, User, CallingApp, aCaracts);
			//Validar entrada
			var oMsg = await helper.validateInput(false);
			if (oMsg.Type !== "S") {
				aRes.push(oMsg);
				continue;
			}
			//Limpiar peticiones previas:
			await helper.clearPreviousExecutions();
			//Llenar objeto a insertar:
			oMsg = await helper.fillFinancedItem(oMsg);
			if (oMsg.Type !== "S") {
				aRes.push(oMsg);
				continue;
			}
			//Generar pólizas en fondo:
			aPromises.push(helper.doPromiseRes(oMsg));
		}
		var oPromiseRet = await Promise.all(aPromises);
		for (var oRet of oPromiseRet) {
			aFinancedItem = [...aFinancedItem, ...oRet.financedItems];
			aRes = [...aRes, ...oRet.logs];
		}
		if (aFinancedItem.length === 0) {
			return aRes;
		}
		aRes = await NewFinancedItem.insertFinancedItems(aFinancedItem, aRes);
		//console.log("--------------RESPUESTA-----------------");
		//console.log(JSON.stringify(aRes));
		console.timeEnd();
		//console.log("--------------RESPUESTA-----------------");
		return aRes;
	});
});