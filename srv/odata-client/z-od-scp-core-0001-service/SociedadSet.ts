/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { SociedadSetRequestBuilder } from './SociedadSetRequestBuilder';
import { AllFields, CustomField, Entity, EntityBuilderType, Selectable, StringField } from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "SociedadSet" of service "Z_OD_SCP_CORE_0001_SRV".
 */
export class SociedadSet extends Entity implements SociedadSetType {
  /**
   * Technical entity name for SociedadSet.
   */
  static _entityName = 'SociedadSet';
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for SociedadSet.
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
   * Nombre empresa.
   * Maximum length: 25.
   */
  butxt!: string;
  /**
   * Marca.
   * Maximum length: 20.
   */
  sort2!: string;

  /**
   * Returns an entity builder to construct instances `SociedadSet`.
   * @returns A builder that constructs instances of entity type `SociedadSet`.
   */
  static builder(): EntityBuilderType<SociedadSet, SociedadSetTypeForceMandatory> {
    return Entity.entityBuilder(SociedadSet);
  }

  /**
   * Returns a request builder to construct requests for operations on the `SociedadSet` entity type.
   * @returns A `SociedadSet` request builder.
   */
  static requestBuilder(): SociedadSetRequestBuilder {
    return new SociedadSetRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `SociedadSet`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `SociedadSet`.
   */
  static customField(fieldName: string): CustomField<SociedadSet> {
    return Entity.customFieldSelector(fieldName, SociedadSet);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface SociedadSetType {
  bukrs: string;
  butxt: string;
  sort2: string;
}

export interface SociedadSetTypeForceMandatory {
  bukrs: string;
  butxt: string;
  sort2: string;
}

export namespace SociedadSet {
  /**
   * Static representation of the [[bukrs]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const BUKRS: StringField<SociedadSet> = new StringField('Bukrs', SociedadSet, 'Edm.String');
  /**
   * Static representation of the [[butxt]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const BUTXT: StringField<SociedadSet> = new StringField('Butxt', SociedadSet, 'Edm.String');
  /**
   * Static representation of the [[sort2]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const SORT_2: StringField<SociedadSet> = new StringField('Sort2', SociedadSet, 'Edm.String');
  /**
   * All fields of the SociedadSet entity.
   */
  export const _allFields: Array<StringField<SociedadSet>> = [
    SociedadSet.BUKRS,
    SociedadSet.BUTXT,
    SociedadSet.SORT_2
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<SociedadSet> = new AllFields('*', SociedadSet);
  /**
   * All key fields of the SociedadSet entity.
   */
  export const _keyFields: Array<Selectable<SociedadSet>> = [SociedadSet.BUKRS];
  /**
   * Mapping of all key field names to the respective static field property SociedadSet.
   */
  export const _keys: { [keys: string]: Selectable<SociedadSet> } = SociedadSet._keyFields.reduce((acc: { [keys: string]: Selectable<SociedadSet> }, field: Selectable<SociedadSet>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
