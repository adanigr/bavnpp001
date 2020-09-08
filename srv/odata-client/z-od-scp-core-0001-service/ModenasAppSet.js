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
var ModenasAppSetRequestBuilder_1 = require("./ModenasAppSetRequestBuilder");
var core_1 = require("@sap-cloud-sdk/core");
/**
 * This class represents the entity "ModenasAppSet" of service "Z_OD_SCP_CORE_0001_SRV".
 */
var ModenasAppSet = /** @class */ (function (_super) {
    __extends(ModenasAppSet, _super);
    function ModenasAppSet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns an entity builder to construct instances `ModenasAppSet`.
     * @returns A builder that constructs instances of entity type `ModenasAppSet`.
     */
    ModenasAppSet.builder = function () {
        return core_1.Entity.entityBuilder(ModenasAppSet);
    };
    /**
     * Returns a request builder to construct requests for operations on the `ModenasAppSet` entity type.
     * @returns A `ModenasAppSet` request builder.
     */
    ModenasAppSet.requestBuilder = function () {
        return new ModenasAppSetRequestBuilder_1.ModenasAppSetRequestBuilder();
    };
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `ModenasAppSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `ModenasAppSet`.
     */
    ModenasAppSet.customField = function (fieldName) {
        return core_1.Entity.customFieldSelector(fieldName, ModenasAppSet);
    };
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    ModenasAppSet.prototype.toJSON = function () {
        return __assign(__assign({}, this), this._customFields);
    };
    /**
     * Technical entity name for ModenasAppSet.
     */
    ModenasAppSet._entityName = 'ModenasAppSet';
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for ModenasAppSet.
     */
    ModenasAppSet._serviceName = 'Z_OD_SCP_CORE_0001_SRV';
    /**
     * Default url path for the according service.
     */
    ModenasAppSet._defaultServicePath = '/sap/opu/odata/sap/Z_OD_SCP_CORE_0001_SRV';
    return ModenasAppSet;
}(core_1.Entity));
exports.ModenasAppSet = ModenasAppSet;
(function (ModenasAppSet) {
    /**
     * Static representation of the [[bukrs]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    ModenasAppSet.BUKRS = new core_1.StringField('Bukrs', ModenasAppSet, 'Edm.String');
    /**
     * Static representation of the [[waers]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    ModenasAppSet.WAERS = new core_1.StringField('Waers', ModenasAppSet, 'Edm.String');
    /**
     * Static representation of the [[ktext]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    ModenasAppSet.KTEXT = new core_1.StringField('Ktext', ModenasAppSet, 'Edm.String');
    /**
     * All fields of the ModenasAppSet entity.
     */
    ModenasAppSet._allFields = [
        ModenasAppSet.BUKRS,
        ModenasAppSet.WAERS,
        ModenasAppSet.KTEXT
    ];
    /**
     * All fields selector.
     */
    ModenasAppSet.ALL_FIELDS = new core_1.AllFields('*', ModenasAppSet);
    /**
     * All key fields of the ModenasAppSet entity.
     */
    ModenasAppSet._keyFields = [ModenasAppSet.BUKRS];
    /**
     * Mapping of all key field names to the respective static field property ModenasAppSet.
     */
    ModenasAppSet._keys = ModenasAppSet._keyFields.reduce(function (acc, field) {
        acc[field._fieldName] = field;
        return acc;
    }, {});
})(ModenasAppSet = exports.ModenasAppSet || (exports.ModenasAppSet = {}));
exports.ModenasAppSet = ModenasAppSet;
//# sourceMappingURL=ModenasAppSet.js.map