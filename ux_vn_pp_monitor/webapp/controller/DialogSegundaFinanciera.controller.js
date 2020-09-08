/**
 * @file Controlador Confirmar Pago.
 * @author Javier Balcazar Cruz <jbalcazar@zapata.com.mx>.
 * Notación JSDoc para Funciones, Parametros, Objetos, etc.
 * @param {param type} param name - description.
 */
/** 
 * sap.ui.define:
 * @module ManagedObject
 * @module Fragment
 * @module MessageBox
 * @module History
 * @module MessageToast
 * @module Filter
 * @module FilterOperator
 * @module JSONModel
 */
sap.ui.define([
	"sap/ui/base/ManagedObject",
	"sap/ui/core/Fragment",
	"sap/m/MessageBox",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/json/JSONModel"
], function (ManagedObject, Fragment, MessageBox, History, MessageToast, Filter, FilterOperator, JSONModel) {
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
	 * @desc   Función principal de Segunda Financiera.
	 * @return {class} - Retorna controller.DialogSegundaFinanciera .
	 */
	return ManagedObject.extend("vn.pp.ux_vn_pp_monitor.controller.DialogSegundaFinanciera", {
		//-------------------------------------------------------------------
		//	Eventos estándar UI5:
		//-------------------------------------------------------------------	
		/** 
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name constructor 
		 * @param  {event} oView - Recibe Evento y ejecutala función.
		 * @desc Se inicializan propiedades y variables al al abrir la vista DialogActFijo.
		 */
		constructor: function (oView) {
			this._oView = oView;
			this._oControl = sap.ui.xmlfragment(oView.getId(), "vn.pp.ux_vn_pp_monitor.view.DialogSegundaFinanciera", this);
			this._bInit = false;
			this._i18n = this.getView().getModel("i18n").getResourceBundle();
		},
		/** 
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name exit
		 * @desc 
		 */
		exit: function () {
			delete this._oView;
		},
		/** 
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name getView
		 * @desc 
		 * @return {object} - Retorna _oView.
		 */
		getView: function () {
			return this._oView;
		},
		/** 
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name getControl
		 * @desc 
		 * @return {object} - Retorna _oControl.
		 */
		getControl: function () {
			return this._oControl;
		},
		/** 
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name getOwnerComponent
		 * @desc 
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
		 * @desc Abrir dialogo, agregar dependientes y modelos.
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
			this.getView().byId("tabla2daFinan").clearSelection();
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
		 * @desc 
		 * @return {void}
		 */
		getBindingParameters: function () {
			return {};
		},

		/** 
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name _onActionTrasCteE
		 * @desc Campo de ayuda para cuenta de egreso, define el contexto de la fila a modificar en la variable global this.oRowContext
		 * Se abre el dialogo DialogTrasCtaE
		 * Se establece le filtro de acuerdo a la combinación de dicha fila		 
		 * Si se seleccionó confirmar, se deberá actualizar la propiedad accExpense de la línea seleccionada
		 * la línea seleccionada se carga en this.oRowContext derivado de onValueHelpAccExpense
		 * @return {void}
		 */
		_onActionTrasCteE: function (oEvent) {
			//Actualizar valor si se seleccionó confirmar:
			if (oEvent.getId() !== "confirm") {
				return;
			}
			var sPath = this.oRowContext.getPath() + "/accExpense"; // - /0/accExpense
			var sSapHkont = oEvent.getParameter("selectedItem").getBindingContext("modeloCatalog").getProperty("sapHkont");
			this.oRowContext.getModel().setProperty(sPath, sSapHkont);
		},
		/** 
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name _generarFiltroCtaIngreso
		 * @param sInputValue Texto de búsqueda de centro por título
		 * @desc Genera el filtro de sociedad, centro y titulo de centro para la búsqueda de centros
		 * @return {void} Filter Filtro con condición sociedad y texto.
		 */
		_generarFiltroCtaIngreso: function (sInputValue) {
			//Arreglo de filtros
			var aFiltro_and = [];
			aFiltro_and.push(new Filter("sapHkont", FilterOperator.Contains, sInputValue));
			var sCompanyCode = this.oRowContext.getProperty("companyCode");
			var sCenter = this.oRowContext.getProperty("center");
			var sFinCode = this.oRowContext.getProperty("newFinSrv_finCode");
			aFiltro_and.push(new Filter("companyCode", FilterOperator.EQ, sCompanyCode));
			aFiltro_and.push(new Filter("center", FilterOperator.EQ, sCenter));
			aFiltro_and.push(new Filter("finCode", FilterOperator.EQ, sFinCode));
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
		 * @param {event} oEvent - Recibe el evento por el cual fue ejecutado.
		 * @desc  Genera Segunda Financiera
		 * @return {void} 
		 */
		_onButtonPress: function (oEvent) {
			var that = this; //Referencia a dialogo
			var bValidaFlag = true;
			var oDialog = oEvent.getSource().getParent();
			MessageBox.confirm(this._i18n.getText("confSegFin"), function (oAction) {
				if (oAction === "OK") {
					//Crea JSON
					var oModel = that.getView().getModel("2dafinanCollection");
					var tabla = oModel.getData();
					var oModeloInsertar2dafinan = [];
					try {
						//Validaciones en un foreach.
						for (var linea of tabla) {
							//Si la línea es de anulación, ignorar:
							if (linea.reverseFlag) {
								continue;
							}
							var ncostAmt = linea.costAmt;
							var dDateStart = linea.dateStart;
							var sNewfine = linea.newFinSrv_finCode; //"Financiera Nueva"
							var iDiaFina = parseInt(linea.finDays, 10); //"Dias de Financiamiento"    
							var fImportFin = parseFloat(linea.financedAmt); //"Importe a Financiar"

							if (fImportFin > ncostAmt) {
								MessageBox.error(that._i18n.getText("ErrImpMayFina"));
								bValidaFlag = false;
								return;
							}
							//Validacion de Fecha de Inicio no vacio
							if ((linea.dateStart === undefined) || (linea.dateStart === null) || (linea.dateStart === '') || (linea.dateStart.length ===
									0)) {
								MessageBox.error(that._i18n.getText("ErrTFini"));
								bValidaFlag = false;
								return;
							}

							//Validacion de Fecha de Inicio no vacio
							if ((linea.dateStart === undefined) || (linea.dateStart === null) || (linea.dateStart === '') || (linea.dateStart.length ===
									0)) {
								MessageBox.error(that._i18n.getText("ErrTFini"));
								bValidaFlag = false;
								return;
							}
							//Validacion de Financiera Nueva no vacio
							if ((sNewfine === undefined) || (sNewfine === null) || (sNewfine === '') || (sNewfine.length === 0)) {
								MessageBox.error(that._i18n.getText("ErrFinanciera"));
								bValidaFlag = false;
								return;
							}

							//Validacion Dias de Financiamiento  no vacio
							if ((iDiaFina === undefined) || (iDiaFina === null) || (iDiaFina === '') || (iDiaFina.length === 0) || isNaN(iDiaFina)) {
								MessageBox.error(that._i18n.getText("ErrDiasFIn"));
								bValidaFlag = false;
								return;
							}

							//Validacion de Importe a Financiar no vacio
							if (isNaN(fImportFin) || fImportFin <= 0 || (fImportFin === null) || (fImportFin === undefined) || (fImportFin === '') || (
									fImportFin.length === 0)) {
								MessageBox.error(that._i18n.getText("ErrImpFin"));
								bValidaFlag = false;
								return;
							}
							var sfechaInicio = dDateStart.toISOString().substring(0, 10);

							oModeloInsertar2dafinan.push({
								"oldFinItemID": linea.ID,
								"oldFinCode": linea.finSrv_finCode,
								"financedAmt": that._NumToString(fImportFin),
								"graceDays": 0,
								"finDays": iDiaFina,
								"dateStart": sfechaInicio,
								"flagReverse": false,
								"finCode": sNewfine
							});
						} //	Fin for
					} // FIN try
					catch (ex) {

						return; //Salir de onButtonPress
					}
					if (!bValidaFlag) {
						return;
					}
					//Obtenemos la tabla ligada al servicio:
					var oSend = {
						Input: []
					};
					//Se tiene que enviar el modelo uno por uno 
					oModeloInsertar2dafinan.forEach(function (oModeloIndividual) {
						oSend.Input.push(oModeloIndividual);
					});
					//Pausar UI:
					oDialog.setBusy(true);
					//Enviamos a función:
					var sUrl = that._getUrl()
						//Ubicacion servicio
						+ "srv_api/function/newSecFIn";
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
					Promise.all([resPromesa]).then(function (res) {
						var MensajeExitoso = that._i18n.getText("MSegFinaExitoso", [res[0].value]);
						MessageBox.success(MensajeExitoso, {
							icon: MessageBox.Icon.SUCCESS
						});
						oDialog.setBusy(false);
						that.close(true);
					}).catch(function (reason) {
						oDialog.setBusy(false);
						MessageBox.error(reason.responseText);
						that.close(true);
					});
				}
			});
		},
		/** 
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name _NumToString
		 * @param {string} oValor - Recibe el evento por el cual fue ejecutado.
		 * @desc Recibe un valor, y le da formato numerico
		 *  @return {oValor}
		 */
		_NumToString: function (oValor) {
			oValor = Number(oValor); // NaN || Float
			oValor = (isNaN(oValor)) ? "0.00" : oValor.toFixed(2); // "0.00" ó ||"1234.00"
			return oValor;
		},

		/** 
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name _onButtonAnular
		 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
		 * @desc Funcion que Anula la Segunda Financiera
		 */
		_onButtonAnular: function (oEvent) {
			var that = this;
			var oTable = this.getView().byId("tabla2daFinan");
			var oDialog = oEvent.getSource().getParent();
			var aIndices = oTable.getSelectedIndices();
			if (aIndices.length === 0) {
				return;
			}
			oDialog.setBusy(true);
			MessageBox.confirm(this._i18n.getText("confAnular"), function (oAction) {
				if (oAction === "OK") {
					var oAnular = {
						Input: []
					};
					try {
						//Validaciones en un foreach.
						for (var index of aIndices) {
							var linea = oTable.getRows()[index].getBindingContext("2dafinanCollection").getObject();
							//Si la línea es de anulación, agregar:
							if (linea.reverseFlag) {
								oAnular.Input.push(linea.ID);
							}
						}
						//Realizar petición
						var res = that._onButtonAnular_POST(oAnular);
						MessageBox.success(that._i18n.getText("anuSegFin", [res]));
					} catch (err) {
						MessageBox.error(err);
					}
					oDialog.setBusy(false);
					that.close(true);
				} else {
					oDialog.setBusy(false);
				}
			});
		},

		/** 
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name _onButtonAnular_POST
		 * @param {object} oBody - .
		 * @desc Funcion que Anula la Segunda Financiera enviando la peticion al servicio "deleteSecFin"
		 */
		_onButtonAnular_POST: function (oBody) {
			var that = this;
			var res = 0;
			var sUrl = that._getUrl()
				//Ubicacion servicio
				+ "srv_api/function/deleteSecFin";
			$.ajax({
				url: sUrl,
				type: "POST",
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				async: false,
				data: JSON.stringify(oBody)
			}).then(function (data) {
				res = data.value;
			});
			return res;
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
		 * @desc 
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
		 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
		 * @desc Funcion donde Si cambian los días a financiar, se actualiza la fecha fin
		 */
		onFinDays: function (oEvent) {
			var oInputDays = oEvent.getSource();
			var oContext = oInputDays.getParent().getBindingContext("2dafinanCollection");
			var sPath = oContext.getPath();
			var oModel = oContext.getModel("2dafinanCollection");
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
		 * @name onValidateFinSrv
		 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
		 * @desc //Función que valida la financiera seleccionada:
		 */

		onValidateFinSrv: function (oEvent) {
			//Obtener el valor seleccionado
			var oComboBox = oEvent.getSource();
			//Estado del control vacío
			oComboBox.setValueState("None");
			var oContext = oComboBox.getParent().getBindingContext("2dafinanCollection");
			var oModel = oComboBox.getParent().getModel("2dafinanCollection");
			var sPath = oContext.getPath() + "/";
			var sKey = oComboBox.getSelectedKey();
			if (sKey === "" || sKey === null) {
				oModel.setProperty(sPath + "newFinSrv_finCode", "");
				oComboBox.setValueState("Error");
				return;
			}
			var sfinCode = oContext.getProperty("finSrv_finCode");
			if (sKey === sfinCode) {
				MessageBox.warning(this._i18n.getText("ErrFinActual"), {
					actions: [MessageBox.Action.OK],
					emphasizedAction: MessageBox.Action.OK,
					onClose: function (sAction) {
						if (sAction === "OK") {
							oComboBox.clearSelection("");
							oComboBox.setValue("");
							oComboBox.setValueState("Error");
							oModel.setProperty(sPath + "newFinSrv_finCode", "");
						}
					}
				});
				return;
			}

			var sUnidadID = oContext.getProperty("unidadID");
			var bOKFin = this._validateSegFin(sUnidadID, sKey, oComboBox, oContext, oModel, sPath);
			if (!bOKFin) return;
			var sCompanyCode = oContext.getProperty("companyCode");
			var sFinCode = oComboBox.getSelectedKey();
			var url = this._getUrl()
				//Ubicacion servicio
				+ "srv_api/catalogs/FinSet"
				//Filtros
				+ "?$filter=" + encodeURI(
					"companyCode eq '" + sCompanyCode + "' and finCode eq '" + sFinCode + "'");
			//Comparar con servicio y sociedad
			var that = this;
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
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name _onFinDaysCalculate
		 * @param {object} oModel - 
		 * @param {string} sPath - 
		 * @param {object} oDateStart - 
		 * @param {int} iFinDays -
		 * @desc Se hace el calculo de los días
		 */
		_onFinDaysCalculate: function (oModel, sPath, oDateStart, iFinDays) {
			var oEndDate = new Date(oDateStart.getTime());
			oEndDate.setTime(oEndDate.getTime() + (24 * 60 * 60 * 1000 * iFinDays));
			oModel.setProperty(sPath + "/dateEnd", oEndDate);
		},
		/** 
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name _onGetFinInfo
		 * @param {object} oContext - object Contexto
		 * @param {object} oResData - object oResData
		 * @desc Obtener Dias Financiamiento, Tipo de Tasa y Valor de Tasa	
		 */
		_onGetFinInfo: function (oContext, oResData) {
			var oModel = oContext.getModel("2dafinanCollection");
			var sPath = oContext.getPath();
			var sSapVKORG = oContext.getProperty("center");
			var sFinCode = oContext.getProperty("finSrv_finCode");
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
			//
			/** 
			 * @author Javier Balcazar Cruz 
			 * @function
			 * @name urlFinSrv
			 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
			 * @desc Generar filtro del servicio a consultar FinSrvCredits,FinSrvs_001 .
			 */
			var urlFinSrv = this._getUrl()
				//Ubicación servicio
				+ "srv_api/catalogs/FinSrvCredits"
				//Filtros
				+ "?$filter=" + encodeURI(
					"sapVKORG eq '" + sSapVKORG + "' and finServ_finCode eq '" + sFinCode + "' and " + sFlag + " eq true");
			var urlFinRates = this._getUrl()
				//Ubicación servicio
				+ "/srv_api/entity/FinSrvs_001"
				//Filtros
				+ "?$filter=" + encodeURI("finCode eq '" + sFinCode + "' and active eq true")
				//Expand
				+ "&$expand=" + encodeURI("finType($expand=finRates($filter=currency eq '" + sCurrency + "' and active eq true))");

			//Preparar mensaje de error:
			var errorI18N_1 = this._i18n.getText("trasUniErrFinSrv");
			//Obtener info FinSrvCredits y FinRates
			var aPromises = [];
			aPromises.push($.get(urlFinSrv)); //peticion a ala URL, devuelve JSON
			aPromises.push($.get(urlFinRates)); //valor de la tasa variable
			var that = this;
			//Esperar resultados
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
				that._onGetFinInfo_Rate(sPath, oModel); //tasa variable del día
			}).catch(function (sReason) {
				MessageBox.error(
					errorI18N_1, {
						id: "serviceErrorMessageBox" + (new Date().getTime()),
						details: sReason,
						actions: [MessageBox.Action.CLOSE],
						onClose: function () {
							//this._bMessageOpen = false;
						}.bind(this)
					}
				);
			});
		},

		/** 
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name onSelectionChange
		 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
		 * @desc Muestra mensaje de error, en caso de que no sea posible seleccionar para anular.
		 */
		onSelectionChange: function (oEvent) {
			var oReverseFlag = oEvent.getParameter("rowContext").getProperty("reverseFlag");
			if (!oReverseFlag) {
				oEvent.getSource().clearSelection();
				var sTxt = this._i18n.getText("err2daFinaStAnu", [oEvent.getParameter("rowContext").getProperty("serial")]);
				MessageToast.show(sTxt);
			}
		},

		/** 
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name _onGetFinInfo_Rate
		 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
		 * @desc Obtiene el tipo de tasa para traspasos, [RateValuesSet]
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
			var errorI18N_1 = this._i18n.getText("trasUniErrFinSrv_Rate");
			//consulta tabla BD_VN_PPX_Data_RateType
			aPromises.push($.get(urlRateValue));
			Promise.all(aPromises).then(function (oValue) {
				var oFinRate = oValue[0].value[0];
				oModel.setProperty(sPath + "/rateValue", oFinRate.rateValue);
			}).catch(function (reason) {
				MessageBox.error(
					errorI18N_1, {
						id: "serviceErrorMessageBox" + (new Date().getTime()),
						details: reason,
						actions: [MessageBox.Action.CLOSE],
						onClose: function () {
							//this._bMessageOpen = false;
						}.bind(this)
					}
				);
			});
		},
		//
		/** 
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name _onValidateFinSrv
		 * @param {string} sCompanyCode - 
		 * @param {string} sFinCode - 
		 * @param {object} oComboBox - 
		 * @desc Mostrar mensaje de error y limpiar la seleccion
		 */
		_onValidateFinSrv: function (sCompanyCode, sFinCode, oComboBox) {
			var sTextoI18n = this._i18n.getText("trasUniFinErr", [sCompanyCode, sFinCode]);
			var sTituloI18n = this._i18n.getText("trasUniFinErrTit");
			MessageBox.alert(sTextoI18n, {
				icon: MessageBox.Icon.ERROR,
				title: sTituloI18n
			});
			oComboBox.setValue("");
			oComboBox.setValueState("Error");
		},
		/** 
		 *  Función que copia la configuración de la primera fila 
		 * al resto de las filas.
		 */
		/** 
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name oCopy2dafina
		 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
		 * @desc Copia la configuración de la primera fila al resto de las filas.
		 */
		oCopy2dafina: function (oEvent) {
			var oModel = this.getView().getModel("2dafinanCollection");
			//Universo de registros
			var aRegistros = oModel.getData(); //arreglo con registros
			//fila1 Almacena el primer renglon de la tabla
			var oFila1 = aRegistros[0];
			if (oFila1.reverseFlag === true) {
				return;
			}
			//A los demás registros copiar los valores del primer renglón
			for (var i = 1; i < aRegistros.length; i++) {
				//Objeto a modificar a nivel modelo: + propiedad: /1/datePay
				var sPath = "/" + i + "/";
				var reverseFlag = oModel.getProperty(sPath + "reverseFlag"); //Si es anulación ignorar
				if (reverseFlag === true) {
					continue;
				}
				oModel.setProperty(sPath + "dateStart", oFila1.dateStart); //Fecha Inicio
				oModel.setProperty(sPath + "finDays", oFila1.finDays); //Dias de Financiamiento
				oModel.setProperty(sPath + "newFinSrv_finCode", oFila1.newFinSrv_finCode); //Nueva Financiera
				oModel.setProperty(sPath + "dateEnd", oFila1.dateEnd); //Fecha Fin  financiamiento
				oModel.setProperty(sPath + "rateType", oFila1.rateType); //Tipo de Tasa
				oModel.setProperty(sPath + "rateValue", oFila1.rateValue); //Valor de Tasa
			}
		},
		/** 
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name handleFechaInicio
		 * @desc Funcion de selección y validación de fecha
		 */
		handleFechaInicio: function (oEvent) {
			var oDatePicker = oEvent.getSource();
			var dToday = new Date();
			var dateselect = oDatePicker.getDateValue();
			if (dateselect > dToday) {
				MessageBox.warning(this._i18n.getText("ErrSelecdate"), {
					actions: [MessageBox.Action.OK],
					emphasizedAction: MessageBox.Action.OK,
					onClose: function (sAction) {
						if (sAction === "OK") {
							oDatePicker.setDateValue(dToday);
						}
					}
				});
			}
			//Calcular fecha fin si se tiene número de días y cambio fecha inicio
			var oContext = oDatePicker.getParent().getBindingContext("2dafinanCollection");
			var sPath = oContext.getPath();
			var oModel = oContext.getModel("2dafinanCollection");
			var oDateStart = oModel.getProperty(sPath + "/dateStart");
			var iFinDays = oModel.getProperty(sPath + "/finDays");
			if (isNaN(iFinDays) || oDateStart === null || oDateStart === "" || iFinDays === 0) {
				return;
			}
			this._onFinDaysCalculate(oModel, sPath, oDateStart, iFinDays);
		},
		/** 
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name handleFechaInicio
		 * @desc Verifica en el servicio validateSegFin que la segunda financiera no se haya utilizado.		 
		 * @param {string} sUnidadID UUID de la unidad a comprobar
		 * @param {ComboBox} oComboBox Combobox a comprobar
		 * @param {object} oCtx Contexto a modificar
		 * @param {object} oModel Modelo a modificar
		 * @param {string} sPath Path a modificar
		 */
		_validateSegFin: function (sUnidadID, sFinCode, oComboBox, oCtx, oModel, sPath) {
			var sTxtErr = this._i18n.getText("ErrFinMisma");
			var sTxtErrG = this._i18n.getText("trasUniErrFinSrv");
			var url = this._getUrl()
				//Ubicacion servicio
				+ "srv_api/function/validateSegFin";
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
						oModel.setProperty(sPath + "newFinSrv_finCode", "");
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
					var sTextoI18n = this._i18n.getText("Errintafinanciar");
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
		}
	});
}, /* bExport= */ true);