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
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var NombreCuentaSetRequestBuilder_1 = require("./NombreCuentaSetRequestBuilder");
var core_1 = require("@sap-cloud-sdk/core");
/**
 * This class represents the entity "NombreCuentaSet" of service "Z_OD_SCP_CORE_0001_SRV".
 */
var NombreCuentaSet = /** @class */ (function (_super) {
    __extends(NombreCuentaSet, _super);
    function NombreCuentaSet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns an entity builder to construct instances `NombreCuentaSet`.
     * @returns A builder that constructs instances of entity type `NombreCuentaSet`.
     */
    NombreCuentaSet.builder = function () {
        return core_1.Entity.entityBuilder(NombreCuentaSet);
    };
    /**
     * Returns a request builder to construct requests for operations on the `NombreCuentaSet` entity type.
     * @returns A `NombreCuentaSet` request builder.
     */
    NombreCuentaSet.requestBuilder = function () {
        return new NombreCuentaSetRequestBuilder_1.NombreCuentaSetRequestBuilder();
    };
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `NombreCuentaSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `NombreCuentaSet`.
     */
    NombreCuentaSet.customField = function (fieldName) {
        return core_1.Entity.customFieldSelector(fieldName, NombreCuentaSet);
    };
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    NombreCuentaSet.prototype.toJSON = function () {
        return __assign(__assign({}, this), this._customFields);
    };
    /**
     * Technical entity name for NombreCuentaSet.
     */
    NombreCuentaSet._entityName = 'NombreCuentaSet';
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for NombreCuentaSet.
     */
    NombreCuentaSet._serviceName = 'Z_OD_SCP_CORE_0001_SRV';
    /**
     * Default url path for the according service.
     */
    NombreCuentaSet._defaultServicePath = '/sap/opu/odata/sap/Z_OD_SCP_CORE_0001_SRV';
    return NombreCuentaSet;
}(core_1.Entity));
exports.NombreCuentaSet = NombreCuentaSet;
(function (NombreCuentaSet) {
    /**
     * Static representation of the [[spras]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    NombreCuentaSet.SPRAS = new core_1.StringField('Spras', NombreCuentaSet, 'Edm.String');
    /**
     * Static representation of the [[ktopl]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    NombreCuentaSet.KTOPL = new core_1.StringField('Ktopl', NombreCuentaSet, 'Edm.String');
    /**
     * Static representation of the [[saknr]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    NombreCuentaSet.SAKNR = new core_1.StringField('Saknr', NombreCuentaSet, 'Edm.String');
    /**
     * Static representation of the [[txt50]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    NombreCuentaSet.TXT_50 = new core_1.StringField('Txt50', NombreCuentaSet, 'Edm.String');
    /**
     * All fields of the NombreCuentaSet entity.
     */
    NombreCuentaSet._allFields = [
        NombreCuentaSet.SPRAS,
        NombreCuentaSet.KTOPL,
        NombreCuentaSet.SAKNR,
        NombreCuentaSet.TXT_50
    ];
    /**
     * All fields selector.
     */
    NombreCuentaSet.ALL_FIELDS = new core_1.AllFields('*', NombreCuentaSet);
    /**
     * All key fields of the NombreCuentaSet entity.
     */
    NombreCuentaSet._keyFields = [NombreCuentaSet.SPRAS, NombreCuentaSet.KTOPL, NombreCuentaSet.SAKNR];
    /**
     * Mapping of all key field names to the respective static field property NombreCuentaSet.
     */
    NombreCuentaSet._keys = NombreCuentaSet._keyFields.reduce(function (acc, field) {
        acc[field._fieldName] = field;
        return acc;
    }, {});
})(NombreCuentaSet = exports.NombreCuentaSet || (exports.NombreCuentaSet = {}));
exports.NombreCuentaSet = NombreCuentaSet;
//# sourceMappingURL=NombreCuentaSet.js.map