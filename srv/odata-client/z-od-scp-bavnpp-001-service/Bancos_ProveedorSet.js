"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bancos_ProveedorSet = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var Bancos_ProveedorSetRequestBuilder_1 = require("./Bancos_ProveedorSetRequestBuilder");
var core_1 = require("@sap-cloud-sdk/core");
/**
 * This class represents the entity "Bancos_ProveedorSet" of service "Z_OD_SCP_BAVNPP001_SRV".
 */
var Bancos_ProveedorSet = /** @class */ (function (_super) {
    __extends(Bancos_ProveedorSet, _super);
    function Bancos_ProveedorSet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns an entity builder to construct instances `Bancos_ProveedorSet`.
     * @returns A builder that constructs instances of entity type `Bancos_ProveedorSet`.
     */
    Bancos_ProveedorSet.builder = function () {
        return core_1.Entity.entityBuilder(Bancos_ProveedorSet);
    };
    /**
     * Returns a request builder to construct requests for operations on the `Bancos_ProveedorSet` entity type.
     * @returns A `Bancos_ProveedorSet` request builder.
     */
    Bancos_ProveedorSet.requestBuilder = function () {
        return new Bancos_ProveedorSetRequestBuilder_1.Bancos_ProveedorSetRequestBuilder();
    };
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `Bancos_ProveedorSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `Bancos_ProveedorSet`.
     */
    Bancos_ProveedorSet.customField = function (fieldName) {
        return core_1.Entity.customFieldSelector(fieldName, Bancos_ProveedorSet);
    };
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    Bancos_ProveedorSet.prototype.toJSON = function () {
        return __assign(__assign({}, this), this._customFields);
    };
    /**
     * Technical entity name for Bancos_ProveedorSet.
     */
    Bancos_ProveedorSet._entityName = 'Bancos_ProveedorSet';
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for Bancos_ProveedorSet.
     */
    Bancos_ProveedorSet._serviceName = 'Z_OD_SCP_BAVNPP001_SRV';
    /**
     * Default url path for the according service.
     */
    Bancos_ProveedorSet._defaultServicePath = '/sap/opu/odata/sap/Z_OD_SCP_BAVNPP001_SRV';
    return Bancos_ProveedorSet;
}(core_1.Entity));
exports.Bancos_ProveedorSet = Bancos_ProveedorSet;
(function (Bancos_ProveedorSet) {
    /**
     * Static representation of the [[partner]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    Bancos_ProveedorSet.PARTNER = new core_1.StringField('Partner', Bancos_ProveedorSet, 'Edm.String');
    /**
     * Static representation of the [[bkvid]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    Bancos_ProveedorSet.BKVID = new core_1.StringField('Bkvid', Bancos_ProveedorSet, 'Edm.String');
    /**
     * Static representation of the [[bankl]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    Bancos_ProveedorSet.BANKL = new core_1.StringField('Bankl', Bancos_ProveedorSet, 'Edm.String');
    /**
     * Static representation of the [[bankn]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    Bancos_ProveedorSet.BANKN = new core_1.StringField('Bankn', Bancos_ProveedorSet, 'Edm.String');
    /**
     * Static representation of the [[bkont]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    Bancos_ProveedorSet.BKONT = new core_1.StringField('Bkont', Bancos_ProveedorSet, 'Edm.String');
    /**
     * Static representation of the [[bkref]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    Bancos_ProveedorSet.BKREF = new core_1.StringField('Bkref', Bancos_ProveedorSet, 'Edm.String');
    /**
     * Static representation of the [[bkext]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    Bancos_ProveedorSet.BKEXT = new core_1.StringField('Bkext', Bancos_ProveedorSet, 'Edm.String');
    /**
     * Static representation of the [[koinh]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    Bancos_ProveedorSet.KOINH = new core_1.StringField('Koinh', Bancos_ProveedorSet, 'Edm.String');
    /**
     * All fields of the Bancos_ProveedorSet entity.
     */
    Bancos_ProveedorSet._allFields = [
        Bancos_ProveedorSet.PARTNER,
        Bancos_ProveedorSet.BKVID,
        Bancos_ProveedorSet.BANKL,
        Bancos_ProveedorSet.BANKN,
        Bancos_ProveedorSet.BKONT,
        Bancos_ProveedorSet.BKREF,
        Bancos_ProveedorSet.BKEXT,
        Bancos_ProveedorSet.KOINH
    ];
    /**
     * All fields selector.
     */
    Bancos_ProveedorSet.ALL_FIELDS = new core_1.AllFields('*', Bancos_ProveedorSet);
    /**
     * All key fields of the Bancos_ProveedorSet entity.
     */
    Bancos_ProveedorSet._keyFields = [Bancos_ProveedorSet.PARTNER, Bancos_ProveedorSet.BKVID, Bancos_ProveedorSet.BANKL];
    /**
     * Mapping of all key field names to the respective static field property Bancos_ProveedorSet.
     */
    Bancos_ProveedorSet._keys = Bancos_ProveedorSet._keyFields.reduce(function (acc, field) {
        acc[field._fieldName] = field;
        return acc;
    }, {});
})(Bancos_ProveedorSet = exports.Bancos_ProveedorSet || (exports.Bancos_ProveedorSet = {}));
exports.Bancos_ProveedorSet = Bancos_ProveedorSet;
//# sourceMappingURL=Bancos_ProveedorSet.js.map