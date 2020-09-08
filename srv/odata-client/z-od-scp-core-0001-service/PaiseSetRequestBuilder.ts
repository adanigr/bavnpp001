/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder } from '@sap-cloud-sdk/core';
import { PaiseSet } from './PaiseSet';

/**
 * Request builder class for operations supported on the [[PaiseSet]] entity.
 */
export class PaiseSetRequestBuilder extends RequestBuilder<PaiseSet> {
  /**
   * Returns a request builder for retrieving one `PaiseSet` entity based on its keys.
   * @param spras Key property. See [[PaiseSet.spras]].
   * @param land1 Key property. See [[PaiseSet.land1]].
   * @returns A request builder for creating requests to retrieve one `PaiseSet` entity based on its keys.
   */
  getByKey(spras: string, land1: string): GetByKeyRequestBuilder<PaiseSet> {
    return new GetByKeyRequestBuilder(PaiseSet, {
      Spras: spras,
      Land1: land1
    });
  }

  /**
   * Returns a request builder for querying all `PaiseSet` entities.
   * @returns A request builder for creating requests to retrieve all `PaiseSet` entities.
   */
  getAll(): GetAllRequestBuilder<PaiseSet> {
    return new GetAllRequestBuilder(PaiseSet);
  }
}
