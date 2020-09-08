/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder } from '@sap-cloud-sdk/core';
import { Bancos_PropiosSet } from './Bancos_PropiosSet';

/**
 * Request builder class for operations supported on the [[Bancos_PropiosSet]] entity.
 */
export class Bancos_PropiosSetRequestBuilder extends RequestBuilder<Bancos_PropiosSet> {
  /**
   * Returns a request builder for retrieving one `Bancos_PropiosSet` entity based on its keys.
   * @param bukrs Key property. See [[Bancos_PropiosSet.bukrs]].
   * @param hbkid Key property. See [[Bancos_PropiosSet.hbkid]].
   * @param hktid Key property. See [[Bancos_PropiosSet.hktid]].
   * @param waers Key property. See [[Bancos_PropiosSet.waers]].
   * @param gsber Key property. See [[Bancos_PropiosSet.gsber]].
   * @param zlsch Key property. See [[Bancos_PropiosSet.zlsch]].
   * @param bankl Key property. See [[Bancos_PropiosSet.bankl]].
   * @returns A request builder for creating requests to retrieve one `Bancos_PropiosSet` entity based on its keys.
   */
  getByKey(bukrs: string, hbkid: string, hktid: string, waers: string, gsber: string, zlsch: string, bankl: string): GetByKeyRequestBuilder<Bancos_PropiosSet> {
    return new GetByKeyRequestBuilder(Bancos_PropiosSet, {
      Bukrs: bukrs,
      Hbkid: hbkid,
      Hktid: hktid,
      Waers: waers,
      Gsber: gsber,
      Zlsch: zlsch,
      Bankl: bankl
    });
  }

  /**
   * Returns a request builder for querying all `Bancos_PropiosSet` entities.
   * @returns A request builder for creating requests to retrieve all `Bancos_PropiosSet` entities.
   */
  getAll(): GetAllRequestBuilder<Bancos_PropiosSet> {
    return new GetAllRequestBuilder(Bancos_PropiosSet);
  }
}
