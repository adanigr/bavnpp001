/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { ActFij_PpSetRequestBuilder } from './ActFij_PpSetRequestBuilder';
import { BigNumber } from 'bignumber.js';
import { AllFields, BigNumberField, CustomField, Entity, EntityBuilderType, Field, StringField } from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "ActFij_PPSet" of service "Z_OD_SCP_BAVNPP001_SRV".
 */
export class ActFij_PpSet extends Entity implements ActFij_PpSetType {
  /**
   * Technical entity name for ActFij_PpSet.
   */
  static _entityName = 'ActFij_PPSet';
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for ActFij_PpSet.
   */
  static _serviceName = 'Z_OD_SCP_BAVNPP001_SRV';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/Z_OD_SCP_BAVNPP001_SRV';
  /**
   * Sociedad.
   * Maximum length: 4.
   */
  bukrs!: string;
  /**
   * VIN/Serie.
   * Maximum length: 17.
   */
  vin!: string;
  /**
   * Id. Vehículo.
   * Maximum length: 36.
   */
  idvehi!: string;
  /**
   * Matrícula vehículo.
   * Maximum length: 15.
   */
  kfzkz!: string;
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
   * ID_MARCA.
   * Maximum length: 70.
   */
  idMarca!: string;
  /**
   * ID_MODELO.
   * Maximum length: 70.
   */
  idModelo!: string;
  /**
   * ID_GAMA.
   * Maximum length: 70.
   */
  idGama!: string;
  /**
   * ID_COLOREXT.
   * Maximum length: 70.
   */
  idColorext!: string;
  /**
   * ID_COLORINT.
   * Maximum length: 70.
   */
  idColorint!: string;
  /**
   * ANSWL.
   */
  answl!: BigNumber;
  /**
   * LIFNR.
   * Maximum length: 10.
   */
  lifnr!: string;

  /**
   * Returns an entity builder to construct instances `ActFij_PpSet`.
   * @returns A builder that constructs instances of entity type `ActFij_PpSet`.
   */
  static builder(): EntityBuilderType<ActFij_PpSet, ActFij_PpSetTypeForceMandatory> {
    return Entity.entityBuilder(ActFij_PpSet);
  }

  /**
   * Returns a request builder to construct requests for operations on the `ActFij_PpSet` entity type.
   * @returns A `ActFij_PpSet` request builder.
   */
  static requestBuilder(): ActFij_PpSetRequestBuilder {
    return new ActFij_PpSetRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `ActFij_PpSet`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `ActFij_PpSet`.
   */
  static customField(fieldName: string): CustomField<ActFij_PpSet> {
    return Entity.customFieldSelector(fieldName, ActFij_PpSet);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface ActFij_PpSetType {
  bukrs: string;
  vin: string;
  idvehi: string;
  kfzkz: string;
  werks: string;
  segment: string;
  idMarca: string;
  idModelo: string;
  idGama: string;
  idColorext: string;
  idColorint: string;
  answl: BigNumber;
  lifnr: string;
}

export interface ActFij_PpSetTypeForceMandatory {
  bukrs: string;
  vin: string;
  idvehi: string;
  kfzkz: string;
  werks: string;
  segment: string;
  idMarca: string;
  idModelo: string;
  idGama: string;
  idColorext: string;
  idColorint: string;
  answl: BigNumber;
  lifnr: string;
}

export namespace ActFij_PpSet {
  /**
   * Static representation of the [[bukrs]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const BUKRS: StringField<ActFij_PpSet> = new StringField('Bukrs', ActFij_PpSet, 'Edm.String');
  /**
   * Static representation of the [[vin]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const VIN: StringField<ActFij_PpSet> = new StringField('Vin', ActFij_PpSet, 'Edm.String');
  /**
   * Static representation of the [[idvehi]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const IDVEHI: StringField<ActFij_PpSet> = new StringField('Idvehi', ActFij_PpSet, 'Edm.String');
  /**
   * Static representation of the [[kfzkz]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KFZKZ: StringField<ActFij_PpSet> = new StringField('Kfzkz', ActFij_PpSet, 'Edm.String');
  /**
   * Static representation of the [[werks]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const WERKS: StringField<ActFij_PpSet> = new StringField('Werks', ActFij_PpSet, 'Edm.String');
  /**
   * Static representation of the [[segment]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const SEGMENT: StringField<ActFij_PpSet> = new StringField('Segment', ActFij_PpSet, 'Edm.String');
  /**
   * Static representation of the [[idMarca]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ID_MARCA: StringField<ActFij_PpSet> = new StringField('IdMarca', ActFij_PpSet, 'Edm.String');
  /**
   * Static representation of the [[idModelo]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ID_MODELO: StringField<ActFij_PpSet> = new StringField('IdModelo', ActFij_PpSet, 'Edm.String');
  /**
   * Static representation of the [[idGama]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ID_GAMA: StringField<ActFij_PpSet> = new StringField('IdGama', ActFij_PpSet, 'Edm.String');
  /**
   * Static representation of the [[idColorext]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ID_COLOREXT: StringField<ActFij_PpSet> = new StringField('IdColorext', ActFij_PpSet, 'Edm.String');
  /**
   * Static representation of the [[idColorint]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ID_COLORINT: StringField<ActFij_PpSet> = new StringField('IdColorint', ActFij_PpSet, 'Edm.String');
  /**
   * Static representation of the [[answl]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ANSWL: BigNumberField<ActFij_PpSet> = new BigNumberField('Answl', ActFij_PpSet, 'Edm.Decimal');
  /**
   * Static representation of the [[lifnr]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const LIFNR: StringField<ActFij_PpSet> = new StringField('Lifnr', ActFij_PpSet, 'Edm.String');
  /**
   * All fields of the ActFij_PpSet entity.
   */
  export const _allFields: Array<StringField<ActFij_PpSet> | BigNumberField<ActFij_PpSet>> = [
    ActFij_PpSet.BUKRS,
    ActFij_PpSet.VIN,
    ActFij_PpSet.IDVEHI,
    ActFij_PpSet.KFZKZ,
    ActFij_PpSet.WERKS,
    ActFij_PpSet.SEGMENT,
    ActFij_PpSet.ID_MARCA,
    ActFij_PpSet.ID_MODELO,
    ActFij_PpSet.ID_GAMA,
    ActFij_PpSet.ID_COLOREXT,
    ActFij_PpSet.ID_COLORINT,
    ActFij_PpSet.ANSWL,
    ActFij_PpSet.LIFNR
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<ActFij_PpSet> = new AllFields('*', ActFij_PpSet);
  /**
   * All key fields of the ActFij_PpSet entity.
   */
  export const _keyFields: Array<Field<ActFij_PpSet>> = [ActFij_PpSet.BUKRS, ActFij_PpSet.VIN];
  /**
   * Mapping of all key field names to the respective static field property ActFij_PpSet.
   */
  export const _keys: { [keys: string]: Field<ActFij_PpSet> } = ActFij_PpSet._keyFields.reduce((acc: { [keys: string]: Field<ActFij_PpSet> }, field: Field<ActFij_PpSet>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
