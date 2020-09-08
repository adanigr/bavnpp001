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
	 * @desc   Función principal de Recalendarización.
	 * @return {class} - Retorna controller.DialogRecalendarizacion .
	 */
	return ManagedObject.extend("vn.pp.ux_vn_pp_monitor.controller.DialogRecalendarizacion", {
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
			this._oControl = sap.ui.xmlfragment(oView.getId(), "vn.pp.ux_vn_pp_monitor.view.DialogRecalendarizacion", this);
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
		 * @desc Abrir dialogo, agregar dependientes y modelos .
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
			//*******Suma de el campo Saldo a financiar******
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
		 * @desc 
		 * @return {void}
		 */
		getBindingParameters: function () {
			return {};
		},

		/** 
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name _onButtonPress
		 * @param {event} oEvent - Recibe el evento por el cual fue ejecutado.
		 * @desc  Confirma la Recalendarización
		 * @return {void} 
		 */
		_onButtonPress: function (oEvent) {
			var that = this; //Referencia a dialogo
			var bValidaFlag = true;
			var oDialog = oEvent.getSource().getParent();
			MessageBox.confirm(this._i18n.getText("confcambios"), function (oAction) {
				if (oAction === "OK") {
					//Crea JSON
					var oModel = that.getView().getModel("RecalendarizacionCollection");
					var tabla = oModel.getData();
					try {
						tabla.forEach(
							//Por cada línea de X quiero que hagas esto:
							function (linea) {
								var dDatestart = linea.dateStart; //"Fecha Inicio"
								var sFechaInicio = dDatestart.toISOString().substring(0, 10);
								var iDiaFina = parseInt(linea.finDays, 10); //"Dias de Financiamiento" 
								var fIntPagar = parseFloat(linea.intRecalAmt); //"Interes a Pagar"

								//Validacion de Fecha de Inicio no vacio
								if ((sFechaInicio === null) || (sFechaInicio === '') || (sFechaInicio.length === 0)) {
									MessageBox.error(that._i18n.getText("ErrFini"));
									bValidaFlag = false;
									return;
								}

								//Validacion Dias de Financiamiento  no vacio
								if ((isNaN(iDiaFina)) || (iDiaFina === null) || (iDiaFina === '') || (iDiaFina.length === 0)) {
									MessageBox.error(that._i18n.getText("ErrdiasFin"));
									bValidaFlag = false;
									return;
								}
								//Validacion de Importe a Financiar no vacio
								if (isNaN(fIntPagar) || fIntPagar < 0) {
									MessageBox.error(that._i18n.getText("Errintafina"));
									bValidaFlag = false;
									return;
								}
							}); //	Fin function { forEach(
						//Transformación de modeloJSON utilizando MAP
						var oModeloInsertarRecalenda = tabla.map(
							//Por cada línea de X quiero que hagas esto:
							function (linea) {
								var dDatestart = linea.dateStart; //"Fecha Inicio"
								var sFechaInicio = dDatestart.toISOString().substring(0, 10);
								var iDiaFina = parseInt(linea.finDays, 10); //"Dias de Financiamiento" 
								var fIntPagar = parseFloat(linea.intRecalAmt); //"Interes a Pagar"
								return {
									"finItem_ID": linea.ID,
									"dateStart": sFechaInicio,
									"finDays": iDiaFina,
									"flagReverse": false,
									"intAmt": that._NumToString(fIntPagar)
								};
							}); //	FIN function { map(
					} // FIN try
					catch (e) {
						////console.log(e);
						//MessageBox.error(that._i18n.getText("ERRRecalenda"));
						//that.close();
						return; //Salir de onButtonPress
					}
					if (bValidaFlag === false) {
						return;
					}
					// Vamos a insertar el modelo!
					//Obtenemos la tabla ligada al servicio:
					//Se tiene que enviar el modelo uno por uno 
					var oSend = {
						Input: []
					};
					oDialog.setBusy(true);
					oModeloInsertarRecalenda.forEach(function (oModeloIndividual) {
						oSend.Input.push(oModeloIndividual);
					});
					//Enviamos a función:
					var sUrl = that._getUrl()
						//Ubicacion servicio
						+ "srv_api/function/recalUnit";
					//Generar Petición
					var resPromesa = $.ajax({
						url: sUrl,
						type: "POST",
						dataType: "json",
						contentType: "application/json; charset=utf-8; IEEE754Compatible=true",
						data: JSON.stringify(oSend)
					});
					/*
					*Enviamos los cambios al servidor Modelo y Tabla
					Al confirmar ejecución actualizar la tabla.
					 */
					Promise.all([resPromesa]).then(res => {
						if ((res[0].value) === 0) {
							//mensaje de error
							//	MessageBox.error(sReason.responseText);
						} else {
							var sMensajeExitoso = that._i18n.getText("MRecalendaExitoso", [res[0].value]);
							MessageBox.success(sMensajeExitoso, {
								icon: MessageBox.Icon.SUCCESS
							});
						}

						oDialog.setBusy(false);
						that.close(true);
					}).catch(function (sReason) {
						////console.log(reason);
						MessageBox.error(sReason.responseText);
						oDialog.setBusy(false);
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
		 * @param {event} oEvent - Recibe el evento por el cual fue ejecutado.
		 * @desc  Función que notifica al usuario la anulación de la recalendarización
		 */
		_onButtonAnular: function (oEvent) {
			var that = this;
			var oTabla = this.getView().byId("tableRecal");
			var aIndex = oTabla.getSelectedIndices(); // [0,2,3..] cada indice seleccionado
			var sTxtConf = this._i18n.getText("confAnularR", [aIndex.length]);
			var oDialog = oEvent.getSource().getParent();
			var oEventDialog = oEvent;
			oDialog.setBusy(true);
			MessageBox.confirm(sTxtConf, function (oAction) {
				if (oAction === "OK") {
					//Obtener la lista de elementos  anular:
					var oListaAnular = that._onAnularSelect_lista(oEventDialog);
					//Realizar petición a Servicio:
					var iNumAnulados = that._onAnularSelect_ajax(oListaAnular);
					oDialog.setBusy(false);
					//Mostrar mensaje con # de elementos anulados:
					var sTxt = that._i18n.getText("succAnRecal", [iNumAnulados]);
					MessageBox.success(sTxt);
					//Cerrar y actualizar:
					that.close(true);
				} else {
					oDialog.setBusy(false);
				}
			});
		},

		/** 
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name _onAnularSelect_ajax
		 * @param {event} oEvent - Recibe el evento por el cual fue ejecutado.
		 * @desc  Petición al servicio, que devuelve el número de elementos anulados.
		 */
		_onAnularSelect_ajax: function (oListaAnular) {
			var res = 0;
			var sUrl = this._getUrl()
				//Ubicacion servicio
				+ "srv_api/function/revRecal";
			//Generar Petición
			$.ajax({
				url: sUrl,
				type: "POST",
				dataType: "json",
				contentType: "application/json;charset=utf-8",
				async: false,
				data: JSON.stringify(oListaAnular)
			}).then(function (data) {
				res = data.value;
			});
			return res;
		},

		/** 
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name _onAnularSelect_ajax
		 * @param {event} oEvent - Recibe el evento por el cual fue ejecutado.
		 * @desc  Obtiene lista de elementos a anular (seleccionados con checkCurrEx).
		 * @return {oValor}Devuelve un objeto para ser consumido por el servicio { "Input"		: [{ ID:"1d257542-f2cd-4c17-a96b-9bcf86542fb9"}, ...] }
		 */
		_onAnularSelect_lista: function (oEvent) {
			var oTabla = this.getView().byId("tableRecal");
			var aIndex = oTabla.getSelectedIndices(); // [0,2,3..] cada indice seleccionado
			var oModelData = this.getView().getModel("RecalendarizacionCollection").getData();
			var Data = {
				Input: []
			};
			for (var index of aIndex) {
				var oFila = oModelData[index];
				var ID = oFila.ID;
				//Obtener el ID y si la numero es mayor a 1
				if (Number(oFila.numRecal) > 1) {
					Data.Input.push({
						finItem_ID: ID
					});
				}
			}
			return Data;
		},
		/** 
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name _onButtonClose
		 * @desc cierra la ventana de Recalendarización 
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
		 * @name onChangeImporte
		 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
		 * @desc Realiza la suma de la columna Importe a Pagar.
		 */

		onChangeImporte: function (oEvent) {
			var oDataPago = this.getView().getModel("RecalendarizacionCollection").getData(); //obtiene los datos de la tabla  y los guarda en un json
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
		 * @name oCopyRecalenda
		 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
		 * @desc Copia la configuración de la primera fila al resto de las filas.
		 */
		oCopyRecalenda: function (oEvent) {
			var oModel = this.getView().getModel("RecalendarizacionCollection");
			//Universo de registros
			var aRegistros = oModel.getData(); //arreglo con registros
			//fila1 Almacena el primer renglon de la tabla
			var oFila1 = aRegistros[0];
			//A los demás registros copiar los valores del primer renglón
			for (var i = 1; i < aRegistros.length; i++) {
				//Objeto a modificar a nivel modelo: + propiedad: /1/datePay
				var sPath = "/" + i + "/";
				oModel.setProperty(sPath + "dateStart", oFila1.dateStart);
				oModel.setProperty(sPath + "finDays", oFila1.finDays);
				oModel.setProperty(sPath + "dateEnd", oFila1.dateEnd);
			}
		},
		/** 
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name calCambio
		 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
		 * @desc Calcula el Cambio de moneda
		 */
		calCambio: function (oEvent) {
			var oInput = oEvent.getSource(); // NOs da el control que llama el evento
			var oContext = oInput.getParent().getBindingContext("RecalendarizacionCollection"); //get parent obtiene la fila, getbindingcontext obtengo el contexto de la fila
			var oModel = oContext.getModel("RecalendarizacionCollection");
			var sPath = oContext.getPath(); //da posicion del modelo
			//OContet obtengo path
			//Modelo -> lee
			var fCostAmt = oModel.getProperty(sPath + "/costAmt"); //En el renglon que disparo el evento lee la columna costAmt
			var fFinancedAmt = oModel.getProperty(sPath + "/financedAmt"); //En el renglon que disparo el evento lee la columna financedAmt
			var fBalanceAmt = oModel.getProperty(sPath + "/balanceAmt"); //En el renglon que disparo el evento lee la columna balanceAmt
			var fExchangeRate = oModel.getProperty(sPath + "/exchangeRate"); //En el renglon que disparo el evento lee la columna exchangeRate

			//Modelo  -> Escribe
			//EScribe en la nueva columna  spath, (nuevo resultado))
			oModel.setProperty(sPath + "/newcostAmt", (fCostAmt * fExchangeRate));
			oModel.setProperty(sPath + "/newfinancedAmt", (fFinancedAmt * fExchangeRate));
			oModel.setProperty(sPath + "/newbalanceAmt", (fBalanceAmt * fExchangeRate));

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
		 * @name handleFechaInicio
		 * @desc Funcion de selección y validación de fecha; obtener intereses
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
				return;
			}
			var dfechaselected = oEvent.getSource();
			var oContext = dfechaselected.getParent().getBindingContext("RecalendarizacionCollection");
			var sCompanyCode = oContext.getProperty("companyCode");
			var sFinCode = oContext.getProperty("finSrv_finCode");
			//Consulta OData
			var url = this._getUrl()
				//Ubicacion servicio
				+ "srv_api/catalogs/FinSet"
				//Filtros
				+ "?$filter=" + encodeURI(
					"companyCode eq '" + sCompanyCode + "' and finCode eq '" + sFinCode + "'");
			var that = this;
			$.get({
				url: url,
				success: function (data) {
					var res = data.value.length;
					if (res === 0) {
						//Funcion error
						//that._onValidateFinSrv(sCompanyCode, sFinCode, oComboBox);

					} else {
						//Obtener Dias Financiamiento, Tipo de Tasa y Valor de Tasa
						that._onGetFinInfo(oContext, data.value);
					}
				},
				error: function (error) {
					//Funcion error
					//that._onValidateFinSrv(sCompanyCode, sFinCode, oComboBox);
				}
			});
			//Obtener importe intereses
			this.getInterests(dateselect, oContext);
		},
		/**
		 * Obtiene los intereses cuando cuambia la fecha
		 * @param {object} oDateSelect Fecha seleccionada
		 * @param {object} oContext Contexto fila
		 */
		getInterests: function (oDateSelect, oContext) {
			var oModel = oContext.getModel("RecalendarizacionCollection");
			var sPath = oContext.getPath();
			//Calcular intereses deacuerdo a la fecha
			var oDatos = [{
				"FinancedItemID": oContext.getProperty("ID"),
				"datePay": oDateSelect.toISOString().substring(0, 10),
				"payedAmt": Number(oContext.getProperty("balanceAmt")).toFixed(2),
				"intRecalAmt": Number(oContext.getProperty("intRecalAmt")).toFixed(2)
			}];
			var sUrl = this._getUrl()
				//Ubicacion servicio
				+ "srv_api/function/getInterestPay";
			var oSend = {
				"Input": oDatos
			};
			$.ajax({
				url: sUrl,
				type: "POST",
				dataType: "json",
				contentType: "application/json;IEEE754Compatible=true",
				data: JSON.stringify(oSend)
			}).then(function (data) {
				if (data.value.length !== 0) {
					oModel.setProperty(sPath + "/intRecalAmt", Number(data.value[0].intRecalAmt));
				}
			});
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
			var oModel = oContext.getModel("RecalendarizacionCollection");
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
			//Generar filtro del servicio a consultar
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
			var errorI18N1 = this._i18n.getText("trasUniErrFinSrv");
			//Obtener info FinSrvCredits y FinRates
			var aPromises = [];
			aPromises.push($.get(urlFinSrv)); //peticion a ala URL, devuelve JSON
			aPromises.push($.get(urlFinRates)); //valor de la tasa variable
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
			}).catch(function (reason) {
				MessageBox.error(
					errorI18N1, {
						id: "serviceErrorMessageBox" + (new Date().getTime()),
						details: reason,
						actions: [MessageBox.Action.CLOSE],
						onClose: function () {
							//	this._bMessageOpen = false;
						}.bind(this)
					}
				);
			});
		},

		/** 
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name onFinDays
		 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
		 * @desc Si cambian los días a financiar, actualizar fecha fin.
		 */
		onFinDays: function (oEvent) {
			var oInputDays = oEvent.getSource();
			var oContext = oInputDays.getParent().getBindingContext("RecalendarizacionCollection");
			var sPath = oContext.getPath();
			var oModel = oContext.getModel("RecalendarizacionCollection");
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
					var sTituloI18n = this._i18n.getText("Errintafina");
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