namespace srv.vn.pp;
using { BD.VN.PP.XMD as XMD } from '../db/XMD/XMD_VN_PP_001';
using { BD.VN.PP.XCFG as XCFG } from '../db/XCFG/XCFG_VN_PP_001';
using { BD.VN.PP.XDATA as XDATA } from '../db/XDATA/XDATA_VN_PP_001';
using { BD.VN.PP.XDDIC as XDDIC } from '../db/XDDIC/XDDIC_VN_PP_001';
using { BD.VN.PP.XLOG as XLOG } from '../db/XLOG/XLOG_VN_PP_001';
using { BD.VN.PP.XVIEW as XVIEW } from '../db/XVIEW/XVIEW_VN_PP_001';
using { BD.VN.PP.XREL as XREL } from '../db/XREL/XREL_VN_PP_001';
service ConfigService {
	entity RateTypesValues_001 as select from XDATA.RateTypesValues_001 {*} order by date desc;
	entity FinTypes_001 as select from XMD.FinTypes_001 {*} order by finType asc;
	entity FinSrvs_001 as select from XMD.FinSrvs_001 {*} order by finCode asc;
	entity FundTypes_001 as select from XMD.FundTypes_001 {*} order by ID asc;
	entity FundSubTypes_001 as select from XMD.FundSubTypes_001 {*} order by ID asc;
	entity RateTypes_001 as select from XMD.RateTypes_001 order by rate asc;
	entity CodPro_001 as select from XCFG.CodPro_001 order by sapVKORG, sapBANKL, finSrv asc;
	entity CostsFin_001 as select from XCFG.CostsFin_001 order by companyCode, fundSubType_ID, costCode asc;
	entity FinOperAccs_001 as select from XCFG.FinOperAccs_001 order by sapVKORG, sapSEGMENT, sapFINOPER asc;
	entity FinSrvComps_001 as select from XCFG.FinSrvComps_001 order by finServ_finCode, companyCode asc;
	entity FinSrvCredits_001 as select from XCFG.FinSrvCredits_001 order by sapVKORG, finServ.finCode asc;	
	entity FundTypeComps_001 as select from XCFG.FundTypeComps_001 order by companyCode, fundType_ID asc;	
	entity FundSubTypeComps_001 as select from XCFG.FundSubTypeComps_001 order by companyCode, fundSubType_ID asc;	
	entity MMTrans_001 as select from XCFG.MMTrans_001 order by center, finServ_finCode asc;
	entity TransferAccs_001 as select from XCFG.TransferAccs_001 order by center, finServ_finCode, transType, sapHkont, currency asc;
	entity FinFunTypes_001 as select from XREL.FinFunTypes_001 order by finSrv_finCode, fundType_ID asc;
	entity FinRates_001 as select from XREL.FinRates_001 order by finType_finType, rateType_rate, currency asc;
} 