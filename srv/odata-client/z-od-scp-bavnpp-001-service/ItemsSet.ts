/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { ItemsSetRequestBuilder } from './ItemsSetRequestBuilder';
import { BigNumber } from 'bignumber.js';
import { AllFields, BigNumberField, CustomField, Entity, EntityBuilderType, Field, StringField } from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "ItemsSet" of service "Z_OD_SCP_BAVNPP001_SRV".
 */
export class ItemsSet extends Entity implements ItemsSetType {
  /**
   * Technical entity name for ItemsSet.
   */
  static _entityName = 'ItemsSet';
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for ItemsSet.
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
   * Proveedor.
   * Maximum length: 10.
   */
  vendorNo!: string;
  /**
   * Cliente.
   * Maximum length: 10.
   */
  customer!: string;
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
   * Moneda.
   * Maximum length: 5.
   */
  currency!: string;
  /**
   * Importe.
   */
  amount!: BigNumber;

  /**
   * Returns an entity builder to construct instances `ItemsSet`.
   * @returns A builder that constructs instances of entity type `ItemsSet`.
   */
  static builder(): EntityBuilderType<ItemsSet, ItemsSetTypeForceMandatory> {
    return Entity.entityBuilder(ItemsSet);
  }

  /**
   * Returns a request builder to construct requests for operations on the `ItemsSet` entity type.
   * @returns A `ItemsSet` request builder.
   */
  static requestBuilder(): ItemsSetRequestBuilder {
    return new ItemsSetRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `ItemsSet`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `ItemsSet`.
   */
  static customField(fieldName: string): CustomField<ItemsSet> {
    return Entity.customFieldSelector(fieldName, ItemsSet);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface ItemsSetType {
  assignment: string;
  hdid: string;
  vendorNo: string;
  customer: string;
  itemtext: string;
  segment: string;
  division: string;
  currency: string;
  amount: BigNumber;
}

export interface ItemsSetTypeForceMandatory {
  assignment: string;
  hdid: string;
  vendorNo: string;
  customer: string;
  itemtext: string;
  segment: string;
  division: string;
  currency: string;
  amount: BigNumber;
}

export namespace ItemsSet {
  /**
   * Static representation of the [[assignment]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ASSIGNMENT: StringField<ItemsSet> = new StringField('Assignment', ItemsSet, 'Edm.String');
  /**
   * Static representation of the [[hdid]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const HDID: StringField<ItemsSet> = new StringField('Hdid', ItemsSet, 'Edm.String');
  /**
   * Static representation of the [[vendorNo]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const VENDOR_NO: StringField<ItemsSet> = new StringField('VendorNo', ItemsSet, 'Edm.String');
  /**
   * Static representation of the [[customer]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const CUSTOMER: StringField<ItemsSet> = new StringField('Customer', ItemsSet, 'Edm.String');
  /**
   * Static representation of the [[itemtext]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ITEMTEXT: StringField<ItemsSet> = new StringField('Itemtext', ItemsSet, 'Edm.String');
  /**
   * Static representation of the [[segment]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const SEGMENT: StringField<ItemsSet> = new StringField('Segment', ItemsSet, 'Edm.String');
  /**
   * Static representation of the [[division]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DIVISION: StringField<ItemsSet> = new StringField('Division', ItemsSet, 'Edm.String');
  /**
   * Static representation of the [[currency]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const CURRENCY: StringField<ItemsSet> = new StringField('Currency', ItemsSet, 'Edm.String');
  /**
   * Static representation of the [[amount]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const AMOUNT: BigNumberField<ItemsSet> = new BigNumberField('Amount', ItemsSet, 'Edm.Decimal');
  /**
   * All fields of the ItemsSet entity.
   */
  export const _allFields: Array<StringField<ItemsSet> | BigNumberField<ItemsSet>> = [
    ItemsSet.ASSIGNMENT,
    ItemsSet.HDID,
    ItemsSet.VENDOR_NO,
    ItemsSet.CUSTOMER,
    ItemsSet.ITEMTEXT,
    ItemsSet.SEGMENT,
    ItemsSet.DIVISION,
    ItemsSet.CURRENCY,
    ItemsSet.AMOUNT
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<ItemsSet> = new AllFields('*', ItemsSet);
  /**
   * All key fields of the ItemsSet entity.
   */
  export const _keyFields: Array<Field<ItemsSet>> = [ItemsSet.HDID];
  /**
   * Mapping of all key field names to the respective static field property ItemsSet.
   */
  export const _keys: { [keys: string]: Field<ItemsSet> } = ItemsSet._keyFields.reduce((acc: { [keys: string]: Field<ItemsSet> }, field: Field<ItemsSet>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
