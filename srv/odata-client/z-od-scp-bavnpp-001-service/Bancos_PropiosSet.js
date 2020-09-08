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
exports.Bancos_PropiosSet = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var Bancos_PropiosSetRequestBuilder_1 = require("./Bancos_PropiosSetRequestBuilder");
var core_1 = require("@sap-cloud-sdk/core");
/**
 * This class represents the entity "Bancos_PropiosSet" of service "Z_OD_SCP_BAVNPP001_SRV".
 */
var Bancos_PropiosSet = /** @class */ (function (_super) {
    __extends(Bancos_PropiosSet, _super);
    function Bancos_PropiosSet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns an entity builder to construct instances `Bancos_PropiosSet`.
     * @returns A builder that constructs instances of entity type `Bancos_PropiosSet`.
     */
    Bancos_PropiosSet.builder = function () {
        return core_1.Entity.entityBuilder(Bancos_PropiosSet);
    };
    /**
     * Returns a request builder to construct requests for operations on the `Bancos_PropiosSet` entity type.
     * @returns A `Bancos_PropiosSet` request builder.
     */
    Bancos_PropiosSet.requestBuilder = function () {
        return new Bancos_PropiosSetRequestBuilder_1.Bancos_PropiosSetRequestBuilder();
    };
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `Bancos_PropiosSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `Bancos_PropiosSet`.
     */
    Bancos_PropiosSet.customField = function (fieldName) {
        return core_1.Entity.customFieldSelector(fieldName, Bancos_PropiosSet);
    };
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    Bancos_PropiosSet.prototype.toJSON = function () {
        return __assign(__assign({}, this), this._customFields);
    };
    /**
     * Technical entity name for Bancos_PropiosSet.
     */
    Bancos_PropiosSet._entityName = 'Bancos_PropiosSet';
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for Bancos_PropiosSet.
     */
    Bancos_PropiosSet._serviceName = 'Z_OD_SCP_BAVNPP001_SRV';
    /**
     * Default url path for the according service.
     */
    Bancos_PropiosSet._defaultServicePath = '/sap/opu/odata/sap/Z_OD_SCP_BAVNPP001_SRV';
    return Bancos_PropiosSet;
}(core_1.Entity));
exports.Bancos_PropiosSet = Bancos_PropiosSet;
(function (Bancos_PropiosSet) {
    /**
     * Static representation of the [[bukrs]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    Bancos_PropiosSet.BUKRS = new core_1.StringField('Bukrs', Bancos_PropiosSet, 'Edm.String');
    /**
     * Static representation of the [[hbkid]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    Bancos_PropiosSet.HBKID = new core_1.StringField('Hbkid', Bancos_PropiosSet, 'Edm.String');
    /**
     * Static representation of the [[hktid]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    Bancos_PropiosSet.HKTID = new core_1.StringField('Hktid', Bancos_PropiosSet, 'Edm.String');
    /**
     * Static representation of the [[waers]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    Bancos_PropiosSet.WAERS = new core_1.StringField('Waers', Bancos_PropiosSet, 'Edm.String');
    /**
     * Static representation of the [[gsber]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    Bancos_PropiosSet.GSBER = new core_1.StringField('Gsber', Bancos_PropiosSet, 'Edm.String');
    /**
     * Static representation of the [[zlsch]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    Bancos_PropiosSet.ZLSCH = new core_1.StringField('Zlsch', Bancos_PropiosSet, 'Edm.String');
    /**
     * Static representation of the [[bankl]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    Bancos_PropiosSet.BANKL = new core_1.StringField('Bankl', Bancos_PropiosSet, 'Edm.String');
    /**
     * Static representation of the [[bankn]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    Bancos_PropiosSet.BANKN = new core_1.StringField('Bankn', Bancos_PropiosSet, 'Edm.String');
    /**
     * Static representation of the [[bkont]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    Bancos_PropiosSet.BKONT = new core_1.StringField('Bkont', Bancos_PropiosSet, 'Edm.String');
    /**
     * Static representation of the [[hkont]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    Bancos_PropiosSet.HKONT = new core_1.StringField('Hkont', Bancos_PropiosSet, 'Edm.String');
    /**
     * Static representation of the [[bnkn2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    Bancos_PropiosSet.BNKN_2 = new core_1.StringField('Bnkn2', Bancos_PropiosSet, 'Edm.String');
    /**
     * Static representation of the [[dtaai]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    Bancos_PropiosSet.DTAAI = new core_1.StringField('Dtaai', Bancos_PropiosSet, 'Edm.String');
    /**
     * Static representation of the [[refzl]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    Bancos_PropiosSet.REFZL = new core_1.StringField('Refzl', Bancos_PropiosSet, 'Edm.String');
    /**
     * Static representation of the [[ukont]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    Bancos_PropiosSet.UKONT = new core_1.StringField('Ukont', Bancos_PropiosSet, 'Edm.String');
    /**
     * All fields of the Bancos_PropiosSet entity.
     */
    Bancos_PropiosSet._allFields = [
        Bancos_PropiosSet.BUKRS,
        Bancos_PropiosSet.HBKID,
        Bancos_PropiosSet.HKTID,
        Bancos_PropiosSet.WAERS,
        Bancos_PropiosSet.GSBER,
        Bancos_PropiosSet.ZLSCH,
        Bancos_PropiosSet.BANKL,
        Bancos_PropiosSet.BANKN,
        Bancos_PropiosSet.BKONT,
        Bancos_PropiosSet.HKONT,
        Bancos_PropiosSet.BNKN_2,
        Bancos_PropiosSet.DTAAI,
        Bancos_PropiosSet.REFZL,
        Bancos_PropiosSet.UKONT
    ];
    /**
     * All fields selector.
     */
    Bancos_PropiosSet.ALL_FIELDS = new core_1.AllFields('*', Bancos_PropiosSet);
    /**
     * All key fields of the Bancos_PropiosSet entity.
     */
    Bancos_PropiosSet._keyFields = [Bancos_PropiosSet.BUKRS, Bancos_PropiosSet.HBKID, Bancos_PropiosSet.HKTID, Bancos_PropiosSet.WAERS, Bancos_PropiosSet.GSBER, Bancos_PropiosSet.ZLSCH, Bancos_PropiosSet.BANKL];
    /**
     * Mapping of all key field names to the respective static field property Bancos_PropiosSet.
     */
    Bancos_PropiosSet._keys = Bancos_PropiosSet._keyFields.reduce(function (acc, field) {
        acc[field._fieldName] = field;
        return acc;
    }, {});
})(Bancos_PropiosSet = exports.Bancos_PropiosSet || (exports.Bancos_PropiosSet = {}));
exports.Bancos_PropiosSet = Bancos_PropiosSet;
//# sourceMappingURL=Bancos_PropiosSet.js.map