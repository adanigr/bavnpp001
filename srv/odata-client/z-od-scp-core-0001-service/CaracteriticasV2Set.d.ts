import { CaracteriticasV2SetRequestBuilder } from './CaracteriticasV2SetRequestBuilder';
import { AllFields, CustomField, Entity, EntityBuilderType, NumberField, Selectable, StringField } from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "CaracteriticasV2Set" of service "Z_OD_SCP_CORE_0001_SRV".
 */
export declare class CaracteriticasV2Set extends Entity implements CaracteriticasV2SetType {
    /**
     * Technical entity name for CaracteriticasV2Set.
     */
    static _entityName: string;
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for CaracteriticasV2Set.
     */
    static _serviceName: string;
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath: string;
    /**
     * Mandante.
     * Maximum length: 3.
     */
    mandt: string;
    /**
     * Característica.
     * Maximum length: 30.
     */
    caractname: string;
    /**
     * Denominación.
     * Maximum length: 30.
     */
    caractdesc: string;
    /**
     * Valor caract.
     * Maximum length: 70.
     */
    caractvalcode: string;
    /**
     * Denominación.
     * Maximum length: 70.
     */
    caractvaldesc: string;
    /**
     * Valor caract.
     * Maximum length: 70.
     */
    depvalcode: string;
    /**
     * Denominación.
     * Maximum length: 70.
     */
    depvaldesc: string;
    /**
     * Valor de.
     */
    depvalnum: number;
    /**
     * Returns an entity builder to construct instances `CaracteriticasV2Set`.
     * @returns A builder that constructs instances of entity type `CaracteriticasV2Set`.
     */
    static builder(): EntityBuilderType<CaracteriticasV2Set, CaracteriticasV2SetTypeForceMandatory>;
    /**
     * Returns a request builder to construct requests for operations on the `CaracteriticasV2Set` entity type.
     * @returns A `CaracteriticasV2Set` request builder.
     */
    static requestBuilder(): CaracteriticasV2SetRequestBuilder;
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `CaracteriticasV2Set`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `CaracteriticasV2Set`.
     */
    static customField(fieldName: string): CustomField<CaracteriticasV2Set>;
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    toJSON(): {
        [key: string]: any;
    };
}
export interface CaracteriticasV2SetType {
    mandt: string;
    caractname: string;
    caractdesc: string;
    caractvalcode: string;
    caractvaldesc: string;
    depvalcode: string;
    depvaldesc: string;
    depvalnum: number;
}
export interface CaracteriticasV2SetTypeForceMandatory {
    mandt: string;
    caractname: string;
    caractdesc: string;
    caractvalcode: string;
    caractvaldesc: string;
    depvalcode: string;
    depvaldesc: string;
    depvalnum: number;
}
export declare namespace CaracteriticasV2Set {
    /**
     * Static representation of the [[mandt]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const MANDT: StringField<CaracteriticasV2Set>;
    /**
     * Static representation of the [[caractname]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const CARACTNAME: StringField<CaracteriticasV2Set>;
    /**
     * Static representation of the [[caractdesc]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const CARACTDESC: StringField<CaracteriticasV2Set>;
    /**
     * Static representation of the [[caractvalcode]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const CARACTVALCODE: StringField<CaracteriticasV2Set>;
    /**
     * Static representation of the [[caractvaldesc]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const CARACTVALDESC: StringField<CaracteriticasV2Set>;
    /**
     * Static representation of the [[depvalcode]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DEPVALCODE: StringField<CaracteriticasV2Set>;
    /**
     * Static representation of the [[depvaldesc]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DEPVALDESC: StringField<CaracteriticasV2Set>;
    /**
     * Static representation of the [[depvalnum]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DEPVALNUM: NumberField<CaracteriticasV2Set>;
    /**
     * All fields of the CaracteriticasV2Set entity.
     */
    const _allFields: Array<StringField<CaracteriticasV2Set> | NumberField<CaracteriticasV2Set>>;
    /**
     * All fields selector.
     */
    const ALL_FIELDS: AllFields<CaracteriticasV2Set>;
    /**
     * All key fields of the CaracteriticasV2Set entity.
     */
    const _keyFields: Array<Selectable<CaracteriticasV2Set>>;
    /**
     * Mapping of all key field names to the respective static field property CaracteriticasV2Set.
     */
    const _keys: {
        [keys: string]: Selectable<CaracteriticasV2Set>;
    };
}
//# sourceMappingURL=CaracteriticasV2Set.d.ts.map