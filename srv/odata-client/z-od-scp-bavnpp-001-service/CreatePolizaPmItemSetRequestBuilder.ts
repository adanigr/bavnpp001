/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder } from '@sap-cloud-sdk/core';
import { CreatePolizaPmItemSet } from './CreatePolizaPmItemSet';

/**
 * Request builder class for operations supported on the [[CreatePolizaPmItemSet]] entity.
 */
export class CreatePolizaPmItemSetRequestBuilder extends RequestBuilder<CreatePolizaPmItemSet> {
  /**
   * Returns a request builder for retrieving one `CreatePolizaPmItemSet` entity based on its keys.
   * @param hdid Key property. See [[CreatePolizaPmItemSet.hdid]].
   * @returns A request builder for creating requests to retrieve one `CreatePolizaPmItemSet` entity based on its keys.
   */
  getByKey(hdid: string): GetByKeyRequestBuilder<CreatePolizaPmItemSet> {
    return new GetByKeyRequestBuilder(CreatePolizaPmItemSet, { Hdid: hdid });
  }

  /**
   * Returns a request builder for querying all `CreatePolizaPmItemSet` entities.
   * @returns A request builder for creating requests to retrieve all `CreatePolizaPmItemSet` entities.
   */
  getAll(): GetAllRequestBuilder<CreatePolizaPmItemSet> {
    return new GetAllRequestBuilder(CreatePolizaPmItemSet);
  }

  /**
   * Returns a request builder for creating a `CreatePolizaPmItemSet` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `CreatePolizaPmItemSet`.
   */
  create(entity: CreatePolizaPmItemSet): CreateRequestBuilder<CreatePolizaPmItemSet> {
    return new CreateRequestBuilder(CreatePolizaPmItemSet, entity);
  }
}
