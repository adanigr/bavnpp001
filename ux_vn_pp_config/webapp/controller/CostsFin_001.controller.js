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

	return BaseController.extend("vn.pp.ux_vn_pp_config.controller.CostsFin_001", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf vn.pp.ux_vn_pp_config.view.CostsFin_001
		 */
		onInit: function () {
			//Groups ID a Actualizar el primero es el principal
			this.aGroupID = ["CostsFin_001", "CostsFin_001_new"];
			//Nombre modelo a actualizar
			this.sModelName = "modeloConfig";
			//Nombre de tablas a actualizar
			this.sObjectName = "tableCostsFin_001";
			//Nombre agregaciones a actualizar
			this.sObjectAggregation = "rows";
			//Nombre principal propiedad a actualizar:
			this.sMainProperty = "/CostsFin_001_new";
			//Eventos
			var omcb = this.byId("cbcompanyCode_CostsFin_001");
			omcb.clearSelection();
			this._timedOnSearch(1000);
			//Actualizar al regresar o navegar
			this.getRouter().attachRouteMatched(this._onObjectMatched, this);
		},
		/** 
		 * Valida la tasa ingresada, en caso de ser vacío 
		 * @param {sap.ui.base.Event} oEvent Evento del input
		 */
		onValidateRate: function (oEvent) {
			var oInput = oEvent.getSource();
			oInput.setValueState("None");
			var sNewVal = oInput.getValue();
			if (!this.validateNumber(sNewVal)) {
				MessageBox.error(this.getText("msgInvalidValue"));
				oInput.setValue("0");
				return;
			}
		},

		/**
		 * Realiza la búsqueda de acuerdo a los criterios de la cabecera.
		 * @param  {sap.ui.base.Event} oEvent Evento del botón Ir
		 */
		onSearch: function (oEvent) {
			var that = this;
			var oView = that.getView();
			var aFilters = [];
			aFilters.push(that.getTableFiltersMCB(oView, "cbcompanyCode_CostsFin_001", "companyCode", false));
			aFilters.push(that.getTableFiltersCB(oView, "cbfundSubType_ID_CostsFin_001", "fundSubType_ID", false));
			if (aFilters[0] === false) {
				var oNewFilter = that.getAllFilters("companyCode", "/SelectedBukrs", "Bukrs");
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