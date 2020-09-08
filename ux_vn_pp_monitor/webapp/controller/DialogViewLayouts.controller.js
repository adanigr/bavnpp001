/* global download:true */
/**
 * @file Controlador para layout
 * @author Jorge Bustillos <jbustillos@zapata.com.mx>
 * Notación JSDoc para Funciones, Parametros, Objetos, etc.
 * @param {param type} param name - description.
 */
sap.ui.define([
	"sap/ui/base/ManagedObject",
	"sap/m/MessageBox",
	"sap/ui/core/routing/History",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageToast",
	"vn/pp/ux_vn_pp_monitor/libs/download"
], function (ManagedObject, MessageBox, History, Filter, FilterOperator, MessageToast, downloadjs) {
	"use strict";
	/**
	 *  Functión Principal
	 * @author Jorge Carlos Bustillos
	 * @param  {module} ManagedObject - Clase base que introduce algunos conceptos básicos, como la gestión del estado y el enlace de datos.
	 * @param  {module} MessageBox - Proporciona métodos más fáciles para crear alertas, diálogos de confirmación o diálogos de mensajes arbitrarios etc. 	
	 * @param  {module} History - Crea una instancia de la historia.
	 * @param  {module} Filter - Permite hacer uso de filtros.
	 * @param  {module} FilterOperator - Pperador para los filtros.   
	 * @param  {module} MessageToast - Ventana emergente pequeña y no disruptiva para mostrar mensajes.
	 * @desc   Función principal de Layout.
	 * @return {class} - Retorna controller.DialogViewLayouts .
	 */
	return ManagedObject.extend("vn.pp.ux_vn_pp_monitor.controller.DialogViewLayouts", {
		//-------------------------------------------------------------------
		//	Eventos estándar UI5:
		//-------------------------------------------------------------------	
		/** 
		 * @author Jorge Carlos Bustillos 
		 * @function
		 * @name constructor 
		 * @param  {object} oView Vista original.
		 * @desc Genera controlador a partir de una vista.
		 */
		constructor: function (oView) {
			this._oView = oView;
			this._oControl = sap.ui.xmlfragment(oView.getId(), "vn.pp.ux_vn_pp_monitor.view.DialogViewLayouts", this);
			this._bInit = false;
			this._i18n = this.getView().getModel("i18n").getResourceBundle();
		},
		/** 
		 * @author Jorge Carlos Bustillos
		 * @function
		 * @name exit
		 * @desc Elimina la vista.
		 */
		exit: function () {
			delete this._oView;
		},
		/** 
		 * @author Jorge Carlos Bustillos
		 * @function
		 * @name getView
		 * @desc Obtiene la vista.
		 * @return {object} - Retorna _oView.
		 */
		getView: function () {
			return this._oView;
		},
		/** 
		 * @author Jorge Carlos Bustillos
		 * @function
		 * @name getControl
		 * @desc Obtiene el controlador.
		 * @return {object} - Retorna _oControl.
		 */
		getControl: function () {
			return this._oControl;
		},
		/** 
		 * @author Jorge Carlos Bustillos
		 * @function
		 * @name getOwnerComponent
		 * @desc Obtiene controlador padre.
		 *  @return {object} - Retorna ._oView.getController().getOwnerComponent();
		 */
		getOwnerComponent: function () {
			return this._oView.getController().getOwnerComponent();
		},
		//-------------------------------------------------------------------
		//	Funcionalidad para dialogo:
		//-------------------------------------------------------------------			
		/** 
		 * @author Jorge Carlos Bustillos
		 * @function
		 * @name open
		 * @desc Abrir dialogo, agregar dependientes y modelos Cambio de Moneda.
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
		 * @author Jorge Carlos Bustillos
		 * @function
		 * @name setRouter
		 * @param {} oRouter - 
		 * @desc Obtener ruta de navegación
		 */
		setRouter: function (oRouter) {
			this.oRouter = oRouter;
		},

		/** 
		 * @author Jorge Carlos Bustillos
		 * @function
		 * @name getBindingParameters
		 * @desc Obtener binding parameters.
		 * @return {void}
		 */
		getBindingParameters: function () {
			return {};
		},
		/** 
		 * @author Jorge Carlos Bustillos
		 * @function
		 * @name _onButtonClose
		 * @desc Cierra el Dialog 
		 */
		_onButtonPress1: function () {
			this.close();
		},
		/** 
		 * @author Jorge Carlos Bustillos
		 * @function
		 * @name onInit
		 * @desc Evento onInit cuando se genera díalogo
		 */
		onInit: function () {
			this._oDialog = this.getControl();
		},

		/** 
		 * @author Jorge Carlos Bustillos
		 * @function
		 * @name onExit
		 * @desc Destruye el nombre del dialogo
		 */
		onExit: function () {
			this._oDialog.destroy();
		},

		/** 
		 * @author Jorge Carlos Bustillos
		 * @function
		 * @name onPressDwn
		 * @param {object} oEvent Evento tipo botón
		 * @desc  Evento disparado al momento de querer descargar un layout
		 */
		onPressDwn: function (oEvent) {
			var oCtx = oEvent.getSource().getParent().getBindingContext("LayDwnCollection");
			var sPath = oCtx.getPath();
			var sGenMark = oCtx.getProperty("genMark");
			var iDownCount = parseInt(oCtx.getProperty("downCount"), 10);
			var bFlagDel = oCtx.getProperty("flagDel");
			var sTxt = this._i18n.getText("txtLayoutBlock");
			if (bFlagDel === true) {
				MessageBox.error(sTxt);
				return;
			}
			var oModel = this.getView().getModel("LayDwnCollection");
			this._getLayouts(sGenMark);
			oModel.setProperty(sPath + "/downCount", iDownCount + 1);
		},

		/** 
		 * @author Jorge Carlos Bustillos
		 * @function
		 * @name _getLayouts
		 * @param {string} sGenMark Identificador de layout
		 * @desc  Obtener layouts correspondientes a la última operación éxitosa

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
				+ "srv_api/function/getLayoutDownload";
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
		 * @author Jorge Carlos Bustillos
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
		}
	});
});