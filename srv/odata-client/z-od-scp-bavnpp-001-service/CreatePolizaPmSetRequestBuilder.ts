/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder } from '@sap-cloud-sdk/core';
import { CreatePolizaPmSet } from './CreatePolizaPmSet';

/**
 * Request builder class for operations supported on the [[CreatePolizaPmSet]] entity.
 */
export class CreatePolizaPmSetRequestBuilder extends RequestBuilder<CreatePolizaPmSet> {
  /**
   * Returns a request builder for retrieving one `CreatePolizaPmSet` entity based on its keys.
   * @param hdtext Key property. See [[CreatePolizaPmSet.hdtext]].
   * @returns A request builder for creating requests to retrieve one `CreatePolizaPmSet` entity based on its keys.
   */
  getByKey(hdtext: string): GetByKeyRequestBuilder<CreatePolizaPmSet> {
    return new GetByKeyRequestBuilder(CreatePolizaPmSet, { Hdtext: hdtext });
  }

  /**
   * Returns a request builder for querying all `CreatePolizaPmSet` entities.
   * @returns A request builder for creating requests to retrieve all `CreatePolizaPmSet` entities.
   */
  getAll(): GetAllRequestBuilder<CreatePolizaPmSet> {
    return new GetAllRequestBuilder(CreatePolizaPmSet);
  }

  /**
   * Returns a request builder for creating a `CreatePolizaPmSet` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `CreatePolizaPmSet`.
   */
  create(entity: CreatePolizaPmSet): CreateRequestBuilder<CreatePolizaPmSet> {
    return new CreateRequestBuilder(CreatePolizaPmSet, entity);
  }
}
