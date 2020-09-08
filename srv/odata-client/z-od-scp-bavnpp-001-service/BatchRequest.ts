/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CreateRequestBuilder, DeleteRequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder, ODataBatchChangeSet, ODataBatchRequestBuilder, UpdateRequestBuilder } from '@sap-cloud-sdk/core';
import { CreateFinDocSet, ItemsSet, RetSet, CancelFinDocSet, InfoVtasSet, Bancos_ProveedorSet, Bancos_PropiosSet, ActFij_PpSet, CreatePolizaPmSet, CreatePolizaPmItemSet } from './index';

/**
 * Batch builder for operations supported on the Z Od Scp Bavnpp 001 Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
export function batch(...requests: Array<ReadZOdScpBavnpp001ServiceRequestBuilder | ODataBatchChangeSet<WriteZOdScpBavnpp001ServiceRequestBuilder>>): ODataBatchRequestBuilder {
  return new ODataBatchRequestBuilder(defaultZOdScpBavnpp001ServicePath, requests, map);
}

/**
 * Change set constructor consists of write operations supported on the Z Od Scp Bavnpp 001 Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
export function changeset(...requests: WriteZOdScpBavnpp001ServiceRequestBuilder[]): ODataBatchChangeSet<WriteZOdScpBavnpp001ServiceRequestBuilder> {
  return new ODataBatchChangeSet(requests);
}

export const defaultZOdScpBavnpp001ServicePath = '/sap/opu/odata/sap/Z_OD_SCP_BAVNPP001_SRV';
const map = { 'CreateFinDocSet': CreateFinDocSet, 'ItemsSet': ItemsSet, 'RetSet': RetSet, 'CancelFinDocSet': CancelFinDocSet, 'InfoVtasSet': InfoVtasSet, 'Bancos_ProveedorSet': Bancos_ProveedorSet, 'Bancos_PropiosSet': Bancos_PropiosSet, 'ActFij_PPSet': ActFij_PpSet, 'CreatePolizaPMSet': CreatePolizaPmSet, 'CreatePolizaPMItemSet': CreatePolizaPmItemSet };
export type ReadZOdScpBavnpp001ServiceRequestBuilder = GetAllRequestBuilder<CreateFinDocSet> | GetAllRequestBuilder<ItemsSet> | GetAllRequestBuilder<RetSet> | GetAllRequestBuilder<CancelFinDocSet> | GetAllRequestBuilder<InfoVtasSet> | GetAllRequestBuilder<Bancos_ProveedorSet> | GetAllRequestBuilder<Bancos_PropiosSet> | GetAllRequestBuilder<ActFij_PpSet> | GetAllRequestBuilder<CreatePolizaPmSet> | GetAllRequestBuilder<CreatePolizaPmItemSet> | GetByKeyRequestBuilder<CreateFinDocSet> | GetByKeyRequestBuilder<ItemsSet> | GetByKeyRequestBuilder<RetSet> | GetByKeyRequestBuilder<CancelFinDocSet> | GetByKeyRequestBuilder<InfoVtasSet> | GetByKeyRequestBuilder<Bancos_ProveedorSet> | GetByKeyRequestBuilder<Bancos_PropiosSet> | GetByKeyRequestBuilder<ActFij_PpSet> | GetByKeyRequestBuilder<CreatePolizaPmSet> | GetByKeyRequestBuilder<CreatePolizaPmItemSet>;
export type WriteZOdScpBavnpp001ServiceRequestBuilder = CreateRequestBuilder<CreateFinDocSet> | UpdateRequestBuilder<CreateFinDocSet> | DeleteRequestBuilder<CreateFinDocSet> | CreateRequestBuilder<ItemsSet> | UpdateRequestBuilder<ItemsSet> | DeleteRequestBuilder<ItemsSet> | CreateRequestBuilder<RetSet> | UpdateRequestBuilder<RetSet> | DeleteRequestBuilder<RetSet> | CreateRequestBuilder<CancelFinDocSet> | UpdateRequestBuilder<CancelFinDocSet> | DeleteRequestBuilder<CancelFinDocSet> | CreateRequestBuilder<InfoVtasSet> | UpdateRequestBuilder<InfoVtasSet> | DeleteRequestBuilder<InfoVtasSet> | CreateRequestBuilder<Bancos_ProveedorSet> | UpdateRequestBuilder<Bancos_ProveedorSet> | DeleteRequestBuilder<Bancos_ProveedorSet> | CreateRequestBuilder<Bancos_PropiosSet> | UpdateRequestBuilder<Bancos_PropiosSet> | DeleteRequestBuilder<Bancos_PropiosSet> | CreateRequestBuilder<ActFij_PpSet> | UpdateRequestBuilder<ActFij_PpSet> | DeleteRequestBuilder<ActFij_PpSet> | CreateRequestBuilder<CreatePolizaPmSet> | UpdateRequestBuilder<CreatePolizaPmSet> | DeleteRequestBuilder<CreatePolizaPmSet> | CreateRequestBuilder<CreatePolizaPmItemSet> | UpdateRequestBuilder<CreatePolizaPmItemSet> | DeleteRequestBuilder<CreatePolizaPmItemSet>;
