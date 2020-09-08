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

	return BaseController.extend("vn.pp.ux_vn_pp_config.controller.FinSrvCredits_001_new", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf vn.pp.ux_vn_pp_config.view.FinSrvCredits_001_new
		 */
		onInit: function () {
			//Groups ID a Actualizar el primero es el principal
			this.aGroupID = ["FinSrvCredits_001_new", "FinSrvCredits_001"];
			//Nombre modelo a actualizar
			this.sModelName = "modeloConfig";
			//Nombre de tablas a actualizar
			this.sObjectName = "listFinSrvCredits_001_new";
			//Nombre agregaciones a actualizar
			this.sObjectAggregation = "items";
			//Nombre principal propiedad a actualizar:
			this.sMainProperty = "/FinSrvCredits_001_new";
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
					if (!oItem.sapVKORG || !oItem.description || !oItem.finServ_finCode ||
						isNaN(oItem.lineMXN) || isNaN(oItem.lineUSD) ||
						isNaN(oItem.balanceMXN) || isNaN(oItem.balanceUSD) ||
						isNaN(oItem.diffPerMXN) || isNaN(oItem.diffPerUSD) ||
						isNaN(oItem.finDays) || isNaN(oItem.graceDays)
					) {
						MessageBox.error(that.getText("msgInvalidValue"));
						return;
					}
					oItem.lineMXN = oItem.lineMXN.toString();
					oItem.lineUSD = oItem.lineUSD.toString();
					oItem.balanceMXN = oItem.balanceMXN.toString();
					oItem.balanceUSD = oItem.balanceUSD.toString();
					oItem.diffPerMXN = oItem.diffPerMXN.toString();
					oItem.diffPerUSD = oItem.diffPerUSD.toString();
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
							"sapVKORG": "",
							"description": "",
							"lineMXN": 0,
							"lineUSD": 0,
							"balanceMXN": 0,
							"balanceUSD": 0,
							"diffPerMXN": 0,
							"diffPerUSD": 0,
							"finDays": 0,
							"graceDays": 0,
							"flagNew": false,
							"flagUsed": false,
							"flagDemo": false,
							"flagCession": false,
							"flagAccesory": false,
							"finServ_finCode": ""
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
		}
	});

});