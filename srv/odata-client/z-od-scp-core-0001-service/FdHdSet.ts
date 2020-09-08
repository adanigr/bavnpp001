/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { FdHdSetRequestBuilder } from './FdHdSetRequestBuilder';
import { BigNumber } from 'bignumber.js';
import { AllFields, BigNumberField, CustomField, Entity, EntityBuilderType, Link, Selectable, StringField } from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "FdHDSet" of service "Z_OD_SCP_CORE_0001_SRV".
 */
export class FdHdSet extends Entity implements FdHdSetType {
  /**
   * Technical entity name for FdHdSet.
   */
  static _entityName = 'FdHDSet';
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for FdHdSet.
   */
  static _serviceName = 'Z_OD_SCP_CORE_0001_SRV';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/Z_OD_SCP_CORE_0001_SRV';
  /**
   * Referencia.
   * Maximum length: 16.
   */
  xblnr!: string;
  /**
   * Sociedad.
   * Maximum length: 4.
   */
  bukrs!: string;
  /**
   * Nº documento.
   * Maximum length: 10.
   */
  belnr!: string;
  /**
   * Ejercicio.
   * Maximum length: 4.
   */
  gjahr!: string;
  /**
   * Clase doc.
   * Maximum length: 2.
   */
  blart!: string;
  /**
   * Fecha de documento en documento.
   * Maximum length: 10.
   */
  bldat!: string;
  /**
   * Fecha de contabilización en el documento.
   * Maximum length: 10.
   */
  budat!: string;
  /**
   * Día del registro del documento contable.
   * Maximum length: 10.
   */
  cpudt!: string;
  /**
   * Moneda.
   * Maximum length: 5.
   */
  waers!: string;
  /**
   * Tipo de cambio.
   */
  kursf!: BigNumber;
  /**
   * Txt.cab.doc.
   * Maximum length: 25.
   */
  bktxt!: string;
  /**
   * Importe total en la moneda del documento.
   */
  wrbtrS!: BigNumber;
  /**
   * Importe total en moneda local.
   */
  dmbtrS!: BigNumber;
  /**
   * One-to-many navigation property to the [[FdItemsSet]] entity.
   */
  fdItemsSet!: FdItemsSet[];

  /**
   * Returns an entity builder to construct instances `FdHdSet`.
   * @returns A builder that constructs instances of entity type `FdHdSet`.
   */
  static builder(): EntityBuilderType<FdHdSet, FdHdSetTypeForceMandatory> {
    return Entity.entityBuilder(FdHdSet);
  }

  /**
   * Returns a request builder to construct requests for operations on the `FdHdSet` entity type.
   * @returns A `FdHdSet` request builder.
   */
  static requestBuilder(): FdHdSetRequestBuilder {
    return new FdHdSetRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `FdHdSet`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `FdHdSet`.
   */
  static customField(fieldName: string): CustomField<FdHdSet> {
    return Entity.customFieldSelector(fieldName, FdHdSet);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

import { FdItemsSet, FdItemsSetType } from './FdItemsSet';

export interface FdHdSetType {
  xblnr: string;
  bukrs: string;
  belnr: string;
  gjahr: string;
  blart: string;
  bldat: string;
  budat: string;
  cpudt: string;
  waers: string;
  kursf: BigNumber;
  bktxt: string;
  wrbtrS: BigNumber;
  dmbtrS: BigNumber;
  fdItemsSet: FdItemsSetType[];
}

export interface FdHdSetTypeForceMandatory {
  xblnr: string;
  bukrs: string;
  belnr: string;
  gjahr: string;
  blart: string;
  bldat: string;
  budat: string;
  cpudt: string;
  waers: string;
  kursf: BigNumber;
  bktxt: string;
  wrbtrS: BigNumber;
  dmbtrS: BigNumber;
  fdItemsSet: FdItemsSetType[];
}

export namespace FdHdSet {
  /**
   * Static representation of the [[xblnr]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const XBLNR: StringField<FdHdSet> = new StringField('Xblnr', FdHdSet, 'Edm.String');
  /**
   * Static representation of the [[bukrs]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const BUKRS: StringField<FdHdSet> = new StringField('Bukrs', FdHdSet, 'Edm.String');
  /**
   * Static representation of the [[belnr]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const BELNR: StringField<FdHdSet> = new StringField('Belnr', FdHdSet, 'Edm.String');
  /**
   * Static representation of the [[gjahr]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const GJAHR: StringField<FdHdSet> = new StringField('Gjahr', FdHdSet, 'Edm.String');
  /**
   * Static representation of the [[blart]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const BLART: StringField<FdHdSet> = new StringField('Blart', FdHdSet, 'Edm.String');
  /**
   * Static representation of the [[bldat]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const BLDAT: StringField<FdHdSet> = new StringField('Bldat', FdHdSet, 'Edm.String');
  /**
   * Static representation of the [[budat]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const BUDAT: StringField<FdHdSet> = new StringField('Budat', FdHdSet, 'Edm.String');
  /**
   * Static representation of the [[cpudt]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const CPUDT: StringField<FdHdSet> = new StringField('Cpudt', FdHdSet, 'Edm.String');
  /**
   * Static representation of the [[waers]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const WAERS: StringField<FdHdSet> = new StringField('Waers', FdHdSet, 'Edm.String');
  /**
   * Static representation of the [[kursf]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KURSF: BigNumberField<FdHdSet> = new BigNumberField('Kursf', FdHdSet, 'Edm.Decimal');
  /**
   * Static representation of the [[bktxt]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const BKTXT: StringField<FdHdSet> = new StringField('Bktxt', FdHdSet, 'Edm.String');
  /**
   * Static representation of the [[wrbtrS]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const WRBTR_S: BigNumberField<FdHdSet> = new BigNumberField('WrbtrS', FdHdSet, 'Edm.Decimal');
  /**
   * Static representation of the [[dmbtrS]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DMBTR_S: BigNumberField<FdHdSet> = new BigNumberField('DmbtrS', FdHdSet, 'Edm.Decimal');
  /**
   * Static representation of the one-to-many navigation property [[fdItemsSet]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const FD_ITEMS_SET: Link<FdHdSet, FdItemsSet> = new Link('FdItemsSet', FdHdSet, FdItemsSet);
  /**
   * All fields of the FdHdSet entity.
   */
  export const _allFields: Array<StringField<FdHdSet> | BigNumberField<FdHdSet> | Link<FdHdSet, FdItemsSet>> = [
    FdHdSet.XBLNR,
    FdHdSet.BUKRS,
    FdHdSet.BELNR,
    FdHdSet.GJAHR,
    FdHdSet.BLART,
    FdHdSet.BLDAT,
    FdHdSet.BUDAT,
    FdHdSet.CPUDT,
    FdHdSet.WAERS,
    FdHdSet.KURSF,
    FdHdSet.BKTXT,
    FdHdSet.WRBTR_S,
    FdHdSet.DMBTR_S,
    FdHdSet.FD_ITEMS_SET
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<FdHdSet> = new AllFields('*', FdHdSet);
  /**
   * All key fields of the FdHdSet entity.
   */
  export const _keyFields: Array<Selectable<FdHdSet>> = [FdHdSet.BUKRS, FdHdSet.BELNR];
  /**
   * Mapping of all key field names to the respective static field property FdHdSet.
   */
  export const _keys: { [keys: string]: Selectable<FdHdSet> } = FdHdSet._keyFields.reduce((acc: { [keys: string]: Selectable<FdHdSet> }, field: Selectable<FdHdSet>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
