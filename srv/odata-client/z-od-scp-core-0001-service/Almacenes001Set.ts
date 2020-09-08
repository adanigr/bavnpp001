/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Almacenes001SetRequestBuilder } from './Almacenes001SetRequestBuilder';
import { AllFields, CustomField, Entity, EntityBuilderType, Selectable, StringField } from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "Almacenes001Set" of service "Z_OD_SCP_CORE_0001_SRV".
 */
export class Almacenes001Set extends Entity implements Almacenes001SetType {
  /**
   * Technical entity name for Almacenes001Set.
   */
  static _entityName = 'Almacenes001Set';
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for Almacenes001Set.
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
   * Número actual.
   * Maximum length: 3.
   */
  lfdnr!: string;

  /**
   * Returns an entity builder to construct instances `Almacenes001Set`.
   * @returns A builder that constructs instances of entity type `Almacenes001Set`.
   */
  static builder(): EntityBuilderType<Almacenes001Set, Almacenes001SetTypeForceMandatory> {
    return Entity.entityBuilder(Almacenes001Set);
  }

  /**
   * Returns a request builder to construct requests for operations on the `Almacenes001Set` entity type.
   * @returns A `Almacenes001Set` request builder.
   */
  static requestBuilder(): Almacenes001SetRequestBuilder {
    return new Almacenes001SetRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `Almacenes001Set`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `Almacenes001Set`.
   */
  static customField(fieldName: string): CustomField<Almacenes001Set> {
    return Entity.customFieldSelector(fieldName, Almacenes001Set);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface Almacenes001SetType {
  werks: string;
  lgort: string;
  lgobe: string;
  lfdnr: string;
}

export interface Almacenes001SetTypeForceMandatory {
  werks: string;
  lgort: string;
  lgobe: string;
  lfdnr: string;
}

export namespace Almacenes001Set {
  /**
   * Static representation of the [[werks]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const WERKS: StringField<Almacenes001Set> = new StringField('Werks', Almacenes001Set, 'Edm.String');
  /**
   * Static representation of the [[lgort]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const LGORT: StringField<Almacenes001Set> = new StringField('Lgort', Almacenes001Set, 'Edm.String');
  /**
   * Static representation of the [[lgobe]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const LGOBE: StringField<Almacenes001Set> = new StringField('Lgobe', Almacenes001Set, 'Edm.String');
  /**
   * Static representation of the [[lfdnr]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const LFDNR: StringField<Almacenes001Set> = new StringField('Lfdnr', Almacenes001Set, 'Edm.String');
  /**
   * All fields of the Almacenes001Set entity.
   */
  export const _allFields: Array<StringField<Almacenes001Set>> = [
    Almacenes001Set.WERKS,
    Almacenes001Set.LGORT,
    Almacenes001Set.LGOBE,
    Almacenes001Set.LFDNR
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<Almacenes001Set> = new AllFields('*', Almacenes001Set);
  /**
   * All key fields of the Almacenes001Set entity.
   */
  export const _keyFields: Array<Selectable<Almacenes001Set>> = [Almacenes001Set.WERKS, Almacenes001Set.LGORT];
  /**
   * Mapping of all key field names to the respective static field property Almacenes001Set.
   */
  export const _keys: { [keys: string]: Selectable<Almacenes001Set> } = Almacenes001Set._keyFields.reduce((acc: { [keys: string]: Selectable<Almacenes001Set> }, field: Selectable<Almacenes001Set>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
