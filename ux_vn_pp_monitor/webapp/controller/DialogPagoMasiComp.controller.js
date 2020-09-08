/**
 * @file Controlador Pago por Compensación.
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
		return ManagedObject.extend("vn.pp.ux_vn_pp_monitor.controller.DialogPagoMasiComp", {
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
				this._oControl = sap.ui.xmlfragment(oView.getId(), "vn.pp.ux_vn_pp_monitor.view.DialogPagoMasiComp", this);
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
			 * @desc Se abre el Dialog Pago por Compensación.
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
				var Args = Array.prototype.slice.call(arguments);
				if (oControl.open) {
					oControl.open.apply(oControl, Args);
				} else if (oControl.openBy) {
					oControl.openBy.apply(oControl, Args);
				}
				//*******Suma de el campo Propuesta de Pago******
				var oImporteSumatoria = new JSONModel({
					"sumatoriaCompMasivoPago": 0
				});
				this.getView().setModel(oImporteSumatoria, "oImporteSumatoria");
			},
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name close
			 * @param {undefined} bRefresh - Si es Undefined se cierra el dialogo.
			 * @desc Cierra el Dialog Pago por Compensación.
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
			 * @desc Genera el proceso para Pago Compensación.
			 */
			_onButtonPress: function (oEvent) {
				var oTablaCtxs = this.getView().byId("tablacompmas").getBinding().getContexts();
				var that = this;
				var bValidaFlag = true;
				//var oDialog = oEvent.getSource().getParent();
				oTablaCtxs.forEach(function (fila) {
					if (fila !== null) {

						var iPago = parseFloat(fila.getProperty("payedAmt"));

						//Validación de Importe Pagado no vacio
						if (isNaN(iPago) || (iPago === null) || (iPago === '') || (iPago.length === 0) || iPago <= 0) {
							MessageBox.error(that._i18n.getText("ErrIpago"));
							bValidaFlag = false;
							return;
						}
					}
				});
				if (bValidaFlag === false) {
					return;
				}
			},
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name onButtonPressClose
			 * @desc Cierra el Dialog 
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
			 * @name onChangePagoMasi
			 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
			 * @desc Realiza la suma de la columna Importe a Pagar.
			 */
			onChangePagoMasi: function (oEvent) {
				var that = this;
				var oDataPago = that.getView().getModel("PagCompCollection").getData(); //obtiene los datos de la tabla  y los guarda en un json
				that.iImportePagar = 0;
				oDataPago.map(function (temp) {
					if (temp.payedAmt !== undefined)
						if (!isNaN(temp.payedAmt[0]))
							that.iImportePagar = that.iImportePagar + parseFloat(temp.payedAmt[0]);
				});
				that.getView().getModel("oImporteSumatoria").setProperty("/sumatoriaCompMasivoPago", that.iImportePagar.toFixed(2));
			},
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name oCopyPropPag
			 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
			 * @desc Copia la configuración de la primera fila al resto de las filas.
			 */
			oCopyPagoComp: function (oEvent) {
				var oModel = this.getView().getModel("PagCompCollection");
				//Universo de registros
				var aRegistros = oModel.getData(); //arreglo con registros
				//fila1 Almacena el primer renglon de la tabla
				var oFila1 = aRegistros[0];
				//A los demás registros copiar los valores del primer renglón
				for (var i = 1; i < aRegistros.length; i++) {
					//Objeto a modificar a nivel modelo: + propiedad: /1/datePay
					var sPath = "/" + i + "/";
					oModel.setProperty(sPath + "tcamb", oFila1.tcamb);
					oModel.setProperty(sPath + "FPAGO", oFila1.FPAGO);
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
						var sTituloI18n = this._i18n.getText("ImportPagarTit");
						MessageBox.error(sTextoI18n, {
							icon: MessageBox.Icon.ERROR,
							title: sTituloI18n,
							actions: [MessageBox.Action.OK],
							emphasizedAction: MessageBox.Action.OK,
							onClose: function (sAction) {
								if (sAction === "OK") {
									oInputValue.setValue("0.00");
									return;
								}
							}
						});
					}
				}

			}
		});
	}, /* bExport= */ true);