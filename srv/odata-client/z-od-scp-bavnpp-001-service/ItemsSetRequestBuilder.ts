/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder } from '@sap-cloud-sdk/core';
import { ItemsSet } from './ItemsSet';

/**
 * Request builder class for operations supported on the [[ItemsSet]] entity.
 */
export class ItemsSetRequestBuilder extends RequestBuilder<ItemsSet> {
  /**
   * Returns a request builder for retrieving one `ItemsSet` entity based on its keys.
   * @param hdid Key property. See [[ItemsSet.hdid]].
   * @returns A request builder for creating requests to retrieve one `ItemsSet` entity based on its keys.
   */
  getByKey(hdid: string): GetByKeyRequestBuilder<ItemsSet> {
    return new GetByKeyRequestBuilder(ItemsSet, { Hdid: hdid });
  }

  /**
   * Returns a request builder for querying all `ItemsSet` entities.
   * @returns A request builder for creating requests to retrieve all `ItemsSet` entities.
   */
  getAll(): GetAllRequestBuilder<ItemsSet> {
    return new GetAllRequestBuilder(ItemsSet);
  }

  /**
   * Returns a request builder for creating a `ItemsSet` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `ItemsSet`.
   */
  create(entity: ItemsSet): CreateRequestBuilder<ItemsSet> {
    return new CreateRequestBuilder(ItemsSet, entity);
  }
}
