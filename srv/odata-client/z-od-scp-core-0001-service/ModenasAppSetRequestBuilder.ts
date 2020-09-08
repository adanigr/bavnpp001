/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder } from '@sap-cloud-sdk/core';
import { ModenasAppSet } from './ModenasAppSet';

/**
 * Request builder class for operations supported on the [[ModenasAppSet]] entity.
 */
export class ModenasAppSetRequestBuilder extends RequestBuilder<ModenasAppSet> {
  /**
   * Returns a request builder for retrieving one `ModenasAppSet` entity based on its keys.
   * @param bukrs Key property. See [[ModenasAppSet.bukrs]].
   * @returns A request builder for creating requests to retrieve one `ModenasAppSet` entity based on its keys.
   */
  getByKey(bukrs: string): GetByKeyRequestBuilder<ModenasAppSet> {
    return new GetByKeyRequestBuilder(ModenasAppSet, { Bukrs: bukrs });
  }

  /**
   * Returns a request builder for querying all `ModenasAppSet` entities.
   * @returns A request builder for creating requests to retrieve all `ModenasAppSet` entities.
   */
  getAll(): GetAllRequestBuilder<ModenasAppSet> {
    return new GetAllRequestBuilder(ModenasAppSet);
  }
}
