/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder } from '@sap-cloud-sdk/core';
import { CentrosSet } from './CentrosSet';

/**
 * Request builder class for operations supported on the [[CentrosSet]] entity.
 */
export class CentrosSetRequestBuilder extends RequestBuilder<CentrosSet> {
  /**
   * Returns a request builder for retrieving one `CentrosSet` entity based on its keys.
   * @param bukrs Key property. See [[CentrosSet.bukrs]].
   * @param werks Key property. See [[CentrosSet.werks]].
   * @returns A request builder for creating requests to retrieve one `CentrosSet` entity based on its keys.
   */
  getByKey(bukrs: string, werks: string): GetByKeyRequestBuilder<CentrosSet> {
    return new GetByKeyRequestBuilder(CentrosSet, {
      Bukrs: bukrs,
      Werks: werks
    });
  }

  /**
   * Returns a request builder for querying all `CentrosSet` entities.
   * @returns A request builder for creating requests to retrieve all `CentrosSet` entities.
   */
  getAll(): GetAllRequestBuilder<CentrosSet> {
    return new GetAllRequestBuilder(CentrosSet);
  }
}
