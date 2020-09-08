import { Bancos_ProveedorSetRequestBuilder } from './Bancos_ProveedorSetRequestBuilder';
import { AllFields, CustomField, Entity, EntityBuilderType, Field, StringField } from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "Bancos_ProveedorSet" of service "Z_OD_SCP_BAVNPP001_SRV".
 */
export declare class Bancos_ProveedorSet extends Entity implements Bancos_ProveedorSetType {
    /**
     * Technical entity name for Bancos_ProveedorSet.
     */
    static _entityName: string;
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for Bancos_ProveedorSet.
     */
    static _serviceName: string;
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath: string;
    /**
     * Interloc.cial.
     * Maximum length: 10.
     */
    partner: string;
    /**
     * Relac.bancaria.
     * Maximum length: 4.
     */
    bkvid: string;
    /**
     * Clave de banco.
     * Maximum length: 15.
     */
    bankl: string;
    /**
     * Cuenta bancaria.
     * Maximum length: 18.
     */
    bankn: string;
    /**
     * Clv.ctrl.bancos.
     * Maximum length: 2.
     */
    bkont: string;
    /**
     * Referencia.
     * Maximum length: 20.
     */
    bkref: string;
    /**
     * IDRelBancExtern.
     * Maximum length: 20.
     */
    bkext: string;
    /**
     * Koinh.
     * Maximum length: 60.
     */
    koinh: string;
    /**
     * Returns an entity builder to construct instances `Bancos_ProveedorSet`.
     * @returns A builder that constructs instances of entity type `Bancos_ProveedorSet`.
     */
    static builder(): EntityBuilderType<Bancos_ProveedorSet, Bancos_ProveedorSetTypeForceMandatory>;
    /**
     * Returns a request builder to construct requests for operations on the `Bancos_ProveedorSet` entity type.
     * @returns A `Bancos_ProveedorSet` request builder.
     */
    static requestBuilder(): Bancos_ProveedorSetRequestBuilder;
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `Bancos_ProveedorSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `Bancos_ProveedorSet`.
     */
    static customField(fieldName: string): CustomField<Bancos_ProveedorSet>;
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    toJSON(): {
        [key: string]: any;
    };
}
export interface Bancos_ProveedorSetType {
    partner: string;
    bkvid: string;
    bankl: string;
    bankn: string;
    bkont: string;
    bkref: string;
    bkext: string;
    koinh: string;
}
export interface Bancos_ProveedorSetTypeForceMandatory {
    partner: string;
    bkvid: string;
    bankl: string;
    bankn: string;
    bkont: string;
    bkref: string;
    bkext: string;
    koinh: string;
}
export declare namespace Bancos_ProveedorSet {
    /**
     * Static representation of the [[partner]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const PARTNER: StringField<Bancos_ProveedorSet>;
    /**
     * Static representation of the [[bkvid]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BKVID: StringField<Bancos_ProveedorSet>;
    /**
     * Static representation of the [[bankl]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BANKL: StringField<Bancos_ProveedorSet>;
    /**
     * Static representation of the [[bankn]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BANKN: StringField<Bancos_ProveedorSet>;
    /**
     * Static representation of the [[bkont]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BKONT: StringField<Bancos_ProveedorSet>;
    /**
     * Static representation of the [[bkref]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BKREF: StringField<Bancos_ProveedorSet>;
    /**
     * Static representation of the [[bkext]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BKEXT: StringField<Bancos_ProveedorSet>;
    /**
     * Static representation of the [[koinh]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const KOINH: StringField<Bancos_ProveedorSet>;
    /**
     * All fields of the Bancos_ProveedorSet entity.
     */
    const _allFields: Array<StringField<Bancos_ProveedorSet>>;
    /**
     * All fields selector.
     */
    const ALL_FIELDS: AllFields<Bancos_ProveedorSet>;
    /**
     * All key fields of the Bancos_ProveedorSet entity.
     */
    const _keyFields: Array<Field<Bancos_ProveedorSet>>;
    /**
     * Mapping of all key field names to the respective static field property Bancos_ProveedorSet.
     */
    const _keys: {
        [keys: string]: Field<Bancos_ProveedorSet>;
    };
}
//# sourceMappingURL=Bancos_ProveedorSet.d.ts.map