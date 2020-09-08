/*global history */
/* global moment:true */
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/MessageBox",
	"sap/ui/export/Spreadsheet",
	"vn/pp/ux_vn_pp_config/libs/moment",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, History, MessageBox, Spreadsheet, momentjs, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("vn.pp.ux_vn_pp_config.controller.BaseController", {
		/**
		 * Obtiene el router desde cualquier parte de la aplicación
		 * @public
		 * @returns {sap.ui.core.routing.Router} the router for this component
		 */
		getRouter: function () {
			return this.getOwnerComponent().getRouter();
		},

		/**
		 * Obtiene el modelo global desde cualquier parte de la aplicación
		 * @public
		 * @param {string} sName Nombre del modelo
		 * @returns {sap.ui.model.Model} Instancia del modelo
		 */
		getModel: function (sName) {
			return this.getView().getModel(sName);
		},

		/**
		 * Establece un modelo de forma global
		 * @public
		 * @param {sap.ui.model.Model} oModel Instancia de modelo
		 * @param {string} sName Nombre del modelo
		 * @returns {sap.ui.mvc.View} Instancia de la vista para encadenar
		 */
		setModel: function (oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},

		/**
		 * Obtiene el ResourceModel de i18n para el componente
		 * @public
		 * @returns {sap.ui.model.resource.ResourceModel} Instancia de ResourceModel
		 */
		getResourceBundle: function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},

		/**
		 * Manejador de evento para navegación
		 * Va a la vista inmediata anterior, si no existe va a la vista principal
		 * @public
		 */
		onNavBack: function () {
			var sPreviousHash = History.getInstance().getPreviousHash();

			if (sPreviousHash !== undefined) {
				history.go(-1);
			} else {
				this.getRouter().navTo("Start", {}, true);
			}
		},
		/**
		 * Si es un número inválido o menor a cero devuelve error.
		 * @param {string} sInput Valor en texto del número
		 * @return {boolean} True si es un número válido
		 * @public
		 */
		validateNumber: function (sInput) {
			var nInput = Number(sInput);
			return !isNaN(nInput) && nInput > 0;
		},
		/**
		 * Obtiene un texto i18n para una clave.
		 * @public
		 * @param {string} sKey Clave de texto i18n
		 * @param {Array} aExtra Datos adicionales
		 * @returns {string} El texto traducido
		 */
		getText: function (sKey, aExtra) {
			var oExtrTxt = [];
			if (aExtra !== undefined) {
				oExtrTxt = aExtra;
			}
			var oResBundle = this.getResourceBundle();
			return oResBundle.getText(sKey, oExtrTxt);
		},
		/**
		 * Obtiene el Binding del objeto principal (Tabla o Lista)
		 * @param {string} sObjectName ID de tabla o Lista a obtener binding
		 * @param {string} sObjectAggregation Agregación dependiendo del tipo de objeto (items/rows)
		 * @return {object} Binding
		 */
		getMainObjectBind: function (sObjectName, sObjectAggregation) {
			var oObject = this.getView().byId(sObjectName);
			var oBinding = oObject.getBinding(sObjectAggregation);
			return oBinding;
		},
		/**
		 * Regresa tabla al estado original
		 * @param {string} sObjectName ID de tabla o Lista a obtener binding
		 * @param {string} sObjectAggregation Agregación dependiendo del tipo de objeto (items/rows)
		 * @param {string} sGroupID GroupID del elemento a rollback
		 */
		resetTable: function (sObjectName, sObjectAggregation, sGroupID) {
			var oBinding = this.getMainObjectBind(sObjectName, sObjectAggregation);
			oBinding.resetChanges(sGroupID).then(function (x) {
				////console.log("resetTable: x", x);
			}, function (y) {
				////console.log("resetTable: y", y);
			});
		},
		/**
		 * Implementación para attachCreateCompleted()
		 * Manda mensaje de éxito al terminar de crear y regresa a la pantalla anterior.
		 * @param  {sap.ui.base.Event} oEvent Evento disparado del binding.
		 * @param  {object} oBinding Binding del objeto
		 */
		onCreatePatchCompleted: function (oEvent, oBinding) {
			var that = this;
			that.getView().setBusy(false);
			if (!oEvent.getParameter("success")) {
				MessageBox.error(that.getText("errSaveInfo"));
			} else {
				MessageBox.success(that.getText("okSaveInfo"), {
					onClose: function (oAction) {
						that.updateMainTable(that.sModelName, that.aGroupID);
						that.onNavBack();
					}
				});
			}
		},
		/**
		 * Implementación para attachCreateCompleted()
		 * Manda mensaje de éxito al terminar de crear y regresa a la pantalla anterior.
		 * Requiere que estén configuradas las variables this.sObjectName y this.sObjectAggregation
		 * Desregistra el evento CreateCompleted
		 * @param  {sap.ui.base.Event} oEvent Evento disparado del binding.
		 */
		onCreateCompleted: function (oEvent) {
			var oBinding = this.getMainObjectBind(this.sObjectName, this.sObjectAggregation);
			oBinding.detachCreateCompleted(this.onCreateCompleted, this);
			this.onCreatePatchCompleted(oEvent, oBinding);
		},
		/**
		 * Implementación para attachPatchCompleted()
		 * Manda mensaje de éxito al terminar de crear y regresa a la pantalla anterior.
		 * Requiere que estén configuradas las variables this.sObjectName y this.sObjectAggregation
		 * Desregistra el evento PatchCompleted
		 * @param  {sap.ui.base.Event} oEvent Evento disparado del binding.
		 */
		onPatchCompleted: function (oEvent) {
			var oBinding = this.getMainObjectBind(this.sObjectName, this.sObjectAggregation);
			oBinding.detachPatchCompleted(this.onPatchCompleted, this);
			this.onCreatePatchCompleted(oEvent, oBinding);
		},
		/**
		 * Actualiza una tabla a partir de un modelo y groupID
		 * @param {string} sModel  Modelo a actualizar
		 * @param {Array} aGroups  GroupsID a Actualizar
		 */
		updateMainTable: function (sModel, aGroups) {
			this.getModel(sModel).refresh();
			for (var sGroup of aGroups) {
				this.getModel(sModel).refresh(sGroup);
			}
		},
		/** 
		 * @author Jorge Bustillos
		 * @function
		 * @param {sap.ui.table.Table} oTable  Tabla a exportar
		 * @desc Exporta la tabla indicada a formato XLSX
		 */
		dataExportGenerate: function (oTable) {
			var aCols, oSettings, oSheet, aRows;
			//Generar catálogo de columnas
			aCols = this._dataExportGenCols(oTable);
			//Obtener datos
			aRows = this._dataExportGenRows(oTable, aCols);
			oSettings = {
				workbook: {
					columns: aCols
				},
				dataSource: aRows
			};
			//Generar documento Excel
			oSheet = new Spreadsheet(oSettings);
			oSheet.build()
				.then(function () {
					//MessageToast.show('Spreadsheet export has finished');
				})
				.finally(function () {
					oSheet.destroy();
				});
		},

		/** 
		 * @author Jorge Bustillos
		 * @param {sap.ui.table.Table} oTable Tabla a exportar
		 * @returns {Array} Arreglo con columnas a exportar
		 * @desc Generar columnas de forma dinámica
		 */
		_dataExportGenCols: function (oTable) {
			var oCols = oTable.getColumns(); // Columnas visibles
			var aCols = []; //Arreglo de columnas
			oCols.forEach(function (element, index) {
				aCols.push({
					label: element.getAggregation("label").getText(),
					property: element.getProperty("filterProperty")
				});
			}, this);
			return aCols;
		},
		/** 
		 * @author Jorge Bustillos
		 * @function
		 * @param {sap.ui.table.Table} oTable Tabla a exportar
		 * @param {Array} aCols Array Columnas a exportar
		 * @returns {Array} Arreglo con filas a exportar
		 * @desc Genera filas de forma dinámica
		 */
		_dataExportGenRows: function (oTable, aCols) {
			var oRows = oTable._getContexts();
			//var oCtxs = oTable.getContexts();

			var aRows = [];
			oRows.forEach(function (oRow, iRow) { //Recorrer filas
				var oObj = oRow.getObject();
				var oRow2 = [];
				aCols.forEach(function (oCol, iCol) { //Recorre columnas
					var key = oCol.property;
					oRow2[key] = oObj[key];
				}, this);
				aRows.push(oRow2);
			}, this);
			return aRows;
		},
		/** 
		 * @author Jorge Bustillos
		 * @function
		 * @desc Genera filtro a partir de un control MultiInput con valores ValueHelp
		 * @param {sap.ui.core.mvc.View} oView Objeto Vista
		 * @param {string} sID Identificador control multi input	
		 * @param {string} sOdataKey Nombre del campo en ODATA
		 * @param {boolean} bMandatory Indicador si es obligatorio o no (Cambia value state)
		 * @return {Filter|boolean} Filtro de condición para los parámetros seleccionados, falso en caso de que no se haya generado filtro
		 */
		getTableFiltersMIValueHelp: function (oView, sID, sOdataKey, bMandatory) {
			var oMiControl = oView.byId(sID);
			var oTokens = oMiControl.getTokens();
			var aFiltro = [];
			//Por cada elemento agregar filtro al arreglo de filtros
			$.each(oTokens, function (index, value) {
				var sValor = value.getText();
				var sPrimero = sValor[0];
				var sUltimo = sValor[sValor.length - 1];
				var oFiltro = null;
				var valor = "";
				switch (sPrimero) {
				case "=":
					oFiltro = new Filter(sOdataKey, FilterOperator.EQ, sValor.substring(1));
					break;
				case "*":
					valor = sValor.substring(1);
					oFiltro = new Filter(sOdataKey, FilterOperator.StartsWith, valor);
					if (sUltimo === "*") {
						valor = valor.substring(0, valor.length - 1);
						oFiltro = new Filter(sOdataKey, FilterOperator.Contains, valor);
					}
					break;
				case "<":
					valor = sValor.substring(1);
					oFiltro = new Filter(sOdataKey, FilterOperator.LT, valor);
					if (valor[0] === "=") {
						valor = valor.substring(1);
						oFiltro = new Filter(sOdataKey, FilterOperator.LE, valor);
					}
					if (sUltimo === ">") {
						oFiltro = new Filter(sOdataKey, FilterOperator.EQ, "");
					}
					break;
				case ">":
					valor = sValor.substring(1);
					oFiltro = new Filter(sOdataKey, FilterOperator.GT, valor);
					if (valor[0] === "=") {
						valor = valor.substring(1);
						oFiltro = new Filter(sOdataKey, FilterOperator.GE, valor);
					}
					break;
				default:
					valor = sValor;
					if (sUltimo === "*") {
						valor = valor.substring(0, valor.length - 1);
						oFiltro = new Filter(sOdataKey, FilterOperator.EndsWith, valor);
					}
					break;
				}
				if (oFiltro !== null) {
					aFiltro.push(oFiltro);
				}
			});
			oMiControl.setValueState("None");
			//Si no hay coincidencias regresar false y marcar error si bMandatory
			if (oTokens.length === 0) {
				if (bMandatory) {
					oMiControl.setValueState("Error");
				}
				return false;
			}
			//Crear contenedor de filtros OR (para centro):
			var oFilter = new Filter({
				filters: aFiltro,
				and: false
			});
			return oFilter;
		},
		/**
		 * Ejecuta el evento onSearch después de los milisegundos especificados.
		 * @param {integer} iTime Tiempo a esperar
		 */
		_timedOnSearch: function (iTime) {
			var that = this;
			setTimeout(function () {
				that.onSearch(null);
			}, iTime);
		},
		/**
		 * Actualiza los datos cuando encuentra un match.
		 * @param {sap.ui.base.Event} oEvent Evento de carga pantalla
		 */
		_onObjectMatched: function (oEvent) {
			this._timedOnSearch(5000);
		},
		/** 
		 * Envía la información cargada al servicio
		 * @param  {sap.ui.base.Event} oEvent Evento del botón
		 */
		onSave: function (oEvent) {
			var that = this;
			var oObject = that.getView().byId(that.sObjectName);
			var oBinding = that.getMainObjectBind(that.sObjectName, that.sObjectAggregation);
			if (oBinding.hasPendingChanges()) {
				MessageBox.confirm(that.getText("msgConfirmTxt"), {
					title: that.getText("msgConfirmTit"),
					onClose: function (oAction) {
						if (MessageBox.Action.OK !== oAction) {
							return;
						}
						that.getView().setBusy(true);
						oObject.getModel(that.sModelName).submitBatch(that.aGroupID[0]);
						oBinding.attachPatchCompleted(that.onPatchCompleted, that);
					}
				});
			} else {
				MessageBox.information(that.getText("msgConfirmNoChange"));
			}
		},
		/**
		 * Eliminar los elementos seleccionados del modelo.
		 * @param {sap.ui.base.Event} oEvent Evento del botón
		 */
		onDelRecord: function (oEvent) {
			var oTable = this.byId(this.sObjectName);
			var that = this;
			this.baseDelRecord(oTable, that);
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
						that.resetTable(that.sObjectName, that.sObjectAggregation, that.aGroupID[0]);
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
		 * Descarga la información en formato Excel
		 * @param {sap.ui.base.Event} oEvent Evento del botón
		 */
		onDataExport: function (oEvent) {
			var oTable = this.byId(this.sObjectName);
			oTable.setBusy(true);
			//Obtener todas las filas permitidas por el modelo:
			var aCtxs = oTable.getBinding(this.sObjectAggregation).getContexts();
			aCtxs.forEach(x => {
				var res = x.getObject();
				res.ok = true;
				delete res.ok;
			});
			try {
				this.dataExportGenerate(oTable);
			} catch (ex) {
				console.log(ex);
			}
			oTable.setBusy(false);
		},
		/** 
		 * Envía a la página de nuevo registro en caso de que no existan cambios pendientes.
		 * @param {sap.ui.base.Event} oEvent Evento del botón
		 */
		onNewRecord: function (oEvent) {
			var oModelConf = this.getModel("modeloConfig");
			var oModelHelp = this.getModel("HelpValues");
			if (oModelConf.hasPendingChanges()) {
				MessageBox.information(this.getText("msgPendingChanges"));
				return;
			}
			var oRouter = this.getRouter(this);
			var sNavTo = oModelHelp.getProperty("/SelectedTableList/newAction");
			oRouter.navTo(sNavTo);
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
		 *	@author Jorge Bustillos
		 * @function
		 * @desc Genera filtro a partir de un control MultiInput
		 * @param {sap.ui.core.mvc.View} oView Objeto Vista
		 * @param {string} sID Identificador control multi input	
		 * @param {string} sOdataKey Nombre del campo en ODATA
		 * @param {boolean} bMandatory Indicador si es obligatorio o no (Cambia value state)
		 * @return {Filter|boolean} Filtro de condición para los parámetros seleccionados, falso en caso de que no se haya generado filtro
		 */
		getTableFiltersMI: function (oView, sID, sOdataKey, bMandatory) {
			var oMiControl = oView.byId(sID);
			var oTokens = oMiControl.getTokens();
			var aFiltro = [];
			//Por cada elemento agregar filtro al arreglo de filtros
			$.each(oTokens, function (index, value) {
				var oFiltro = new Filter(sOdataKey, FilterOperator.EQ, value.getKey());
				aFiltro.push(oFiltro);
			});
			oMiControl.setValueState("None");
			//Si no hay coincidencias regresar false y marcar error si bMandatory
			if (oTokens.length === 0) {
				if (bMandatory) {
					oMiControl.setValueState("Error");
				}
				return false;
			}
			//Crear contenedor de filtros OR (para centro):
			var oFilter = new Filter({
				filters: aFiltro,
				and: false
			});
			return oFilter;
		},
		/** 
		 * @author Jorge Bustillos
		 * @function
		 * @desc Genera filtro a partir de un control Multi Combo Box
		 * @param {sap.ui.core.mvc.View} oView Objeto Vista
		 * @param {string} sID Identificador control multi input	
		 * @param {string} sOdataKey Nombre del campo en ODATA
		 * @param {boolean} bMandatory Indicador si es obligatorio o no (Cambia value state)
		 * @return {Filter|boolean} Filtro de condición para los parámetros seleccionados, falso en caso de que no se haya generado filtro
		 */
		getTableFiltersMCB: function (oView, sID, sOdataKey, bMandatory) {
			var oControl = oView.byId(sID);
			var oKeys = oControl.getSelectedItems();
			var aFiltro = [];
			oControl.setValueState("None");
			//Por cada elemento agregar filtro al arreglo de filtros
			$.each(oKeys, function (index, value) {
				var oFiltro = new Filter(sOdataKey, FilterOperator.EQ, value.getKey());
				aFiltro.push(oFiltro);
			});
			//Si no hay elementos regresar false
			if (oKeys.length === 0) {
				if (bMandatory) {
					oControl.setValueState("Error");
				}
				return false;
			}
			//Crear contenedor de filtros OR:
			var oFilter = new Filter({
				filters: aFiltro,
				and: false
			});
			return oFilter;
		},
		/** 
		 * @author Jorge Bustillos
		 * @function
		 * @desc Obtiene un filtro con todos los centros para una llave definida
		 * @param {string} sOdataKey Llave a utilizar en ODATA
		 * @param {string} sProperty Llave a utilizar en HelpValues
		 * @param {string} sPropertyKey Propiedad a utilizar en HelpValues
		 * @return {Filter|boolean} Filtro de condición para los parámetros seleccionados, falso en caso de que no se haya generado filtro
		 */
		getAllFilters: function (sOdataKey, sProperty, sPropertyKey) {
			var oModel = this.getModel("HelpValues");
			var aItems = oModel.getProperty(sProperty);
			var aFiltro = [];
			//Por cada elemento agregar filtro al arreglo de filtros
			aItems.forEach(item => {
				var oFiltro = new Filter(sOdataKey, FilterOperator.EQ, item[sPropertyKey]);
				aFiltro.push(oFiltro);
			});
			//Si no hay elementos regresar false
			if (aItems.length === 0) {
				return false;
			}
			//Crear contenedor de filtros OR:
			var oFilter = new Filter({
				filters: aFiltro,
				and: false
			});
			return oFilter;
		},
		/** 
		 * @author Jorge Bustillos
		 * @function
		 * @desc Genera filtro a partir de un control DateRangeSelection
		 * @param {sap.ui.core.mvc.View} oView Objeto Vista
		 * @param {string} sID Identificador control DateRangeSelection	
		 * @param {string} sOdataKey Nombre del campo en ODATA
		 * @param {boolean} bMandatory Indicador si es obligatorio o no (Cambia value state)
		 * @return {Filter|boolean} Filtro de condición para los parámetros seleccionados, falso en caso de que no se haya generado filtro
		 */
		getTableFiltersDRS: function (oView, sID, sOdataKey, bMandatory) {
			var oControl = oView.byId(sID);
			oControl.setValueState("None");
			//Si no hay elementos regresar false
			if (oControl.getDateValue() === null) {
				if (bMandatory) {
					oControl.setValueState("Error");
				}
				return false;
			}
			//Agregar fecha
			var oFiltro = new Filter(sOdataKey, FilterOperator.BT, oControl.getDateValue().toISOString().substr(0, 10),
				oControl.getSecondDateValue().toISOString().substr(0, 10));
			return oFiltro;
		},
		/** 
		 * @author Jorge Bustillos
		 * @function
		 * @desc Genera filtro a partir de un control DatePicker
		 * @param {sap.ui.core.mvc.View} oView Objeto Vista
		 * @param {string} sID Identificador control DatePicker	
		 * @param {string} sOdataKey Nombre del campo en ODATA
		 * @return {Filter|boolean} Filtro de condición para los parámetros seleccionados, falso en caso de que no se haya generado filtro
		 */
		getTableFiltersDP: function (oView, sID, sOdataKey) {
			var oControl = oView.byId(sID);
			//Si no hay elementos regresar false
			if (oControl.getDateValue() === null) {
				return false;
			}
			//Agregar fecha
			var oFiltro = new Filter(sOdataKey, FilterOperator.EQ, moment(oControl.getDateValue()).format("YYYY-MM-DD"));
			return oFiltro;
		},
		/** 
		 * @author Jorge Bustillos
		 * @function
		 * @desc Genera filtro a partir de un control Input
		 * @param {sap.ui.core.mvc.View} oView Objeto Vista
		 * @param {string} sID Identificador control Input	
		 * @param {string} sOdataKey Nombre del campo en ODATA
		 * @return {Filter|boolean} Filtro de condición para los parámetros seleccionados, falso en caso de que no se haya generado filtro
		 */
		getTableFiltersI: function (oView, sID, sOdataKey) {
			var oControl = oView.byId(sID);
			//Si no hay elementos regresar false
			if (!oControl.getValue()) {
				return false;
			}
			//Agregar fecha
			var oFiltro = new Filter(sOdataKey, FilterOperator.EQ, oControl.getValue());
			return oFiltro;
		},
		/** 
		 *	@author Jorge Bustillos
		 * @function
		 * @desc Genera filtro a partir de un control ComboBox
		 * @param {sap.ui.core.mvc.View} oView Objeto Vista
		 * @param {string}  sID Identificador control ComboBox	
		 * @param {string} sOdataKey Nombre del campo en ODATA
		 * @param {Boolean} bMandatory Indicador si es obligatorio o no (Cambia value state)
		 * @param {number} iPadStart Número de posiciones a llenar con Cero
		 * @return {Filter|boolean} Filtro de condición para los parámetros seleccionados, falso en caso de que no se haya generado filtro
		 */
		getTableFiltersCB: function (oView, sID, sOdataKey, bMandatory, iPadStart) {
			var oControl = oView.byId(sID);
			var sKey = oControl.getSelectedKey();
			oControl.setValueState("None");
			//Si no hay coincidencias regresar false y marcar error si bMandatory
			if (!sKey) {
				if (bMandatory) {
					oControl.setValueState("Error");
				}
				return false;
			}
			if (!isNaN(iPadStart)) {
				sKey = sKey.padStart(iPadStart, "0");
			}
			var oFiltro = new Filter(sOdataKey, FilterOperator.EQ, sKey);
			return oFiltro;
		},
		baseDelRecord: function (oTable, thatObj) {
			//Validar Selección:
			var aItems = oTable.getSelectedIndices();
			if (aItems.length === 0) {
				MessageBox.error(thatObj.getText("noRecords"));
				return;
			}
			//Confirmar
			MessageBox.confirm(thatObj.getText("msgDelTxt", [aItems.length]), function (oAction) {
				if (oAction !== sap.m.MessageBox.Action.OK) {
					return;
				}
				aItems.forEach(x => {
					var oCtx = oTable.getContextByIndex(x);
					oCtx.delete();
				});
				oTable.clearSelection();
				MessageBox.success(thatObj.getText("msgDelTxtOK"));
			});
		}
	});

});