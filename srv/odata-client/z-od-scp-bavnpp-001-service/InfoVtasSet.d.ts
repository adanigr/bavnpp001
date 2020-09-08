import { InfoVtasSetRequestBuilder } from './InfoVtasSetRequestBuilder';
import { Moment } from 'moment';
import { BigNumber } from 'bignumber.js';
import { AllFields, BigNumberField, CustomField, DateField, Entity, EntityBuilderType, Field, StringField } from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "InfoVtasSet" of service "Z_OD_SCP_BAVNPP001_SRV".
 */
export declare class InfoVtasSet extends Entity implements InfoVtasSetType {
    /**
     * Technical entity name for InfoVtasSet.
     */
    static _entityName: string;
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for InfoVtasSet.
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
     * Cliente.
     * Maximum length: 10.
     */
    kunnr: string;
    /**
     * Nombre 1.
     * Maximum length: 30.
     */
    name1: string;
    /**
     * Documento venta.
     * Maximum length: 10.
     */
    vbelnVa: string;
    /**
     * Factura.
     * Maximum length: 10.
     */
    vbelnVf: string;
    /**
     * Campo de texto, longitud 10.
     */
    fkdat: Moment;
    /**
     * Campo.
     */
    wrbtr: BigNumber;
    /**
     * Returns an entity builder to construct instances `InfoVtasSet`.
     * @returns A builder that constructs instances of entity type `InfoVtasSet`.
     */
    static builder(): EntityBuilderType<InfoVtasSet, InfoVtasSetTypeForceMandatory>;
    /**
     * Returns a request builder to construct requests for operations on the `InfoVtasSet` entity type.
     * @returns A `InfoVtasSet` request builder.
     */
    static requestBuilder(): InfoVtasSetRequestBuilder;
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `InfoVtasSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `InfoVtasSet`.
     */
    static customField(fieldName: string): CustomField<InfoVtasSet>;
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    toJSON(): {
        [key: string]: any;
    };
}
export interface InfoVtasSetType {
    idvehi: string;
    kunnr: string;
    name1: string;
    vbelnVa: string;
    vbelnVf: string;
    fkdat: Moment;
    wrbtr: BigNumber;
}
export interface InfoVtasSetTypeForceMandatory {
    idvehi: string;
    kunnr: string;
    name1: string;
    vbelnVa: string;
    vbelnVf: string;
    fkdat: Moment;
    wrbtr: BigNumber;
}
export declare namespace InfoVtasSet {
    /**
     * Static representation of the [[idvehi]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const IDVEHI: StringField<InfoVtasSet>;
    /**
     * Static representation of the [[kunnr]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const KUNNR: StringField<InfoVtasSet>;
    /**
     * Static representation of the [[name1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const NAME_1: StringField<InfoVtasSet>;
    /**
     * Static representation of the [[vbelnVa]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const VBELN_VA: StringField<InfoVtasSet>;
    /**
     * Static representation of the [[vbelnVf]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const VBELN_VF: StringField<InfoVtasSet>;
    /**
     * Static representation of the [[fkdat]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const FKDAT: DateField<InfoVtasSet>;
    /**
     * Static representation of the [[wrbtr]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const WRBTR: BigNumberField<InfoVtasSet>;
    /**
     * All fields of the InfoVtasSet entity.
     */
    const _allFields: Array<StringField<InfoVtasSet> | DateField<InfoVtasSet> | BigNumberField<InfoVtasSet>>;
    /**
     * All fields selector.
     */
    const ALL_FIELDS: AllFields<InfoVtasSet>;
    /**
     * All key fields of the InfoVtasSet entity.
     */
    const _keyFields: Array<Field<InfoVtasSet>>;
    /**
     * Mapping of all key field names to the respective static field property InfoVtasSet.
     */
    const _keys: {
        [keys: string]: Field<InfoVtasSet>;
    };
}
//# sourceMappingURL=InfoVtasSet.d.ts.map