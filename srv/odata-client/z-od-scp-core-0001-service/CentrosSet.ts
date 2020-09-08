/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CentrosSetRequestBuilder } from './CentrosSetRequestBuilder';
import { AllFields, CustomField, Entity, EntityBuilderType, Selectable, StringField } from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "CentrosSet" of service "Z_OD_SCP_CORE_0001_SRV".
 */
export class CentrosSet extends Entity implements CentrosSetType {
  /**
   * Technical entity name for CentrosSet.
   */
  static _entityName = 'CentrosSet';
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for CentrosSet.
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
   * Centro.
   * Maximum length: 4.
   */
  werks!: string;
  /**
   * Descripcion.
   * Maximum length: 30.
   */
  name1!: string;

  /**
   * Returns an entity builder to construct instances `CentrosSet`.
   * @returns A builder that constructs instances of entity type `CentrosSet`.
   */
  static builder(): EntityBuilderType<CentrosSet, CentrosSetTypeForceMandatory> {
    return Entity.entityBuilder(CentrosSet);
  }

  /**
   * Returns a request builder to construct requests for operations on the `CentrosSet` entity type.
   * @returns A `CentrosSet` request builder.
   */
  static requestBuilder(): CentrosSetRequestBuilder {
    return new CentrosSetRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `CentrosSet`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `CentrosSet`.
   */
  static customField(fieldName: string): CustomField<CentrosSet> {
    return Entity.customFieldSelector(fieldName, CentrosSet);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface CentrosSetType {
  bukrs: string;
  werks: string;
  name1: string;
}

export interface CentrosSetTypeForceMandatory {
  bukrs: string;
  werks: string;
  name1: string;
}

export namespace CentrosSet {
  /**
   * Static representation of the [[bukrs]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const BUKRS: StringField<CentrosSet> = new StringField('Bukrs', CentrosSet, 'Edm.String');
  /**
   * Static representation of the [[werks]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const WERKS: StringField<CentrosSet> = new StringField('Werks', CentrosSet, 'Edm.String');
  /**
   * Static representation of the [[name1]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const NAME_1: StringField<CentrosSet> = new StringField('Name1', CentrosSet, 'Edm.String');
  /**
   * All fields of the CentrosSet entity.
   */
  export const _allFields: Array<StringField<CentrosSet>> = [
    CentrosSet.BUKRS,
    CentrosSet.WERKS,
    CentrosSet.NAME_1
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<CentrosSet> = new AllFields('*', CentrosSet);
  /**
   * All key fields of the CentrosSet entity.
   */
  export const _keyFields: Array<Selectable<CentrosSet>> = [CentrosSet.BUKRS, CentrosSet.WERKS];
  /**
   * Mapping of all key field names to the respective static field property CentrosSet.
   */
  export const _keys: { [keys: string]: Selectable<CentrosSet> } = CentrosSet._keyFields.reduce((acc: { [keys: string]: Selectable<CentrosSet> }, field: Selectable<CentrosSet>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
