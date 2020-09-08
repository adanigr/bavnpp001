namespace srv.vn.pp;
using { BD.VN.PP.XMD as XMD } from '../db/XMD/XMD_VN_PP_001';
using { BD.VN.PP.XCFG as XCFG } from '../db/XCFG/XCFG_VN_PP_001';
using { BD.VN.PP.XDATA as XDATA } from '../db/XDATA/XDATA_VN_PP_001';
using { BD.VN.PP.XDDIC as XDDIC } from '../db/XDDIC/XDDIC_VN_PP_001';
using { BD.VN.PP.XLOG as XLOG } from '../db/XLOG/XLOG_VN_PP_001';
using { BD.VN.PP.XVIEW as XVIEW } from '../db/XVIEW/XVIEW_VN_PP_001';
using { BD.VN.PP.XREL as XREL } from '../db/XREL/XREL_VN_PP_001';
service OperationsService{
	entity FinancedItemsPaymentsSet as projection on XDATA.FinancedItemsPayments_001;
	entity FinancedItemsSet			as projection on XDATA.FinancedItems_001;
	entity FinancedItemBBVA 		as projection on XDATA.FinancedInterest_001;
};