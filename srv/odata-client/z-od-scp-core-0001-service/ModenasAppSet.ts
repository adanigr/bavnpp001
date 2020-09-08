/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { ModenasAppSetRequestBuilder } from './ModenasAppSetRequestBuilder';
import { AllFields, CustomField, Entity, EntityBuilderType, Selectable, StringField } from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "ModenasAppSet" of service "Z_OD_SCP_CORE_0001_SRV".
 */
export class ModenasAppSet extends Entity implements ModenasAppSetType {
  /**
   * Technical entity name for ModenasAppSet.
   */
  static _entityName = 'ModenasAppSet';
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for ModenasAppSet.
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
   * Moneda.
   * Maximum length: 5.
   * @nullable
   */
  waers?: string;
  /**
   * Texto breve.
   * Maximum length: 15.
   */
  ktext!: string;

  /**
   * Returns an entity builder to construct instances `ModenasAppSet`.
   * @returns A builder that constructs instances of entity type `ModenasAppSet`.
   */
  static builder(): EntityBuilderType<ModenasAppSet, ModenasAppSetTypeForceMandatory> {
    return Entity.entityBuilder(ModenasAppSet);
  }

  /**
   * Returns a request builder to construct requests for operations on the `ModenasAppSet` entity type.
   * @returns A `ModenasAppSet` request builder.
   */
  static requestBuilder(): ModenasAppSetRequestBuilder {
    return new ModenasAppSetRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `ModenasAppSet`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `ModenasAppSet`.
   */
  static customField(fieldName: string): CustomField<ModenasAppSet> {
    return Entity.customFieldSelector(fieldName, ModenasAppSet);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface ModenasAppSetType {
  bukrs: string;
  waers?: string;
  ktext: string;
}

export interface ModenasAppSetTypeForceMandatory {
  bukrs: string;
  waers: string;
  ktext: string;
}

export namespace ModenasAppSet {
  /**
   * Static representation of the [[bukrs]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const BUKRS: StringField<ModenasAppSet> = new StringField('Bukrs', ModenasAppSet, 'Edm.String');
  /**
   * Static representation of the [[waers]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const WAERS: StringField<ModenasAppSet> = new StringField('Waers', ModenasAppSet, 'Edm.String');
  /**
   * Static representation of the [[ktext]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KTEXT: StringField<ModenasAppSet> = new StringField('Ktext', ModenasAppSet, 'Edm.String');
  /**
   * All fields of the ModenasAppSet entity.
   */
  export const _allFields: Array<StringField<ModenasAppSet>> = [
    ModenasAppSet.BUKRS,
    ModenasAppSet.WAERS,
    ModenasAppSet.KTEXT
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<ModenasAppSet> = new AllFields('*', ModenasAppSet);
  /**
   * All key fields of the ModenasAppSet entity.
   */
  export const _keyFields: Array<Selectable<ModenasAppSet>> = [ModenasAppSet.BUKRS];
  /**
   * Mapping of all key field names to the respective static field property ModenasAppSet.
   */
  export const _keys: { [keys: string]: Selectable<ModenasAppSet> } = ModenasAppSet._keyFields.reduce((acc: { [keys: string]: Selectable<ModenasAppSet> }, field: Selectable<ModenasAppSet>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
