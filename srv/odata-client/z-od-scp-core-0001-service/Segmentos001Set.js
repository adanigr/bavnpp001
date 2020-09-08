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
var Segmentos001SetRequestBuilder_1 = require("./Segmentos001SetRequestBuilder");
var core_1 = require("@sap-cloud-sdk/core");
/**
 * This class represents the entity "Segmentos001Set" of service "Z_OD_SCP_CORE_0001_SRV".
 */
var Segmentos001Set = /** @class */ (function (_super) {
    __extends(Segmentos001Set, _super);
    function Segmentos001Set() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns an entity builder to construct instances `Segmentos001Set`.
     * @returns A builder that constructs instances of entity type `Segmentos001Set`.
     */
    Segmentos001Set.builder = function () {
        return core_1.Entity.entityBuilder(Segmentos001Set);
    };
    /**
     * Returns a request builder to construct requests for operations on the `Segmentos001Set` entity type.
     * @returns A `Segmentos001Set` request builder.
     */
    Segmentos001Set.requestBuilder = function () {
        return new Segmentos001SetRequestBuilder_1.Segmentos001SetRequestBuilder();
    };
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `Segmentos001Set`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `Segmentos001Set`.
     */
    Segmentos001Set.customField = function (fieldName) {
        return core_1.Entity.customFieldSelector(fieldName, Segmentos001Set);
    };
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    Segmentos001Set.prototype.toJSON = function () {
        return __assign(__assign({}, this), this._customFields);
    };
    /**
     * Technical entity name for Segmentos001Set.
     */
    Segmentos001Set._entityName = 'Segmentos001Set';
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for Segmentos001Set.
     */
    Segmentos001Set._serviceName = 'Z_OD_SCP_CORE_0001_SRV';
    /**
     * Default url path for the according service.
     */
    Segmentos001Set._defaultServicePath = '/sap/opu/odata/sap/Z_OD_SCP_CORE_0001_SRV';
    return Segmentos001Set;
}(core_1.Entity));
exports.Segmentos001Set = Segmentos001Set;
(function (Segmentos001Set) {
    /**
     * Static representation of the [[werks]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    Segmentos001Set.WERKS = new core_1.StringField('Werks', Segmentos001Set, 'Edm.String');
    /**
     * Static representation of the [[matnr]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    Segmentos001Set.MATNR = new core_1.StringField('Matnr', Segmentos001Set, 'Edm.String');
    /**
     * Static representation of the [[segment]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    Segmentos001Set.SEGMENT = new core_1.StringField('Segment', Segmentos001Set, 'Edm.String');
    /**
     * Static representation of the [[name]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    Segmentos001Set.NAME = new core_1.StringField('Name', Segmentos001Set, 'Edm.String');
    /**
     * All fields of the Segmentos001Set entity.
     */
    Segmentos001Set._allFields = [
        Segmentos001Set.WERKS,
        Segmentos001Set.MATNR,
        Segmentos001Set.SEGMENT,
        Segmentos001Set.NAME
    ];
    /**
     * All fields selector.
     */
    Segmentos001Set.ALL_FIELDS = new core_1.AllFields('*', Segmentos001Set);
    /**
     * All key fields of the Segmentos001Set entity.
     */
    Segmentos001Set._keyFields = [Segmentos001Set.WERKS, Segmentos001Set.MATNR, Segmentos001Set.SEGMENT];
    /**
     * Mapping of all key field names to the respective static field property Segmentos001Set.
     */
    Segmentos001Set._keys = Segmentos001Set._keyFields.reduce(function (acc, field) {
        acc[field._fieldName] = field;
        return acc;
    }, {});
})(Segmentos001Set = exports.Segmentos001Set || (exports.Segmentos001Set = {}));
exports.Segmentos001Set = Segmentos001Set;
//# sourceMappingURL=Segmentos001Set.js.map