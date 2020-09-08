import { CancelFinDocSetRequestBuilder } from './CancelFinDocSetRequestBuilder';
import { AllFields, CustomField, Entity, EntityBuilderType, Field, StringField } from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "CancelFinDocSet" of service "Z_OD_SCP_BAVNPP001_SRV".
 */
export declare class CancelFinDocSet extends Entity implements CancelFinDocSetType {
    /**
     * Technical entity name for CancelFinDocSet.
     */
    static _entityName: string;
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for CancelFinDocSet.
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
     * Clv.referencia.
     * Maximum length: 20.
     */
    docid: string;
    /**
     * Usuario SCP.
     * Maximum length: 30.
     */
    scpuser: string;
    /**
     * App.
     * Maximum length: 50.
     */
    scpapp: string;
    /**
     * Indicador de Exito.
     * Maximum length: 1.
     * @nullable
     */
    cancelind?: string;
    /**
     * Nº documento.
     * Maximum length: 10.
     * @nullable
     */
    canceldoc?: string;
    /**
     * Returns an entity builder to construct instances `CancelFinDocSet`.
     * @returns A builder that constructs instances of entity type `CancelFinDocSet`.
     */
    static builder(): EntityBuilderType<CancelFinDocSet, CancelFinDocSetTypeForceMandatory>;
    /**
     * Returns a request builder to construct requests for operations on the `CancelFinDocSet` entity type.
     * @returns A `CancelFinDocSet` request builder.
     */
    static requestBuilder(): CancelFinDocSetRequestBuilder;
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `CancelFinDocSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `CancelFinDocSet`.
     */
    static customField(fieldName: string): CustomField<CancelFinDocSet>;
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    toJSON(): {
        [key: string]: any;
    };
}
export interface CancelFinDocSetType {
    idvehi: string;
    docid: string;
    scpuser: string;
    scpapp: string;
    cancelind?: string;
    canceldoc?: string;
}
export interface CancelFinDocSetTypeForceMandatory {
    idvehi: string;
    docid: string;
    scpuser: string;
    scpapp: string;
    cancelind: string;
    canceldoc: string;
}
export declare namespace CancelFinDocSet {
    /**
     * Static representation of the [[idvehi]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const IDVEHI: StringField<CancelFinDocSet>;
    /**
     * Static representation of the [[docid]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DOCID: StringField<CancelFinDocSet>;
    /**
     * Static representation of the [[scpuser]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const SCPUSER: StringField<CancelFinDocSet>;
    /**
     * Static representation of the [[scpapp]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const SCPAPP: StringField<CancelFinDocSet>;
    /**
     * Static representation of the [[cancelind]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const CANCELIND: StringField<CancelFinDocSet>;
    /**
     * Static representation of the [[canceldoc]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const CANCELDOC: StringField<CancelFinDocSet>;
    /**
     * All fields of the CancelFinDocSet entity.
     */
    const _allFields: Array<StringField<CancelFinDocSet>>;
    /**
     * All fields selector.
     */
    const ALL_FIELDS: AllFields<CancelFinDocSet>;
    /**
     * All key fields of the CancelFinDocSet entity.
     */
    const _keyFields: Array<Field<CancelFinDocSet>>;
    /**
     * Mapping of all key field names to the respective static field property CancelFinDocSet.
     */
    const _keys: {
        [keys: string]: Field<CancelFinDocSet>;
    };
}
//# sourceMappingURL=CancelFinDocSet.d.ts.map