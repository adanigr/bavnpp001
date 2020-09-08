/**
 * @file Controlador para Documentos.
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
	"sap/m/MessageToast"
], function (ManagedObject, MessageBox, History, Filter, FilterOperator, MessageToast) {
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
	 * @desc   Función principal de Documentos.
	 * @return {class} - Retorna controller.DialogViewDoc .
	 */
	return ManagedObject.extend("vn.pp.ux_vn_pp_monitor.controller.DialogViewDoc", {
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
			this._oControl = sap.ui.xmlfragment(oView.getId(), "vn.pp.ux_vn_pp_monitor.view.DialogViewDoc", this);
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
		},
		/** 
		 * @author Jorge Carlos Bustillos
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
		 * @name _onButtonPress1
		 * @desc Cierra el Dialog Activo Fijo.
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
		 * @name onPressViewDoc
		 * @desc Genera los doumentos
		 */
		onPressViewDoc: function (oEvent) {
			var oPanelHead = this.getView().byId("panelHead");
			var oPanelDet = this.getView().byId("panelDet");
			var oTableDet = this.getView().byId("tableViewDocDet");
			var sBukrs = oEvent.getParameter("row").getBindingContext("modeloItems").getProperty("BUKRS");
			var sBelnr = oEvent.getParameter("row").getBindingContext("modeloItems").getProperty("BELNR");
			var sGjahr = oEvent.getParameter("row").getBindingContext("modeloItems").getProperty("GJAHR");
			var sBlart = oEvent.getParameter("row").getBindingContext("modeloItems").getProperty("BLART");

			var sTxtMsg = this._i18n.getText("mVisualPosDoc", [sBelnr, sBukrs, sGjahr, sBlart]);
			oPanelDet.setHeaderText(sTxtMsg);
			//oPanelDet.setHeaderText("Visualizar Posiciones: Doc. " + sBelnr + " Soc. " + sBukrs + " Ej." + sGjahr + " Cl. Doc. " + sBlart);
			var aFiltersAnd = [];
			aFiltersAnd.push(new Filter("Bukrs", FilterOperator.EQ, sBukrs));
			aFiltersAnd.push(new Filter("Belnr", FilterOperator.EQ, sBelnr));
			aFiltersAnd.push(new Filter("Gjahr", FilterOperator.EQ, sGjahr));
			//Integrar filtro con AND
			var oFilterAll = new Filter({
				filters: aFiltersAnd,
				and: true
			});

			oPanelDet.setVisible(true).setExpanded(true);
			oPanelHead.setExpanded(false);
			var oBinding = oTableDet.getBinding("rows");
			oBinding.aFilters = null;
			oTableDet.getModel("S4_0001_SRV").refresh(true);
			oBinding.filter(oFilterAll);
			oTableDet.getModel("S4_0001_SRV").refresh(true);
		},
		/** 
		 * @author Jorge Carlos Bustillos
		 * @function
		 * @name onExpandHead
		 * @desc 
		 */
		onExpandHead: function (oEvent) {
			var oPanelDet = this.getView().byId("panelDet");
			if (oPanelDet === undefined) {
				return;
			}
			if (oEvent.getParameter("expand")) {
				var sTxtMsg = this._i18n.getText("mensajePos");
				oPanelDet.setHeaderText(sTxtMsg);

				//	oPanelDet.setHeaderText("Posiciones:");
				oPanelDet.setExpanded(false).setVisible(false);
				return;
			}
		},
		/** 
		 * @author Jorge Carlos Bustillos
		 * @function
		 * @name onExpandPos
		 * @desc 
		 */
		onExpandPos: function (oEvent) {
			var oPanelHead = this.getView().byId("panelHead");
			if (!oEvent.getParameter("expand") && oPanelHead !== undefined) {
				if (!oPanelHead.getExpanded()) {
					oPanelHead.setExpanded(true);
				}
			}
		}

	});
}, /* bExport= */ true);