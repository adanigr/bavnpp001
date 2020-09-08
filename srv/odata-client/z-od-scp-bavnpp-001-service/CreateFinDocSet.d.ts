import { CreateFinDocSetRequestBuilder } from './CreateFinDocSetRequestBuilder';
import { AllFields, CustomField, Entity, EntityBuilderType, Field, Link, StringField } from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "CreateFinDocSet" of service "Z_OD_SCP_BAVNPP001_SRV".
 */
export declare class CreateFinDocSet extends Entity implements CreateFinDocSetType {
    /**
     * Technical entity name for CreateFinDocSet.
     */
    static _entityName: string;
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for CreateFinDocSet.
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
    hdid: string;
    /**
     * Txt.cab.doc.
     * Maximum length: 25.
     */
    hdtext: string;
    /**
     * Id. Vehículo.
     * Maximum length: 36.
     */
    idvehi: string;
    /**
     * VIN/Serie.
     * Maximum length: 17.
     */
    vin: string;
    /**
     * Sociedad.
     * Maximum length: 4.
     */
    company: string;
    /**
     * Oper. Fin.
     * Maximum length: 6.
     */
    finoper: string;
    /**
     * Cta.mayor.
     * Maximum length: 10.
     */
    account: string;
    /**
     * Centro de coste.
     * Maximum length: 10.
     */
    costcenter: string;
    /**
     * Tipo de cambio.
     * Maximum length: 10.
     */
    exchRate: string;
    /**
     * Fecha de Documento.
     * Maximum length: 8.
     */
    docDate: string;
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
     * One-to-many navigation property to the [[ItemsSet]] entity.
     */
    itemsSet: ItemsSet[];
    /**
     * One-to-many navigation property to the [[RetSet]] entity.
     */
    retSet: RetSet[];
    /**
     * Returns an entity builder to construct instances `CreateFinDocSet`.
     * @returns A builder that constructs instances of entity type `CreateFinDocSet`.
     */
    static builder(): EntityBuilderType<CreateFinDocSet, CreateFinDocSetTypeForceMandatory>;
    /**
     * Returns a request builder to construct requests for operations on the `CreateFinDocSet` entity type.
     * @returns A `CreateFinDocSet` request builder.
     */
    static requestBuilder(): CreateFinDocSetRequestBuilder;
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `CreateFinDocSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `CreateFinDocSet`.
     */
    static customField(fieldName: string): CustomField<CreateFinDocSet>;
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    toJSON(): {
        [key: string]: any;
    };
}
import { ItemsSet, ItemsSetType } from './ItemsSet';
import { RetSet, RetSetType } from './RetSet';
export interface CreateFinDocSetType {
    hdid: string;
    hdtext: string;
    idvehi: string;
    vin: string;
    company: string;
    finoper: string;
    account: string;
    costcenter: string;
    exchRate: string;
    docDate: string;
    scpuser: string;
    scpapp: string;
    itemsSet: ItemsSetType[];
    retSet: RetSetType[];
}
export interface CreateFinDocSetTypeForceMandatory {
    hdid: string;
    hdtext: string;
    idvehi: string;
    vin: string;
    company: string;
    finoper: string;
    account: string;
    costcenter: string;
    exchRate: string;
    docDate: string;
    scpuser: string;
    scpapp: string;
    itemsSet: ItemsSetType[];
    retSet: RetSetType[];
}
export declare namespace CreateFinDocSet {
    /**
     * Static representation of the [[hdid]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const HDID: StringField<CreateFinDocSet>;
    /**
     * Static representation of the [[hdtext]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const HDTEXT: StringField<CreateFinDocSet>;
    /**
     * Static representation of the [[idvehi]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const IDVEHI: StringField<CreateFinDocSet>;
    /**
     * Static representation of the [[vin]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const VIN: StringField<CreateFinDocSet>;
    /**
     * Static representation of the [[company]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const COMPANY: StringField<CreateFinDocSet>;
    /**
     * Static representation of the [[finoper]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const FINOPER: StringField<CreateFinDocSet>;
    /**
     * Static representation of the [[account]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const ACCOUNT: StringField<CreateFinDocSet>;
    /**
     * Static representation of the [[costcenter]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const COSTCENTER: StringField<CreateFinDocSet>;
    /**
     * Static representation of the [[exchRate]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const EXCH_RATE: StringField<CreateFinDocSet>;
    /**
     * Static representation of the [[docDate]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DOC_DATE: StringField<CreateFinDocSet>;
    /**
     * Static representation of the [[scpuser]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const SCPUSER: StringField<CreateFinDocSet>;
    /**
     * Static representation of the [[scpapp]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const SCPAPP: StringField<CreateFinDocSet>;
    /**
     * Static representation of the one-to-many navigation property [[itemsSet]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const ITEMS_SET: Link<CreateFinDocSet, ItemsSet>;
    /**
     * Static representation of the one-to-many navigation property [[retSet]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const RET_SET: Link<CreateFinDocSet, RetSet>;
    /**
     * All fields of the CreateFinDocSet entity.
     */
    const _allFields: Array<StringField<CreateFinDocSet> | Link<CreateFinDocSet, ItemsSet> | Link<CreateFinDocSet, RetSet>>;
    /**
     * All fields selector.
     */
    const ALL_FIELDS: AllFields<CreateFinDocSet>;
    /**
     * All key fields of the CreateFinDocSet entity.
     */
    const _keyFields: Array<Field<CreateFinDocSet>>;
    /**
     * Mapping of all key field names to the respective static field property CreateFinDocSet.
     */
    const _keys: {
        [keys: string]: Field<CreateFinDocSet>;
    };
}
//# sourceMappingURL=CreateFinDocSet.d.ts.map