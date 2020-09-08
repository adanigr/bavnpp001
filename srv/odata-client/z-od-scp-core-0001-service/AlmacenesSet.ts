/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { AlmacenesSetRequestBuilder } from './AlmacenesSetRequestBuilder';
import { AllFields, CustomField, Entity, EntityBuilderType, Selectable, StringField } from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "AlmacenesSet" of service "Z_OD_SCP_CORE_0001_SRV".
 */
export class AlmacenesSet extends Entity implements AlmacenesSetType {
  /**
   * Technical entity name for AlmacenesSet.
   */
  static _entityName = 'AlmacenesSet';
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for AlmacenesSet.
   */
  static _serviceName = 'Z_OD_SCP_CORE_0001_SRV';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/Z_OD_SCP_CORE_0001_SRV';
  /**
   * Centro.
   * Maximum length: 4.
   */
  werks!: string;
  /**
   * Almacén.
   * Maximum length: 4.
   */
  lgort!: string;
  /**
   * Denominación.
   * Maximum length: 16.
   */
  lgobe!: string;

  /**
   * Returns an entity builder to construct instances `AlmacenesSet`.
   * @returns A builder that constructs instances of entity type `AlmacenesSet`.
   */
  static builder(): EntityBuilderType<AlmacenesSet, AlmacenesSetTypeForceMandatory> {
    return Entity.entityBuilder(AlmacenesSet);
  }

  /**
   * Returns a request builder to construct requests for operations on the `AlmacenesSet` entity type.
   * @returns A `AlmacenesSet` request builder.
   */
  static requestBuilder(): AlmacenesSetRequestBuilder {
    return new AlmacenesSetRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `AlmacenesSet`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `AlmacenesSet`.
   */
  static customField(fieldName: string): CustomField<AlmacenesSet> {
    return Entity.customFieldSelector(fieldName, AlmacenesSet);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface AlmacenesSetType {
  werks: string;
  lgort: string;
  lgobe: string;
}

export interface AlmacenesSetTypeForceMandatory {
  werks: string;
  lgort: string;
  lgobe: string;
}

export namespace AlmacenesSet {
  /**
   * Static representation of the [[werks]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const WERKS: StringField<AlmacenesSet> = new StringField('Werks', AlmacenesSet, 'Edm.String');
  /**
   * Static representation of the [[lgort]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const LGORT: StringField<AlmacenesSet> = new StringField('Lgort', AlmacenesSet, 'Edm.String');
  /**
   * Static representation of the [[lgobe]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const LGOBE: StringField<AlmacenesSet> = new StringField('Lgobe', AlmacenesSet, 'Edm.String');
  /**
   * All fields of the AlmacenesSet entity.
   */
  export const _allFields: Array<StringField<AlmacenesSet>> = [
    AlmacenesSet.WERKS,
    AlmacenesSet.LGORT,
    AlmacenesSet.LGOBE
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<AlmacenesSet> = new AllFields('*', AlmacenesSet);
  /**
   * All key fields of the AlmacenesSet entity.
   */
  export const _keyFields: Array<Selectable<AlmacenesSet>> = [AlmacenesSet.WERKS, AlmacenesSet.LGORT];
  /**
   * Mapping of all key field names to the respective static field property AlmacenesSet.
   */
  export const _keys: { [keys: string]: Selectable<AlmacenesSet> } = AlmacenesSet._keyFields.reduce((acc: { [keys: string]: Selectable<AlmacenesSet> }, field: Selectable<AlmacenesSet>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
