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

	return BaseController.extend("vn.pp.ux_vn_pp_config.controller.FinSrvCredits_001", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf vn.pp.ux_vn_pp_config.view.FinSrvCredits_001
		 */
		onInit: function () {
			//Groups ID a Actualizar el primero es el principal
			this.aGroupID = ["FinSrvCredits_001", "FinSrvCredits_001_new"];
			//Nombre modelo a actualizar
			this.sModelName = "modeloConfig";
			//Nombre de tablas a actualizar
			this.sObjectName = "tableFinSrvCredits_001";
			//Nombre agregaciones a actualizar
			this.sObjectAggregation = "rows";
			//Nombre principal propiedad a actualizar:
			this.sMainProperty = "/FinSrvCredits_001_new";
			//Eventos
			var omcb = this.byId("cbWerks_FinSrvCredits_001");
			omcb.clearSelection();
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
			aFilters.push(that.getTableFiltersMCB(oView, "cbWerks_FinSrvCredits_001", "Werks", false));
			aFilters.push(that.getTableFiltersCB(oView, "cbFinCode_FinSrvCredits_001", "finServ_finCode", false));
			if (aFilters[0] === false) {
				var oNewFilter = that.getAllFilters("sapVKORG", "/SelectedWerks", "Werks");
				if (!oNewFilter) {
					that.onNavBack();
					return;
				}
				aFilters.push(oNewFilter);
			}
			aFilters = aFilters.filter(x => x !== false);
			var oBinding = that.getMainObjectBind(that.sObjectName, that.sObjectAggregation);
			oBinding.filter(aFilters);
			//Ocultar cabecera
			that.byId(that.aGroupID[0]).setHeaderExpanded(false);
		}
	});

});