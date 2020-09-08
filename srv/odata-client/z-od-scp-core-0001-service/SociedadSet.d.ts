import { SociedadSetRequestBuilder } from './SociedadSetRequestBuilder';
import { AllFields, CustomField, Entity, EntityBuilderType, Selectable, StringField } from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "SociedadSet" of service "Z_OD_SCP_CORE_0001_SRV".
 */
export declare class SociedadSet extends Entity implements SociedadSetType {
    /**
     * Technical entity name for SociedadSet.
     */
    static _entityName: string;
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for SociedadSet.
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
     * Nombre empresa.
     * Maximum length: 25.
     */
    butxt: string;
    /**
     * Marca.
     * Maximum length: 20.
     */
    sort2: string;
    /**
     * Returns an entity builder to construct instances `SociedadSet`.
     * @returns A builder that constructs instances of entity type `SociedadSet`.
     */
    static builder(): EntityBuilderType<SociedadSet, SociedadSetTypeForceMandatory>;
    /**
     * Returns a request builder to construct requests for operations on the `SociedadSet` entity type.
     * @returns A `SociedadSet` request builder.
     */
    static requestBuilder(): SociedadSetRequestBuilder;
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `SociedadSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `SociedadSet`.
     */
    static customField(fieldName: string): CustomField<SociedadSet>;
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    toJSON(): {
        [key: string]: any;
    };
}
export interface SociedadSetType {
    bukrs: string;
    butxt: string;
    sort2: string;
}
export interface SociedadSetTypeForceMandatory {
    bukrs: string;
    butxt: string;
    sort2: string;
}
export declare namespace SociedadSet {
    /**
     * Static representation of the [[bukrs]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BUKRS: StringField<SociedadSet>;
    /**
     * Static representation of the [[butxt]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BUTXT: StringField<SociedadSet>;
    /**
     * Static representation of the [[sort2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const SORT_2: StringField<SociedadSet>;
    /**
     * All fields of the SociedadSet entity.
     */
    const _allFields: Array<StringField<SociedadSet>>;
    /**
     * All fields selector.
     */
    const ALL_FIELDS: AllFields<SociedadSet>;
    /**
     * All key fields of the SociedadSet entity.
     */
    const _keyFields: Array<Selectable<SociedadSet>>;
    /**
     * Mapping of all key field names to the respective static field property SociedadSet.
     */
    const _keys: {
        [keys: string]: Selectable<SociedadSet>;
    };
}
//# sourceMappingURL=SociedadSet.d.ts.map