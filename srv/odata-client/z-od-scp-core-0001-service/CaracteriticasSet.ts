/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CaracteriticasSetRequestBuilder } from './CaracteriticasSetRequestBuilder';
import { AllFields, CustomField, Entity, EntityBuilderType, Selectable, StringField } from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "CaracteriticasSet" of service "Z_OD_SCP_CORE_0001_SRV".
 */
export class CaracteriticasSet extends Entity implements CaracteriticasSetType {
  /**
   * Technical entity name for CaracteriticasSet.
   */
  static _entityName = 'CaracteriticasSet';
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for CaracteriticasSet.
   */
  static _serviceName = 'Z_OD_SCP_CORE_0001_SRV';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/Z_OD_SCP_CORE_0001_SRV';
  /**
   * Característica.
   * Maximum length: 30.
   */
  charactname!: string;
  /**
   * Valor caract.
   * Maximum length: 70.
   */
  valueCharLong!: string;
  /**
   * Descripción.
   * Maximum length: 70.
   */
  descriptionLong!: string;

  /**
   * Returns an entity builder to construct instances `CaracteriticasSet`.
   * @returns A builder that constructs instances of entity type `CaracteriticasSet`.
   */
  static builder(): EntityBuilderType<CaracteriticasSet, CaracteriticasSetTypeForceMandatory> {
    return Entity.entityBuilder(CaracteriticasSet);
  }

  /**
   * Returns a request builder to construct requests for operations on the `CaracteriticasSet` entity type.
   * @returns A `CaracteriticasSet` request builder.
   */
  static requestBuilder(): CaracteriticasSetRequestBuilder {
    return new CaracteriticasSetRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `CaracteriticasSet`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `CaracteriticasSet`.
   */
  static customField(fieldName: string): CustomField<CaracteriticasSet> {
    return Entity.customFieldSelector(fieldName, CaracteriticasSet);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface CaracteriticasSetType {
  charactname: string;
  valueCharLong: string;
  descriptionLong: string;
}

export interface CaracteriticasSetTypeForceMandatory {
  charactname: string;
  valueCharLong: string;
  descriptionLong: string;
}

export namespace CaracteriticasSet {
  /**
   * Static representation of the [[charactname]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const CHARACTNAME: StringField<CaracteriticasSet> = new StringField('Charactname', CaracteriticasSet, 'Edm.String');
  /**
   * Static representation of the [[valueCharLong]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const VALUE_CHAR_LONG: StringField<CaracteriticasSet> = new StringField('ValueCharLong', CaracteriticasSet, 'Edm.String');
  /**
   * Static representation of the [[descriptionLong]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DESCRIPTION_LONG: StringField<CaracteriticasSet> = new StringField('DescriptionLong', CaracteriticasSet, 'Edm.String');
  /**
   * All fields of the CaracteriticasSet entity.
   */
  export const _allFields: Array<StringField<CaracteriticasSet>> = [
    CaracteriticasSet.CHARACTNAME,
    CaracteriticasSet.VALUE_CHAR_LONG,
    CaracteriticasSet.DESCRIPTION_LONG
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<CaracteriticasSet> = new AllFields('*', CaracteriticasSet);
  /**
   * All key fields of the CaracteriticasSet entity.
   */
  export const _keyFields: Array<Selectable<CaracteriticasSet>> = [CaracteriticasSet.CHARACTNAME];
  /**
   * Mapping of all key field names to the respective static field property CaracteriticasSet.
   */
  export const _keys: { [keys: string]: Selectable<CaracteriticasSet> } = CaracteriticasSet._keyFields.reduce((acc: { [keys: string]: Selectable<CaracteriticasSet> }, field: Selectable<CaracteriticasSet>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
