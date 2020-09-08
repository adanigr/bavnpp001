import { CaracteriticasSetRequestBuilder } from './CaracteriticasSetRequestBuilder';
import { AllFields, CustomField, Entity, EntityBuilderType, Selectable, StringField } from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "CaracteriticasSet" of service "Z_OD_SCP_CORE_0001_SRV".
 */
export declare class CaracteriticasSet extends Entity implements CaracteriticasSetType {
    /**
     * Technical entity name for CaracteriticasSet.
     */
    static _entityName: string;
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for CaracteriticasSet.
     */
    static _serviceName: string;
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath: string;
    /**
     * Característica.
     * Maximum length: 30.
     */
    charactname: string;
    /**
     * Valor caract.
     * Maximum length: 70.
     */
    valueCharLong: string;
    /**
     * Descripción.
     * Maximum length: 70.
     */
    descriptionLong: string;
    /**
     * Returns an entity builder to construct instances `CaracteriticasSet`.
     * @returns A builder that constructs instances of entity type `CaracteriticasSet`.
     */
    static builder(): EntityBuilderType<CaracteriticasSet, CaracteriticasSetTypeForceMandatory>;
    /**
     * Returns a request builder to construct requests for operations on the `CaracteriticasSet` entity type.
     * @returns A `CaracteriticasSet` request builder.
     */
    static requestBuilder(): CaracteriticasSetRequestBuilder;
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `CaracteriticasSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `CaracteriticasSet`.
     */
    static customField(fieldName: string): CustomField<CaracteriticasSet>;
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    toJSON(): {
        [key: string]: any;
    };
}
export interface CaracteriticasSetType {
    charactname: string;
    valueCharLong: string;
    descriptionLong: string;
}
export interface CaracteriticasSetTypeForceMandatory {
    charactname: string;
    valueCharLong: string;
    descriptionLong: string;
}
export declare namespace CaracteriticasSet {
    /**
     * Static representation of the [[charactname]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const CHARACTNAME: StringField<CaracteriticasSet>;
    /**
     * Static representation of the [[valueCharLong]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const VALUE_CHAR_LONG: StringField<CaracteriticasSet>;
    /**
     * Static representation of the [[descriptionLong]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DESCRIPTION_LONG: StringField<CaracteriticasSet>;
    /**
     * All fields of the CaracteriticasSet entity.
     */
    const _allFields: Array<StringField<CaracteriticasSet>>;
    /**
     * All fields selector.
     */
    const ALL_FIELDS: AllFields<CaracteriticasSet>;
    /**
     * All key fields of the CaracteriticasSet entity.
     */
    const _keyFields: Array<Selectable<CaracteriticasSet>>;
    /**
     * Mapping of all key field names to the respective static field property CaracteriticasSet.
     */
    const _keys: {
        [keys: string]: Selectable<CaracteriticasSet>;
    };
}
//# sourceMappingURL=CaracteriticasSet.d.ts.map