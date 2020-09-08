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
var CentrosSetRequestBuilder_1 = require("./CentrosSetRequestBuilder");
var core_1 = require("@sap-cloud-sdk/core");
/**
 * This class represents the entity "CentrosSet" of service "Z_OD_SCP_CORE_0001_SRV".
 */
var CentrosSet = /** @class */ (function (_super) {
    __extends(CentrosSet, _super);
    function CentrosSet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns an entity builder to construct instances `CentrosSet`.
     * @returns A builder that constructs instances of entity type `CentrosSet`.
     */
    CentrosSet.builder = function () {
        return core_1.Entity.entityBuilder(CentrosSet);
    };
    /**
     * Returns a request builder to construct requests for operations on the `CentrosSet` entity type.
     * @returns A `CentrosSet` request builder.
     */
    CentrosSet.requestBuilder = function () {
        return new CentrosSetRequestBuilder_1.CentrosSetRequestBuilder();
    };
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `CentrosSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `CentrosSet`.
     */
    CentrosSet.customField = function (fieldName) {
        return core_1.Entity.customFieldSelector(fieldName, CentrosSet);
    };
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    CentrosSet.prototype.toJSON = function () {
        return __assign(__assign({}, this), this._customFields);
    };
    /**
     * Technical entity name for CentrosSet.
     */
    CentrosSet._entityName = 'CentrosSet';
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for CentrosSet.
     */
    CentrosSet._serviceName = 'Z_OD_SCP_CORE_0001_SRV';
    /**
     * Default url path for the according service.
     */
    CentrosSet._defaultServicePath = '/sap/opu/odata/sap/Z_OD_SCP_CORE_0001_SRV';
    return CentrosSet;
}(core_1.Entity));
exports.CentrosSet = CentrosSet;
(function (CentrosSet) {
    /**
     * Static representation of the [[bukrs]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CentrosSet.BUKRS = new core_1.StringField('Bukrs', CentrosSet, 'Edm.String');
    /**
     * Static representation of the [[werks]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CentrosSet.WERKS = new core_1.StringField('Werks', CentrosSet, 'Edm.String');
    /**
     * Static representation of the [[name1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CentrosSet.NAME_1 = new core_1.StringField('Name1', CentrosSet, 'Edm.String');
    /**
     * All fields of the CentrosSet entity.
     */
    CentrosSet._allFields = [
        CentrosSet.BUKRS,
        CentrosSet.WERKS,
        CentrosSet.NAME_1
    ];
    /**
     * All fields selector.
     */
    CentrosSet.ALL_FIELDS = new core_1.AllFields('*', CentrosSet);
    /**
     * All key fields of the CentrosSet entity.
     */
    CentrosSet._keyFields = [CentrosSet.BUKRS, CentrosSet.WERKS];
    /**
     * Mapping of all key field names to the respective static field property CentrosSet.
     */
    CentrosSet._keys = CentrosSet._keyFields.reduce(function (acc, field) {
        acc[field._fieldName] = field;
        return acc;
    }, {});
})(CentrosSet = exports.CentrosSet || (exports.CentrosSet = {}));
exports.CentrosSet = CentrosSet;
//# sourceMappingURL=CentrosSet.js.map