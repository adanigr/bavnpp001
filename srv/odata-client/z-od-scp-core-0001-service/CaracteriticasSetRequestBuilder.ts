/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder } from '@sap-cloud-sdk/core';
import { CaracteriticasSet } from './CaracteriticasSet';

/**
 * Request builder class for operations supported on the [[CaracteriticasSet]] entity.
 */
export class CaracteriticasSetRequestBuilder extends RequestBuilder<CaracteriticasSet> {
  /**
   * Returns a request builder for retrieving one `CaracteriticasSet` entity based on its keys.
   * @param charactname Key property. See [[CaracteriticasSet.charactname]].
   * @returns A request builder for creating requests to retrieve one `CaracteriticasSet` entity based on its keys.
   */
  getByKey(charactname: string): GetByKeyRequestBuilder<CaracteriticasSet> {
    return new GetByKeyRequestBuilder(CaracteriticasSet, { Charactname: charactname });
  }

  /**
   * Returns a request builder for querying all `CaracteriticasSet` entities.
   * @returns A request builder for creating requests to retrieve all `CaracteriticasSet` entities.
   */
  getAll(): GetAllRequestBuilder<CaracteriticasSet> {
    return new GetAllRequestBuilder(CaracteriticasSet);
  }
}
