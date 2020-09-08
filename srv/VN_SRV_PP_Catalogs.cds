namespace srv.vn.pp;
using { BD.VN.PP.XMD as XMD } from '../db/XMD/XMD_VN_PP_001';
using { BD.VN.PP.XCFG as XCFG } from '../db/XCFG/XCFG_VN_PP_001';
using { BD.VN.PP.XDATA as XDATA } from '../db/XDATA/XDATA_VN_PP_001';
using { BD.VN.PP.XDDIC as XDDIC } from '../db/XDDIC/XDDIC_VN_PP_001';
using { BD.VN.PP.XLOG as XLOG } from '../db/XLOG/XLOG_VN_PP_001';
using { BD.VN.PP.XVIEW as XVIEW } from '../db/XVIEW/XVIEW_VN_PP_001';
using { BD.VN.PP.XREL as XREL } from '../db/XREL/XREL_VN_PP_001';
service CatalogsService {
	@readonly	entity BrandSet as projection on XVIEW.ViewBrandList_001;
	@readonly	entity FinSet as projection on XVIEW.ViewFinList_001;
	@readonly	entity FunTypeSet as projection on XVIEW.ViewFunTypeList_001;
	@readonly	entity SubFunTypeSet as projection on XVIEW.ViewSubFunTypeList_001;
	@readonly	entity StatusSet as projection on XVIEW.ViewStatusList_001;
	@readonly	entity FinSrvCredits as projection on XVIEW.ViewFinSrvCredits_001;
	@readonly   entity TransferAccs_E as projection on XVIEW.ViewTransferAccsE_001;
	@readonly   entity TransferAccs_I as projection on XVIEW.ViewTransferAccsI_001;	
	@readonly	entity FinRates as projection on XVIEW.ViewFinRates_001;
	@readonly	entity CaractSet as projection on XVIEW.ViewS4Charact_001;
	@readonly	entity RateTypes as projection on XVIEW.RateTypes_001;
	@readonly	entity CostsFinSet as projection on XVIEW.ViewCostsFin_001; //DSN
} 