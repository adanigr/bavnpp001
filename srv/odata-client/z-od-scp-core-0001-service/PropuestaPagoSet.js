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
var PropuestaPagoSetRequestBuilder_1 = require("./PropuestaPagoSetRequestBuilder");
var core_1 = require("@sap-cloud-sdk/core");
/**
 * This class represents the entity "PropuestaPagoSet" of service "Z_OD_SCP_CORE_0001_SRV".
 */
var PropuestaPagoSet = /** @class */ (function (_super) {
    __extends(PropuestaPagoSet, _super);
    function PropuestaPagoSet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns an entity builder to construct instances `PropuestaPagoSet`.
     * @returns A builder that constructs instances of entity type `PropuestaPagoSet`.
     */
    PropuestaPagoSet.builder = function () {
        return core_1.Entity.entityBuilder(PropuestaPagoSet);
    };
    /**
     * Returns a request builder to construct requests for operations on the `PropuestaPagoSet` entity type.
     * @returns A `PropuestaPagoSet` request builder.
     */
    PropuestaPagoSet.requestBuilder = function () {
        return new PropuestaPagoSetRequestBuilder_1.PropuestaPagoSetRequestBuilder();
    };
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `PropuestaPagoSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `PropuestaPagoSet`.
     */
    PropuestaPagoSet.customField = function (fieldName) {
        return core_1.Entity.customFieldSelector(fieldName, PropuestaPagoSet);
    };
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    PropuestaPagoSet.prototype.toJSON = function () {
        return __assign(__assign({}, this), this._customFields);
    };
    /**
     * Technical entity name for PropuestaPagoSet.
     */
    PropuestaPagoSet._entityName = 'PropuestaPagoSet';
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for PropuestaPagoSet.
     */
    PropuestaPagoSet._serviceName = 'Z_OD_SCP_CORE_0001_SRV';
    /**
     * Default url path for the according service.
     */
    PropuestaPagoSet._defaultServicePath = '/sap/opu/odata/sap/Z_OD_SCP_CORE_0001_SRV';
    return PropuestaPagoSet;
}(core_1.Entity));
exports.PropuestaPagoSet = PropuestaPagoSet;
(function (PropuestaPagoSet) {
    /**
     * Static representation of the [[zbukr]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PropuestaPagoSet.ZBUKR = new core_1.StringField('Zbukr', PropuestaPagoSet, 'Edm.String');
    /**
     * Static representation of the [[hbkid]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PropuestaPagoSet.HBKID = new core_1.StringField('Hbkid', PropuestaPagoSet, 'Edm.String');
    /**
     * Static representation of the [[hktid]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PropuestaPagoSet.HKTID = new core_1.StringField('Hktid', PropuestaPagoSet, 'Edm.String');
    /**
     * Static representation of the [[zlsch]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PropuestaPagoSet.ZLSCH = new core_1.StringField('Zlsch', PropuestaPagoSet, 'Edm.String');
    /**
     * Static representation of the [[waers]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PropuestaPagoSet.WAERS = new core_1.StringField('Waers', PropuestaPagoSet, 'Edm.String');
    /**
     * Static representation of the [[ukont]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PropuestaPagoSet.UKONT = new core_1.StringField('Ukont', PropuestaPagoSet, 'Edm.String');
    /**
     * Static representation of the [[gsber]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PropuestaPagoSet.GSBER = new core_1.StringField('Gsber', PropuestaPagoSet, 'Edm.String');
    /**
     * Static representation of the [[text1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PropuestaPagoSet.TEXT_1 = new core_1.StringField('Text1', PropuestaPagoSet, 'Edm.String');
    /**
     * Static representation of the [[spras]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    PropuestaPagoSet.SPRAS = new core_1.StringField('Spras', PropuestaPagoSet, 'Edm.String');
    /**
     * All fields of the PropuestaPagoSet entity.
     */
    PropuestaPagoSet._allFields = [
        PropuestaPagoSet.ZBUKR,
        PropuestaPagoSet.HBKID,
        PropuestaPagoSet.HKTID,
        PropuestaPagoSet.ZLSCH,
        PropuestaPagoSet.WAERS,
        PropuestaPagoSet.UKONT,
        PropuestaPagoSet.GSBER,
        PropuestaPagoSet.TEXT_1,
        PropuestaPagoSet.SPRAS
    ];
    /**
     * All fields selector.
     */
    PropuestaPagoSet.ALL_FIELDS = new core_1.AllFields('*', PropuestaPagoSet);
    /**
     * All key fields of the PropuestaPagoSet entity.
     */
    PropuestaPagoSet._keyFields = [PropuestaPagoSet.HBKID, PropuestaPagoSet.ZLSCH, PropuestaPagoSet.WAERS, PropuestaPagoSet.GSBER, PropuestaPagoSet.SPRAS];
    /**
     * Mapping of all key field names to the respective static field property PropuestaPagoSet.
     */
    PropuestaPagoSet._keys = PropuestaPagoSet._keyFields.reduce(function (acc, field) {
        acc[field._fieldName] = field;
        return acc;
    }, {});
})(PropuestaPagoSet = exports.PropuestaPagoSet || (exports.PropuestaPagoSet = {}));
exports.PropuestaPagoSet = PropuestaPagoSet;
//# sourceMappingURL=PropuestaPagoSet.js.map