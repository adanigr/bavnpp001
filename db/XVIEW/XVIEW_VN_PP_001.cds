namespace BD.VN.PP.XVIEW;
using { BD.VN.PP.XMD as XMD } from '../XMD/XMD_VN_PP_001';
using { BD.VN.PP.XCFG as XCFG } from '../XCFG/XCFG_VN_PP_001';
using { BD.VN.PP.XDATA as XDATA } from '../XDATA/XDATA_VN_PP_001';
using { BD.VN.PP.XDDIC as XDDIC } from '../XDDIC/XDDIC_VN_PP_001';
using { BD.VN.PP.XLOG as XLOG } from '../XLOG/XLOG_VN_PP_001';
using { BD.VN.PP.XVIEW as XVIEW } from '../XVIEW/XVIEW_VN_PP_001';
using { BD.VN.PP.XREL as XREL } from '../XREL/XREL_VN_PP_001';
/*
Ayuda para Visualizar caracteristicas S4
*/
entity ViewS4Charact_001{
	key Charactname		: String(10);
	key ValueCharLong	: String(10);
		DescriptionLong	: String (100);
};
/*
Ayuda para Visualizar Marcas
*/
entity ViewBrandList_001 as SELECT from XDATA.FinancedItems_001 {
	key 	companyCode,
	key 	brandCode,
	brandText
};
/*
Ayuda para VN_SRV_PP_FUNCTION
*/
entity ViewInterestPay_001 as SELECT from XDATA.FinancedItems_001 {
	key ID,
	finSrv.finType.finType as finSrv_finType,
	finSrv.finType.flagUnitPayInterest as flagUnitPayInterest
};
/*
Lista de elementos financiados
*/
entity ViewFinancedItems_001 as SELECT from XDATA.FinancedItems_001 {
	key ID,
	unidadID as unidadID,
	companyCode,
	socTxt,
	center,
	cenTxt,
	segment,
	serial,
	plateNum,
	fundType.ID as fundType_ID,
	fundType.description as fundType_description,
	fundSubType.ID as fundSubType_ID,
	fundSubType.description as fundSubType_description,
	secuence,
	finSrv.finCode as finSrv_finCode,
	finSrv.finType.finType as finSrv_finType,
	finSrv.finType.flagSaveInt as flagSaveInt,
	finSrv.finType.flagSaveIntKR as flagSaveIntKR,
	finSrv.finType.flagSaveIntKZ as flagSaveIntKZ,	
	finSrv.sapLifnr as sapLifnr,
	finSrv.description as finSrv_description,
	status.status as status_status,
	status.description as status_description,
	currency,
	costAmt,
	financedAmt,
	balanceAmt,
	payedAmt,
	rateType.rate as rateType_rate,
	rateValue,
	dateStart,
	dateEnd,
	dateDisplay,
	dateLastPay,
	dateUnitExit,
	brandCode,
	brandText,
	modelCode,
	modelText,
	gamaCode,
	extColorText,
	intColorText,
	unitLocation,
	invoiceNum,
	invoiceDate,
	invoiceCust,
	invoiceCustTxt,
	graceDays,
	recalNum,
	intMonthDay,
	intMonthSum,
	intAllDay,
	intAllSum,
	intSumPay,
	sapBELNR1T,
	sapBELNRKA,
	displayDay
} WHERE(status.status <> 'ANU');

/*
Lista de financieras activas por sociedad
*/
entity ViewFinList_001 as SELECT from XCFG.FinSrvComps_001 {
	key companyCode,
	key finServ.finCode,
	finServ.description,
	finServ.finType,
	finServ.finType.flagSaveInt as flagSaveInt,
	finServ.finType.flagSaveIntKR as flagSaveIntKR,
	finServ.finType.flagSaveIntKZ as flagSaveIntKZ,	
	finServ.sapLifnr
} WHERE (active = true 
	AND finServ.active = true);
/*
Tipos de financiemiento activos por sociedad
*/
entity ViewFunTypeList_001 as SELECT from XCFG.FundTypeComps_001 as FunTypeList{
	key companyCode,
	key fundType.ID,
	fundType.description
} WHERE (active = true
		AND fundType.active = true );
/*
SubTipos de financiemiento activos por sociedad
*/
entity ViewSubFunTypeList_001 as SELECT 
	key fundSubType.ID as fundSubType_ID, 
	key companyCode as companyCode,
	fundSubType.description as description
	from XCFG.FundSubTypeComps_001
	WHERE (active = true AND fundSubType.active = true );
/*
Listado de estatus activos
*/
entity ViewStatusList_001 as SELECT from XMD.Status_001 as StatusList{
	key status,
	description
} WHERE (active = true);

/*
Lista de líneas de crédito por subtipo de financiamiento usado para cálculo de interes
*/
entity ViewFinSrvCredits_001 as SELECT from XCFG.FinSrvCredits_001 {
	key ID,
	sapVKORG,
	finServ.finCode as finServ_finCode,
	description,
	lineMXN,
	lineUSD,
	balanceMXN,
	balanceUSD,
	diffPerMXN,
	diffPerUSD,
	finDays,
	graceDays,
	flagNew,
	flagUsed,
	flagDemo,
	flagCession,
	flagAccesory,
	finServ.finType.flagUnitPayInterest as flagUnitPayInterest,
	finServ.finType.flagRecalUnit as flagRecalUnit,
	finServ.finType.flagSaveInt as flagSaveInt,
	finServ.sapLifnr as sapLifnr
};

/*
Lista de cuentas de ingreso para traspasos:
*/
entity ViewTransferAccsI_001 as SELECT from XCFG.TransferAccs_001 {
	key center,
	key finServ.finCode,
	key sapHkont,
	key currency,
	description,
	flagTR_L_BBVA,
	flagTR_L_BMX
} WHERE (active = true
		AND finServ.active = true 
		AND transType = 'I');
/*
Lista de cuentas de egresos para traspasos:
*/
entity ViewTransferAccsE_001 as SELECT from XCFG.TransferAccs_001 {
	key center,
	key finServ.finCode,
	key sapHkont,
	key currency,
	description,
	flagTR_L_BBVA,
	flagTR_L_BMX
} WHERE (active = true
		AND finServ.active = true 
		AND transType = 'E');		
/*
Lista de tipos de tasa por tipo de financiera y moneda
*/
entity ViewFinRates_001 as SELECT from XREL.FinRates_001{
	key finType.finType as finType,
	key rateType.rate as rate, 
	key currency as currency,
	fixedVal as fixedVal
}WHERE ( active = true 
		AND rateType.active = true);

/*
Listado de costos para abastecimieno de unidades
*/
entity ViewCostsFin_001 as SELECT from XCFG.CostsFin_001 as CostList{
  key companyCode,
  key fundSubType.ID as fundSubType_ID,
  key costCode,
  sap1T_Code,
  sap1T_Text,
  sapKA_Code,
  sapKA_Text,
  itemText
} WHERE (active = true);		

/*
* Listado de tipos de financiamiento activos
*/
entity RateTypes_001 as SELECT from XMD.RateTypes_001 as RateType{
   key rate,
   active
} WHERE (active = true);
