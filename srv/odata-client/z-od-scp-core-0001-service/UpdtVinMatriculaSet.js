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
var UpdtVinMatriculaSetRequestBuilder_1 = require("./UpdtVinMatriculaSetRequestBuilder");
var core_1 = require("@sap-cloud-sdk/core");
/**
 * This class represents the entity "UpdtVinMatriculaSet" of service "Z_OD_SCP_CORE_0001_SRV".
 */
var UpdtVinMatriculaSet = /** @class */ (function (_super) {
    __extends(UpdtVinMatriculaSet, _super);
    function UpdtVinMatriculaSet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns an entity builder to construct instances `UpdtVinMatriculaSet`.
     * @returns A builder that constructs instances of entity type `UpdtVinMatriculaSet`.
     */
    UpdtVinMatriculaSet.builder = function () {
        return core_1.Entity.entityBuilder(UpdtVinMatriculaSet);
    };
    /**
     * Returns a request builder to construct requests for operations on the `UpdtVinMatriculaSet` entity type.
     * @returns A `UpdtVinMatriculaSet` request builder.
     */
    UpdtVinMatriculaSet.requestBuilder = function () {
        return new UpdtVinMatriculaSetRequestBuilder_1.UpdtVinMatriculaSetRequestBuilder();
    };
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `UpdtVinMatriculaSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `UpdtVinMatriculaSet`.
     */
    UpdtVinMatriculaSet.customField = function (fieldName) {
        return core_1.Entity.customFieldSelector(fieldName, UpdtVinMatriculaSet);
    };
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    UpdtVinMatriculaSet.prototype.toJSON = function () {
        return __assign(__assign({}, this), this._customFields);
    };
    /**
     * Technical entity name for UpdtVinMatriculaSet.
     */
    UpdtVinMatriculaSet._entityName = 'UpdtVinMatriculaSet';
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for UpdtVinMatriculaSet.
     */
    UpdtVinMatriculaSet._serviceName = 'Z_OD_SCP_CORE_0001_SRV';
    /**
     * Default url path for the according service.
     */
    UpdtVinMatriculaSet._defaultServicePath = '/sap/opu/odata/sap/Z_OD_SCP_CORE_0001_SRV';
    return UpdtVinMatriculaSet;
}(core_1.Entity));
exports.UpdtVinMatriculaSet = UpdtVinMatriculaSet;
(function (UpdtVinMatriculaSet) {
    /**
     * Static representation of the [[idvehi]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    UpdtVinMatriculaSet.IDVEHI = new core_1.StringField('Idvehi', UpdtVinMatriculaSet, 'Edm.String');
    /**
     * Static representation of the [[vin]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    UpdtVinMatriculaSet.VIN = new core_1.StringField('Vin', UpdtVinMatriculaSet, 'Edm.String');
    /**
     * Static representation of the [[lnum]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    UpdtVinMatriculaSet.LNUM = new core_1.StringField('Lnum', UpdtVinMatriculaSet, 'Edm.String');
    /**
     * Static representation of the [[gsber]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    UpdtVinMatriculaSet.GSBER = new core_1.StringField('Gsber', UpdtVinMatriculaSet, 'Edm.String');
    /**
     * Static representation of the [[scpuser]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    UpdtVinMatriculaSet.SCPUSER = new core_1.StringField('Scpuser', UpdtVinMatriculaSet, 'Edm.String');
    /**
     * Static representation of the [[scpapp]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    UpdtVinMatriculaSet.SCPAPP = new core_1.StringField('Scpapp', UpdtVinMatriculaSet, 'Edm.String');
    /**
     * Static representation of the [[msgtype]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    UpdtVinMatriculaSet.MSGTYPE = new core_1.StringField('Msgtype', UpdtVinMatriculaSet, 'Edm.String');
    /**
     * Static representation of the [[message]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    UpdtVinMatriculaSet.MESSAGE = new core_1.StringField('Message', UpdtVinMatriculaSet, 'Edm.String');
    /**
     * Static representation of the [[messageV1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    UpdtVinMatriculaSet.MESSAGE_V_1 = new core_1.StringField('MessageV1', UpdtVinMatriculaSet, 'Edm.String');
    /**
     * All fields of the UpdtVinMatriculaSet entity.
     */
    UpdtVinMatriculaSet._allFields = [
        UpdtVinMatriculaSet.IDVEHI,
        UpdtVinMatriculaSet.VIN,
        UpdtVinMatriculaSet.LNUM,
        UpdtVinMatriculaSet.GSBER,
        UpdtVinMatriculaSet.SCPUSER,
        UpdtVinMatriculaSet.SCPAPP,
        UpdtVinMatriculaSet.MSGTYPE,
        UpdtVinMatriculaSet.MESSAGE,
        UpdtVinMatriculaSet.MESSAGE_V_1
    ];
    /**
     * All fields selector.
     */
    UpdtVinMatriculaSet.ALL_FIELDS = new core_1.AllFields('*', UpdtVinMatriculaSet);
    /**
     * All key fields of the UpdtVinMatriculaSet entity.
     */
    UpdtVinMatriculaSet._keyFields = [UpdtVinMatriculaSet.IDVEHI];
    /**
     * Mapping of all key field names to the respective static field property UpdtVinMatriculaSet.
     */
    UpdtVinMatriculaSet._keys = UpdtVinMatriculaSet._keyFields.reduce(function (acc, field) {
        acc[field._fieldName] = field;
        return acc;
    }, {});
})(UpdtVinMatriculaSet = exports.UpdtVinMatriculaSet || (exports.UpdtVinMatriculaSet = {}));
exports.UpdtVinMatriculaSet = UpdtVinMatriculaSet;
//# sourceMappingURL=UpdtVinMatriculaSet.js.map