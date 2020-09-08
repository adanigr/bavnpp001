namespace BD.VN.PP.XDATA;
using { BD.VN.PP.XMD as XMD } from '../XMD/XMD_VN_PP_001';
using { BD.VN.PP.XCFG as XCFG } from '../XCFG/XCFG_VN_PP_001';
using { BD.VN.PP.XDATA as XDATA } from '../XDATA/XDATA_VN_PP_001';
using { BD.VN.PP.XDDIC as XDDIC } from '../XDDIC/XDDIC_VN_PP_001';
using { BD.VN.PP.XLOG as XLOG } from '../XLOG/XLOG_VN_PP_001';
using { BD.VN.PP.XVIEW as XVIEW } from '../XVIEW/XVIEW_VN_PP_001';
using { BD.VN.PP.XREL as XREL } from '../XREL/XREL_VN_PP_001';

/* 	// BOM "DSN ID:0001{
Tabla de Facturas financiadas (Ejemplo Docid: "5105614663")  DSN
*/
entity FinancedInvoice_001 {
   key unidadID		: UUID;
   key companyCode	: String(4);
   key center		: String(4);
   key sapBELNRRE   : String(10); //factura 51
   key secuence		: Integer default 0; // secuence	:  String(10); 
       sapLIFNRRE   : String(10); 
       serial		: String; //Chasis o Vin
       currency		: String(3);
}
/* }EOM DSN ID:0001
/*
Tabla de elementos financiados (Financed Items) 
Se van a concentrar las unidades y accesorios suceptibles a ser calculados de intereses en el monitor de plan piso.
*/
entity FinancedItems_001 {
	key ID			: UUID;
	companyCode		: String(4);
	center			: String(4);
	segment			: String(10);
	secuence		: Integer;
	socTxt			: String;
	cenTxt			: String;
	serial			: String;
	plateNum		: String;
	fundType		: Association to XMD.FundTypes_001;
	fundSubType		: Association to XMD.FundSubTypes_001;
	finSrv			: Association to XMD.FinSrvs_001;
	status			: Association to XMD.Status_001;
	unidadID		: UUID;
	hdId			: UUID;
	currency		: String(3);
	costAmt			: XDDIC.Cantidad;
	financedAmt		: XDDIC.Cantidad;
	balanceAmt		: XDDIC.Cantidad;
	payedAmt		: XDDIC.Cantidad;
	rateType		: Association to XMD.RateTypes_001;
	rateValue		: XDDIC.Tasas;
	diffPerc		: XDDIC.Tasas;
	dateStart		: Date;
	dateEnd			: Date;
	dateDisplay		: Date;
	dateLastPay		: Date;
	dateUnitExit	: Date;
	brandCode		: String;
	brandText		: String;
	modelCode		: String;
	modelText		: String;
	gamaCode		: String;
	gamaTxt			: String;
	extColorCode	: String;
	extColorText	: String;
	intColorCode	: String;
	intColorText	: String;
	unitLocation	: String;
	invoiceNum		: String;
	invoiceDate		: Date;
	invoiceCust		: String;
	invoiceCustTxt	: String;
	graceDays		: Integer;
	recalNum		: Integer;
	intMonthDay		: Integer;
	intMonthSum		: XDDIC.Cantidad;
	intAllDay		: Integer;
	intAllSum		: XDDIC.Cantidad;
	intSumPay		: XDDIC.Cantidad;
	accExpense		: String(10); // Cuenta de egreso
	accIncome		: String(10); // cuenta de ingreso
// 	sapBELNRRE      : String(10); //factura 51
	sapBELNR1T		: String(10);
	sapBUKRS1T		: String(4);
	sapGJAHR1T		: String(4);
	sapBELNRKA		: String(10);
	sapBUKRSKA		: String(4);
	sapGJAHRKA		: String(4);
	displayDay		: Boolean default false;
	payments		: Association to many FinancedItemsPayments_001 on payments.financedItem = $self;
}
/*
Recalendarización BBVA (Financed item recal)
Aquí se va a ver la información de los elementos financiados que hayan sido recalendarizados
*/
entity FinancedItemsRecal_001{
	key ID			: UUID;
	secuence		: Integer;
	flagReverse		: Boolean;
	finItem			: Association to FinancedItems_001;
	dateStart		: Date; //Fecha inicio recal
	finDays			: Integer;	// Dias de financiamiento
	intAmt			: XDDIC.Cantidad;
	oldDateStart	: Date; //Fecha inicio original
	oldDateEnd		: Date; //Fecha fin original
	logTime			: DateTime default CURRENT_TIMESTAMP;
}
/*
Segunda Financiera (Financed Items Second Finance)
Registro de  elementos financiados que hayan refinanciado posterior a terminar el primer financiamiento
*/
entity FinancedItemsSecFin_001{
	key ID			: UUID;
	secuence		: Integer;
	flagReverse		: Boolean;
	oldFinItemID	: UUID; // ID a refinanciar
	oldFinCode		: String(20); //ID código financiera
	financedAmt		: XDDIC.Cantidad; //Importe a financiar
	graceDays		: Integer; //Días de gracia
	finDays			: Integer;	// Dias de financiamiento
	dateStart		: Date; //Fecha inicio traspaso
	dateTransfer	: Date; //Se registra en servidor
	finCode			: String;
	sapBELNR1T		: String(10);
	sapBUKRS1T		: String(4);
	sapGJAHR1T		: String(4);
	sapSTBLG1T		: String(10);
	accIncome		: String(10); // cuenta de ingreso
	unidadID		: UUID;
	newFinItem		: Association to FinancedItems_001;
	logTime			: DateTime default CURRENT_TIMESTAMP;
}
/*
Traspaso de elementos financiados (Financed Items Transfer)

Aquí se va a ver la información de los elementos financiados que hayan sido traspasados
*/
entity FinancedItemsTransfers_001{
	key ID			: UUID;
	secuence		: Integer;
	flagReverse		: Boolean;
	oldFinItemID	: UUID; // ID a traspasar
	oldFinCode		: String(20); //ID código financiera
	financedAmt		: XDDIC.Cantidad; //Importe a financiar
	graceDays		: Integer; //Días de gracia
	finDays			: Integer;	// Dias de financiamiento
	dateStart		: Date; //Fecha inicio traspaso
	oldBalance		: XDDIC.Cantidad;
	interestAmt		: XDDIC.Cantidad;
	accExpense		: String(10); // Cuenta de egreso
	accIncome		: String(10); // cuenta de ingreso
	newFin			: Association to XMD.FinSrvs_001; //financiera nueva (newfin_finCode) 	
	dateTransfer	: Date; //Se registra en servidor
	sapBELNR1T		: String(10);
	sapBUKRS1T		: String(4);
	sapGJAHR1T		: String(4);
	sapSTBLG1T		: String(10);
	sapBELNRKA		: String(10);
	sapBUKRSKA		: String(4);
	sapGJAHRKA		: String(4);
	sapSTBLGKA		: String(10);
	unidadID		: UUID;
	newFinItem		: Association to FinancedItems_001;
	logTime			: DateTime default CURRENT_TIMESTAMP;
}
/*
Pagos hechos a elementos financiados (Financed Items Payments)
Registro de pagos realizados a un elemento financiado.
*/
entity FinancedItemsPayments_001{
	key ID			: UUID;
	secuence		: Integer;
	flagDel			: Boolean; 
	flagMulti		: Boolean default false; //Pago Múltiple
	financedItem	: Association to FinancedItems_001; //financedItem_ID
	unidadID		: UUID;
	flagConf		: Boolean; 
	datePay			: Date;
	financedAmt		: XDDIC.Cantidad;	
	balanceAmt		: XDDIC.Cantidad;
	payedAmt		: XDDIC.Cantidad;
	intMonthDay		: Integer;
	intMonthSum		: XDDIC.Cantidad;
	intPayAmt		: XDDIC.Cantidad;
	oldLastPay		: Date;
	sapBELNRKZ		: String(10);
	sapBUKRSKZ		: String(4);
	sapGJAHRKZ		: String(4);
	sapBLARTKZ		: String(2);
	sapSTBLGKZ		: String(10);
	sapBELNRFD		: String(10);
	sapBUKRSFD		: String(4);
	sapGJAHRFD		: String(4);
	sapBLARTFD		: String(2);	
	sapSTBLGFD		: String(10);	
	sapHBKID		: String(15);
	sapUKONT		: String(15);
	sapHKTID		: String(15);
	sapZLSCH		: String(15);
	fromAcc			: String(200);
	destAcc			: String(200);
	userPro			: String;
	userPay			: String;
}
/*
Valores para tipos de tasa (Rate Types Values)
*/
entity RateTypesValues_001{
	key rate		: String; 
	key date		: Date;
	rateValue		: XDDIC.Tasas;
}
/*
Cambiar moneda para un elemento financiado (Currency Exchange)
Registrar los cambios de moneda que se ralizan a tipo de cambio pactado, pasar un financiamiento de USD a MXN considerando el saldo a financiar.
*/
entity FinancedItemCurrEx_001{
	key ID			: UUID;
	secuence		: Integer;
	unidadID		: UUID;
	flagReverse		: Boolean;
	exchangeDate	: Date;
	exchangeRate	: XDDIC.Tasas;
	newCurrency		: String(3);
	oldCost			: XDDIC.Cantidad;
	oldAmount		: XDDIC.Cantidad;
	oldBalance		: XDDIC.Cantidad;
	oldPayed		: XDDIC.Cantidad;
	sapBUKRS1T		: String(4);	
	sapBELNR1T		: String(10);
	sapGJAHR1T		: String(4);
	sapSTBLG1T		: String(10);
	sapBUKRSKA		: String(4);	
	sapBELNRKA		: String(10);
	sapGJAHRKA		: String(4);
	sapSTBLGKA		: String(10);
	oldFinItem		: Association to FinancedItems_001;
	newFinItem		: Association to FinancedItems_001;
	logTime			: DateTime default CURRENT_TIMESTAMP;
}
/*
Traspaso Logístico de unidad (Financed Materials Management Transfer)
Se almacenan los traspasos logísticos recibidos de la APP de inventario.
Cuando se realiza el traspaso de la deuda, se necesita generar un nuevo elemento financiado en el centro destino y anular el financimianeto en el centro original
*/
entity FinancedMMTransfer_001{
	key ID			: UUID;
	flagReverse		: Boolean;
	sapBUKRS1T		: String(4);	
	sapBELNR1T		: String(10);
	sapGJAHR1T		: String(4);
	sapBLART1T		: String(2);	
	sapSTBLG1T		: String(10);
	sapBUKRSKA		: String(4);	
	sapBELNRKA		: String(10);
	sapGJAHRKA		: String(4);
	sapBLARTKA		: String(2);
	sapSTBLGKA		: String(10);	
	oldFinItem 		: Association to FinancedItems_001;
	newFinItem 		: Association to FinancedItems_001;	
	logTime			: DateTime default CURRENT_TIMESTAMP;
}
/*
Intereses de Elemento financiado (Financed Interests)
Registrar los documentos financieros generados por periodo correspondientes a un saldo financiado
*/
entity FinancedInterest_001{
	key ID			: UUID;
	flagReverse		: Boolean;
	finItem 		: Association to FinancedItems_001;
	sapGJAHR		: String(4);
	sapMONAT		: String(2);
	interestAmt		: XDDIC.Cantidad;
	flagGen			: Boolean;
	flagTra			: Boolean;
	flagPay			: Boolean;
	flagCal			: Boolean;
	sapBELNRKR		: String(10);
	sapBUKRSKR		: String(4);
	sapGJAHRKR		: String(4);
	sapBLDATKR		: Date;
	sapSTBLGKR		: String(10);
	sapBELNRKZ		: String(10);
	sapBUKRSKZ		: String(4);
	sapGJAHRKZ		: String(4);
	sapBLDATKZ		: Date;
	sapSTBLGKZ		: String(10);
	relItem			: UUID;
	logTime			: DateTime default CURRENT_TIMESTAMP;
}
/**
Cabecera para layouts generados
*/
entity LayoutHeader_001 {
	key ID			: UUID;
	flagDel			: Boolean;
	companyCode		: String(4);
	center			: String(4);
	title			: String(50);
	genMark			: XDDIC.genMark;
	downCount		: Integer;
	logTime			: DateTime default CURRENT_TIMESTAMP;
	genUser			: String;
	file			: LargeString;
	fileName		: String(100);
	fileMime		: String(50);
	fileExt			: String(10);
	fileCharset		: String(20);
	units			: Association to many LayoutUnits_001 on units.layoutHead = $self;
}
/**
Lista de unidades relacionadas con un layout generado
*/
entity LayoutUnits_001 {
	key ID			: UUID;
	layoutHead		: Association to LayoutHeader_001;
	unidadID		: UUID;
	relatedID		: UUID;
}
/*
Intereses por segmento y sociedad SegmentInterests
Registrar los documentos financieros generados por periodo correspondientes a saldo financiado
*/
entity SegmentInterests_001{
	key ID			: UUID;
	finCode			: XMD.FinSrvs_001.finCode;
	currency		: String(3);
	sapVKORG		: String(4);
	sapGJAHR		: String(4);
	sapMONAT		: String(2);
	sapSEGMENT		: String(10);
	docAmt			: XDDIC.Cantidad;
	sapBELNRKZ		: String(10);
	sapBUKRSKZ		: String(10);
	sapGJAHRKZ		: String(10);
	sapSTBLGKZ		: String(10);
	logTime			: DateTime default CURRENT_TIMESTAMP;	
}