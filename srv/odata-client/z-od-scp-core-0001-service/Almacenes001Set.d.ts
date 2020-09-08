import { Almacenes001SetRequestBuilder } from './Almacenes001SetRequestBuilder';
import { AllFields, CustomField, Entity, EntityBuilderType, Selectable, StringField } from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "Almacenes001Set" of service "Z_OD_SCP_CORE_0001_SRV".
 */
export declare class Almacenes001Set extends Entity implements Almacenes001SetType {
    /**
     * Technical entity name for Almacenes001Set.
     */
    static _entityName: string;
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for Almacenes001Set.
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
     * Número actual.
     * Maximum length: 3.
     */
    lfdnr: string;
    /**
     * Returns an entity builder to construct instances `Almacenes001Set`.
     * @returns A builder that constructs instances of entity type `Almacenes001Set`.
     */
    static builder(): EntityBuilderType<Almacenes001Set, Almacenes001SetTypeForceMandatory>;
    /**
     * Returns a request builder to construct requests for operations on the `Almacenes001Set` entity type.
     * @returns A `Almacenes001Set` request builder.
     */
    static requestBuilder(): Almacenes001SetRequestBuilder;
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `Almacenes001Set`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `Almacenes001Set`.
     */
    static customField(fieldName: string): CustomField<Almacenes001Set>;
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    toJSON(): {
        [key: string]: any;
    };
}
export interface Almacenes001SetType {
    werks: string;
    lgort: string;
    lgobe: string;
    lfdnr: string;
}
export interface Almacenes001SetTypeForceMandatory {
    werks: string;
    lgort: string;
    lgobe: string;
    lfdnr: string;
}
export declare namespace Almacenes001Set {
    /**
     * Static representation of the [[werks]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const WERKS: StringField<Almacenes001Set>;
    /**
     * Static representation of the [[lgort]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const LGORT: StringField<Almacenes001Set>;
    /**
     * Static representation of the [[lgobe]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const LGOBE: StringField<Almacenes001Set>;
    /**
     * Static representation of the [[lfdnr]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const LFDNR: StringField<Almacenes001Set>;
    /**
     * All fields of the Almacenes001Set entity.
     */
    const _allFields: Array<StringField<Almacenes001Set>>;
    /**
     * All fields selector.
     */
    const ALL_FIELDS: AllFields<Almacenes001Set>;
    /**
     * All key fields of the Almacenes001Set entity.
     */
    const _keyFields: Array<Selectable<Almacenes001Set>>;
    /**
     * Mapping of all key field names to the respective static field property Almacenes001Set.
     */
    const _keys: {
        [keys: string]: Selectable<Almacenes001Set>;
    };
}
//# sourceMappingURL=Almacenes001Set.d.ts.map