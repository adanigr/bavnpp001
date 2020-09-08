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
var FdItemsSetRequestBuilder_1 = require("./FdItemsSetRequestBuilder");
var core_1 = require("@sap-cloud-sdk/core");
/**
 * This class represents the entity "FdItemsSet" of service "Z_OD_SCP_CORE_0001_SRV".
 */
var FdItemsSet = /** @class */ (function (_super) {
    __extends(FdItemsSet, _super);
    function FdItemsSet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns an entity builder to construct instances `FdItemsSet`.
     * @returns A builder that constructs instances of entity type `FdItemsSet`.
     */
    FdItemsSet.builder = function () {
        return core_1.Entity.entityBuilder(FdItemsSet);
    };
    /**
     * Returns a request builder to construct requests for operations on the `FdItemsSet` entity type.
     * @returns A `FdItemsSet` request builder.
     */
    FdItemsSet.requestBuilder = function () {
        return new FdItemsSetRequestBuilder_1.FdItemsSetRequestBuilder();
    };
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `FdItemsSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `FdItemsSet`.
     */
    FdItemsSet.customField = function (fieldName) {
        return core_1.Entity.customFieldSelector(fieldName, FdItemsSet);
    };
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    FdItemsSet.prototype.toJSON = function () {
        return __assign(__assign({}, this), this._customFields);
    };
    /**
     * Technical entity name for FdItemsSet.
     */
    FdItemsSet._entityName = 'FdItemsSet';
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for FdItemsSet.
     */
    FdItemsSet._serviceName = 'Z_OD_SCP_CORE_0001_SRV';
    /**
     * Default url path for the according service.
     */
    FdItemsSet._defaultServicePath = '/sap/opu/odata/sap/Z_OD_SCP_CORE_0001_SRV';
    return FdItemsSet;
}(core_1.Entity));
exports.FdItemsSet = FdItemsSet;
(function (FdItemsSet) {
    /**
     * Static representation of the [[bukrs]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    FdItemsSet.BUKRS = new core_1.StringField('Bukrs', FdItemsSet, 'Edm.String');
    /**
     * Static representation of the [[belnr]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    FdItemsSet.BELNR = new core_1.StringField('Belnr', FdItemsSet, 'Edm.String');
    /**
     * Static representation of the [[buzei]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    FdItemsSet.BUZEI = new core_1.StringField('Buzei', FdItemsSet, 'Edm.String');
    /**
     * Static representation of the [[bschl]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    FdItemsSet.BSCHL = new core_1.StringField('Bschl', FdItemsSet, 'Edm.String');
    /**
     * Static representation of the [[account]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    FdItemsSet.ACCOUNT = new core_1.StringField('Account', FdItemsSet, 'Edm.String');
    /**
     * Static representation of the [[description]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    FdItemsSet.DESCRIPTION = new core_1.StringField('Description', FdItemsSet, 'Edm.String');
    /**
     * Static representation of the [[wrbtr]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    FdItemsSet.WRBTR = new core_1.BigNumberField('Wrbtr', FdItemsSet, 'Edm.Decimal');
    /**
     * Static representation of the [[dmbtr]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    FdItemsSet.DMBTR = new core_1.BigNumberField('Dmbtr', FdItemsSet, 'Edm.Decimal');
    /**
     * Static representation of the [[gsber]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    FdItemsSet.GSBER = new core_1.StringField('Gsber', FdItemsSet, 'Edm.String');
    /**
     * Static representation of the [[segment]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    FdItemsSet.SEGMENT = new core_1.StringField('Segment', FdItemsSet, 'Edm.String');
    /**
     * Static representation of the [[prctr]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    FdItemsSet.PRCTR = new core_1.StringField('Prctr', FdItemsSet, 'Edm.String');
    /**
     * Static representation of the [[zuonr]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    FdItemsSet.ZUONR = new core_1.StringField('Zuonr', FdItemsSet, 'Edm.String');
    /**
     * Static representation of the [[gjahr]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    FdItemsSet.GJAHR = new core_1.StringField('Gjahr', FdItemsSet, 'Edm.String');
    /**
     * Static representation of the [[waers]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    FdItemsSet.WAERS = new core_1.StringField('Waers', FdItemsSet, 'Edm.String');
    /**
     * Static representation of the [[bktxt]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    FdItemsSet.BKTXT = new core_1.StringField('Bktxt', FdItemsSet, 'Edm.String');
    /**
     * Static representation of the [[sgtxt]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    FdItemsSet.SGTXT = new core_1.StringField('Sgtxt', FdItemsSet, 'Edm.String');
    /**
     * All fields of the FdItemsSet entity.
     */
    FdItemsSet._allFields = [
        FdItemsSet.BUKRS,
        FdItemsSet.BELNR,
        FdItemsSet.BUZEI,
        FdItemsSet.BSCHL,
        FdItemsSet.ACCOUNT,
        FdItemsSet.DESCRIPTION,
        FdItemsSet.WRBTR,
        FdItemsSet.DMBTR,
        FdItemsSet.GSBER,
        FdItemsSet.SEGMENT,
        FdItemsSet.PRCTR,
        FdItemsSet.ZUONR,
        FdItemsSet.GJAHR,
        FdItemsSet.WAERS,
        FdItemsSet.BKTXT,
        FdItemsSet.SGTXT
    ];
    /**
     * All fields selector.
     */
    FdItemsSet.ALL_FIELDS = new core_1.AllFields('*', FdItemsSet);
    /**
     * All key fields of the FdItemsSet entity.
     */
    FdItemsSet._keyFields = [FdItemsSet.BUKRS, FdItemsSet.BELNR, FdItemsSet.BUZEI, FdItemsSet.GJAHR];
    /**
     * Mapping of all key field names to the respective static field property FdItemsSet.
     */
    FdItemsSet._keys = FdItemsSet._keyFields.reduce(function (acc, field) {
        acc[field._fieldName] = field;
        return acc;
    }, {});
})(FdItemsSet = exports.FdItemsSet || (exports.FdItemsSet = {}));
exports.FdItemsSet = FdItemsSet;
//# sourceMappingURL=FdItemsSet.js.map