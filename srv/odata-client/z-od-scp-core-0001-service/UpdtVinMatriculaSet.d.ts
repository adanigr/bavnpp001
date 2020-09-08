import { UpdtVinMatriculaSetRequestBuilder } from './UpdtVinMatriculaSetRequestBuilder';
import { AllFields, CustomField, Entity, EntityBuilderType, Selectable, StringField } from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "UpdtVinMatriculaSet" of service "Z_OD_SCP_CORE_0001_SRV".
 */
export declare class UpdtVinMatriculaSet extends Entity implements UpdtVinMatriculaSetType {
    /**
     * Technical entity name for UpdtVinMatriculaSet.
     */
    static _entityName: string;
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for UpdtVinMatriculaSet.
     */
    static _serviceName: string;
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath: string;
    /**
     * Id. Vehículo.
     * Maximum length: 36.
     */
    idvehi: string;
    /**
     * Nº ident.fabr.
     * Maximum length: 30.
     * @nullable
     */
    vin?: string;
    /**
     * Matríc.vehículo.
     * Maximum length: 15.
     * @nullable
     */
    lnum?: string;
    /**
     * División.
     * Maximum length: 4.
     * @nullable
     */
    gsber?: string;
    /**
     * App.
     * Maximum length: 50.
     * @nullable
     */
    scpuser?: string;
    /**
     * Usuario SCP.
     * Maximum length: 30.
     * @nullable
     */
    scpapp?: string;
    /**
     * Tipo de mensaje.
     * Maximum length: 1.
     * @nullable
     */
    msgtype?: string;
    /**
     * Texto mensaje.
     * Maximum length: 220.
     * @nullable
     */
    message?: string;
    /**
     * Variable de mensaje.
     * Maximum length: 50.
     * @nullable
     */
    messageV1?: string;
    /**
     * Returns an entity builder to construct instances `UpdtVinMatriculaSet`.
     * @returns A builder that constructs instances of entity type `UpdtVinMatriculaSet`.
     */
    static builder(): EntityBuilderType<UpdtVinMatriculaSet, UpdtVinMatriculaSetTypeForceMandatory>;
    /**
     * Returns a request builder to construct requests for operations on the `UpdtVinMatriculaSet` entity type.
     * @returns A `UpdtVinMatriculaSet` request builder.
     */
    static requestBuilder(): UpdtVinMatriculaSetRequestBuilder;
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `UpdtVinMatriculaSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `UpdtVinMatriculaSet`.
     */
    static customField(fieldName: string): CustomField<UpdtVinMatriculaSet>;
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    toJSON(): {
        [key: string]: any;
    };
}
export interface UpdtVinMatriculaSetType {
    idvehi: string;
    vin?: string;
    lnum?: string;
    gsber?: string;
    scpuser?: string;
    scpapp?: string;
    msgtype?: string;
    message?: string;
    messageV1?: string;
}
export interface UpdtVinMatriculaSetTypeForceMandatory {
    idvehi: string;
    vin: string;
    lnum: string;
    gsber: string;
    scpuser: string;
    scpapp: string;
    msgtype: string;
    message: string;
    messageV1: string;
}
export declare namespace UpdtVinMatriculaSet {
    /**
     * Static representation of the [[idvehi]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const IDVEHI: StringField<UpdtVinMatriculaSet>;
    /**
     * Static representation of the [[vin]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const VIN: StringField<UpdtVinMatriculaSet>;
    /**
     * Static representation of the [[lnum]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const LNUM: StringField<UpdtVinMatriculaSet>;
    /**
     * Static representation of the [[gsber]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const GSBER: StringField<UpdtVinMatriculaSet>;
    /**
     * Static representation of the [[scpuser]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const SCPUSER: StringField<UpdtVinMatriculaSet>;
    /**
     * Static representation of the [[scpapp]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const SCPAPP: StringField<UpdtVinMatriculaSet>;
    /**
     * Static representation of the [[msgtype]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const MSGTYPE: StringField<UpdtVinMatriculaSet>;
    /**
     * Static representation of the [[message]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const MESSAGE: StringField<UpdtVinMatriculaSet>;
    /**
     * Static representation of the [[messageV1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const MESSAGE_V_1: StringField<UpdtVinMatriculaSet>;
    /**
     * All fields of the UpdtVinMatriculaSet entity.
     */
    const _allFields: Array<StringField<UpdtVinMatriculaSet>>;
    /**
     * All fields selector.
     */
    const ALL_FIELDS: AllFields<UpdtVinMatriculaSet>;
    /**
     * All key fields of the UpdtVinMatriculaSet entity.
     */
    const _keyFields: Array<Selectable<UpdtVinMatriculaSet>>;
    /**
     * Mapping of all key field names to the respective static field property UpdtVinMatriculaSet.
     */
    const _keys: {
        [keys: string]: Selectable<UpdtVinMatriculaSet>;
    };
}
//# sourceMappingURL=UpdtVinMatriculaSet.d.ts.map