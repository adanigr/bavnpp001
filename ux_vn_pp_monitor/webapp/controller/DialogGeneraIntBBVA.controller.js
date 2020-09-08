/**
 * @file Controlador generación de Intereses BBVA
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
	 * @return {class} - Retorna controller.DialogGeneraIntBBVA .
	 */
	return ManagedObject.extend("vn.pp.ux_vn_pp_monitor.controller.DialogGeneraIntBBVA", {
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
			this._oControl = sap.ui.xmlfragment(oView.getId(), "vn.pp.ux_vn_pp_monitor.view.DialogGeneraIntBBVA", this);
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
		 * @desc   Confirma la Generacion de Intereses BBVA
		 * @return {void} 
		 */
		_onButtonPress: function () {
			var that = this; //Referencia a dialogo
			var bValidaFlag = true;
			var iTotGen = 0;
			MessageBox.confirm(this._i18n.getText("confcambios"), function (oAction) {
				if (oAction === "OK") {
					//Crea JSON
					var oModel = that.getView().getModel("GeneraInteBbvaCollection");
					var tabla = oModel.getData();
					var oTable = that.getView().byId("tablagenIntBbva");
					//Validar Selección:
					var items = oTable.getSelectedIndices();
					//Modificar el modelo con las palomitas:
					for (var idx of items) {
						var oRow = oTable.getContextByIndex(idx);
						var IDSel = oRow.getProperty("ID");
						//Obtener el elemento de tabla y cambiarle la propiedad flagReverse a falso
						var oRes = tabla.find(x => x.ID === IDSel);
						if (oRes !== undefined) { //tiene res
							oRes.flagReverse = false;
							iTotGen++;
						}
					}
					try {
						//Validaciones en un foreach.
						tabla.forEach(
							//Por cada línea de X quiero que hagas esto:
							function (oRow2) {
								var importInt = parseFloat(oRow2.interestAmt); //"Importe Intereses"
								//Validacion de Importe a Financiar no vacio
								if (isNaN(importInt) || importInt <= 0 || (importInt === null) | (importInt === undefined) || (importInt === '') || (
										importInt.length === 0)) {
									MessageBox.error(that._i18n.getText("ERRGenIntBBVA"));
									bValidaFlag = false;
									return;
								}
							});
						//Transformación de modeloJSON utilizando MAP
						var oModeloInsertarIntBBVA = tabla.map(
							//Por cada línea de X quiero que hagas esto:              
							function (oRow3) {
								var finItem = oRow3.ID;
								var sapGJAHR = oRow3.sapGJAHR;
								sapGJAHR = sapGJAHR.toString();
								var intereses = oRow3.interestAmt;
								return {
									"finItem_ID": finItem,
									"sapGJAHR": sapGJAHR,
									"sapMONAT": oRow3.sapMONAT,
									"interestAmt": Number(intereses).toFixed(2),
									"flagReverse": oRow3.flagReverse, //Falso, check seleccionado / verdadero, check no seleccionado
									"flagCal": true
								};
							}); //	FIN function { map(
					} // FIN try
					catch (e) {
						console.log(ex);
						return;
					}
					if (bValidaFlag === false) {
						return;
					}
					// Vamos a insertar el modelo!
					//Obtenemos la tabla ligada al servicio:
					var oTablaFalsa = that.getView().byId("FinancedItemsIntBbva");
					//Se tiene que enviar el modelo uno por uno 
					var iContador = 0;
					oModeloInsertarIntBBVA.forEach(function (oModeloIndividual) {
						oTablaFalsa.getBinding("items").create(oModeloIndividual);
						iContador++;
						if (iContador % 5 === 0) {
							oTablaFalsa.getModel("modeloOperation").submitBatch("FinancedItemBBVA");
						}
					});
					//Enviamos los cambios al servidor Modelo y Tabla
					var resPromesa = oTablaFalsa.getModel("modeloOperation").submitBatch("FinancedItemBBVA");
					//Al confirmar ejecución actualizar la tabla.
					//Al confirmar ejecución actualizar la tabla.
					var MensajeExitoso = that._i18n.getText("MGenIntBBVAExitoso", [iTotGen]);
					Promise.all([resPromesa]).then(function (values) {
						MessageBox.success(MensajeExitoso, {
							icon: MessageBox.Icon.SUCCESS
						});
						that.close(true);
					}).catch(function (reason) {
						MessageBox.error(reason);
						that.close(true);
					});
					return;
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
		 * @name handleFechaInicio
		 * @desc Funcion de selección y validación de fecha
		 */
		handleFechaInicio: function (oEvent) {
			var oDatePicker = oEvent.getSource();
			var dToday = new Date();
			var oDateSelect = oDatePicker.getDateValue();
			if (oDateSelect > dToday) {
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
					var sTituloI18n = this._i18n.getText("ImportUniErrTit");
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