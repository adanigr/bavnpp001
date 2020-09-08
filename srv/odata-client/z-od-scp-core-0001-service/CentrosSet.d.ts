import { CentrosSetRequestBuilder } from './CentrosSetRequestBuilder';
import { AllFields, CustomField, Entity, EntityBuilderType, Selectable, StringField } from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "CentrosSet" of service "Z_OD_SCP_CORE_0001_SRV".
 */
export declare class CentrosSet extends Entity implements CentrosSetType {
    /**
     * Technical entity name for CentrosSet.
     */
    static _entityName: string;
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for CentrosSet.
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
     * Centro.
     * Maximum length: 4.
     */
    werks: string;
    /**
     * Descripcion.
     * Maximum length: 30.
     */
    name1: string;
    /**
     * Returns an entity builder to construct instances `CentrosSet`.
     * @returns A builder that constructs instances of entity type `CentrosSet`.
     */
    static builder(): EntityBuilderType<CentrosSet, CentrosSetTypeForceMandatory>;
    /**
     * Returns a request builder to construct requests for operations on the `CentrosSet` entity type.
     * @returns A `CentrosSet` request builder.
     */
    static requestBuilder(): CentrosSetRequestBuilder;
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `CentrosSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `CentrosSet`.
     */
    static customField(fieldName: string): CustomField<CentrosSet>;
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    toJSON(): {
        [key: string]: any;
    };
}
export interface CentrosSetType {
    bukrs: string;
    werks: string;
    name1: string;
}
export interface CentrosSetTypeForceMandatory {
    bukrs: string;
    werks: string;
    name1: string;
}
export declare namespace CentrosSet {
    /**
     * Static representation of the [[bukrs]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BUKRS: StringField<CentrosSet>;
    /**
     * Static representation of the [[werks]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const WERKS: StringField<CentrosSet>;
    /**
     * Static representation of the [[name1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const NAME_1: StringField<CentrosSet>;
    /**
     * All fields of the CentrosSet entity.
     */
    const _allFields: Array<StringField<CentrosSet>>;
    /**
     * All fields selector.
     */
    const ALL_FIELDS: AllFields<CentrosSet>;
    /**
     * All key fields of the CentrosSet entity.
     */
    const _keyFields: Array<Selectable<CentrosSet>>;
    /**
     * Mapping of all key field names to the respective static field property CentrosSet.
     */
    const _keys: {
        [keys: string]: Selectable<CentrosSet>;
    };
}
//# sourceMappingURL=CentrosSet.d.ts.map