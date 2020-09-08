/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder } from '@sap-cloud-sdk/core';
import { CaracteriticasV2Set } from './CaracteriticasV2Set';

/**
 * Request builder class for operations supported on the [[CaracteriticasV2Set]] entity.
 */
export class CaracteriticasV2SetRequestBuilder extends RequestBuilder<CaracteriticasV2Set> {
  /**
   * Returns a request builder for retrieving one `CaracteriticasV2Set` entity based on its keys.
   * @param caractname Key property. See [[CaracteriticasV2Set.caractname]].
   * @param caractvalcode Key property. See [[CaracteriticasV2Set.caractvalcode]].
   * @returns A request builder for creating requests to retrieve one `CaracteriticasV2Set` entity based on its keys.
   */
  getByKey(caractname: string, caractvalcode: string): GetByKeyRequestBuilder<CaracteriticasV2Set> {
    return new GetByKeyRequestBuilder(CaracteriticasV2Set, {
      CARACTNAME: caractname,
      CARACTVALCODE: caractvalcode
    });
  }

  /**
   * Returns a request builder for querying all `CaracteriticasV2Set` entities.
   * @returns A request builder for creating requests to retrieve all `CaracteriticasV2Set` entities.
   */
  getAll(): GetAllRequestBuilder<CaracteriticasV2Set> {
    return new GetAllRequestBuilder(CaracteriticasV2Set);
  }
}
