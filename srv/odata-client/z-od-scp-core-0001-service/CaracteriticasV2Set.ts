/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CaracteriticasV2SetRequestBuilder } from './CaracteriticasV2SetRequestBuilder';
import { AllFields, CustomField, Entity, EntityBuilderType, NumberField, Selectable, StringField } from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "CaracteriticasV2Set" of service "Z_OD_SCP_CORE_0001_SRV".
 */
export class CaracteriticasV2Set extends Entity implements CaracteriticasV2SetType {
  /**
   * Technical entity name for CaracteriticasV2Set.
   */
  static _entityName = 'CaracteriticasV2Set';
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for CaracteriticasV2Set.
   */
  static _serviceName = 'Z_OD_SCP_CORE_0001_SRV';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/Z_OD_SCP_CORE_0001_SRV';
  /**
   * Mandante.
   * Maximum length: 3.
   */
  mandt!: string;
  /**
   * Característica.
   * Maximum length: 30.
   */
  caractname!: string;
  /**
   * Denominación.
   * Maximum length: 30.
   */
  caractdesc!: string;
  /**
   * Valor caract.
   * Maximum length: 70.
   */
  caractvalcode!: string;
  /**
   * Denominación.
   * Maximum length: 70.
   */
  caractvaldesc!: string;
  /**
   * Valor caract.
   * Maximum length: 70.
   */
  depvalcode!: string;
  /**
   * Denominación.
   * Maximum length: 70.
   */
  depvaldesc!: string;
  /**
   * Valor de.
   */
  depvalnum!: number;

  /**
   * Returns an entity builder to construct instances `CaracteriticasV2Set`.
   * @returns A builder that constructs instances of entity type `CaracteriticasV2Set`.
   */
  static builder(): EntityBuilderType<CaracteriticasV2Set, CaracteriticasV2SetTypeForceMandatory> {
    return Entity.entityBuilder(CaracteriticasV2Set);
  }

  /**
   * Returns a request builder to construct requests for operations on the `CaracteriticasV2Set` entity type.
   * @returns A `CaracteriticasV2Set` request builder.
   */
  static requestBuilder(): CaracteriticasV2SetRequestBuilder {
    return new CaracteriticasV2SetRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `CaracteriticasV2Set`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `CaracteriticasV2Set`.
   */
  static customField(fieldName: string): CustomField<CaracteriticasV2Set> {
    return Entity.customFieldSelector(fieldName, CaracteriticasV2Set);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface CaracteriticasV2SetType {
  mandt: string;
  caractname: string;
  caractdesc: string;
  caractvalcode: string;
  caractvaldesc: string;
  depvalcode: string;
  depvaldesc: string;
  depvalnum: number;
}

export interface CaracteriticasV2SetTypeForceMandatory {
  mandt: string;
  caractname: string;
  caractdesc: string;
  caractvalcode: string;
  caractvaldesc: string;
  depvalcode: string;
  depvaldesc: string;
  depvalnum: number;
}

export namespace CaracteriticasV2Set {
  /**
   * Static representation of the [[mandt]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const MANDT: StringField<CaracteriticasV2Set> = new StringField('MANDT', CaracteriticasV2Set, 'Edm.String');
  /**
   * Static representation of the [[caractname]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const CARACTNAME: StringField<CaracteriticasV2Set> = new StringField('CARACTNAME', CaracteriticasV2Set, 'Edm.String');
  /**
   * Static representation of the [[caractdesc]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const CARACTDESC: StringField<CaracteriticasV2Set> = new StringField('CARACTDESC', CaracteriticasV2Set, 'Edm.String');
  /**
   * Static representation of the [[caractvalcode]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const CARACTVALCODE: StringField<CaracteriticasV2Set> = new StringField('CARACTVALCODE', CaracteriticasV2Set, 'Edm.String');
  /**
   * Static representation of the [[caractvaldesc]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const CARACTVALDESC: StringField<CaracteriticasV2Set> = new StringField('CARACTVALDESC', CaracteriticasV2Set, 'Edm.String');
  /**
   * Static representation of the [[depvalcode]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DEPVALCODE: StringField<CaracteriticasV2Set> = new StringField('DEPVALCODE', CaracteriticasV2Set, 'Edm.String');
  /**
   * Static representation of the [[depvaldesc]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DEPVALDESC: StringField<CaracteriticasV2Set> = new StringField('DEPVALDESC', CaracteriticasV2Set, 'Edm.String');
  /**
   * Static representation of the [[depvalnum]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DEPVALNUM: NumberField<CaracteriticasV2Set> = new NumberField('DEPVALNUM', CaracteriticasV2Set, 'Edm.Double');
  /**
   * All fields of the CaracteriticasV2Set entity.
   */
  export const _allFields: Array<StringField<CaracteriticasV2Set> | NumberField<CaracteriticasV2Set>> = [
    CaracteriticasV2Set.MANDT,
    CaracteriticasV2Set.CARACTNAME,
    CaracteriticasV2Set.CARACTDESC,
    CaracteriticasV2Set.CARACTVALCODE,
    CaracteriticasV2Set.CARACTVALDESC,
    CaracteriticasV2Set.DEPVALCODE,
    CaracteriticasV2Set.DEPVALDESC,
    CaracteriticasV2Set.DEPVALNUM
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<CaracteriticasV2Set> = new AllFields('*', CaracteriticasV2Set);
  /**
   * All key fields of the CaracteriticasV2Set entity.
   */
  export const _keyFields: Array<Selectable<CaracteriticasV2Set>> = [CaracteriticasV2Set.CARACTNAME, CaracteriticasV2Set.CARACTVALCODE];
  /**
   * Mapping of all key field names to the respective static field property CaracteriticasV2Set.
   */
  export const _keys: { [keys: string]: Selectable<CaracteriticasV2Set> } = CaracteriticasV2Set._keyFields.reduce((acc: { [keys: string]: Selectable<CaracteriticasV2Set> }, field: Selectable<CaracteriticasV2Set>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
