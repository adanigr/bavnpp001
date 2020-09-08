/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { FdItemsSetRequestBuilder } from './FdItemsSetRequestBuilder';
import { BigNumber } from 'bignumber.js';
import { AllFields, BigNumberField, CustomField, Entity, EntityBuilderType, Selectable, StringField } from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "FdItemsSet" of service "Z_OD_SCP_CORE_0001_SRV".
 */
export class FdItemsSet extends Entity implements FdItemsSetType {
  /**
   * Technical entity name for FdItemsSet.
   */
  static _entityName = 'FdItemsSet';
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for FdItemsSet.
   */
  static _serviceName = 'Z_OD_SCP_CORE_0001_SRV';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/Z_OD_SCP_CORE_0001_SRV';
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
   * Posición.
   * Maximum length: 3.
   */
  buzei!: string;
  /**
   * Clave contab.
   * Maximum length: 2.
   */
  bschl!: string;
  /**
   * Cliente.
   * Maximum length: 10.
   */
  account!: string;
  /**
   * Explicación.
   * Maximum length: 50.
   */
  description!: string;
  /**
   * Importe.
   */
  wrbtr!: BigNumber;
  /**
   * Importe ML.
   */
  dmbtr!: BigNumber;
  /**
   * División.
   * Maximum length: 4.
   */
  gsber!: string;
  /**
   * Segmento.
   * Maximum length: 10.
   */
  segment!: string;
  /**
   * CeBe.
   * Maximum length: 10.
   */
  prctr!: string;
  /**
   * Asignación.
   * Maximum length: 18.
   */
  zuonr!: string;
  /**
   * Gjahr.
   * Maximum length: 4.
   */
  gjahr!: string;
  /**
   * Waers.
   * Maximum length: 5.
   */
  waers!: string;
  /**
   * Bktxt.
   * Maximum length: 25.
   */
  bktxt!: string;
  /**
   * Sgtxt.
   * Maximum length: 50.
   */
  sgtxt!: string;

  /**
   * Returns an entity builder to construct instances `FdItemsSet`.
   * @returns A builder that constructs instances of entity type `FdItemsSet`.
   */
  static builder(): EntityBuilderType<FdItemsSet, FdItemsSetTypeForceMandatory> {
    return Entity.entityBuilder(FdItemsSet);
  }

