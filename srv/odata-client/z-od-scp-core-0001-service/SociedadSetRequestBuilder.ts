/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder } from '@sap-cloud-sdk/core';
import { SociedadSet } from './SociedadSet';

/**
 * Request builder class for operations supported on the [[SociedadSet]] entity.
 */
export class SociedadSetRequestBuilder extends RequestBuilder<SociedadSet> {
  /**
   * Returns a request builder for retrieving one `SociedadSet` entity based on its keys.
   * @param bukrs Key property. See [[SociedadSet.bukrs]].
   * @returns A request builder for creating requests to retrieve one `SociedadSet` entity based on its keys.
   */
  getByKey(bukrs: string): GetByKeyRequestBuilder<SociedadSet> {
    return new GetByKeyRequestBuilder(SociedadSet, { Bukrs: bukrs });
  }

  /**
   * Returns a request builder for querying all `SociedadSet` entities.
   * @returns A request builder for creating requests to retrieve all `SociedadSet` entities.
   */
  getAll(): GetAllRequestBuilder<SociedadSet> {
    return new GetAllRequestBuilder(SociedadSet);
  }
}
