namespace BD.VN.PP.XREL;
using { BD.VN.PP.XMD as XMD } from '../XMD/XMD_VN_PP_001';
using { BD.VN.PP.XCFG as XCFG } from '../XCFG/XCFG_VN_PP_001';
using { BD.VN.PP.XDATA as XDATA } from '../XDATA/XDATA_VN_PP_001';
using { BD.VN.PP.XDDIC as XDDIC } from '../XDDIC/XDDIC_VN_PP_001';
using { BD.VN.PP.XLOG as XLOG } from '../XLOG/XLOG_VN_PP_001';
using { BD.VN.PP.XVIEW as XVIEW } from '../XVIEW/XVIEW_VN_PP_001';
using { BD.VN.PP.XREL as XREL } from '../XREL/XREL_VN_PP_001';

/**
* Tabla relación entre elementos financiados y Cambios de moneda.
*/
entity CurrExItem_001 {
	key finCurrEx		: Association to XDATA.FinancedItemCurrEx_001;
	key finItem			: Association to XDATA.FinancedItems_001;
}


/**
* Tabla relación entre elementos financiados y segundas financieras.
*/
entity SegFinItem_001 {
	key finSec			: Association to XDATA.FinancedItemsSecFin_001;
	key finItem			: Association to XDATA.FinancedItems_001;
}

/**
* Tabla relación entre elementos financiados y traspasos.
*/
entity TransFinItem_001 {
	key finTrans		: Association to XDATA.FinancedItemsTransfers_001;
	key finItem			: Association to XDATA.FinancedItems_001;
}
/*
Tabla de relación entre tipos Financiera y  Tipos de Tasas (Financial services + Rate Types)

En esta tabla se configurará que tipo de tasa estará habilitada para que financiera.

Ejemplo
BCM + LIBOR +  USD
BCM + TIEE +  MXN + 
*/
entity FinRates_001 {
	key finType_finType		: XMD.FinTypes_001.finType;
	key rateType_rate		: XMD.RateTypes_001.rate;
	key currency			: String(4);
	finType					: Association to XMD.FinTypes_001 on $self.finType_finType = finType.finType;
	rateType				: Association to XMD.RateTypes_001 on $self.rateType_rate = rateType.rate;
	fixedVal				: XDDIC.Tasas;
	active					: Boolean;
}
/*
Tabla de relación entre Financiera y  Tipos de Financiamientos (Financial services + Funding Types)

En esta tabla se configurará que tipo de financiamiento estará habilitada para que financiera.

Ejemplo
DEBCA + Financiamiento de Unidad
*/
entity FinFunTypes_001{
	key finSrv_finCode	: XMD.FinSrvs_001.finCode;
	key fundType_ID		: XMD.FundTypes_001.ID;
	fundType			: Association to XMD.FundTypes_001 on $self.fundType_ID = fundType.ID;
	finSrv				: Association to XMD.FinSrvs_001 on $self.finSrv_finCode = finSrv.finCode;
	active				: Boolean;
}