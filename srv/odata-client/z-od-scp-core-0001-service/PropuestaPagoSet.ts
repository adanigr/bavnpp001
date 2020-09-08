/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { PropuestaPagoSetRequestBuilder } from './PropuestaPagoSetRequestBuilder';
import { AllFields, CustomField, Entity, EntityBuilderType, Selectable, StringField } from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "PropuestaPagoSet" of service "Z_OD_SCP_CORE_0001_SRV".
 */
export class PropuestaPagoSet extends Entity implements PropuestaPagoSetType {
  /**
   * Technical entity name for PropuestaPagoSet.
   */
  static _entityName = 'PropuestaPagoSet';
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for PropuestaPagoSet.
   */
  static _serviceName = 'Z_OD_SCP_CORE_0001_SRV';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/Z_OD_SCP_CORE_0001_SRV';
  /**
   * Soc.pagadora.
   * Maximum length: 4.
   */
  zbukr!: string;
  /**
   * Banco propio.
   * Maximum length: 5.
   */
  hbkid!: string;
  /**
   * ID.cuenta.
   * Maximum length: 5.
   */
  hktid!: string;
  /**
   * Vía de pago.
   * Maximum length: 1.
   */
  zlsch!: string;
  /**
   * Moneda.
   * Maximum length: 5.
   */
  waers!: string;
  /**
   * Cta.transit.
   * Maximum length: 10.
   */
  ukont!: string;
  /**
   * División.
   * Maximum length: 4.
   */
  gsber!: string;
  /**
   * TEXT1.
   * Maximum length: 50.
   */
  text1!: string;
  /**
   * Idioma.
   * Maximum length: 2.
   */
  spras!: string;

  /**
   * Returns an entity builder to construct instances `PropuestaPagoSet`.
   * @returns A builder that constructs instances of entity type `PropuestaPagoSet`.
   */
  static builder(): EntityBuilderType<PropuestaPagoSet, PropuestaPagoSetTypeForceMandatory> {
    return Entity.entityBuilder(PropuestaPagoSet);
  }

  /**
   * Returns a request builder to construct requests for operations on the `PropuestaPagoSet` entity type.
   * @returns A `PropuestaPagoSet` request builder.
   */
  static requestBuilder(): PropuestaPagoSetRequestBuilder {
    return new PropuestaPagoSetRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `PropuestaPagoSet`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `PropuestaPagoSet`.
   */
  static customField(fieldName: string): CustomField<PropuestaPagoSet> {
    return Entity.customFieldSelector(fieldName, PropuestaPagoSet);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface PropuestaPagoSetType {
  zbukr: string;
  hbkid: string;
  hktid: string;
  zlsch: string;
  waers: string;
  ukont: string;
  gsber: string;
  text1: string;
  spras: string;
}

export interface PropuestaPagoSetTypeForceMandatory {
  zbukr: string;
  hbkid: string;
  hktid: string;
  zlsch: string;
  waers: string;
  ukont: string;
  gsber: string;
  text1: string;
  spras: string;
}

export namespace PropuestaPagoSet {
  /**
   * Static representation of the [[zbukr]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ZBUKR: StringField<PropuestaPagoSet> = new StringField('Zbukr', PropuestaPagoSet, 'Edm.String');
  /**
   * Static representation of the [[hbkid]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const HBKID: StringField<PropuestaPagoSet> = new StringField('Hbkid', PropuestaPagoSet, 'Edm.String');
  /**
   * Static representation of the [[hktid]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const HKTID: StringField<PropuestaPagoSet> = new StringField('Hktid', PropuestaPagoSet, 'Edm.String');
  /**
   * Static representation of the [[zlsch]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ZLSCH: StringField<PropuestaPagoSet> = new StringField('Zlsch', PropuestaPagoSet, 'Edm.String');
  /**
   * Static representation of the [[waers]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const WAERS: StringField<PropuestaPagoSet> = new StringField('Waers', PropuestaPagoSet, 'Edm.String');
  /**
   * Static representation of the [[ukont]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const UKONT: StringField<PropuestaPagoSet> = new StringField('Ukont', PropuestaPagoSet, 'Edm.String');
  /**
   * Static representation of the [[gsber]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const GSBER: StringField<PropuestaPagoSet> = new StringField('Gsber', PropuestaPagoSet, 'Edm.String');
  /**
   * Static representation of the [[text1]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const TEXT_1: StringField<PropuestaPagoSet> = new StringField('Text1', PropuestaPagoSet, 'Edm.String');
  /**
   * Static representation of the [[spras]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const SPRAS: StringField<PropuestaPagoSet> = new StringField('Spras', PropuestaPagoSet, 'Edm.String');
  /**
   * All fields of the PropuestaPagoSet entity.
   */
  export const _allFields: Array<StringField<PropuestaPagoSet>> = [
    PropuestaPagoSet.ZBUKR,
    PropuestaPagoSet.HBKID,
    PropuestaPagoSet.HKTID,
    PropuestaPagoSet.ZLSCH,
    PropuestaPagoSet.WAERS,
    PropuestaPagoSet.UKONT,
    PropuestaPagoSet.GSBER,
    PropuestaPagoSet.TEXT_1,
    PropuestaPagoSet.SPRAS
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<PropuestaPagoSet> = new AllFields('*', PropuestaPagoSet);
  /**
   * All key fields of the PropuestaPagoSet entity.
   */
  export const _keyFields: Array<Selectable<PropuestaPagoSet>> = [PropuestaPagoSet.HBKID, PropuestaPagoSet.ZLSCH, PropuestaPagoSet.WAERS, PropuestaPagoSet.GSBER, PropuestaPagoSet.SPRAS];
  /**
   * Mapping of all key field names to the respective static field property PropuestaPagoSet.
   */
  export const _keys: { [keys: string]: Selectable<PropuestaPagoSet> } = PropuestaPagoSet._keyFields.reduce((acc: { [keys: string]: Selectable<PropuestaPagoSet> }, field: Selectable<PropuestaPagoSet>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
