/**
 * @file Controlador Cambio de Moneda.
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
	 * @desc   Función principal de Cambio de Moneda.
	 * @return {class} - Retorna controller.DialogCambioMoneda .
	 */
	return ManagedObject.extend("vn.pp.ux_vn_pp_monitor.controller.DialogCambioMoneda", {
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
			this._oControl = sap.ui.xmlfragment(oView.getId(), "vn.pp.ux_vn_pp_monitor.view.DialogCambioMoneda", this);
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
		 * @desc Abrir dialogo, agregar dependientes y modelos Cambio de Moneda.
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
			//*******Suma de el campo Propuesta de Pago******
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
		},
		/** 
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name _onAnularSelect
		 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
		 * @desc  Anula los seleccionados que tengan la bandera checkCurrEx
		 */

		_onAnularSelect: function (oEvent) {
			var that = this;
			var oTabla = this.getView().byId("tablacambm");
			var aIndex = oTabla.getSelectedIndices(); // [0,2,3..] cada indice seleccionado
			var sTxtConf = this._i18n.getText("confAnCamMon", [aIndex.length]);
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
					var sTxt = that._i18n.getText("succAnCamMon", [iNumAnulados]);
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
		 * @param {object} oListaAnular -Recibe una lista de elementos
		 * @desc  Petición al servicio deleteCurrEx.
		 * @return {int} - iRes Devuelve el número de elementos anulados.
		 */

		_onAnularSelect_ajax: function (oListaAnular) {
			var iRes = 0;
			var sUrl = this._getUrl()
				//Ubicacion servicio
				+
				"srv_api/function/deleteCurrEx";
			var oSend = {
				Input: oListaAnular.aInput
			};
			//Generar Petición
			$.ajax({
				url: sUrl,
				type: "POST",
				dataType: "json",
				contentType: "application/json;charset=utf-8",
				async: false,
				data: JSON.stringify(oSend)
			}).then(function (data) {
				iRes = data.value;
			});
			return iRes;
		},

		/** 
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name _onAnularSelect_lista
		 * @param {event} oEvent - Recibe el evento por el cual fue ejecutado.
		 * @desc  Obtiene lista de elementos a anular (seleccionados con checkCurrEx)
		 * @return {object} - Data Devuelve un objeto para ser consumido por el servicio { "aInput"		: ["1d257542-f2cd-4c17-a96b-9bcf86542fb9", ...] }
		 */
		_onAnularSelect_lista: function (oEvent) {
			var oTabla = this.getView().byId("tablacambm");
			var aIndex = oTabla.getSelectedIndices(); // [0,2,3..] cada indice seleccionado
			var oModelData = this.getView().getModel("CambioMonedaCollection").getData();
			var Data = {
				aInput: []
			};
			for (var index of aIndex) {
				var oFila = oModelData[index];
				var ID = oFila.ID;
				//Obtener el ID y si la bandera está como true...
				if (oFila.checkCurrEx === true) {
					Data.aInput.push(ID);
				}
			}
			return Data;
		},
		/** 
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name _onButtonPress
		 * @param {event} oEvent - Recibe el evento por el cual fue ejecutado.
		 * @desc  Confirma el Cambio de Moneda.
		 * @return {void} 
		 */
		_onButtonPress: function (oEvent) {
			var that = this; //Referencia a dialogo
			var bValidaFlag = true;
			var oDialog = oEvent.getSource().getParent();
			MessageBox.confirm(this._i18n.getText("confcambios"), function (oAction) {
				if (oAction === "OK") {
					//Crea JSON
					var oModel = that.getView().getModel("CambioMonedaCollection");
					var tabla = oModel.getData();
					try {
						//Validaciones en un foreach.
						tabla.forEach(
							//Por cada línea de X quiero que hagas esto:
							function (row) {
								var checkCurrEx = row.checkCurrEx;
								var DtypeChange = row.exchangeDate; // Fecha Tipo de Cambio
								var FtypeChange = Number(row.exchangeRate); //Tipo de cambio

								//Si es para anular, ignorar....
								if (checkCurrEx === true) {
									return;
								}
								//Validacion de Fecha de Inicio no vacio
								if ((DtypeChange === undefined) || (DtypeChange === null) || (DtypeChange === '') || (DtypeChange.length === 0) || isNaN(
										DtypeChange)) {
									MessageBox.error(that._i18n.getText("ErrFechaCambMon"));
									bValidaFlag = false;
									return;
								}
								if (isNaN(FtypeChange) || FtypeChange <= 0 || (FtypeChange === null) || (FtypeChange === '') || (FtypeChange.length === 0)) {
									MessageBox.error(that._i18n.getText("ErrTypeCambMon"));
									bValidaFlag = false;
									return;
								}
							}); //	function { forEach(
						//Si hubo un error, cerrar
						if (bValidaFlag === true) {
							//Transformación de modeloJSON utilizando MAP
							var oModeloInsertarCambMoney = tabla.map(
								//Por cada línea de X quiero que hagas esto:
								function (linea) {
									//Salirse antes del map si es anulación
									var checkCurrEx = linea.checkCurrEx;
									if (checkCurrEx === true) {
										return {
											"oldFinItem_ID": linea.ID, //ID elemento seleccionado
											"flagReverse": checkCurrEx // Ira falso si va para anular
										};
									}
									var DtypeChange = linea.exchangeDate; // Fecha Tipo de Cambio
									var sFechatipoCamb = DtypeChange.toISOString().substring(0, 10);
									var sTypeChange = Number(linea.exchangeRate).toFixed(2); //Tipo de cambio
									return {
										"flagReverse": checkCurrEx,
										"oldFinItem_ID": linea.ID, //ID elemento seleccionado
										"exchangeDate": sFechatipoCamb, //Fecha de tipo de cambio
										"exchangeRate": sTypeChange, //Valor de tipo de cambio (Como string)
										"newCurrency": linea.newcurrency, //Moneda financimiento del modelo USD A MXN
										"unidadID": linea.unidadID //ID de la unidad

									};
								}); //	function { map(
						}
					} //try
					catch (exception) {
						that.close();
						return; //Salir de onButtonPress
					}

					//Vamos a insertar el modelo!
					//Obtenemos la tabla ligada al servicio:
					//Se tiene que enviar el modelo uno por uno 
					var iCreados = 0;
					var oSend = {
						Input: []
					};
					oModeloInsertarCambMoney.forEach(function (oModeloIndividual) {
						if (oModeloIndividual.flagReverse === false) { //Solo enviar los que no son anulacion
							oSend.Input.push(oModeloIndividual);
							//Objeto para función:
							iCreados++;
						}
					});
					//Si no se va a crear ninguno, salir...
					if (iCreados === 0) {
						MessageBox.information("No se va a generar ningún cambio de moneda.");
						that.close();
						return;
					}
					//Pausar UI:
					oDialog.setBusy(true);
					//Enviamos a función:
					var sUrl = that._getUrl()
						//Ubicacion servicio
						+
						"srv_api/function/newCurrEx";
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
						var sMensajeExitoso = that._i18n.getText("MCambMonedaExitoso", [res[0].value]);
						MessageBox.success(sMensajeExitoso, {
							icon: MessageBox.Icon.SUCCESS
						});
						oDialog.setBusy(false);
						that.close(true);
					}).catch(function (sReason) {
						oDialog.setBusy(false);
						MessageBox.error(sReason.responseText);
						that.close(true);
					});
					return;
				}
			});
		},
		/** 
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name onButtonPressClose
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
		 * @name _onValidateFinSrv
		 * @desc Mostrar mensaje de error y limpiar la seleccion
		 * @param {string} sCompanyCode - string CompanyCode
		 * @param {string} sFinCode - string FinCode
		 * @param {object} oComboBox - object ComboBox
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
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name onChangeImporte
		 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
		 * @desc Realiza la suma de la columna Importe a Pagar.
		 */

		onChangeImporte: function (oEvent) {
			var oDataPago = this.getView().getModel("CambioMonedaCollection").getData(); //obtiene los datos de la tabla  y los guarda en un json
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
		 * @name onSelectionChange
		 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
		 * @desc Muestra mensaje de error, en caso de que no sea posible seleccionar para anular.
		 */
		onSelectionChange: function (oEvent) {
			try {
				//Si se puede anular, solo si esta en pesos
				var oCheckCurrEx = oEvent.getParameter("rowContext").getProperty("checkCurrEx");
				if (!oCheckCurrEx) {
					oEvent.getSource().clearSelection();
					var txt = this._i18n.getText("errCamMonAnu", [oEvent.getParameter("rowContext").getProperty("serial")]);
					MessageToast.show(txt);
				}
			} catch (ex) {
				return;
			}
		},
		/** 
		 * @author Javier Balcazar Cruz 
		 * @function
		 * @name oCopycambMoneda
		 * @param {Event} oEvent - Recibe el evento por el cual fue ejecutado.
		 * @desc Copia la configuración de la primera fila al resto de las filas.
		 */
		oCopycambMoneda: function (oEvent) {
			var oModel = this.getView().getModel("CambioMonedaCollection");
			//Universo de registros
			var aRegistros = oModel.getData(); //arreglo con registros

			//fila1 Almacena el primer renglon de la tabla
			var oFila1 = aRegistros[0];
			if (oFila1.checkCurrEx === true) {
				MessageBox.error("No se puede copiar si la primera posición es para anulación.");
				return;
			}
			//A los demás registros copiar los valores del primer renglón
			for (var indice = 1; indice < aRegistros.length; indice++) {
				//Objeto a modificar a nivel modelo: + propiedad: /1/datePay
				var sPath = "/" + indice;
				oModel.setProperty(sPath + "/exchangeDate", oFila1.exchangeDate);
				oModel.setProperty(sPath + "/exchangeRate", oFila1.exchangeRate);
				//Realizar la multiplicación:
				var fCostAmt = oModel.getProperty(sPath + "/costAmt"); //En el renglon que disparo el evento lee la columna costAmt
				var fFinancedAmt = oModel.getProperty(sPath + "/financedAmt"); //En el renglon que disparo el evento lee la columna financedAmt
				var fBalanceAmt = oModel.getProperty(sPath + "/balanceAmt"); //En el renglon que disparo el evento lee la columna balanceAmt
				var fExchangeRate = oModel.getProperty(sPath + "/exchangeRate"); //En el renglon que disparo el evento lee la columna exchangeRate
				var fCheckCurrEx = oModel.getProperty(sPath + "/checkCurrEx"); //En el renglon que disparo el evento lee la columna checkCurrEx
				//No cambiar los que se van a anular
				if (fCheckCurrEx === true) {
					continue;
				}
				//Modelo  -> Escribe
				//Escribe en la nueva columna  spath, (nuevo resultado))
				oModel.setProperty(sPath + "/newcostAmt", (fCostAmt * fExchangeRate));
				oModel.setProperty(sPath + "/newfinancedAmt", (fFinancedAmt * fExchangeRate));
				oModel.setProperty(sPath + "/newbalanceAmt", (fBalanceAmt * fExchangeRate));
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
			var oContext = oInput.getParent().getBindingContext("CambioMonedaCollection"); //get parent obtiene la fila, getbindingcontext obtengo el contexto de la fila
			var oModel = oContext.getModel("CambioMonedaCollection");
			var sPath = oContext.getPath(); //da posicion del modelo
			//OContet obtengo path
			//Modelo -> lee
			var fCostAmt = oModel.getProperty(sPath + "/costAmt"); //En el renglon que disparo el evento lee la columna costAmt
			var fFinancedAmt = oModel.getProperty(sPath + "/financedAmt"); //En el renglon que disparo el evento lee la columna financedAmt
			var fBalanceAmt = oModel.getProperty(sPath + "/balanceAmt"); //En el renglon que disparo el evento lee la columna balanceAmt
			var fExchangeRate = oModel.getProperty(sPath + "/exchangeRate"); //En el renglon que disparo el evento lee la columna exchangeRate
			//Modelo  -> Escribe
			//Escribe en la nueva columna  spath, (nuevo resultado))
			oModel.setProperty(sPath + "/newcostAmt", (fCostAmt * fExchangeRate));
			oModel.setProperty(sPath + "/newfinancedAmt", (fFinancedAmt * fExchangeRate));
			oModel.setProperty(sPath + "/newbalanceAmt", (fBalanceAmt * fExchangeRate));
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
					var sTituloI18n = this._i18n.getText("ErrCambMonedaTit");
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