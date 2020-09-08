import { RetSetRequestBuilder } from './RetSetRequestBuilder';
import { AllFields, CustomField, Entity, EntityBuilderType, Field, NumberField, StringField } from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "RetSet" of service "Z_OD_SCP_BAVNPP001_SRV".
 */
export declare class RetSet extends Entity implements RetSetType {
    /**
     * Technical entity name for RetSet.
     */
    static _entityName: string;
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for RetSet.
     */
    static _serviceName: string;
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath: string;
    /**
     * Texto 36 pos.
     * Maximum length: 36.
     */
    hdId: string;
    /**
     * Id. Vehículo.
     * Maximum length: 36.
     */
    idvehi: string;
    /**
     * Tipo de mensaje.
     * Maximum length: 1.
     */
    type: string;
    /**
     * Clase de mensajes.
     * Maximum length: 20.
     */
    id: string;
    /**
     * Nº mensaje.
     * Maximum length: 3.
     */
    number: string;
    /**
     * Texto mensaje.
     * Maximum length: 220.
     */
    message: string;
    /**
     * Número log.
     * Maximum length: 20.
     */
    logNo: string;
    /**
     * Nº mensaje.
     * Maximum length: 6.
     */
    logMsgNo: string;
    /**
     * Variable de mensaje.
     * Maximum length: 50.
     */
    messageV1: string;
    /**
     * Variable de mensaje.
     * Maximum length: 50.
     */
    messageV2: string;
    /**
     * Variable de mensaje.
     * Maximum length: 50.
     */
    messageV3: string;
    /**
     * Variable de mensaje.
     * Maximum length: 50.
     */
    messageV4: string;
    /**
     * Parámetro.
     * Maximum length: 32.
     */
    parameter: string;
    /**
     * Línea parámetro.
     */
    row: number;
    /**
     * Nombre campo.
     * Maximum length: 30.
     */
    field: string;
    /**
     * Sistema lógico.
     * Maximum length: 10.
     */
    system: string;
    /**
     * Returns an entity builder to construct instances `RetSet`.
     * @returns A builder that constructs instances of entity type `RetSet`.
     */
    static builder(): EntityBuilderType<RetSet, RetSetTypeForceMandatory>;
    /**
     * Returns a request builder to construct requests for operations on the `RetSet` entity type.
     * @returns A `RetSet` request builder.
     */
    static requestBuilder(): RetSetRequestBuilder;
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `RetSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `RetSet`.
     */
    static customField(fieldName: string): CustomField<RetSet>;
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    toJSON(): {
        [key: string]: any;
    };
}
export interface RetSetType {
    hdId: string;
    idvehi: string;
    type: string;
    id: string;
    number: string;
    message: string;
    logNo: string;
    logMsgNo: string;
    messageV1: string;
    messageV2: string;
    messageV3: string;
    messageV4: string;
    parameter: string;
    row: number;
    field: string;
    system: string;
}
export interface RetSetTypeForceMandatory {
    hdId: string;
    idvehi: string;
    type: string;
    id: string;
    number: string;
    message: string;
    logNo: string;
    logMsgNo: string;
    messageV1: string;
    messageV2: string;
    messageV3: string;
    messageV4: string;
    parameter: string;
    row: number;
    field: string;
    system: string;
}
export declare namespace RetSet {
    /**
     * Static representation of the [[hdId]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const HD_ID: StringField<RetSet>;
    /**
     * Static representation of the [[idvehi]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const IDVEHI: StringField<RetSet>;
    /**
     * Static representation of the [[type]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const TYPE: StringField<RetSet>;
    /**
     * Static representation of the [[id]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const ID: StringField<RetSet>;
    /**
     * Static representation of the [[number]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const NUMBER: StringField<RetSet>;
    /**
     * Static representation of the [[message]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const MESSAGE: StringField<RetSet>;
    /**
     * Static representation of the [[logNo]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const LOG_NO: StringField<RetSet>;
    /**
     * Static representation of the [[logMsgNo]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const LOG_MSG_NO: StringField<RetSet>;
    /**
     * Static representation of the [[messageV1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const MESSAGE_V_1: StringField<RetSet>;
    /**
     * Static representation of the [[messageV2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const MESSAGE_V_2: StringField<RetSet>;
    /**
     * Static representation of the [[messageV3]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const MESSAGE_V_3: StringField<RetSet>;
    /**
     * Static representation of the [[messageV4]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const MESSAGE_V_4: StringField<RetSet>;
    /**
     * Static representation of the [[parameter]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const PARAMETER: StringField<RetSet>;
    /**
     * Static representation of the [[row]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const ROW: NumberField<RetSet>;
    /**
     * Static representation of the [[field]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const FIELD: StringField<RetSet>;
    /**
     * Static representation of the [[system]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const SYSTEM: StringField<RetSet>;
    /**
     * All fields of the RetSet entity.
     */
    const _allFields: Array<StringField<RetSet> | NumberField<RetSet>>;
    /**
     * All fields selector.
     */
    const ALL_FIELDS: AllFields<RetSet>;
    /**
     * All key fields of the RetSet entity.
     */
    const _keyFields: Array<Field<RetSet>>;
    /**
     * Mapping of all key field names to the respective static field property RetSet.
     */
    const _keys: {
        [keys: string]: Field<RetSet>;
    };
}
//# sourceMappingURL=RetSet.d.ts.map