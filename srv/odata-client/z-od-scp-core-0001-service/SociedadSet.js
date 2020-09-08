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
var SociedadSetRequestBuilder_1 = require("./SociedadSetRequestBuilder");
var core_1 = require("@sap-cloud-sdk/core");
/**
 * This class represents the entity "SociedadSet" of service "Z_OD_SCP_CORE_0001_SRV".
 */
var SociedadSet = /** @class */ (function (_super) {
    __extends(SociedadSet, _super);
    function SociedadSet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns an entity builder to construct instances `SociedadSet`.
     * @returns A builder that constructs instances of entity type `SociedadSet`.
     */
    SociedadSet.builder = function () {
        return core_1.Entity.entityBuilder(SociedadSet);
    };
    /**
     * Returns a request builder to construct requests for operations on the `SociedadSet` entity type.
     * @returns A `SociedadSet` request builder.
     */
    SociedadSet.requestBuilder = function () {
        return new SociedadSetRequestBuilder_1.SociedadSetRequestBuilder();
    };
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `SociedadSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `SociedadSet`.
     */
    SociedadSet.customField = function (fieldName) {
        return core_1.Entity.customFieldSelector(fieldName, SociedadSet);
    };
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    SociedadSet.prototype.toJSON = function () {
        return __assign(__assign({}, this), this._customFields);
    };
    /**
     * Technical entity name for SociedadSet.
     */
    SociedadSet._entityName = 'SociedadSet';
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for SociedadSet.
     */
    SociedadSet._serviceName = 'Z_OD_SCP_CORE_0001_SRV';
    /**
     * Default url path for the according service.
     */
    SociedadSet._defaultServicePath = '/sap/opu/odata/sap/Z_OD_SCP_CORE_0001_SRV';
    return SociedadSet;
}(core_1.Entity));
exports.SociedadSet = SociedadSet;
(function (SociedadSet) {
    /**
     * Static representation of the [[bukrs]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    SociedadSet.BUKRS = new core_1.StringField('Bukrs', SociedadSet, 'Edm.String');
    /**
     * Static representation of the [[butxt]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    SociedadSet.BUTXT = new core_1.StringField('Butxt', SociedadSet, 'Edm.String');
    /**
     * Static representation of the [[sort2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    SociedadSet.SORT_2 = new core_1.StringField('Sort2', SociedadSet, 'Edm.String');
    /**
     * All fields of the SociedadSet entity.
     */
    SociedadSet._allFields = [
        SociedadSet.BUKRS,
        SociedadSet.BUTXT,
        SociedadSet.SORT_2
    ];
    /**
     * All fields selector.
     */
    SociedadSet.ALL_FIELDS = new core_1.AllFields('*', SociedadSet);
    /**
     * All key fields of the SociedadSet entity.
     */
    SociedadSet._keyFields = [SociedadSet.BUKRS];
    /**
     * Mapping of all key field names to the respective static field property SociedadSet.
     */
    SociedadSet._keys = SociedadSet._keyFields.reduce(function (acc, field) {
        acc[field._fieldName] = field;
        return acc;
    }, {});
})(SociedadSet = exports.SociedadSet || (exports.SociedadSet = {}));
exports.SociedadSet = SociedadSet;
//# sourceMappingURL=SociedadSet.js.map