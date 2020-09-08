/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Segmentos001SetRequestBuilder } from './Segmentos001SetRequestBuilder';
import { AllFields, CustomField, Entity, EntityBuilderType, Selectable, StringField } from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "Segmentos001Set" of service "Z_OD_SCP_CORE_0001_SRV".
 */
export class Segmentos001Set extends Entity implements Segmentos001SetType {
  /**
   * Technical entity name for Segmentos001Set.
   */
  static _entityName = 'Segmentos001Set';
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for Segmentos001Set.
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
   * Material.
   * Maximum length: 40.
   */
  matnr!: string;
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
   * Returns an entity builder to construct instances `Segmentos001Set`.
   * @returns A builder that constructs instances of entity type `Segmentos001Set`.
   */
  static builder(): EntityBuilderType<Segmentos001Set, Segmentos001SetTypeForceMandatory> {
    return Entity.entityBuilder(Segmentos001Set);
  }

  /**
   * Returns a request builder to construct requests for operations on the `Segmentos001Set` entity type.
   * @returns A `Segmentos001Set` request builder.
   */
  static requestBuilder(): Segmentos001SetRequestBuilder {
    return new Segmentos001SetRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `Segmentos001Set`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `Segmentos001Set`.
   */
  static customField(fieldName: string): CustomField<Segmentos001Set> {
    return Entity.customFieldSelector(fieldName, Segmentos001Set);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface Segmentos001SetType {
  werks: string;
  matnr: string;
  segment: string;
  name: string;
}

export interface Segmentos001SetTypeForceMandatory {
  werks: string;
  matnr: string;
  segment: string;
  name: string;
}

export namespace Segmentos001Set {
  /**
   * Static representation of the [[werks]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const WERKS: StringField<Segmentos001Set> = new StringField('Werks', Segmentos001Set, 'Edm.String');
  /**
   * Static representation of the [[matnr]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const MATNR: StringField<Segmentos001Set> = new StringField('Matnr', Segmentos001Set, 'Edm.String');
  /**
   * Static representation of the [[segment]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const SEGMENT: StringField<Segmentos001Set> = new StringField('Segment', Segmentos001Set, 'Edm.String');
  /**
   * Static representation of the [[name]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const NAME: StringField<Segmentos001Set> = new StringField('Name', Segmentos001Set, 'Edm.String');
  /**
   * All fields of the Segmentos001Set entity.
   */
  export const _allFields: Array<StringField<Segmentos001Set>> = [
    Segmentos001Set.WERKS,
    Segmentos001Set.MATNR,
    Segmentos001Set.SEGMENT,
    Segmentos001Set.NAME
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<Segmentos001Set> = new AllFields('*', Segmentos001Set);
  /**
   * All key fields of the Segmentos001Set entity.
   */
  export const _keyFields: Array<Selectable<Segmentos001Set>> = [Segmentos001Set.WERKS, Segmentos001Set.MATNR, Segmentos001Set.SEGMENT];
  /**
   * Mapping of all key field names to the respective static field property Segmentos001Set.
   */
  export const _keys: { [keys: string]: Selectable<Segmentos001Set> } = Segmentos001Set._keyFields.reduce((acc: { [keys: string]: Selectable<Segmentos001Set> }, field: Selectable<Segmentos001Set>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
