/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TipoCambioSetRequestBuilder } from './TipoCambioSetRequestBuilder';
import { BigNumber } from 'bignumber.js';
import { AllFields, BigNumberField, CustomField, Entity, EntityBuilderType, Selectable, StringField } from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "TipoCambioSet" of service "Z_OD_SCP_CORE_0001_SRV".
 */
export class TipoCambioSet extends Entity implements TipoCambioSetType {
  /**
   * Technical entity name for TipoCambioSet.
   */
  static _entityName = 'TipoCambioSet';
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for TipoCambioSet.
   */
  static _serviceName = 'Z_OD_SCP_CORE_0001_SRV';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/Z_OD_SCP_CORE_0001_SRV';
  /**
   * Tipo cotización.
   * Maximum length: 4.
   */
  kurst!: string;
  /**
   * Mon.procedencia.
   * Maximum length: 5.
   */
  fcurr!: string;
  /**
   * Moneda destino.
   * Maximum length: 5.
   */
  tcurr!: string;
  /**
   * Válido de.
   * Maximum length: 10.
   */
  gdatu!: string;
  /**
   * Tipo de cambio.
   */
  ukurs!: BigNumber;

  /**
   * Returns an entity builder to construct instances `TipoCambioSet`.
   * @returns A builder that constructs instances of entity type `TipoCambioSet`.
   */
  static builder(): EntityBuilderType<TipoCambioSet, TipoCambioSetTypeForceMandatory> {
    return Entity.entityBuilder(TipoCambioSet);
  }

  /**
   * Returns a request builder to construct requests for operations on the `TipoCambioSet` entity type.
   * @returns A `TipoCambioSet` request builder.
   */
  static requestBuilder(): TipoCambioSetRequestBuilder {
    return new TipoCambioSetRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TipoCambioSet`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TipoCambioSet`.
   */
  static customField(fieldName: string): CustomField<TipoCambioSet> {
    return Entity.customFieldSelector(fieldName, TipoCambioSet);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface TipoCambioSetType {
  kurst: string;
  fcurr: string;
  tcurr: string;
  gdatu: string;
  ukurs: BigNumber;
}

export interface TipoCambioSetTypeForceMandatory {
  kurst: string;
  fcurr: string;
  tcurr: string;
  gdatu: string;
  ukurs: BigNumber;
}

export namespace TipoCambioSet {
  /**
   * Static representation of the [[kurst]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KURST: StringField<TipoCambioSet> = new StringField('Kurst', TipoCambioSet, 'Edm.String');
  /**
   * Static representation of the [[fcurr]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const FCURR: StringField<TipoCambioSet> = new StringField('Fcurr', TipoCambioSet, 'Edm.String');
  /**
   * Static representation of the [[tcurr]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const TCURR: StringField<TipoCambioSet> = new StringField('Tcurr', TipoCambioSet, 'Edm.String');
  /**
   * Static representation of the [[gdatu]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const GDATU: StringField<TipoCambioSet> = new StringField('Gdatu', TipoCambioSet, 'Edm.String');
  /**
   * Static representation of the [[ukurs]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const UKURS: BigNumberField<TipoCambioSet> = new BigNumberField('Ukurs', TipoCambioSet, 'Edm.Decimal');
  /**
   * All fields of the TipoCambioSet entity.
   */
  export const _allFields: Array<StringField<TipoCambioSet> | BigNumberField<TipoCambioSet>> = [
    TipoCambioSet.KURST,
    TipoCambioSet.FCURR,
    TipoCambioSet.TCURR,
    TipoCambioSet.GDATU,
    TipoCambioSet.UKURS
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<TipoCambioSet> = new AllFields('*', TipoCambioSet);
  /**
   * All key fields of the TipoCambioSet entity.
   */
  export const _keyFields: Array<Selectable<TipoCambioSet>> = [TipoCambioSet.KURST, TipoCambioSet.FCURR, TipoCambioSet.TCURR, TipoCambioSet.GDATU];
  /**
   * Mapping of all key field names to the respective static field property TipoCambioSet.
   */
  export const _keys: { [keys: string]: Selectable<TipoCambioSet> } = TipoCambioSet._keyFields.reduce((acc: { [keys: string]: Selectable<TipoCambioSet> }, field: Selectable<TipoCambioSet>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
