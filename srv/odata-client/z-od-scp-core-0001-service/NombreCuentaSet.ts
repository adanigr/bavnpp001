/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { NombreCuentaSetRequestBuilder } from './NombreCuentaSetRequestBuilder';
import { AllFields, CustomField, Entity, EntityBuilderType, Selectable, StringField } from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "NombreCuentaSet" of service "Z_OD_SCP_CORE_0001_SRV".
 */
export class NombreCuentaSet extends Entity implements NombreCuentaSetType {
  /**
   * Technical entity name for NombreCuentaSet.
   */
  static _entityName = 'NombreCuentaSet';
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for NombreCuentaSet.
   */
  static _serviceName = 'Z_OD_SCP_CORE_0001_SRV';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/Z_OD_SCP_CORE_0001_SRV';
  /**
   * Idioma.
   * Maximum length: 2.
   */
  spras!: string;
  /**
   * Plan cuentas.
   * Maximum length: 4.
   */
  ktopl!: string;
  /**
   * Cta.mayor.
   * Maximum length: 10.
   */
  saknr!: string;
  /**
   * Texto expl.
   * Maximum length: 50.
   */
  txt50!: string;

  /**
   * Returns an entity builder to construct instances `NombreCuentaSet`.
   * @returns A builder that constructs instances of entity type `NombreCuentaSet`.
   */
  static builder(): EntityBuilderType<NombreCuentaSet, NombreCuentaSetTypeForceMandatory> {
    return Entity.entityBuilder(NombreCuentaSet);
  }

  /**
   * Returns a request builder to construct requests for operations on the `NombreCuentaSet` entity type.
   * @returns A `NombreCuentaSet` request builder.
   */
  static requestBuilder(): NombreCuentaSetRequestBuilder {
    return new NombreCuentaSetRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `NombreCuentaSet`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `NombreCuentaSet`.
   */
  static customField(fieldName: string): CustomField<NombreCuentaSet> {
    return Entity.customFieldSelector(fieldName, NombreCuentaSet);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface NombreCuentaSetType {
  spras: string;
  ktopl: string;
  saknr: string;
  txt50: string;
}

export interface NombreCuentaSetTypeForceMandatory {
  spras: string;
  ktopl: string;
  saknr: string;
  txt50: string;
}

export namespace NombreCuentaSet {
  /**
   * Static representation of the [[spras]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const SPRAS: StringField<NombreCuentaSet> = new StringField('Spras', NombreCuentaSet, 'Edm.String');
  /**
   * Static representation of the [[ktopl]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KTOPL: StringField<NombreCuentaSet> = new StringField('Ktopl', NombreCuentaSet, 'Edm.String');
  /**
   * Static representation of the [[saknr]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const SAKNR: StringField<NombreCuentaSet> = new StringField('Saknr', NombreCuentaSet, 'Edm.String');
  /**
   * Static representation of the [[txt50]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const TXT_50: StringField<NombreCuentaSet> = new StringField('Txt50', NombreCuentaSet, 'Edm.String');
  /**
   * All fields of the NombreCuentaSet entity.
   */
  export const _allFields: Array<StringField<NombreCuentaSet>> = [
    NombreCuentaSet.SPRAS,
    NombreCuentaSet.KTOPL,
    NombreCuentaSet.SAKNR,
    NombreCuentaSet.TXT_50
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<NombreCuentaSet> = new AllFields('*', NombreCuentaSet);
  /**
   * All key fields of the NombreCuentaSet entity.
   */
  export const _keyFields: Array<Selectable<NombreCuentaSet>> = [NombreCuentaSet.SPRAS, NombreCuentaSet.KTOPL, NombreCuentaSet.SAKNR];
  /**
   * Mapping of all key field names to the respective static field property NombreCuentaSet.
   */
  export const _keys: { [keys: string]: Selectable<NombreCuentaSet> } = NombreCuentaSet._keyFields.reduce((acc: { [keys: string]: Selectable<NombreCuentaSet> }, field: Selectable<NombreCuentaSet>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
