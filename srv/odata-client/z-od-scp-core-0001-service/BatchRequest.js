"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
var index_1 = require("./index");
/**
 * Batch builder for operations supported on the Z Od Scp Core 0001 Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
function batch() {
    var requests = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        requests[_i] = arguments[_i];
    }
    return new core_1.ODataBatchRequestBuilder(exports.defaultZOdScpCore0001ServicePath, requests, map);
}
exports.batch = batch;
/**
 * Change set constructor consists of write operations supported on the Z Od Scp Core 0001 Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
function changeset() {
    var requests = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        requests[_i] = arguments[_i];
    }
    return new core_1.ODataBatchChangeSet(requests);
}
exports.changeset = changeset;
exports.defaultZOdScpCore0001ServicePath = '/sap/opu/odata/sap/Z_OD_SCP_CORE_0001_SRV';
var map = { 'AlmacenesSet': index_1.AlmacenesSet, 'NombreCuentaSet': index_1.NombreCuentaSet, 'PropuestaPagoSet': index_1.PropuestaPagoSet, 'CaracteriticasSet': index_1.CaracteriticasSet, 'Almacenes001Set': index_1.Almacenes001Set, 'CaracteriticasV2Set': index_1.CaracteriticasV2Set, 'SociedadSet': index_1.SociedadSet, 'CentrosSet': index_1.CentrosSet, 'SegmentosSet': index_1.SegmentosSet, 'TipoCambioSet': index_1.TipoCambioSet, 'UpdtVinMatriculaSet': index_1.UpdtVinMatriculaSet, 'Segmentos001Set': index_1.Segmentos001Set, 'ModenasAppSet': index_1.ModenasAppSet, 'FdHDSet': index_1.FdHdSet, 'FdItemsSet': index_1.FdItemsSet, 'PaiseSet': index_1.PaiseSet };
//# sourceMappingURL=BatchRequest.js.map