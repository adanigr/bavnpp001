/* global download:true */
/**
 * @file Controlador para traspaso financiero de unidad.
 * @author Jorge Bustillos <jbustillos@zapata.com.mx>
 * Notación JSDoc para Funciones, Parametros, Objetos, etc.
 * @param {param type} param name - description.
 */
sap.ui.define([
	"sap/ui/base/ManagedObject",
	"sap/ui/core/Fragment",
	"sap/m/MessageBox",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/json/JSONModel",
	"vn/pp/ux_vn_pp_monitor/model/formatter",
	"vn/pp/ux_vn_pp_monitor/libs/download"
], function (ManagedObject, Fragment, MessageBox, History, MessageToast, Filter, FilterOperator, JSONModel, formatter, downloadjs) {
	"use strict";
	/**
	 *  Functión Principal
	 * @author Javier Balcazar Cruz 
	 * @param  {module} ManagedObject - Clase base que introduce algunos conceptos básicos, como la gestión del estado y el enlace de datos.
	 * @param  {module} Fragment - Se usa dentro de Vistas declarativas.
	 * @param  {module} MessageBox - Proporciona métodos más fáciles para crear alertas, diálogos de confirmación o diálogos de mensajes arbitrarios etc. 
	 * @param  {module} History - Crea una instancia de la historia.
	 * @param  {module} MessageToast - Ventana emergente pequeña y no disruptiva para mostrar mensajes.
	 * @param  {module} Filter - Permite hacer uso de filtros.
	 * @param  {module} FilterOperator - Pperador para los filtros.
	 * @param  {module} JSONModel - Implementación del modelo para formato JSON.	
	 * @desc   Función principal de Cambio de Moneda.
	 * @return {class} - Retorna controller.DialogCambioMoneda .
	 */
	return ManagedObject.extend("vn.pp.ux_vn_pp_monitor.controller.DialogTrasUnidad", {
		formatter: formatter,
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
			this._oControl = sap.ui.xmlfragment(oView.getId(), "vn.pp.ux_vn_pp_monitor.view.DialogTrasUnidad", this);
			this._bInit = false;
			this._i18n = this.getView().getModel("i18n").getResourceBundle();
		},
		/** 
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name exit
		 * @desc Elimina la vista.
		 */
		exit: function () {
			delete this._oView;
		},

		/** 
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name getView
		 * @desc Obtiene la vista.
		 * @return {object} - Retorna _oView.
		 */
		getView: function () {
			return this._oView;
		},

		/** 
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name getControl
		 * @desc Obtiene el controlador.
		 * @return {object} - Retorna _oControl.
		 */
		getControl: function () {
			return this._oControl;
		},

		/** 
		 * @author Javier Balcazar Cruz 
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
			//*******Suma de el campo Traspaso de Unidad******
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
		 * @desc Obtener binding parameters.
		 * @return {void}
		 */
		getBindingParameters: function () {
			return {};
		},

		/** 
		 * @author Jorge Bustillos
		 * @function
		 * @name _getAccsData
		 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
		 * @desc  Ayuda para generar las varaibles globales: this.oRowContext, this.oCtaOrigen  y this.oCtaDest 
		 */

		_getAccsData: function (oEvent) {
			this.oRowContext = oEvent.getSource().getParent().getBindingContext("TrasUnidadCollection");
			this.oRowModel = this.getView().getModel("TrasUnidadCollection");
			this.oRowModelPath = this.oRowContext.getPath();
			this.oCtaOrigen = oEvent.getSource().getParent().getCells().find(x => x.getId().search("cbCtaOrigen") !== -1);
			this.oCtaDest = oEvent.getSource().getParent().getCells().find(x => x.getId().search("cbCtaDest") !== -1);
		},
		/** 
		 * @author Jorge Bustillos
		 * @function
		 * @name onValueHelpAccExpense
		 * @param {object} Evento correspondiente al botón HelpValue
		 * @desc  * Campo de ayuda para cuenta de egreso, define el contexto de la fila a modificar en la variable global this.oRowContext
		 * Se abre el dialogo DialogTrasCtaE
		 * Se establece le filtro de acuerdo a la combinación de dicha fila.
		 */
		onValueHelpAccExpense: function (oEvent) {
			//Agregar filtros:
			this._getAccsData(oEvent);
			// create value help dialog
			if (!this._ValueHelpDialogTrasCtaE) {
				Fragment.load({
					id: "valueTrasCtaHelpDialogE",
					name: "vn.pp.ux_vn_pp_monitor.view.DialogTrasCtaE",
					controller: this
				}).then(function (oValueHelpDialog) {
					this._ValueHelpDialogTrasCtaE = oValueHelpDialog;
					this.getView().addDependent(this._ValueHelpDialogTrasCtaE);
					var oItems = this._ValueHelpDialogTrasCtaE.getBinding("items");
					var oFilter = this._generarFiltroCtaEgreso("");
					oItems.filter(oFilter);
					this._ValueHelpDialogTrasCtaE.open();
				}.bind(this));
			} else {
				var oItems = this._ValueHelpDialogTrasCtaE.getBinding("items");
				var oFilter = this._generarFiltroCtaEgreso("");
				oItems.filter(oFilter);
				this._ValueHelpDialogTrasCtaE.open();
			}
		},
		/** 
		 * @author Jorge Bustillos
		 * @function
		 * @name _selectFirstKey
		 * @param {object} oComboBox -
		 * @desc  * Selecciona el primer item del combobox si es que hay solo uno,
		 * si hay más de uno, lo pone en color amarillo.
		 */
		_selectFirstKey: function (oComboBox) {
			oComboBox.setBusy(true);
			var that = this;
			// Hacemos una promesa:
			var p1 = new Promise(
				//Después de 3 segundos continuar
				function (resolve, reject) {
					// Esto es solo un ejemplo para crear asincronismo
					window.setTimeout(function () {
						resolve("OK");
					}, 500);
				}
			);
			p1.then((successMessage) => {
				oComboBox.setBusy(false);
				oComboBox.setValueState("None");
				oComboBox.setSelectedKey("");
				oComboBox.clearSelection();
				if (!oComboBox.getEnabled()) {
					return;
				}
				//Obtener la lista de elementos activos
				var aEnabledItems = oComboBox.getItems().filter(x =>
					x.getProperty("enabled") === true
				);
				if (aEnabledItems.length === 0) {
					return;
				}
				//Si hay más de uno, marcar como amarillo
				if (aEnabledItems.length > 1) {
					oComboBox.setValueState("Warning");
					oComboBox.setValueStateText("Seleccione cuenta");
					return;
				}
				//Seleccionar el primero
				oComboBox.setSelectedKey(aEnabledItems[0].getKey());
			});
		},
		/**
		 * @author Jorge Bustillos
		 * @function
		 * @name onValueHelpAccIncome
		 * @param {object} Evento correspondiente al botón HelpValue
		 * @desc   * Campo de ayuda para cuenta de egreso, define el contexto de la fila a modificar en la variable global this.oRowContext
		 * Se abre el dialogo DialogTrasCtaI
		 * Se establece le filtro de acuerdo a la combinación de dicha fila
		 */
		onValueHelpAccIncome: function (oEvent) {
			//Agregar filtros:
			this._getAccsData(oEvent);
			// create value help dialog
			if (!this._ValueHelpDialogTrasCtaI) {
				Fragment.load({
					id: "valueTrasCtaHelpDialogI",
					name: "vn.pp.ux_vn_pp_monitor.view.DialogTrasCtaI",
					controller: this
				}).then(function (oValueHelpDialog) {
					this._ValueHelpDialogTrasCtaI = oValueHelpDialog;
					this.getView().addDependent(this._ValueHelpDialogTrasCtaI);
					var oItems = this._ValueHelpDialogTrasCtaI.getBinding("items");
					oItems.filter(this._generarFiltroCtaIngreso(""));
					this._ValueHelpDialogTrasCtaI.open();
				}.bind(this));
			} else {
				var oItems = this._ValueHelpDialogTrasCtaI.getBinding("items");
				oItems.filter(this._generarFiltroCtaIngreso(""));
				this._ValueHelpDialogTrasCtaI.open();
			}
		},
		/**
		 * @author Jorge Bustillos
		 * @function
		 * @name _onSearchTrasCteI
		 * @param {object} Evento correspondiente al botón de búsqueda
		 * @desc  Filtra el listado de cuentas a partir de la barra de búsqueda
		 */
		_onSearchTrasCteI: function (oEvent) {
			var sInputValue = oEvent.getParameter("value");
			var oItems = oEvent.getSource().getBinding("items");
			oItems.filter(this._generarFiltroCtaIngreso(sInputValue));
		},
		/**
		 * @author Jorge Bustillos
		 * @function
		 * @name _onActionTrasCteI
		 * @param {object} Evento correspondiente al botón de HelpValues
		 * @desc   * Si se seleccionó confirmar, se deberá actualizar la propiedad accExpense de la línea seleccionada
		 * la línea seleccionada se carga en this.oRowContext derivado de onValueHelpAccExpense
		 */
		_onActionTrasCteI: function (oEvent) {
			//Actualizar valor si se seleccionó confirmar:
			if (oEvent.getId() !== "confirm") {
				return;
			}
			var sPath = this.oRowContext.getPath() + "/accIncome"; // - /0/accExpense
			var sPathBBVA = this.oRowContext.getPath() + "/flagTR_L_BBVA_I"; // - /0/flagTR_L_BBVA_I
			var sPathBMX = this.oRowContext.getPath() + "/flagTR_L_BMX_I"; // - /0/flagTR_L_BMX_I
			var sPathCtaOrg = this.oRowContext.getPath() + "/flagTR_L_CtaOrg"; // - /0/flagTR_L_CtaOrg
			var sPathCtaDest = this.oRowContext.getPath() + "/flagTR_L_CtaDest"; // - /0/flagTR_L_CtaDest
			var oCtx = oEvent.getParameter("selectedItem").getBindingContext("modeloCatalog");
			var sSapHkont = oCtx.getProperty("sapHkont");
			var bLayBBVA = oCtx.getProperty("flagTR_L_BBVA");
			var bLayBMX = oCtx.getProperty("flagTR_L_BMX");
			this.oRowContext.getModel().setProperty(sPath, sSapHkont);
			this.oRowContext.getModel().setProperty(sPathBBVA, bLayBBVA);
			this.oRowContext.getModel().setProperty(sPathBMX, bLayBMX);
			this.oRowContext.getModel().setProperty(sPathCtaOrg, "");
			this.oRowContext.getModel().setProperty(sPathCtaDest, "");
			this._setFiltersCtaOrg(this.oCtaOrigen, this.oRowContext);
			this._setFiltersCtaDest(this.oCtaDest, this.oRowContext);
			this._selectFirstKey(this.oCtaOrigen);
			this._selectFirstKey(this.oCtaDest);
		},
		/** 
		 * @author Jorge Bustillos
		 * @function
		 * @name onValidateCtaOrg
		 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
		 * @desc  Valida Cta Origen
		 */
		onValidateCtaOrg: function (oEvent) {
			this._validateCB(oEvent);
		},

		/** 
		 * @author Jorge Bustillos
		 * @function
		 * @name onValidateCtaDest
		 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
		 * @desc  Validar cuenta destino
		 */
		onValidateCtaDest: function (oEvent) {
			this._validateCB(oEvent);
		},

		/** 
		 * @author Jorge Bustillos
		 * @function
		 * @name _validateCB
		 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
		 * @desc  Validar combobox sea valor seleccionado y no ingresado
		 */
		_validateCB: function (oEvent) {
			var sNewVal = oEvent.getParameter("newValue");
			var sKey = oEvent.getSource().getSelectedItem();

			if (sNewVal !== "" && sKey === null) {
				oEvent.getSource().setValue("");
				oEvent.getSource().setValueState("Error");
			} else {
				oEvent.getSource().setValueState("None");
			}
		},
		/** 
		 * @author Jorge Bustillos
		 * @function
		 * @name _onSearchTrasCteE
		 * @param {object} Evento correspondiente al botón de Búsqueda
		 * @desc  Filtra el listado de cuentas a partir de la barra de búsqueda
		 */
		_onSearchTrasCteE: function (oEvent) {
			var sInputValue = oEvent.getParameter("value");
			var oItems = oEvent.getSource().getBinding("items");
			oItems.filter(this._generarFiltroCtaEgreso(sInputValue));
		},

		/** 
		 * @author Jorge Bustillos
		 * @function
		 * @name _onActionTrasCteE
		 *  @param {object} Evento correspondiente al botón de HelpValues
		 * @desc  Si se seleccionó confirmar, se deberá actualizar la propiedad accExpense de la línea seleccionada
		 * la línea seleccionada se carga en this.oRowContext derivado de onValueHelpAccExpense
		 */
		_onActionTrasCteE: function (oEvent) {
			//Actualizar valor si se seleccionó confirmar:
			if (oEvent.getId() !== "confirm") {
				return;
			}
			var sPath = this.oRowContext.getPath() + "/accExpense"; // - /0/accExpense
			var sPathBBVA = this.oRowContext.getPath() + "/flagTR_L_BBVA_E"; // - /0/flagTR_L_BBVA_I
			var sPathBMX = this.oRowContext.getPath() + "/flagTR_L_BMX_E"; // - /0/flagTR_L_BMX_I
			var sPathCtaOrg = this.oRowContext.getPath() + "/flagTR_L_CtaOrg"; // - /0/flagTR_L_CtaOrg
			var sPathCtaDest = this.oRowContext.getPath() + "/flagTR_L_CtaDest"; // - /0/flagTR_L_CtaDest			
			var oCtx = oEvent.getParameter("selectedItem").getBindingContext("modeloCatalog");
			var sSapHkont = oCtx.getProperty("sapHkont");
			var bLayBBVA = oCtx.getProperty("flagTR_L_BBVA");
			var bLayBMX = oCtx.getProperty("flagTR_L_BMX");
			this.oRowContext.getModel().setProperty(sPath, sSapHkont);
			this.oRowContext.getModel().setProperty(sPathBBVA, bLayBBVA);
			this.oRowContext.getModel().setProperty(sPathBMX, bLayBMX);
			this.oRowContext.getModel().setProperty(sPathCtaOrg, "");
			this.oRowContext.getModel().setProperty(sPathCtaDest, "");
			this._setFiltersCtaOrg(this.oCtaOrigen, this.oRowContext);
			this._setFiltersCtaDest(this.oCtaDest, this.oRowContext);
			this._selectFirstKey(this.oCtaOrigen);
			this._selectFirstKey(this.oCtaDest);
		},
		/** 
		 * @author Jorge Bustillos
		 * @function
		 * @name _generarFiltroCtaIngreso
		 * @param {string} sInputValue Texto de búsqueda de centro por título
		 * @returns {sap.apf.utils.Filter} Filtro con condición sociedad y texto.
		 * @desc Genera el filtro de sociedad, centro y titulo de centro para la búsqueda de centros
		 */
		_generarFiltroCtaIngreso: function (sInputValue) {
			//Arreglo de filtros
			var aFiltro_and = [];
			aFiltro_and.push(new Filter("sapHkont", FilterOperator.Contains, sInputValue));
			var sCenter = this.oRowContext.getProperty("center");
			var sFinCode = this.oRowContext.getProperty("newFinSrv_finCode");
			var sCurrency = this.oRowContext.getProperty("currency");
			aFiltro_and.push(new Filter("center", FilterOperator.EQ, sCenter));
			aFiltro_and.push(new Filter("finCode", FilterOperator.EQ, sFinCode));
			aFiltro_and.push(new Filter("currency", FilterOperator.EQ, sCurrency));
			//Crear contenedor de filtros OR (para sociedad):
			var oFilterAnd = new Filter({
				filters: aFiltro_and,
				and: true
			});
			return oFilterAnd;
		},

		/** 
		 * @author Jorge Bustillos
		 * @function
		 * @name _generarFiltroCtaEgreso
		 * @param {string} sInputValue Texto de búsqueda de centro por título
		 * @returns {sap.apf.utils.Filter} Filtro con condición sociedad y texto.
		 * @desc Genera el filtro de sociedad, centro y titulo de centro para la búsqueda de centros
		 */
		_generarFiltroCtaEgreso: function (sInputValue) {
			//Arreglo de filtros
			var aFiltro_and = [];
			aFiltro_and.push(new Filter("sapHkont", FilterOperator.Contains, sInputValue));
			var sCenter = this.oRowContext.getProperty("center");
			var sFinCode = this.oRowContext.getProperty("finSrv_finCode");
			var sCurrency = this.oRowContext.getProperty("currency");
			aFiltro_and.push(new Filter("center", FilterOperator.EQ, sCenter));
			aFiltro_and.push(new Filter("finCode", FilterOperator.EQ, sFinCode));
			aFiltro_and.push(new Filter("currency", FilterOperator.EQ, sCurrency));
			//Crear contenedor de filtros OR (para sociedad):
			var oFilterAnd = new Filter({
				filters: aFiltro_and,
				and: true
			});
			return oFilterAnd;
		},
		/** 
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name _onButtonPress
		 * @param {object} oEvent Evento correspondiente al botón.
		 * @desc  Genera el Traspaso de Unidad
		 * @return {void} 
		 */
		_onButtonPress: function (oEvent) {
			var that = this; //Referencia a dialogo
			var bValidaFlag = true;
			var oDialog = oEvent.getSource().getParent();
			MessageBox.confirm(this._i18n.getText("confTras"), function (oAction) {
				if (oAction === "OK") {
					//Crea JSON
					var oModel = that.getView().getModel("TrasUnidadCollection");
					var tabla = oModel.getData();
					try {
						var oModeloInsertarTrasUni = tabla.map(
							//Por cada línea de X quiero que hagas esto:
							function (linea) {
								if (bValidaFlag === false) {
									return;
								}
								var ctaEgreso = linea.accExpense; //"Cta. Egreso"
								var importFin = Number(linea.financedAmt); //"Importe a Financiar"
								var datestart = linea.dateStart; //"Fecha Inicio"
								if (datestart === null) {
									MessageBox.error(that._i18n.getText("ErrTFini"));
									bValidaFlag = false;
									return;
								}
								var sfechaInicio = datestart.toISOString().substring(0, 10);
								var newfine = linea.newFinSrv_finCode; //"Financiera Nueva"
								var ctaIngreso = linea.accIncome; //"Cta. Ingreso"
								var diaFina = parseInt(linea.finDays, 10); //"Dias de Financiamiento"       
								var interes = linea.interestAmt;

								//Validacion de Fecha de Inicio no vacio
								if ((sfechaInicio === undefined) || (sfechaInicio === null) || (sfechaInicio === '') || (sfechaInicio.length === 0)) {
									MessageBox.error(that._i18n.getText("ErrTFini"));
									bValidaFlag = false;
									return;
								}

								//Validacion de interes no vacio
								if (isNaN(interes) || interes < 0 || (interes === null) || (interes === '') || (interes.length === 0)) {
									MessageBox.error(that._i18n.getText("ErrimpInt"));
									bValidaFlag = false;
									return;
								}
								//Validacion de importe a financiar no vacio
								if (isNaN(importFin) || importFin < 0 || (importFin === null) || (importFin === '') || (importFin.length === 0)) {
									MessageBox.error(that._i18n.getText("Errintafinanciar"));
									bValidaFlag = false;
									return;
								}

								//Validacion Cuenta de Egreso  no vacio

								if ((ctaEgreso === null) || (ctaEgreso === '') || (ctaEgreso.length === 0)) {
									MessageBox.error(that._i18n.getText("ErrCtaEgr"));
									bValidaFlag = false;
									return;
								}
								//Validacion de Importe a Financiar no vacio
								if (isNaN(importFin) || importFin <= 0 || (importFin === null) || (importFin === '') || (importFin.length === 0)) {
									MessageBox.error(that._i18n.getText("ErrImpFin"));
									bValidaFlag = false;
									return;
								}

								//Validacion de Financiera Nueva no vacio
								if ((newfine === null) || (newfine === '') || (newfine.length === 0)) {
									MessageBox.error(that._i18n.getText("ErrNewFin"));
									bValidaFlag = false;
									return;
								}
								//Validacion Cuenta de Ingreso  no vacio
								if ((ctaIngreso === null) || (ctaIngreso === '') || (ctaIngreso.length === 0)) {
									MessageBox.error(that._i18n.getText("ErrCtaIng"));
									bValidaFlag = false;
									return;
								}
								//Validacion Dias de Financiamiento  no vacio
								if ((diaFina === null) || (diaFina === '') || (diaFina.length === 0) || isNaN(diaFina)) {
									MessageBox.error(that._i18n.getText("ErrDiasFIn"));
									bValidaFlag = false;
									return;
								}
								//Información layout 
								if (((linea.flagTR_L_BBVA_I && linea.flagTR_L_BBVA_E) || (linea.flagTR_L_BMX_I && linea.flagTR_L_BMX_E)) && (linea.flagTR_L_CtaOrg ===
										"" || linea.flagTR_L_CtaDest === "")) {
									MessageBox.error(that._i18n.getText("ErrTLayout"));
									bValidaFlag = false;
									return;
								}
								//Ver que se hayan seleccionado layouts:

								var sImportFin = importFin.toString();
								return {
									"oldFinItemID": linea.ID, //<-- ID elemento financiado
									"oldFinCode": linea.finSrv_finCode, //<-- Financiera original
									"financedAmt": sImportFin, //<-- selecciona usuario
									"graceDays": 0, //<-- dejar en cero
									"finDays": diaFina, //<-- selecciona usuario
									"dateStart": sfechaInicio, //<-- selecciona usuario
									"accExpense": ctaEgreso, //<-- selecciona usuario
									"accIncome": ctaIngreso, //<-- selecciona usuario
									"newFin_finCode": newfine, //<-- selecciona usuario
									"flagReverse": false, //<--falso siempre
									"interestAmt": that._NumToString(linea.interestAmt),
									"flagTR_L_BBVA_I": linea.flagTR_L_BBVA_I,
									"flagTR_L_BMX_I": linea.flagTR_L_BMX_I,
									"flagTR_L_BBVA_E": linea.flagTR_L_BBVA_E,
									"flagTR_L_BMX_E": linea.flagTR_L_BMX_E,
									"flagTR_L_CtaOrg": encodeURI(linea.flagTR_L_CtaOrg),
									"flagTR_L_CtaDest": encodeURI(linea.flagTR_L_CtaDest)
								};

							}); //	function { map(
					} //try
					catch (ex) {
						console.log(ex);
						MessageBox.error(that._i18n.getText("ERRProPag"));
						that.close();
						return;
					}
					if (bValidaFlag === false) {
						return;
					}

					//Generar cadena númerica única:
					var sGenMark = 1 + new Date().getTime();
					sGenMark = sGenMark.toString();
					var oSend = {
						genMark: sGenMark,
						Input: []
					};
					oModeloInsertarTrasUni.forEach(function (oModeloIndividual) {
						oSend.Input.push(oModeloIndividual);
					});
					//Pausar UI:
					oDialog.setBusy(true);
					//Enviamos a función:
					var sUrl = that._getUrl()
						//Ubicacion servicio
						+ "srv_api/function/newFITrans";
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
						var sMensajeExitoso = that._i18n.getText("MTraspasoExitoso", [res[0].value]);
						MessageBox.success(sMensajeExitoso, {
							icon: MessageBox.Icon.SUCCESS
						});
						that._getLayouts(sGenMark);
						oDialog.setBusy(false);
						that.close(true);
					}).catch(function (reason) {
						////console.log(reason);
						MessageBox.error(reason.responseText);
						oDialog.setBusy(false);
						that.close(true);
					});
				}
			});
		},

		/** 
		 * @author Jorge Bustillos
		 * @function
		 * @name _onButtonPress
		 * @param {string} sGenMark Identificador de layout
		 * @desc  Obtener layouts correspondientes a la última operación éxitosa
		 * @return {void} 
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
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name _NumToString
		 * @param {object} oValor Valor original
		 * @desc Genera un string para un número
		 * @return {string} Texto a dos decimales
		 */
		_NumToString: function (oValor) {
			oValor = Number(oValor); // NaN || Float
			oValor = (isNaN(oValor)) ? "0.00" : oValor.toFixed(2); // "0.00" ó ||"1234.00"
			return oValor;
		},

		/** 
         * @author Jorge Bustillos
         * @function
         * @name _onButtonAnular        
         * @desc Funcion que Anula el traspaso de Unidad
      
         */
		_onButtonAnular: function () {
			MessageBox.confirm(this._i18n.getText("confAnular"), function (oAction) {
				if (oAction === "OK") {
					// TODO: Generar Traspaso

					this.close();
				}
			});
		},
		/** 
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name _onButtonClose
		 * @desc Cierra el Dialog Activo Fijo.
		 */
		_onButtonClose: function () {
			this.close();
		},
		/** 
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name onInit
		 * @desc Evento onInit cuando se genera díalogo
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
		 * @name onValidateFinSrv
		 * @param {object} Selección realizada
		 * @desc  Valida la financiera seleccionada
		 * @return {void} 
		 */
		onValidateFinSrv: function (oEvent) {
			var that = this;
			this._validateCB(oEvent);
			this._getAccsData(oEvent);
			//Vaciar columnas relacionadas cada vez que seleccione otra financiera: 
			this.oRowModel.setProperty(this.oRowModelPath + "/rateType", "");
			this.oRowModel.setProperty(this.oRowModelPath + "/finDays", "");
			this.oRowModel.setProperty(this.oRowModelPath + "/accIncome", "");
			//Obtener el valor seleccionado
			var oComboBox = oEvent.getSource();
			//Estado del control vacío
			oComboBox.setValueState("None");
			var sFinCode = oComboBox.getSelectedKey();
			if (sFinCode === "" || sFinCode === null) {
				this.oRowModel.setProperty(this.oRowModelPath + "/newFinSrv_finCode", "");
				oComboBox.setValueState("Error");
				return;
			}
			var oContext = oComboBox.getParent().getBindingContext("TrasUnidadCollection");
			var sCompanyCode = oContext.getProperty("companyCode");
			var oOldFinCode = oContext.getProperty("finSrv_finCode");
			if (oOldFinCode === sFinCode) {
				MessageBox.warning(this._i18n.getText("ErrFinActual"), {
					actions: [MessageBox.Action.OK],
					emphasizedAction: MessageBox.Action.OK,
					onClose: function (sAction) {
						if (sAction === "OK") {
							oComboBox.setValue("");
							oComboBox.clearSelection("");
							oComboBox.setValueState("Error");
							that.oRowModel.setProperty(that.oRowModelPath + "/newFinSrv_finCode", "");
						}
					}
				});
				return;
			}
			var sUnidadID = oContext.getProperty("unidadID");
			var bOKFin = this._validateFITransf(sUnidadID, sFinCode, oComboBox);
			if (!bOKFin) return;
			var url = this._getUrl()
				//Ubicacion servicio
				+ "srv_api/catalogs/FinSet"
				//Filtros
				+ "?$filter=" + encodeURI(
					"companyCode eq '" + sCompanyCode + "' and finCode eq '" + sFinCode + "'");
			//Comparar con servicio y sociedad

			$.get({
				url: url,
				success: function (data) {
					var res = data.value.length;
					if (res === 0) {
						//Funcion error
						that._onValidateFinSrv(sCompanyCode, sFinCode, oComboBox);
					} else {
						//Obtener Dias Financiamiento, Tipo de Tasa y Valor de Tasa
						that._onGetFinInfo(oContext, data.value);
					}
				},
				error: function (error) {
					//Funcion error
					that._onValidateFinSrv(sCompanyCode, sFinCode, oComboBox);
				}
			});
		},
		/**
		
        /** 
		 * @author Jorge Bustillos
		 * @function
		 * @name _validateFITransf
        * @param {string} sUnidadID UUID de la unidad a comprobar
		 * @param {string} sFinCode Código de financiera a comprobar
		 * @param {ComboBox} oComboBox Combobox a comprobar
		 * @desc   Verifica en el servicio validateFITransf que la transferencia sea a una financiera válida.
	
		 */
		_validateFITransf: function (sUnidadID, sFinCode, oComboBox) {
			var sTxtErr = this._i18n.getText("ErrFinMisma");
			var sTxtErrG = this._i18n.getText("trasUniErrFinSrv");
			var url = this._getUrl()
				//Ubicacion servicio
				+ "srv_api/function/validateFITransf";
			var oSend = {
				unidadID: sUnidadID,
				finCode: sFinCode
			};
			//Comparar con servicio y sociedad
			var that = this;
			var bResReturn = false;
			$.ajax({
				type: "POST",
				async: false,
				url: url,
				dataType: "json",
				contentType: "application/json;IEEE754Compatible=true",
				data: JSON.stringify(oSend),
				success: function (data) {
					if (!data.value) {
						oComboBox.setValue("");
						oComboBox.clearSelection("");
						oComboBox.setValueState("Error");
						that.oRowModel.setProperty(that.oRowModelPath + "/newFinSrv_finCode", "");
						MessageBox.error(sTxtErr);
						bResReturn = false;
					} else {
						bResReturn = true;
					}
				},
				error: function (error) {
					MessageBox.error(sTxtErrG);
					bResReturn = false;
				}
			});
			return bResReturn;
		},
		/** 
		 * @author Javier Balcazar Cruz 
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
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name onFinDays
		 * @param {object} Evento heredado
		 * @desc Si cambian los días a financiar, actualizar fecha fin
	
		 */
		onFinDays: function (oEvent) {
			var oInputDays = oEvent.getSource();
			var oContext = oInputDays.getParent().getBindingContext("TrasUnidadCollection");
			var sPath = oContext.getPath();
			var oModel = oContext.getModel("TrasUnidadCollection");
			var oDateStart = oModel.getProperty(sPath + "/dateStart");
			var iFinDays = oModel.getProperty(sPath + "/finDays");
			oInputDays.setValueState("None");
			if (isNaN(iFinDays)) {
				oInputDays.setValueState("Error");
				oInputDays.setValue("");
				return;
			}
			if (oDateStart === null || oDateStart === "") {
				return;
			}
			this._onFinDaysCalculate(oModel, sPath, oDateStart, iFinDays);
		},

		/** 
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name _onFinDaysCalculate
		 * @param {object} oModel Modelo heredado
		 * @param {string} sPath Path a calcular
		 * @param {Date} oDateStart Fecha inicio
		 * @param {integer} iFinDays Días financiamiento
		 * @desc Se hace el calculo de los días
		 */
		_onFinDaysCalculate: function (oModel, sPath, oDateStart, iFinDays) {
			var oEndDate = new Date(oDateStart.getTime());
			oEndDate.setTime(oEndDate.getTime() + (24 * 60 * 60 * 1000 * iFinDays));
			oModel.setProperty(sPath + "/dateEnd", oEndDate);
		},

		/** 
		 * @author Jorge Bustillos
		 * @function
		 * @name _onGetFinInfo
		 * @param {object} oContext Contexto obtenido
		 * @param {object} oResData Información retornada del servicio
		 * @desc Obtener Dias Financiamiento, Tipo de Tasa y Valor de Tasa
		 */
		_onGetFinInfo: function (oContext, oResData) {
			var oModel = oContext.getModel("TrasUnidadCollection");
			var sPath = oContext.getPath();
			var sSapVKORG = oContext.getProperty("center");
			var sFinCode = oContext.getProperty("newFinSrv_finCode");
			var sFundType = oContext.getProperty("fundSubType_ID");
			var sCurrency = oContext.getProperty("currency");
			var oDateStart = oModel.getProperty(sPath + "/dateStart");
			var sFlag = "";
			switch (sFundType) {
			case "UN_VN":
				sFlag = "flagNew";
				break;
			case "UN_VU":
				sFlag = "flagUsed";
				break;
			case "UN_VD":
				sFlag = "flagDemo";
				break;
			case "UN_VC":
				sFlag = "flagCession";
				break;
			case "ACCS_1":
				sFlag = "flagAccesory";
				break;
			default:
				sFlag = "flagNew";
				break;
			}
			//Generar filtro del servicio a consultar
			var urlFinSrv = this._getUrl()
				//Ubicación servicio
				+ "srv_api/catalogs/FinSrvCredits"
				//Filtros
				+ "?$filter=" + encodeURI(
					"sapVKORG eq '" + sSapVKORG + "' and finServ_finCode eq '" + sFinCode + "' and " + sFlag + " eq true");
			var urlFinRates = this._getUrl()
				//Ubicación servicio
				+ "srv_api/entity/FinSrvs_001"
				//Filtros
				+ "?$filter=" + encodeURI("finCode eq '" + sFinCode + "' and active eq true")
				//Expand
				+ "&$expand=" + encodeURI("finType($expand=finRates($filter=currency eq '" + sCurrency + "' and active eq true))");

			//Preparar mensaje de error:
			var errorI18N1 = this._i18n.getText("trasUniErrFinSrv");
			//Obtener info FinSrvCredits y FinRates
			var aPromises = [];
			aPromises.push($.get(urlFinSrv)); //peticion a ala URL, devuelve JSON
			aPromises.push($.get(urlFinRates)); //valor de la tasa variable
			//Esperar resultados
			var that = this;
			Promise.all(aPromises).then(function (oValue) {

				var oFinSrv = oValue[0].value[0]; //Finaciera 
				var oFinRates = oValue[1].value[0].finType.finRates[0]; //Tipo de tasa
				var oEndDate = null;
				//IF -> Si ya tengo fecha de inicio y no esta vacia entonces le voy a sumar la fecha de inicio  con los dias del servicio

				// el if es para calcular la fecha Fin 
				if (oDateStart !== null && oDateStart !== "") { //no se puede calcular si no
					oEndDate = new Date(oDateStart.getTime());
					oEndDate.setTime(oEndDate.getTime() + (24 * 60 * 60 * 1000 * oFinSrv.finDays));
				}
				oModel.setProperty(sPath + "/finDays", oFinSrv.finDays); //dias de financiamiento
				oModel.setProperty(sPath + "/rateType", oFinRates.rateType_rate); //valor de la tasa
				oModel.setProperty(sPath + "/dateEnd", oEndDate); //Fecha FIN Calculada
				oModel.setProperty(sPath + "/sapLifnr", oFinSrv.sapLifnr);
				that._onGetFinInfo_Rate(sPath, oModel); //tasa variable del día
			}).catch(function (reason) {
				MessageBox.error(
					errorI18N1, {
						id: "serviceErrorMessageBox" + (new Date().getTime()),
						details: reason,
						actions: [MessageBox.Action.CLOSE],
						onClose: function () {}.bind(this)
					}
				);
			});
		},

		/** 
		 * @author Jorge Bustillos
		 * @function
		 * @name _setFiltersCtaOrg
		 * @param {object} oContext Contexto obtenido
		 * @param {object} oComboBox 
		 * @desc Establece filtro por cuenta origen
		 */
		_setFiltersCtaOrg: function (oComboBox, oContext) {
			var aFiltersComboBox = [];
			aFiltersComboBox.push(new Filter("Gsber", FilterOperator.EQ, oContext.getProperty(
				"center")));
			aFiltersComboBox.push(new Filter("Waers", FilterOperator.EQ, oContext.getProperty(
				"currency")));
			aFiltersComboBox.push(new Filter("Zlsch", FilterOperator.EQ, "T"));
			var bflagTR_L_BBVA_I = oContext.getProperty("flagTR_L_BBVA_I");
			var bflagTR_L_BBVA_E = oContext.getProperty("flagTR_L_BBVA_E");
			var bflagTR_L_BMX_I = oContext.getProperty("flagTR_L_BMX_I");
			var bflagTR_L_BMX_E = oContext.getProperty("flagTR_L_BMX_E");
			if (bflagTR_L_BBVA_I && bflagTR_L_BBVA_E) {
				aFiltersComboBox.push(new Filter("Bankl", FilterOperator.EQ, "012"));
			}
			if (bflagTR_L_BMX_I && bflagTR_L_BMX_E) {
				aFiltersComboBox.push(new Filter("Bankl", FilterOperator.EQ, "002"));
				aFiltersComboBox.push(new Filter("Bnkn2", FilterOperator.NE, ""));
			}
			oComboBox.getBinding("items").filter(aFiltersComboBox);
		},
		/** 
		 * @author Jorge Bustillos
		 * @function
		 * @name _setFiltersCtaDest
		 * @param {object} oContext Contexto obtenido
		 * @param {object} oComboBox 
		 * @desc Establece filtro por proveedor
		 */
		_setFiltersCtaDest: function (oComboBox, oContext) {
			var aFiltersComboBox = [];
			aFiltersComboBox.push(new Filter("Partner", FilterOperator.EQ, oContext.getProperty("sapLifnr_old")));
			var bflagTR_L_BBVA_I = oContext.getProperty("flagTR_L_BBVA_I");
			var bflagTR_L_BBVA_E = oContext.getProperty("flagTR_L_BBVA_E");
			var bflagTR_L_BMX_I = oContext.getProperty("flagTR_L_BMX_I");
			var bflagTR_L_BMX_E = oContext.getProperty("flagTR_L_BMX_E");
			if (bflagTR_L_BBVA_I && bflagTR_L_BBVA_E) {
				aFiltersComboBox.push(new Filter("Bankl", FilterOperator.EQ, "012"));
				aFiltersComboBox.push(new Filter("Bankn", FilterOperator.EQ, "CIE"));
			}
			if (bflagTR_L_BMX_I && bflagTR_L_BMX_E) {
				aFiltersComboBox.push(new Filter("Bankl", FilterOperator.EQ, "002"));
			}
			oComboBox.getBinding("items").filter(aFiltersComboBox);
		},

		/** 
		 * @author Jorge Bustillos
		 * @function
		 * @name _onGetFinInfo_Rate
		 * @param {string} sPath Path del elemento
		 * @param {object} oModel Modelo del elemento
		 * @desc Se obtiene el tipo de tasa para Traspasos de Unidad
		 */
		_onGetFinInfo_Rate: function (sPath, oModel) {
			var sRate = oModel.getProperty(sPath + "/rateType");
			var sDate = oModel.getProperty(sPath + "/dateStart");
			if (sDate === "" || sDate === null) {
				return;
			}
			var urlRateValue = this._getUrl()
				//Ubicación servicio
				+ "srv_api/data/RateValuesSet"
				//Restriccion búsqueda
				+ "?$orderby=date desc&$top=1"
				//Filtros
				+ "&$filter=" + encodeURI(
					"rate eq '" + sRate + "' and date le " + sDate.toISOString().substr(0, 10));
			var aPromises = [];
			var errorI18N1 = this._i18n.getText("trasUniErrFinSrv_Rate");
			//consulta tabla BD_VN_PPX_Data_RateType
			aPromises.push($.get(urlRateValue));
			Promise.all(aPromises).then(function (oValue) {
				var oFinRate = oValue[0].value[0];
				oModel.setProperty(sPath + "/rateValue", oFinRate.rateValue);
			}).catch(function (reason) {
				MessageBox.error(
					errorI18N1, {
						id: "serviceErrorMessageBox" + (new Date().getTime()),
						details: reason.toString(),
						actions: [MessageBox.Action.CLOSE],
						onClose: function () {
							this._bMessageOpen = false;
						}.bind(this)
					}
				);
			});
		},

		/** 
		 * @author Jorge Bustillos
		 * @function
		 * @name _onGetFinInfo_Rate
		 * @param {string} sCompanyCode Sociedad
		 * @param {string} sFinCode Código financiera
		 * @param {object} Combobox a validar
		 * @desc Se muestra mensaje de error y limpia la seleccion
		 */
		_onValidateFinSrv: function (sCompanyCode, sFinCode, oComboBox) {
			var textoI18n = this._i18n.getText("trasUniFinErr", [sCompanyCode, sFinCode]);
			var tituloI18n = this._i18n.getText("trasUniFinErrTit");
			MessageBox.alert(textoI18n, {
				icon: MessageBox.Icon.ERROR,
				title: tituloI18n
			});
			oComboBox.setSelectedKey("");
			oComboBox.clearSelection();
			oComboBox.setValue("");
			oComboBox.setValueState("Error");
			var sPathFinCode = this.oRowContext.getPath() + "/newFinSrv_finCode"; // - /0/flagTR_L_CtaDest						
			var sPathCtaDest = this.oRowContext.getPath() + "/flagTR_L_CtaDest"; // - /0/flagTR_L_CtaDest
			this.oRowContext.getModel().setProperty(sPathCtaDest, "");
			this.oRowContext.getModel().setProperty(sPathFinCode, "");
		},
		/** 
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name onChangeImporte
		 * @param {object} oEvent Evento cambio input
		 * @desc Realiza la suma de la columna Importe a Pagar.
		 */
		onChangeImporte: function (oEvent) {
			var oDataPago = this.getView().getModel("TrasUnidadCollection").getData(); //obtiene los datos de la tabla  y los guarda en un json
			this.iImportePagar = 0;
			oDataPago.map(function (temp) {
				if (temp.financedAmt !== undefined)
					if (!isNaN(temp.financedAmt))
						this.iImportePagar = this.iImportePagar + parseFloat(temp.financedAmt);
			}, this);
			this.getView().getModel("oImporteSumatoria").setProperty("/sumatoriaTraspaso", this.iImportePagar.toFixed(2));
		},

		/** 
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name _onButtonCopy
		 * @param {object} oEvent Evento botón
		 * @desc Copia la configuración de la primera fila al resto de las filas.
		 */
		_onButtonCopy: function (oEvent) {
			var oModel = this.getView().getModel("TrasUnidadCollection");
			var oTabla = this.getView().byId("tablaTrasUni");
			var oTablaRows = oTabla.getRows();
			var oTablaCtxs = oTabla.getBinding().getContexts();
			//Universo de registros
			var aRegistros = oModel.getData(); //arreglo con registros
			//fila1 Almacena el primer renglon de la tabla
			var oFila1 = aRegistros[0];
			var oDialog = oEvent.getSource().getParent();
			//La funcionalidad de copiar solo funciona si es mismo centro/moneda/financiera
			var aCenter = new Set(aRegistros.map(x => {
				return x.center;
			}));
			var aCurrency = new Set(aRegistros.map(x => {
				return x.currency;
			}));
			var aFinCode = new Set(aRegistros.map(x => {
				return x.finSrv_finCode;
			}));
			if (aCenter.size > 1) {
				MessageBox.error("La funcionalidad de copiar solamente acepta un mismo centro.");
				return;
			}
			if (aCurrency.size > 1) {
				MessageBox.error("La funcionalidad de copiar solamente acepta una misma moneda.");
				return;
			}
			if (aFinCode.size > 1) {
				MessageBox.error("La funcionalidad de copiar solamente acepta una misma financiera.");
				return;
			}
			//oDialog.setBusy(true);
			var oDatos = [];
			var i = 1;
			var sPath = "";
			//A los demás registros copiar los valores del primer renglón
			for (i = 1; i < aRegistros.length; i++) {
				sPath = "/" + i + "/";
				//Objeto a modificar a nivel modelo: + propiedad: /1/datePro
				oModel.setProperty(sPath + "accExpense", oFila1.accExpense);
				oModel.setProperty(sPath + "dateStart", oFila1.dateStart);
				oModel.setProperty(sPath + "newFinSrv_finCode", oFila1.newFinSrv_finCode);
				oModel.setProperty(sPath + "accIncome", oFila1.accIncome);
				oModel.setProperty(sPath + "finDays", oFila1.finDays);
				oModel.setProperty(sPath + "dateEnd", oFila1.dateEnd);
				oModel.setProperty(sPath + "rateType", oFila1.rateType);
				oModel.setProperty(sPath + "rateValue", oFila1.rateValue);
				oModel.setProperty(sPath + "flagTR_L_BBVA_I", oFila1.flagTR_L_BBVA_I);
				oModel.setProperty(sPath + "flagTR_L_BMX_I", oFila1.flagTR_L_BMX_I);
				oModel.setProperty(sPath + "flagTR_L_BBVA_E", oFila1.flagTR_L_BBVA_E);
				oModel.setProperty(sPath + "flagTR_L_BMX_E", oFila1.flagTR_L_BMX_E);
				oModel.setProperty(sPath + "flagTR_L_CtaOrg", oFila1.flagTR_L_CtaOrg);
				oModel.setProperty(sPath + "flagTR_L_CtaDest", oFila1.flagTR_L_CtaDest);
				//Actualizar intereses
				var sFinancedItemID = oModel.getProperty(sPath + "ID");
				var sDatePay = oModel.getProperty(sPath + "dateStart");
				var nPayedAmt = Number(oModel.getProperty(sPath + "balanceAmt"));
				var nIntRecalAmt = Number(oModel.getProperty(sPath + "interestAmt"));
				var res = this.onValidCopy(sFinancedItemID, sDatePay, nPayedAmt, nIntRecalAmt);
				if (res === false) {
					return;
				}
				oDatos.push({
					"FinancedItemID": sFinancedItemID,
					"datePay": sDatePay.toISOString().substr(0, 10),
					"payedAmt": nPayedAmt.toFixed(2),
					"intRecalAmt": nIntRecalAmt.toFixed(2)
				});

			}
			//Actualizar intereses:
			//2) Consultar los resultados
			var oResultado = this._onObtenerIntBbva(oDatos);
			i = 1;
			for (i = 1; i < aRegistros.length; i++) {
				sPath = "/" + i + "/";
				var oID = oModel.getProperty(sPath + "ID");
				var oRes = oResultado.find(x => x.FinancedItemID === oID);
				oModel.setProperty(sPath + "interestAmt", Number(oRes.intRecalAmt).toFixed(2));
			}

			for (var oContext of oTablaCtxs) {
				//Actualizar ComboBox
				try {

					var iIdx = oTablaCtxs.indexOf(oContext);
					var oRow = oTablaRows[iIdx];
					var oCtaOrigen = oRow.getCells().find(x => x.getId().search("cbCtaOrigen") !== -1);
					var oCtaDest = oRow.getCells().find(x => x.getId().search("cbCtaDest") !== -1);
					this._setFiltersCtaOrg(oCtaOrigen, oContext);
					this._setFiltersCtaDest(oCtaDest, oContext);
				} catch (ex) {
					console.log(ex);
				}
			}
			oDialog.setBusy(false);
		},
		/** 
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name onValidCopy
		 * @param {string} sFinancedItemID 
		 * @param {string} sDatePay fecha
		 * @param {string} nPayedAmt pago
		 * @param {string} nIntRecalAmt 
		 * @desc valida que los campos a copiar esten completos 
		 */
		onValidCopy: function (sFinancedItemID, sDatePay, nPayedAmt, nIntRecalAmt) {
			var that = this;
			var bValidaFlag = true;
			if ((sFinancedItemID === "") || (sFinancedItemID === null) || (sFinancedItemID.length === 0) || (sFinancedItemID === undefined)) {
				MessageBox.error(that._i18n.getText("ErrCoppy"));
				bValidaFlag = false;
				return bValidaFlag;
			}
			if ((sDatePay === "") || sDatePay === null || sDatePay.length === 0 || sDatePay === undefined) {
				MessageBox.error(that._i18n.getText("ErrTFini"));
				bValidaFlag = false;
				return bValidaFlag;
			}
			if (nPayedAmt === "" || nPayedAmt === null || nPayedAmt.length === 0 || nPayedAmt === undefined) {
				MessageBox.error(that._i18n.getText("ErrCoppy"));
				bValidaFlag = false;
				return bValidaFlag;
			}
			if (nIntRecalAmt === "" || nIntRecalAmt === null || nIntRecalAmt.length === 0 || nIntRecalAmt === undefined) {
				MessageBox.error(that._i18n.getText("ErrCoppy"));
				bValidaFlag = false;
				return bValidaFlag;
			}
			return bValidaFlag;
		},

		/** 
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name _onObtenerIntBbva
		 * @param {object} datos Importes de intereses a obtener
		 * @desc Función que obtiene el importe de interes recibiendo por datos.
		 */
		_onObtenerIntBbva: function (datos) {
			var sUrl = this._getUrl()
				//Ubicacion servicio
				+ "srv_api/function/getInterestPay";
			var oSend = {
				"Input": datos
			};
			var datosDevueltos = datos; //La casilla inicia desmarcada 
			$.ajax({
				url: sUrl,
				"async": false,
				type: "POST",
				dataType: "json",
				contentType: "application/json;IEEE754Compatible=true",
				data: JSON.stringify(oSend)
			}).then(function (data) {
				if (data.value.length !== 0) {
					datosDevueltos = data.value;
				}
			});
			return datosDevueltos;
		},
		/** 
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name oValidCaracter
		 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
		 * @desc Valida si el campo de Imp Pag tiene caracteres
		 */
		oValidCaracter: function (oEvent) {
			var sInputValue = oEvent.getSource().getValue();
			var oInputValue = oEvent.getSource();
			if ((sInputValue.lastIndexOf(".0") === 1) || (sInputValue.lastIndexOf(".") === 1)) {
				////console.log(sInputValue);
				return;
			}
			if ((sInputValue.length) === 0) {
				oInputValue.setValue("");
				return;
			}
			if ((sInputValue.lastIndexOf(".0") === -1) && (sInputValue.lastIndexOf(".") === -1) && (sInputValue.lastIndexOf(",") === -1)) {
				var sCaracter =
					"^[0-9]{1,3}(?:[0-9]*(?:[.,][0-9]{2})?|(?:,[0-9]{3})*(?:\.[0-9]{2})?|(?:\.[0-9]{3})*(?:,[0-9]{2})?)$";
				var regex = new RegExp(sCaracter);
				//Si no se cumple con los valores de dateReg muestra mensaje
				if (!regex.test(sInputValue)) {
					var sTextoI18n = this._i18n.getText("ErrImportPagCaracter");
					var sTituloI18n = this._i18n.getText("ImportFinTit");
					MessageBox.error(sTextoI18n, {
						icon: MessageBox.Icon.ERROR,
						title: sTituloI18n,
						actions: [MessageBox.Action.OK],
						emphasizedAction: MessageBox.Action.OK,
						onClose: function (sAction) {
							if (sAction === "OK") {
								oInputValue.setValue("0");
								return;
							}

						}
					});
				}
			}

		},
		/** 
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name handleFechaInicio
		 * @param {object} oEvent Evento cambio datepicker
		 * @desc Funcion que valida la seleccion de fecha de inicio 
		 * donde fecha seleccionada no debe ser > a la de Hoy
		 * Se recalcula los intereses dependiendo la fecha seleccionada
		 */
		handleFechaInicio: function (oEvent) {
			var oDatePicker = oEvent.getSource();
			var oToday = new Date();
			var oDateselect = oDatePicker.getDateValue();
			if (oDateselect > oToday) {
				MessageBox.warning(this._i18n.getText("ErrSelecdate"), {
					actions: [MessageBox.Action.OK],
					emphasizedAction: MessageBox.Action.OK,
					onClose: function (sAction) {
						if (sAction === "OK") {
							oDatePicker.setDateValue(oToday);
							return;
						}
					}
				});
			}
			var oContext = oDatePicker.getParent().getBindingContext("TrasUnidadCollection");
			var sPath = oContext.getPath();
			var oModel = oContext.getModel("TrasUnidadCollection");
			var oDateStart = oModel.getProperty(sPath + "/dateStart");
			var oID = oModel.getProperty(sPath + "/ID");
			var oBalanceAmt = oModel.getProperty(sPath + "/balanceAmt");
			var oInterestAmt = oModel.getProperty(sPath + "/interestAmt");
			var iFinDays = oModel.getProperty(sPath + "/finDays");
			if (!oInterestAmt) {
				oInterestAmt = 0;
			}
			//Calcular intereses deacuerdo a la fecha
			var oDatos = [{
				"FinancedItemID": oID,
				"datePay": oDatePicker.getDateValue().toISOString().substring(0, 10),
				"payedAmt": Number(oBalanceAmt).toFixed(2),
				"intRecalAmt": oInterestAmt.toFixed(2)
			}];
			//2) Consultar los resultados
			var oResultado = this._onObtenerIntBbva(oDatos);
			//3) Regresar intereses al arreglo original
			//1.- Se va obtener el interes de la primera posicion del resultado
			oModel.setProperty(sPath + "/interestAmt", oResultado[0].intRecalAmt);
			//Calcular fecha fin si se tiene número de días y cambio fecha inicio
			if (isNaN(iFinDays) || oDateStart === null || oDateStart === "" || iFinDays === 0) {
				return;
			}
			this._onFinDaysCalculate(oModel, sPath, oDateStart, iFinDays);
			//this._onValidateFinSrv(sCompanyCode, sFinCode, oComboBox);
		}
	});
}, /* bExport= */ true);