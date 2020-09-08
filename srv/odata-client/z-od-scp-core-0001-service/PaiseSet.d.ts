import { PaiseSetRequestBuilder } from './PaiseSetRequestBuilder';
import { AllFields, CustomField, Entity, EntityBuilderType, Selectable, StringField } from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "PaiseSet" of service "Z_OD_SCP_CORE_0001_SRV".
 */
export declare class PaiseSet extends Entity implements PaiseSetType {
    /**
     * Technical entity name for PaiseSet.
     */
    static _entityName: string;
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for PaiseSet.
     */
    static _serviceName: string;
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath: string;
    /**
     * Idioma.
     * Maximum length: 2.
     */
    spras: string;
    /**
     * País.
     * Maximum length: 3.
     */
    land1: string;
    /**
     * Denominación.
     * Maximum length: 15.
     */
    landx: string;
    /**
     * Nacionalidad.
     * Maximum length: 15.
     */
    natio: string;
    /**
     * País.
     * Maximum length: 50.
     */
    landx50: string;
    /**
     * Nacionalidad.
     * Maximum length: 50.
     */
    natio50: string;
    /**
     * Returns an entity builder to construct instances `PaiseSet`.
     * @returns A builder that constructs instances of entity type `PaiseSet`.
     */
    static builder(): EntityBuilderType<PaiseSet, PaiseSetTypeForceMandatory>;
    /**
     * Returns a request builder to construct requests for operations on the `PaiseSet` entity type.
     * @returns A `PaiseSet` request builder.
     */
    static requestBuilder(): PaiseSetRequestBuilder;
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `PaiseSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `PaiseSet`.
     */
    static customField(fieldName: string): CustomField<PaiseSet>;
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    toJSON(): {
        [key: string]: any;
    };
}
export interface PaiseSetType {
    spras: string;
    land1: string;
    landx: string;
    natio: string;
    landx50: string;
    natio50: string;
}
export interface PaiseSetTypeForceMandatory {
    spras: string;
    land1: string;
    landx: string;
    natio: string;
    landx50: string;
    natio50: string;
}
export declare namespace PaiseSet {
    /**
     * Static representation of the [[spras]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const SPRAS: StringField<PaiseSet>;
    /**
     * Static representation of the [[land1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const LAND_1: StringField<PaiseSet>;
    /**
     * Static representation of the [[landx]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const LANDX: StringField<PaiseSet>;
    /**
     * Static representation of the [[natio]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const NATIO: StringField<PaiseSet>;
    /**
     * Static representation of the [[landx50]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const LANDX_50: StringField<PaiseSet>;
    /**
     * Static representation of the [[natio50]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const NATIO_50: StringField<PaiseSet>;
    /**
     * All fields of the PaiseSet entity.
     */
    const _allFields: Array<StringField<PaiseSet>>;
    /**
     * All fields selector.
     */
    const ALL_FIELDS: AllFields<PaiseSet>;
    /**
     * All key fields of the PaiseSet entity.
     */
    const _keyFields: Array<Selectable<PaiseSet>>;
    /**
     * Mapping of all key field names to the respective static field property PaiseSet.
     */
    const _keys: {
        [keys: string]: Selectable<PaiseSet>;
    };
}
//# sourceMappingURL=PaiseSet.d.ts.map