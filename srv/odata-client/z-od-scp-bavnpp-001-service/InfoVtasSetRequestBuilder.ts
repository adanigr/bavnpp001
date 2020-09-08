/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder } from '@sap-cloud-sdk/core';
import { InfoVtasSet } from './InfoVtasSet';

/**
 * Request builder class for operations supported on the [[InfoVtasSet]] entity.
 */
export class InfoVtasSetRequestBuilder extends RequestBuilder<InfoVtasSet> {
  /**
   * Returns a request builder for retrieving one `InfoVtasSet` entity based on its keys.
   * @param idvehi Key property. See [[InfoVtasSet.idvehi]].
   * @returns A request builder for creating requests to retrieve one `InfoVtasSet` entity based on its keys.
   */
  getByKey(idvehi: string): GetByKeyRequestBuilder<InfoVtasSet> {
    return new GetByKeyRequestBuilder(InfoVtasSet, { Idvehi: idvehi });
  }

  /**
   * Returns a request builder for querying all `InfoVtasSet` entities.
   * @returns A request builder for creating requests to retrieve all `InfoVtasSet` entities.
   */
  getAll(): GetAllRequestBuilder<InfoVtasSet> {
    return new GetAllRequestBuilder(InfoVtasSet);
  }
}
