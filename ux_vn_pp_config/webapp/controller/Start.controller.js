sap.ui.define([
	"vn/pp/ux_vn_pp_config/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/Token",
	"sap/m/MessageToast",
	"vn/pp/ux_vn_pp_config/model/formatter"
], function (BaseController, JSONModel, Fragment, Filter, FilterOperator, Token, MessageToast,
	formatter) {
	"use strict";

	return BaseController.extend("vn.pp.ux_vn_pp_config.controller.Start", {
		formatter: formatter,
		onInit: function () {
			//	this._i18n = 
		},
		onPressConfigType: function (oEvent) {
			var oItem = oEvent.getSource();
			var oModel = this.getView().getModel("HelpValues");
			var oCtx = oItem.getBindingContext("HelpValues");
			var oObj = oCtx.getObject();
			var oStep = this.byId("ConfigType");
			var oWizard = this.byId("ConfigWizard1");
			oModel.setProperty(oCtx.getPath() + "/enabled", true);
			oModel.setProperty("/SelectedConfigType", oObj);
			oModel.setProperty("/SelectedConfig", true);
			oWizard.setCurrentStep(oStep);
			var oNextStep = this.byId(oObj.action);
			//Si se necesita centro definir sig. paso como ConfigWerks
			if (oObj.reqWerks) {
				oNextStep = this.byId("ConfigWerks");
			}
			this._setNextStep(oModel, oNextStep, oStep, oWizard);
			this.byId("miSociedad").removeAllTokens();
			this.byId("miCentro").removeAllTokens();
		},
		_goNextStep: function (oWizard) {
			oWizard.nextStep();
		},
		_setNextStep: function (oModel, oNextStep, oStep, oWizard) {
			oStep.setNextStep(oNextStep);
			this._goNextStep(oWizard);
		},
		/** 
		 * Selección de sociedad individual.
		 * @param {sap.ui.base.Event} oEvent Evento Value Help
		 */
		onHelpSociedad: function (oEvent) {
			oEvent.getSource().setValueState("None");
			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._sociedadValueHelpDialog) {
				Fragment.load({
					id: "valueSociedadHelpDialog",
					name: "vn.pp.ux_vn_pp_config.view.DialogSociedad",
					controller: this
				}).then(function (oValueHelpDialog) {
					this._sociedadValueHelpDialog = oValueHelpDialog;
					this.getView().addDependent(this._sociedadValueHelpDialog);
					this._sociedadValueHelpDialog.open();
				}.bind(this));
			} else {
				this._sociedadValueHelpDialog.open();
			}
		},
		/** 
		 * Filtra la sociedad a partir del texto ingresado.
		 * @param {sap.ui.base.Event} oEvent Evento Value Help
		 */
		_sociedadHandleValueHelpSearch: function (oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter(
				"name",
				FilterOperator.Contains, sValue
			);
			oEvent.getSource().getBinding("items").filter([oFilter]);
		},
		/** 
		 * Al cerrar el dialogo de ayuda de sociedad, limpia los tokens y
		 * agrega las sociedades seleccionadas, para evitar que se estén repitiendo
		 * @param {sap.ui.base.Event} oEvent Botón de cancelar o aceptar
		 */
		_sociedadHandleValueHelpClose: function (oEvent) {
			var aSelectedItems = oEvent.getParameter("selectedItems"),
				oMultiInput = this.byId("miSociedad"),
				oMiCentros = this.byId("miCentro");
			if (oEvent.getId() !== "confirm") {
				return;
			}
			//Eliminamos los tokens
			oMultiInput.removeAllTokens();
			oMiCentros.removeAllTokens();
			//Agregamos los nuevos tokens
			if (aSelectedItems && aSelectedItems.length > 0) {
				aSelectedItems.forEach(function (oItem) {
					oMultiInput.addToken(new Token({
						text: oItem.getTitle(),
						key: oItem.getDescription()
					}));
				});
			}
		},
		/** 
		 * Selección de centro múltiple.
		 * @param {sap.ui.base.Event} oEvent Evento de tipo botón
		 */
		onHelpCentro: function (oEvent) { //Verifica se haya seleccionado sociedad
			oEvent.getSource().setValueState("None");
			var oMiSociedad = this.byId("miSociedad");
			//Si no se selecciona sociedad, mostrar error:
			var oTokensSoc = oMiSociedad.getTokens();
			if (oTokensSoc.length === 0) {
				MessageToast.show(this.getText("errFaltaSoc"));
				return;
			}
			//Generar arreglo con sociedad seleccionadas:
			var aValueSociedad = this._generarArregloSociedad(oMiSociedad);
			// Se obtiene texto de búsqueda por título de centro:
			var sInputValue = oEvent.getSource().getValue();
			// create value help dialog
			if (!this._centroValueHelpDialog) {
				Fragment.load({
					id: "valueCentroHelpDialog",
					name: "vn.pp.ux_vn_pp_config.view.DialogCentro",
					controller: this
				}).then(function (oValueHelpDialog) {
					this._centroValueHelpDialog = oValueHelpDialog;
					this.getView().addDependent(this._centroValueHelpDialog);
					this._centroOpenValueHelpDialog(sInputValue, aValueSociedad);
				}.bind(this));
			} else {
				this._centroOpenValueHelpDialog(sInputValue, aValueSociedad);
			}
		},
		/** 
		 *  Genera el filtro de sociedad y titulo de centro para la búsqueda de centros
		 * @param {string} sInputValue Texto de búsqueda de centro por título
		 * @param {Array} aValueSociedad Arreglo de sociedades seleccionadas [1101,1102...]
		 * @returns {sap.apf.utils.Filter} Filtro con condición sociedad y texto.
		 */
		_generarFiltroSociedad: function (sInputValue, aValueSociedad) {
			//Arreglo de filtros
			var aFiltro1 = [new Filter("Name1", FilterOperator.Contains, sInputValue)];
			var aFiltro2 = [];
			//Por cada elemento en aVlueSociedad, agregar filtro al arreglo de filtros
			$.each(aValueSociedad, function (index, value) {
				var oFiltro = new Filter("Bukrs", FilterOperator.EQ, value);
				aFiltro2.push(oFiltro);
			});
			//Crear contenedor de filtros OR (para sociedad):
			var oFilterN1 = new Filter({
				filters: aFiltro2,
				and: false
			});
			//Crear contenedor de filtros AND (para texto centro):
			var oFilterN2 = new Filter({
				filters: aFiltro1,
				and: true
			});
			//Agregar filtros al contenedor de filtros principal:
			var filtros = [];
			filtros.push(oFilterN1);
			filtros.push(oFilterN2);
			var oFilterN3 = new Filter({
				filters: filtros,
				and: true
			});
			return oFilterN3;
		},
		/** 
		 * Se obtienen las llaves de los elementos seleccionados en el filtro de sociedades
		 * @param {sap.m.MultiInput} oMiSociedad Objeto que trae el multiinput de sociedad.
		 * @returns {Array} Lista de sociedades seleccionadas [1101,1102...]
		 */
		_generarArregloSociedad: function (oMiSociedad) {
			var aValueSociedad = [];
			var oTokens = oMiSociedad.getTokens();
			$.each(oTokens, function (index, value) {
				var sKey = value.getKey();
				aValueSociedad.push(sKey);
			});
			return aValueSociedad;
		},
		/** 
		 * Muestra dialogo de centro con filtros pre-establecidos
		 * @param {string} sInputValue Si se ingresa este campo, se filtra por descripción
		 * @param {Array} aValueSociedad Lista de sociedades filtrar los centros [1101,1102,...]
		 */
		_centroOpenValueHelpDialog: function (sInputValue, aValueSociedad) {

			var oFilterN3 = this._generarFiltroSociedad(sInputValue, aValueSociedad);
			// Anexa filtro principal a dialogo
			this._centroValueHelpDialog.getBinding("items").filter(oFilterN3);
			// Abre dialogo y muestra filtro actual
			this._centroValueHelpDialog.open(sInputValue);
		},
		/** 
		 * Filtra el listado de centros a partir de la barra de búsqueda
		 * @param {sap.ui.base.Event} oEvent Botón de búsqueda
		 */
		_centroHandleValueHelpSearch: function (oEvent) {
			var sInputValue = oEvent.getParameter("value");
			// Lista de tokens del miSociedad
			var oMiSociedad = this.byId("miSociedad");
			var aValueSociedad = this._generarArregloSociedad(oMiSociedad);
			//Generar filtro desde función
			var oFilterN3 = this._generarFiltroSociedad(sInputValue, aValueSociedad);
			oEvent.getSource().getBinding("items").filter(oFilterN3);
		},

		/** 
		 * Al cerrar el dialogo de ayuda de centro, limpia los tokens y
		 * agrega los centros seleccionados, para evitar que se estén repitiendo
		 * @param {sap.ui.base.Event} oEvent Botón cerrar o aceptar dialogo centro
		 */
		_centroHandleValueHelpClose: function (oEvent) {
			var aSelectedItems = oEvent.getParameter("selectedItems"),
				oMultiInput = this.byId("miCentro"),
				oModel = this.getView().getModel("HelpValues");
			oModel.setProperty("/SelectedWerks", []);
			oModel.setProperty("/SelectedBukrs", []);
			if (oEvent.getId() !== "confirm") {
				return;
			}
			oMultiInput.removeAllTokens();
			if (aSelectedItems && aSelectedItems.length > 0) {
				this._centroHandleValueHelpCloseItems(oMultiInput, aSelectedItems, oModel);
				this._centroHandleValueHelpCloseNext(oModel);
			}
		},
		/** 
		 * Alimenta el atributo SelectedWerks con los centros seleccionados
		 * @param {sap.m.MultiInput} oMultiInput Multinput a agregar tokens
		 * @param {Array} aSelectedItems Items seleccionados de la ayuda
		 * @param {sap.ui.model.json.JSONModel} oModel Modelo JSON que contiene SelectedWerks a actualizar
		 */
		_centroHandleValueHelpCloseItems: function (oMultiInput, aSelectedItems, oModel) {
			var aSelectedWerks = [];
			var aSelectedBukrs = [];
			aSelectedItems.forEach(function (oItem) {
				var oObj = oItem.getBindingContext("S4_0001_SRV").getObject();
				oMultiInput.addToken(new Token({
					text: oItem.getTitle(),
					key: oItem.getDescription()
				}));
				aSelectedWerks.push(oObj);
				if (aSelectedBukrs.find(x => x.Bukrs === oObj.Bukrs) === undefined) {
					aSelectedBukrs.push(oObj);
				}
			});
			oModel.setProperty("/SelectedBukrs", aSelectedBukrs.map(x => {
				return {
					Bukrs: x.Bukrs,
					Name1: x.Name1,
					Werks: x.Werks
				};
			}));
			oModel.setProperty("/SelectedWerks", aSelectedWerks.map(x => {
				return {
					Bukrs: x.Bukrs,
					Name1: x.Name1,
					Werks: x.Werks
				};
			}));
		},
		/** 
		 * Establece el siguiente paso dependiendo del modelo
		 * @param {sap.ui.model.json.JSONModel} oModel Modelo JSON que contiene SelectedWerks y opción seleccionada
		 */
		_centroHandleValueHelpCloseNext: function (oModel) {
			var oStep = this.byId("ConfigWerks");
			var oWizard = this.byId("ConfigWizard1");
			var oObj = oModel.getProperty("/SelectedConfigType");
			var oNextStep = this.byId(oObj.action);
			oWizard.setCurrentStep(oStep);
			this._setNextStep(oModel, oNextStep, oStep, oWizard);
		},
		/** 
		 * Establece como siguiente vista de mantenimiento la tabla seleccionada
		 * @param {sap.ui.base.Event} oEvent Evento de la fila seleccionada
		 */
		onPressDataType: function (oEvent) {
			var oItem = oEvent.getSource();
			var oModel = this.getView().getModel("HelpValues");
			var oCtx = oItem.getBindingContext("HelpValues");
			var oObj = oCtx.getObject();
			var oRouter = this.getRouter(this);
			oModel.setProperty("/SelectedTableList", oObj);
			this.getModel("modeloConfig").setSizeLimit(3000);
			oRouter.navTo(oObj.action);
		}
	});
});