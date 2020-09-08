/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CreatePolizaPmItemSetRequestBuilder } from './CreatePolizaPmItemSetRequestBuilder';
import { BigNumber } from 'bignumber.js';
import { AllFields, BigNumberField, CustomField, Entity, EntityBuilderType, Field, StringField } from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "CreatePolizaPMItemSet" of service "Z_OD_SCP_BAVNPP001_SRV".
 */
export class CreatePolizaPmItemSet extends Entity implements CreatePolizaPmItemSetType {
  /**
   * Technical entity name for CreatePolizaPmItemSet.
   */
  static _entityName = 'CreatePolizaPMItemSet';
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for CreatePolizaPmItemSet.
   */
  static _serviceName = 'Z_OD_SCP_BAVNPP001_SRV';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/Z_OD_SCP_BAVNPP001_SRV';
  /**
   * Asignación.
   * Maximum length: 18.
   */
  assignment!: string;
  /**
   * Texto 36 pos.
   * Maximum length: 36.
   */
  hdid!: string;
  /**
   * Cta.mayor.
   * Maximum length: 10.
   */
  account!: string;
  /**
   * Centro coste.
   * Maximum length: 10.
   */
  costcenter!: string;
  /**
   * Proveedor.
   * Maximum length: 10.
   */
  vendorno!: string;
  /**
   * Texto.
   * Maximum length: 50.
   */
  itemtext!: string;
  /**
   * Segmento.
   * Maximum length: 10.
   */
  segment!: string;
  /**
   * División.
   * Maximum length: 4.
   */
  division!: string;
  /**
   * Importe.
   */
  amount!: BigNumber;

  /**
   * Returns an entity builder to construct instances `CreatePolizaPmItemSet`.
   * @returns A builder that constructs instances of entity type `CreatePolizaPmItemSet`.
   */
  static builder(): EntityBuilderType<CreatePolizaPmItemSet, CreatePolizaPmItemSetTypeForceMandatory> {
    return Entity.entityBuilder(CreatePolizaPmItemSet);
  }

  /**
   * Returns a request builder to construct requests for operations on the `CreatePolizaPmItemSet` entity type.
   * @returns A `CreatePolizaPmItemSet` request builder.
   */
  static requestBuilder(): CreatePolizaPmItemSetRequestBuilder {
    return new CreatePolizaPmItemSetRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `CreatePolizaPmItemSet`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `CreatePolizaPmItemSet`.
   */
  static customField(fieldName: string): CustomField<CreatePolizaPmItemSet> {
    return Entity.customFieldSelector(fieldName, CreatePolizaPmItemSet);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface CreatePolizaPmItemSetType {
  assignment: string;
  hdid: string;
  account: string;
  costcenter: string;
  vendorno: string;
  itemtext: string;
  segment: string;
  division: string;
  amount: BigNumber;
}

export interface CreatePolizaPmItemSetTypeForceMandatory {
  assignment: string;
  hdid: string;
  account: string;
  costcenter: string;
  vendorno: string;
  itemtext: string;
  segment: string;
  division: string;
  amount: BigNumber;
}

export namespace CreatePolizaPmItemSet {
  /**
   * Static representation of the [[assignment]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ASSIGNMENT: StringField<CreatePolizaPmItemSet> = new StringField('Assignment', CreatePolizaPmItemSet, 'Edm.String');
  /**
   * Static representation of the [[hdid]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const HDID: StringField<CreatePolizaPmItemSet> = new StringField('Hdid', CreatePolizaPmItemSet, 'Edm.String');
  /**
   * Static representation of the [[account]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ACCOUNT: StringField<CreatePolizaPmItemSet> = new StringField('Account', CreatePolizaPmItemSet, 'Edm.String');
  /**
   * Static representation of the [[costcenter]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const COSTCENTER: StringField<CreatePolizaPmItemSet> = new StringField('Costcenter', CreatePolizaPmItemSet, 'Edm.String');
  /**
   * Static representation of the [[vendorno]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const VENDORNO: StringField<CreatePolizaPmItemSet> = new StringField('Vendorno', CreatePolizaPmItemSet, 'Edm.String');
  /**
   * Static representation of the [[itemtext]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ITEMTEXT: StringField<CreatePolizaPmItemSet> = new StringField('Itemtext', CreatePolizaPmItemSet, 'Edm.String');
  /**
   * Static representation of the [[segment]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const SEGMENT: StringField<CreatePolizaPmItemSet> = new StringField('Segment', CreatePolizaPmItemSet, 'Edm.String');
  /**
   * Static representation of the [[division]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DIVISION: StringField<CreatePolizaPmItemSet> = new StringField('Division', CreatePolizaPmItemSet, 'Edm.String');
  /**
   * Static representation of the [[amount]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const AMOUNT: BigNumberField<CreatePolizaPmItemSet> = new BigNumberField('Amount', CreatePolizaPmItemSet, 'Edm.Decimal');
  /**
   * All fields of the CreatePolizaPmItemSet entity.
   */
  export const _allFields: Array<StringField<CreatePolizaPmItemSet> | BigNumberField<CreatePolizaPmItemSet>> = [
    CreatePolizaPmItemSet.ASSIGNMENT,
    CreatePolizaPmItemSet.HDID,
    CreatePolizaPmItemSet.ACCOUNT,
    CreatePolizaPmItemSet.COSTCENTER,
    CreatePolizaPmItemSet.VENDORNO,
    CreatePolizaPmItemSet.ITEMTEXT,
    CreatePolizaPmItemSet.SEGMENT,
    CreatePolizaPmItemSet.DIVISION,
    CreatePolizaPmItemSet.AMOUNT
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<CreatePolizaPmItemSet> = new AllFields('*', CreatePolizaPmItemSet);
  /**
   * All key fields of the CreatePolizaPmItemSet entity.
   */
  export const _keyFields: Array<Field<CreatePolizaPmItemSet>> = [CreatePolizaPmItemSet.HDID];
  /**
   * Mapping of all key field names to the respective static field property CreatePolizaPmItemSet.
   */
  export const _keys: { [keys: string]: Field<CreatePolizaPmItemSet> } = CreatePolizaPmItemSet._keyFields.reduce((acc: { [keys: string]: Field<CreatePolizaPmItemSet> }, field: Field<CreatePolizaPmItemSet>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
