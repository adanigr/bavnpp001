import { FdItemsSetRequestBuilder } from './FdItemsSetRequestBuilder';
import { BigNumber } from 'bignumber.js';
import { AllFields, BigNumberField, CustomField, Entity, EntityBuilderType, Selectable, StringField } from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "FdItemsSet" of service "Z_OD_SCP_CORE_0001_SRV".
 */
export declare class FdItemsSet extends Entity implements FdItemsSetType {
    /**
     * Technical entity name for FdItemsSet.
     */
    static _entityName: string;
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for FdItemsSet.
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
     * Nº documento.
     * Maximum length: 10.
     */
    belnr: string;
    /**
     * Posición.
     * Maximum length: 3.
     */
    buzei: string;
    /**
     * Clave contab.
     * Maximum length: 2.
     */
    bschl: string;
    /**
     * Cliente.
     * Maximum length: 10.
     */
    account: string;
    /**
     * Explicación.
     * Maximum length: 50.
     */
    description: string;
    /**
     * Importe.
     */
    wrbtr: BigNumber;
    /**
     * Importe ML.
     */
    dmbtr: BigNumber;
    /**
     * División.
     * Maximum length: 4.
     */
    gsber: string;
    /**
     * Segmento.
     * Maximum length: 10.
     */
    segment: string;
    /**
     * CeBe.
     * Maximum length: 10.
     */
    prctr: string;
    /**
     * Asignación.
     * Maximum length: 18.
     */
    zuonr: string;
    /**
     * Gjahr.
     * Maximum length: 4.
     */
    gjahr: string;
    /**
     * Waers.
     * Maximum length: 5.
     */
    waers: string;
    /**
     * Bktxt.
     * Maximum length: 25.
     */
    bktxt: string;
    /**
     * Sgtxt.
     * Maximum length: 50.
     */
    sgtxt: string;
    /**
     * Returns an entity builder to construct instances `FdItemsSet`.
     * @returns A builder that constructs instances of entity type `FdItemsSet`.
     */
    static builder(): EntityBuilderType<FdItemsSet, FdItemsSetTypeForceMandatory>;
    /**
     * Returns a request builder to construct requests for operations on the `FdItemsSet` entity type.
     * @returns A `FdItemsSet` request builder.
     */
    static requestBuilder(): FdItemsSetRequestBuilder;
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `FdItemsSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `FdItemsSet`.
     */
    static customField(fieldName: string): CustomField<FdItemsSet>;
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    toJSON(): {
        [key: string]: any;
    };
}
export interface FdItemsSetType {
    bukrs: string;
    belnr: string;
    buzei: string;
    bschl: string;
    account: string;
    description: string;
    wrbtr: BigNumber;
    dmbtr: BigNumber;
    gsber: string;
    segment: string;
    prctr: string;
    zuonr: string;
    gjahr: string;
    waers: string;
    bktxt: string;
    sgtxt: string;
}
export interface FdItemsSetTypeForceMandatory {
    bukrs: string;
    belnr: string;
    buzei: string;
    bschl: string;
    account: string;
    description: string;
    wrbtr: BigNumber;
    dmbtr: BigNumber;
    gsber: string;
    segment: string;
    prctr: string;
    zuonr: string;
    gjahr: string;
    waers: string;
    bktxt: string;
    sgtxt: string;
}
export declare namespace FdItemsSet {
    /**
     * Static representation of the [[bukrs]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BUKRS: StringField<FdItemsSet>;
    /**
     * Static representation of the [[belnr]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BELNR: StringField<FdItemsSet>;
    /**
     * Static representation of the [[buzei]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BUZEI: StringField<FdItemsSet>;
    /**
     * Static representation of the [[bschl]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BSCHL: StringField<FdItemsSet>;
    /**
     * Static representation of the [[account]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const ACCOUNT: StringField<FdItemsSet>;
    /**
     * Static representation of the [[description]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DESCRIPTION: StringField<FdItemsSet>;
    /**
     * Static representation of the [[wrbtr]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const WRBTR: BigNumberField<FdItemsSet>;
    /**
     * Static representation of the [[dmbtr]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DMBTR: BigNumberField<FdItemsSet>;
    /**
     * Static representation of the [[gsber]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const GSBER: StringField<FdItemsSet>;
    /**
     * Static representation of the [[segment]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const SEGMENT: StringField<FdItemsSet>;
    /**
     * Static representation of the [[prctr]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const PRCTR: StringField<FdItemsSet>;
    /**
     * Static representation of the [[zuonr]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const ZUONR: StringField<FdItemsSet>;
    /**
     * Static representation of the [[gjahr]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const GJAHR: StringField<FdItemsSet>;
    /**
     * Static representation of the [[waers]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const WAERS: StringField<FdItemsSet>;
    /**
     * Static representation of the [[bktxt]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BKTXT: StringField<FdItemsSet>;
    /**
     * Static representation of the [[sgtxt]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const SGTXT: StringField<FdItemsSet>;
    /**
     * All fields of the FdItemsSet entity.
     */
    const _allFields: Array<StringField<FdItemsSet> | BigNumberField<FdItemsSet>>;
    /**
     * All fields selector.
     */
    const ALL_FIELDS: AllFields<FdItemsSet>;
    /**
     * All key fields of the FdItemsSet entity.
     */
    const _keyFields: Array<Selectable<FdItemsSet>>;
    /**
     * Mapping of all key field names to the respective static field property FdItemsSet.
     */
    const _keys: {
        [keys: string]: Selectable<FdItemsSet>;
    };
}
//# sourceMappingURL=FdItemsSet.d.ts.map