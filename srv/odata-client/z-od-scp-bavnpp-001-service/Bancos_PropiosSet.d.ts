import { Bancos_PropiosSetRequestBuilder } from './Bancos_PropiosSetRequestBuilder';
import { AllFields, CustomField, Entity, EntityBuilderType, Field, StringField } from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "Bancos_PropiosSet" of service "Z_OD_SCP_BAVNPP001_SRV".
 */
export declare class Bancos_PropiosSet extends Entity implements Bancos_PropiosSetType {
    /**
     * Technical entity name for Bancos_PropiosSet.
     */
    static _entityName: string;
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for Bancos_PropiosSet.
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
     * Banco propio.
     * Maximum length: 5.
     */
    hbkid: string;
    /**
     * Cuenta banco propio.
     * Maximum length: 5.
     */
    hktid: string;
    /**
     * Moneda.
     * Maximum length: 5.
     */
    waers: string;
    /**
     * División.
     * Maximum length: 4.
     */
    gsber: string;
    /**
     * Vía de pago.
     * Maximum length: 1.
     */
    zlsch: string;
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
     * Libro mayor.
     * Maximum length: 10.
     */
    hkont: string;
    /**
     * Nº cta.altern.
     * Maximum length: 24.
     */
    bnkn2: string;
    /**
     * Identif.ISD.
     * Maximum length: 5.
     */
    dtaai: string;
    /**
     * Info referencia.
     * Maximum length: 27.
     */
    refzl: string;
    /**
     * Cta.transit.
     * Maximum length: 10.
     */
    ukont: string;
    /**
     * Returns an entity builder to construct instances `Bancos_PropiosSet`.
     * @returns A builder that constructs instances of entity type `Bancos_PropiosSet`.
     */
    static builder(): EntityBuilderType<Bancos_PropiosSet, Bancos_PropiosSetTypeForceMandatory>;
    /**
     * Returns a request builder to construct requests for operations on the `Bancos_PropiosSet` entity type.
     * @returns A `Bancos_PropiosSet` request builder.
     */
    static requestBuilder(): Bancos_PropiosSetRequestBuilder;
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `Bancos_PropiosSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `Bancos_PropiosSet`.
     */
    static customField(fieldName: string): CustomField<Bancos_PropiosSet>;
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    toJSON(): {
        [key: string]: any;
    };
}
export interface Bancos_PropiosSetType {
    bukrs: string;
    hbkid: string;
    hktid: string;
    waers: string;
    gsber: string;
    zlsch: string;
    bankl: string;
    bankn: string;
    bkont: string;
    hkont: string;
    bnkn2: string;
    dtaai: string;
    refzl: string;
    ukont: string;
}
export interface Bancos_PropiosSetTypeForceMandatory {
    bukrs: string;
    hbkid: string;
    hktid: string;
    waers: string;
    gsber: string;
    zlsch: string;
    bankl: string;
    bankn: string;
    bkont: string;
    hkont: string;
    bnkn2: string;
    dtaai: string;
    refzl: string;
    ukont: string;
}
export declare namespace Bancos_PropiosSet {
    /**
     * Static representation of the [[bukrs]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BUKRS: StringField<Bancos_PropiosSet>;
    /**
     * Static representation of the [[hbkid]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const HBKID: StringField<Bancos_PropiosSet>;
    /**
     * Static representation of the [[hktid]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const HKTID: StringField<Bancos_PropiosSet>;
    /**
     * Static representation of the [[waers]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const WAERS: StringField<Bancos_PropiosSet>;
    /**
     * Static representation of the [[gsber]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const GSBER: StringField<Bancos_PropiosSet>;
    /**
     * Static representation of the [[zlsch]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const ZLSCH: StringField<Bancos_PropiosSet>;
    /**
     * Static representation of the [[bankl]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BANKL: StringField<Bancos_PropiosSet>;
    /**
     * Static representation of the [[bankn]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BANKN: StringField<Bancos_PropiosSet>;
    /**
     * Static representation of the [[bkont]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BKONT: StringField<Bancos_PropiosSet>;
    /**
     * Static representation of the [[hkont]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const HKONT: StringField<Bancos_PropiosSet>;
    /**
     * Static representation of the [[bnkn2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BNKN_2: StringField<Bancos_PropiosSet>;
    /**
     * Static representation of the [[dtaai]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DTAAI: StringField<Bancos_PropiosSet>;
    /**
     * Static representation of the [[refzl]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const REFZL: StringField<Bancos_PropiosSet>;
    /**
     * Static representation of the [[ukont]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const UKONT: StringField<Bancos_PropiosSet>;
    /**
     * All fields of the Bancos_PropiosSet entity.
     */
    const _allFields: Array<StringField<Bancos_PropiosSet>>;
    /**
     * All fields selector.
     */
    const ALL_FIELDS: AllFields<Bancos_PropiosSet>;
    /**
     * All key fields of the Bancos_PropiosSet entity.
     */
    const _keyFields: Array<Field<Bancos_PropiosSet>>;
    /**
     * Mapping of all key field names to the respective static field property Bancos_PropiosSet.
     */
    const _keys: {
        [keys: string]: Field<Bancos_PropiosSet>;
    };
}
//# sourceMappingURL=Bancos_PropiosSet.d.ts.map