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
var SegmentosSetRequestBuilder_1 = require("./SegmentosSetRequestBuilder");
var core_1 = require("@sap-cloud-sdk/core");
/**
 * This class represents the entity "SegmentosSet" of service "Z_OD_SCP_CORE_0001_SRV".
 */
var SegmentosSet = /** @class */ (function (_super) {
    __extends(SegmentosSet, _super);
    function SegmentosSet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns an entity builder to construct instances `SegmentosSet`.
     * @returns A builder that constructs instances of entity type `SegmentosSet`.
     */
    SegmentosSet.builder = function () {
        return core_1.Entity.entityBuilder(SegmentosSet);
    };
    /**
     * Returns a request builder to construct requests for operations on the `SegmentosSet` entity type.
     * @returns A `SegmentosSet` request builder.
     */
    SegmentosSet.requestBuilder = function () {
        return new SegmentosSetRequestBuilder_1.SegmentosSetRequestBuilder();
    };
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `SegmentosSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `SegmentosSet`.
     */
    SegmentosSet.customField = function (fieldName) {
        return core_1.Entity.customFieldSelector(fieldName, SegmentosSet);
    };
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    SegmentosSet.prototype.toJSON = function () {
        return __assign(__assign({}, this), this._customFields);
    };
    /**
     * Technical entity name for SegmentosSet.
     */
    SegmentosSet._entityName = 'SegmentosSet';
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for SegmentosSet.
     */
    SegmentosSet._serviceName = 'Z_OD_SCP_CORE_0001_SRV';
    /**
     * Default url path for the according service.
     */
    SegmentosSet._defaultServicePath = '/sap/opu/odata/sap/Z_OD_SCP_CORE_0001_SRV';
    return SegmentosSet;
}(core_1.Entity));
exports.SegmentosSet = SegmentosSet;
(function (SegmentosSet) {
    /**
     * Static representation of the [[werks]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    SegmentosSet.WERKS = new core_1.StringField('Werks', SegmentosSet, 'Edm.String');
    /**
     * Static representation of the [[segment]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    SegmentosSet.SEGMENT = new core_1.StringField('Segment', SegmentosSet, 'Edm.String');
    /**
     * Static representation of the [[name]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    SegmentosSet.NAME = new core_1.StringField('Name', SegmentosSet, 'Edm.String');
    /**
     * All fields of the SegmentosSet entity.
     */
    SegmentosSet._allFields = [
        SegmentosSet.WERKS,
        SegmentosSet.SEGMENT,
        SegmentosSet.NAME
    ];
    /**
     * All fields selector.
     */
    SegmentosSet.ALL_FIELDS = new core_1.AllFields('*', SegmentosSet);
    /**
     * All key fields of the SegmentosSet entity.
     */
    SegmentosSet._keyFields = [SegmentosSet.WERKS, SegmentosSet.SEGMENT];
    /**
     * Mapping of all key field names to the respective static field property SegmentosSet.
     */
    SegmentosSet._keys = SegmentosSet._keyFields.reduce(function (acc, field) {
        acc[field._fieldName] = field;
        return acc;
    }, {});
})(SegmentosSet = exports.SegmentosSet || (exports.SegmentosSet = {}));
exports.SegmentosSet = SegmentosSet;
//# sourceMappingURL=SegmentosSet.js.map