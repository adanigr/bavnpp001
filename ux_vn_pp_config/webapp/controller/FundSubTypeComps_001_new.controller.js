//Descomentar para usar moment: /* global moment:true */
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent",
	"vn/pp/ux_vn_pp_config/controller/BaseController",
	"sap/m/MessageBox",
	"vn/pp/ux_vn_pp_config/libs/moment"
], function (Controller, History, UIComponent, BaseController, MessageBox, momentjs) {
	"use strict";

	return BaseController.extend("vn.pp.ux_vn_pp_config.controller.FundSubTypeComps_001_new", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf vn.pp.ux_vn_pp_config.view.FundSubTypeComps_001_new
		 */
		onInit: function () {
			//Groups ID a Actualizar el primero es el principal
			this.aGroupID = ["FundSubTypeComps_001_new", "FundSubTypeComps_001"];
			//Nombre modelo a actualizar
			this.sModelName = "modeloConfig";
			//Nombre de tablas a actualizar
			this.sObjectName = "listFundSubTypeComps_001_new";
			//Nombre agregaciones a actualizar
			this.sObjectAggregation = "items";
			//Nombre principal propiedad a actualizar:
			this.sMainProperty = "/FundSubTypeComps_001_new";
		},
		/** 
		 * Envía la información cargada al servicio
		 * @param  {sap.ui.base.Event} oEvent Evento del botón
		 */
		onSave: function (oEvent) {
			var that = this;
			var oModel = that.getView().getModel("HelpValues");
			var oItem = oModel.getProperty(that.sMainProperty);
			var oObject = that.getView().byId(that.sObjectName);
			var oBinding = that.getMainObjectBind(that.sObjectName, that.sObjectAggregation);
			MessageBox.confirm(that.getText("msgConfirmTxt"), {
				title: that.getText("msgConfirmTit"),
				onClose: function (oAction) {
					if (MessageBox.Action.OK !== oAction) {
						return;
					}
					that.resetTable(that.sObjectName, that.sObjectAggregation, that.aGroupID[0]);
					if (!oItem.companyCode || !oItem.fundSubType_ID) {
						MessageBox.error(that.getText("msgInvalidValue"));
						return;
					}
					that.getView().setBusy(true);
					oBinding.create(oItem);
					oObject.getModel(that.sModelName).submitBatch(that.aGroupID[0]);
					oBinding.attachCreateCompleted(that.onCreateCompleted, that);
				}
			});
		},
		/** 
		 * Deshace los cambios pendientes y regresa a vista anterior.
		 * @param  {sap.ui.base.Event} oEvent Evento del botón
		 */
		onDiscard: function (oEvent) {
				var that = this;
				var oBinding = that.getMainObjectBind(that.sObjectName, that.sObjectAggregation);
				if (oBinding.hasPendingChanges()) {
					MessageBox.confirm(that.getText("msgCancelTxt"), {
						title: that.getText("msgCancelTit"),
						onClose: function (oAction) {
							if (MessageBox.Action.OK !== oAction) {
								return;
							}
							var oModel = that.getModel("HelpValues");
							that.resetTable(that.sObjectName, that.sObjectAggregation, that.aGroupID[0]);
							var oReset = {
								"fundSubType_ID": "",
								"companyCode": "",
								"active": false
							};
							oModel.setProperty(that.sMainProperty, oReset);
							that.updateMainTable(that.sModelName, that.aGroupID);
							that.onNavBack();
						}
					});
				} else {
					that.updateMainTable(that.sModelName, that.aGroupID);
					that.onNavBack();
				}
			}
			/**-------------VALIDACIONES PROPIAS DE LA TABLA-------------------------------**/
	});

});