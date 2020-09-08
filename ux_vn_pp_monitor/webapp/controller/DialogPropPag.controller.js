/**
 * @file Controlador Propuesta de Pago .
 * @author Javier Balcazar Cruz <jbalcazar@zapata.com.mx>.
 * Notación JSDoc para Funciones, Parametros, Objetos, etc.
 * @param {param type} param name - description.
 */
/** 
 * sap.ui.define:
 * @module ManagedObject
 * @module MessageBox
 * @module History
 * @module MessageToast
 * @module JSONModel
 */
sap.ui.define([
		"sap/ui/base/ManagedObject",
		"sap/m/MessageBox",
		"sap/ui/core/routing/History",
		"sap/m/MessageToast",
		"sap/ui/model/json/JSONModel"
	],
	/**
	 *  Functión Principal
	 * @author Javier Balcazar Cruz 
	 * @param  {module} ManagedObject - Clase base que introduce algunos conceptos básicos, como la gestión del estado y el enlace de datos.
	 * @param  {module} MessageBox - Proporciona métodos más fáciles para crear alertas, diálogos de confirmación o diálogos de mensajes arbitrarios etc. 
	 * @param  {module} History - Crea una instancia de la historia.
	 * @param  {module} MessageToast - Ventana emergente pequeña y no disruptiva para mostrar mensajes.
	 * @param  {module} JSONModel - Implementación del modelo para formato JSON.
	 * @desc   Función principal de la Propuesta de Pago.
	 * @return {class} - Retorna controller.DialogPropPag .
	 */
	function (ManagedObject, MessageBox, History, MessageToast, JSONModel) {
		"use strict";
		return ManagedObject.extend("vn.pp.ux_vn_pp_monitor.controller.DialogPropPag", {
			//-------------------------------------------------------------------
			//	Eventos estándar UI5:
			//-------------------------------------------------------------------	
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name constructor 
			 * @param  {event} oView - Recibe Evento y ejecutala función.
			 * @desc Se inicializan propiedades y variables al al abrir la vista DialogPropPag.
			 */
			constructor: function (oView) {
				this._oView = oView;
				this._oControl = sap.ui.xmlfragment(oView.getId(), "vn.pp.ux_vn_pp_monitor.view.DialogPropPag", this);
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
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name open
			 * @desc Se abre el Dialog Propuesta de Pago.
			 */
			open: function () {
				var oView = this._oView;
				var oControl = this._oControl;
				if (!this._bInit) {
					// Inicializa el Fragment.
					this.onInit();
					this._bInit = true;
					// Conecta el fragment  de la vista raíz de este componente (modelos, ciclo de vida).
					oView.addDependent(oControl);
				}
				var args = Array.prototype.slice.call(arguments);
				if (oControl.open) {
					oControl.open.apply(oControl, args);
				} else if (oControl.openBy) {
					oControl.openBy.apply(oControl, args);
				}
				// Suma de el campo Propuesta de Pago.
				var oImporteSumatoria = new JSONModel({
					"sumatoriaPropuestaPago": 0
				});
				this.getView().setModel(oImporteSumatoria, "oImporteSumatoria");
				window.setTimeout(this.onChangeImporte(null), 1500);
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
				// Actualizar Servicio.
				var oController = this.getView("View1").getController();
				oController.onSearch(null);
				this._oControl.close();
			},
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name setRouter
			 * @param {} oRouter - 
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
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name onButtonPress
			 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
			 * @desc Genera el proceso para la Propuesta de Pago.
			 */
			onButtonPress: function (oEvent) {

				var that = this; //Referencia a dialogo
				var bValidaFlag = true;
				var oDialog = oEvent.getSource().getParent();

				MessageBox.confirm(that._i18n.getText("confProPag"), function (oAction) {
					//	var senal = oEvent.getSource();
					if (oAction === "OK") {
						//Crea JSON
						var oModel = that.getView().getModel("PropPagoCollection");
						var tabla = oModel.getData();
						try {
							var oModeloInsertar = tabla.map(
								//Por cada línea de X quiero que hagas esto:
								function (linea) {
									if (bValidaFlag === false) {
										return false;
									}
									var nPayamt = parseFloat(linea.payedAmt);
									var nbalanceAmt = parseFloat(linea.balanceAmt);
									var sFecProp = linea.datePay;

									if (isNaN(nPayamt) || nPayamt <= 0 || (nPayamt === null) || (nPayamt === '') || (nPayamt.length === 0)) {
										MessageBox.error(that._i18n.getText("ErrImpPagg"));
										bValidaFlag = false;
										return false;
									}
									if (nPayamt > nbalanceAmt) {
										MessageBox.error(that._i18n.getText("ErrCantImpPagg"));
										bValidaFlag = false;
										return false;
									}

									if ((sFecProp === null) || (sFecProp === '') || (sFecProp.length === 0) || isNaN(sFecProp)) {
										MessageBox.error(that._i18n.getText("ErrProPagFecha"));
										bValidaFlag = false;
										return false;
									}

									var dfechalinea = linea.datePay;
									var sFecha = dfechalinea.toISOString().substring(0, 10);
									var sPayedAmt = Number(linea.payedAmt).toFixed(2);
									return {
										"financedItem_ID": linea.ID,
										"datePay": sFecha,
										"payedAmt": sPayedAmt,
										"flagConf": false,
										"flagDel": false
									};
								}); //	function { map(
						} //try
						catch (e) {
							////console.log(e);
							//MessageBox.error(that._i18n.getText("ERRProPag"));
							//	that.close();
							return;
						}
						if (bValidaFlag === false) {
							return;
						}
						//Asignamos los elementos a crear a la tabla falsa:
						var oSend = {
							Input: []
						};
						//Obtenemos la tabla ligada al servicio:
						//var oTablaFalsa = that.getView().byId("FinancedItemsPaymentsSetProPag");					
						//Se tiene que enviar el modelo uno por uno
						oModeloInsertar.forEach(function (oModeloIndividual) {
							oSend.Input.push(oModeloIndividual);
							//oTablaFalsa.getBinding("items").create(oModeloIndividual);
						});
						//Pausar UI:
						oDialog.setBusy(true);
						//Enviamos a función:
						var sUrl = that._getUrl()
							//Ubicacion servicio
							+ "srv_api/function/newPayPro";
						var oPromesa = $.ajax({
							url: sUrl,
							type: "POST",
							dataType: "json",
							contentType: "application/json; charset=utf-8; IEEE754Compatible=true",
							data: JSON.stringify(oSend)
						});
						/**Enviamos los cambios al servidor Modelo y Tabla
						 *var resPromesa = oTablaFalsa.getModel("modeloOperation").submitBatch("FinancedItemsPaymentsSet");
						 *Al confirmar ejecución actualizar la tabla.
						 */
						Promise.all([oPromesa]).then(function (res) {
							var sMensajeExitoso = that._i18n.getText("MPropPagExitoso", [res[0].value]);
							MessageBox.success(sMensajeExitoso, {
								icon: MessageBox.Icon.SUCCESS
							});
							oDialog.setBusy(false);
							that.close(true);
						}).catch(function (sReason) {
							oDialog.setBusy(false);
							MessageBox.error(sReason.responseText);
							that.close(true);
						});
					}
				});
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
			 * @name onButtonPressClose
			 * @desc Cierra el Dialog Propuesta de Pago.
			 */
			onButtonPressClose: function () {
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
			 * @name onChangeImporte
			 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
			 * @desc Realiza la suma de la columna Importe a Pagar.
			 */
			onChangeImporte: function (oEvent) {
				var that = this;
				var oDataPago = that.getView().getModel("PropPagoCollection").getData(); //obtiene los datos de la tabla  y los guarda en un json
				that.iImportePagar = 0;
				oDataPago.map(function (temp) {
					if (temp.payedAmt !== undefined)
						if (!isNaN(temp.payedAmt))
							that.iImportePagar = that.iImportePagar + parseFloat(temp.payedAmt);
				}, this);
				this.getView().getModel("oImporteSumatoria").setProperty("/sumatoriaPropuestaPago", this.iImportePagar.toFixed(2));

			},
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name oCopyPropPag
			 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
			 * @desc Copia la configuración de la primera fila al resto de las filas.
			 */
			oCopyPropPag: function (oEvent) {
				var oModel = this.getView().getModel("PropPagoCollection");
				//Universo de registros
				var aRegistros = oModel.getData(); //arreglo con registros
				//fila1 Almacena el primer renglon de la tabla
				var oFila1 = aRegistros[0];
				//A los demás registros copiar los valores del primer renglón
				for (var i = 1; i < aRegistros.length; i++) {
					//Objeto a modificar a nivel modelo: + propiedad: /1/datePay
					var sPath = "/" + i + "/";
					oModel.setProperty(sPath + "datePay", oFila1.datePay);
				}
			},
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name handleFechaInicio
			 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
			 * @desc Valida si el campo de fecha es mayor a la actual.
			 */
			handleFechaInicio: function (oEvent) {
				var oDatePicker = oEvent.getSource();
				var dToday = new Date();
				var oDateselect = oDatePicker.getDateValue();
				if (oDateselect > dToday) {
					MessageBox.warning(this._i18n.getText("ErrSelecdate"), {
						actions: [MessageBox.Action.OK],
						emphasizedAction: MessageBox.Action.OK,
						onClose: function (sAction) {
							if (sAction === "OK") {
								oDatePicker.setDateValue(dToday);
							}
						}
					});
				}
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
				if ((sInputValue.lastIndexOf(".0") === -1) && (sInputValue.lastIndexOf(".") === -1) && (sInputValue.lastIndexOf(",") === -1)) {
					var sCaracter =
						"^[0-9]{1,3}(?:[0-9]*(?:[.,][0-9]{2})?|(?:,[0-9]{3})*(?:\.[0-9]{2})?|(?:\.[0-9]{3})*(?:,[0-9]{2})?)$";
					var regex = new RegExp(sCaracter);
					//Si no se cumple con los valores de dateReg muestra mensaje
					if (!regex.test(sInputValue)) {
						var sTextoI18n = this._i18n.getText("ErrImportPagCaracter");
						var sTituloI18n = this._i18n.getText("ImportUniErrTit");
						MessageBox.error(sTextoI18n, {
							icon: MessageBox.Icon.ERROR,
							title: sTituloI18n,
							actions: [MessageBox.Action.OK],
							emphasizedAction: MessageBox.Action.OK,
							onClose: function (sAction) {
								if (sAction === "OK") {
									oInputValue.setValue("0");
									return;
								}

							}
						});
					}
				}

			}
		});
	}, /* bExport= */ true);