  /**
   * Returns a request builder to construct requests for operations on the `FdItemsSet` entity type.
   * @returns A `FdItemsSet` request builder.
   */
  static requestBuilder(): FdItemsSetRequestBuilder {
    return new FdItemsSetRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `FdItemsSet`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `FdItemsSet`.
   */
  static customField(fieldName: string): CustomField<FdItemsSet> {
    return Entity.customFieldSelector(fieldName, FdItemsSet);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface FdItemsSetType {
  bukrs: string;
  belnr: string;
  buzei: string;
  bschl: string;
  account: string;
  description: string;
  wrbtr: BigNumber;
  dmbtr: BigNumber;
  gsber: string;
  segment: string;
  prctr: string;
  zuonr: string;
  gjahr: string;
  waers: string;
  bktxt: string;
  sgtxt: string;
}

export interface FdItemsSetTypeForceMandatory {
  bukrs: string;
  belnr: string;
  buzei: string;
  bschl: string;
  account: string;
  description: string;
  wrbtr: BigNumber;
  dmbtr: BigNumber;
  gsber: string;
  segment: string;
  prctr: string;
  zuonr: string;
  gjahr: string;
  waers: string;
  bktxt: string;
  sgtxt: string;
}

export namespace FdItemsSet {
  /**
   * Static representation of the [[bukrs]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const BUKRS: StringField<FdItemsSet> = new StringField('Bukrs', FdItemsSet, 'Edm.String');
  /**
   * Static representation of the [[belnr]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const BELNR: StringField<FdItemsSet> = new StringField('Belnr', FdItemsSet, 'Edm.String');
  /**
   * Static representation of the [[buzei]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const BUZEI: StringField<FdItemsSet> = new StringField('Buzei', FdItemsSet, 'Edm.String');
  /**
   * Static representation of the [[bschl]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const BSCHL: StringField<FdItemsSet> = new StringField('Bschl', FdItemsSet, 'Edm.String');
  /**
   * Static representation of the [[account]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ACCOUNT: StringField<FdItemsSet> = new StringField('Account', FdItemsSet, 'Edm.String');
  /**
   * Static representation of the [[description]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DESCRIPTION: StringField<FdItemsSet> = new StringField('Description', FdItemsSet, 'Edm.String');
  /**
   * Static representation of the [[wrbtr]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const WRBTR: BigNumberField<FdItemsSet> = new BigNumberField('Wrbtr', FdItemsSet, 'Edm.Decimal');
  /**
   * Static representation of the [[dmbtr]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DMBTR: BigNumberField<FdItemsSet> = new BigNumberField('Dmbtr', FdItemsSet, 'Edm.Decimal');
  /**
   * Static representation of the [[gsber]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const GSBER: StringField<FdItemsSet> = new StringField('Gsber', FdItemsSet, 'Edm.String');
  /**
   * Static representation of the [[segment]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const SEGMENT: StringField<FdItemsSet> = new StringField('Segment', FdItemsSet, 'Edm.String');
  /**
   * Static representation of the [[prctr]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const PRCTR: StringField<FdItemsSet> = new StringField('Prctr', FdItemsSet, 'Edm.String');
  /**
   * Static representation of the [[zuonr]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ZUONR: StringField<FdItemsSet> = new StringField('Zuonr', FdItemsSet, 'Edm.String');
  /**
   * Static representation of the [[gjahr]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const GJAHR: StringField<FdItemsSet> = new StringField('Gjahr', FdItemsSet, 'Edm.String');
  /**
   * Static representation of the [[waers]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const WAERS: StringField<FdItemsSet> = new StringField('Waers', FdItemsSet, 'Edm.String');
  /**
   * Static representation of the [[bktxt]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const BKTXT: StringField<FdItemsSet> = new StringField('Bktxt', FdItemsSet, 'Edm.String');
  /**
   * Static representation of the [[sgtxt]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const SGTXT: StringField<FdItemsSet> = new StringField('Sgtxt', FdItemsSet, 'Edm.String');
  /**
   * All fields of the FdItemsSet entity.
   */
  export const _allFields: Array<StringField<FdItemsSet> | BigNumberField<FdItemsSet>> = [
    FdItemsSet.BUKRS,
    FdItemsSet.BELNR,
    FdItemsSet.BUZEI,
    FdItemsSet.BSCHL,
    FdItemsSet.ACCOUNT,
    FdItemsSet.DESCRIPTION,
    FdItemsSet.WRBTR,
    FdItemsSet.DMBTR,
    FdItemsSet.GSBER,
    FdItemsSet.SEGMENT,
    FdItemsSet.PRCTR,
    FdItemsSet.ZUONR,
    FdItemsSet.GJAHR,
    FdItemsSet.WAERS,
    FdItemsSet.BKTXT,
    FdItemsSet.SGTXT
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<FdItemsSet> = new AllFields('*', FdItemsSet);
  /**
   * All key fields of the FdItemsSet entity.
   */
  export const _keyFields: Array<Selectable<FdItemsSet>> = [FdItemsSet.BUKRS, FdItemsSet.BELNR, FdItemsSet.BUZEI, FdItemsSet.GJAHR];
  /**
   * Mapping of all key field names to the respective static field property FdItemsSet.
   */
  export const _keys: { [keys: string]: Selectable<FdItemsSet> } = FdItemsSet._keyFields.reduce((acc: { [keys: string]: Selectable<FdItemsSet> }, field: Selectable<FdItemsSet>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
