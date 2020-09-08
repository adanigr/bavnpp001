import { SegmentosSetRequestBuilder } from './SegmentosSetRequestBuilder';
import { AllFields, CustomField, Entity, EntityBuilderType, Selectable, StringField } from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "SegmentosSet" of service "Z_OD_SCP_CORE_0001_SRV".
 */
export declare class SegmentosSet extends Entity implements SegmentosSetType {
    /**
     * Technical entity name for SegmentosSet.
     */
    static _entityName: string;
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for SegmentosSet.
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
     * Returns an entity builder to construct instances `SegmentosSet`.
     * @returns A builder that constructs instances of entity type `SegmentosSet`.
     */
    static builder(): EntityBuilderType<SegmentosSet, SegmentosSetTypeForceMandatory>;
    /**
     * Returns a request builder to construct requests for operations on the `SegmentosSet` entity type.
     * @returns A `SegmentosSet` request builder.
     */
    static requestBuilder(): SegmentosSetRequestBuilder;
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `SegmentosSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `SegmentosSet`.
     */
    static customField(fieldName: string): CustomField<SegmentosSet>;
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    toJSON(): {
        [key: string]: any;
    };
}
export interface SegmentosSetType {
    werks: string;
    segment: string;
    name: string;
}
export interface SegmentosSetTypeForceMandatory {
    werks: string;
    segment: string;
    name: string;
}
export declare namespace SegmentosSet {
    /**
     * Static representation of the [[werks]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const WERKS: StringField<SegmentosSet>;
    /**
     * Static representation of the [[segment]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const SEGMENT: StringField<SegmentosSet>;
    /**
     * Static representation of the [[name]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const NAME: StringField<SegmentosSet>;
    /**
     * All fields of the SegmentosSet entity.
     */
    const _allFields: Array<StringField<SegmentosSet>>;
    /**
     * All fields selector.
     */
    const ALL_FIELDS: AllFields<SegmentosSet>;
    /**
     * All key fields of the SegmentosSet entity.
     */
    const _keyFields: Array<Selectable<SegmentosSet>>;
    /**
     * Mapping of all key field names to the respective static field property SegmentosSet.
     */
    const _keys: {
        [keys: string]: Selectable<SegmentosSet>;
    };
}
//# sourceMappingURL=SegmentosSet.d.ts.map