'use strict';
const moment = require('moment-timezone');
const cds = require('@sap/cds');
const destinationName = 'SCP-TO-DEVVIRTUALNEO'
const {
	FilterList,
	serializeEntity,
	retrieveJwt,
	and,
	on,
	groupBy,
	orderBy,
	SUM,
	join
 } = require('@sap-cloud-sdk/core'); //Permite Filtros con multiples registros
 const {
	CreatePolizaPmSet,
	CreatePolizaPmItemSet,
	RetSet,
} = require('./odata-client/z-od-scp-bavnpp-001-service'); // Ubicacion del servicio S4

const {
	FinancedItems_001,
	FinancedItemsPayments_001
} = cds.entities('BD.VN.PP.XDATA');

module.exports = cds.service.impl((srv) => {
	
		srv.on('setS4PolizaPM', async req => {

		var CPOut = {
			documento: "",
		};

	var oDateToday = moment();
 		var oDateStart = moment().startOf('month'); //Inio mes actual
		var oDateEnd = moment().endOf('month'); // Fin mes actual

	   var oDateStartf = oDateStart.format("YYYY-MM-DD") ;
	   var oDateEndf =	oDateEnd.format("YYYY-MM-DD") ;
	   var oDateTodayf = moment().format("YYYYMMDD") ;
	   var oDateYPf = moment().format("YYYYMM") ;
//----------------------------------------------------------------------------------------
		//Seleccionar cabecera              
		let oQuery =  SELECT('BD_VN_PP_XDATA_FINANCEDITEMS_001.COMPANYCODE',
			          'BD_VN_PP_XDATA_FINANCEDITEMS_001.FINSRV_FINCODE',
			          'BD_VN_PP_XDATA_FINANCEDITEMS_001.CURRENCY',
						{
						func: "sum",
						args: ["BD_VN_PP_XDATA_FINANCEDITEMS_001.INTMONTHSUM"],
						as: "interes"
					    },
			          'BD_VN_PP_XCFG_FINOPERACCS_001.SAPFINOPER',
			          'BD_VN_PP_XMD_FINSRVS_001.SAPLIFNR',
			          'BD_VN_PP_XDATA_FINANCEDITEMSPAYMENTS_001.SAPBLARTKZ'
			         )
		 .from('BD_VN_PP_XDATA_FINANCEDITEMSPAYMENTS_001' ) 
		 .join('BD_VN_PP_XDATA_FINANCEDITEMS_001') 
		 .on('BD_VN_PP_XDATA_FINANCEDITEMS_001.ID', '=', 'BD_VN_PP_XDATA_FINANCEDITEMSPAYMENTS_001.FINANCEDITEM_ID')
		 .join('BD_VN_PP_XMD_FINSRVS_001')
		 .on('BD_VN_PP_XDATA_FINANCEDITEMS_001.FINSRV_FINCODE', '=', 'BD_VN_PP_XMD_FINSRVS_001.FINCODE')
		 .join('BD_VN_PP_XCFG_FINOPERACCS_001')
		 .on('BD_VN_PP_XDATA_FINANCEDITEMS_001.CENTER', '=', 'BD_VN_PP_XCFG_FINOPERACCS_001.SAPVKORG')
		 .and('BD_VN_PP_XDATA_FINANCEDITEMS_001.SEGMENT', '=', 'BD_VN_PP_XCFG_FINOPERACCS_001.SAPSEGMENT')
		 .where([{ 	ref: ["SAPBLARTKZ"]}, "=", { val: 'KZ' }
		          , "and", { ref: ["ACTIVE"] }, ">=", {val:  true }
		          , "and", { ref: ["SAPFINOPER"] }, ">=", {val: 'PR_KR' }
		          , "and", {ref: ["DATELASTPAY"] }, ">=", {val: oDateStartf }
		          , "and", {ref: ["DATELASTPAY"] }, "<=", {val: oDateEndf }
		        ])
		 .orderBy({
		     'BD_VN_PP_XDATA_FINANCEDITEMS_001.COMPANYCODE': "desc",
		     'BD_VN_PP_XDATA_FINANCEDITEMS_001.FINSRV_FINCODE': "desc",
		     'BD_VN_PP_XDATA_FINANCEDITEMS_001.CURRENCY': "desc",
		     'BD_VN_PP_XMD_FINSRVS_001.SAPLIFNR': "desc",
		})
	   .groupBy(
			           'BD_VN_PP_XDATA_FINANCEDITEMS_001.COMPANYCODE',
			           'BD_VN_PP_XCFG_FINOPERACCS_001.SAPFINOPER',
			           'BD_VN_PP_XDATA_FINANCEDITEMS_001.CURRENCY',
			           'BD_VN_PP_XDATA_FINANCEDITEMS_001.FINSRV_FINCODE',
			           'BD_VN_PP_XMD_FINSRVS_001.SAPLIFNR',
			           'BD_VN_PP_XDATA_FINANCEDITEMSPAYMENTS_001.SAPBLARTKZ'
		);
	     let oItemsT = await cds.run(oQuery);
	     //console.log("--------------Cabecera-----------------");
		 //console.log(oItemsT);
		 //console.log("--------------fin cabecera-----------------");
//----------------------------------------------------------------------------------------
      //Seleccionar Posiciones
		for (var x of oItemsT ) {
			//----------Obtener items
					let oQuery0 =  SELECT('BD_VN_PP_XDATA_FINANCEDITEMS_001.COMPANYCODE',
			          'BD_VN_PP_XDATA_FINANCEDITEMS_001.CENTER',
			          'BD_VN_PP_XDATA_FINANCEDITEMS_001.SEGMENT',
			          'BD_VN_PP_XDATA_FINANCEDITEMS_001.FINSRV_FINCODE',
			          'BD_VN_PP_XDATA_FINANCEDITEMS_001.CURRENCY',
						{
						func: "sum",
						args: ["BD_VN_PP_XDATA_FINANCEDITEMS_001.INTMONTHSUM"],
						as: "interes"
					    },
			          'BD_VN_PP_XDATA_FINANCEDITEMS_001.BRANDCODE',
			          'BD_VN_PP_XDATA_FINANCEDITEMS_001.CENTXT',
			          'BD_VN_PP_XDATA_FINANCEDITEMS_001.GAMATXT',
			          'BD_VN_PP_XCFG_FINOPERACCS_001.SAPHKONT',
			          'BD_VN_PP_XCFG_FINOPERACCS_001.SAPKOSTL',
			          'BD_VN_PP_XCFG_FINOPERACCS_001.SAPFINOPER',
			          'BD_VN_PP_XDATA_FINANCEDITEMSPAYMENTS_001.SAPBLARTKZ'
			         )
		 .from('BD_VN_PP_XDATA_FINANCEDITEMSPAYMENTS_001' ) 
		 .join('BD_VN_PP_XDATA_FINANCEDITEMS_001') 
		 .on('BD_VN_PP_XDATA_FINANCEDITEMS_001.ID', '=', 'BD_VN_PP_XDATA_FINANCEDITEMSPAYMENTS_001.FINANCEDITEM_ID')
		 .join('BD_VN_PP_XMD_FINSRVS_001')
		 .on('BD_VN_PP_XDATA_FINANCEDITEMS_001.FINSRV_FINCODE', '=', 'BD_VN_PP_XMD_FINSRVS_001.FINCODE')
		 .join('BD_VN_PP_XCFG_FINOPERACCS_001')
		 .on('BD_VN_PP_XDATA_FINANCEDITEMS_001.CENTER', '=', 'BD_VN_PP_XCFG_FINOPERACCS_001.SAPVKORG')
		 .and('BD_VN_PP_XDATA_FINANCEDITEMS_001.SEGMENT', '=', 'BD_VN_PP_XCFG_FINOPERACCS_001.SAPSEGMENT')
		 .where([       { ref: ["COMPANYCODE"] }, "=", { 	val: x.COMPANYCODE }
		         ,"and", { ref: ["FINSRV_FINCODE"]	}, "=", { 	val: x.FINSRV_FINCODE }
		         ,"and", { ref: ["CURRENCY"]	}, "=", { 	val: x.CURRENCY }
		         ,"and", { ref: ["SAPBLARTKZ"]	}, "=", { 	val: x.SAPBLARTKZ}
		         , "and", {ref: ["DATELASTPAY"] }, ">=", {val: oDateStartf }
		         , "and", {ref: ["DATELASTPAY"] }, "<=", {val: oDateEndf }
		         ,"and", { ref: ["SAPFINOPER"]	}, "=", { 	val: x.SAPFINOPER}
		         ,"and", { ref: ["SAPLIFNR"]	}, "=", { 	val: x.SAPLIFNR}
		         ,"and", { ref: ["ACTIVE"]	}, "=", { 	val:  true}
		         ])
		 .orderBy({
		     'BD_VN_PP_XDATA_FINANCEDITEMS_001.COMPANYCODE': "desc",
		     'BD_VN_PP_XDATA_FINANCEDITEMS_001.CENTER': "desc",
		     'BD_VN_PP_XDATA_FINANCEDITEMS_001.FINSRV_FINCODE': "desc",
		     'BD_VN_PP_XDATA_FINANCEDITEMS_001.CURRENCY': "desc",
		     'BD_VN_PP_XDATA_FINANCEDITEMS_001.SEGMENT': "desc",
		     'BD_VN_PP_XCFG_FINOPERACCS_001.SAPHKONT': "desc",
		 	 'BD_VN_PP_XCFG_FINOPERACCS_001.SAPKOSTL': "desc",
		 })
	     .groupBy(
			          'BD_VN_PP_XDATA_FINANCEDITEMS_001.COMPANYCODE',
			          'BD_VN_PP_XDATA_FINANCEDITEMS_001.CENTER',
			          'BD_VN_PP_XDATA_FINANCEDITEMS_001.SEGMENT',
			          'BD_VN_PP_XDATA_FINANCEDITEMS_001.FINSRV_FINCODE',
			          'BD_VN_PP_XDATA_FINANCEDITEMS_001.CURRENCY',
			          'BD_VN_PP_XDATA_FINANCEDITEMS_001.BRANDCODE',
			          'BD_VN_PP_XDATA_FINANCEDITEMS_001.CENTXT',
			          'BD_VN_PP_XDATA_FINANCEDITEMS_001.GAMATXT',
			          'BD_VN_PP_XCFG_FINOPERACCS_001.SAPHKONT',
			          'BD_VN_PP_XCFG_FINOPERACCS_001.SAPKOSTL',
			          'BD_VN_PP_XCFG_FINOPERACCS_001.SAPFINOPER',
			          'BD_VN_PP_XMD_FINSRVS_001.SAPLIFNR',
			          'BD_VN_PP_XDATA_FINANCEDITEMSPAYMENTS_001.SAPBLARTKZ'
		);

		 // Posiciones de Poliza 
	     let oItems = await cds.run(oQuery0);
	        oItems.push(x);
	 
	  
	     //console.log("--------------Posiciones-----------------");
		 //console.log(oItems);
		 //console.log("--------------fin Posiciones-----------------");
 //-------------------------------------------
		            	
		 var itemsets =  oItems.map(z => {
			return CreatePolizaPmItemSet.builder()
				.assignment(z.GAMATXT)
				// .hdid("183912eb-5ca2-4ad1-b270-69fd6e44ddf2")
				.account(z.SAPHKONT)
				.costcenter(z.SAPKOSTL)
				.vendorno(z.SAPLIFNR)
				.itemtext("MB")
				.segment(z.SEGMENT)
				.division(z.CENTER)
				.amount(Number(z.interes))
				.build();
		 });
	       
	       for (var w of itemsets ) {
		       if(	w.assignment  ===    undefined      )
		     	{ w.assignment = '';}
		       if(	w.account  ===    undefined      )
		     	{ w.account = '';}
		       if(	w.costcenter  ===    undefined      )
		     	{ w.costcenter = '';}
		       if( w.vendorno  ===    undefined      )
		     	{ w.vendorno = '';}
		       if( w.segment  ===    undefined      )
		     	{ w.segment = '';}
               if( w.division  ===    undefined      )
		     	{ w.division = '';}		     	
			}
	   	  //console.log("------------itemsets--------------");
		  //console.log(itemsets);
		  //console.log("--------------fin itemsets-----------------");
	     //----------------------------------------------------------------------------
	        //Cabecera de poliza
	     	 var oRefdocno = x.FINSRV_FINCODE.concat(oDateYPf);

			const oPKR= CreatePolizaPmSet.builder()
			.hdtext("PP_Activo_Fijo_Ingreso")
			.company(x.COMPANYCODE)
			.finoper(x.SAPFINOPER)
			.currency(x.CURRENCY)
			.docdate(oDateTodayf)
			.scpuser("BAVNPP001")
			.scpapp("BAVNPP001")
			.refdocno(oRefdocno)
			.createPolizaPmItemSet(itemsets)
			.retSet([])
			.build();
			

	
			  //console.log("-----------oPKR-------------");
		       //console.log(oPKR);
		      //console.log("--------------oPKR-----------------");
	
			let res = await CreatePolizaPmSet.requestBuilder().create(oPKR)
					.execute({  destinationName:  destinationName });
			//console.log("----------servico-------------");
			//console.log(JSON.stringify(res));
		if (res.retSet[0].TYPE === "S") {
			 	CPOut = res.RetSet[0].messageV2.substring(0, 10);
			 	//console.log("---------Respuesta------------");
			   //console.log(CPOut);
			return CPOut;
		} else {
			CPOut.documento = "No se generó documento";
				//console.log("---------Respuesta------------");
			   //console.log(CPOut);
				return CPOut;
		}
		
	     //-----------------------------------------------------------------------------
		
		}// Fin for
});
})