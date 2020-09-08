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
var TipoCambioSetRequestBuilder_1 = require("./TipoCambioSetRequestBuilder");
var core_1 = require("@sap-cloud-sdk/core");
/**
 * This class represents the entity "TipoCambioSet" of service "Z_OD_SCP_CORE_0001_SRV".
 */
var TipoCambioSet = /** @class */ (function (_super) {
    __extends(TipoCambioSet, _super);
    function TipoCambioSet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns an entity builder to construct instances `TipoCambioSet`.
     * @returns A builder that constructs instances of entity type `TipoCambioSet`.
     */
    TipoCambioSet.builder = function () {
        return core_1.Entity.entityBuilder(TipoCambioSet);
    };
    /**
     * Returns a request builder to construct requests for operations on the `TipoCambioSet` entity type.
     * @returns A `TipoCambioSet` request builder.
     */
    TipoCambioSet.requestBuilder = function () {
        return new TipoCambioSetRequestBuilder_1.TipoCambioSetRequestBuilder();
    };
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `TipoCambioSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `TipoCambioSet`.
     */
    TipoCambioSet.customField = function (fieldName) {
        return core_1.Entity.customFieldSelector(fieldName, TipoCambioSet);
    };
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    TipoCambioSet.prototype.toJSON = function () {
        return __assign(__assign({}, this), this._customFields);
    };
    /**
     * Technical entity name for TipoCambioSet.
     */
    TipoCambioSet._entityName = 'TipoCambioSet';
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for TipoCambioSet.
     */
    TipoCambioSet._serviceName = 'Z_OD_SCP_CORE_0001_SRV';
    /**
     * Default url path for the according service.
     */
    TipoCambioSet._defaultServicePath = '/sap/opu/odata/sap/Z_OD_SCP_CORE_0001_SRV';
    return TipoCambioSet;
}(core_1.Entity));
exports.TipoCambioSet = TipoCambioSet;
(function (TipoCambioSet) {
    /**
     * Static representation of the [[kurst]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TipoCambioSet.KURST = new core_1.StringField('Kurst', TipoCambioSet, 'Edm.String');
    /**
     * Static representation of the [[fcurr]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TipoCambioSet.FCURR = new core_1.StringField('Fcurr', TipoCambioSet, 'Edm.String');
    /**
     * Static representation of the [[tcurr]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TipoCambioSet.TCURR = new core_1.StringField('Tcurr', TipoCambioSet, 'Edm.String');
    /**
     * Static representation of the [[gdatu]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TipoCambioSet.GDATU = new core_1.StringField('Gdatu', TipoCambioSet, 'Edm.String');
    /**
     * Static representation of the [[ukurs]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TipoCambioSet.UKURS = new core_1.BigNumberField('Ukurs', TipoCambioSet, 'Edm.Decimal');
    /**
     * All fields of the TipoCambioSet entity.
     */
    TipoCambioSet._allFields = [
        TipoCambioSet.KURST,
        TipoCambioSet.FCURR,
        TipoCambioSet.TCURR,
        TipoCambioSet.GDATU,
        TipoCambioSet.UKURS
    ];
    /**
     * All fields selector.
     */
    TipoCambioSet.ALL_FIELDS = new core_1.AllFields('*', TipoCambioSet);
    /**
     * All key fields of the TipoCambioSet entity.
     */
    TipoCambioSet._keyFields = [TipoCambioSet.KURST, TipoCambioSet.FCURR, TipoCambioSet.TCURR, TipoCambioSet.GDATU];
    /**
     * Mapping of all key field names to the respective static field property TipoCambioSet.
     */
    TipoCambioSet._keys = TipoCambioSet._keyFields.reduce(function (acc, field) {
        acc[field._fieldName] = field;
        return acc;
    }, {});
})(TipoCambioSet = exports.TipoCambioSet || (exports.TipoCambioSet = {}));
exports.TipoCambioSet = TipoCambioSet;
//# sourceMappingURL=TipoCambioSet.js.map