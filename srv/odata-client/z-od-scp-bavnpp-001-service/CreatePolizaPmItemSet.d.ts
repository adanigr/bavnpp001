import { CreatePolizaPmItemSetRequestBuilder } from './CreatePolizaPmItemSetRequestBuilder';
import { BigNumber } from 'bignumber.js';
import { AllFields, BigNumberField, CustomField, Entity, EntityBuilderType, Field, StringField } from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "CreatePolizaPMItemSet" of service "Z_OD_SCP_BAVNPP001_SRV".
 */
export declare class CreatePolizaPmItemSet extends Entity implements CreatePolizaPmItemSetType {
    /**
     * Technical entity name for CreatePolizaPmItemSet.
     */
    static _entityName: string;
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for CreatePolizaPmItemSet.
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
     * Cta.mayor.
     * Maximum length: 10.
     */
    account: string;
    /**
     * Centro coste.
     * Maximum length: 10.
     */
    costcenter: string;
    /**
     * Proveedor.
     * Maximum length: 10.
     */
    vendorno: string;
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
     * Importe.
     */
    amount: BigNumber;
    /**
     * Returns an entity builder to construct instances `CreatePolizaPmItemSet`.
     * @returns A builder that constructs instances of entity type `CreatePolizaPmItemSet`.
     */
    static builder(): EntityBuilderType<CreatePolizaPmItemSet, CreatePolizaPmItemSetTypeForceMandatory>;
    /**
     * Returns a request builder to construct requests for operations on the `CreatePolizaPmItemSet` entity type.
     * @returns A `CreatePolizaPmItemSet` request builder.
     */
    static requestBuilder(): CreatePolizaPmItemSetRequestBuilder;
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `CreatePolizaPmItemSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `CreatePolizaPmItemSet`.
     */
    static customField(fieldName: string): CustomField<CreatePolizaPmItemSet>;
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    toJSON(): {
        [key: string]: any;
    };
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
export declare namespace CreatePolizaPmItemSet {
    /**
     * Static representation of the [[assignment]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const ASSIGNMENT: StringField<CreatePolizaPmItemSet>;
    /**
     * Static representation of the [[hdid]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const HDID: StringField<CreatePolizaPmItemSet>;
    /**
     * Static representation of the [[account]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const ACCOUNT: StringField<CreatePolizaPmItemSet>;
    /**
     * Static representation of the [[costcenter]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const COSTCENTER: StringField<CreatePolizaPmItemSet>;
    /**
     * Static representation of the [[vendorno]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const VENDORNO: StringField<CreatePolizaPmItemSet>;
    /**
     * Static representation of the [[itemtext]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const ITEMTEXT: StringField<CreatePolizaPmItemSet>;
    /**
     * Static representation of the [[segment]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const SEGMENT: StringField<CreatePolizaPmItemSet>;
    /**
     * Static representation of the [[division]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DIVISION: StringField<CreatePolizaPmItemSet>;
    /**
     * Static representation of the [[amount]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const AMOUNT: BigNumberField<CreatePolizaPmItemSet>;
    /**
     * All fields of the CreatePolizaPmItemSet entity.
     */
    const _allFields: Array<StringField<CreatePolizaPmItemSet> | BigNumberField<CreatePolizaPmItemSet>>;
    /**
     * All fields selector.
     */
    const ALL_FIELDS: AllFields<CreatePolizaPmItemSet>;
    /**
     * All key fields of the CreatePolizaPmItemSet entity.
     */
    const _keyFields: Array<Field<CreatePolizaPmItemSet>>;
    /**
     * Mapping of all key field names to the respective static field property CreatePolizaPmItemSet.
     */
    const _keys: {
        [keys: string]: Field<CreatePolizaPmItemSet>;
    };
}
//# sourceMappingURL=CreatePolizaPmItemSet.d.ts.map