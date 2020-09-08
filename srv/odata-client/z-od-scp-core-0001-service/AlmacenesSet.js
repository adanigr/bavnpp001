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
var AlmacenesSetRequestBuilder_1 = require("./AlmacenesSetRequestBuilder");
var core_1 = require("@sap-cloud-sdk/core");
/**
 * This class represents the entity "AlmacenesSet" of service "Z_OD_SCP_CORE_0001_SRV".
 */
var AlmacenesSet = /** @class */ (function (_super) {
    __extends(AlmacenesSet, _super);
    function AlmacenesSet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns an entity builder to construct instances `AlmacenesSet`.
     * @returns A builder that constructs instances of entity type `AlmacenesSet`.
     */
    AlmacenesSet.builder = function () {
        return core_1.Entity.entityBuilder(AlmacenesSet);
    };
    /**
     * Returns a request builder to construct requests for operations on the `AlmacenesSet` entity type.
     * @returns A `AlmacenesSet` request builder.
     */
    AlmacenesSet.requestBuilder = function () {
        return new AlmacenesSetRequestBuilder_1.AlmacenesSetRequestBuilder();
    };
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `AlmacenesSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `AlmacenesSet`.
     */
    AlmacenesSet.customField = function (fieldName) {
        return core_1.Entity.customFieldSelector(fieldName, AlmacenesSet);
    };
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    AlmacenesSet.prototype.toJSON = function () {
        return __assign(__assign({}, this), this._customFields);
    };
    /**
     * Technical entity name for AlmacenesSet.
     */
    AlmacenesSet._entityName = 'AlmacenesSet';
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for AlmacenesSet.
     */
    AlmacenesSet._serviceName = 'Z_OD_SCP_CORE_0001_SRV';
    /**
     * Default url path for the according service.
     */
    AlmacenesSet._defaultServicePath = '/sap/opu/odata/sap/Z_OD_SCP_CORE_0001_SRV';
    return AlmacenesSet;
}(core_1.Entity));
exports.AlmacenesSet = AlmacenesSet;
(function (AlmacenesSet) {
    /**
     * Static representation of the [[werks]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    AlmacenesSet.WERKS = new core_1.StringField('Werks', AlmacenesSet, 'Edm.String');
    /**
     * Static representation of the [[lgort]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    AlmacenesSet.LGORT = new core_1.StringField('Lgort', AlmacenesSet, 'Edm.String');
    /**
     * Static representation of the [[lgobe]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    AlmacenesSet.LGOBE = new core_1.StringField('Lgobe', AlmacenesSet, 'Edm.String');
    /**
     * All fields of the AlmacenesSet entity.
     */
    AlmacenesSet._allFields = [
        AlmacenesSet.WERKS,
        AlmacenesSet.LGORT,
        AlmacenesSet.LGOBE
    ];
    /**
     * All fields selector.
     */
    AlmacenesSet.ALL_FIELDS = new core_1.AllFields('*', AlmacenesSet);
    /**
     * All key fields of the AlmacenesSet entity.
     */
    AlmacenesSet._keyFields = [AlmacenesSet.WERKS, AlmacenesSet.LGORT];
    /**
     * Mapping of all key field names to the respective static field property AlmacenesSet.
     */
    AlmacenesSet._keys = AlmacenesSet._keyFields.reduce(function (acc, field) {
        acc[field._fieldName] = field;
        return acc;
    }, {});
})(AlmacenesSet = exports.AlmacenesSet || (exports.AlmacenesSet = {}));
exports.AlmacenesSet = AlmacenesSet;
//# sourceMappingURL=AlmacenesSet.js.map