/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { PaiseSetRequestBuilder } from './PaiseSetRequestBuilder';
import { AllFields, CustomField, Entity, EntityBuilderType, Selectable, StringField } from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "PaiseSet" of service "Z_OD_SCP_CORE_0001_SRV".
 */
export class PaiseSet extends Entity implements PaiseSetType {
  /**
   * Technical entity name for PaiseSet.
   */
  static _entityName = 'PaiseSet';
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for PaiseSet.
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
   * País.
   * Maximum length: 3.
   */
  land1!: string;
  /**
   * Denominación.
   * Maximum length: 15.
   */
  landx!: string;
  /**
   * Nacionalidad.
   * Maximum length: 15.
   */
  natio!: string;
  /**
   * País.
   * Maximum length: 50.
   */
  landx50!: string;
  /**
   * Nacionalidad.
   * Maximum length: 50.
   */
  natio50!: string;

  /**
   * Returns an entity builder to construct instances `PaiseSet`.
   * @returns A builder that constructs instances of entity type `PaiseSet`.
   */
  static builder(): EntityBuilderType<PaiseSet, PaiseSetTypeForceMandatory> {
    return Entity.entityBuilder(PaiseSet);
  }

  /**
   * Returns a request builder to construct requests for operations on the `PaiseSet` entity type.
   * @returns A `PaiseSet` request builder.
   */
  static requestBuilder(): PaiseSetRequestBuilder {
    return new PaiseSetRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `PaiseSet`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `PaiseSet`.
   */
  static customField(fieldName: string): CustomField<PaiseSet> {
    return Entity.customFieldSelector(fieldName, PaiseSet);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface PaiseSetType {
  spras: string;
  land1: string;
  landx: string;
  natio: string;
  landx50: string;
  natio50: string;
}

export interface PaiseSetTypeForceMandatory {
  spras: string;
  land1: string;
  landx: string;
  natio: string;
  landx50: string;
  natio50: string;
}

export namespace PaiseSet {
  /**
   * Static representation of the [[spras]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const SPRAS: StringField<PaiseSet> = new StringField('Spras', PaiseSet, 'Edm.String');
  /**
   * Static representation of the [[land1]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const LAND_1: StringField<PaiseSet> = new StringField('Land1', PaiseSet, 'Edm.String');
  /**
   * Static representation of the [[landx]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const LANDX: StringField<PaiseSet> = new StringField('Landx', PaiseSet, 'Edm.String');
  /**
   * Static representation of the [[natio]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const NATIO: StringField<PaiseSet> = new StringField('Natio', PaiseSet, 'Edm.String');
  /**
   * Static representation of the [[landx50]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const LANDX_50: StringField<PaiseSet> = new StringField('Landx50', PaiseSet, 'Edm.String');
  /**
   * Static representation of the [[natio50]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const NATIO_50: StringField<PaiseSet> = new StringField('Natio50', PaiseSet, 'Edm.String');
  /**
   * All fields of the PaiseSet entity.
   */
  export const _allFields: Array<StringField<PaiseSet>> = [
    PaiseSet.SPRAS,
    PaiseSet.LAND_1,
    PaiseSet.LANDX,
    PaiseSet.NATIO,
    PaiseSet.LANDX_50,
    PaiseSet.NATIO_50
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<PaiseSet> = new AllFields('*', PaiseSet);
  /**
   * All key fields of the PaiseSet entity.
   */
  export const _keyFields: Array<Selectable<PaiseSet>> = [PaiseSet.SPRAS, PaiseSet.LAND_1];
  /**
   * Mapping of all key field names to the respective static field property PaiseSet.
   */
  export const _keys: { [keys: string]: Selectable<PaiseSet> } = PaiseSet._keyFields.reduce((acc: { [keys: string]: Selectable<PaiseSet> }, field: Selectable<PaiseSet>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
