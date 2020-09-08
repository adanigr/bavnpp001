/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { SegmentosSetRequestBuilder } from './SegmentosSetRequestBuilder';
import { AllFields, CustomField, Entity, EntityBuilderType, Selectable, StringField } from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "SegmentosSet" of service "Z_OD_SCP_CORE_0001_SRV".
 */
export class SegmentosSet extends Entity implements SegmentosSetType {
  /**
   * Technical entity name for SegmentosSet.
   */
  static _entityName = 'SegmentosSet';
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for SegmentosSet.
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
   * Segmento.
   * Maximum length: 10.
   */
  segment!: string;
  /**
   * Explicación.
   * Maximum length: 50.
   */
  name!: string;

  /**
   * Returns an entity builder to construct instances `SegmentosSet`.
   * @returns A builder that constructs instances of entity type `SegmentosSet`.
   */
  static builder(): EntityBuilderType<SegmentosSet, SegmentosSetTypeForceMandatory> {
    return Entity.entityBuilder(SegmentosSet);
  }

  /**
   * Returns a request builder to construct requests for operations on the `SegmentosSet` entity type.
   * @returns A `SegmentosSet` request builder.
   */
  static requestBuilder(): SegmentosSetRequestBuilder {
    return new SegmentosSetRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `SegmentosSet`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `SegmentosSet`.
   */
  static customField(fieldName: string): CustomField<SegmentosSet> {
    return Entity.customFieldSelector(fieldName, SegmentosSet);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface SegmentosSetType {
  werks: string;
  segment: string;
  name: string;
}

export interface SegmentosSetTypeForceMandatory {
  werks: string;
  segment: string;
  name: string;
}

export namespace SegmentosSet {
  /**
   * Static representation of the [[werks]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const WERKS: StringField<SegmentosSet> = new StringField('Werks', SegmentosSet, 'Edm.String');
  /**
   * Static representation of the [[segment]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const SEGMENT: StringField<SegmentosSet> = new StringField('Segment', SegmentosSet, 'Edm.String');
  /**
   * Static representation of the [[name]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const NAME: StringField<SegmentosSet> = new StringField('Name', SegmentosSet, 'Edm.String');
  /**
   * All fields of the SegmentosSet entity.
   */
  export const _allFields: Array<StringField<SegmentosSet>> = [
    SegmentosSet.WERKS,
    SegmentosSet.SEGMENT,
    SegmentosSet.NAME
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<SegmentosSet> = new AllFields('*', SegmentosSet);
  /**
   * All key fields of the SegmentosSet entity.
   */
  export const _keyFields: Array<Selectable<SegmentosSet>> = [SegmentosSet.WERKS, SegmentosSet.SEGMENT];
  /**
   * Mapping of all key field names to the respective static field property SegmentosSet.
   */
  export const _keys: { [keys: string]: Selectable<SegmentosSet> } = SegmentosSet._keyFields.reduce((acc: { [keys: string]: Selectable<SegmentosSet> }, field: Selectable<SegmentosSet>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
