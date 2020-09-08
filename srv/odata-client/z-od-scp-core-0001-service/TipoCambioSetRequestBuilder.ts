/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder } from '@sap-cloud-sdk/core';
import { TipoCambioSet } from './TipoCambioSet';

/**
 * Request builder class for operations supported on the [[TipoCambioSet]] entity.
 */
export class TipoCambioSetRequestBuilder extends RequestBuilder<TipoCambioSet> {
  /**
   * Returns a request builder for retrieving one `TipoCambioSet` entity based on its keys.
   * @param kurst Key property. See [[TipoCambioSet.kurst]].
   * @param fcurr Key property. See [[TipoCambioSet.fcurr]].
   * @param tcurr Key property. See [[TipoCambioSet.tcurr]].
   * @param gdatu Key property. See [[TipoCambioSet.gdatu]].
   * @returns A request builder for creating requests to retrieve one `TipoCambioSet` entity based on its keys.
   */
  getByKey(kurst: string, fcurr: string, tcurr: string, gdatu: string): GetByKeyRequestBuilder<TipoCambioSet> {
    return new GetByKeyRequestBuilder(TipoCambioSet, {
      Kurst: kurst,
      Fcurr: fcurr,
      Tcurr: tcurr,
      Gdatu: gdatu
    });
  }

  /**
   * Returns a request builder for querying all `TipoCambioSet` entities.
   * @returns A request builder for creating requests to retrieve all `TipoCambioSet` entities.
   */
  getAll(): GetAllRequestBuilder<TipoCambioSet> {
    return new GetAllRequestBuilder(TipoCambioSet);
  }
}
