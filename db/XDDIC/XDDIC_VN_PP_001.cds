namespace BD.VN.PP.XDDIC;
//Tipo de dato utilizado para cantidades
type Cantidad	: Decimal( 23 , 2);
//Tipo de dato utilizado para entrada de 4 decimales
type CantidadE	: Decimal( 23 , 4);
//Tipo de dato utilizado para tasas 
type Tasas		: Decimal( 23 , 6);
type genMark	: String(15);
type NewActFIjo{
	serial		: String(18) not null;
	plateNum	: String(10) not null;
	unidadID	: UUID not null;
	companyCode	: String(4) not null;
	segment		: String(10) not null;
	center		: String(4) not null;
	dateStart	: Date not null;
	costAmt		: Cantidad not null;
	financedAmt	: Cantidad not null;
	brandCode	: String(10) not null;
	modelCode	: String(10) not null;
	gamaCode	: String(10) not null;
	extColorCode: String(10) not null;
	intColorCode: String(10) not null;
	unitLocation: String(50) not null;
	sapPartner	: String(10) not null;
	currency	: String(3) not null;
	finCode		: String(20) not null;
}
type LayoutList{
	FinancedItems: array of UUID;
	LayoutItems: array of LayoutListItems;
}
type LayoutListItems{
	genMark			: genMark;
	serial			: String;
	layoutName		: String;
	file			: downFiles;
}
type LayoutDownload{
	genMark			: genMark;
	file			: array of downFiles;
}
type downFiles {
	Data			: String;
	FileName		: String;
	FileExtension	: String;
	MimeType		: String;
	Charset			: String;
	ByteOrderMark	: Boolean;
}
//Tabla para intereses
type TablaIntereses{
	finItem_ID		: UUID;
	secuence		: Integer;
	bPayFlag		: Boolean;
	dDateStart		: Date;
	dDateEnd		: Date;
	dDateRate		: Date;
	fBalanceAmt		: XDDIC.Cantidad;
	iYear			: Integer;
	iPeriod			: Integer;
	iDay			: Integer;
	fRateValue		: XDDIC.Tasas;
	iIntDays		: Integer;
	fIntSum			: XDDIC.Cantidad; 
	fAmtPay			: XDDIC.Cantidad; //Cantidad pagada
	fIntPay			: XDDIC.Cantidad; //Cantidad intereses de pago
	
}
//Formato de entrada para operaciones con segunda financiera
type SecFin {
	ID				: UUID;
	oldFinItemID	: UUID;
	oldFinCode		: String(20);
	financedAmt		: XDDIC.Cantidad;	
	graceDays		: Integer;
	finDays			: Integer;
	dateStart		: Date;
	flagReverse		: Boolean;
	finCode			: String;
}
//Formato de entrada para operaciones con recalendarización unidad
type RecalUnit {
	ID				: UUID;
	finItem_ID		: UUID;
	dateStart		: Date;
	finDays			: Integer;
	flagReverse		: Boolean;
	intAmt			: XDDIC.Cantidad;
}
//Formato de entrada para operaciones de registro de pagos
type RegisterPayment {
	ID				: UUID;
	financedItem_ID : UUID;
	unidadID		: UUID;
	datePay			: Date;
	payedAmt		: XDDIC.Cantidad;
	flagConf		: Boolean;
	flagDel			: Boolean;
	intMonthSum		: XDDIC.Cantidad;
	intPayAmt		: XDDIC.Cantidad;
	sapHBKID		: String;
	sapUKONT		: String;
	sapHKTID		: String;
	sapZLSCH		: String;
	fromAcc			: String(200);
	destAcc			: String(200);
}
//Formato de entrada para operaciones con cambio de moneda
type NewCurrEx {
	oldFinItem_ID	: UUID;
	flagReverse		: Boolean;	
	exchangeDate	: Date;
	exchangeRate	: XDDIC.Tasas;
	newCurrency 	: String;
	unidadID		: UUID;
}
//Formato de entrada para operaciones con traspaso financiero
type NewFITrans {
	oldFinItemID		: UUID;
	oldFinCode			: String(20);
	financedAmt			: XDDIC.Cantidad;
	graceDays			: Integer;
	finDays 			: Integer;
	dateStart 			: Date;
	accExpense 			: String(10);
	accIncome 			: String(10);
	newFin_finCode 		: String;
	flagReverse 		: Boolean;
	interestAmt 		: XDDIC.Cantidad;
	flagTR_L_BBVA_I 	: Boolean;
	flagTR_L_BMX_I  	: Boolean;
	flagTR_L_BBVA_E 	: Boolean;
	flagTR_L_BMX_E  	: Boolean;
	flagTR_L_CtaOrg 	: String(200);
	flagTR_L_CtaDest	: String(200);
}
//Formato de entrada para consultar financieras por IDVehiculo
type FinItemsInv {
	Idvehi			: UUID;
	StatusCode		: String;
	StatusText		: String;
	FinCode			: String;
	FinText			: String;
}
//Formato de entrada para operaciones consulta intereses
type InterestPay {
	FinancedItemID	: UUID;
	datePay			: Date;
	payedAmt		: XDDIC.Cantidad;
	intRecalAmt 	: XDDIC.Cantidad;
}
//Formato de entrada para operaciones con tabla de retorno
type FinancedItemCreateMessage{
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
}
//Formato de entrada para operaciones con traspaso logístico
type FinancedItemMMTrans {
	hdid			: UUID not null;
	companyCode		: String not null;
	center			: String not null;
	unidadID		: UUID not null;
}
//Formato de entrada para operaciones con creación nuevo elemento financiado
type FinancedItemCreate	{
	hdId			: UUID not null;
	companyCode		: String not null;
	center			: String not null;
	segment			: String not null;
	serial			: String not null;	
	plateNum		: String not null;
	extColorCode	: String not null;
	intColorCode	: String not null;
	unidadID		: UUID not null;
	currency		: String not null;
	dateStart		: Date not null;
	brandCode		: String not null;
	modelCode		: String not null;
	gamaCode		: String not null;
	unitLocation	: String not null;
	graceDays		: Integer not null;
	fundSubType_ID	: String not null;
	finSrv_finCode	: String not null;
	costs			: array of UnitCreate_Costs;
}
//Formato de entrada para operaciones con creación nuevo elemento financiado
type UnitCreate_Costs	{
	costCode	: String not null;
	costAmt		: CantidadE not null;
	sapBELNRRE	: String(10) not null;
	sapBUKRSRE	: String(4) not null;
	sapGJAHRRE	: String(4) not null;
	sapLIFNRRE	: String(10);
}