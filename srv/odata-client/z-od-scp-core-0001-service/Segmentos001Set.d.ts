import { Segmentos001SetRequestBuilder } from './Segmentos001SetRequestBuilder';
import { AllFields, CustomField, Entity, EntityBuilderType, Selectable, StringField } from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "Segmentos001Set" of service "Z_OD_SCP_CORE_0001_SRV".
 */
export declare class Segmentos001Set extends Entity implements Segmentos001SetType {
    /**
     * Technical entity name for Segmentos001Set.
     */
    static _entityName: string;
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for Segmentos001Set.
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
     * Material.
     * Maximum length: 40.
     */
    matnr: string;
    /**
     * Segmento.
     * Maximum length: 10.
     */
    segment: string;
    /**
     * Explicación.
     * Maximum length: 50.
     */
    name: string;
    /**
     * Returns an entity builder to construct instances `Segmentos001Set`.
     * @returns A builder that constructs instances of entity type `Segmentos001Set`.
     */
    static builder(): EntityBuilderType<Segmentos001Set, Segmentos001SetTypeForceMandatory>;
    /**
     * Returns a request builder to construct requests for operations on the `Segmentos001Set` entity type.
     * @returns A `Segmentos001Set` request builder.
     */
    static requestBuilder(): Segmentos001SetRequestBuilder;
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `Segmentos001Set`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `Segmentos001Set`.
     */
    static customField(fieldName: string): CustomField<Segmentos001Set>;
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    toJSON(): {
        [key: string]: any;
    };
}
export interface Segmentos001SetType {
    werks: string;
    matnr: string;
    segment: string;
    name: string;
}
export interface Segmentos001SetTypeForceMandatory {
    werks: string;
    matnr: string;
    segment: string;
    name: string;
}
export declare namespace Segmentos001Set {
    /**
     * Static representation of the [[werks]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const WERKS: StringField<Segmentos001Set>;
    /**
     * Static representation of the [[matnr]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const MATNR: StringField<Segmentos001Set>;
    /**
     * Static representation of the [[segment]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const SEGMENT: StringField<Segmentos001Set>;
    /**
     * Static representation of the [[name]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const NAME: StringField<Segmentos001Set>;
    /**
     * All fields of the Segmentos001Set entity.
     */
    const _allFields: Array<StringField<Segmentos001Set>>;
    /**
     * All fields selector.
     */
    const ALL_FIELDS: AllFields<Segmentos001Set>;
    /**
     * All key fields of the Segmentos001Set entity.
     */
    const _keyFields: Array<Selectable<Segmentos001Set>>;
    /**
     * Mapping of all key field names to the respective static field property Segmentos001Set.
     */
    const _keys: {
        [keys: string]: Selectable<Segmentos001Set>;
    };
}
//# sourceMappingURL=Segmentos001Set.d.ts.map