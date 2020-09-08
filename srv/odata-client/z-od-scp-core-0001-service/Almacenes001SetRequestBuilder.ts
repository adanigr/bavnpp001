/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder } from '@sap-cloud-sdk/core';
import { Almacenes001Set } from './Almacenes001Set';

/**
 * Request builder class for operations supported on the [[Almacenes001Set]] entity.
 */
export class Almacenes001SetRequestBuilder extends RequestBuilder<Almacenes001Set> {
  /**
   * Returns a request builder for retrieving one `Almacenes001Set` entity based on its keys.
   * @param werks Key property. See [[Almacenes001Set.werks]].
   * @param lgort Key property. See [[Almacenes001Set.lgort]].
   * @returns A request builder for creating requests to retrieve one `Almacenes001Set` entity based on its keys.
   */
  getByKey(werks: string, lgort: string): GetByKeyRequestBuilder<Almacenes001Set> {
    return new GetByKeyRequestBuilder(Almacenes001Set, {
      Werks: werks,
      Lgort: lgort
    });
  }

  /**
   * Returns a request builder for querying all `Almacenes001Set` entities.
   * @returns A request builder for creating requests to retrieve all `Almacenes001Set` entities.
   */
  getAll(): GetAllRequestBuilder<Almacenes001Set> {
    return new GetAllRequestBuilder(Almacenes001Set);
  }
}
