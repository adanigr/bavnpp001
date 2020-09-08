/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CreatePolizaPmSetRequestBuilder } from './CreatePolizaPmSetRequestBuilder';
import { AllFields, CustomField, Entity, EntityBuilderType, Field, Link, StringField } from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "CreatePolizaPMSet" of service "Z_OD_SCP_BAVNPP001_SRV".
 */
export class CreatePolizaPmSet extends Entity implements CreatePolizaPmSetType {
  /**
   * Technical entity name for CreatePolizaPmSet.
   */
  static _entityName = 'CreatePolizaPMSet';
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for CreatePolizaPmSet.
   */
  static _serviceName = 'Z_OD_SCP_BAVNPP001_SRV';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/Z_OD_SCP_BAVNPP001_SRV';
  /**
   * Hdtext.
   * Maximum length: 25.
   */
  hdtext!: string;
  /**
   * Company.
   * Maximum length: 4.
   */
  company!: string;
  /**
   * Finoper.
   * Maximum length: 6.
   */
  finoper!: string;
  /**
   * Currency.
   * Maximum length: 5.
   */
  currency!: string;
  /**
   * Docdate.
   * Maximum length: 8.
   */
  docdate!: string;
  /**
   * Scpuser.
   * Maximum length: 30.
   */
  scpuser!: string;
  /**
   * Scpapp.
   * Maximum length: 50.
   */
  scpapp!: string;
  /**
   * Refdocno.
   * Maximum length: 16.
   */
  refdocno!: string;
  /**
   * One-to-many navigation property to the [[CreatePolizaPmItemSet]] entity.
   */
  createPolizaPmItemSet!: CreatePolizaPmItemSet[];
  /**
   * One-to-many navigation property to the [[RetSet]] entity.
   */
  retSet!: RetSet[];

  /**
   * Returns an entity builder to construct instances `CreatePolizaPmSet`.
   * @returns A builder that constructs instances of entity type `CreatePolizaPmSet`.
   */
  static builder(): EntityBuilderType<CreatePolizaPmSet, CreatePolizaPmSetTypeForceMandatory> {
    return Entity.entityBuilder(CreatePolizaPmSet);
  }

  /**
   * Returns a request builder to construct requests for operations on the `CreatePolizaPmSet` entity type.
   * @returns A `CreatePolizaPmSet` request builder.
   */
  static requestBuilder(): CreatePolizaPmSetRequestBuilder {
    return new CreatePolizaPmSetRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `CreatePolizaPmSet`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `CreatePolizaPmSet`.
   */
  static customField(fieldName: string): CustomField<CreatePolizaPmSet> {
    return Entity.customFieldSelector(fieldName, CreatePolizaPmSet);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

import { CreatePolizaPmItemSet, CreatePolizaPmItemSetType } from './CreatePolizaPmItemSet';
import { RetSet, RetSetType } from './RetSet';

export interface CreatePolizaPmSetType {
  hdtext: string;
  company: string;
  finoper: string;
  currency: string;
  docdate: string;
  scpuser: string;
  scpapp: string;
  refdocno: string;
  createPolizaPmItemSet: CreatePolizaPmItemSetType[];
  retSet: RetSetType[];
}

export interface CreatePolizaPmSetTypeForceMandatory {
  hdtext: string;
  company: string;
  finoper: string;
  currency: string;
  docdate: string;
  scpuser: string;
  scpapp: string;
  refdocno: string;
  createPolizaPmItemSet: CreatePolizaPmItemSetType[];
  retSet: RetSetType[];
}

export namespace CreatePolizaPmSet {
  /**
   * Static representation of the [[hdtext]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const HDTEXT: StringField<CreatePolizaPmSet> = new StringField('Hdtext', CreatePolizaPmSet, 'Edm.String');
  /**
   * Static representation of the [[company]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const COMPANY: StringField<CreatePolizaPmSet> = new StringField('Company', CreatePolizaPmSet, 'Edm.String');
  /**
   * Static representation of the [[finoper]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const FINOPER: StringField<CreatePolizaPmSet> = new StringField('Finoper', CreatePolizaPmSet, 'Edm.String');
  /**
   * Static representation of the [[currency]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const CURRENCY: StringField<CreatePolizaPmSet> = new StringField('Currency', CreatePolizaPmSet, 'Edm.String');
  /**
   * Static representation of the [[docdate]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DOCDATE: StringField<CreatePolizaPmSet> = new StringField('Docdate', CreatePolizaPmSet, 'Edm.String');
  /**
   * Static representation of the [[scpuser]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const SCPUSER: StringField<CreatePolizaPmSet> = new StringField('Scpuser', CreatePolizaPmSet, 'Edm.String');
  /**
   * Static representation of the [[scpapp]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const SCPAPP: StringField<CreatePolizaPmSet> = new StringField('Scpapp', CreatePolizaPmSet, 'Edm.String');
  /**
   * Static representation of the [[refdocno]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const REFDOCNO: StringField<CreatePolizaPmSet> = new StringField('Refdocno', CreatePolizaPmSet, 'Edm.String');
  /**
   * Static representation of the one-to-many navigation property [[createPolizaPmItemSet]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const CREATE_POLIZA_PM_ITEM_SET: Link<CreatePolizaPmSet, CreatePolizaPmItemSet> = new Link('CreatePolizaPMItemSet', CreatePolizaPmSet, CreatePolizaPmItemSet);
  /**
   * Static representation of the one-to-many navigation property [[retSet]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const RET_SET: Link<CreatePolizaPmSet, RetSet> = new Link('RetSet', CreatePolizaPmSet, RetSet);
  /**
   * All fields of the CreatePolizaPmSet entity.
   */
  export const _allFields: Array<StringField<CreatePolizaPmSet> | Link<CreatePolizaPmSet, CreatePolizaPmItemSet> | Link<CreatePolizaPmSet, RetSet>> = [
    CreatePolizaPmSet.HDTEXT,
    CreatePolizaPmSet.COMPANY,
    CreatePolizaPmSet.FINOPER,
    CreatePolizaPmSet.CURRENCY,
    CreatePolizaPmSet.DOCDATE,
    CreatePolizaPmSet.SCPUSER,
    CreatePolizaPmSet.SCPAPP,
    CreatePolizaPmSet.REFDOCNO,
    CreatePolizaPmSet.CREATE_POLIZA_PM_ITEM_SET,
    CreatePolizaPmSet.RET_SET
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<CreatePolizaPmSet> = new AllFields('*', CreatePolizaPmSet);
  /**
   * All key fields of the CreatePolizaPmSet entity.
   */
  export const _keyFields: Array<Field<CreatePolizaPmSet>> = [CreatePolizaPmSet.HDTEXT];
  /**
   * Mapping of all key field names to the respective static field property CreatePolizaPmSet.
   */
  export const _keys: { [keys: string]: Field<CreatePolizaPmSet> } = CreatePolizaPmSet._keyFields.reduce((acc: { [keys: string]: Field<CreatePolizaPmSet> }, field: Field<CreatePolizaPmSet>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
