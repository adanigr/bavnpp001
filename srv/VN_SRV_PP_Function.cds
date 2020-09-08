namespace srv.vn.pp;
using { BD.VN.PP.XMD as XMD } from '../db/XMD/XMD_VN_PP_001';
using { BD.VN.PP.XCFG as XCFG } from '../db/XCFG/XCFG_VN_PP_001';
using { BD.VN.PP.XDATA as XDATA } from '../db/XDATA/XDATA_VN_PP_001';
using { BD.VN.PP.XDDIC as XDDIC } from '../db/XDDIC/XDDIC_VN_PP_001';
using { BD.VN.PP.XLOG as XLOG } from '../db/XLOG/XLOG_VN_PP_001';
using { BD.VN.PP.XVIEW as XVIEW } from '../db/XVIEW/XVIEW_VN_PP_001';
using { BD.VN.PP.XREL as XREL } from '../db/XREL/XREL_VN_PP_001';
service FunctionService {

	    // BOM DSN ID:0001{
	    //Servico para Notificar si documento 51 esta financiado y pagado

	    
	    	type RetMsg{
	HdId			: String;
	Idvehi			: String;
	Type			: String;
	Id				: String;
	Number			: String;
	Message			: String;
	LogNo			: String;
	LogMsgNo		: String;
	MessageV1		: String;
	MessageV2		: String;
	MessageV3		: String;
	MessageV4		: String;
	Parameter		: String;
	Row				: String;
	Field			: String;
	System			: String;
}; @anArray: [RetMsg]

type Doc51{
	    companyCode	: String(4) not null;
		sapBELNRRE   : String(10); //factura 51
		unidadID	: UUID not null;
		scpuser:  String(10);
		scpapp:  String(10);
	};
  
	action StatusDoc51 (Input51: array of Doc51) 	returns array of RetMsg;
    // }EOM DSN ID:0001
    
    action SendMail (Input: String) returns String;

	//Servicio listar layouts relacionados
	action reverseItem			(IDVehi: array of UUID, User: String, CallingApp: String) 
								returns array of XDDIC.FinancedItemCreateMessage;
	//Servicio listar layouts relacionados
	action getLayoutList		(Input: array of UUID)
								returns array of XDATA.LayoutHeader_001;
	//Servicio para obtener elementos relacionados
	action getRelatedItems		(Input: array of UUID)
								returns array of XVIEW.ViewFinancedItems_001;
	//Servicio para validar segunda financiera
	action validateSegFin	 	(unidadID: UUID, finCode: String)
								returns Boolean;
	//Servicio para validar financiera a traspasar
	action validateFITransf 	(unidadID: UUID, finCode: String)
								returns Boolean;
	//Servicio para generar activo fijo
	action doActFijo			(Input: array of XDDIC.NewActFIjo)
								returns array of XDDIC.FinancedItemCreateMessage;
	//Servicio para descargar layouts
	action getLayoutDownload	(Input:  array of XDDIC.LayoutDownload)
								returns array of XDDIC.LayoutDownload;
	//Servicio para salida de unidad:
	action doUnitExit			(Input: array of UUID)
								returns Integer;
	//Obtiene tabla de intereses:
	action getInterestTable 	(IDFinancedItem: array of UUID ) 
								returns array of XDDIC.TablaIntereses;
	//Obtiene los intereses a pagar
	action	getInterestPay		(Input: array of XDDIC.InterestPay ) 
								returns array of XDDIC.InterestPay;
	// Genera un nuevo elemento finaciado
	action	newFinancedItem		(Units: array of XDDIC.FinancedItemCreate, User: String, CallingApp: String) 
								returns array of XDDIC.FinancedItemCreateMessage;
	//Registra un traspaso logístico
	action	transFinancedItem	(Units: array of XDDIC.FinancedItemMMTrans, User: String, CallingApp: String) 
								returns array of XDDIC.FinancedItemCreateMessage;
	//Elimina un traspaso financiero
	action	deleteTraItem 		(Input: array of UUID) 
								returns Integer;
	//Elimina una propuesta de pago
	action	deleteProPag		(Input: array of UUID) 
								returns Integer;
	//Realiza un traspaso logístico
	action	finItemsInv			(IdVehiArray: array of UUID, User: String, CallingApp: String)
								returns array of XDDIC.FinItemsInv;
	//Verifica si es posible anular segunda financiera
	action	checkRevSecFin		(IdFinItem : UUID) 
								returns Boolean;
	//Verifica si es posible anular cambio de moneda
	action	checkCurrEx			(IdFinItem : UUID) 
								returns Boolean;
	//obtiene el ID del último pago realizado
	action	getLastPay			(Input: UUID) 
								returns UUID;
	//Anula segunda financiera
	action	deleteSecFin		(Input: array of UUID) 
								returns Integer;
	//Anula cambio de moneda
	action	deleteCurrEx		(Input: array of UUID) 
								returns Integer;
	//Registra un cambio de moneda
	action	newCurrEx 			(Input: array of XDDIC.NewCurrEx) 
								returns Integer;
	//Registra un traspaso financiero
	action	newFITrans			(Input: array of XDDIC.NewFITrans, genMark: XDDIC.genMark) 
								returns Integer;
	//Registra una nueva propuesta de pago
	action	newPayPro 			(Input: array of XDDIC.RegisterPayment ) 
								returns Integer;
	//Registra una confirmación de pago
	action	confPay				(Input: array of XDDIC.RegisterPayment, genMark: XDDIC.genMark) 
								returns Integer;
	//Anula un pago
	action	reversePay			(Input: array of XDDIC.RegisterPayment ) 
								returns Integer;
	//Registra una nueva recalendarización
	action	recalUnit			(Input: array of XDDIC.RecalUnit ) 
								returns Integer;
	//Anula una recalendarización
	action	revRecal			(Input: array of XDDIC.RecalUnit ) 
								returns Integer;
	//Registra una segunda financiera
	action	newSecFIn			(Input: array of XDDIC.SecFin ) 
								returns Integer;

   
}