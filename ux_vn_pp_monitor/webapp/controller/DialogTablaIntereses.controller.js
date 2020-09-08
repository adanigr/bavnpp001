/**
 * @file Controlador Confirmar Pago.
 * @author Javier Balcazar Cruz <jbalcazar@zapata.com.mx>.
 * Notación JSDoc para Funciones, Parametros, Objetos, etc.
 * @param {param type} param name - description.
 */
/** 
 * sap.ui.define:
 * @module ManagedObject
 * @module MessageBox
 * @module History
 * @module Filter
 * @module FilterOperator
 * @module MessageToast
 * @module JSONModel
 */
sap.ui.define([
	"sap/ui/base/ManagedObject",
	"sap/m/MessageBox",
	"sap/ui/core/routing/History",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function (ManagedObject, MessageBox, History, Filter, FilterOperator, MessageToast, JSONModel) {
	"use strict";
	/**
	 *  Functión Principal
	 * @author Javier Balcazar Cruz 
	 * @param  {module} ManagedObject - Clase base que introduce algunos conceptos básicos, como la gestión del estado y el enlace de datos.
	 * @param  {module} MessageBox - Proporciona métodos más fáciles para crear alertas, diálogos de confirmación o diálogos de mensajes arbitrarios etc. 
	 * @param  {module} History - Crea una instancia de la historia.
	 * @param  {module} Filter - Permite hacer uso de filtros.
	 * @param  {module} FilterOperator - Pperador para los filtros.
	 * @param  {module} MessageToast - Ventana emergente pequeña y no disruptiva para mostrar mensajes.
	 * @param  {module} JSONModel - Implementación del modelo para formato JSON.	
	 * @desc   Función principal de Tabla de Intereses.
	 * @return {class} - Retorna controller.DialogTablaIntereses .
	 */

	return ManagedObject.extend("vn.pp.ux_vn_pp_monitor.controller.DialogTablaIntereses", {
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
			this._oControl = sap.ui.xmlfragment(oView.getId(), "vn.pp.ux_vn_pp_monitor.view.DialogTablaIntereses", this);
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
		 * @desc Abrir dialogo, agregar dependientes y modelos 
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
			//*******Suma de el campo Saldo a financiar******
			var oImporteSumatoria = new JSONModel({
				"sumatoriaTraspaso": 0
			});
			this.getView().setModel(oImporteSumatoria, "oImporteSumatoria");
			this.onChangeImporte(null);
			//*********************************************
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
		 * @name _onButtonPress1
		 * @desc Cierra el Dialog Activo Fijo.
		 */
		_onButtonPress1: function () {
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

			var oDataPago = this.getView().getModel("TabIntCollection").getData(); //obtiene los datos de la tabla  y los guarda en un json
			this.iImportePagar = 0;
			oDataPago.map(function (temp) {
				if (temp.fIntSum !== undefined)
					if (!isNaN(temp.fIntSum))
						this.iImportePagar = this.iImportePagar + parseFloat(temp.fIntSum);
			}, this);
			this.getView().getModel("oImporteSumatoria").setProperty("/sumatoriaTraspaso", this.iImportePagar.toFixed(2));
		}

	});
}, /* bExport= */ true);