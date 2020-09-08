/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder } from '@sap-cloud-sdk/core';
import { Bancos_ProveedorSet } from './Bancos_ProveedorSet';

/**
 * Request builder class for operations supported on the [[Bancos_ProveedorSet]] entity.
 */
export class Bancos_ProveedorSetRequestBuilder extends RequestBuilder<Bancos_ProveedorSet> {
  /**
   * Returns a request builder for retrieving one `Bancos_ProveedorSet` entity based on its keys.
   * @param partner Key property. See [[Bancos_ProveedorSet.partner]].
   * @param bkvid Key property. See [[Bancos_ProveedorSet.bkvid]].
   * @param bankl Key property. See [[Bancos_ProveedorSet.bankl]].
   * @returns A request builder for creating requests to retrieve one `Bancos_ProveedorSet` entity based on its keys.
   */
  getByKey(partner: string, bkvid: string, bankl: string): GetByKeyRequestBuilder<Bancos_ProveedorSet> {
    return new GetByKeyRequestBuilder(Bancos_ProveedorSet, {
      Partner: partner,
      Bkvid: bkvid,
      Bankl: bankl
    });
  }

  /**
   * Returns a request builder for querying all `Bancos_ProveedorSet` entities.
   * @returns A request builder for creating requests to retrieve all `Bancos_ProveedorSet` entities.
   */
  getAll(): GetAllRequestBuilder<Bancos_ProveedorSet> {
    return new GetAllRequestBuilder(Bancos_ProveedorSet);
  }
}
