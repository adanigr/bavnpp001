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
var PaiseSetRequestBuilder_1 = require("./PaiseSetRequestBuilder");
var core_1 = require("@sap-cloud-sdk/core");
/**
 * This class represents the entity "PaiseSet" of service "Z_OD_SCP_CORE_0001_SRV".
 */
var PaiseSet = /** @class */ (function (_super) {
    __extends(PaiseSet, _super);
    function PaiseSet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns an entity builder to construct instances `PaiseSet`.
     * @returns A builder that constructs instances of entity type `PaiseSet`.
     */
    PaiseSet.builder = function () {
        return core_1.Entity.entityBuilder(PaiseSet);
    };
    /**
     * Returns a request builder to construct requests for operations on the `PaiseSet` entity type.
     * @returns A `PaiseSet` request builder.
     */
    PaiseSet.requestBuilder = function () {
        return new PaiseSetRequestBuilder_1.PaiseSetRequestBuilder();
    };
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `PaiseSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `PaiseSet`.
     */
    PaiseSet.customField = function (fieldName) {
        return core_1.Entity.customFieldSelector(fieldName, PaiseSet);
    };
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    PaiseSet.prototype.toJSON = function () {
        return __assign(__assign({}, this), this._customFields);
    };
    /**
     * Technical entity name for PaiseSet.
     */
    PaiseSet._entityName = 'PaiseSet';
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for PaiseSet.
     */
    PaiseSet._serviceName = 'Z_OD_SCP_CORE_0001_SRV';
    /**
     * Default url path for the according service.
     */
    PaiseSet._defaultServicePath = '/sap/opu/odata/sap/Z_OD_SCP_CORE_0001_SRV';
    return PaiseSet;
}(core_1.Entity));
exports.PaiseSet = PaiseSet;
(function (PaiseSet) {
    /**
     * Static representation of the [[spras]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PaiseSet.SPRAS = new core_1.StringField('Spras', PaiseSet, 'Edm.String');
    /**
     * Static representation of the [[land1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PaiseSet.LAND_1 = new core_1.StringField('Land1', PaiseSet, 'Edm.String');
    /**
     * Static representation of the [[landx]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PaiseSet.LANDX = new core_1.StringField('Landx', PaiseSet, 'Edm.String');
    /**
     * Static representation of the [[natio]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PaiseSet.NATIO = new core_1.StringField('Natio', PaiseSet, 'Edm.String');
    /**
     * Static representation of the [[landx50]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PaiseSet.LANDX_50 = new core_1.StringField('Landx50', PaiseSet, 'Edm.String');
    /**
     * Static representation of the [[natio50]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PaiseSet.NATIO_50 = new core_1.StringField('Natio50', PaiseSet, 'Edm.String');
    /**
     * All fields of the PaiseSet entity.
     */
    PaiseSet._allFields = [
        PaiseSet.SPRAS,
        PaiseSet.LAND_1,
        PaiseSet.LANDX,
        PaiseSet.NATIO,
        PaiseSet.LANDX_50,
        PaiseSet.NATIO_50
    ];
    /**
     * All fields selector.
     */
    PaiseSet.ALL_FIELDS = new core_1.AllFields('*', PaiseSet);
    /**
     * All key fields of the PaiseSet entity.
     */
    PaiseSet._keyFields = [PaiseSet.SPRAS, PaiseSet.LAND_1];
    /**
     * Mapping of all key field names to the respective static field property PaiseSet.
     */
    PaiseSet._keys = PaiseSet._keyFields.reduce(function (acc, field) {
        acc[field._fieldName] = field;
        return acc;
    }, {});
})(PaiseSet = exports.PaiseSet || (exports.PaiseSet = {}));
exports.PaiseSet = PaiseSet;
//# sourceMappingURL=PaiseSet.js.map