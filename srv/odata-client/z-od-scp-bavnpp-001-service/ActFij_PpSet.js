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
exports.ActFij_PpSet = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var ActFij_PpSetRequestBuilder_1 = require("./ActFij_PpSetRequestBuilder");
var core_1 = require("@sap-cloud-sdk/core");
/**
 * This class represents the entity "ActFij_PPSet" of service "Z_OD_SCP_BAVNPP001_SRV".
 */
var ActFij_PpSet = /** @class */ (function (_super) {
    __extends(ActFij_PpSet, _super);
    function ActFij_PpSet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns an entity builder to construct instances `ActFij_PpSet`.
     * @returns A builder that constructs instances of entity type `ActFij_PpSet`.
     */
    ActFij_PpSet.builder = function () {
        return core_1.Entity.entityBuilder(ActFij_PpSet);
    };
    /**
     * Returns a request builder to construct requests for operations on the `ActFij_PpSet` entity type.
     * @returns A `ActFij_PpSet` request builder.
     */
    ActFij_PpSet.requestBuilder = function () {
        return new ActFij_PpSetRequestBuilder_1.ActFij_PpSetRequestBuilder();
    };
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `ActFij_PpSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `ActFij_PpSet`.
     */
    ActFij_PpSet.customField = function (fieldName) {
        return core_1.Entity.customFieldSelector(fieldName, ActFij_PpSet);
    };
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    ActFij_PpSet.prototype.toJSON = function () {
        return __assign(__assign({}, this), this._customFields);
    };
    /**
     * Technical entity name for ActFij_PpSet.
     */
    ActFij_PpSet._entityName = 'ActFij_PPSet';
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for ActFij_PpSet.
     */
    ActFij_PpSet._serviceName = 'Z_OD_SCP_BAVNPP001_SRV';
    /**
     * Default url path for the according service.
     */
    ActFij_PpSet._defaultServicePath = '/sap/opu/odata/sap/Z_OD_SCP_BAVNPP001_SRV';
    return ActFij_PpSet;
}(core_1.Entity));
exports.ActFij_PpSet = ActFij_PpSet;
(function (ActFij_PpSet) {
    /**
     * Static representation of the [[bukrs]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    ActFij_PpSet.BUKRS = new core_1.StringField('Bukrs', ActFij_PpSet, 'Edm.String');
    /**
     * Static representation of the [[vin]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    ActFij_PpSet.VIN = new core_1.StringField('Vin', ActFij_PpSet, 'Edm.String');
    /**
     * Static representation of the [[idvehi]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    ActFij_PpSet.IDVEHI = new core_1.StringField('Idvehi', ActFij_PpSet, 'Edm.String');
    /**
     * Static representation of the [[kfzkz]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    ActFij_PpSet.KFZKZ = new core_1.StringField('Kfzkz', ActFij_PpSet, 'Edm.String');
    /**
     * Static representation of the [[werks]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    ActFij_PpSet.WERKS = new core_1.StringField('Werks', ActFij_PpSet, 'Edm.String');
    /**
     * Static representation of the [[segment]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    ActFij_PpSet.SEGMENT = new core_1.StringField('Segment', ActFij_PpSet, 'Edm.String');
    /**
     * Static representation of the [[idMarca]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    ActFij_PpSet.ID_MARCA = new core_1.StringField('IdMarca', ActFij_PpSet, 'Edm.String');
    /**
     * Static representation of the [[idModelo]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    ActFij_PpSet.ID_MODELO = new core_1.StringField('IdModelo', ActFij_PpSet, 'Edm.String');
    /**
     * Static representation of the [[idGama]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    ActFij_PpSet.ID_GAMA = new core_1.StringField('IdGama', ActFij_PpSet, 'Edm.String');
    /**
     * Static representation of the [[idColorext]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    ActFij_PpSet.ID_COLOREXT = new core_1.StringField('IdColorext', ActFij_PpSet, 'Edm.String');
    /**
     * Static representation of the [[idColorint]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    ActFij_PpSet.ID_COLORINT = new core_1.StringField('IdColorint', ActFij_PpSet, 'Edm.String');
    /**
     * Static representation of the [[answl]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    ActFij_PpSet.ANSWL = new core_1.BigNumberField('Answl', ActFij_PpSet, 'Edm.Decimal');
    /**
     * Static representation of the [[lifnr]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    ActFij_PpSet.LIFNR = new core_1.StringField('Lifnr', ActFij_PpSet, 'Edm.String');
    /**
     * All fields of the ActFij_PpSet entity.
     */
    ActFij_PpSet._allFields = [
        ActFij_PpSet.BUKRS,
        ActFij_PpSet.VIN,
        ActFij_PpSet.IDVEHI,
        ActFij_PpSet.KFZKZ,
        ActFij_PpSet.WERKS,
        ActFij_PpSet.SEGMENT,
        ActFij_PpSet.ID_MARCA,
        ActFij_PpSet.ID_MODELO,
        ActFij_PpSet.ID_GAMA,
        ActFij_PpSet.ID_COLOREXT,
        ActFij_PpSet.ID_COLORINT,
        ActFij_PpSet.ANSWL,
        ActFij_PpSet.LIFNR
    ];
    /**
     * All fields selector.
     */
    ActFij_PpSet.ALL_FIELDS = new core_1.AllFields('*', ActFij_PpSet);
    /**
     * All key fields of the ActFij_PpSet entity.
     */
    ActFij_PpSet._keyFields = [ActFij_PpSet.BUKRS, ActFij_PpSet.VIN];
    /**
     * Mapping of all key field names to the respective static field property ActFij_PpSet.
     */
    ActFij_PpSet._keys = ActFij_PpSet._keyFields.reduce(function (acc, field) {
        acc[field._fieldName] = field;
        return acc;
    }, {});
})(ActFij_PpSet = exports.ActFij_PpSet || (exports.ActFij_PpSet = {}));
exports.ActFij_PpSet = ActFij_PpSet;
//# sourceMappingURL=ActFij_PpSet.js.map