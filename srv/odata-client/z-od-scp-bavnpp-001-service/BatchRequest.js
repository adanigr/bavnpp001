"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultZOdScpBavnpp001ServicePath = exports.changeset = exports.batch = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
var index_1 = require("./index");
/**
 * Batch builder for operations supported on the Z Od Scp Bavnpp 001 Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
function batch() {
    var requests = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        requests[_i] = arguments[_i];
    }
    return new core_1.ODataBatchRequestBuilder(exports.defaultZOdScpBavnpp001ServicePath, requests, map);
}
exports.batch = batch;
/**
 * Change set constructor consists of write operations supported on the Z Od Scp Bavnpp 001 Service.
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
exports.defaultZOdScpBavnpp001ServicePath = '/sap/opu/odata/sap/Z_OD_SCP_BAVNPP001_SRV';
var map = { 'CreateFinDocSet': index_1.CreateFinDocSet, 'ItemsSet': index_1.ItemsSet, 'RetSet': index_1.RetSet, 'CancelFinDocSet': index_1.CancelFinDocSet, 'InfoVtasSet': index_1.InfoVtasSet, 'Bancos_ProveedorSet': index_1.Bancos_ProveedorSet, 'Bancos_PropiosSet': index_1.Bancos_PropiosSet, 'ActFij_PPSet': index_1.ActFij_PpSet, 'CreatePolizaPMSet': index_1.CreatePolizaPmSet, 'CreatePolizaPMItemSet': index_1.CreatePolizaPmItemSet };
//# sourceMappingURL=BatchRequest.js.map