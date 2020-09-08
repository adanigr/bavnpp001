import { CreatePolizaPmSetRequestBuilder } from './CreatePolizaPmSetRequestBuilder';
import { AllFields, CustomField, Entity, EntityBuilderType, Field, Link, StringField } from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "CreatePolizaPMSet" of service "Z_OD_SCP_BAVNPP001_SRV".
 */
export declare class CreatePolizaPmSet extends Entity implements CreatePolizaPmSetType {
    /**
     * Technical entity name for CreatePolizaPmSet.
     */
    static _entityName: string;
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for CreatePolizaPmSet.
     */
    static _serviceName: string;
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath: string;
    /**
     * Hdtext.
     * Maximum length: 25.
     */
    hdtext: string;
    /**
     * Company.
     * Maximum length: 4.
     */
    company: string;
    /**
     * Finoper.
     * Maximum length: 6.
     */
    finoper: string;
    /**
     * Currency.
     * Maximum length: 5.
     */
    currency: string;
    /**
     * Docdate.
     * Maximum length: 8.
     */
    docdate: string;
    /**
     * Scpuser.
     * Maximum length: 30.
     */
    scpuser: string;
    /**
     * Scpapp.
     * Maximum length: 50.
     */
    scpapp: string;
    /**
     * Refdocno.
     * Maximum length: 16.
     */
    refdocno: string;
    /**
     * One-to-many navigation property to the [[CreatePolizaPmItemSet]] entity.
     */
    createPolizaPmItemSet: CreatePolizaPmItemSet[];
    /**
     * One-to-many navigation property to the [[RetSet]] entity.
     */
    retSet: RetSet[];
    /**
     * Returns an entity builder to construct instances `CreatePolizaPmSet`.
     * @returns A builder that constructs instances of entity type `CreatePolizaPmSet`.
     */
    static builder(): EntityBuilderType<CreatePolizaPmSet, CreatePolizaPmSetTypeForceMandatory>;
    /**
     * Returns a request builder to construct requests for operations on the `CreatePolizaPmSet` entity type.
     * @returns A `CreatePolizaPmSet` request builder.
     */
    static requestBuilder(): CreatePolizaPmSetRequestBuilder;
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `CreatePolizaPmSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `CreatePolizaPmSet`.
     */
    static customField(fieldName: string): CustomField<CreatePolizaPmSet>;
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    toJSON(): {
        [key: string]: any;
    };
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
export declare namespace CreatePolizaPmSet {
    /**
     * Static representation of the [[hdtext]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const HDTEXT: StringField<CreatePolizaPmSet>;
    /**
     * Static representation of the [[company]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const COMPANY: StringField<CreatePolizaPmSet>;
    /**
     * Static representation of the [[finoper]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const FINOPER: StringField<CreatePolizaPmSet>;
    /**
     * Static representation of the [[currency]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const CURRENCY: StringField<CreatePolizaPmSet>;
    /**
     * Static representation of the [[docdate]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DOCDATE: StringField<CreatePolizaPmSet>;
    /**
     * Static representation of the [[scpuser]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const SCPUSER: StringField<CreatePolizaPmSet>;
    /**
     * Static representation of the [[scpapp]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const SCPAPP: StringField<CreatePolizaPmSet>;
    /**
     * Static representation of the [[refdocno]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const REFDOCNO: StringField<CreatePolizaPmSet>;
    /**
     * Static representation of the one-to-many navigation property [[createPolizaPmItemSet]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const CREATE_POLIZA_PM_ITEM_SET: Link<CreatePolizaPmSet, CreatePolizaPmItemSet>;
    /**
     * Static representation of the one-to-many navigation property [[retSet]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const RET_SET: Link<CreatePolizaPmSet, RetSet>;
    /**
     * All fields of the CreatePolizaPmSet entity.
     */
    const _allFields: Array<StringField<CreatePolizaPmSet> | Link<CreatePolizaPmSet, CreatePolizaPmItemSet> | Link<CreatePolizaPmSet, RetSet>>;
    /**
     * All fields selector.
     */
    const ALL_FIELDS: AllFields<CreatePolizaPmSet>;
    /**
     * All key fields of the CreatePolizaPmSet entity.
     */
    const _keyFields: Array<Field<CreatePolizaPmSet>>;
    /**
     * Mapping of all key field names to the respective static field property CreatePolizaPmSet.
     */
    const _keys: {
        [keys: string]: Field<CreatePolizaPmSet>;
    };
}
//# sourceMappingURL=CreatePolizaPmSet.d.ts.map