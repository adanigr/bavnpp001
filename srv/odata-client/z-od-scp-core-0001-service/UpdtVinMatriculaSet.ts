/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { UpdtVinMatriculaSetRequestBuilder } from './UpdtVinMatriculaSetRequestBuilder';
import { AllFields, CustomField, Entity, EntityBuilderType, Selectable, StringField } from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "UpdtVinMatriculaSet" of service "Z_OD_SCP_CORE_0001_SRV".
 */
export class UpdtVinMatriculaSet extends Entity implements UpdtVinMatriculaSetType {
  /**
   * Technical entity name for UpdtVinMatriculaSet.
   */
  static _entityName = 'UpdtVinMatriculaSet';
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for UpdtVinMatriculaSet.
   */
  static _serviceName = 'Z_OD_SCP_CORE_0001_SRV';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/Z_OD_SCP_CORE_0001_SRV';
  /**
   * Id. Vehículo.
   * Maximum length: 36.
   */
  idvehi!: string;
  /**
   * Nº ident.fabr.
   * Maximum length: 30.
   * @nullable
   */
  vin?: string;
  /**
   * Matríc.vehículo.
   * Maximum length: 15.
   * @nullable
   */
  lnum?: string;
  /**
   * División.
   * Maximum length: 4.
   * @nullable
   */
  gsber?: string;
  /**
   * App.
   * Maximum length: 50.
   * @nullable
   */
  scpuser?: string;
  /**
   * Usuario SCP.
   * Maximum length: 30.
   * @nullable
   */
  scpapp?: string;
  /**
   * Tipo de mensaje.
   * Maximum length: 1.
   * @nullable
   */
  msgtype?: string;
  /**
   * Texto mensaje.
   * Maximum length: 220.
   * @nullable
   */
  message?: string;
  /**
   * Variable de mensaje.
   * Maximum length: 50.
   * @nullable
   */
  messageV1?: string;

  /**
   * Returns an entity builder to construct instances `UpdtVinMatriculaSet`.
   * @returns A builder that constructs instances of entity type `UpdtVinMatriculaSet`.
   */
  static builder(): EntityBuilderType<UpdtVinMatriculaSet, UpdtVinMatriculaSetTypeForceMandatory> {
    return Entity.entityBuilder(UpdtVinMatriculaSet);
  }

  /**
   * Returns a request builder to construct requests for operations on the `UpdtVinMatriculaSet` entity type.
   * @returns A `UpdtVinMatriculaSet` request builder.
   */
  static requestBuilder(): UpdtVinMatriculaSetRequestBuilder {
    return new UpdtVinMatriculaSetRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `UpdtVinMatriculaSet`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `UpdtVinMatriculaSet`.
   */
  static customField(fieldName: string): CustomField<UpdtVinMatriculaSet> {
    return Entity.customFieldSelector(fieldName, UpdtVinMatriculaSet);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface UpdtVinMatriculaSetType {
  idvehi: string;
  vin?: string;
  lnum?: string;
  gsber?: string;
  scpuser?: string;
  scpapp?: string;
  msgtype?: string;
  message?: string;
  messageV1?: string;
}

export interface UpdtVinMatriculaSetTypeForceMandatory {
  idvehi: string;
  vin: string;
  lnum: string;
  gsber: string;
  scpuser: string;
  scpapp: string;
  msgtype: string;
  message: string;
  messageV1: string;
}

export namespace UpdtVinMatriculaSet {
  /**
   * Static representation of the [[idvehi]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const IDVEHI: StringField<UpdtVinMatriculaSet> = new StringField('Idvehi', UpdtVinMatriculaSet, 'Edm.String');
  /**
   * Static representation of the [[vin]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const VIN: StringField<UpdtVinMatriculaSet> = new StringField('Vin', UpdtVinMatriculaSet, 'Edm.String');
  /**
   * Static representation of the [[lnum]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const LNUM: StringField<UpdtVinMatriculaSet> = new StringField('Lnum', UpdtVinMatriculaSet, 'Edm.String');
  /**
   * Static representation of the [[gsber]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const GSBER: StringField<UpdtVinMatriculaSet> = new StringField('Gsber', UpdtVinMatriculaSet, 'Edm.String');
  /**
   * Static representation of the [[scpuser]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const SCPUSER: StringField<UpdtVinMatriculaSet> = new StringField('Scpuser', UpdtVinMatriculaSet, 'Edm.String');
  /**
   * Static representation of the [[scpapp]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const SCPAPP: StringField<UpdtVinMatriculaSet> = new StringField('Scpapp', UpdtVinMatriculaSet, 'Edm.String');
  /**
   * Static representation of the [[msgtype]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const MSGTYPE: StringField<UpdtVinMatriculaSet> = new StringField('Msgtype', UpdtVinMatriculaSet, 'Edm.String');
  /**
   * Static representation of the [[message]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const MESSAGE: StringField<UpdtVinMatriculaSet> = new StringField('Message', UpdtVinMatriculaSet, 'Edm.String');
  /**
   * Static representation of the [[messageV1]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const MESSAGE_V_1: StringField<UpdtVinMatriculaSet> = new StringField('MessageV1', UpdtVinMatriculaSet, 'Edm.String');
  /**
   * All fields of the UpdtVinMatriculaSet entity.
   */
  export const _allFields: Array<StringField<UpdtVinMatriculaSet>> = [
    UpdtVinMatriculaSet.IDVEHI,
    UpdtVinMatriculaSet.VIN,
    UpdtVinMatriculaSet.LNUM,
    UpdtVinMatriculaSet.GSBER,
    UpdtVinMatriculaSet.SCPUSER,
    UpdtVinMatriculaSet.SCPAPP,
    UpdtVinMatriculaSet.MSGTYPE,
    UpdtVinMatriculaSet.MESSAGE,
    UpdtVinMatriculaSet.MESSAGE_V_1
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<UpdtVinMatriculaSet> = new AllFields('*', UpdtVinMatriculaSet);
  /**
   * All key fields of the UpdtVinMatriculaSet entity.
   */
  export const _keyFields: Array<Selectable<UpdtVinMatriculaSet>> = [UpdtVinMatriculaSet.IDVEHI];
  /**
   * Mapping of all key field names to the respective static field property UpdtVinMatriculaSet.
   */
  export const _keys: { [keys: string]: Selectable<UpdtVinMatriculaSet> } = UpdtVinMatriculaSet._keyFields.reduce((acc: { [keys: string]: Selectable<UpdtVinMatriculaSet> }, field: Selectable<UpdtVinMatriculaSet>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
