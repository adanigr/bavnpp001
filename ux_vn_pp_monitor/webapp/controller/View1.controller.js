	/**
	 * @file Controlador para View1
	 * @author Jorge Bustillos <jbustillos@zapata.com.mx>
	 * Notación JSDoc para Funciones, Parametros, Objetos, etc.
	 * @param {param type} param name - description.
	 */
	sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/ui/model/json/JSONModel",
		"sap/ui/core/Fragment",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator",
		"sap/ui/model/type/String",
		"sap/ui/export/Spreadsheet",
		"sap/m/Token",
		"sap/m/MessageToast",
		"sap/m/MessageBox",
		"vn/pp/ux_vn_pp_monitor/model/formatter",
		"./DialogActFijo.controller",
		"./DialogPropPag.controller",
		"./DialogConfPag.controller",
		"./DialogTrasUnidad.controller",
		"./DialogAnularPago.controller",
		"./DialogPagoMasiComp.controller",
		"./DialogCambioMoneda.controller",
		"./DialogAyuda.controller",
		"./DialogRecalendarizacion.controller",
		"./DialogSegundaFinanciera.controller",
		"./DialogGeneraIntBBVA.controller",
		"./DialogViewDoc.controller",
		"./DialogViewLayouts.controller",
		"./DialogTablaIntereses.controller"
	], function (Controller, JSONModel, Fragment, Filter, FilterOperator, typeString, Spreadsheet, Token, MessageToast, MessageBox,
		formatter, DialogActFijo, DialogPropPag, DialogConfPag, DialogTrasUnidad, DialogAnularPago, DialogPagoMasiComp, DialogCambioMoneda,
		DialogAyuda, DialogRecalendarizacion, DialogSegundaFinanciera, DialogGeneraIntBBVA, DialogViewDoc, DialogViewLayouts,
		DialogTablaIntereses) {
		"use strict";
		/**
		 *  Functión Principal
		 * @author Jorge Bustillos
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
		return Controller.extend("vn.pp.ux_vn_pp_monitor.controller.View1", {
			formatter: formatter,
			//-------------------------------------------------------------------
			//	Eventos estándar UI5:
			//-------------------------------------------------------------------

			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name onInit
			 * @desc Define objeto global privado _oMIChasis (Multi-Input Chasis)
			 * Utilizado para mostrar HelpValue más adelante.
			 * Define objeto global privado _i18n (Internationalization)
			 * Utilizado para obtener textos del modelo i18n
			 */
			onInit: function () {
				this._oMIChasis = this.getView().byId("miChasis");
				this._i18n = this.getView().getModel("i18n").getResourceBundle();
			},
			//-------------------------------------------------------------------
			//	Funcionalidad para botones:
			//-------------------------------------------------------------------

			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name onDataExport
			 * @param {object} oEvent Evento botón
			 * @desc Exporta la tabla tableMainPP a formato XLSX
			 */
			onDataExport: function (oEvent) {
				var oTable = this.byId('tableMainPP');
				this._dataExportGenerate(oTable);
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name _dataExportGenerate
			 * @param oTable sap.ui.table.Table Tabla a exportar
			 * @desc Exporta la tabla indicada a formato XLSX
			 */
			_dataExportGenerate: function (oTable) {
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
			 * @function
			 * @name _dataExportGenCols
			 * @param oTable sap.ui.table.Table Tabla a exportar
			 * @returns Array Arreglo con columnas a exportar
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
			 * @name _dataExportGenRows
			 * @param oTable sap.ui.table.Table Tabla a exportar
			 * @param aCols Array Columnas a exportar
			 * @returns Array Arreglo con filas a exportar
			 * @desc Genera filas de forma dinámica
			 */
			_dataExportGenRows: function (oTable, aCols) {
				var oRows = oTable._getContexts();
				//var oCtxs = oTable.getContexts();

				var aRows = [];
				oRows.forEach(function (oRow, iRow) { //Recorrer filas
					var oObj = oRow.getObject();
					oRow = [];
					aCols.forEach(function (oCol, iCol) { //Recorre columnas
						var key = oCol.property;
						oRow[key] = oObj[key];
					}, this);
					aRows.push(oRow);
				}, this);
				return aRows;
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name onActivoFijo
			 * @param {event} oEvent Evento botón
			 * @desc Funcionalidad para mostrar diálogo de Activo Fijo,
			 *  NO debe seleccionarse elementos.
			 */
			onActivoFijo: function (oEvent) {
				var sDialogName = "DialogActFijo";
				this.mDialogs = this.mDialogs || {};
				//Obtener Anulaciones
				var oTablaJsonDelete = this._onActFijoCollectionDelete(oEvent);
				if (oTablaJsonDelete === true) {
					return;
				}
				//Obtener modelo para enviar
				var oTablaJson = this._onActFijoCollection(oEvent);
				if (oTablaJson === false) {
					return;
				}

				var oDialog = this.mDialogs[sDialogName];
				//Crear dialogo si no existe
				if (!oDialog) {
					oDialog = new DialogActFijo(this.getView());
					this.mDialogs[sDialogName] = oDialog;
					oDialog.setRouter(this.oRouter);
				}

				//Asignar modelo tipo JSON
				var oView = this.getView();
				var oJSON = new JSONModel();
				oView.setModel(oJSON, "ActFijoCollection");
				oJSON.setData(oTablaJson);
				var context = oEvent.getSource().getBindingContext();
				oDialog._oControl.setBindingContext(context);
				//Mostrar dialogo
				oDialog.open();
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name _onActFijoCollectionDelete
			 * @param {event} oEvent Evento botón
			 * @desc Funcionalidad borrar colecion de Activo Fijo,
			 *  NO debe seleccionarse elementos.
			 */
			_onActFijoCollectionDelete: function (oEvent) {
				var oTable = this.byId("tableMainPP");
				//Validar Selección:
				var items = oTable.getSelectedIndices();
				if (items.length === 0) {
					return false;
				}
				var oSend = {
					User: "BAVNPP001",
					CallingApp: "BAVNPP001",
					IDVehi: []
				};
				//Anular activos fijos
				for (var indice = 0; indice < items.length; indice++) {
					var item = items[indice];
					var oRow = oTable.getContextByIndex(item).getObject(); //actualizado
					if (oRow.status_status !== "FIN") {
						continue;
					}
					if (Number(oRow.payedAmt) !== 0) {
						continue;
					}
					if (oRow.fundSubType_ID !== "UN_VD") {
						continue;
					}
					oSend.IDVehi.push(oRow.unidadID);
				}
				//Confirmación y envío:
				this._onActFijoCollectionDeleteConfirm(oSend);
				return oSend.IDVehi.length !== 0;
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name _onActFijoCollectionDeleteConfirm
			 * @param {object} oSend
			 * @desc 
			 */
			_onActFijoCollectionDeleteConfirm: function (oSend) {
				var that = this;
				if (oSend.IDVehi.length === 0) {
					return;
				}
				MessageBox.confirm(this._i18n.getText("confActFijDel", [oSend.IDVehi.length]), function (oAction) {
					if (oAction === "OK") {
						that._onActFijoCollectionDeletePOST(oSend);
					}
				});
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name _onActFijoCollectionDeletePOST
			 * @param {object} oSend
			 * @desc se recibe la coleccion y se envia al servicio reverseItem
			 */
			_onActFijoCollectionDeletePOST: function (oSend) {
				var that = this;
				//Marcar como ocupado por 5 segundos en lo que termina el servicio:
				var oController = this.getView("View1").getController();
				oController.getView().setBusy(true); // Load 3 puntos True 
				var sUrl = this._getUrl()
					//Ubicacion servicio
					+ "srv_api/function/reverseItem";
				$.ajax({
					url: sUrl,
					type: "POST",
					dataType: "json",
					contentType: "application/json; charset=utf-8",
					data: JSON.stringify(oSend)
				}).then(function (data) {
					var sRes = "";
					data.value.forEach(x => {
						sRes = sRes + x.Message + "\n";
					});
					var txt = that._i18n.getText(sRes);
					//Mostrar mensaje OK:
					MessageBox.information(txt);
					//Actualizar modelo:
					oController.getView().setBusy(false); //Quita los 3 puntos de Load (false)
					oController.onSearch(null);
				});
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name _onActFijoCollection
			 * @param {object} oEvent Evento botón
			 * @desc se crea la coleccion para Activo fijo
			 */
			_onActFijoCollection: function (oEvent) {
				var oTable = this.byId("tableMainPP");
				//Validar Selección:
				var items = oTable.getSelectedIndices();
				if (items.length !== 0) {
					MessageBox.error(this._i18n.getText("actFijInc"));
					return false;
				}
				var oActFijo = [];
				//Generar Tabla de Activo Fijo
				for (var i = 0; i < 1; i++) {
					//Construir fila:
					var oNewRow = {
						companyCode: "", //Sociedad
						center: "", //Centro
						segment: "", //Segmento
						serial: "", //VIN
						finCode: "", //Financiera
						dateStart: "", //Fecha de Inicio de Financiamiento
						plateNum: "", //Placa
						costAmt: "", //Importe de Unidad
						financedAmt: "", //Importe a Financiar
						bandCode: "", //Marca 
						modelCode: "", //Modelo
						gamaCode: "", //Gama
						extColorCode: "", //Color Exterior
						intColorCode: "", //Color Interior
						unidadID: "", //ID de la unidad 
						unitLocation: "" //Ubicación unidad
					};
					oActFijo.push(oNewRow);
				}
				return oActFijo;
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name onSalidaUnidad
			 * @param {object} oEvent Evento botón
			 * @desc Salida de Unidad: Funcionalidad para la Salida de
			 *  Unidades.
			 */
			onSalidaUnidad: function (oEvent) {
				//Los elementos en estatus PAG preguntar si se van a eliminar JCBG
				var oTablaSalida = this._onSelectObjectSalidaUni(oEvent);
				if (oTablaSalida.length !== 0) {
					this._onSalidaUni(oEvent, oTablaSalida);
					return;
				} else {
					var sTitulo = this._i18n.getText("tablaBtnSal");
					var sMensaje = this._i18n.getText("errEstatSal");
					//Preguntar si quiere borra X propuestas de pago
					MessageBox.error(sMensaje, {
						title: sTitulo // default
					});

				}
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name _onSelectObjectSalidaUni
			 * @param {object} oEvent Evento botón
			 * @desc Generar Tabla de Salida de Unidad
			 *  Unidades.
			 */
			_onSelectObjectSalidaUni: function (oEvent) {
				var oTable = this.byId("tableMainPP");
				var aSalidaPag = [];
				//Validar Selección:
				var items = oTable.getSelectedIndices();
				if (items.length === 0) {
					MessageBox.error("Seleccione uno o más elementos");
					return aSalidaPag;
				}
				//Generar Tabla de Salida de Unidad:
				for (var indice = 0; indice < items.length; indice++) {
					var item = items[indice];
					var oRow = oTable.getContextByIndex(item).getObject(); //actualizado

					if (oRow.status_status !== "PAG") {
						continue;
					}
					//Construir fila:
					var oNewRow = {
						"ID": oRow.ID
					};
					aSalidaPag.push(oNewRow);
				}
				return aSalidaPag;
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name _onSalidaUni
			 * @param {object} oEvent Evento botón
			 * @desc Realiza peticiones de salida de Unidad
			 */
			_onSalidaUni: function (oEvent, oTablaSalida) {
				var sTitulo = this._i18n.getText("tablaBtnSal", [oTablaSalida.length]);
				var sMensaje = this._i18n.getText("confSalidaUni", [oTablaSalida.length]);
				var that = this;
				//Preguntar si quiere borra X propuestas de pago
				MessageBox.confirm(sMensaje, {
					title: sTitulo, // default
					onClose: function (oAction) {
						if (oAction === MessageBox.Action.OK) {
							//Eliminar seleccionados
							that._onSalidaUni_DoExit(oTablaSalida);
						}
					}
				});
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name _onSalidaUni_DoExit
			 * @param {object} oTablaSalida 
			 * @desc Realiza la peticion al servicio doUnitExit
			 */
			_onSalidaUni_DoExit: function (oTablaSalida) {
				var that = this;
				//Marcar como ocupado por 5 segundos en lo que termina el servicio:
				var oController = this.getView("View1").getController();
				oController.getView().setBusy(true); // Load 3 puntos True 
				var sUrl = this._getUrl()
					//Ubicacion servicio
					+ "srv_api/function/doUnitExit";
				//Generar Petición
				var aUUID = oTablaSalida.map(function (id) {
					return id.ID;
				});
				var oSend = {
					Input: aUUID
				};
				$.ajax({
					url: sUrl,
					type: "POST",
					dataType: "json",
					contentType: "application/json; charset=utf-8",
					data: JSON.stringify(oSend)
				}).then(function (data) {
					var txt = that._i18n.getText("confUnitExit", [data.value]);
					//Mostrar mensaje OK:
					MessageBox.success(txt);
					//Actualizar modelo:
					oController.getView().setBusy(false); //Quita los 3 puntos de Load (false)
					oController.onSearch(null);
				});
			},

			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name onTrasUnidad
			 * @param oEvent Contexto del evento disparado, se espera tipo botón.
			 * @desc Funcionalidad para mostrar diálogo de Traspaso de Unidad,
			 * el elemento a financiar se debe encontrar en estatus FIN 
			 * y debe seleccionarse solo un elemento.
			 * @returns Dialogo de tipo DialogTrasUnidad
			 */
			onTrasUnidad: function (oEvent) {
				var sDialogName = "DialogTrasUnidad";
				this.mDialogs = this.mDialogs || {};
				this.getView().setBusy(true);
				this.getView().setBusyIndicatorDelay(0);
				var that = this;
				//Obtener modelo para enviar
				var p1 = new Promise(
					function (resolve, reject) {
						var oTablaJSON = that._onTrasUniCollection(oEvent, that);
						resolve(oTablaJSON);
					}
				);
				p1.then((oTablaJson) => {
					if (oTablaJson === false) {
						that.getView().setBusy(false);
						return;
					}
					var oTablaJSONBcoP = that._onTrasUniCollectionBcoP(oEvent, oTablaJson);
					var oTablaJSONBcoO = that._onTrasUniCollectionBcoO(oEvent, oTablaJson);
					var oDialog = that.mDialogs[sDialogName];
					//Crear dialogo si no existe
					if (!oDialog) {
						oDialog = new DialogTrasUnidad(that.getView());
						that.mDialogs[sDialogName] = oDialog;
						oDialog.setRouter(that.oRouter);
					}
					//Asignar modelo tipo JSON
					var oView = that.getView();
					var oJSON = new JSONModel();
					oView.setModel(oJSON, "TrasUnidadCollection");
					oJSON.setData(oTablaJson);
					var oJSONBcoProv = new JSONModel();
					oJSONBcoProv.setData(oTablaJSONBcoP);
					oView.setModel(oJSONBcoProv, "BancoProveedorSet");
					var oJSONBcoProp = new JSONModel();
					oJSONBcoProp.setData(oTablaJSONBcoO);
					oView.setModel(oJSONBcoProp, "BancoPropioSet");
					//var context = oEvent.getSource().getBindingContext();
					//oDialog._oControl.setBindingContext(context);
					//Mostrar dialogo
					oDialog.open();
					that.getView().setBusy(false);
				});
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name _onTrasUniCollection
			 * @param {event} oEvent Evento botón
			 * @desc Coleccion de la vista Traspaso de Unidad
			 * @returns res
			 */
			_onTrasUniCollection: function (oEvent, that) {
				var oTable = that.byId("tableMainPP");
				//Validar Selección:
				var items = oTable.getSelectedIndices();
				if (items.length === 0) {
					MessageBox.error("Seleccione uno o más elementos");
					return false;
				}
				var oTrasUniTable = [];
				//Generar unir unidades a traspasar con las no seleccionadas:
				var aObjetos = [];
				//Unir elementos faltantes
				for (var i = 0; i < items.length; i++) {
					var item = items[i];
					var oRow = oTable.getContextByIndex(item).getObject(); //actualizado
					aObjetos.push(oRow);
				}
				aObjetos = that._getMissingItems(aObjetos, that);
				//Generar Tabla de traspaso de Unidad:
				for (var oRow2 of aObjetos) {
					if (oRow2.status_status !== "FIN") {
						var sTxtMsg = that._i18n.getText("errTrasUniSt", [oRow2.serial, oRow2.fundSubType_ID, oRow2.secuence]);
						MessageToast.show(sTxtMsg);
						return false;
					}
					//Construir fila:

					var oNewRow = {
						"ID": oRow2.ID, //id
						"unidadID": oRow2.unidadID, //Unidad ID
						"companyCode": oRow2.companyCode, //Sociedad
						"center": oRow2.center, //Centro
						"serial": oRow2.serial, //VIN
						"fundSubType_ID": oRow2.fundSubType_ID, //Tipo de Finaciamiento
						"segment": oRow2.segment, //Segmento
						"secuence": oRow2.secuence, //Posicion 
						"currency": oRow2.currency, //Moneda Financiamiento
						"finSrv_finCode": oRow2.finSrv_finCode, //Financiera Actual
						"accExpense": "", // Cuenta de egreso (Expense Account)
						"financedAmt": oRow2.balanceAmt, //Importe a financiar
						"dateStart": null, //fecha de inicio de financiamiento
						"newFinSrv_finCode": "", //Código de nueva financiera (New Financial Code)
						"accIncome": "", //Cuenta de Ingreso/InCome Account
						"finDays": "", //Dias de Financiamiento
						"dateEnd": "", //Fecha Fin
						"rateType": "", //Tipo de Tasa
						"rateValue": "", //Valor de Tasa
						"plateNum": oRow2.plateNum, //Numero de placa
						"balanceAmt": oRow2.balanceAmt, //Balance Saldo a financiar
						"interestAmt": 0,
						"flagTR_L_CtaOrg": "",
						"flagTR_L_CtaDest": "",
						"flagTR_L_BBVA_I": false,
						"flagTR_L_BBVA_E": false,
						"flagTR_L_BMX_I": false,
						"flagTR_L_BMX_E": false,
						"sapLifnr": 0,
						"sapLifnr_old": oRow2.sapLifnr,
						"layoutName": "",
						"accLayoutO": "", // Layout cuenta origen
						"accLayoutD": "" // Layout cuenta destino
					};
					oTrasUniTable.push(oNewRow);
				}
				return oTrasUniTable;
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name _onTrasUniCollectionBcoP
			 * @param {event} oEvent Evento botón
			 * @param {json} oTablaJson 
			 * @desc Busca el proveedor de banco en el servicio Bancos_ProveedorSet
			 * @returns res
			 */
			_onTrasUniCollectionBcoP: function (oEvent, oTablaJson) {
				var aPartner = [];
				var sPartnerFilter = "";
				var res = [];
				oTablaJson.forEach(x => {
					if (aPartner.indexOf(x.sapLifnr_old) === -1) {
						aPartner.push(x.sapLifnr_old);
						if (aPartner.length !== 1) {
							sPartnerFilter = sPartnerFilter + " or ";
						}
						sPartnerFilter = "Partner eq '" + x.sapLifnr_old.padStart(10, "0") + "'";
					}
				});
				//Banco Proveedor:
				var sUrl = this._getUrl() + "s4_dev/sap/opu/odata/sap/Z_OD_SCP_BAVNPP001_SRV/Bancos_ProveedorSet"
					//Filtros:
					+ "?$filter=" + encodeURI(sPartnerFilter);
				$.ajax({
					url: sUrl,
					type: "GET",
					dataType: "json",
					async: false,
					contentType: "application/json;IEEE754Compatible=true"
				}).then(function (data) {
					res = data.d.results;
					res.forEach(x => {
						delete x.__metadata;
					});
				}).fail(function (jqXHR, textStatus, errorThrown) {
					////console.log(jqXHR, textStatus, errorThrown);
					res = [];
				});
				return res;
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name _onTrasUniCollectionBcoO
			 * @param {event} oEvent Evento botón
			 * @param {json} oTablaJson 
			 * @desc 
			 * @returns res
			 */
			_onTrasUniCollectionBcoO: function (oEvent, oTablaJson) {
				var aCompany = [];
				var sCompanyFilter = "";
				var res = [];
				oTablaJson.forEach(x => {
					if (aCompany.indexOf(x.sapLifnr_old) === -1) {
						aCompany.push(x.sapLifnr_old);
						if (aCompany.length !== 1) {
							sCompanyFilter = sCompanyFilter + " or ";
						}
						sCompanyFilter = "Bukrs eq '" + x.companyCode + "'";
					}
				});
				//Banco Proveedor:
				var sUrl = this._getUrl() + "s4_dev/sap/opu/odata/sap/Z_OD_SCP_BAVNPP001_SRV/Bancos_PropiosSet"
					//Filtros:
					+ "?$filter=" + encodeURI(sCompanyFilter);
				$.ajax({
					url: sUrl,
					type: "GET",
					dataType: "json",
					async: false,
					contentType: "application/json;IEEE754Compatible=true"
				}).then(function (data) {
					res = data.d.results;
					res.forEach(x => {
						delete x.__metadata;
					});
				}).fail(function (jqXHR, textStatus, errorThrown) {
					//	//console.log(jqXHR, textStatus, errorThrown);
					res = [];
				});
				return res;
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name segFinanciera
			 * @param oEvent Contexto del evento disparado, se espera tipo botón.
			 * @returns Dialogo de tipo DialogTrasUnidad
			 * @desc Funcionalidad para mostrar diálogo de Segunda Financiera,
			 *  el elemento a financiar se debe encontrar en estatus FIN 
			 *  y debe seleccionarse solo un elemento.
			 */
			segFinanciera: function (oEvent) {
				var sDialogName = "DialogSegundaFinanciera";
				this.mDialogs = this.mDialogs || {};
				this.getView().setBusy(true);
				this.getView().setBusyIndicatorDelay(0);
				var that = this;
				//Obtener modelo para enviar
				var p1 = new Promise(
					function (resolve, reject) {
						var oTablaJSON = that._onsegFinancieraCollection(oEvent, that);
						resolve(oTablaJSON);
					}
				);
				p1.then((oTablaJson) => {
					if (oTablaJson === false) {
						that.getView().setBusy(false);
						return;
					}
					var oDialog = that.mDialogs[sDialogName];
					//Crear dialogo si no existe
					if (!oDialog) {
						oDialog = new DialogSegundaFinanciera(that.getView());
						that.mDialogs[sDialogName] = oDialog;
						oDialog.setRouter(that.oRouter);
					}

					//Asignar modelo tipo JSON
					var oView = that.getView();
					var oJSON = new JSONModel();
					oView.setModel(oJSON, "2dafinanCollection");
					oJSON.setData(oTablaJson);
					//Mostrar dialogo
					oDialog.open();
					that.getView().setBusy(false);
				});
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name _onsegFinancieraCollection
			 * @param oEvent Contexto del evento disparado, se espera tipo botón.
			 * @return {object} oSefFinTable 
			 * @des coleccion de elementos de Segunda financiera
			 */
			_onsegFinancieraCollection: function (oEvent, that) {
				var oTable = that.byId("tableMainPP");
				//Validar Selección:
				var items = oTable.getSelectedIndices();
				if (items.length === 0) {
					MessageBox.error("Seleccione uno o más elementos");
					return false;
				}
				var oSefFinTable = [];
				var aObjetos = [];
				//Unir elementos faltantes
				for (var i = 0; i < items.length; i++) {
					var item = items[i];
					var oRow2 = oTable.getContextByIndex(item).getObject(); //actualizado
					aObjetos.push(oRow2);
				}
				aObjetos = that._getMissingItems(aObjetos, that);
				//Generar Tabla de segunda financiera:
				for (var oRow of aObjetos) {
					//Construir fila:
					var oNewRow = {
						"ID": oRow.ID, // ID,
						"reverseFlag": false,
						"companyCode": oRow.companyCode, //Sociedad
						"center": oRow.center, //Centro
						"serial": oRow.serial, //VIN
						"fundSubType_ID": oRow.fundSubType_ID, //Tipo de Finaciamiento
						"segment": oRow.segment, //Segmento
						"secuence": oRow.secuence, //Posicion 
						"finSrv_finCode": oRow.finSrv_finCode, //Financiera Actual
						"currency": oRow.currency, //Moneda Financiamiento
						"costAmt": oRow.costAmt, //Importe Unidad
						"financedAmt": oRow.costAmt, //Importe Financiado
						"balanceAmt": oRow.balanceAmt, //Saldo Financiamiento
						"dateStart": "", //fecha de inicio de financiamiento
						"finDays": "", //Dias de Financiamiento
						"dateEnd": "", //Fecha Fin
						"rateType": "", //Tipo de Tasa
						"rateValue": "", //Valor de Tasa
						"plateNum": oRow.plateNum, //Numero de placa
						"unidadID": oRow.unidadID
					};
					//Calcular reverseFlag
					oNewRow.reverseFlag = that._onsegFinancieraCollection_reverseFlag(oNewRow.ID);
					//Solo unidades pagadas o anulables
					if (oRow.status_status !== "PAG" && oNewRow.reverseFlag === false) {
						var sTxtMsg = that._i18n.getText("err2daFinaSt", [oRow.serial, oRow.fundSubType_ID, oRow.secuence]);
						MessageToast.show(sTxtMsg);
						return false;
					}
					oSefFinTable.push(oNewRow);
				}
				return oSefFinTable;
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name _onsegFinancieraCollection_reverseFlag
			 * @param {string} IdFinItem
			 * @return {object} oSefFinTable 
			 * @des bandera de la coleccion en segunda financiera
			 */
			_onsegFinancieraCollection_reverseFlag: function (IdFinItem) {
				var res = false;
				var sUrl = this._getUrl()
					//Ubicacion servicio
					+ "srv_api/function/checkRevSecFin";
				//Generar Petición
				var oSend = {
					IdFinItem: IdFinItem
				};
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
				return res;
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name genInteBbva
			 * @param {object} oEvent Evento botón
			 * @des Funcionalidad para mostrar diálogo de Generación Intereses BBVA,
			 *  el elemento a financiar se debe encontrar en estatus FIN 
			 *  y debe seleccionarse solo un elemento.
			 */
			genInteBbva: function (oEvent) {
				var sDialogName = "DialogGeneraIntBBVA";
				this.mDialogs = this.mDialogs || {};
				//Obtener modelo para enviar
				var oTablaJson = this._onGenIntBbvaCollection(oEvent);
				if (oTablaJson === false) {
					return;
				}

				var oDialog = this.mDialogs[sDialogName];
				//Crear dialogo si no existe
				if (!oDialog) {
					oDialog = new DialogGeneraIntBBVA(this.getView());
					this.mDialogs[sDialogName] = oDialog;
					oDialog.setRouter(this.oRouter);
				}

				//Asignar modelo tipo JSON
				var oView = this.getView();
				var oJSON = new JSONModel();
				oView.setModel(oJSON, "GeneraInteBbvaCollection");
				oJSON.setData(oTablaJson);

				var aElementSelect = [];
				var aElementSelectGen = [];
				for (var variable in oTablaJson) {
					if (oTablaJson[variable].flagReverse === false) {
						if (oTablaJson[variable].flagGen === true) {
							//Pólizas generadas
							aElementSelectGen.push(oTablaJson[variable].serial);
						} else {
							//Pólizas a generar
							aElementSelect.push(oTablaJson[variable].serial);
						}
					}
				}
				////console.log(aElementSelect);

				var context = oEvent.getSource().getBindingContext();
				oDialog._oControl.setBindingContext(context);
				//Mostrar dialogo
				oDialog.open();
				var txtTit = this._i18n.getText("confElementIntTit", [aElementSelect.length]);
				var txt = this._i18n.getText("confElementInt");
				var txtTitGen = this._i18n.getText("confElementIntTit", [aElementSelect.length]);
				var txtGen = this._i18n.getText("confElementInt");
				if (aElementSelect.length !== 0) {
					//Muestra los elementos que cuentan con la Generacion de Pago
					MessageBox.information(txt + " \n" + aElementSelect.join("/n"), {
						title: txtTit // default
					});
				}
				if (aElementSelectGen.length !== 0) {
					//Muestra los elementos que cuentan con la Generacion de Pago
					MessageBox.information(txtGen + " \n" + aElementSelectGen.join("/n"), {
						title: txtTitGen // default
					});
				}
				var oTableDialog = this.getView().byId("tablagenIntBbva");
				//Marcar opciones previamente activas
				//Desmarcar los elementos:
				oTableDialog.clearSelection();
				//Por cada elemento que esté con flagReverse === false, se activará el check
				for (var oFilaSelect of(oTablaJson.filter(x => x.flagReverse === false))) {
					var index = oTablaJson.indexOf(oFilaSelect);
					oTableDialog.addSelectionInterval(index, index);
				}

			},

			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name _onObtenerIntBbva
			 * @param {string} datos
			 * @des Obtener el importe de interes en el servicio getInterestPay
			 * @return datosDevueltos
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
			 * @author Jorge Bustillos
			 * @function
			 * @name _onGenIntBbvaCollection
			 * @param {object} oEvent Evento botón
			 * @des crea la coleccion de datos para intereses BBVA
			 * @return oGenBBVATable
			 */
			_onGenIntBbvaCollection: function (oEvent) {
				var oTable = this.byId("tableMainPP");
				//Validar Selección:
				var items = oTable.getSelectedIndices();
				if (items.length === 0) {
					MessageBox.error("Seleccione uno o más elementos");
					return false;
				}
				var oGenBBVATable = [];
				//Generar Tabla de traspaso de Unidad:
				for (var i = 0; i < items.length; i++) {
					var item = items[i];
					var oRow = oTable.getContextByIndex(item).getObject(); //actualizado

					if (oRow.status_status !== "FIN") {
						var sTxtMsg = this._i18n.getText("errGenIntBbvaSt", [oRow.serial, oRow.fundSubType_ID, oRow.secuence]);
						MessageToast.show(sTxtMsg);
						return false;
					}
					if (oRow.finSrv_finCode !== "BBVA") {
						var sTxtMsg1 = this._i18n.getText("errIntBbva", [oRow.serial, oRow.fundSubType_ID, oRow.secuence]);
						MessageToast.show(sTxtMsg1);
						return false;
					}

					var fecha = new Date();
					var mesActual = new Date().toISOString().substring(5, 7);
					var ultimodia = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0);
					var day = ultimodia.getDate();
					var month = ultimodia.getMonth() + 1;
					var year = ultimodia.getFullYear();

					var fechafinal = day + '/' + month + '/' + year;
					//Ver si debe estar seleccionado o no:
					var dInterestsAmt = Number(Number(oRow.intMonthSum).toFixed(2));
					var oRes = this._onGenIntBbvaCollection_getSelected(oRow.ID, year, mesActual, dInterestsAmt);
					//Obtener importe de interes

					//Construir fila:
					var oNewRow = {
						"ID": oRow.ID,
						"companyCode": oRow.companyCode, //Sociedad
						"center": oRow.center, //Centro
						"serial": oRow.serial, //VIN
						"fundSubType_ID": oRow.fundSubType_ID, //Tipo de Finaciamiento
						"segment": oRow.segment, //Segmento
						"secuence": oRow.secuence, //Posicion 
						"finSrv_finCode": oRow.finSrv_finCode, //Financiera Actual
						"currency": oRow.currency, //Moneda Financiamiento
						"sapGJAHR": year, // Ejercicio
						"sapMONAT": mesActual, //Periodo Contable -> Mes Actual
						"intMonthDay": oRow.intMonthDay, // Numero días Intereses
						"interestDate": fechafinal,
						"flagReverse": oRes.flagReverse,
						"flagGen": oRes.flagGen,
						"interestAmt": oRes.interestAmt,
						"fechaServicio": ultimodia.toISOString().substring(0, 10),
						"cantidadServicio": oRow.balanceAmt
					};

					oGenBBVATable.push(oNewRow);
				}

				return oGenBBVATable;
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name _onGenIntBbvaCollection_getSelected
			 * @param {object} ID 
			 * @param {object} sapGJAHR 
			 * @param {object} sapMONAT 
			 * @param {object} interestAmt  Interes
			 * @des 
			 * @return oRes
			 */
			_onGenIntBbvaCollection_getSelected: function (ID, sapGJAHR, sapMONAT, interestAmt) {

				var sUrl = this._getUrl()
					//Ubicacion servicio
					+ "srv_api/operations/FinancedItemBBVA"
					//Asignar filtros de busqueda
					+ "?$filter=(finItem_ID eq " + ID + " and sapGJAHR eq '" + sapGJAHR + "' and sapMONAT eq '" + sapMONAT +
					"' and flagCal eq true and flagReverse eq false)"
					//Seleciona el campo que se quiere usar
					+ "&$select=flagReverse,flagGen,interestAmt";
				var oRes = {
					flagReverse: true, //La casilla inicia desmarcada 
					flagGen: false, //El campo de importe activo
					interestAmt: interestAmt
				};
				$.ajax({
					url: sUrl,
					"async": false,
					type: "GET",
					dataType: "json",
					contentType: "application/json; charset=utf-8"
				}).then(function (data) {
					//Ver si hubo coincidencia
					if (data.value.length !== 0) {
						oRes.flagReverse = data.value[0].flagReverse;
						oRes.flagGen = data.value[0].flagGen;
						oRes.interestAmt = Number(data.value[0].interestAmt);
					}
				});
				return oRes;
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name onConfPag
			 * @param {object} oEvent Evento botón
			 * @des Lanza diálogo para confirmar pago de unidades financiadas,
			 * debe corresponder el estatus PRO, y puede ser de selección múltiple
			 * @returns Dialogo de tipo DialogConfPag
			 */
			onConfPag: function (oEvent) {
				var sDialogName = "DialogConfPag";
				this.mDialogs = this.mDialogs || {};

				//Obtener modelo para enviar
				var oTablaJson = this._onConfPagCollection(oEvent);
				if (oTablaJson === false) {
					return;
				}
				var oTablaJSONBco = this._onConfPagCollectionBco(oEvent, oTablaJson);
				var oDialog = this.mDialogs[sDialogName];
				//Crear instancia dialogo si no existe
				if (!oDialog) {
					oDialog = new DialogConfPag(this.getView());
					this.mDialogs[sDialogName] = oDialog;
					oDialog.setRouter(this.oRouter);
				}
				//Asignar modelo tipo JSON
				var oView = this.getView();
				var oJSON = new JSONModel();
				oView.setModel(oJSON, "ConfPagoCollection");
				oJSON.setData(oTablaJson);
				var oJSONBcoProv = new JSONModel();
				oJSONBcoProv.setData(oTablaJSONBco);
				oView.setModel(oJSONBcoProv, "BancoProveedorSet");
				//Mostrar dialogo
				oDialog.open();
				//Filtrar solo por IDS seleccionados:
				var aFilters = oTablaJson.map(function (element) {
					return new Filter("financedItem_ID", FilterOperator.EQ, element.ID);
				});
				//Si no hubo IDS mostrar resultado falso:
				if (aFilters.length === 0) {
					aFilters.push(new Filter("secuence", FilterOperator.EQ, 0));
				}
				var aFiltersAnd = [];
				//Integrar filtro con OR
				var oFilterOr = new Filter({
					filters: aFilters,
					and: false
				});
				aFiltersAnd.push(oFilterOr);
				aFiltersAnd.push(new Filter("flagConf", FilterOperator.EQ, false));
				//Integrar filtro con AND
				var oFilterAll = new Filter({
					filters: aFiltersAnd,
					and: true
				});
				var oBinding = oDialog.getView().byId("tablaConfPag").getBinding("rows");
				oBinding.filter(oFilterAll);
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name onPropPag
			 * @param {object} oEvent Evento botón
			 * @des	Lanza diálogo para generar propuesta de pago de unidades financiadas,
			 * debe corresponder el estatus a FIN, y puede ser de selección múltiple
			 * @return Dialogo de tipo DialogConfPag
			 */
			onPropPag: function (oEvent) {
				var sDialogName = "DialogPropPag";
				this.mDialogs = this.mDialogs || {};
				//Obtener modelo para enviar
				var oTablaJson = this._onPropPagCollection(oEvent);
				if (oTablaJson === false) {
					return;
				}
				var oDialog = this.mDialogs[sDialogName];
				//Crear instancia dialogo si no existe
				if (!oDialog) {
					oDialog = new DialogPropPag(this.getView());
					this.mDialogs[sDialogName] = oDialog;
					oDialog.setRouter(this.oRouter);
				}
				//Asignar modelo tipo JSON

				var oView = this.getView();
				var oJSON = new JSONModel();
				oView.setModel(oJSON, "PropPagoCollection");

				oJSON.setData(oTablaJson);
				var context = oEvent.getSource().getBindingContext();
				oDialog._oControl.setBindingContext(context);
				//Mostrar dialogo
				oDialog.open();
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name _onPagoCompCollection
			 * @param {object} oEvent Evento botón
			 * @des	A partir de una serie de elementos seleccionados de la tabla
			 * tableMainPP se genera un arreglo para generar la tabla del
			 * proceso  de pago por compensación.
			 * Se valida que los elementos estén en estatus FIN
			 * @return {array} Arreglo que conforma la tabla de propuesta de pago
			 */
			_onPagoCompCollection: function (oEvent) {
				var oTable = this.byId("tableMainPP");
				//Validar Selección
				var items = oTable.getSelectedIndices();
				if (items.length === 0) {
					MessageBox.error("Seleccione uno o más elementos");
					return false;
				}
				var oPagCompTable = [];
				//Generar Tabla a partir de los elementos seleccionados:
				for (var i = 0; i < items.length; i++) {
					var item = items[i];
					var oRow = oTable.getContextByIndex(item).getObject(); //actualizado
					if (oRow.status_status !== "FIN") {
						var sTxtMsg = this._i18n.getText("errProPagSt", [oRow.serial, oRow.fundSubType_ID, oRow.secuence]);
						MessageToast.show(sTxtMsg);
						return false;
					}

					//Construir fila:
					var oNewRow = {
						"ID": oRow.ID,
						"serial": oRow.serial,
						"plateNum": oRow.plateNum,
						"fundSubType_ID": oRow.fundSubType_ID,
						"secuence": oRow.secuence,
						"center": oRow.center,
						"currency": oRow.currency,
						"costAmt": oRow.costAmt,
						"financedAmt": oRow.financedAmt,
						"balanceAmt": oRow.balanceAmt,
						"PENDLIQ": 0.00, // PROFORMA
						"payedAmt": 0.00,
						"tcamb": "" //no lo tenemo
					};

					oPagCompTable.push(oNewRow);
				}
				return oPagCompTable;
			},

			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name _onPagoCompCollection
			 * @param {object} oEvent Evento botón
			 * @des	A partir de una serie de elementos seleccionados de la tabla
			 * tableMainPP se genera un arreglo para generar la tabla del
			 * proceso de propuesta de pago.
			 * Se valida que los elementos estén en estatus FIN
			 * @return {array} Arreglo que conforma la tabla de propuesta de pago
			 */
			_onPropPagCollection: function (oEvent) {
				var oTable = this.byId("tableMainPP");
				//Validar Selección
				var items = oTable.getSelectedIndices();
				if (items.length === 0) {
					MessageBox.error("Seleccione uno o más elementos");
					return false;
				}
				var oProPagTable = [];
				//Generar Tabla a partir de los elementos seleccionados:
				for (var i = 0; i < items.length; i++) {

					var item = items[i];
					var oRow = oTable.getContextByIndex(item).getObject(); //actualizado
					if (oRow.status_status !== "FIN") {
						var sTxtMsg = this._i18n.getText("errProPagSt", [oRow.serial, oRow.fundSubType_ID, oRow.secuence]); //Actualizado
						MessageToast.show(sTxtMsg);
						return false;
					}
					//Construir fila:
					var oNewRow = { //actualizado
						"ID": oRow.ID,
						"companyCode": oRow.companyCode,
						"center": oRow.center,
						"serial": oRow.serial,
						"fundSubType_ID": oRow.fundSubType_ID,
						"secuence": oRow.secuence,
						"costAmt": parseFloat(oRow.costAmt),
						"financedAmt": parseFloat(oRow.financedAmt),
						"balanceAmt": parseFloat(oRow.balanceAmt),
						"payedAmt": parseFloat(oRow.balanceAmt),
						"datePay": null
					};
					oProPagTable.push(oNewRow);
				}
				return oProPagTable;
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name _onConfPagCollection
			 * @param {object} oEvent Evento botón
			 * @des A partir de una serie de elementos seleccionados de la tabla
			 * tableMainPP se genera un arreglo para generar la tabla del
			 * proceso de confirmación de pago.
			 * Se valida que los elementos estén en estatus PRO
			 * @return {array} Arreglo que conforma la tabla de confirmación de pago
			 */
			_onConfPagCollection: function (oEvent) {
				var oTable = this.byId("tableMainPP");
				//Validar Selección:
				var items = oTable.getSelectedIndices();
				if (items.length === 0) {
					MessageBox.error("Seleccione uno o más elementos");
					return false;
				}
				var oConfPagTable = [];
				//Generar Tabla de confirmación de pago:
				for (var i = 0; i < items.length; i++) {
					var item = items[i];
					var oRow = oTable.getContextByIndex(item).getObject(); //actualizado
					if (oRow.status_status !== "PRO") {
						var sTxtMsg = this._i18n.getText("errConfPagSt", [oRow.serial, oRow.fundSubType_ID, oRow.secuence]);
						MessageToast.show(sTxtMsg);
						return false;
					}
					//Construir fila:
					var oNewRow = {
						"ID": oRow.ID,
						"sapLINFR": oRow.sapLifnr,
						"companyCode": oRow.companyCode,
						"center": oRow.center,
						"serial": oRow.serial,
						"fundSubType_ID": oRow.fundSubType_ID,
						"secuence": oRow.secuence,
						"currency": oRow.currency,
						"balanceAmt": parseFloat(oRow.balanceAmt),
						"payedAmt": parseFloat(oRow.balanceAmt), //Cantidad a Pagar 
						"datePay": new Date(),
						"intMonthSum": oRow.intMonthSum,
						"sapHBKID": "",
						"sapUKONT": "",
						"sapHKTID": "",
						"sapZLSCH": "", //Interes a pagar 
						"intRecalAmt": "0" // Guardar intereses

					};
					oConfPagTable.push(oNewRow);
				}
				return oConfPagTable;
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name _onConfPagCollectionBco
			 * @param {object} oEvent Evento botón
			 * @param {object} oTablaJson json
			 * @des 
			 * @return {string} res
			 */
			_onConfPagCollectionBco: function (oEvent, oTablaJson) {
				var aPartner = [];
				var sPartnerFilter = "";
				var res = [];
				oTablaJson.forEach(x => {
					if (aPartner.indexOf(x.sapLINFR) === -1) {
						aPartner.push(x.sapLINFR);
						if (aPartner.length !== 1) {
							sPartnerFilter = sPartnerFilter + " or ";
						}
						sPartnerFilter = "Partner eq '" + x.sapLINFR.padStart(10, "0") + "'";
					}
				});
				//Banco Proveedor:
				var sUrl = this._getUrl() + "s4_dev/sap/opu/odata/sap/Z_OD_SCP_BAVNPP001_SRV/Bancos_ProveedorSet"
					//Filtros:
					+ "?$filter=" + encodeURI(sPartnerFilter);
				$.ajax({
					url: sUrl,
					type: "GET",
					dataType: "json",
					async: false,
					contentType: "application/json;IEEE754Compatible=true"
				}).then(function (data) {
					res = data.d.results;
					res.forEach(x => {
						delete x.__metadata;
					});
				}).fail(function (jqXHR, textStatus, errorThrown) {
					////console.log(jqXHR, textStatus, errorThrown);
					res = [];
				});
				return res;
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name onAnularTrasp
			 * @param {object} oEvent Evento botón
			 * @des Anular Traspaso: Funcionalidad para anulación de traspasos
			 *  Se pueden seleccionar varios elementos a financiar.
			 */
			onAnularTrasp: function (oEvent) {
				this.getView().setBusy(true);
				this.getView().setBusyIndicatorDelay(0);
				var that = this;
				//Obtener modelo para enviar
				var p1 = new Promise(
					//Después de 3 segundos continuar
					function (resolve, reject) {
						var oTablaJSON = that._onSelectObjectAnuTasFin(oEvent, that);
						resolve(oTablaJSON);
					}
				);
				p1.then((oTablaAnular) => {
					//Los elementos en estatus FIN preguntar si se van a eliminar JCBG
					if (oTablaAnular.length !== 0) {
						that._onAnularTrasp(oEvent, oTablaAnular);
						return;
					} else {
						that.getView().setBusy(false);
					}
				});
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name _onAnularTrasp
			 * @param {object} oEvent Evento botón
			 * @param {object} oTablaAnular 
			 * @des Anular Traspaso
			 */
			_onAnularTrasp: function (oEvent, oTablaAnular) {
				var txt = this._i18n.getText("confTrasDelete", [oTablaAnular.length]);
				var txtTit = this._i18n.getText("confTrasDeleteTit", [oTablaAnular.length]);
				var that = this;
				//Preguntar si quiere borra X propuestas de pago
				MessageBox.confirm(txt, {
					title: txtTit, // default
					onClose: function (oAction) {
						if (oAction === MessageBox.Action.OK) {
							//Eliminar seleccionados
							that._onAnularTrasp_DoDelete(oTablaAnular);
						}
						that.getView().setBusy(false);
					}
				});
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name _onAnularTrasp_DoDelete
			 * @param {object} oTablaAnular 
			 * @des Anular Traspaso
			 */
			_onAnularTrasp_DoDelete: function (oTablaAnular) {
				var that = this;
				//Marcar como ocupado por 5 segundos en lo que termina el servicio:
				var oController = this.getView("View1").getController();
				oController.getView().setBusy(true);
				var sUrl = this._getUrl()
					//Ubicacion servicio
					+ "srv_api/function/deleteTraItem";
				//Generar Petición
				var aUUID = oTablaAnular.map(function (x) {
					return x.ID;
				});
				var oSend = {
					Input: aUUID
				};
				$.ajax({
					url: sUrl,
					type: "POST",
					dataType: "json",
					contentType: "application/json; charset=utf-8",
					data: JSON.stringify(oSend)
				}).then(function (data) {
					var txt = that._i18n.getText("confTrasDeleteConf", [data.value]);
					//Mostrar mensaje OK:
					MessageBox.success(txt);
					//Actualizar modelo:
					oController.getView().setBusy(false);
					oController.onSearch(null);
				});
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name _onSelectObjectAnuTasFin
			 * @param {object} oEvent Objetos a nular
			 * @param {} that 
			 * @des Generar objeto con lista de objetos anular
			 */
			_onSelectObjectAnuTasFin: function (oEvent, that) {

				var oTable = that.byId("tableMainPP");
				var oAnularFIN = [];
				//Validar Selección:
				var items = oTable.getSelectedIndices();
				if (items.length === 0) {
					MessageBox.error("Seleccione uno o más elementos");
					return oAnularFIN;
				}
				var aObjetos = [];
				//Unir elementos faltantes
				for (var i = 0; i < items.length; i++) {
					var item = items[i];
					var oRow2 = oTable.getContextByIndex(item).getObject();
					aObjetos.push(oRow2);
				}
				aObjetos = that._getMissingItems(aObjetos, that);
				//Generar Tabla de anulación traspaso de Unidad:
				for (var oRow of aObjetos) {
					var txt = that._i18n.getText("errPagTrasAn", [oRow.serial]);
					var txtFin = that._i18n.getText("errPagTrasAnFin", [oRow.serial]);
					if (oRow.status_status !== "FIN") {
						MessageToast.show(txtFin);
						continue;
					}
					if (Number(oRow.payedAmt) !== 0) {
						MessageToast.show(txt);
						continue;
					}
					//Construir fila:
					var oNewRow = {
						"ID": oRow.ID
					};
					oAnularFIN.push(oNewRow);
				}
				return oAnularFIN;
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name onAnularPago
			 * @param {object} oEvent Evento botón
			 * @param {} that 
			 * @des Funcionalidad para mostrar diálogo de anulación de pagos
			 *  Se pueden seleccionar varios elementos a financiar.
			 */
			onAnularPago: function (oEvent) {
				var sDialogName = "DialogAnularPago";
				this.mDialogs = this.mDialogs || {};
				//Obtener modelo para enviar

				//Los elementos en estatus PRO preguntar si se van a eliminar JCBG
				var oTablaJsonPRO = this._onSelectObjectAnuPagoPRO(oEvent);
				if (oTablaJsonPRO.length !== 0) {
					this._onAnularPagoPRO(oEvent, oTablaJsonPRO);
					return;
				}
				var oDialog = this.mDialogs[sDialogName];
				//Crear dialogo
				if (!oDialog) {
					oDialog = new DialogAnularPago(this.getView());
					this.mDialogs[sDialogName] = oDialog;
					oDialog.setRouter(this.oRouter);
				}
				//Los elementos en estatus FIN preguntar si se van a eliminar JCBG
				var oTablaJsonFIN = this._onSelectObjectAnuPagoFIN(oEvent);
				//Asignar modelo tipo JSON
				var oView = this.getView();
				var oJSON = new JSONModel();
				oView.setModel(oJSON, "AnuPagoCollection");
				oJSON.setData(oTablaJsonFIN);
				var context = oEvent.getSource().getBindingContext();
				//Mostrar dialogo
				oDialog.open();
				//Filtrar solo por IDS seleccionados:
				var aFilters = oTablaJsonFIN.map(function (element) {
					return new Filter("financedItem_ID", FilterOperator.EQ, element.ID);
				});
				//Si no hubo IDS mostrar resultado falso:
				if (aFilters.length === 0) {
					aFilters.push(new Filter("secuence", FilterOperator.EQ, 0));
				}
				var aFiltersAnd = [];
				//Integrar filtro con OR
				var oFilterOr = new Filter({
					filters: aFilters,
					and: false
				});
				aFiltersAnd.push(oFilterOr);
				aFiltersAnd.push(new Filter("flagConf", FilterOperator.EQ, true));
				//Integrar filtro con AND
				var oFilterAll = new Filter({
					filters: aFiltersAnd,
					and: true
				});

				var oBinding = oDialog.getView().byId("anularPago").getBinding("rows");

				oBinding.filter(oFilterAll);

			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name _onSelectObjectAnuPagoFIN
			 * @param {object} oEvent Evento botón
			 * @des 
			 */
			_onSelectObjectAnuPagoFIN: function (oEvent) {
				var oTable = this.byId("tableMainPP");
				var oAnularFIN = [];
				//Validar Selección:
				var items = oTable.getSelectedIndices();
				if (items.length === 0) {
					MessageBox.error("Seleccione uno o más elementos");
					return oAnularFIN;
				}
				//Generar Tabla de anulación:
				for (var i = 0; i < items.length; i++) {
					var item = items[i];
					var oRow = oTable.getContextByIndex(item).getObject(); //actualizado
					//Construir fila:
					var oNewRow = {
						"ID": oRow.ID
					};
					oAnularFIN.push(oNewRow);
				}
				return oAnularFIN;
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name _onSelectObjectAnuPagoPRO
			 * @param {object} oEvent Evento botón
			 * @des 
			 */
			_onSelectObjectAnuPagoPRO: function (oEvent) {
				var oTable = this.byId("tableMainPP");
				var oAnularPRO = [];
				//Validar Selección:
				var items = oTable.getSelectedIndices();
				if (items.length === 0) {
					MessageBox.error("Seleccione uno o más elementos");
					return oAnularPRO;
				}
				//Generar Tabla de Anulacion Propuesta pago:
				for (var i = 0; i < items.length; i++) {
					var item = items[i];
					var oRow = oTable.getContextByIndex(item).getObject(); //actualizado
					if (oRow.status_status !== "PRO") {
						continue;
					}
					//Construir fila:
					var oNewRow = {
						"ID": oRow.ID
					};
					oAnularPRO.push(oNewRow);
				}
				return oAnularPRO;
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name _onAnularPagoPRO
			 * @param {object} oEvent Evento botón
			 * @param {json} oTablaJsonPRO
			 * @des  Anularo Pago
			 */
			_onAnularPagoPRO: function (oEvent, oTablaJsonPRO) {
				var txt = this._i18n.getText("confProDelete", [oTablaJsonPRO.length]);
				var txtTit = this._i18n.getText("confProDeleteTit", [oTablaJsonPRO.length]);
				var that = this;
				//Preguntar si quiere borra X propuestas de pago
				MessageBox.confirm(txt, {
					title: txtTit, // default
					onClose: function (oAction) {
						if (oAction === MessageBox.Action.OK) {
							//Eliminar seleccionados
							that._onAnularPagoPRO_DoDelete(oTablaJsonPRO);
						}
					}
				});
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name _onAnularPagoPRO_DoDelete
			 * @param {json} oTablaJsonPRO
			 * @des  Anularo Pago
			 */
			_onAnularPagoPRO_DoDelete: function (oTablaJsonPRO) {
				var that = this;
				//Marcar como ocupado por 5 segundos en lo que termina el servicio:
				var oController = this.getView("View1").getController();
				var sUrl = this._getUrl()
					//Ubicacion servicio
					+ "srv_api/function/deleteProPag";
				//Generar Petición
				var aUUID = oTablaJsonPRO.map(function (x) {
					return x.ID;
				});
				var oSend = {
					Input: aUUID
				};
				oController.getView().setBusy(true);
				$.ajax({
					url: sUrl,
					type: "POST",
					dataType: "json",
					contentType: "application/json; charset=utf-8",
					data: JSON.stringify(oSend)
				}).then(function (data) {
					oController.getView().setBusy(false);
					var txt = that._i18n.getText("confProDeleteConf", [data.value]);
					//Mostrar mensaje OK:
					MessageBox.success(txt);
					//Actualizar modelo:
					setTimeout(function () {
						oController.onSearch(null);
					}, 3000);
					setTimeout(function () {
						oController.getView().setBusy(false);
					}, 4000);
				});
			},
			/** 
			 * @author Jorge Bustillos
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
			 * @author Jorge Bustillos
			 * @function
			 * @name oPagoCompe
			 * @param {object} Evento heredado
			 * @desc Pago por compensación
			 */
			oPagoCompe: function (oEvent) {
				//Obtener modelo para enviar
				var oTablaJson = this._onPagoCompCollection(oEvent);
				if (oTablaJson === false) {
					return;
				}
				//Si hay solo uno seleccionado, llamar normal
				/*
				if (oTablaJson.length === 1) {
					this._oPagoCompe_Single(oEvent);
				} else { //Si hay varios seleccionados, llamar tabla*/
				this._oPagoCompe_Multiple(oEvent, oTablaJson);
				//}
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name _oPagoCompe_Multiple
			 * @param {event} oEvent heredado
			 * @param {json} oTablaJson
			 * @desc Pago por compensación Multiple
			 */
			_oPagoCompe_Multiple: function (oEvent, oTablaJson) {
				var sDialogName = "DialogPagoMasiComp";
				this.mDialogs = this.mDialogs || {};
				var oDialog = this.mDialogs[sDialogName];
				//Crear dialogo si no existe
				if (!oDialog) {
					oDialog = new DialogPagoMasiComp(this.getView());
					this.mDialogs[sDialogName] = oDialog;
					oDialog.setRouter(this.oRouter);
				}
				//Asignar modelo tipo JSON
				var oView = this.getView();
				var oJSON = new JSONModel();
				oView.setModel(oJSON, "PagCompCollection");
				oJSON.setData(oTablaJson);
				//Asignar modelo al dialogo
				var context = oEvent.getSource().getBindingContext();
				oDialog._oControl.setBindingContext(context);
				//Mostrar dialogo
				oDialog.open();
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name onExit
			 * @desc  Función para destruir un dialogo previamente creado.
			 */
			onExit: function () {
				if (this._oDialog) {
					this._oDialog.destroy();
				}
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name onSearch
			 * @param {object} Evento heredado
			 * @desc Función para realizar búsqueda a partir de filtros ubicados DynamicPageHeader
			 */
			onSearch: function (oEvent) {
				//
				//Objeto Vista:
				var oView = this.getView();
				//Generar Filtros
				var res = this._getTableFilters(oView);
				//Mostrar error si se
				if (res === false) {
					MessageToast.show(this._i18n.getText("vEntrada"));
					return;
				}
				//Obtener instancia de la tabla tipo SAP.UI.TABLE.TABLE
				var oTable = this.byId("tableMainPP");
				//Limpiar campos seleccionados.
				oTable.clearSelection();
				//Enviar los filtros
				oTable.getBinding("rows").filter([res]);
				//Ocultar cabecera
				this.byId("dpMonitor").setHeaderExpanded(false);
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name _getTableFilters
			 * @param {object} oView Objeto de la vista
			 * @desc Obtiene los valores de los controles y convierte a filtros
			 * @return {Filter|boolean} Filtro de múltiple condición, falso en caso de que no tenga un filtro obligatorio
			 */
			_getTableFilters: function (oView) {
				var aFiltersAnd = [];
				//Sociedad
				var oFilterCompany = this._getTableFiltersMI(oView, "miSociedad", "companyCode", true);
				if (oFilterCompany !== false) {
					aFiltersAnd.push(oFilterCompany);
				} else {
					return false;
				}
				//Centro
				var oFilterCenter = this._getTableFiltersMI(oView, "miCentro", "center", true);
				if (oFilterCenter !== false) {
					aFiltersAnd.push(oFilterCenter);
				} else {
					return false;
				}
				//Segmento
				var oFilterSegment = this._getTableFiltersMCB(oView, "mcbSegmento", "segment");
				if (oFilterSegment !== false) {
					aFiltersAnd.push(oFilterSegment);
				}
				//Marca
				var oFilterBrand = this._getTableFiltersMCB(oView, "mcbMarca", "brandCode");
				if (oFilterBrand !== false) {
					aFiltersAnd.push(oFilterBrand);
				}
				//FundSubType
				var oFilterFundSubType = this._getTableFiltersMCB(oView, "mcbFundSubType", "fundSubType_ID");
				if (oFilterFundSubType !== false) {
					aFiltersAnd.push(oFilterFundSubType);
				}
				//FinSrv
				var oFilterFinSet = this._getTableFiltersMCB(oView, "mcbFinSet", "finSrv_finCode");
				if (oFilterFinSet !== false) {
					aFiltersAnd.push(oFilterFinSet);
				}
				//Status
				var oFilterStatus = this._getTableFiltersMCB(oView, "mcbEstatusUni", "status_status");
				if (oFilterStatus !== false) {
					aFiltersAnd.push(oFilterStatus);
				}
				//VIN
				var oFilterVIN = this._getTableFiltersMIValueHelp(oView, "miChasis", "serial");
				if (oFilterVIN !== false) {
					aFiltersAnd.push(oFilterVIN);
				}
				//Currency
				var oFilterCurrency = this._getTableFiltersMCB(oView, "mcbMoneda", "currency");
				if (oFilterCurrency !== false) {
					aFiltersAnd.push(oFilterCurrency);
				}
				//Fecha Inicio
				var oFilterFinIni = this._getTableFiltersDRS(oView, "drsFecFinIni", "dateStart");
				if (oFilterFinIni !== false) {
					aFiltersAnd.push(oFilterFinIni);
				}
				//Fecha Salida
				var oFilterSalUni = this._getTableFiltersDRS(oView, "drsFecSalUni", "dateUnitExit");
				if (oFilterSalUni !== false) {
					aFiltersAnd.push(oFilterSalUni);
				}
				var oFilter = new Filter({
					filters: aFiltersAnd,
					and: true
				});
				return oFilter;
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @desc Genera filtro a partir de un control MultiInput con valores ValueHelp
			 * @param oView Objeto Vista
			 * @param sID {string} Identificador control multi input	
			 * @param sOdataKey {string} Nombre del campo en ODATA
			 * @param bMandatory {boolean} Indicador si es obligatorio o no (Cambia value state)
			 * @return {Filter|boolean} Filtro de condición para los parámetros seleccionados, falso en caso de que no se haya generado filtro
			 */
			_getTableFiltersMIValueHelp: function (oView, sID, sOdataKey, bMandatory) {
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
			 *	@author Jorge Bustillos
			 * @function
			 * @name _getTableFiltersMI
			 * @desc Genera filtro a partir de un control MultiInput
			 * @param oView Objeto Vista
			 * @param sID {string} Identificador control multi input	
			 * @param sOdataKey {string} Nombre del campo en ODATA
			 * @param bMandatory {boolean} Indicador si es obligatorio o no (Cambia value state)
			 * @return {Filter|boolean} Filtro de condición para los parámetros seleccionados, falso en caso de que no se haya generado filtro
			 */
			_getTableFiltersMI: function (oView, sID, sOdataKey, bMandatory) {
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
			 * @name _getTableFiltersMCB
			 * @desc Genera filtro a partir de un control Multi Combo Box
			 * @param oView Objeto Vista
			 * @param sID {string} Identificador control multi input	
			 * @param sOdataKey {string} Nombre del campo en ODATA
			 * @return {Filter|boolean} Filtro de condición para los parámetros seleccionados, falso en caso de que no se haya generado filtro
			 */
			_getTableFiltersMCB: function (oView, sID, sOdataKey) {
				var oMCBControl = oView.byId(sID);
				var oKeys = oMCBControl.getSelectedItems();
				var aFiltro = [];
				//Por cada elemento agregar filtro al arreglo de filtros
				$.each(oKeys, function (index, value) {
					var oFiltro = new Filter(sOdataKey, FilterOperator.EQ, value.getKey());
					aFiltro.push(oFiltro);
				});
				//Si no hay elementos regresar false
				if (oKeys.length === 0) {
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
			 * @name _getTableFiltersDRS
			 * @desc Genera filtro a partir de un control DateRangeSelection
			 * @param oView Objeto Vista
			 * @param sID {string} Identificador control DateRangeSelection	
			 * @param sOdataKey {string} Nombre del campo en ODATA
			 * @return {Filter|boolean} Filtro de condición para los parámetros seleccionados, falso en caso de que no se haya generado filtro
			 */
			_getTableFiltersDRS: function (oView, sID, sOdataKey) {
				var oDRSControl = oView.byId(sID);
				//Si no hay elementos regresar false
				if (oDRSControl.getDateValue() === null) {
					return false;
				}
				//Agregar fecha
				var oFiltro = new Filter(sOdataKey, FilterOperator.BT, oDRSControl.getDateValue().toISOString().substr(0, 10),
					oDRSControl.getSecondDateValue().toISOString().substr(0, 10));
				return oFiltro;
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name onPressTest
			 * @param {object} oEvent Evento botón
			 * @desc Función dummy para probar un botón
			 */
			onPressTest: function (oEvent) {
				MessageToast.show("Test BTN");

			},
			//-------------------------------------------------------------------
			//	Help Values:
			//-------------------------------------------------------------------

			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name onHelpChasis
			 * @param {object} oEvent Evento botón
			 * @desc Muestra help value para selección de múltiples chasis/vin/serie
			 */
			onHelpChasis: function (oEvent) {
				//Se carga fragmento
				this._oChasisValueHelpDialog = sap.ui.xmlfragment(
					"vn.pp.ux_vn_pp_monitor.view.DialogChasis",
					this);
				//Se añade fragmento a vista
				this.getView().addDependent(this._oChasisValueHelpDialog);
				//Se configura para que filtre campo CHASIS
				this._oChasisValueHelpDialog.setRangeKeyFields([{
					label: this._i18n.getText("filtroChasis"),
					key: "CHASIS",
					type: "string",
					typeInstance: new typeString({}, {
						maxLength: 17
					})
				}]);
				//En caso de que se hayan seleccionado traer
				this._oChasisValueHelpDialog.setTokens(this._oMIChasis.getTokens());
				//Muestra dialogo
				this._oChasisValueHelpDialog.open();
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name onChasisValueHelpOkPress
			 * @param {object} oEvent Evento botón
			 * @desc Para filtro chasis, agregar nuevos tokens si se selecciona
			 * botón de OK y cerrar dialogo
			 */
			onChasisValueHelpOkPress: function (oEvent) {
				var aTokens = oEvent.getParameter("tokens");
				this._oMIChasis.setTokens(aTokens);
				this._oChasisValueHelpDialog.close();
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name onChasisValueHelpCancelPress
			 * @param {object} oEvent Evento botón
			 * @desc Para filtro chasis, ocultar dialogo
			 */
			onChasisValueHelpCancelPress: function () {
				this._oChasisValueHelpDialog.close();
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name onChasisValueHelpAfterClose
			 * @desc Destruye vista de ayuda selección de chasis
			 */
			onChasisValueHelpAfterClose: function () {
				this._oChasisValueHelpDialog.destroy();
			},
			//----------------------Ayuda para selección de sociedad:

			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @param {object} oEvent Filtro
			 * @name onHelpSociedad
			 * @desc Selección de sociedad individual.
			 */
			onHelpSociedad: function (oEvent) {
				oEvent.getSource().setValueState("None");
				this.inputId = oEvent.getSource().getId();
				// create value help dialog
				if (!this._sociedadValueHelpDialog) {
					Fragment.load({
						id: "valueSociedadHelpDialog",
						name: "vn.pp.ux_vn_pp_monitor.view.DialogSociedad",
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
			 * @author Jorge Bustillos
			 * @function
			 * @param {object} oEvent Filtro
			 * @name _sociedadHandleValueHelpSearch
			 * @desc SFiltra la sociedad a partir del texto ingresado.
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
			 * @param oEvent Botón de cancelar o aceptar
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
				//Actualiza filtro
				this._fundSubTypesSetFilters();
				this._finSetFilters();
				this._brandSetFilters();
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name _fundSubTypesSetFilters
			 * @desc Modifica los filtros para el control mcbFundSubType de acuerdo a las 
			 * sociedad seleccionadas.
			 */
			_fundSubTypesSetFilters: function () {
				var oMcbFundSubType = this.byId("mcbFundSubType");
				var oMiSociedad = this.byId("miSociedad");
				//Si no se selecciona sociedad, mostrar error:
				var oTokensSoc = oMiSociedad.getTokens();
				//Arreglo de filtros
				var aFiltro1 = [];
				//Por cada elemento agregar filtro al arreglo de filtros
				$.each(oTokensSoc, function (index, value) {
					var oFiltro = new Filter("companyCode", FilterOperator.EQ, value.getKey());
					aFiltro1.push(oFiltro);
				});
				//Si no hay sociedades marcar como obligatorias:
				if (oTokensSoc.length === 0) {
					var oFiltro = new Filter("companyCode", FilterOperator.EQ, "INVALID");
					aFiltro1.push(oFiltro);
				}
				//Crear contenedor de filtros OR (para sociedad):
				var oFilter = new Filter({
					filters: aFiltro1,
					and: false
				});
				oMcbFundSubType.getBinding("items").filter([oFilter]);
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name _brandSetFilters
			 * @desc Modifica los filtros para el control mcbMarca de acuerdo a las 
			 *  marcas seleccionadas.
			 */
			_brandSetFilters: function () {
				var oMCBMarca = this.byId("mcbMarca");
				var oMiSociedad = this.byId("miSociedad");
				//Si no se selecciona sociedad, mostrar error:
				var oTokensSoc = oMiSociedad.getTokens();
				//Arreglo de filtros
				var aFiltro1 = [];
				//Por cada elemento agregar filtro al arreglo de filtros
				$.each(oTokensSoc, function (index, value) {
					var oFiltro = new Filter("companyCode", FilterOperator.EQ, value.getKey());
					aFiltro1.push(oFiltro);
				});
				//Si no hay sociedades marcar como obligatorias:
				if (oTokensSoc.length === 0) {
					var oFiltro = new Filter("companyCode", FilterOperator.EQ, "XXXX");
					aFiltro1.push(oFiltro);
				}
				//Crear contenedor de filtros OR (para sociedad):
				var oFilter = new Filter({
					filters: aFiltro1,
					and: false
				});
				oMCBMarca.getBinding("items").filter([oFilter]);
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name _finSetFilters
			 * @desc Modifica los filtros para el control mcbFinSrv de acuerdo a las 
			 * sociedad seleccionadas.
			 */
			_finSetFilters: function () {
				var oMCBFinSrv = this.byId("mcbFinSet");
				var oMiSociedad = this.byId("miSociedad");
				//Si no se selecciona sociedad, mostrar error:
				var oTokensSoc = oMiSociedad.getTokens();
				//Arreglo de filtros
				var aFiltro1 = [];
				//Por cada elemento agregar filtro al arreglo de filtros
				$.each(oTokensSoc, function (index, value) {
					var oFiltro = new Filter("companyCode", FilterOperator.EQ, value.getKey());
					aFiltro1.push(oFiltro);
				});
				//Si no hay sociedades marcar como obligatorias:
				if (oTokensSoc.length === 0) {
					var oFiltro = new Filter("companyCode", FilterOperator.EQ, "XXXX");
					aFiltro1.push(oFiltro);
				}
				//Crear contenedor de filtros OR (para sociedad):
				var oFilter = new Filter({
					filters: aFiltro1,
					and: false
				});
				oMCBFinSrv.getBinding("items").filter([oFilter]);
			},
			//----------------------Ayuda para selección de centros:

			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name onHelpCentro
			 * @param oEvent Filtro
			 * @desc Selección de centro múltiple.
			 */
			onHelpCentro: function (oEvent) { //Verifica se haya seleccionado sociedad
				oEvent.getSource().setValueState("None");
				var oMiSociedad = this.byId("miSociedad");
				//Si no se selecciona sociedad, mostrar error:
				var oTokensSoc = oMiSociedad.getTokens();
				if (oTokensSoc.length === 0) {
					MessageToast.show(this._i18n.getText("errFaltaSoc"));
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
						name: "vn.pp.ux_vn_pp_monitor.view.DialogCentro",
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
			 * @author Jorge Bustillos
			 * @function
			 * @name _generarFiltroSociedad
			 * @param sInputValue Texto de búsqueda de centro por título
			 * @param aValueSociedad Arreglo de sociedades seleccionadas [1101,1102...]
			 * @return Filter Filtro con condición sociedad y texto.
			 * @desc SGenera el filtro de sociedad y titulo de centro para la búsqueda de centros
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
			 * @author Jorge Bustillos
			 * @function
			 * @name _generarArregloSociedad
			 * @param {object} oMiSociedad Objeto que trae el multiinput de sociedad.
			 * @return Array Lista de sociedades seleccionadas [1101,1102...]
			 * @desc Se obtienen las llaves de los elementos seleccionados en el filtro de sociedades
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
			 * @param sInputValue Si se ingresa este campo, se filtra por descripción
			 * @param aValueSociedad Lista de sociedades filtrar los centros [1101,1102,...]
			 */
			_centroOpenValueHelpDialog: function (sInputValue, aValueSociedad) {

				var oFilterN3 = this._generarFiltroSociedad(sInputValue, aValueSociedad);
				// Anexa filtro principal a dialogo
				this._centroValueHelpDialog.getBinding("items").filter(oFilterN3);
				// Abre dialogo y muestra filtro actual
				this._centroValueHelpDialog.open(sInputValue);
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name _centroHandleValueHelpSearch
			 * @param {object} Evento heredado
			 * @desc Filtra el listado de centros a partir de la barra de búsqueda
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
			 * @param oEvent Botón cerrar o aceptar dialogo centro
			 */
			_centroHandleValueHelpClose: function (oEvent) {
				var aSelectedItems = oEvent.getParameter("selectedItems"),
					oMultiInput = this.byId("miCentro");
				if (oEvent.getId() !== "confirm") {
					return;
				}
				oMultiInput.removeAllTokens();
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
			 * @author Jorge Bustillos
			 * @function
			 * @name onRecalendarizaUni
			 * @param {object} oEvent Botón cerrar o aceptar dialogo centro
			 * @desc Función Recalendarización 
			 */
			onRecalendarizaUni: function (oEvent) {
				var sDialogName = "DialogRecalendarizacion";
				this.mDialogs = this.mDialogs || {};
				//Obtener modelo para enviar
				var oTablaJson = this._onRecalendarizacionCollection(oEvent);
				if (oTablaJson === false) {
					return;
				}

				var oDialog = this.mDialogs[sDialogName];
				//Crear dialogo si no existe
				if (!oDialog) {
					oDialog = new DialogRecalendarizacion(this.getView());
					this.mDialogs[sDialogName] = oDialog;
					oDialog.setRouter(this.oRouter);
				}

				//Asignar modelo tipo JSON
				var oView = this.getView();
				var oJSON = new JSONModel();
				oView.setModel(oJSON, "RecalendarizacionCollection");
				oJSON.setData(oTablaJson);
				var context = oEvent.getSource().getBindingContext();
				oDialog._oControl.setBindingContext(context);
				//Mostrar dialogo
				oDialog.open();
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name _onRecalendarizacionCollection
			 * @param {object} oEvent Botón cerrar o aceptar dialogo centro
			 * @desc Coleccion de la recalendarización
			 */
			_onRecalendarizacionCollection: function (oEvent) {
				var oTable = this.byId("tableMainPP");
				//Validar Selección:
				var items = oTable.getSelectedIndices();
				if (items.length === 0) {
					MessageBox.error("Seleccione uno o más elementos");
					return false;
				}
				var ochangerecalendaTable = [];
				//Generar Tabla de Recalendarizacion:
				for (var i = 0; i < items.length; i++) {
					var item = items[i];
					var oRow = oTable.getContextByIndex(item).getObject(); //actualizado

					if (oRow.status_status !== "FIN") {
						var sTxtMsg = this._i18n.getText("errRecalendaSt", [oRow.serial, oRow.fundSubType_ID, oRow.secuence]);
						MessageToast.show(sTxtMsg);
						return false;
					}
					if (oRow.finSrv_finCode !== "BBVA") {
						var sTxtMsg1 = this._i18n.getText("errRecalendaerrFinanciera", [oRow.serial, oRow.fundSubType_ID, oRow.secuence]);
						MessageToast.show(sTxtMsg1);
						return false;
					}
					//Construir fila:

					var oNewRow = {
						"ID": oRow.ID,
						"companyCode": oRow.companyCode, //Sociedad
						"center": oRow.center, //Centro
						"serial": oRow.serial, //VIN
						"fundSubType_ID": oRow.fundSubType_ID, //Tipo de Finaciamiento
						"segment": oRow.segment, //Segmento
						"secuence": oRow.secuence, //Posicion 
						"finSrv_finCode": oRow.finSrv_finCode, //Financiera Actual
						"currency": oRow.currency, //Moneda Financiamiento
						"costAmt": oRow.costAmt, //Importe Unidad
						"financedAmt": oRow.financedAmt, //Importe Financiado
						"balanceAmt": oRow.balanceAmt, //Saldo Financiamiento
						"dateStart": null, //fecha de inicio de financiamiento
						"finDays": "", //Dias de Financiamiento
						"dateEnd": "", //Fecha Fin
						"numRecal": parseInt(oRow.recalNum, 10) + 1, // Numero de recalendarización
						"intRecalAmt": "0"

					};
					ochangerecalendaTable.push(oNewRow);
				}
				return ochangerecalendaTable;
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name onchangeMoney
			 * @param {object} oEvent Botón cerrar o aceptar dialogo centro
			 * @desc cambio de moneda
			 */
			onchangeMoney: function (oEvent) {
				var sDialogName = "DialogCambioMoneda";
				this.mDialogs = this.mDialogs || {};
				//Obtener modelo para enviar
				this.getView().setBusy(true);
				this.getView().setBusyIndicatorDelay(0);
				var that = this;
				//Obtener modelo para enviar
				var p1 = new Promise(

					function (resolve, reject) {
						var oTablaJSON = that._onchangeMoneyCollection(oEvent, that);
						resolve(oTablaJSON);
					}
				);
				p1.then((oTablaJson) => {
					if (oTablaJson === false) {
						that.getView().setBusy(false);
						return;
					}

					var oDialog = that.mDialogs[sDialogName];
					//Crear dialogo si no existe
					if (!oDialog) {
						oDialog = new DialogCambioMoneda(that.getView());
						that.mDialogs[sDialogName] = oDialog;
						oDialog.setRouter(that.oRouter);
					}

					//Asignar modelo tipo JSON
					var oView = that.getView();
					var oJSON = new JSONModel();
					oView.setModel(oJSON, "CambioMonedaCollection");
					oJSON.setData(oTablaJson);
					//Mostrar dialogo
					oDialog.open();
					that.getView().setBusy(false);
				});
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name _onchangeMoneyCollection
			 * @param {object} oEvent Botón cerrar o aceptar dialogo centro
			 * @param {} oEvent that
			 * @desc coleccion de cambio de moneda
			 */
			_onchangeMoneyCollection: function (oEvent, that) {
				var oTable = that.byId("tableMainPP");
				//Validar Selección:
				var items = oTable.getSelectedIndices();
				if (items.length === 0) {
					MessageBox.error("Seleccione uno o más elementos");
					return false;
				}
				var ochangeMoneyTable = [];
				var aObjetos = [];
				//Unir elementos faltantes
				for (var i = 0; i < items.length; i++) {
					var item = items[i];
					var oRow2 = oTable.getContextByIndex(item).getObject(); //actualizado
					aObjetos.push(oRow2);
				}
				aObjetos = that._getMissingItems(aObjetos, that);
				//Generar Tabla de cambio de moneda:
				for (var oRow of aObjetos) {
					var sTxtMsg = "";
					var checkCurrEx = false; //No se va a poder anular a menos que el servicio diga OK
					if (oRow.status_status !== "FIN") {
						sTxtMsg = that._i18n.getText("errTrasUniSt", [oRow.serial, oRow.fundSubType_ID, oRow.secuence]);
						MessageToast.show(sTxtMsg);
						return false;
					}
					/*
					if (oRow.currency !== "USD") {
						var sTxtMsg = this._i18n.getText("errCambioMoneda", [oRow.serial, oRow.fundSubType_ID, oRow.secuence]);
						MessageToast.show(sTxtMsg);
						return false;
					}
					*/
					if (oRow.finSrv_finCode !== "DAIMLER") {
						sTxtMsg = that._i18n.getText("errCambMonUniSterrFinanciera", [oRow.serial, oRow.fundSubType_ID, oRow.secuence]);
						MessageToast.show(sTxtMsg);
						return false;
					}
					//La consulta, solo se deberá hacer para las unidades en MXN
					checkCurrEx = that._onchangeMoneyCollection_check(oRow.ID);
					//Si no es dolares, entonces debe haber estado en dólares, sino descartar.
					if (oRow.currency !== "USD" && !checkCurrEx) {
						sTxtMsg = that._i18n.getText("errCambioMonedaCurrEx", [oRow.serial, oRow.fundSubType_ID, oRow.secuence]);
						MessageToast.show(sTxtMsg);
						return false;
					}
					//Construir fila:
					var oNewRow = {
						"ID": oRow.ID,
						"companyCode": oRow.companyCode, //Sociedad
						"center": oRow.center, //Centro
						"serial": oRow.serial, //VIN
						"fundSubType_ID": oRow.fundSubType_ID, //Tipo de Finaciamiento
						"segment": oRow.segment, //Segmento
						"secuence": oRow.secuence, //Posicion 
						"currency": oRow.currency, //Moneda Financiamiento
						"costAmt": oRow.costAmt, //Importe Unidad
						"financedAmt": oRow.financedAmt, //Importe Financiado
						"balanceAmt": oRow.balanceAmt, //Saldo Financiamiento
						"dateStart": null, //fecha de inicio de financiamiento
						"newFinSrv_finCode": "", //Código de nueva financiera (New Financial Code)
						"accIncome": "", //Cuenta de Ingreso/InCome Account
						"finDays": "", //Dias de Financiamiento
						"dateEnd": "", //Fecha Fin
						"rateType": "", //Tipo de Tasa
						"rateValue": "", //Valor de Tasa
						"unidadID": oRow.unidadID, //UNIDAD ID
						"plateNum": oRow.plateNum, //Numero de placa
						"newcurrency": (!checkCurrEx) ? "MXN" : "",
						"checkCurrEx": checkCurrEx // Si es verdadero, se trata de anulación
					};
					ochangeMoneyTable.push(oNewRow);
				}
				return ochangeMoneyTable;
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name _onchangeMoneyCollection_check
			 * @param {string} IdFinItem
			 * @desc Va a consultar si el ID de financiamiento estuvo en dólares.
			 */
			_onchangeMoneyCollection_check: function (IdFinItem) {
				var res = false;
				var sUrl = this._getUrl()
					//Ubicacion servicio
					+ "/srv_api/function/checkCurrEx";
				//Generar Petición

				var oSend = {
					IdFinItem: IdFinItem
				};
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
				return res;
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name onhelp
			 * @param {event} oEvent heredado
			 * @desc Muestra la ventana de ayuda
			 */
			onhelp: function (oEvent) {
				var sDialogName = "DialogAyuda";
				this.mDialogs = this.mDialogs || {};

				var oDialog = this.mDialogs[sDialogName];
				//Crear instancia dialogo si no existe
				if (!oDialog) {
					oDialog = new DialogAyuda(this.getView());
					this.mDialogs[sDialogName] = oDialog;
					oDialog.setRouter(this.oRouter);
				}
				//Mostrar dialogo
				oDialog.open();
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name onDocView
			 * @param {event} oEvent heredado
			 * @desc Muestra la ventana de documentos
			 */
			onDocView: function (oEvent) {
				var sDialogName = "DialogViewDoc";
				this.mDialogs = this.mDialogs || {};
				//Obtener modelo para enviar
				var oDialog = this.mDialogs[sDialogName];
				//Crear dialogo
				if (!oDialog) {
					oDialog = new DialogViewDoc(this.getView());
					this.mDialogs[sDialogName] = oDialog;
					oDialog.setRouter(this.oRouter);
				}
				var oTableJSON = this._onDocViewJSON(oEvent);
				if (!oTableJSON) {
					return;
				}
				//Asignar modelo tipo JSON
				var oView = this.getView();
				var oJSON = new JSONModel();
				oView.setModel(oJSON, "ViewDocCollection");
				oJSON.setData(oTableJSON);
				//Mostrar dialogo
				oDialog.open();
				//Filtrar solo por IDS seleccionados:
				var aFilters = oTableJSON.map(function (element) {
					return new Filter("unidadID", FilterOperator.EQ, element.ID);
				});
				//Si no hubo IDS mostrar resultado falso:
				if (aFilters.length === 0) {
					aFilters.push(new Filter("BURKS", FilterOperator.EQ, "XXX"));
				}
				var aFiltersAnd = [];
				//Integrar filtro con OR
				var oFilterOr = new Filter({
					filters: aFilters,
					and: false
				});
				aFiltersAnd.push(oFilterOr);
				//Integrar filtro con AND
				var oFilterAll = new Filter({
					filters: aFiltersAnd,
					and: true
				});

				var oBinding = oDialog.getView().byId("tableViewDoc").getBinding("rows");
				oBinding.filter(oFilterAll);
				//Filtro vacio para detalle
				var oFilterVacio = new Filter({
					filters: [new Filter("Bukrs", FilterOperator.EQ, "XXX")],
					and: true
				});
				oBinding = oDialog.getView().byId("tableViewDocDet").getBinding("rows");
				oBinding.filter(oFilterVacio);
				oDialog.getView().byId("panelHead").setVisible(true).setExpanded(true);
				oDialog.getView().byId("panelDet").setVisible(false).setExpanded(false);
			},

			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name _onDocViewJSON
			 * @param {object} Evento heredado
			 * @desc Valida y genera la tabla para la vista de documentos
			 * @return oIDCollection - coleccion de datos de documentos;
			 */
			_onDocViewJSON: function (oEvent) {
				var oTable = this.byId("tableMainPP");
				var oIDCollection = [];
				//Validar Selección:
				var items = oTable.getSelectedIndices();
				if (items.length === 0) {
					MessageBox.error("Seleccione un elemento.");
					return false;
				}
				if (items.length > 1) {
					MessageBox.error("Seleccione únicamente un elemento.");
					return false;
				}
				//Generar Tabla:
				for (var i = 0; i < items.length; i++) {
					var item = items[i];
					var oRow = oTable.getContextByIndex(item).getObject();
					//Construir fila:
					var oNewRow = {
						"ID": oRow.unidadID
					};
					oIDCollection.push(oNewRow);
				}
				return oIDCollection;
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name onTablaInt
			 * @param {event} oEvent heredado
			 * @desc Tabla Interes
			 */
			onTablaInt: function (oEvent) {
				var oRow = oEvent.getSource().getBindingContext("modeloItems").getObject(); //Obtener el contexto deel boton por medio del oEvent
				var oModel = this.getView().getModel("HelpValues");
				oModel.setProperty("/ShowDayIntTable", oRow.displayDay);
				var oTableJSON = this._getInterestTable(oRow.ID);

				var sDialogName = "DialogTablaIntereses";
				this.mDialogs = this.mDialogs || {};
				//Obtener modelo para enviar
				var oDialog = this.mDialogs[sDialogName];
				//Crear dialogo
				if (!oDialog) {
					oDialog = new DialogTablaIntereses(this.getView());
					this.mDialogs[sDialogName] = oDialog;
					oDialog.setRouter(this.oRouter);
				}
				//Asignar modelo tipo JSON
				var oView = this.getView();
				var oJSON = new JSONModel();
				var context = oEvent.getSource().getBindingContext();
				oDialog._oControl.setBindingContext(context);
				oView.setModel(oJSON,
					"TabIntCollection");
				oJSON.setData([]);
				oView.setBusy(true);
				oTableJSON.then(data => {
					for (var elemento of data.value) {
						if (!elemento.bPayFlag) {
							elemento.bPayFlag = "No";
						} else {
							elemento.bPayFlag = "Si";
						}
					}
					oJSON.setData(data.value);
					oView.setBusy(false);
					//Mostrar dialogo
					oDialog.open();
				}, () => oView.setBusy(false));

			},

			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name _getInterestTable
			 * @param {event} oEvent heredado
			 * @desc Peticion al servicio getInterestTable para obtener los 
			 * Intereses del elemento selecionado
			 */
			_getInterestTable: function (IdFinItem) {
				var sUrl = this._getUrl()
					//Ubicacion servicio
					+ "/srv_api/function/getInterestTable";
				//Generar Petición
				var oSend = {
					IDFinancedItem: [IdFinItem]
				};
				return $.ajax({
					url: sUrl,
					type: "POST",
					dataType: "json",
					contentType: "application/json; charset=utf-8",
					data: JSON.stringify(oSend)
				});
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name _getMissingItems
			 * @param {array} aOriginalList Lista de elementos ya existentes
			 * @desc Combinar elementos con los elementos no seleccionados.
			 */
			_getMissingItems: function (aOriginalList, that) {
				var sUrl = that._getUrl()
					//Ubicacion servicio
					+ "/srv_api/function/getRelatedItems";
				//Generar Petición
				var oSend = {
					Input: aOriginalList.map(x => {
						return x.ID;
					})
				};
				$.ajax({
					url: sUrl,
					type: "POST",
					dataType: "json",
					contentType: "application/json; charset=utf-8",
					async: false,
					data: JSON.stringify(oSend)
				}).then(function (data) {
					aOriginalList = [...aOriginalList, ...data.value];
				});
				return aOriginalList;
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name onLayoutDown
			 *  @param {object} Evento heredado
			 * @return {array} Lista elementos combinada
			 * @desc Muestra dialogo de descarga Layouts
			 */
			onLayoutDown: function (oEvent) {
				var sDialogName = "DialogViewLayouts";
				this.mDialogs = this.mDialogs || {};
				this.getView().setBusy(true);
				this.getView().setBusyIndicatorDelay(0);
				var that = this;
				//Obtener modelo para enviar
				var p1 = new Promise(

					function (resolve, reject) {
						var oTablaJSON = that._onLayoutDownloadCollection(oEvent, that);
						resolve(oTablaJSON);
					}
				);
				p1.then((oTablaJson) => {
					if (oTablaJson === false) {
						that.getView().setBusy(false);
						return;
					}
					var oDialog = that.mDialogs[sDialogName];
					//Crear dialogo si no existe
					if (!oDialog) {
						oDialog = new DialogViewLayouts(that.getView());
						that.mDialogs[sDialogName] = oDialog;
						oDialog.setRouter(that.oRouter);
					}
					//Asignar modelo tipo JSON
					var oView = that.getView();
					var oJSON = new JSONModel();
					oView.setModel(oJSON, "LayDwnCollection");
					oJSON.setData(oTablaJson);
					//Mostrar dialogo
					oDialog.open();
					that.getView().setBusy(false);
				});
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name _onLayoutDownloadCollection
			 *  @param {object} Evento heredado
			 * @return {array} Lista elementos combinada
			 * @desc Genera modelo JSON con elementos a descargar
			 */
			_onLayoutDownloadCollection: function (oEvent, that) {
				var oTable = that.byId("tableMainPP");
				//Validar Selección:
				var items = oTable.getSelectedIndices();
				if (items.length === 0) {
					MessageBox.error("Seleccione uno o más elementos");
					return false;
				}
				//Generar unir unidades a traspasar con las no seleccionadas:
				var aObjetos = [];
				//Unir elementos faltantes
				for (var i = 0; i < items.length; i++) {
					var item = items[i];
					var oRow = oTable.getContextByIndex(item).getObject(); //actualizado
					aObjetos.push(oRow);
				}
				return that._getLayoutsList(aObjetos, that);
			},
			/** 
			 * @author Jorge Bustillos
			 * @function
			 * @name _getLayoutsList
			 * @return {array} aRes Lista elementos combinada
			 * @desc Obtiene el dato desde SRV
			 */
			_getLayoutsList: function (aObjetos, that) {
				var sUrl = that._getUrl()
					//Ubicacion servicio
					+ "/srv_api/function/getLayoutList";
				//Generar Petición
				var oSend = {
					Input: aObjetos.map(x => {
						return x.unidadID;
					})
				};
				var aRes = [];
				$.ajax({
					url: sUrl,
					type: "POST",
					dataType: "json",
					contentType: "application/json; charset=utf-8",
					async: false,
					data: JSON.stringify(oSend)
				}).then(function (data) {
					aRes = data.value;
				});
				return aRes;
			}
		});
	});