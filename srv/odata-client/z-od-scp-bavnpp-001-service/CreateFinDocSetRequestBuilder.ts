/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder } from '@sap-cloud-sdk/core';
import { CreateFinDocSet } from './CreateFinDocSet';

/**
 * Request builder class for operations supported on the [[CreateFinDocSet]] entity.
 */
export class CreateFinDocSetRequestBuilder extends RequestBuilder<CreateFinDocSet> {
  /**
   * Returns a request builder for retrieving one `CreateFinDocSet` entity based on its keys.
   * @param hdid Key property. See [[CreateFinDocSet.hdid]].
   * @returns A request builder for creating requests to retrieve one `CreateFinDocSet` entity based on its keys.
   */
  getByKey(hdid: string): GetByKeyRequestBuilder<CreateFinDocSet> {
    return new GetByKeyRequestBuilder(CreateFinDocSet, { Hdid: hdid });
  }

  /**
   * Returns a request builder for querying all `CreateFinDocSet` entities.
   * @returns A request builder for creating requests to retrieve all `CreateFinDocSet` entities.
   */
  getAll(): GetAllRequestBuilder<CreateFinDocSet> {
    return new GetAllRequestBuilder(CreateFinDocSet);
  }

  /**
   * Returns a request builder for creating a `CreateFinDocSet` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `CreateFinDocSet`.
   */
  create(entity: CreateFinDocSet): CreateRequestBuilder<CreateFinDocSet> {
    return new CreateRequestBuilder(CreateFinDocSet, entity);
  }
}
