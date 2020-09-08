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
var FdHdSetRequestBuilder_1 = require("./FdHdSetRequestBuilder");
var core_1 = require("@sap-cloud-sdk/core");
/**
 * This class represents the entity "FdHDSet" of service "Z_OD_SCP_CORE_0001_SRV".
 */
var FdHdSet = /** @class */ (function (_super) {
    __extends(FdHdSet, _super);
    function FdHdSet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns an entity builder to construct instances `FdHdSet`.
     * @returns A builder that constructs instances of entity type `FdHdSet`.
     */
    FdHdSet.builder = function () {
        return core_1.Entity.entityBuilder(FdHdSet);
    };
    /**
     * Returns a request builder to construct requests for operations on the `FdHdSet` entity type.
     * @returns A `FdHdSet` request builder.
     */
    FdHdSet.requestBuilder = function () {
        return new FdHdSetRequestBuilder_1.FdHdSetRequestBuilder();
    };
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `FdHdSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `FdHdSet`.
     */
    FdHdSet.customField = function (fieldName) {
        return core_1.Entity.customFieldSelector(fieldName, FdHdSet);
    };
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    FdHdSet.prototype.toJSON = function () {
        return __assign(__assign({}, this), this._customFields);
    };
    /**
     * Technical entity name for FdHdSet.
     */
    FdHdSet._entityName = 'FdHDSet';
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for FdHdSet.
     */
    FdHdSet._serviceName = 'Z_OD_SCP_CORE_0001_SRV';
    /**
     * Default url path for the according service.
     */
    FdHdSet._defaultServicePath = '/sap/opu/odata/sap/Z_OD_SCP_CORE_0001_SRV';
    return FdHdSet;
}(core_1.Entity));
exports.FdHdSet = FdHdSet;
var FdItemsSet_1 = require("./FdItemsSet");
(function (FdHdSet) {
    /**
     * Static representation of the [[xblnr]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    FdHdSet.XBLNR = new core_1.StringField('Xblnr', FdHdSet, 'Edm.String');
    /**
     * Static representation of the [[bukrs]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    FdHdSet.BUKRS = new core_1.StringField('Bukrs', FdHdSet, 'Edm.String');
    /**
     * Static representation of the [[belnr]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    FdHdSet.BELNR = new core_1.StringField('Belnr', FdHdSet, 'Edm.String');
    /**
     * Static representation of the [[gjahr]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    FdHdSet.GJAHR = new core_1.StringField('Gjahr', FdHdSet, 'Edm.String');
    /**
     * Static representation of the [[blart]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    FdHdSet.BLART = new core_1.StringField('Blart', FdHdSet, 'Edm.String');
    /**
     * Static representation of the [[bldat]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    FdHdSet.BLDAT = new core_1.StringField('Bldat', FdHdSet, 'Edm.String');
    /**
     * Static representation of the [[budat]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    FdHdSet.BUDAT = new core_1.StringField('Budat', FdHdSet, 'Edm.String');
    /**
     * Static representation of the [[cpudt]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    FdHdSet.CPUDT = new core_1.StringField('Cpudt', FdHdSet, 'Edm.String');
    /**
     * Static representation of the [[waers]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    FdHdSet.WAERS = new core_1.StringField('Waers', FdHdSet, 'Edm.String');
    /**
     * Static representation of the [[kursf]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    FdHdSet.KURSF = new core_1.BigNumberField('Kursf', FdHdSet, 'Edm.Decimal');
    /**
     * Static representation of the [[bktxt]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    FdHdSet.BKTXT = new core_1.StringField('Bktxt', FdHdSet, 'Edm.String');
    /**
     * Static representation of the [[wrbtrS]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    FdHdSet.WRBTR_S = new core_1.BigNumberField('WrbtrS', FdHdSet, 'Edm.Decimal');
    /**
     * Static representation of the [[dmbtrS]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    FdHdSet.DMBTR_S = new core_1.BigNumberField('DmbtrS', FdHdSet, 'Edm.Decimal');
    /**
     * Static representation of the one-to-many navigation property [[fdItemsSet]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    FdHdSet.FD_ITEMS_SET = new core_1.Link('FdItemsSet', FdHdSet, FdItemsSet_1.FdItemsSet);
    /**
     * All fields of the FdHdSet entity.
     */
    FdHdSet._allFields = [
        FdHdSet.XBLNR,
        FdHdSet.BUKRS,
        FdHdSet.BELNR,
        FdHdSet.GJAHR,
        FdHdSet.BLART,
        FdHdSet.BLDAT,
        FdHdSet.BUDAT,
        FdHdSet.CPUDT,
        FdHdSet.WAERS,
        FdHdSet.KURSF,
        FdHdSet.BKTXT,
        FdHdSet.WRBTR_S,
        FdHdSet.DMBTR_S,
        FdHdSet.FD_ITEMS_SET
    ];
    /**
     * All fields selector.
     */
    FdHdSet.ALL_FIELDS = new core_1.AllFields('*', FdHdSet);
    /**
     * All key fields of the FdHdSet entity.
     */
    FdHdSet._keyFields = [FdHdSet.BUKRS, FdHdSet.BELNR];
    /**
     * Mapping of all key field names to the respective static field property FdHdSet.
     */
    FdHdSet._keys = FdHdSet._keyFields.reduce(function (acc, field) {
        acc[field._fieldName] = field;
        return acc;
    }, {});
})(FdHdSet = exports.FdHdSet || (exports.FdHdSet = {}));
exports.FdHdSet = FdHdSet;
//# sourceMappingURL=FdHdSet.js.map