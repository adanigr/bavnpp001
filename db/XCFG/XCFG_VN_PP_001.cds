namespace BD.VN.PP.XCFG;
using { BD.VN.PP.XMD as XMD } from '../XMD/XMD_VN_PP_001';
using { BD.VN.PP.XCFG as XCFG } from '../XCFG/XCFG_VN_PP_001';
using { BD.VN.PP.XDATA as XDATA } from '../XDATA/XDATA_VN_PP_001';
using { BD.VN.PP.XDDIC as XDDIC } from '../XDDIC/XDDIC_VN_PP_001';
using { BD.VN.PP.XLOG as XLOG } from '../XLOG/XLOG_VN_PP_001';
using { BD.VN.PP.XVIEW as XVIEW } from '../XVIEW/XVIEW_VN_PP_001';
using { BD.VN.PP.XREL as XREL } from '../XREL/XREL_VN_PP_001';

/*
Relación de financieras activas para una sociedad
Ejemplo: Ford Tiene activo BBVA
*/
entity FinSrvComps_001
{
  key finServ_finCode  	: XMD.FinSrvs_001.finCode;
  key companyCode  		: String(4);
  finServ				: Association to XMD.FinSrvs_001 on $self.finServ_finCode = finServ.finCode;
  active   				: Boolean;
}
/*
Tipos de financiamiento habilitados por sociedad.
Ejemplo: HYUNDAI puede tener financiamiento Unidades, pero no accesorios
*/
entity FundTypeComps_001
{
  key fundType_ID	: XMD.FundTypes_001.ID;
  key companyCode  	: String;
  fundType  		: Association to  XMD.FundTypes_001 on $self.fundType_ID = fundType.ID;
  active			: Boolean;
}
/*
Subtipos de financiamiento habilitados por sociedad.
Ejemplo: HYUNDAI puede tener financiamiento Unidades nuevas, pero no usadas
*/
entity FundSubTypeComps_001
{
  key fundSubType_ID: XMD.FundSubTypes_001.ID;
  key companyCode  	: String;
  fundSubType		: Association to XMD.FundSubTypes_001 on $self.fundSubType_ID = fundSubType.ID;
  active			: Boolean;
}
/*
Configuración de créditos por financiera. (Financial Credit Configuration)
Guarda el saldo de financiamiento por división, el balance se va restando de acuerdo al subtipo de finaciamiento
*/
entity FinSrvCredits_001 {
  key ID			: UUID;
  sapVKORG			: String;
  finServ		   	: Association to XMD.FinSrvs_001;
  description		: localized String;
  lineMXN   		: XDDIC.Cantidad;
  lineUSD   		: XDDIC.Cantidad;
  balanceMXN		: XDDIC.Cantidad;
  balanceUSD		: XDDIC.Cantidad;
  diffPerMXN		: XDDIC.Tasas;
  diffPerUSD		: XDDIC.Tasas;
  finDays			: Integer;
  graceDays			: Integer;
  flagNew			: Boolean;
  flagUsed			: Boolean;
  flagDemo			: Boolean;
  flagCession		: Boolean;
  flagAccesory		: Boolean;
}
/*
Configuración de cuentas para traspaso (Transfers Accounts Catalog)
Guarda a que cuenta de ingreso o egreso va a verse reflejada la póliza de traspaso dependiendo de la sociedad y centro que se consulte.
*/
entity TransferAccs_001 {
  key center  			: String;
  key finServ_finCode	: XMD.FinSrvs_001.finCode;
  key transType			: String;
  key sapHkont			: String;
  key currency			: String;
  finServ				: Association to XMD.FinSrvs_001 on finServ.finCode = $self.finServ_finCode;
  description			: String;  
  flag1T				: Boolean;
  flagKA				: Boolean;
  flagIntKZ				: Boolean;
  flagTL_KA				: Boolean;
  flagTL_1T				: Boolean;
  flagTL_KA_FE			: Boolean;
  flagTL_1T_FE			: Boolean;
  flagTR_L_BBVA			: Boolean;
  flagTR_L_BMX			: Boolean;
  active				: Boolean;
}
/*
Configuración traspasos logísticos
MMTrans
*/
entity MMTrans_001{
	key center			: String(4);
	key finServ_finCode : XMD.FinSrvs_001.finCode;
	finServ 			: Association to XMD.FinSrvs_001 on $self.finServ_finCode = finServ.finCode;
	flagUpdTable		: Boolean;
}

/*
Configuración documentos FI para Costos (OpeConf)
*/
entity FinOperAccs_001{
	key sapVKORG	:	String(4);
	key sapSEGMENT	:	String(10);
	key sapFINOPER	:	String(6);
	sapHKONT		:	String(10);
	sapKOSTL		:	String(10);
}

/*
Configuración de costos a financiar (CostsFin)
Guarda los tipos de costos de una unidad que sean suceptibles a pólizas en plan piso
*/
entity CostsFin_001 {
  key companyCode		: String(4);
  key fundSubType_ID			: XMD.FundSubTypes_001.ID;
  key costCode			: String(10);
  sap1T_Code			: String;
  sap1T_Text			: String;
  sapKA_Code			: String;
  sapKA_Text			: String;
  itemText				: String;
  fundSubType   		: association to XMD.FundSubTypes_001 on $self.fundSubType_ID = fundSubType.ID;
  active				: Boolean;
}

/**
* Configuración para código de proveedor utilizado en layouts
*/
entity CodPro_001{
	key sapVKORG		: String(4);
	key sapBANKL   		: String(15);
	key finSrv   		: Association to XMD.FinSrvs_001;
	codPro				: String(10);
}
/**
* Configuración para jobs de intereseses
*/
entity InterestJobs_001{
	key sapVKORG		: String(4);
	key period   		: String(6);
	indProvision		: Boolean default false; // Indicador KR provision generado
	indReversal			: Boolean default false; // Indicador KR provision anulado
	indInvoice			: Boolean default false; // Indicador KR generado
	indPayment			: Boolean default false; // Indicador KZ generado
}