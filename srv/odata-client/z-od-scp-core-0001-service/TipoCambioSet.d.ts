import { TipoCambioSetRequestBuilder } from './TipoCambioSetRequestBuilder';
import { BigNumber } from 'bignumber.js';
import { AllFields, BigNumberField, CustomField, Entity, EntityBuilderType, Selectable, StringField } from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "TipoCambioSet" of service "Z_OD_SCP_CORE_0001_SRV".
 */
export declare class TipoCambioSet extends Entity implements TipoCambioSetType {
    /**
     * Technical entity name for TipoCambioSet.
     */
    static _entityName: string;
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for TipoCambioSet.
     */
    static _serviceName: string;
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath: string;
    /**
     * Tipo cotización.
     * Maximum length: 4.
     */
    kurst: string;
    /**
     * Mon.procedencia.
     * Maximum length: 5.
     */
    fcurr: string;
    /**
     * Moneda destino.
     * Maximum length: 5.
     */
    tcurr: string;
    /**
     * Válido de.
     * Maximum length: 10.
     */
    gdatu: string;
    /**
     * Tipo de cambio.
     */
    ukurs: BigNumber;
    /**
     * Returns an entity builder to construct instances `TipoCambioSet`.
     * @returns A builder that constructs instances of entity type `TipoCambioSet`.
     */
    static builder(): EntityBuilderType<TipoCambioSet, TipoCambioSetTypeForceMandatory>;
    /**
     * Returns a request builder to construct requests for operations on the `TipoCambioSet` entity type.
     * @returns A `TipoCambioSet` request builder.
     */
    static requestBuilder(): TipoCambioSetRequestBuilder;
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `TipoCambioSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `TipoCambioSet`.
     */
    static customField(fieldName: string): CustomField<TipoCambioSet>;
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    toJSON(): {
        [key: string]: any;
    };
}
export interface TipoCambioSetType {
    kurst: string;
    fcurr: string;
    tcurr: string;
    gdatu: string;
    ukurs: BigNumber;
}
export interface TipoCambioSetTypeForceMandatory {
    kurst: string;
    fcurr: string;
    tcurr: string;
    gdatu: string;
    ukurs: BigNumber;
}
export declare namespace TipoCambioSet {
    /**
     * Static representation of the [[kurst]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const KURST: StringField<TipoCambioSet>;
    /**
     * Static representation of the [[fcurr]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const FCURR: StringField<TipoCambioSet>;
    /**
     * Static representation of the [[tcurr]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const TCURR: StringField<TipoCambioSet>;
    /**
     * Static representation of the [[gdatu]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const GDATU: StringField<TipoCambioSet>;
    /**
     * Static representation of the [[ukurs]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const UKURS: BigNumberField<TipoCambioSet>;
    /**
     * All fields of the TipoCambioSet entity.
     */
    const _allFields: Array<StringField<TipoCambioSet> | BigNumberField<TipoCambioSet>>;
    /**
     * All fields selector.
     */
    const ALL_FIELDS: AllFields<TipoCambioSet>;
    /**
     * All key fields of the TipoCambioSet entity.
     */
    const _keyFields: Array<Selectable<TipoCambioSet>>;
    /**
     * Mapping of all key field names to the respective static field property TipoCambioSet.
     */
    const _keys: {
        [keys: string]: Selectable<TipoCambioSet>;
    };
}
//# sourceMappingURL=TipoCambioSet.d.ts.map