import { FdHdSetRequestBuilder } from './FdHdSetRequestBuilder';
import { BigNumber } from 'bignumber.js';
import { AllFields, BigNumberField, CustomField, Entity, EntityBuilderType, Link, Selectable, StringField } from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "FdHDSet" of service "Z_OD_SCP_CORE_0001_SRV".
 */
export declare class FdHdSet extends Entity implements FdHdSetType {
    /**
     * Technical entity name for FdHdSet.
     */
    static _entityName: string;
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for FdHdSet.
     */
    static _serviceName: string;
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath: string;
    /**
     * Referencia.
     * Maximum length: 16.
     */
    xblnr: string;
    /**
     * Sociedad.
     * Maximum length: 4.
     */
    bukrs: string;
    /**
     * Nº documento.
     * Maximum length: 10.
     */
    belnr: string;
    /**
     * Ejercicio.
     * Maximum length: 4.
     */
    gjahr: string;
    /**
     * Clase doc.
     * Maximum length: 2.
     */
    blart: string;
    /**
     * Fecha de documento en documento.
     * Maximum length: 10.
     */
    bldat: string;
    /**
     * Fecha de contabilización en el documento.
     * Maximum length: 10.
     */
    budat: string;
    /**
     * Día del registro del documento contable.
     * Maximum length: 10.
     */
    cpudt: string;
    /**
     * Moneda.
     * Maximum length: 5.
     */
    waers: string;
    /**
     * Tipo de cambio.
     */
    kursf: BigNumber;
    /**
     * Txt.cab.doc.
     * Maximum length: 25.
     */
    bktxt: string;
    /**
     * Importe total en la moneda del documento.
     */
    wrbtrS: BigNumber;
    /**
     * Importe total en moneda local.
     */
    dmbtrS: BigNumber;
    /**
     * One-to-many navigation property to the [[FdItemsSet]] entity.
     */
    fdItemsSet: FdItemsSet[];
    /**
     * Returns an entity builder to construct instances `FdHdSet`.
     * @returns A builder that constructs instances of entity type `FdHdSet`.
     */
    static builder(): EntityBuilderType<FdHdSet, FdHdSetTypeForceMandatory>;
    /**
     * Returns a request builder to construct requests for operations on the `FdHdSet` entity type.
     * @returns A `FdHdSet` request builder.
     */
    static requestBuilder(): FdHdSetRequestBuilder;
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `FdHdSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `FdHdSet`.
     */
    static customField(fieldName: string): CustomField<FdHdSet>;
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    toJSON(): {
        [key: string]: any;
    };
}
import { FdItemsSet, FdItemsSetType } from './FdItemsSet';
export interface FdHdSetType {
    xblnr: string;
    bukrs: string;
    belnr: string;
    gjahr: string;
    blart: string;
    bldat: string;
    budat: string;
    cpudt: string;
    waers: string;
    kursf: BigNumber;
    bktxt: string;
    wrbtrS: BigNumber;
    dmbtrS: BigNumber;
    fdItemsSet: FdItemsSetType[];
}
export interface FdHdSetTypeForceMandatory {
    xblnr: string;
    bukrs: string;
    belnr: string;
    gjahr: string;
    blart: string;
    bldat: string;
    budat: string;
    cpudt: string;
    waers: string;
    kursf: BigNumber;
    bktxt: string;
    wrbtrS: BigNumber;
    dmbtrS: BigNumber;
    fdItemsSet: FdItemsSetType[];
}
export declare namespace FdHdSet {
    /**
     * Static representation of the [[xblnr]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const XBLNR: StringField<FdHdSet>;
    /**
     * Static representation of the [[bukrs]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BUKRS: StringField<FdHdSet>;
    /**
     * Static representation of the [[belnr]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BELNR: StringField<FdHdSet>;
    /**
     * Static representation of the [[gjahr]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const GJAHR: StringField<FdHdSet>;
    /**
     * Static representation of the [[blart]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BLART: StringField<FdHdSet>;
    /**
     * Static representation of the [[bldat]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BLDAT: StringField<FdHdSet>;
    /**
     * Static representation of the [[budat]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BUDAT: StringField<FdHdSet>;
    /**
     * Static representation of the [[cpudt]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const CPUDT: StringField<FdHdSet>;
    /**
     * Static representation of the [[waers]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const WAERS: StringField<FdHdSet>;
    /**
     * Static representation of the [[kursf]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const KURSF: BigNumberField<FdHdSet>;
    /**
     * Static representation of the [[bktxt]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BKTXT: StringField<FdHdSet>;
    /**
     * Static representation of the [[wrbtrS]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const WRBTR_S: BigNumberField<FdHdSet>;
    /**
     * Static representation of the [[dmbtrS]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DMBTR_S: BigNumberField<FdHdSet>;
    /**
     * Static representation of the one-to-many navigation property [[fdItemsSet]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const FD_ITEMS_SET: Link<FdHdSet, FdItemsSet>;
    /**
     * All fields of the FdHdSet entity.
     */
    const _allFields: Array<StringField<FdHdSet> | BigNumberField<FdHdSet> | Link<FdHdSet, FdItemsSet>>;
    /**
     * All fields selector.
     */
    const ALL_FIELDS: AllFields<FdHdSet>;
    /**
     * All key fields of the FdHdSet entity.
     */
    const _keyFields: Array<Selectable<FdHdSet>>;
    /**
     * Mapping of all key field names to the respective static field property FdHdSet.
     */
    const _keys: {
        [keys: string]: Selectable<FdHdSet>;
    };
}
//# sourceMappingURL=FdHdSet.d.ts.map