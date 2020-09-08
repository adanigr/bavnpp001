/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CreateRequestBuilder, DeleteRequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder, ODataBatchChangeSet, ODataBatchRequestBuilder, UpdateRequestBuilder } from '@sap-cloud-sdk/core';
import { AlmacenesSet, NombreCuentaSet, PropuestaPagoSet, CaracteriticasSet, Almacenes001Set, CaracteriticasV2Set, SociedadSet, CentrosSet, SegmentosSet, TipoCambioSet, UpdtVinMatriculaSet, Segmentos001Set, ModenasAppSet, FdHdSet, FdItemsSet, PaiseSet } from './index';

/**
 * Batch builder for operations supported on the Z Od Scp Core 0001 Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
export function batch(...requests: Array<ReadZOdScpCore0001ServiceRequestBuilder | ODataBatchChangeSet<WriteZOdScpCore0001ServiceRequestBuilder>>): ODataBatchRequestBuilder {
  return new ODataBatchRequestBuilder(defaultZOdScpCore0001ServicePath, requests, map);
}

/**
 * Change set constructor consists of write operations supported on the Z Od Scp Core 0001 Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
export function changeset(...requests: WriteZOdScpCore0001ServiceRequestBuilder[]): ODataBatchChangeSet<WriteZOdScpCore0001ServiceRequestBuilder> {
  return new ODataBatchChangeSet(requests);
}

export const defaultZOdScpCore0001ServicePath = '/sap/opu/odata/sap/Z_OD_SCP_CORE_0001_SRV';
const map = { 'AlmacenesSet': AlmacenesSet, 'NombreCuentaSet': NombreCuentaSet, 'PropuestaPagoSet': PropuestaPagoSet, 'CaracteriticasSet': CaracteriticasSet, 'Almacenes001Set': Almacenes001Set, 'CaracteriticasV2Set': CaracteriticasV2Set, 'SociedadSet': SociedadSet, 'CentrosSet': CentrosSet, 'SegmentosSet': SegmentosSet, 'TipoCambioSet': TipoCambioSet, 'UpdtVinMatriculaSet': UpdtVinMatriculaSet, 'Segmentos001Set': Segmentos001Set, 'ModenasAppSet': ModenasAppSet, 'FdHDSet': FdHdSet, 'FdItemsSet': FdItemsSet, 'PaiseSet': PaiseSet };
export type ReadZOdScpCore0001ServiceRequestBuilder = GetAllRequestBuilder<AlmacenesSet> | GetAllRequestBuilder<NombreCuentaSet> | GetAllRequestBuilder<PropuestaPagoSet> | GetAllRequestBuilder<CaracteriticasSet> | GetAllRequestBuilder<Almacenes001Set> | GetAllRequestBuilder<CaracteriticasV2Set> | GetAllRequestBuilder<SociedadSet> | GetAllRequestBuilder<CentrosSet> | GetAllRequestBuilder<SegmentosSet> | GetAllRequestBuilder<TipoCambioSet> | GetAllRequestBuilder<UpdtVinMatriculaSet> | GetAllRequestBuilder<Segmentos001Set> | GetAllRequestBuilder<ModenasAppSet> | GetAllRequestBuilder<FdHdSet> | GetAllRequestBuilder<FdItemsSet> | GetAllRequestBuilder<PaiseSet> | GetByKeyRequestBuilder<AlmacenesSet> | GetByKeyRequestBuilder<NombreCuentaSet> | GetByKeyRequestBuilder<PropuestaPagoSet> | GetByKeyRequestBuilder<CaracteriticasSet> | GetByKeyRequestBuilder<Almacenes001Set> | GetByKeyRequestBuilder<CaracteriticasV2Set> | GetByKeyRequestBuilder<SociedadSet> | GetByKeyRequestBuilder<CentrosSet> | GetByKeyRequestBuilder<SegmentosSet> | GetByKeyRequestBuilder<TipoCambioSet> | GetByKeyRequestBuilder<UpdtVinMatriculaSet> | GetByKeyRequestBuilder<Segmentos001Set> | GetByKeyRequestBuilder<ModenasAppSet> | GetByKeyRequestBuilder<FdHdSet> | GetByKeyRequestBuilder<FdItemsSet> | GetByKeyRequestBuilder<PaiseSet>;
export type WriteZOdScpCore0001ServiceRequestBuilder = CreateRequestBuilder<AlmacenesSet> | UpdateRequestBuilder<AlmacenesSet> | DeleteRequestBuilder<AlmacenesSet> | CreateRequestBuilder<NombreCuentaSet> | UpdateRequestBuilder<NombreCuentaSet> | DeleteRequestBuilder<NombreCuentaSet> | CreateRequestBuilder<PropuestaPagoSet> | UpdateRequestBuilder<PropuestaPagoSet> | DeleteRequestBuilder<PropuestaPagoSet> | CreateRequestBuilder<CaracteriticasSet> | UpdateRequestBuilder<CaracteriticasSet> | DeleteRequestBuilder<CaracteriticasSet> | CreateRequestBuilder<Almacenes001Set> | UpdateRequestBuilder<Almacenes001Set> | DeleteRequestBuilder<Almacenes001Set> | CreateRequestBuilder<CaracteriticasV2Set> | UpdateRequestBuilder<CaracteriticasV2Set> | DeleteRequestBuilder<CaracteriticasV2Set> | CreateRequestBuilder<SociedadSet> | UpdateRequestBuilder<SociedadSet> | DeleteRequestBuilder<SociedadSet> | CreateRequestBuilder<CentrosSet> | UpdateRequestBuilder<CentrosSet> | DeleteRequestBuilder<CentrosSet> | CreateRequestBuilder<SegmentosSet> | UpdateRequestBuilder<SegmentosSet> | DeleteRequestBuilder<SegmentosSet> | CreateRequestBuilder<TipoCambioSet> | UpdateRequestBuilder<TipoCambioSet> | DeleteRequestBuilder<TipoCambioSet> | CreateRequestBuilder<UpdtVinMatriculaSet> | UpdateRequestBuilder<UpdtVinMatriculaSet> | DeleteRequestBuilder<UpdtVinMatriculaSet> | CreateRequestBuilder<Segmentos001Set> | UpdateRequestBuilder<Segmentos001Set> | DeleteRequestBuilder<Segmentos001Set> | CreateRequestBuilder<ModenasAppSet> | UpdateRequestBuilder<ModenasAppSet> | DeleteRequestBuilder<ModenasAppSet> | CreateRequestBuilder<FdHdSet> | UpdateRequestBuilder<FdHdSet> | DeleteRequestBuilder<FdHdSet> | CreateRequestBuilder<FdItemsSet> | UpdateRequestBuilder<FdItemsSet> | DeleteRequestBuilder<FdItemsSet> | CreateRequestBuilder<PaiseSet> | UpdateRequestBuilder<PaiseSet> | DeleteRequestBuilder<PaiseSet>;
