/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder } from '@sap-cloud-sdk/core';
import { AlmacenesSet } from './AlmacenesSet';

/**
 * Request builder class for operations supported on the [[AlmacenesSet]] entity.
 */
export class AlmacenesSetRequestBuilder extends RequestBuilder<AlmacenesSet> {
  /**
   * Returns a request builder for retrieving one `AlmacenesSet` entity based on its keys.
   * @param werks Key property. See [[AlmacenesSet.werks]].
   * @param lgort Key property. See [[AlmacenesSet.lgort]].
   * @returns A request builder for creating requests to retrieve one `AlmacenesSet` entity based on its keys.
   */
  getByKey(werks: string, lgort: string): GetByKeyRequestBuilder<AlmacenesSet> {
    return new GetByKeyRequestBuilder(AlmacenesSet, {
      Werks: werks,
      Lgort: lgort
    });
  }

  /**
   * Returns a request builder for querying all `AlmacenesSet` entities.
   * @returns A request builder for creating requests to retrieve all `AlmacenesSet` entities.
   */
  getAll(): GetAllRequestBuilder<AlmacenesSet> {
    return new GetAllRequestBuilder(AlmacenesSet);
  }
}
