/* global download:true */
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
 * @module Token
 * @module ColumnListItem
 * @module Label
 * @module JSONModel
 * @module Sorter
 * @module FilterOperator
 * @module controller
 */
sap.ui.define([
		"sap/ui/base/ManagedObject",
		"sap/ui/core/Fragment",
		"sap/m/MessageBox",
		"sap/ui/core/routing/History",
		"sap/m/MessageToast",
		"sap/ui/model/Filter",
		"sap/m/Token",
		"sap/m/ColumnListItem",
		"sap/m/Label",
		"sap/ui/model/json/JSONModel",
		"sap/ui/model/Sorter",
		"sap/ui/model/FilterOperator",
		"vn/pp/ux_vn_pp_monitor/model/formatter",
		"vn/pp/ux_vn_pp_monitor/libs/download"
	],

	function (ManagedObject, Fragment, MessageBox, History, MessageToast, Filter, Token, ColumnListItem, Label, JSONModel,
		Sorter, FilterOperator, formatter, downloadjs) {
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
		 * @param  {module} Token - Permite visualizar elementos previamente seleccionados.
		 * @param  {module} ColumnListItem - Se puede usar con la agregación de celdas para crear fila2s para el control sap.m.Table.
		 * @param  {module} Label - Se utilizan como títulos para controles individuales o grupos de controles.
		 * @param  {module} JSONModel - Implementación del modelo para formato JSON.
		 * @param  {module} Sorter - Definen el orden de clasificación para un enlace de lista.
		 * @param  {module} FilterOperator - Pperador para los filtros.
		 * @desc   Función principal de la Confirmación de Pago.
		 * @return {class} - Retorna controller.DialogConfPag .
		 */
		return ManagedObject.extend("vn.pp.ux_vn_pp_monitor.controller.DialogConfPag", {
			formatter: formatter,
			//-------------------------------------------------------------------
			//	Eventos estándar UI5:
			//-------------------------------------------------------------------	
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
			 * @name constructor 
			 * @param  {event} oView - Recibe Evento y ejecutala función.
			 * @desc Se inicializan propiedades y variables al al abrir la vista DialogPropPag.
			 */
			constructor: function (oView) {
				this._oView = oView;
				this._oControl = sap.ui.xmlfragment(oView.getId(), "vn.pp.ux_vn_pp_monitor.view.DialogConfPag", this);
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
			 * @desc Abrir dialogo, agregar dependientes y modelos en Confirmación de Pago.
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
				//*******Suma de el campo Propuesta de Pago******
				var oImporteSuma = new JSONModel({
					"sumatoriaConfirmacionPago": 0
				});
				this.getView().setModel(oImporteSuma, "oImporteSuma");
				this.getView().byId("tablaConfPag").setBusy(true);
				var that = this;
				setTimeout(function () {
					that.onChangeImporte();
				}, 2000);
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
			 * @param {} oRouter - 
			 * @desc Obtener ruta de navegación
			 */
			setRouter: function (oRouter) {
				this.oRouter = oRouter;
			},
			/** 
			 * Revisar si se puede borrar
			 */
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
			 * @name handleFechaInicio
			 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
			 * @desc Valida si el campo de fecha es mayor a la actual.
			 */
			handleFechaPag: function (oEvent) {
				var oDatePicker = oEvent.getSource();
				var dToday = new Date();
				var dateselect = oDatePicker.getDateValue();

				if (dateselect > dToday) {
					MessageBox.warning(this._i18n.getText("ErrDatemayorActual"), {
						actions: [MessageBox.Action.OK],
						emphasizedAction: MessageBox.Action.OK,
						onClose: function (sAction) {
							if (sAction === "OK") {
								oDatePicker.setDateValue(dToday);
							}

						}
					});
				}
				this._onObtenerIntFila(oDatePicker);
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
			 * @name _onObtenerIntFila
			 * @param {object} oDatepicker - Recibe el objeto del evento por el cual fue ejecutado.
			 * @desc Se obtiene los elementos de la fila para obtener el interes.
			 */
			_onObtenerIntFila: function (oDatepicker) {
				var oContext = oDatepicker.getParent().getBindingContext("modeloOperation");
				var oID = oContext.getProperty("financedItem/ID");
				//var odatePay = oContext.getProperty("datePay");
				var oPayedAmt = Number(oContext.getProperty("payedAmt"));
				var oIntPayAmt = oContext.getProperty("intPayAmt");

				var oDatos = [{
					"FinancedItemID": oID,
					"datePay": oDatepicker.getDateValue().toISOString().substring(0, 10),
					"payedAmt": Number(oPayedAmt).toFixed(2),
					"intRecalAmt": Number(oIntPayAmt).toFixed(2)
				}];
				//2) Consultar los resultados
				var oResultado = this._onObtenerInt(oDatos);
				//3) Regresar intereses al arreglo original
				//1.- Se va obtener el interes de la primera posicion del resultado
				oContext.setProperty("intPayAmt", Number(oResultado[0].intRecalAmt).toFixed(2)); //Asignación
			},
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name _onObtenerInt
			 * @param {object} datos - Recibe el objeto con variables .
			 * @desc Se obtiene obtiene el importe de interes.
			 */
			_onObtenerInt: function (datos) {
				var sUrl = this._getUrl()
					//Ubicacion servicio
					+
					"srv_api/function/getInterestPay";
				var oSend = {
					"Input": datos
				};
				var datosDevueltos = datos; //La casilla inicia desmarcada 
				$.ajax({
					url: sUrl,
					"async": false,
					type: "POST",
					dataType: "json",
					contentType: "application/json;IEEE754Compatible=true",
					data: JSON.stringify(oSend)
				}).then(function (data) {
					if (data.value.length !== 0) {
						datosDevueltos = data.value;
					}
				});
				return datosDevueltos;
			},

			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name onButtonPress
			 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
			 * @desc Genera el proceso para Confirmar Pago.
			 */
			onButtonPress: function (oEvent) {
				var oTablaCtxs = this.getView().byId("tablaConfPag").getBinding().getContexts();
				var that = this;
				var bValidaFlag = true;
				var oDialog = oEvent.getSource().getParent();
				oTablaCtxs.forEach(function (fila) {
					if (fila !== null) {
						var sFinanciado = parseFloat(fila.getProperty("financedItem/balanceAmt"));
						var iPago = parseFloat(fila.getProperty("payedAmt"));
						var fpago = fila.getProperty("datePay");
						var cBank = fila.getProperty("sapHBKID");
						var fromAcc = fila.getProperty("fromAcc");
						var destAcc = fila.getProperty("destAcc");
						var interes = parseFloat(fila.getProperty("intPayAmt"));

						var aFromAcc = fromAcc.split("|*|");
						var aDestAcc = destAcc.split("|*|");

						//Validación de Importe Pagado no vacio
						if (isNaN(iPago) || (iPago === null) || (iPago === '') || (iPago.length === 0) || iPago <= 0) {
							MessageBox.error(that._i18n.getText("ErrIpago"));
							bValidaFlag = false;
							return;
						}
						if (iPago > sFinanciado) {
							MessageBox.error(that._i18n.getText("ErrCantImpPagg"));
							bValidaFlag = false;
							//	oDialog.setValueState("Error");
							return;
						}
						//Validación de interes  no vacio
						if (isNaN(interes) || (interes === null) || (interes === '') || (interes.length === 0) || interes < 0) {
							MessageBox.error(that._i18n.getText("ErrIntpago"));
							bValidaFlag = false;
							return;
						}

						//Validación de Importe Pagado mayor  a saldo financiado
						if ((iPago > sFinanciado) || (sFinanciado < 0)) {
							MessageBox.error(that._i18n.getText("ErrImpMayor"));
							bValidaFlag = false;
							return;
						}
						//Validacion de Fecha Pago no vacio
						if ((fpago === null) || (fpago === '') || (fpago.length === 0)) {
							MessageBox.error(that._i18n.getText("ErrFpago"));
							bValidaFlag = false;
							return;
						}
						//Validacion de Codigo Bancario no vacio
						if ((cBank === null) || (cBank === '') || (cBank.length === 0)) {
							MessageBox.error(that._i18n.getText("ErrCbancario"));
							bValidaFlag = false;
							return;
						}
						//Validar layouts
						if (aFromAcc.length > 0) {
							if (parseInt(aFromAcc[4], 10) !== 0 && aDestAcc.length === 0) {
								MessageBox.error(that._i18n.getText("ErrConfPagLayout"));
								bValidaFlag = false;
								return;
							}
						}
					}
				});
				if (bValidaFlag === true) {
					MessageBox.confirm(this._i18n.getText("confConfPag"), function (oAction) {
						if (oAction === "OK") {
							//Pausar UI:
							oDialog.setBusy(true);
							//Generar cadena númerica única:
							var sGenMark = 2 + new Date().getTime();
							sGenMark = sGenMark.toString();
							var oSend = {
								Input: [],
								"genMark": sGenMark
							};
							//Actualiza bandera flagConf a true
							oTablaCtxs.forEach(function (fila) {
								if (fila !== null) {
									oSend.Input.push({
										ID: fila.getProperty("ID"),
										financedItem_ID: fila.getProperty("financedItem/ID"),
										datePay: fila.getProperty("datePay"),
										payedAmt: Number(fila.getProperty("payedAmt")).toFixed(2),
										flagConf: true,
										flagDel: false,
										intPayAmt: Number(fila.getProperty("intPayAmt")).toFixed(2),
										sapHBKID: fila.getProperty("sapHBKID"),
										sapUKONT: fila.getProperty("sapUKONT"),
										sapHKTID: fila.getProperty("sapHKTID"),
										sapZLSCH: fila.getProperty("sapZLSCH"),
										fromAcc: fila.getProperty("fromAcc"),
										unidadID: fila.getProperty("financedItem/unidadID"),
										destAcc: fila.getProperty("destAcc")
									});
								}
							});
							//Enviamos a función:
							var sUrl = that._getUrl()
								//Ubicacion servicio
								+
								"srv_api/function/confPay";
							//Generar Petición
							var resPromesa = $.ajax({
								url: sUrl,
								type: "POST",
								dataType: "json",
								contentType: "application/json; charset=utf-8; IEEE754Compatible=true",
								data: JSON.stringify(oSend)
							});
							//Enviamos los cambios al servidor Modelo y Tabla
							//var resPromesa = oTablaFalsa.getModel("modeloOperation").submitBatch("FinancedItemsTransfSet");
							//Al confirmar ejecución actualizar la tabla.
							Promise.all([resPromesa]).then(function (res) {
								var MensajeExitoso = that._i18n.getText("MconfiPagoExitoso", [res[0].value]);
								MessageBox.success(MensajeExitoso, {
									icon: MessageBox.Icon.SUCCESS
								});
								that._getLayouts(sGenMark);
								oDialog.setBusy(false);
								that.close(true);
							}).catch(function (reason) {
								////console.log(reason);
								MessageBox.error(reason.responseText);
								oDialog.setBusy(false);
								that.close(true);
							});
						}
					});
				}

			},
			/** 
			 * @author Jorge Carlos Bustillos  <jbustillos@zapata.com.mx>
			 * @function
			 * @name _getLayouts: 
			 *@param {string} sGenMark Identificador de layout
			 * @desc Obtener layouts correspondientes a la última operación éxitosa.
			 */
			_getLayouts: function (sGenMark) {
				//Petición a realizar:
				var oSend = {
					"Input": [{
						"genMark": sGenMark,
						"file": []
					}]
				};
				//Enviamos a función:
				var sUrl = this._getUrl()
					//Ubicacion servicio
					+
					"srv_api/function/getLayoutDownload";
				//Generar Petición
				var resPromesa = $.ajax({
					url: sUrl,
					type: "POST",
					dataType: "json",
					contentType: "application/json; charset=utf-8; IEEE754Compatible=true",
					data: JSON.stringify(oSend)
				});
				//Descarga OK
				Promise.all([resPromesa]).then(res => {
					var oResObj = res[0].value;
					for (var oObj of oResObj) {
						var aFile = oObj.file;
						//Por cada archivo descargar
						for (var oFile of aFile) {
							var sBase64 = "data:application/octet-stream;base64," + oFile.Data;
							download(sBase64, oFile.FileName + "." + oFile.FileExtension, oFile.MimeType);
						}
					}
				}).catch(function (reason) { //Error
					////console.log("_getLayouts", reason);
					MessageBox.error(reason.responseText);
				});
			},
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name onButtonPressClose		 
			 * @desc  Cierra el Dialog Confirmación de Pago.		
			 */
			onButtonPressClose: function () {
				//Limpiar las propuestas:
				var oTable = this.getView().byId("tablaConfPag");
				var aContexts = oTable.getBinding().getContexts();
				aContexts.forEach(x => {
					x.setProperty("fromAcc", "");
					x.setProperty("destAcc", "");
					x.setProperty("sapZLSCH", "");
					x.setProperty("sapHKTID", "");
					x.setProperty("sapUKONT", "");
					x.setProperty("sapHBKID", "");
				});
				this.close();
			},
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name onChangeImporte
			 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
			 * @desc Realiza la suma de la columna Importe a Pagar.
			 */
			onChangeImporte: function (oEvent) {
				this.getView().byId("tablaConfPag").setBusy(false);
				var iImportePagar = 0;
				var oTablaCtxs = this.getView().byId("tablaConfPag").getBinding().getContexts();
				oTablaCtxs.forEach(function (fila) {
					if (fila !== null) {
						var valor = fila.getProperty("payedAmt");
						if (!isNaN(valor)) {
							iImportePagar += Number(valor);
						}
					}
				});
				this.getView().getModel("oImporteSuma").setProperty("/sumatoriaConfirmacionPago", iImportePagar.toFixed(2));
				//Solo cuando viene de cambio en casilla de texto...
				if (oEvent === null) {
					return;
				}
				var oRow = oEvent.getSource().getParent();
				var oDatePicker = null;
				for (var columna of oRow.getCells()) {
					if (columna.getId().indexOf("dpFechaconfpago") !== -1) {
						oDatePicker = columna;
					}
				}
				this._onObtenerIntFila(oDatePicker);
			},
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name onValueHelpCodBco
			 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
			 * @desc Muestra el codigo de banco.
			 */

			onValueHelpCodBco: function (oEvent) {
				//Guardar el path de la fila que voy a modificar:
				this._ctxRow = oEvent.getSource().getParent().getBindingContext("modeloOperation");
				this.oCtaDest = oEvent.getSource().getParent().getCells().find(x => x.getId().search("cbCtaDestCP") !== -1);
				// create value help dialog
				if (!this._ValueHelpDialogCodBco) {
					Fragment.load({
						id: "valueCodBcoHelpDialog",
						name: "vn.pp.ux_vn_pp_monitor.view.DialogCodBco",
						controller: this
					}).then(function (oValueHelpDialog) {
						this._ValueHelpDialogCodBco = oValueHelpDialog;
						this.getView().addDependent(this._ValueHelpDialogCodBco);
						this._ValueHelpDialogCodBco.open();
						this._onValueHelpCodBco_firstFilter();
					}.bind(this));
				} else {
					this._ValueHelpDialogCodBco.open();
					this._onValueHelpCodBco_firstFilter();
				}
			},

			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name _onValueHelpCodBco_firstFilter
			 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
			 * @desc Hace el filtro del codigo de banco.
			 */
			_onValueHelpCodBco_firstFilter: function () {
				//Definir el primer filtro:
				var aFilterAnd = [],
					aFinalFilters = [];
				// 2) Search filters (WITH AND)
				aFilterAnd.push(new Filter("Zlsch", FilterOperator.EQ, "T"));
				aFilterAnd.push(new Filter("Waers", FilterOperator.EQ, this._ctxRow.getProperty("financedItem/currency")));
				aFilterAnd.push(new Filter("Gsber", FilterOperator.EQ, this._ctxRow.getProperty("financedItem/center")));
				aFilterAnd.push(new Filter("Spras", FilterOperator.EQ, "S"));
				aFinalFilters.push(new Filter(aFilterAnd, true));
				this._ValueHelpDialogCodBco.getBinding("items").filter(aFinalFilters);
			},
			/** 
			 * @author Jorge Carlos Bustillo Guerra
			 * @function
			 * @name updateBindingOptions
			 * @param {} - sCollectionId, oBindingData, sSourceId 
			 * @desc .
			 */
			updateBindingOptions: function (sCollectionId, oBindingData, sSourceId) {
				this.mBindingOptions = this.mBindingOptions || {};
				this.mBindingOptions[sCollectionId] = this.mBindingOptions[sCollectionId] || {};
				var aSorters = this.mBindingOptions[sCollectionId].sorters;
				var aGroupby = this.mBindingOptions[sCollectionId].groupby;
				// If there is no oBindingData parameter, we just need the processed filters and sorters from this function
				if (oBindingData) {
					if (oBindingData.sorters) {
						aSorters = oBindingData.sorters;
					}
					if (oBindingData.groupby || oBindingData.groupby === null) {
						aGroupby = oBindingData.groupby;
					}
					// 1) Update the filters map for the given collection and source
					this.mBindingOptions[sCollectionId].sorters = aSorters;
					this.mBindingOptions[sCollectionId].groupby = aGroupby;
					this.mBindingOptions[sCollectionId].filters = this.mBindingOptions[sCollectionId].filters || {};
					this.mBindingOptions[sCollectionId].filters[sSourceId] = oBindingData.filters || [];
				}
				// 2) Reapply all the filters and sorters
				var aFilters = [];
				for (var key in this.mBindingOptions[sCollectionId].filters) {
					aFilters = aFilters.concat(this.mBindingOptions[sCollectionId].filters[key]);
				}
				// Add the groupby first in the sorters array
				if (aGroupby) {
					aSorters = aSorters ? aGroupby.concat(aSorters) : aGroupby;
				}
				var aFinalFilters = aFilters.length > 0 ? [new sap.ui.model.Filter(aFilters, true)] : undefined;
				return {
					filters: aFinalFilters,
					sorters: aSorters
				};
			},
			/** 
			 * @author Jorge Carlos Bustillo Guerra
			 * @function
			 * @name _codBcoHandleValueHelpSearch
			 * @param {} - sCollectionId, oBindingData, sSourceId 
			 * @desc .
			 */
			_codBcoHandleValueHelpSearch: function (oEvent) {
				var oControl = oEvent.getSource();
				// Get the search query, regardless of the triggered event ('query' for the search event, 'newValue' for the liveChange one, 'value' for the liveChange of SelectDialogs).
				var sQuery = oEvent.getParameter("query") || oEvent.getParameter("newValue") || oEvent.getParameter("value");
				var sSourceId = oEvent.getSource().getId();
				return new Promise(function (fnResolve) {
					var aFinalFilters = [];
					var aFilters = [];
					var aFilterAnd = [];
					// 2) Search filters (WITH AND)
					aFilterAnd.push(new Filter("Zlsch", FilterOperator.EQ, "T"));
					aFilterAnd.push(new Filter("Waers", FilterOperator.EQ, this._ctxRow.getProperty("financedItem/currency")));
					aFilterAnd.push(new Filter("Gsber", FilterOperator.EQ, this._ctxRow.getProperty("financedItem/center")));
					aFilterAnd.push(new Filter("Spras", FilterOperator.EQ, "S"));
					aFinalFilters.push(new Filter(aFilterAnd, true));
					// 1) Search filters (with OR)
					if (sQuery && sQuery.length > 0) {
						aFilters.push(new Filter("Hbkid", FilterOperator.Contains, sQuery));
						aFilters.push(new Filter("Hktid", FilterOperator.Contains, sQuery));
						aFilters.push(new Filter("Ukont", FilterOperator.Contains, sQuery));
						aFilters.push(new Filter("Text1", FilterOperator.Contains, sQuery));
						aFinalFilters.push(new Filter(aFilters, false));
					}
					var oBindingOptions = this.updateBindingOptions(sSourceId, {
						filters: aFinalFilters
					}, sSourceId);
					var oBindingInfo = oControl.getBindingInfo("items");
					if (oBindingInfo) {
						oControl.bindAggregation("items", {
							model: oBindingInfo.model,
							path: oBindingInfo.path,
							parameters: oBindingInfo.parameters,
							template: oBindingInfo.template,
							templateShareable: true,
							sorter: oBindingOptions.sorters,
							filters: oBindingOptions.filters
						});
					}
				}.bind(this)).catch(function (sErr) {
					if (sErr !== undefined) {
						MessageBox.error(sErr.message);
					}
				});

			},
			/** 
			 * @author Jorge Carlos Bustillo Guerra
			 * @function
			 * @name _codBcoHandleValueHelpClose
			 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
			 * @desc  Funcion para codigo de banco al cerrar
			 */
			_codBcoHandleValueHelpClose: function (oEvent) {
				//Fila seleccionada:
				var oItem = oEvent.getParameter("selectedItem");
				if (oItem === undefined) { //Si no se seleccionó ninguna fila, limpiar
					this._ctxRow.setProperty("sapHBKID", "");
					this._ctxRow.setProperty("sapUKONT", "");
					this._ctxRow.setProperty("sapHKTID", "");
					this._ctxRow.setProperty("sapZLSCH", "");
					this._ctxRow.setProperty("fromAcc", "");
					this._ctxRow.setProperty("destAcc", "");
					return;
				}
				//Vaciar propiedades seleccionadas:
				var oBinding = oItem.getBindingContext("S4_0001_SRV");
				var oObject = oBinding.getObject();
				this._ctxRow.setProperty("sapHBKID", oObject.Hbkid);
				this._ctxRow.setProperty("sapUKONT", oObject.Ukont);
				this._ctxRow.setProperty("sapHKTID", oObject.Hktid);
				this._ctxRow.setProperty("sapZLSCH", oObject.Zlsch);
				this._processLayout(oEvent);
			},
			/** 
			 * @author Jorge Carlos Bustillo Guerra
			 * @function
			 * @name _processLayout
			 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
			 * @desc  Funcion para procesar el layout en S4 con el servicio Bancos_PropiosSet
			 */
			_processLayout: function (oEvent) {
				//Obtener información de la cuenta seleccionada para saber si es Citi o BBVA
				var that = this;
				var oTable = this.getView().byId("tablaConfPag");
				this._ctxRow.setProperty("fromAcc", "");
				this._ctxRow.setProperty("destAcc", "");
				that.oCtaDest.setBusy(true);
				oTable.setBusy(true);
				var oModel = this.getView().getModel("ConfPagoCollection");
				var aData = oModel.getData();
				var oPayObj = this._ctxRow.getObject();
				var oObjOrg = aData.find(x => x.ID === oPayObj.financedItem.ID);
				//Banco propio:
				var sUrl = this._getUrl() + "s4_dev/sap/opu/odata/sap/Z_OD_SCP_BAVNPP001_SRV/Bancos_PropiosSet"
					//Filtros:
					+
					"?$filter=" + encodeURI(
						"Bukrs eq '" + oObjOrg.companyCode + "'" +
						" and Hbkid eq '" + oPayObj.sapHBKID + "'" +
						" and Waers eq '" + oObjOrg.currency + "'" +
						" and Gsber eq '" + oObjOrg.center + "'" +
						" and Zlsch eq '" + oPayObj.sapZLSCH + "'");
				$.ajax({
					url: sUrl,
					type: "GET",
					dataType: "json",
					contentType: "application/json;IEEE754Compatible=true"
				}).then(function (data) {
					oTable.setBusy(false);
					if (data.d.results.length !== 0) {
						var oData = data.d.results[0];
						if (oData.Bankl !== "002" && oData.Bankl !== "012") {
							that.oCtaDest.setBusy(false);
							return;
						}
						if (oData.Bankl === "002" && oData.Bnkn2 === "") {
							////console.log("Bnkn2 vacio para:" + oData.Hbkid);
							that.oCtaDest.setBusy(false);
							return;
						}
						that._ctxRow.setProperty("fromAcc", oData.Bankn + "|*|" +
							oData.Bankl + "|*|" +
							oData.Refzl + "|*|" +
							oData.Bnkn2 + "|*|" +
							"0");
						that._setFilterCtaDest(that.oCtaDest, that._ctxRow, oObjOrg.sapLINFR);
					}
				}).fail(function (jqXHR, textStatus, errorThrown) {
					////console.log(jqXHR, textStatus, errorThrown);
					oTable.setBusy(false);
					that.oCtaDest.setBusy(false);
				});
			},
			/** 
			 * @author Jorge Carlos Bustillo Guerra
			 * @function
			 * @name _setFilterCtaDest
			 * @param {object} oComboBox - 
			 * @param {object} oCtxtRow - 
			 * @param {string} sSapLinfr - 
			 * @desc  
			 */
			_setFilterCtaDest: function (oComboBox, oCtxtRow, sSapLinfr) {
				var oFromAcc = oCtxtRow.getProperty("fromAcc").split("|*|");
				//Definir el primer filtro:
				var aFilterAnd = [],
					aFinalFilters = [];
				// 2) Search filters (WITH AND)
				aFilterAnd.push(new Filter("Partner", FilterOperator.EQ, sSapLinfr));
				aFilterAnd.push(new Filter("Bankl", FilterOperator.EQ, oFromAcc[1]));
				if (oFromAcc[1] === "012") {
					aFilterAnd.push(new Filter("Bankn", FilterOperator.EQ, "CIE"));
				}
				aFinalFilters.push(new Filter(aFilterAnd, true));
				oComboBox.getBinding("items").filter(aFinalFilters);
				this._getCtaDestEnabled(oComboBox, oCtxtRow);
			},
			/** 
			 * @author Jorge Carlos Bustillo Guerra
			 * @function
			 * @name _getCtaDestEnabled
			 * @param {object} oComboBox - 
			 * @param {object} oCtxtRow -          
			 * @desc  
			 */
			_getCtaDestEnabled: function (oComboBox, oCtxtRow) {
				// Hacemos una promesa:
				var p1 = new Promise(
					//Después de 1 segundos continuar
					function (resolve, reject) {
						// Esto es solo un ejemplo para crear asincronismo
						window.setTimeout(function () {
							resolve("OK");
						}, 1000);
					}
				);
				p1.then((successMessage) => {
					oComboBox.setBusy(false);
					oComboBox.setValueState("None");
					oComboBox.setSelectedKey("");
					oComboBox.clearSelection();
					//Obtener la lista de elementos activos
					var aEnabledItems = oComboBox.getItems().filter(x =>
						x.getProperty("enabled") === true
					);
					var oFromAcc = oCtxtRow.getProperty("fromAcc").split("|*|");
					oComboBox.setEnabled(false);
					oCtxtRow.setProperty("fromAcc",
						oFromAcc[0] + "|*|" +
						oFromAcc[1] + "|*|" +
						oFromAcc[2] + "|*|" +
						oFromAcc[3] + "|*|" +
						aEnabledItems.length);
					if (aEnabledItems.length === 0) {
						return;
					}
					oComboBox.setEnabled(true);
					//Si hay más de uno, marcar como amarillo
					if (aEnabledItems.length > 1) {
						oComboBox.setValueState("Warning");
						oComboBox.setValueStateText("Seleccione cuenta");
						return;
					}
					//Seleccionar el primero
					oComboBox.setSelectedKey(aEnabledItems[0].getKey());
				});
			},

			/** 
			 * @author Jorge Carlos Bustillo Guerra
			 * @function
			 * @name onValidateCtaDest
			 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
			 * @desc  Validar cuenta destino
			 */
			onValidateCtaDest: function (oEvent) {
				this._validateCB(oEvent);
			},

			/** 
			 * @author Jorge Carlos Bustillo Guerra
			 * @function
			 * @name _validateCB
			 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
			 * @desc  Validar combobox sea valor seleccionado y no ingresado
			 */
			_validateCB: function (oEvent) {
				var sNewVal = oEvent.getParameter("newValue");
				var sKey = oEvent.getSource().getSelectedItem();

				if (sNewVal !== "" && sKey === null) {
					oEvent.getSource().setValue("");
					oEvent.getSource().setValueState("Error");
				} else {
					oEvent.getSource().setValueState("None");
				}
			},
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name oCopyConfPag
			 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
			 * @desc Copia la configuración de la primera fila al resto de las filas.
			 */
			oCopyConfPag: function (oEvent) {
				//Quiero obtener las propiedades de la primera fila para copiar
				var oTabla = this.getView().byId("tablaConfPag");
				oTabla.setBusy(true);
				oTabla.setBusyIndicatorDelay(0);
				//Obtengo la vista de la tabla 
				var oTablaConfPag = oTabla.getBinding().getContexts();
				var oTablaConfCells = oTabla.getRows();
				//Datos para validaciones; Financiera Centro y moneda
				var sFinCode = oTablaConfPag[0].getProperty("financedItem/finSrv_finCode");
				var sCurrency = oTablaConfPag[0].getProperty("financedItem/currency");
				var sCenter = oTablaConfPag[0].getProperty("financedItem/center");

				/*Obtengo de la vista el contexto donde se almacena la informacion, y por medio de GetProperty (nombrecolumna)
				 **acceso a ella
				 */
				var oDatePay = oTablaConfPag[0].getProperty("datePay"); //fecha pago
				var sHBKID = oTablaConfPag[0].getProperty("sapHBKID"); //Cod. Bco
				var sUKONT = oTablaConfPag[0].getProperty("sapUKONT"); //Cuenta
				var sHKTID = oTablaConfPag[0].getProperty("sapHKTID"); //Cuenta egr
				var sZLSCH = oTablaConfPag[0].getProperty("sapZLSCH"); //Via de pago
				var sFromAcc = oTablaConfPag[0].getProperty("fromAcc"); //Cuenta origen layout
				var sDestAcc = oTablaConfPag[0].getProperty("destAcc"); //Cuenta destino layout
				/*recorro la vista y asigno por medio de setProperty (nombrecolumna, variable newvalue) al contexto(modeloOperation) 
				 **los nuevos valores 
				 */
				var aDatos = [];
				for (var fila of oTablaConfPag) {
					//Datos para validaciones; Financiera Centro y moneda
					var sFinCode1 = fila.getProperty("financedItem/finSrv_finCode");
					var sCurrency1 = fila.getProperty("financedItem/currency");
					var sCenter1 = fila.getProperty("financedItem/center");
					if (sFinCode1 !== sFinCode || sCurrency !== sCurrency1 || sCenter !== sCenter1) {
						continue;
					}
					fila.setProperty("datePay", oDatePay);
					fila.setProperty("sapHBKID", sHBKID);
					fila.setProperty("sapUKONT", sUKONT);
					fila.setProperty("sapHKTID", sHKTID);
					fila.setProperty("sapZLSCH", sZLSCH);
					fila.setProperty("fromAcc", sFromAcc);
					fila.setProperty("destAcc", sDestAcc);
					var oID = fila.getProperty("financedItem/ID");
					var oPayedAmt = fila.getProperty("payedAmt");
					var oIntPayAmt = fila.getProperty("intPayAmt");
					aDatos.push({
						"FinancedItemID": oID,
						"datePay": oDatePay,
						"payedAmt": Number(oPayedAmt).toFixed(2),
						"intRecalAmt": Number(oIntPayAmt).toFixed(2)
					});
				}
				//2) Consultar los resultados
				var oResultado = this._onObtenerInt(aDatos);
				for (var fila2 of oTablaConfPag) {
					var iIdx = oTablaConfPag.indexOf(fila2);
					var oID2 = fila2.getProperty("financedItem/ID");
					var oDato = oResultado.find(oRow =>
						oRow.FinancedItemID === oID2
					);
					if (oDato === undefined) {
						continue;
					}
					fila2.setProperty("intPayAmt", Number(oDato.intRecalAmt).toFixed(2)); //Asignación			
					//Actualizar ComboBox
					try {
						var oModel = this.getView().getModel("ConfPagoCollection");
						var aData = oModel.getData();
						var oObjOrg = aData.find(x => x.ID === oID2);
						var oRow = oTablaConfCells[iIdx];
						var oCtaDest = oRow.getCells().find(x => x.getId().search("cbCtaDestCP") !== -1);
						this._setFilterCtaDest(oCtaDest, fila2, oObjOrg.sapLINFR);
					} catch (ex) {
						console.log(ex);
					}
				}
				oTabla.setBusy(false);
			},
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name oValidCaracter
			 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
			 * @desc Valida si el campo de Imp Pag tiene caracteres
			 */
			oValidCaracter: function (oEvent) {
				//debugger;
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
				////console.log(sInputValue);
			},
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name oValidCaracterInt
			 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
			 * @desc Valida si el campo de Intereses a Pagar tiene caracteres
			 */
			oValidCaracterInt: function (oEvent) {
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
						var sTituloI18n = this._i18n.getText("IntPagErrTit");
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