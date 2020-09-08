import { ModenasAppSetRequestBuilder } from './ModenasAppSetRequestBuilder';
import { AllFields, CustomField, Entity, EntityBuilderType, Selectable, StringField } from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "ModenasAppSet" of service "Z_OD_SCP_CORE_0001_SRV".
 */
export declare class ModenasAppSet extends Entity implements ModenasAppSetType {
    /**
     * Technical entity name for ModenasAppSet.
     */
    static _entityName: string;
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for ModenasAppSet.
     */
    static _serviceName: string;
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath: string;
    /**
     * Sociedad.
     * Maximum length: 4.
     */
    bukrs: string;
    /**
     * Moneda.
     * Maximum length: 5.
     * @nullable
     */
    waers?: string;
    /**
     * Texto breve.
     * Maximum length: 15.
     */
    ktext: string;
    /**
     * Returns an entity builder to construct instances `ModenasAppSet`.
     * @returns A builder that constructs instances of entity type `ModenasAppSet`.
     */
    static builder(): EntityBuilderType<ModenasAppSet, ModenasAppSetTypeForceMandatory>;
    /**
     * Returns a request builder to construct requests for operations on the `ModenasAppSet` entity type.
     * @returns A `ModenasAppSet` request builder.
     */
    static requestBuilder(): ModenasAppSetRequestBuilder;
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `ModenasAppSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `ModenasAppSet`.
     */
    static customField(fieldName: string): CustomField<ModenasAppSet>;
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    toJSON(): {
        [key: string]: any;
    };
}
export interface ModenasAppSetType {
    bukrs: string;
    waers?: string;
    ktext: string;
}
export interface ModenasAppSetTypeForceMandatory {
    bukrs: string;
    waers: string;
    ktext: string;
}
export declare namespace ModenasAppSet {
    /**
     * Static representation of the [[bukrs]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BUKRS: StringField<ModenasAppSet>;
    /**
     * Static representation of the [[waers]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const WAERS: StringField<ModenasAppSet>;
    /**
     * Static representation of the [[ktext]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const KTEXT: StringField<ModenasAppSet>;
    /**
     * All fields of the ModenasAppSet entity.
     */
    const _allFields: Array<StringField<ModenasAppSet>>;
    /**
     * All fields selector.
     */
    const ALL_FIELDS: AllFields<ModenasAppSet>;
    /**
     * All key fields of the ModenasAppSet entity.
     */
    const _keyFields: Array<Selectable<ModenasAppSet>>;
    /**
     * Mapping of all key field names to the respective static field property ModenasAppSet.
     */
    const _keys: {
        [keys: string]: Selectable<ModenasAppSet>;
    };
}
//# sourceMappingURL=ModenasAppSet.d.ts.map