/**
 * @file Controlador Confirmar Pago.
 * @author Javier Balcazar Cruz <jbalcazar@zapata.com.mx>.
 * Notación JSDoc para Funciones, Parametros, Objetos, etc.
 * @param {param type} param name - description.
 */
/** 
 * sap.ui.define:
 * @module ManagedObject
 * @module Fragment
 * @module MessageBox
 * @module History
 * @module MessageToast
 * @module Filter
 * @module FilterOperator
 * @module JSONModel
 */
sap.ui.define([
		"sap/ui/base/ManagedObject",
		"sap/ui/core/Fragment",
		"sap/m/MessageBox",
		"sap/ui/core/routing/History",
		"sap/m/MessageToast",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator",
		"sap/ui/model/json/JSONModel"
	],
	function (ManagedObject, Fragment, MessageBox, History, MessageToast, Filter, FilterOperator, JSONModel) {
		"use strict";
		/**
		 *  Functión Principal
		 * @author Javier Balcazar Cruz 
		 * @param  {module} ManagedObject - Clase base que introduce algunos conceptos básicos, como la gestión del estado y el enlace de datos.
		 * @param  {module} Fragment - Se usa dentro de Vistas declarativas.
		 * @param  {module} MessageBox - Proporciona métodos más fáciles para crear alertas, diálogos de confirmación o diálogos de mensajes arbitrarios etc. 
		 * @param  {module} History - Crea una instancia de la historia.
		 * @param  {module} MessageToast - Ventana emergente pequeña y no disruptiva para mostrar mensajes.
		 * @param  {module} Filter - Permite hacer uso de filtros.
		 * @param  {module} FilterOperator - Pperador para los filtros.
		 * @param  {module} JSONModel - Implementación del modelo para formato JSON.	
		 * @desc   Función principal de Activo Fijo.
		 * @return {class} - Retorna controller.DialogConfPag .
		 */
		return ManagedObject.extend("vn.pp.ux_vn_pp_monitor.controller.DialogActFijo", {
			//-------------------------------------------------------------------
			//	Eventos estándar UI5:
			//-------------------------------------------------------------------	
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name constructor 
			 * @param  {event} oView - Recibe Evento y ejecutala función.
			 * @desc Se inicializan propiedades y variables al al abrir la vista DialogActFijo.
			 */
			constructor: function (oView) {
				this._oView = oView;
				this._oControl = sap.ui.xmlfragment(oView.getId(), "vn.pp.ux_vn_pp_monitor.view.DialogActFijo", this);
				this._bInit = false;
				this._i18n = this.getView().getModel("i18n").getResourceBundle();
			},
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name exit
			 * @desc 
			 */
			exit: function () {
				delete this._oView;
			},
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name getView
			 * @desc 
			 * @return {object} - Retorna _oView.
			 */
			getView: function () {
				return this._oView;
			},
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name getControl
			 * @desc 
			 * @return {object} - Retorna _oControl.
			 */
			getControl: function () {
				return this._oControl;
			},
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name getOwnerComponent
			 * @desc 
			 *  @return {object} - Retorna ._oView.getController().getOwnerComponent();
			 */
			getOwnerComponent: function () {
				return this._oView.getController().getOwnerComponent();
			},

			//-------------------------------------------------------------------
			//	Funcionalidad para dialogo:
			//-------------------------------------------------------------------			
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name open
			 * @desc Abrir dialogo, agregar dependientes y modelos en Activo Fijo.
			 */
			open: function () {
				var oView = this._oView;
				var oControl = this._oControl;
				if (!this._bInit) {
					// Initialize our fragment
					this.onInit();
					this._bInit = true;
					// connect fragment to the root view of this component (models, lifecycle)
					oView.addDependent(oControl);
				}
				var args = Array.prototype.slice.call(arguments);
				if (oControl.open) {
					oControl.open.apply(oControl, args);
				} else if (oControl.openBy) {
					oControl.openBy.apply(oControl, args);
				}
			},
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name close
			 * @param {undefined} bRefresh - Si es Undefined se cierra el dialogo.
			 * @desc Cierra el Dialog Propuesta de Pago.
			 * @return {void}
			 */
			close: function (bRefresh) {
				if (bRefresh === undefined || !bRefresh) {
					this._oControl.close();
					return;
				}
				//Actualizar Servicio
				var oController = this.getView("View1").getController();
				oController.onSearch(null);
				this._oControl.close();
			},
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name setRouter
			 * @param {oRouter} oRouter - 
			 * @desc Obtener ruta de navegación
			 */
			setRouter: function (oRouter) {
				this.oRouter = oRouter;
			},
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name getBindingParameters
			 * @desc 
			 * @return {void}
			 */
			getBindingParameters: function () {
				return {};
			},
			//-------------------------------------------------------------------
			//	Funcionalidad para botones:
			//-------------------------------------------------------------------		
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name ActFij_PPSet
			 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
			 * @desc  consult information on the VIN and the society entered by the user in the service.
			 */
			ActFij_PPSet: function (oEvent) {
				//Se obtiene el modelo
				var oModel = this.getView().getModel("ActFijoCollection");
				//arreglo con registros obtenidos de la vista
				var aRegistros = oModel.getData();
				//Se envian Sociedad y VIN  a la función getActFij_PPSetTable 
				var oTableJSON = this.getActFij_PPSetTable(aRegistros[0].companyCode, aRegistros[0].serial);
				var oJsonRes = oTableJSON[0];
				var tabla = oModel.getData();
				var oComboBox = oEvent.getSource().getParent().getCells().find(x => x.getId().search("mcbSegmentoActfijo") !== -1);
				oComboBox.clearSelection();
				oComboBox.setSelectedKey("");
				if (oJsonRes === undefined || oTableJSON.length === 0) {
					tabla[0].companyCode = ""; //Sociedad
					tabla[0].center = ""; //Centro
					tabla[0].segment = ""; //Segmento
					tabla[0].serial = ""; //VIN  
					tabla[0].finCode = ""; //Financiera
					tabla[0].dateStart = ""; //Fecha de Inicio de Financiamiento
					tabla[0].plateNum = ""; //Placa
					tabla[0].brandCode = ""; //Marca 
					tabla[0].modelCode = ""; //Modelo
					tabla[0].gamaCode = ""; //Gama
					tabla[0].extColorCode = ""; //Color Exterior
					tabla[0].intColorCode = ""; //Color Interior
					tabla[0].unidadID = ""; //ID de la unidad
					tabla[0].costAmt = ""; //Costo de la unidad
					tabla[0].sapPartner = "";
					tabla[0].Answl = ""; //Importe a Financiar
					MessageBox.error(this._i18n.getText("MerrorElementAct"));
					return;
				}
				tabla[0].segment = oJsonRes.Segment.padStart(10, "0"); //Segmento
				oComboBox.setSelectedKey(tabla[0].segment);
				tabla[0].serial = oJsonRes.Vin; //VIN  
				tabla[0].brandCode = oJsonRes.IdMarca; //Marca 
				tabla[0].modelCode = oJsonRes.IdModelo; //Modelo
				tabla[0].gamaCode = oJsonRes.IdGama; //Gama
				tabla[0].extColorCode = oJsonRes.IdColorext; //Color Exterior
				tabla[0].intColorCode = oJsonRes.IdColorint; //Color Interior
				tabla[0].unidadID = oJsonRes.Idvehi; //ID de la unidad
				tabla[0].costAmt = oJsonRes.Answl; //Costo de la unidad
				tabla[0].financedAmt = oJsonRes.Answl; //Importe a Financiar
				tabla[0].sapPartner = oJsonRes.Lifnr; //Numero de Proveedor
				var oView = this.getView();
				var oJSON = new JSONModel();
				oView.setModel(oJSON, "ActFijoCollection");
				oJSON.setData(tabla);
			},
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name getActFij_PPSetTable
			 * @param {String} sCompanyCode - Company Code.
			 * @param {String} sSerial - Serial.
			 * @desc Se consulta el servicio en S4 ActFij_PPSet
			 */
			getActFij_PPSetTable: function (sCompanyCode, sSerial) {
				var res = false;
				var sUrl = this._getUrl()
					//Ubicacion servicio
					+
					"s4_dev/sap/opu/odata/sap/Z_OD_SCP_BAVNPP001_SRV/ActFij_PPSet"
					//Filtros
					+
					"?$filter=" + encodeURI(
						"Bukrs eq '" + sCompanyCode + "' and Vin eq '" + sSerial + "'");
				$.ajax({
					url: sUrl,
					type: "GET",
					dataType: "json",
					contentType: "application/json; charset=utf-8",
					async: false
				}).then(function (data) {
					res = data.d.results;
				});
				return res;
			},
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name onValueHelpSociedad
			 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
			 * @desc Muestra el dialog para seleccionar la sociedad
			 */

			onValueHelpSociedad: function (oEvent) {
				//definir la variable global de contexto con la fila seleccionada
				this.oRowContext = oEvent.getSource().getParent().getBindingContext("ActFijoCollection");
				// create value help dialog
				if (!this._DialogActFijoSoc) {
					Fragment.load({
						id: "_DialogActFijoSoc",
						name: "vn.pp.ux_vn_pp_monitor.view.DialogActFijoSoc",
						controller: this
					}).then(function (oValueHelpDialog) {
						this._DialogActFijoSoc = oValueHelpDialog;
						this.getView().addDependent(this._DialogActFijoSoc);
						//var oItems = this._DialogActFijoSoc.getBinding("items"); //obtener lista de elementos del dialogo
						this._DialogActFijoSoc.open();
					}.bind(this));
				} else {
					//	var oItems = this._DialogActFijoSoc.getBinding("items");
					this._DialogActFijoSoc.open();
				}
			},
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name _onSearchSoc
			 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
			 * @desc Sirve para la busqueda de sociedad en el dialog de sociedad.
			 */

			_onSearchSoc: function (oEvent) {
				var sValue = oEvent.getParameter("value");
				var oFilter = new Filter(
					"name",
					FilterOperator.Contains, sValue
				);
				oEvent.getSource().getBinding("items").filter([oFilter]);
			},
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name _onConfirmSoc
			 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
			 * @desc Selection of the society by the user in the DialogActFijoSoc.
			 */
			_onConfirmSoc: function (oEvent) {
				var sPath = this.oRowContext.getPath(); //La fila a modificar
				var oModel = this.oRowContext.getModel();
				sPath = sPath + "/companyCode"; //El campo a modificar, de la fila seleccionada.
				var sSociedad = oEvent.getParameter("selectedItem").getProperty("description");
				//El campo de sociedad tenemos que guardarlo en el input
				//En modelos JSON se modifica el modelo, no el contexto
				oModel.setProperty(sPath, sSociedad);
				//El filtro de centros deberá reducirse dependiendo la sociedad seleccionada

			},
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name onValueHelpCentro
			 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
			 * @desc Muestra el DialogActFijoCentro  y muestra los centros dependiendo la sociedad seleccionada 
			 */

			onValueHelpCentro: function (oEvent) {
				//definir la variable global de contexto con la fila seleccionada this.oRowContext
				this.oRowContext = oEvent.getSource().getParent().getBindingContext("ActFijoCollection");
				// create value help dialog
				if (!this._DialogActFijoCentro) {
					Fragment.load({
						id: "_DialogActFijoCentro",
						name: "vn.pp.ux_vn_pp_monitor.view.DialogActFijoCentro",
						controller: this
					}).then(function (oValueHelpDialog) {
						this._DialogActFijoCentro = oValueHelpDialog;
						this.getView().addDependent(this._DialogActFijoCentro);
						var oFilter = this._onSearchCent_filter("");
						var oItems = this._DialogActFijoCentro.getBinding("items"); //obtener lista de elementos del dialogo
						oItems.filter(oFilter);
						this._DialogActFijoCentro.open();
					}.bind(this));
				} else {
					var oFilter = this._onSearchCent_filter("");
					var oItems = this._DialogActFijoCentro.getBinding("items");
					oItems.filter(oFilter);
					this._DialogActFijoCentro.open();
				}
			},
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name _onSearchCent
			 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
			 * @desc Sirve para la busqueda del centros en el dialog de centro.
			 */
			_onSearchCent: function (oEvent) {
				var sInputValue = oEvent.getParameter("value");
				var oFilter = this._onSearchCent_filter(sInputValue);
				//Asignamos los filtros a la lista de items
				oEvent.getSource().getBinding("items").filter(oFilter);
			},

			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name _onSearchCent_filter
			 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
			 * @desc Campo de busqueda para buscar el centro
			 */
			_onSearchCent_filter: function (sInputValue) {
				//Se va filtrar con lo que escribe el usuario y por la sociedad Activa
				//1.- Saber Sociedad Activa 
				var sSocAct = this.oRowContext.getProperty("companyCode");
				//Crear filtro par que la sociedad (Bukrs) sea igual a sSocAct
				var oFilterBukrs = new Filter(
					"Bukrs",
					FilterOperator.EQ, sSocAct //Crear filtro para 
				);
				//Crear filtro para el campo de busqueda Descripcion (Name1) que  Contenga (Contains) en el texto (sInputValue) que ingrese
				var oFilterName1 = new Filter(
					"Name1",
					FilterOperator.Contains, sInputValue
				);
				//Unir los 2 filtros anteriores con la instruccion con AND 
				var oFilters = [];
				oFilters.push(oFilterBukrs);
				oFilters.push(oFilterName1);
				var oFilterAnd = new Filter({
					filters: oFilters,
					and: true //Si AND es False se esta uniendo con OR
				});
				return oFilterAnd;
			},
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name _onConfirmCent
			 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
			 * @desc Seleccion de Centro en la fila actual
			 */

			_onConfirmCent: function (oEvent) {
				var sPath = this.oRowContext.getPath(); //La fila a modificar
				var oModel = this.oRowContext.getModel();
				sPath = sPath + "/center"; //El campo a modificar, de la fila seleccionada.
				var sSociedad = oEvent.getParameter("selectedItem").getProperty("description");
				//El campo de sociedad tenemos que guardarlo en el input
				//En modelos JSON se modifica el modelo, no el contexto
				oModel.setProperty(sPath, sSociedad);
				//El filtro de centros deberá reducirse dependiendo la sociedad seleccionada

			},
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name _onButtonPress
			 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
			 * @desc Selecciona toda la información de la tabla y es enviado por medio del servicio doActFijo para almacenarla
			 */
			_onButtonPress: function (oEvent) {
				var that = this; //Referencia a dialogo
				var bValidaFlag = true;
				var oDialog = oEvent.getSource().getParent();
				MessageBox.confirm(this._i18n.getText("confActFijo"), function (oAction) {
					if (oAction === "OK") {
						//Crea JSON
						var oModel = that.getView().getModel("ActFijoCollection");
						var tabla = oModel.getData();

						try {
							var oModeloInsertarActFijo = tabla.map(
								//Por cada línea de X quiero que hagas esto:
								function (linea) {
									var sSociedad = linea.companyCode;
									var sCentro = linea.center;
									var sSegmento = linea.segment;
									var sVin = linea.serial;
									var sfinanciera = linea.finCode;
									var dFechaInicio = linea.dateStart;
									var sPlaca = linea.plateNum;
									var fImporte = parseFloat(linea.costAmt);
									var sMarca = linea.brandCode;
									var sModelo = linea.modelCode;
									var sGama = linea.gamaCode;
									var sColExt = linea.extColorCode;
									var sColInt = linea.intColorCode;
									var sUnidadId = linea.unidadID;
									var sProveedor = linea.sapPartner;
									var fImpFinance = parseFloat(linea.financedAmt);

									//**********************************************
									//Validacion de Sociedad
									if ((sSociedad === undefined) || (sSociedad === null) || (sSociedad === '') || (sSociedad.length === 0)) {
										MessageBox.error(that._i18n.getText("ErrSociedad"));
										bValidaFlag = false;
										return bValidaFlag;
									}
									//Validacion de Centro
									if ((sCentro === undefined) || (sCentro === null) || (sCentro === '') || (sCentro.length === 0)) {
										MessageBox.error(that._i18n.getText("ErrCentro"));
										bValidaFlag = false;
										return bValidaFlag;
									}

									//Validacion de Segmento
									if ((sSegmento === undefined) || (sSegmento === null) || (sSegmento === '') || (sSegmento.length === 0)) {
										MessageBox.error(that._i18n.getText("ErrSegmento"));
										bValidaFlag = false;
										return bValidaFlag;
									}

									//Validacion de VIN
									if ((sVin === undefined) || (sVin === null) || (sVin === '') || (sVin.length === 0)) {
										MessageBox.error(that._i18n.getText("ErrVIN"));
										bValidaFlag = false;
										return bValidaFlag;
									}
									//Validacion de Financiera
									if ((sfinanciera === undefined) || (sfinanciera === null) || (sfinanciera === '') || (sfinanciera.length === 0)) {
										MessageBox.error(that._i18n.getText("ErrFinanciera"));
										bValidaFlag = false;
										return bValidaFlag;
									}

									//Validacion de Fecha de Inicio de Financiamiento
									if ((dFechaInicio === null) || (dFechaInicio === '') || (dFechaInicio.length === 0) || isNaN(dFechaInicio)) {
										MessageBox.error(that._i18n.getText("ErrFIFina"));
										bValidaFlag = false;
										return bValidaFlag;
									}
									//Validacion de Importe de la Unidad
									if (isNaN(fImporte) || (fImporte <= 0) || (fImporte === null) || (fImporte === '') || (fImporte.length === 0)) {
										MessageBox.error(that._i18n.getText("ErrImpUnidad"));
										bValidaFlag = false;
										return bValidaFlag;
									}
									//Validacion de Importe a Financiar
									if (isNaN(fImpFinance) || (fImpFinance <= 0) || (fImpFinance === null) || (fImpFinance === '') || (fImpFinance.length === 0)) {
										MessageBox.error(that._i18n.getText("ErrImpFinanceMayor"));
										bValidaFlag = false;
										return bValidaFlag;
									}
									//Validacion de Importe a Financiar
									if (fImpFinance > fImporte) {
										MessageBox.error(that._i18n.getText("ErrImpFinanceMayor"));
										bValidaFlag = false;
										return bValidaFlag;
									}
									//Validacion de Marca
									if ((sMarca === undefined) || (sMarca === null) || (sMarca === '') || (sMarca.length === 0)) {
										MessageBox.error(that._i18n.getText("ErrMarca"));
										bValidaFlag = false;
										return bValidaFlag;
									}
									//Validacion de Modelo
									if ((sModelo === undefined) || (sModelo === null) || (sModelo === '') || (sModelo.length === 0)) {
										MessageBox.error(that._i18n.getText("ErrModelo"));
										bValidaFlag = false;
										return bValidaFlag;
									}
									//Validacion de Gama
									if ((sGama === undefined) || (sGama === null) || (sGama === '') || (sGama.length === 0)) {
										MessageBox.error(that._i18n.getText("ErrGama"));
										bValidaFlag = false;
										return bValidaFlag;
									}
									//Validacion de Color Exterior
									if ((sColExt === undefined) || (sColExt === null) || (sColExt === '') || (sColExt.length === 0)) {
										MessageBox.error(that._i18n.getText("ErrColExt"));
										bValidaFlag = false;
										return bValidaFlag;
									}
									//Validacion de Color Interior
									if ((sColInt === undefined) || (sColInt === null) || (sColInt === '') || (sColInt.length === 0)) {
										MessageBox.error(that._i18n.getText("ErrColInt"));
										bValidaFlag = false;
										return bValidaFlag;
									}
									var sfechaInicio = dFechaInicio.toISOString().substring(0, 10);
									return {
										"companyCode": sSociedad, //Sociedad
										"center": sCentro, //Centro
										"segment": sSegmento, //Segmento
										"serial": sVin, //VIN
										"finCode": sfinanciera, //Financiera
										"dateStart": sfechaInicio, //Fecha de Inicio de Financiamiento
										"plateNum": sPlaca, //Placa
										"costAmt": that._NumToString(fImporte), //Importe de Unidad
										"brandCode": sMarca, //Marca 
										"modelCode": sModelo, //Modelo
										"gamaCode": sGama, //Gama
										"extColorCode": sColExt, //Color Exterior
										"intColorCode": sColInt, //Color Interior
										"unidadID": sUnidadId, //ID de la unidad 
										"sapPartner": sProveedor, //Numero de proveedor
										"currency": "MXN", //Moneda
										"unitLocation": "Activo Fijo", //Ubicación unidad
										"financedAmt": that._NumToString(fImpFinance)
									};
								}); //	function { map(
						} //try
						catch (e) {
							//	MessageBox.error(that._i18n.getText("ERRProPag"));
							//that.close();
							return;
						}
						if (bValidaFlag === false) {

							return;
						}
						// Vamos a insertar el modelo!
						//Obtenemos la tabla ligada al servicio:
						//Se tiene que enviar el modelo uno por uno 
						var oSend = {
							Input: []
						};
						//Pausar UI:
						oDialog.setBusy(true);
						oModeloInsertarActFijo.forEach(function (oModeloIndividual) {
							oSend.Input.push(oModeloIndividual);
						});
						//Enviamos a función:
						var sUrl = that._getUrl()
							//Ubicacion servicio
							+
							"srv_api/function/doActFijo";
						//Generar Petición
						var resPromesa = $.ajax({
							url: sUrl,
							type: "POST",
							dataType: "json",
							contentType: "application/json; charset=utf-8; IEEE754Compatible=true",
							data: JSON.stringify(oSend)
						});
						//Enviamos los cambios al servidor Modelo y Tabla
						//Al confirmar ejecución actualizar la tabla.
						Promise.all([resPromesa]).then(function (res) {
							var respuesta = res[0].value;
							var sRes = "";
							//Concatenamos la respuesta del servidor y se muestra mensaje al usuario
							respuesta.forEach(x => {
								sRes = sRes + (x.MessageV1 + ": " + x.Message) + "\n";
							});

							MessageBox.information(sRes, {
								icon: MessageBox.Icon.information
							});
							oDialog.setBusy(false);
							that.close(true); //Actualiza tabla principal

						}).catch(function (reason) {
							console.log(reason);
							MessageBox.error(reason.responseText);
							oDialog.setBusy(false); //3 puntos
							that.close(true);
						});
					}
				});
			},
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name _onButtonPress
			 * @param {string} oValor - Recibe el evento por el cual fue ejecutado.
			 * @desc Recibe un valor, y le da formato numerico
			 *  @return {oValor}
			 */
			_NumToString: function (oValor) {
				oValor = Number(oValor); // NaN || Float
				oValor = (isNaN(oValor)) ? "0.00" : oValor.toFixed(2); // "0.00" ó ||"1234.00"
				return oValor;
			},

			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name _onButtonClose
			 * @desc Cierra el Dialog Activo Fijo.
			 */
			_onButtonClose: function () {
				this.close();
			},
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name onInit
			 * @desc 
			 */
			onInit: function () {
				this._oDialog = this.getControl();
			},
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name onExit
			 * @desc Destruye el nombre del dialogo
			 */
			onExit: function () {
				this._oDialog.destroy();
			},
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name oAddElement
			 * @desc Agregar mas filas con controles para agregar mas informacion a la tabla 
			 */
			oAddElement: function (oEvent) {

			},
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name handleFechaInicio
			 * @desc Funcion de selección y validación de fecha
			 */

			handleFechaInicio: function (oEvent) {
				var oDatePicker = oEvent.getSource();
				var dToday = new Date();
				var dDateselect = oDatePicker.getDateValue();

				if (dDateselect > dToday) {
					MessageBox.warning(this._i18n.getText("ErrSelecdate"), {
						actions: [MessageBox.Action.OK],
						emphasizedAction: MessageBox.Action.OK,
						onClose: function (sAction) {
							if (sAction === "OK") {
								oDatePicker.setDateValue(dToday);
								return;
							}
						}
					});
				}
			},
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name _getUrl
			 * @desc Se optiene la URL del navegador
			 * @return {string} - url
			 */
			_getUrl: function () {
				var url = window.location.href;
				var url1 = url.indexOf("index");
				url = url.substring(0, url1);
				return url;
			},
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name validateNumber
			 * @desc Valida un String numerico
			 * @param {string} sNumber - string Numerico
			 * @return {boolean} - true
			 */
			validateNumber: function (sNumber) {
				//sNumber = sNumber.replace(",", "");
				var nNumber = Number(sNumber);
				if (isNaN(nNumber)) {
					return false;
				}
				if (nNumber < 0) {
					return false;
				}
				return true;
			},
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name oValidCaracter
			 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
			 * @desc Valida si el campo de Imp Pag tiene caracteres
			 */
			oValidCaracter: function (oEvent) {
				var sInputValue = oEvent.getSource().getValue();
				var oInputValue = oEvent.getSource();
				if ((sInputValue.lastIndexOf(".0") === 1) || (sInputValue.lastIndexOf(".") === 1)) {
					////console.log(sInputValue);
					return;
				}
				if ((sInputValue.length) === 0) {
					oInputValue.setValue("");
					return;
				}
				var sTextoI18n = this._i18n.getText("ErrImportPagCaracter");
				var sTituloI18n = this._i18n.getText("Errintafina");
				if (!this.validateNumber(sInputValue)) { //Falso cuando no es un número mayor a cero
					oInputValue.setValue("0");
					MessageBox.error(sTextoI18n, {
						icon: MessageBox.Icon.ERROR,
						title: sTituloI18n,
						actions: [MessageBox.Action.OK],
						emphasizedAction: MessageBox.Action.OK
					});
					return;
				}
				if ((sInputValue.lastIndexOf(".0") === -1) && (sInputValue.lastIndexOf(".") === -1) && (sInputValue.lastIndexOf(",") === -1)) {
					var sCaracter =
						"^[0-9]{1,3}(?:[0-9]*(?:[.,][0-9]{2})?|(?:,[0-9]{3})*(?:\.[0-9]{2})?|(?:\.[0-9]{3})*(?:,[0-9]{2})?)$";
					var regex = new RegExp(sCaracter);
					//Si no se cumple con los valores de dateReg muestra mensaje
					if (!regex.test(sInputValue)) {
						oInputValue.setValue("0");
						MessageBox.error(sTextoI18n, {
							icon: MessageBox.Icon.ERROR,
							title: sTituloI18n,
							actions: [MessageBox.Action.OK],
							emphasizedAction: MessageBox.Action.OK
						});
					}
				}
			}
		});
	}, /* bExport= */ true);