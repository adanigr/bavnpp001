/**
 * @file Controlador Anular Pago.
 * @author Jorge Carlos Bustillos  <jbustillos@zapata.com.mx>
 * Notación JSDoc para Funciones, Parametros, Objetos, etc.
 * @param {param type} param name - description.
 */
/** 
 * sap.ui.define:
 * @module ManagedObject
 * @module MessageBox
 * @module History
 * @module MessageToast
 * @module Filter
 * @module FilterOperator
 */
sap.ui.define([
	"sap/ui/base/ManagedObject",
	"sap/m/MessageBox",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"vn/pp/ux_vn_pp_monitor/model/formatter"
], function (ManagedObject, MessageBox, History, MessageToast, Filter, FilterOperator, formatter) {
	"use strict";
	/**
	 *  Functión Principal
	 * @author Jorge Carlos Bustillos 
	 * @param  {module} ManagedObject - Clase base que introduce algunos conceptos básicos, como la gestión del estado y el enlace de datos.
	 * @param  {module} MessageBox - Proporciona métodos más fáciles para crear alertas, diálogos de confirmación o diálogos de mensajes arbitrarios etc. 
	 * @param  {module} History - Crea una instancia de la historia.
	 * @param  {module} MessageToast - Ventana emergente pequeña y no disruptiva para mostrar mensajes.
	 * @param  {module} Filter - Permite hacer uso de filtros.
	 * @param  {module} FilterOperator - Pperador para los filtros.	
	 * @desc   Función principal de Anular Pago.
	 * @return {class} - Retorna controller.DialogAnularPago .
	 */
	return ManagedObject.extend("vn.pp.ux_vn_pp_monitor.controller.DialogAnularPago", {
		formatter: formatter,
		//-------------------------------------------------------------------
		//	Eventos estándar UI5:
		//-------------------------------------------------------------------	
		/** 
		 * @author Jorge Carlos Bustillos 
		 * @function
		 * @name constructor 
		 * @param  {event} oView - Recibe Evento y ejecutala función.
		 * @desc Se inicializan propiedades y variables al al abrir Anular Pago.
		 */
		constructor: function (oView) {
			this._oView = oView;
			this._oControl = sap.ui.xmlfragment(oView.getId(), "vn.pp.ux_vn_pp_monitor.view.DialogAnularPago", this);
			this._bInit = false;
			this._i18n = this.getView().getModel("i18n").getResourceBundle();
		},
		/** 
		 * @author Jorge Carlos Bustillos 
		 * @function
		 * @name exit
		 * @desc 
		 */
		exit: function () {
			delete this._oView;
		},
		/** 
		 * @author Jorge Carlos Bustillos 
		 * @function
		 * @name getView
		 * @desc 
		 * @return {object} - Retorna _oView.
		 */
		getView: function () {
			return this._oView;
		},
		/** 
		 * @author Jorge Carlos Bustillos 
		 * @function
		 * @name getControl
		 * @desc 
		 * @return {object} - Retorna _oControl.
		 */
		getControl: function () {
			return this._oControl;
		},
		/** 
		 * @author Jorge Carlos Bustillos 
		 * @function
		 * @name getOwnerComponent
		 * @desc 
		 *  @return {object} - Retorna ._oView.getController().getOwnerComponent();
		 */
		getOwnerComponent: function () {
			return this._oView.getController().getOwnerComponent();
		},
		/** 
		 * @author Jorge Carlos Bustillos 
		 * @function
		 * @name open
		 * @desc Abrir ventana, de Anular Pago.
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
			var oBtnSinAnu = this.getView().byId("btnSinAnu");
			oBtnSinAnu.setPressed(false);
		},
		/** 
		 * @author Jorge Carlos Bustillos 
		 * @function
		 * @name close
		 * @param {undefined} bRefresh - Si es Undefined se cierra el dialogo.
		 * @desc Cierra el la ventana de Anular Pago.
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
		 * @desc 
		 * @return {void}
		 */
		getBindingParameters: function () {
			return {};
		},
		/** 
		 * @author Jorge Carlos Bustillos 
		 * @function
		 * @name _onPressSinAnu
		 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
		 * @desc Genera la Anulación de Pago.
		 */
		_onPressSinAnu: function (oEvent) {
			var oTable = this.getView().byId("anularPago");
			var oController = this.getView("View1").getController();
			var oSelect = oController._onSelectObjectAnuPagoFIN();
			//Filtrar solo por IDS seleccionados:
			var oFilters = oSelect.map(function (element) {
				return new Filter("financedItem_ID", FilterOperator.EQ, element.ID);
			});
			//Si no hubo IDS mostrar resultado falso:
			if (oFilters.length === 0) {
				oFilters.push(new Filter("secuence", FilterOperator.EQ, 0));
			}
			var aFiltersAnd = [];
			//Integrar filtro con OR
			var oFilterOr = new Filter({
				filters: oFilters,
				and: false
			});
			aFiltersAnd.push(oFilterOr);
			aFiltersAnd.push(new Filter("flagConf", FilterOperator.EQ, true));
			if (oEvent.getParameter("pressed")) {
				aFiltersAnd.push(new Filter("flagDel", FilterOperator.EQ, false));
			}
			//Integrar filtro con AND
			var oFilterAll = new Filter({
				filters: aFiltersAnd,
				and: true
			});
			var oBinding = oTable.getBinding("rows");
			oBinding.filter(oFilterAll);
		},
		/** 
		 * @author Jorge Carlos Bustillos 
		 * @function
		 * @name _onButtonAnular
		 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
		 * @desc Genera que  Anula el Pago en el servicio reversePay
		 */
		_onButtonAnular: function (oEvent) {
			var that = this;
			var oTable = this.getView().byId("anularPago");
			var oDialog = oEvent.getSource().getParent();
			MessageBox.confirm(this._i18n.getText("confAnular"), function (oAction) {
				if (oAction === "OK") {
					that._onButtonAnularConf1(oDialog, oTable);
				}
			});
		},
		/**
		 * Realiza validaciones antes de anular los pagos, sobre que estén en orden
		 * y no estén anulados previamente.
		 */
		_onButtonAnularConf1: function (oDialog, oTable) {
			oDialog.setBusy(true);
			var aIdxOK = [];
			var aIdxAskMulti = [];
			var aIdx = oTable.getSelectedIndices();
			if (aIdx.length === 0) {
				oDialog.setBusy(false);
				MessageBox.error(this._i18n.getText("MelementAnulars"));
				return;
			}
			var error = false;
			for (var index of aIdx) {
				var oCtx = oTable.getContextByIndex(index);
				var bFlagDel = oCtx.getProperty("flagDel");
				var bFlagMulti = oCtx.getProperty("flagMulti");
				bFlagDel = (bFlagDel === undefined) ? false : bFlagDel;
				//Validación 1
				if (bFlagDel) {
					oDialog.setBusy(false);
					MessageBox.alert("Pago ya anulado previamente. " + oCtx.getProperty("sapBELNRKZ"));
					error = true;
					break;
				}
				//Validación 2
				if (!this._checkLastPay(oCtx.getProperty("financedItem/ID"), oCtx.getProperty("ID"))) {
					oDialog.setBusy(false);
					MessageBox.alert("Anule pagos posteriores primero. " + oCtx.getProperty("sapBELNRKZ"));
					error = true;
					break;
				}
				//Validación 3
				if (!bFlagMulti) {
					aIdxOK.push(index);
				} else {
					aIdxAskMulti.push(index);
				}
			}
			if (error) {
				oDialog.setBusy(false);
				return;
			}
			var oSend = {
				Input: []
			};
			for (var index2 of aIdxOK) {
				var oObj = oTable.getContextByIndex(index2).getObject();
				oSend.Input.push({
					ID: oObj.ID,
					flagDel: true
				});
			}
			if (oSend.Input.length === 0 && aIdxAskMulti.length === 0) {
				oDialog.setBusy(false);
				return;
			}
			if (aIdxAskMulti.length === 0) {
				this._onButtonAnularSend(oDialog, oSend);
			} else {
				this._onButtonAnularConf2(oDialog, oTable, aIdxAskMulti, oSend);
			}
		},
		/**
		 * Realiza validaciones previas antes de anular el pago relacionados
		 * con la confirmación de pagos múltiples.
		 */
		_onButtonAnularConf2: function (oDialog, oTable, aIdxAskMulti, oSend) {
			var that = this;
			MessageBox.confirm(this._i18n.getText("confAnularMulti"), function (oAction) {
				if (oAction === "OK") {
					for (var index1 of aIdxAskMulti) {
						var oObj = oTable.getContextByIndex(index1).getObject();
						oSend.Input.push({
							ID: oObj.ID,
							flagDel: true
						});
					}
					that._onButtonAnularSend(oDialog, oSend);
				} else {
					oDialog.setBusy(false);
					return;
				}
			});
		},
		/**
		 * Envía los objetos al servicio reversePay
		 */
		_onButtonAnularSend: function (oDialog, oSend) {
			//Enviamos a función:
			var sUrl = this._getUrl()
				//Ubicacion servicio
				+
				"srv_api/function/reversePay";
			//Generar Petición
			var resPromesa = $.ajax({
				url: sUrl,
				type: "POST",
				dataType: "json",
				contentType: "application/json; charset=utf-8; IEEE754Compatible=true",
				data: JSON.stringify(oSend)
			});
			//Enviamos los cambios al servidor Modelo y Tabla
			//Al confirmar ejecución actualizar la tabla.
			Promise.all([resPromesa]).then(res => {
				var sMensajeExitoso = this._i18n.getText("MAnulaPagoExitoso", [res[0].value]);
				MessageBox.success(sMensajeExitoso, {
					icon: MessageBox.Icon.SUCCESS
				});
				oDialog.setBusy(false);
				this.close(true);
			}).catch(function (sReason) {
				MessageBox.error(sReason.responseText);
				oDialog.setBusy(false);
				this.close(true);
			});
		},
		/** 
		 * @author Jorge Carlos Bustillos 
		 * @function
		 * @name _checkLastPay
		 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
		 * @desc Valida el último pago que debe ser el que va a anular
		 */
		_checkLastPay: function (oIDfinItem, oIDPayment) {
			var sUrl = this._getUrl() +
				"srv_api/function/getLastPay";
			//Generar Petición
			var oSend = {
				Input: oIDfinItem
			};
			var res = null;
			$.ajax({
				url: sUrl,
				type: "POST",
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				async: false,
				data: JSON.stringify(oSend)
			}).then(function (data) {
				res = data.value;
			});
			return res === oIDPayment;
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
		},
		/** 
		 * @author Jorge Carlos Bustillos 
		 * @function
		 * @name onButtonPressClose
		 * @desc Cierra el mensaje de Anular Pago.
		 */
		_onButtonClose: function (oEvent) {
			this.close();
		},
		/** 
		 * @author Jorge Carlos Bustillos 
		 * @function
		 * @name onInit
		 * @desc 
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
		}
	});
}, /* bExport= */ true);