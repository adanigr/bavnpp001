import { PropuestaPagoSetRequestBuilder } from './PropuestaPagoSetRequestBuilder';
import { AllFields, CustomField, Entity, EntityBuilderType, Selectable, StringField } from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "PropuestaPagoSet" of service "Z_OD_SCP_CORE_0001_SRV".
 */
export declare class PropuestaPagoSet extends Entity implements PropuestaPagoSetType {
    /**
     * Technical entity name for PropuestaPagoSet.
     */
    static _entityName: string;
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for PropuestaPagoSet.
     */
    static _serviceName: string;
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath: string;
    /**
     * Soc.pagadora.
     * Maximum length: 4.
     */
    zbukr: string;
    /**
     * Banco propio.
     * Maximum length: 5.
     */
    hbkid: string;
    /**
     * ID.cuenta.
     * Maximum length: 5.
     */
    hktid: string;
    /**
     * Vía de pago.
     * Maximum length: 1.
     */
    zlsch: string;
    /**
     * Moneda.
     * Maximum length: 5.
     */
    waers: string;
    /**
     * Cta.transit.
     * Maximum length: 10.
     */
    ukont: string;
    /**
     * División.
     * Maximum length: 4.
     */
    gsber: string;
    /**
     * TEXT1.
     * Maximum length: 50.
     */
    text1: string;
    /**
     * Idioma.
     * Maximum length: 2.
     */
    spras: string;
    /**
     * Returns an entity builder to construct instances `PropuestaPagoSet`.
     * @returns A builder that constructs instances of entity type `PropuestaPagoSet`.
     */
    static builder(): EntityBuilderType<PropuestaPagoSet, PropuestaPagoSetTypeForceMandatory>;
    /**
     * Returns a request builder to construct requests for operations on the `PropuestaPagoSet` entity type.
     * @returns A `PropuestaPagoSet` request builder.
     */
    static requestBuilder(): PropuestaPagoSetRequestBuilder;
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `PropuestaPagoSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `PropuestaPagoSet`.
     */
    static customField(fieldName: string): CustomField<PropuestaPagoSet>;
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    toJSON(): {
        [key: string]: any;
    };
}
export interface PropuestaPagoSetType {
    zbukr: string;
    hbkid: string;
    hktid: string;
    zlsch: string;
    waers: string;
    ukont: string;
    gsber: string;
    text1: string;
    spras: string;
}
export interface PropuestaPagoSetTypeForceMandatory {
    zbukr: string;
    hbkid: string;
    hktid: string;
    zlsch: string;
    waers: string;
    ukont: string;
    gsber: string;
    text1: string;
    spras: string;
}
export declare namespace PropuestaPagoSet {
    /**
     * Static representation of the [[zbukr]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const ZBUKR: StringField<PropuestaPagoSet>;
    /**
     * Static representation of the [[hbkid]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const HBKID: StringField<PropuestaPagoSet>;
    /**
     * Static representation of the [[hktid]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const HKTID: StringField<PropuestaPagoSet>;
    /**
     * Static representation of the [[zlsch]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const ZLSCH: StringField<PropuestaPagoSet>;
    /**
     * Static representation of the [[waers]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const WAERS: StringField<PropuestaPagoSet>;
    /**
     * Static representation of the [[ukont]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const UKONT: StringField<PropuestaPagoSet>;
    /**
     * Static representation of the [[gsber]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const GSBER: StringField<PropuestaPagoSet>;
    /**
     * Static representation of the [[text1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const TEXT_1: StringField<PropuestaPagoSet>;
    /**
     * Static representation of the [[spras]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const SPRAS: StringField<PropuestaPagoSet>;
    /**
     * All fields of the PropuestaPagoSet entity.
     */
    const _allFields: Array<StringField<PropuestaPagoSet>>;
    /**
     * All fields selector.
     */
    const ALL_FIELDS: AllFields<PropuestaPagoSet>;
    /**
     * All key fields of the PropuestaPagoSet entity.
     */
    const _keyFields: Array<Selectable<PropuestaPagoSet>>;
    /**
     * Mapping of all key field names to the respective static field property PropuestaPagoSet.
     */
    const _keys: {
        [keys: string]: Selectable<PropuestaPagoSet>;
    };
}
//# sourceMappingURL=PropuestaPagoSet.d.ts.map