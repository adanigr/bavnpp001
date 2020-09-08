import { ItemsSetRequestBuilder } from './ItemsSetRequestBuilder';
import { BigNumber } from 'bignumber.js';
import { AllFields, BigNumberField, CustomField, Entity, EntityBuilderType, Field, StringField } from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "ItemsSet" of service "Z_OD_SCP_BAVNPP001_SRV".
 */
export declare class ItemsSet extends Entity implements ItemsSetType {
    /**
     * Technical entity name for ItemsSet.
     */
    static _entityName: string;
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for ItemsSet.
     */
    static _serviceName: string;
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath: string;
    /**
     * Asignación.
     * Maximum length: 18.
     */
    assignment: string;
    /**
     * Texto 36 pos.
     * Maximum length: 36.
     */
    hdid: string;
    /**
     * Proveedor.
     * Maximum length: 10.
     */
    vendorNo: string;
    /**
     * Cliente.
     * Maximum length: 10.
     */
    customer: string;
    /**
     * Texto.
     * Maximum length: 50.
     */
    itemtext: string;
    /**
     * Segmento.
     * Maximum length: 10.
     */
    segment: string;
    /**
     * División.
     * Maximum length: 4.
     */
    division: string;
    /**
     * Moneda.
     * Maximum length: 5.
     */
    currency: string;
    /**
     * Importe.
     */
    amount: BigNumber;
    /**
     * Returns an entity builder to construct instances `ItemsSet`.
     * @returns A builder that constructs instances of entity type `ItemsSet`.
     */
    static builder(): EntityBuilderType<ItemsSet, ItemsSetTypeForceMandatory>;
    /**
     * Returns a request builder to construct requests for operations on the `ItemsSet` entity type.
     * @returns A `ItemsSet` request builder.
     */
    static requestBuilder(): ItemsSetRequestBuilder;
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `ItemsSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `ItemsSet`.
     */
    static customField(fieldName: string): CustomField<ItemsSet>;
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    toJSON(): {
        [key: string]: any;
    };
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
export declare namespace ItemsSet {
    /**
     * Static representation of the [[assignment]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const ASSIGNMENT: StringField<ItemsSet>;
    /**
     * Static representation of the [[hdid]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const HDID: StringField<ItemsSet>;
    /**
     * Static representation of the [[vendorNo]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const VENDOR_NO: StringField<ItemsSet>;
    /**
     * Static representation of the [[customer]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const CUSTOMER: StringField<ItemsSet>;
    /**
     * Static representation of the [[itemtext]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const ITEMTEXT: StringField<ItemsSet>;
    /**
     * Static representation of the [[segment]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const SEGMENT: StringField<ItemsSet>;
    /**
     * Static representation of the [[division]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DIVISION: StringField<ItemsSet>;
    /**
     * Static representation of the [[currency]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const CURRENCY: StringField<ItemsSet>;
    /**
     * Static representation of the [[amount]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const AMOUNT: BigNumberField<ItemsSet>;
    /**
     * All fields of the ItemsSet entity.
     */
    const _allFields: Array<StringField<ItemsSet> | BigNumberField<ItemsSet>>;
    /**
     * All fields selector.
     */
    const ALL_FIELDS: AllFields<ItemsSet>;
    /**
     * All key fields of the ItemsSet entity.
     */
    const _keyFields: Array<Field<ItemsSet>>;
    /**
     * Mapping of all key field names to the respective static field property ItemsSet.
     */
    const _keys: {
        [keys: string]: Field<ItemsSet>;
    };
}
//# sourceMappingURL=ItemsSet.d.ts.map