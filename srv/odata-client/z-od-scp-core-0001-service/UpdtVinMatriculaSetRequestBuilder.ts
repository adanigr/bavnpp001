/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder } from '@sap-cloud-sdk/core';
import { UpdtVinMatriculaSet } from './UpdtVinMatriculaSet';

/**
 * Request builder class for operations supported on the [[UpdtVinMatriculaSet]] entity.
 */
export class UpdtVinMatriculaSetRequestBuilder extends RequestBuilder<UpdtVinMatriculaSet> {
  /**
   * Returns a request builder for retrieving one `UpdtVinMatriculaSet` entity based on its keys.
   * @param idvehi Key property. See [[UpdtVinMatriculaSet.idvehi]].
   * @returns A request builder for creating requests to retrieve one `UpdtVinMatriculaSet` entity based on its keys.
   */
  getByKey(idvehi: string): GetByKeyRequestBuilder<UpdtVinMatriculaSet> {
    return new GetByKeyRequestBuilder(UpdtVinMatriculaSet, { Idvehi: idvehi });
  }

  /**
   * Returns a request builder for querying all `UpdtVinMatriculaSet` entities.
   * @returns A request builder for creating requests to retrieve all `UpdtVinMatriculaSet` entities.
   */
  getAll(): GetAllRequestBuilder<UpdtVinMatriculaSet> {
    return new GetAllRequestBuilder(UpdtVinMatriculaSet);
  }

  /**
   * Returns a request builder for creating a `UpdtVinMatriculaSet` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `UpdtVinMatriculaSet`.
   */
  create(entity: UpdtVinMatriculaSet): CreateRequestBuilder<UpdtVinMatriculaSet> {
    return new CreateRequestBuilder(UpdtVinMatriculaSet, entity);
  }
}
