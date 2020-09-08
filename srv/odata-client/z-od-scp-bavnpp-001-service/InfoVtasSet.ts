/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { InfoVtasSetRequestBuilder } from './InfoVtasSetRequestBuilder';
import { Moment } from 'moment';
import { BigNumber } from 'bignumber.js';
import { AllFields, BigNumberField, CustomField, DateField, Entity, EntityBuilderType, Field, StringField } from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "InfoVtasSet" of service "Z_OD_SCP_BAVNPP001_SRV".
 */
export class InfoVtasSet extends Entity implements InfoVtasSetType {
  /**
   * Technical entity name for InfoVtasSet.
   */
  static _entityName = 'InfoVtasSet';
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for InfoVtasSet.
   */
  static _serviceName = 'Z_OD_SCP_BAVNPP001_SRV';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/Z_OD_SCP_BAVNPP001_SRV';
  /**
   * Id. Vehículo.
   * Maximum length: 36.
   */
  idvehi!: string;
  /**
   * Cliente.
   * Maximum length: 10.
   */
  kunnr!: string;
  /**
   * Nombre 1.
   * Maximum length: 30.
   */
  name1!: string;
  /**
   * Documento venta.
   * Maximum length: 10.
   */
  vbelnVa!: string;
  /**
   * Factura.
   * Maximum length: 10.
   */
  vbelnVf!: string;
  /**
   * Campo de texto, longitud 10.
   */
  fkdat!: Moment;
  /**
   * Campo.
   */
  wrbtr!: BigNumber;

  /**
   * Returns an entity builder to construct instances `InfoVtasSet`.
   * @returns A builder that constructs instances of entity type `InfoVtasSet`.
   */
  static builder(): EntityBuilderType<InfoVtasSet, InfoVtasSetTypeForceMandatory> {
    return Entity.entityBuilder(InfoVtasSet);
  }

  /**
   * Returns a request builder to construct requests for operations on the `InfoVtasSet` entity type.
   * @returns A `InfoVtasSet` request builder.
   */
  static requestBuilder(): InfoVtasSetRequestBuilder {
    return new InfoVtasSetRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `InfoVtasSet`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `InfoVtasSet`.
   */
  static customField(fieldName: string): CustomField<InfoVtasSet> {
    return Entity.customFieldSelector(fieldName, InfoVtasSet);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface InfoVtasSetType {
  idvehi: string;
  kunnr: string;
  name1: string;
  vbelnVa: string;
  vbelnVf: string;
  fkdat: Moment;
  wrbtr: BigNumber;
}

export interface InfoVtasSetTypeForceMandatory {
  idvehi: string;
  kunnr: string;
  name1: string;
  vbelnVa: string;
  vbelnVf: string;
  fkdat: Moment;
  wrbtr: BigNumber;
}

export namespace InfoVtasSet {
  /**
   * Static representation of the [[idvehi]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const IDVEHI: StringField<InfoVtasSet> = new StringField('Idvehi', InfoVtasSet, 'Edm.String');
  /**
   * Static representation of the [[kunnr]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KUNNR: StringField<InfoVtasSet> = new StringField('Kunnr', InfoVtasSet, 'Edm.String');
  /**
   * Static representation of the [[name1]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const NAME_1: StringField<InfoVtasSet> = new StringField('Name1', InfoVtasSet, 'Edm.String');
  /**
   * Static representation of the [[vbelnVa]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const VBELN_VA: StringField<InfoVtasSet> = new StringField('VbelnVa', InfoVtasSet, 'Edm.String');
  /**
   * Static representation of the [[vbelnVf]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const VBELN_VF: StringField<InfoVtasSet> = new StringField('VbelnVf', InfoVtasSet, 'Edm.String');
  /**
   * Static representation of the [[fkdat]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const FKDAT: DateField<InfoVtasSet> = new DateField('Fkdat', InfoVtasSet, 'Edm.DateTime');
  /**
   * Static representation of the [[wrbtr]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const WRBTR: BigNumberField<InfoVtasSet> = new BigNumberField('Wrbtr', InfoVtasSet, 'Edm.Decimal');
  /**
   * All fields of the InfoVtasSet entity.
   */
  export const _allFields: Array<StringField<InfoVtasSet> | DateField<InfoVtasSet> | BigNumberField<InfoVtasSet>> = [
    InfoVtasSet.IDVEHI,
    InfoVtasSet.KUNNR,
    InfoVtasSet.NAME_1,
    InfoVtasSet.VBELN_VA,
    InfoVtasSet.VBELN_VF,
    InfoVtasSet.FKDAT,
    InfoVtasSet.WRBTR
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<InfoVtasSet> = new AllFields('*', InfoVtasSet);
  /**
   * All key fields of the InfoVtasSet entity.
   */
  export const _keyFields: Array<Field<InfoVtasSet>> = [InfoVtasSet.IDVEHI];
  /**
   * Mapping of all key field names to the respective static field property InfoVtasSet.
   */
  export const _keys: { [keys: string]: Field<InfoVtasSet> } = InfoVtasSet._keyFields.reduce((acc: { [keys: string]: Field<InfoVtasSet> }, field: Field<InfoVtasSet>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
