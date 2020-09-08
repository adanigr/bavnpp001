import { NombreCuentaSetRequestBuilder } from './NombreCuentaSetRequestBuilder';
import { AllFields, CustomField, Entity, EntityBuilderType, Selectable, StringField } from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "NombreCuentaSet" of service "Z_OD_SCP_CORE_0001_SRV".
 */
export declare class NombreCuentaSet extends Entity implements NombreCuentaSetType {
    /**
     * Technical entity name for NombreCuentaSet.
     */
    static _entityName: string;
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for NombreCuentaSet.
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
     * Plan cuentas.
     * Maximum length: 4.
     */
    ktopl: string;
    /**
     * Cta.mayor.
     * Maximum length: 10.
     */
    saknr: string;
    /**
     * Texto expl.
     * Maximum length: 50.
     */
    txt50: string;
    /**
     * Returns an entity builder to construct instances `NombreCuentaSet`.
     * @returns A builder that constructs instances of entity type `NombreCuentaSet`.
     */
    static builder(): EntityBuilderType<NombreCuentaSet, NombreCuentaSetTypeForceMandatory>;
    /**
     * Returns a request builder to construct requests for operations on the `NombreCuentaSet` entity type.
     * @returns A `NombreCuentaSet` request builder.
     */
    static requestBuilder(): NombreCuentaSetRequestBuilder;
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `NombreCuentaSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `NombreCuentaSet`.
     */
    static customField(fieldName: string): CustomField<NombreCuentaSet>;
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    toJSON(): {
        [key: string]: any;
    };
}
export interface NombreCuentaSetType {
    spras: string;
    ktopl: string;
    saknr: string;
    txt50: string;
}
export interface NombreCuentaSetTypeForceMandatory {
    spras: string;
    ktopl: string;
    saknr: string;
    txt50: string;
}
export declare namespace NombreCuentaSet {
    /**
     * Static representation of the [[spras]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const SPRAS: StringField<NombreCuentaSet>;
    /**
     * Static representation of the [[ktopl]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const KTOPL: StringField<NombreCuentaSet>;
    /**
     * Static representation of the [[saknr]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const SAKNR: StringField<NombreCuentaSet>;
    /**
     * Static representation of the [[txt50]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const TXT_50: StringField<NombreCuentaSet>;
    /**
     * All fields of the NombreCuentaSet entity.
     */
    const _allFields: Array<StringField<NombreCuentaSet>>;
    /**
     * All fields selector.
     */
    const ALL_FIELDS: AllFields<NombreCuentaSet>;
    /**
     * All key fields of the NombreCuentaSet entity.
     */
    const _keyFields: Array<Selectable<NombreCuentaSet>>;
    /**
     * Mapping of all key field names to the respective static field property NombreCuentaSet.
     */
    const _keys: {
        [keys: string]: Selectable<NombreCuentaSet>;
    };
}
//# sourceMappingURL=NombreCuentaSet.d.ts.map