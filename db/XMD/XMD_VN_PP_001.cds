namespace BD.VN.PP.XMD;
using { BD.VN.PP.XMD as XMD } from '../XMD/XMD_VN_PP_001';
using { BD.VN.PP.XCFG as XCFG } from '../XCFG/XCFG_VN_PP_001';
using { BD.VN.PP.XDATA as XDATA } from '../XDATA/XDATA_VN_PP_001';
using { BD.VN.PP.XDDIC as XDDIC } from '../XDDIC/XDDIC_VN_PP_001';
using { BD.VN.PP.XLOG as XLOG } from '../XLOG/XLOG_VN_PP_001';
using { BD.VN.PP.XVIEW as XVIEW } from '../XVIEW/XVIEW_VN_PP_001';
using { BD.VN.PP.XREL as XREL } from '../XREL/XREL_VN_PP_001';
/*
Tipos de servicios financieros - Financial Services Types (FinTypes)
Se utiliza la clave finType para definir el comportamiento de una financiera; por ejemplo Mazda y Scotiabank se comportan igual
Tipos de tasas a utilizar
Banderas para generar documentos SAP FI en distintos eventos
*/
entity FinTypes_001{
	key finType			: String(20);
	description			: localized String;
	finRates			: Association to many XREL.FinRates_001 on  finRates.finType = $self;
	flagUnitPayInterest	: Boolean;	//Bandera de generar intereses al pago/traspaso/recal KR KZ
	flagRecalUnit		: Boolean;	//Bandera de habilitar recalendarización
	flagSaveInt			: Boolean;	//Bandera de habilitar generación interés fin de mes Provisión
	flagSaveIntKR		: Boolean;	//Bandera de habilitar generación interés fin de mes Factura
	flagSaveIntKZ		: Boolean;	//Bandera de habilitar generación interés fin de mes Pago
}
/*
Catalogo de financieras (Financial Services Catalog)
Aquí se van a configurar las distintas financieras que van a trabajar en el cálculo de intereses.  (BCM, STB, STU, etc)
*/
entity FinSrvs_001 {
  key finCode  	: String(20);
  description	: localized String;
  finType		: Association to FinTypes_001;
  sapLifnr		: String(10);
  active		: Boolean;
  finFunTypeRel : Association to many XREL.FinFunTypes_001  on finFunTypeRel.finSrv = $self;
}

/*
Catalogo de tipos de tasas  (Rates Types Catalog)

Aquí se van a configurar los distinto tipos de tasas que se van a tener
TIIE, LIBOR, ETC
*/
entity RateTypes_001 {
  key rate 		: String(20);
  active		: Boolean;
  finRatesRel 	: Association to many XREL.FinRates_001 on  finRatesRel.rateType = $self;
}

/*
Catálogo  para tipos de financiamientos (Funding types)
Aquí se van a configurar los distintos tipos de financimiento  que van a trabajar en el cálculo de intereses. 
Unidades, Accesorios
*/
entity FundTypes_001 {
  key ID			: String(10);
  description		: localized String;
  active			: Boolean;
  subTypes	 		: Association to many FundSubTypes_001 on subTypes.fundType = $self;
  fundTypeComps		: Association to many XCFG.FundTypeComps_001 on fundTypeComps.fundType = $self;
}

/*
Subtipos de financiamiento (Funding Subtypes):
Unidades: Nuevos, Usados, Cesión
Accesorios: Caja, Transformación chásis, etc
*/
entity FundSubTypes_001 {
  key ID			: String(10);
  fundType			: Association to FundTypes_001;
  description		: localized String;
  active			: Boolean;
  fundSubTypeComps	: Association to many XCFG.FundSubTypeComps_001 on fundSubTypeComps.fundSubType = $self;
}
/*
Catalogo de estatus (Status Catalog)
*/
entity Status_001 {
  key status   		: String(10);
  description		: localized String;
  active			: Boolean;
}