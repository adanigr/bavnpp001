import { AlmacenesSetRequestBuilder } from './AlmacenesSetRequestBuilder';
import { AllFields, CustomField, Entity, EntityBuilderType, Selectable, StringField } from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "AlmacenesSet" of service "Z_OD_SCP_CORE_0001_SRV".
 */
export declare class AlmacenesSet extends Entity implements AlmacenesSetType {
    /**
     * Technical entity name for AlmacenesSet.
     */
    static _entityName: string;
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for AlmacenesSet.
     */
    static _serviceName: string;
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath: string;
    /**
     * Centro.
     * Maximum length: 4.
     */
    werks: string;
    /**
     * Almacén.
     * Maximum length: 4.
     */
    lgort: string;
    /**
     * Denominación.
     * Maximum length: 16.
     */
    lgobe: string;
    /**
     * Returns an entity builder to construct instances `AlmacenesSet`.
     * @returns A builder that constructs instances of entity type `AlmacenesSet`.
     */
    static builder(): EntityBuilderType<AlmacenesSet, AlmacenesSetTypeForceMandatory>;
    /**
     * Returns a request builder to construct requests for operations on the `AlmacenesSet` entity type.
     * @returns A `AlmacenesSet` request builder.
     */
    static requestBuilder(): AlmacenesSetRequestBuilder;
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `AlmacenesSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `AlmacenesSet`.
     */
    static customField(fieldName: string): CustomField<AlmacenesSet>;
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    toJSON(): {
        [key: string]: any;
    };
}
export interface AlmacenesSetType {
    werks: string;
    lgort: string;
    lgobe: string;
}
export interface AlmacenesSetTypeForceMandatory {
    werks: string;
    lgort: string;
    lgobe: string;
}
export declare namespace AlmacenesSet {
    /**
     * Static representation of the [[werks]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const WERKS: StringField<AlmacenesSet>;
    /**
     * Static representation of the [[lgort]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const LGORT: StringField<AlmacenesSet>;
    /**
     * Static representation of the [[lgobe]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const LGOBE: StringField<AlmacenesSet>;
    /**
     * All fields of the AlmacenesSet entity.
     */
    const _allFields: Array<StringField<AlmacenesSet>>;
    /**
     * All fields selector.
     */
    const ALL_FIELDS: AllFields<AlmacenesSet>;
    /**
     * All key fields of the AlmacenesSet entity.
     */
    const _keyFields: Array<Selectable<AlmacenesSet>>;
    /**
     * Mapping of all key field names to the respective static field property AlmacenesSet.
     */
    const _keys: {
        [keys: string]: Selectable<AlmacenesSet>;
    };
}
//# sourceMappingURL=AlmacenesSet.d.ts.map