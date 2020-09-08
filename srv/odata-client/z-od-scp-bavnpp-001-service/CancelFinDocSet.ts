/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CancelFinDocSetRequestBuilder } from './CancelFinDocSetRequestBuilder';
import { AllFields, CustomField, Entity, EntityBuilderType, Field, StringField } from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "CancelFinDocSet" of service "Z_OD_SCP_BAVNPP001_SRV".
 */
export class CancelFinDocSet extends Entity implements CancelFinDocSetType {
  /**
   * Technical entity name for CancelFinDocSet.
   */
  static _entityName = 'CancelFinDocSet';
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for CancelFinDocSet.
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
   * Clv.referencia.
   * Maximum length: 20.
   */
  docid!: string;
  /**
   * Usuario SCP.
   * Maximum length: 30.
   */
  scpuser!: string;
  /**
   * App.
   * Maximum length: 50.
   */
  scpapp!: string;
  /**
   * Indicador de Exito.
   * Maximum length: 1.
   * @nullable
   */
  cancelind?: string;
  /**
   * Nº documento.
   * Maximum length: 10.
   * @nullable
   */
  canceldoc?: string;

  /**
   * Returns an entity builder to construct instances `CancelFinDocSet`.
   * @returns A builder that constructs instances of entity type `CancelFinDocSet`.
   */
  static builder(): EntityBuilderType<CancelFinDocSet, CancelFinDocSetTypeForceMandatory> {
    return Entity.entityBuilder(CancelFinDocSet);
  }

  /**
   * Returns a request builder to construct requests for operations on the `CancelFinDocSet` entity type.
   * @returns A `CancelFinDocSet` request builder.
   */
  static requestBuilder(): CancelFinDocSetRequestBuilder {
    return new CancelFinDocSetRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `CancelFinDocSet`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `CancelFinDocSet`.
   */
  static customField(fieldName: string): CustomField<CancelFinDocSet> {
    return Entity.customFieldSelector(fieldName, CancelFinDocSet);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface CancelFinDocSetType {
  idvehi: string;
  docid: string;
  scpuser: string;
  scpapp: string;
  cancelind?: string;
  canceldoc?: string;
}

export interface CancelFinDocSetTypeForceMandatory {
  idvehi: string;
  docid: string;
  scpuser: string;
  scpapp: string;
  cancelind: string;
  canceldoc: string;
}

export namespace CancelFinDocSet {
  /**
   * Static representation of the [[idvehi]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const IDVEHI: StringField<CancelFinDocSet> = new StringField('Idvehi', CancelFinDocSet, 'Edm.String');
  /**
   * Static representation of the [[docid]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DOCID: StringField<CancelFinDocSet> = new StringField('Docid', CancelFinDocSet, 'Edm.String');
  /**
   * Static representation of the [[scpuser]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const SCPUSER: StringField<CancelFinDocSet> = new StringField('Scpuser', CancelFinDocSet, 'Edm.String');
  /**
   * Static representation of the [[scpapp]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const SCPAPP: StringField<CancelFinDocSet> = new StringField('Scpapp', CancelFinDocSet, 'Edm.String');
  /**
   * Static representation of the [[cancelind]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const CANCELIND: StringField<CancelFinDocSet> = new StringField('Cancelind', CancelFinDocSet, 'Edm.String');
  /**
   * Static representation of the [[canceldoc]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const CANCELDOC: StringField<CancelFinDocSet> = new StringField('Canceldoc', CancelFinDocSet, 'Edm.String');
  /**
   * All fields of the CancelFinDocSet entity.
   */
  export const _allFields: Array<StringField<CancelFinDocSet>> = [
    CancelFinDocSet.IDVEHI,
    CancelFinDocSet.DOCID,
    CancelFinDocSet.SCPUSER,
    CancelFinDocSet.SCPAPP,
    CancelFinDocSet.CANCELIND,
    CancelFinDocSet.CANCELDOC
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<CancelFinDocSet> = new AllFields('*', CancelFinDocSet);
  /**
   * All key fields of the CancelFinDocSet entity.
   */
  export const _keyFields: Array<Field<CancelFinDocSet>> = [CancelFinDocSet.IDVEHI];
  /**
   * Mapping of all key field names to the respective static field property CancelFinDocSet.
   */
  export const _keys: { [keys: string]: Field<CancelFinDocSet> } = CancelFinDocSet._keyFields.reduce((acc: { [keys: string]: Field<CancelFinDocSet> }, field: Field<CancelFinDocSet>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
