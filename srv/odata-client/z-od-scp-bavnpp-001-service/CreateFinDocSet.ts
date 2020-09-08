/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CreateFinDocSetRequestBuilder } from './CreateFinDocSetRequestBuilder';
import { AllFields, CustomField, Entity, EntityBuilderType, Field, Link, StringField } from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "CreateFinDocSet" of service "Z_OD_SCP_BAVNPP001_SRV".
 */
export class CreateFinDocSet extends Entity implements CreateFinDocSetType {
  /**
   * Technical entity name for CreateFinDocSet.
   */
  static _entityName = 'CreateFinDocSet';
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for CreateFinDocSet.
   */
  static _serviceName = 'Z_OD_SCP_BAVNPP001_SRV';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/Z_OD_SCP_BAVNPP001_SRV';
  /**
   * Texto 36 pos.
   * Maximum length: 36.
   */
  hdid!: string;
  /**
   * Txt.cab.doc.
   * Maximum length: 25.
   */
  hdtext!: string;
  /**
   * Id. Vehículo.
   * Maximum length: 36.
   */
  idvehi!: string;
  /**
   * VIN/Serie.
   * Maximum length: 17.
   */
  vin!: string;
  /**
   * Sociedad.
   * Maximum length: 4.
   */
  company!: string;
  /**
   * Oper. Fin.
   * Maximum length: 6.
   */
  finoper!: string;
  /**
   * Cta.mayor.
   * Maximum length: 10.
   */
  account!: string;
  /**
   * Centro de coste.
   * Maximum length: 10.
   */
  costcenter!: string;
  /**
   * Tipo de cambio.
   * Maximum length: 10.
   */
  exchRate!: string;
  /**
   * Fecha de Documento.
   * Maximum length: 8.
   */
  docDate!: string;
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
   * One-to-many navigation property to the [[ItemsSet]] entity.
   */
  itemsSet!: ItemsSet[];
  /**
   * One-to-many navigation property to the [[RetSet]] entity.
   */
  retSet!: RetSet[];

  /**
   * Returns an entity builder to construct instances `CreateFinDocSet`.
   * @returns A builder that constructs instances of entity type `CreateFinDocSet`.
   */
  static builder(): EntityBuilderType<CreateFinDocSet, CreateFinDocSetTypeForceMandatory> {
    return Entity.entityBuilder(CreateFinDocSet);
  }

