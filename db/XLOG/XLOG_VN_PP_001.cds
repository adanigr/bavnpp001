namespace BD.VN.PP.XLOG;
using { BD.VN.PP.XMD as XMD } from '../XMD/XMD_VN_PP_001';
using { BD.VN.PP.XCFG as XCFG } from '../XCFG/XCFG_VN_PP_001';
using { BD.VN.PP.XDATA as XDATA } from '../XDATA/XDATA_VN_PP_001';
using { BD.VN.PP.XDDIC as XDDIC } from '../XDDIC/XDDIC_VN_PP_001';
using { BD.VN.PP.XLOG as XLOG } from '../XLOG/XLOG_VN_PP_001';
using { BD.VN.PP.XVIEW as XVIEW } from '../XVIEW/XVIEW_VN_PP_001';
using { BD.VN.PP.XREL as XREL } from '../XREL/XREL_VN_PP_001'; 
/*
Registro de documentos financieros generados (Financial generated documents log)
Se tendrá un registro de todos los documentos SAP Generados
*/
entity FIGenDocs_001 { 
  key ID		: UUID;
  unidadID		: UUID;  
  hdId			: UUID;
  BELNR   		: String;
  BUKRS			: String;
  GJAHR			: String;
  BLART			: String;
  STBLG			: String;
  logDate		: DateTime default CURRENT_TIMESTAMP;
  logUser		: String;
  logText		: String;
  logProc		: String;
}
/*
Registro de errores al generar documentos financieros (FI Error Doc log)
Registro de los errores relacionados con la generación de documentos FI
*/
entity FIErrDocs_001 { 
	key ID		: UUID;
	docLog		: UUID;
	logDate		: DateTime default CURRENT_TIMESTAMP;
	idvehi		: UUID;
	type		: String(1);
	idsap		: String(4);
	number		: String(4);
	message		: String;
	logNo		: String;
	logMsgNo	: String;
	messageV1	: String;
	messageV2	: String;
	messageV3	: String;
	messageV4	: String;
	parameter	: String;
	row			: String;
	field		: String;
	system		: String;
}