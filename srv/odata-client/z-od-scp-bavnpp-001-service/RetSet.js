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
exports.RetSet = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var RetSetRequestBuilder_1 = require("./RetSetRequestBuilder");
var core_1 = require("@sap-cloud-sdk/core");
/**
 * This class represents the entity "RetSet" of service "Z_OD_SCP_BAVNPP001_SRV".
 */
var RetSet = /** @class */ (function (_super) {
    __extends(RetSet, _super);
    function RetSet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns an entity builder to construct instances `RetSet`.
     * @returns A builder that constructs instances of entity type `RetSet`.
     */
    RetSet.builder = function () {
        return core_1.Entity.entityBuilder(RetSet);
    };
    /**
     * Returns a request builder to construct requests for operations on the `RetSet` entity type.
     * @returns A `RetSet` request builder.
     */
    RetSet.requestBuilder = function () {
        return new RetSetRequestBuilder_1.RetSetRequestBuilder();
    };
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `RetSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `RetSet`.
     */
    RetSet.customField = function (fieldName) {
        return core_1.Entity.customFieldSelector(fieldName, RetSet);
    };
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    RetSet.prototype.toJSON = function () {
        return __assign(__assign({}, this), this._customFields);
    };
    /**
     * Technical entity name for RetSet.
     */
    RetSet._entityName = 'RetSet';
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for RetSet.
     */
    RetSet._serviceName = 'Z_OD_SCP_BAVNPP001_SRV';
    /**
     * Default url path for the according service.
     */
    RetSet._defaultServicePath = '/sap/opu/odata/sap/Z_OD_SCP_BAVNPP001_SRV';
    return RetSet;
}(core_1.Entity));
exports.RetSet = RetSet;
(function (RetSet) {
    /**
     * Static representation of the [[hdId]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    RetSet.HD_ID = new core_1.StringField('HdId', RetSet, 'Edm.String');
    /**
     * Static representation of the [[idvehi]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    RetSet.IDVEHI = new core_1.StringField('Idvehi', RetSet, 'Edm.String');
    /**
     * Static representation of the [[type]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    RetSet.TYPE = new core_1.StringField('Type', RetSet, 'Edm.String');
    /**
     * Static representation of the [[id]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    RetSet.ID = new core_1.StringField('Id', RetSet, 'Edm.String');
    /**
     * Static representation of the [[number]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    RetSet.NUMBER = new core_1.StringField('Number', RetSet, 'Edm.String');
    /**
     * Static representation of the [[message]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    RetSet.MESSAGE = new core_1.StringField('Message', RetSet, 'Edm.String');
    /**
     * Static representation of the [[logNo]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    RetSet.LOG_NO = new core_1.StringField('LogNo', RetSet, 'Edm.String');
    /**
     * Static representation of the [[logMsgNo]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    RetSet.LOG_MSG_NO = new core_1.StringField('LogMsgNo', RetSet, 'Edm.String');
    /**
     * Static representation of the [[messageV1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    RetSet.MESSAGE_V_1 = new core_1.StringField('MessageV1', RetSet, 'Edm.String');
    /**
     * Static representation of the [[messageV2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    RetSet.MESSAGE_V_2 = new core_1.StringField('MessageV2', RetSet, 'Edm.String');
    /**
     * Static representation of the [[messageV3]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    RetSet.MESSAGE_V_3 = new core_1.StringField('MessageV3', RetSet, 'Edm.String');
    /**
     * Static representation of the [[messageV4]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    RetSet.MESSAGE_V_4 = new core_1.StringField('MessageV4', RetSet, 'Edm.String');
    /**
     * Static representation of the [[parameter]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    RetSet.PARAMETER = new core_1.StringField('Parameter', RetSet, 'Edm.String');
    /**
     * Static representation of the [[row]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    RetSet.ROW = new core_1.NumberField('Row', RetSet, 'Edm.Int32');
    /**
     * Static representation of the [[field]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    RetSet.FIELD = new core_1.StringField('Field', RetSet, 'Edm.String');
    /**
     * Static representation of the [[system]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    RetSet.SYSTEM = new core_1.StringField('System', RetSet, 'Edm.String');
    /**
     * All fields of the RetSet entity.
     */
    RetSet._allFields = [
        RetSet.HD_ID,
        RetSet.IDVEHI,
        RetSet.TYPE,
        RetSet.ID,
        RetSet.NUMBER,
        RetSet.MESSAGE,
        RetSet.LOG_NO,
        RetSet.LOG_MSG_NO,
        RetSet.MESSAGE_V_1,
        RetSet.MESSAGE_V_2,
        RetSet.MESSAGE_V_3,
        RetSet.MESSAGE_V_4,
        RetSet.PARAMETER,
        RetSet.ROW,
        RetSet.FIELD,
        RetSet.SYSTEM
    ];
    /**
     * All fields selector.
     */
    RetSet.ALL_FIELDS = new core_1.AllFields('*', RetSet);
    /**
     * All key fields of the RetSet entity.
     */
    RetSet._keyFields = [RetSet.HD_ID];
    /**
     * Mapping of all key field names to the respective static field property RetSet.
     */
    RetSet._keys = RetSet._keyFields.reduce(function (acc, field) {
        acc[field._fieldName] = field;
        return acc;
    }, {});
})(RetSet = exports.RetSet || (exports.RetSet = {}));
exports.RetSet = RetSet;
//# sourceMappingURL=RetSet.js.map