  /**
   * Returns a request builder to construct requests for operations on the `CreateFinDocSet` entity type.
   * @returns A `CreateFinDocSet` request builder.
   */
  static requestBuilder(): CreateFinDocSetRequestBuilder {
    return new CreateFinDocSetRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `CreateFinDocSet`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `CreateFinDocSet`.
   */
  static customField(fieldName: string): CustomField<CreateFinDocSet> {
    return Entity.customFieldSelector(fieldName, CreateFinDocSet);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

import { ItemsSet, ItemsSetType } from './ItemsSet';
import { RetSet, RetSetType } from './RetSet';

export interface CreateFinDocSetType {
  hdid: string;
  hdtext: string;
  idvehi: string;
  vin: string;
  company: string;
  finoper: string;
  account: string;
  costcenter: string;
  exchRate: string;
  docDate: string;
  scpuser: string;
  scpapp: string;
  itemsSet: ItemsSetType[];
  retSet: RetSetType[];
}

export interface CreateFinDocSetTypeForceMandatory {
  hdid: string;
  hdtext: string;
  idvehi: string;
  vin: string;
  company: string;
  finoper: string;
  account: string;
  costcenter: string;
  exchRate: string;
  docDate: string;
  scpuser: string;
  scpapp: string;
  itemsSet: ItemsSetType[];
  retSet: RetSetType[];
}

export namespace CreateFinDocSet {
  /**
   * Static representation of the [[hdid]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const HDID: StringField<CreateFinDocSet> = new StringField('Hdid', CreateFinDocSet, 'Edm.String');
  /**
   * Static representation of the [[hdtext]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const HDTEXT: StringField<CreateFinDocSet> = new StringField('Hdtext', CreateFinDocSet, 'Edm.String');
  /**
   * Static representation of the [[idvehi]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const IDVEHI: StringField<CreateFinDocSet> = new StringField('Idvehi', CreateFinDocSet, 'Edm.String');
  /**
   * Static representation of the [[vin]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const VIN: StringField<CreateFinDocSet> = new StringField('Vin', CreateFinDocSet, 'Edm.String');
  /**
   * Static representation of the [[company]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const COMPANY: StringField<CreateFinDocSet> = new StringField('Company', CreateFinDocSet, 'Edm.String');
  /**
   * Static representation of the [[finoper]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const FINOPER: StringField<CreateFinDocSet> = new StringField('Finoper', CreateFinDocSet, 'Edm.String');
  /**
   * Static representation of the [[account]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ACCOUNT: StringField<CreateFinDocSet> = new StringField('Account', CreateFinDocSet, 'Edm.String');
  /**
   * Static representation of the [[costcenter]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const COSTCENTER: StringField<CreateFinDocSet> = new StringField('Costcenter', CreateFinDocSet, 'Edm.String');
  /**
   * Static representation of the [[exchRate]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const EXCH_RATE: StringField<CreateFinDocSet> = new StringField('Exch_rate', CreateFinDocSet, 'Edm.String');
  /**
   * Static representation of the [[docDate]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DOC_DATE: StringField<CreateFinDocSet> = new StringField('DocDate', CreateFinDocSet, 'Edm.String');
  /**
   * Static representation of the [[scpuser]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const SCPUSER: StringField<CreateFinDocSet> = new StringField('Scpuser', CreateFinDocSet, 'Edm.String');
  /**
   * Static representation of the [[scpapp]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const SCPAPP: StringField<CreateFinDocSet> = new StringField('Scpapp', CreateFinDocSet, 'Edm.String');
  /**
   * Static representation of the one-to-many navigation property [[itemsSet]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ITEMS_SET: Link<CreateFinDocSet, ItemsSet> = new Link('ItemsSet', CreateFinDocSet, ItemsSet);
  /**
   * Static representation of the one-to-many navigation property [[retSet]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const RET_SET: Link<CreateFinDocSet, RetSet> = new Link('RetSet', CreateFinDocSet, RetSet);
  /**
   * All fields of the CreateFinDocSet entity.
   */
  export const _allFields: Array<StringField<CreateFinDocSet> | Link<CreateFinDocSet, ItemsSet> | Link<CreateFinDocSet, RetSet>> = [
    CreateFinDocSet.HDID,
    CreateFinDocSet.HDTEXT,
    CreateFinDocSet.IDVEHI,
    CreateFinDocSet.VIN,
    CreateFinDocSet.COMPANY,
    CreateFinDocSet.FINOPER,
    CreateFinDocSet.ACCOUNT,
    CreateFinDocSet.COSTCENTER,
    CreateFinDocSet.EXCH_RATE,
    CreateFinDocSet.DOC_DATE,
    CreateFinDocSet.SCPUSER,
    CreateFinDocSet.SCPAPP,
    CreateFinDocSet.ITEMS_SET,
    CreateFinDocSet.RET_SET
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<CreateFinDocSet> = new AllFields('*', CreateFinDocSet);
  /**
   * All key fields of the CreateFinDocSet entity.
   */
  export const _keyFields: Array<Field<CreateFinDocSet>> = [CreateFinDocSet.HDID];
  /**
   * Mapping of all key field names to the respective static field property CreateFinDocSet.
   */
  export const _keys: { [keys: string]: Field<CreateFinDocSet> } = CreateFinDocSet._keyFields.reduce((acc: { [keys: string]: Field<CreateFinDocSet> }, field: Field<CreateFinDocSet>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
