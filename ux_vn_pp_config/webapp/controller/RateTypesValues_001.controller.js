sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent",
	"vn/pp/ux_vn_pp_config/controller/BaseController",
	"sap/m/MessageBox",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, History, UIComponent, BaseController, MessageBox, Filter, FilterOperator) {
	"use strict";

	return BaseController.extend("vn.pp.ux_vn_pp_config.controller.RateTypesValues_001", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf vn.pp.ux_vn_pp_config.view.RateTypesValues_001
		 */
		onInit: function () {
			//Groups ID a Actualizar el primero es el principal
			this.aGroupID = ["RateTypesValues_001", "RateTypesValues_001_new"];
			//Nombre modelo a actualizar
			this.sModelName = "modeloConfig";
			//Nombre de tablas a actualizar
			this.sObjectName = "tableRateTypesValues_001";
			//Nombre agregaciones a actualizar
			this.sObjectAggregation = "rows";
			//Nombre principal propiedad a actualizar:
			this.sMainProperty = "/RateTypesValues_001_new";
			//Eventos
			//Cargar datos pasados el segundo
			this._timedOnSearch(1000);
			//Actualizar al regresar o navegar
			this.getRouter().attachRouteMatched(this._onObjectMatched, this);
		},

		/**
		 * Realiza la búsqueda de acuerdo a los criterios de la cabecera.
		 * @param  {sap.ui.base.Event} oEvent Evento del botón Ir
		 */
		onSearch: function (oEvent) {
			var that = this;
			var oView = that.getView();
			var aFilters = [];
			aFilters.push(that.getTableFiltersCB(oView, "cbTipoTasa", "rate", false));
			aFilters.push(that.getTableFiltersDRS(oView, "drsFechaTasa", "date"));
			aFilters = aFilters.filter(x => x !== false);
			var oBinding = that.getMainObjectBind(that.sObjectName, that.sObjectAggregation);
			oBinding.filter(aFilters);
			//Ocultar cabecera
			that.byId("RateTypesValues_001").setHeaderExpanded(false);
		}
	});

});