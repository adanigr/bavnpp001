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
exports.CreatePolizaPmSet = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var CreatePolizaPmSetRequestBuilder_1 = require("./CreatePolizaPmSetRequestBuilder");
var core_1 = require("@sap-cloud-sdk/core");
/**
 * This class represents the entity "CreatePolizaPMSet" of service "Z_OD_SCP_BAVNPP001_SRV".
 */
var CreatePolizaPmSet = /** @class */ (function (_super) {
    __extends(CreatePolizaPmSet, _super);
    function CreatePolizaPmSet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns an entity builder to construct instances `CreatePolizaPmSet`.
     * @returns A builder that constructs instances of entity type `CreatePolizaPmSet`.
     */
    CreatePolizaPmSet.builder = function () {
        return core_1.Entity.entityBuilder(CreatePolizaPmSet);
    };
    /**
     * Returns a request builder to construct requests for operations on the `CreatePolizaPmSet` entity type.
     * @returns A `CreatePolizaPmSet` request builder.
     */
    CreatePolizaPmSet.requestBuilder = function () {
        return new CreatePolizaPmSetRequestBuilder_1.CreatePolizaPmSetRequestBuilder();
    };
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `CreatePolizaPmSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `CreatePolizaPmSet`.
     */
    CreatePolizaPmSet.customField = function (fieldName) {
        return core_1.Entity.customFieldSelector(fieldName, CreatePolizaPmSet);
    };
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    CreatePolizaPmSet.prototype.toJSON = function () {
        return __assign(__assign({}, this), this._customFields);
    };
    /**
     * Technical entity name for CreatePolizaPmSet.
     */
    CreatePolizaPmSet._entityName = 'CreatePolizaPMSet';
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for CreatePolizaPmSet.
     */
    CreatePolizaPmSet._serviceName = 'Z_OD_SCP_BAVNPP001_SRV';
    /**
     * Default url path for the according service.
     */
    CreatePolizaPmSet._defaultServicePath = '/sap/opu/odata/sap/Z_OD_SCP_BAVNPP001_SRV';
    return CreatePolizaPmSet;
}(core_1.Entity));
exports.CreatePolizaPmSet = CreatePolizaPmSet;
var CreatePolizaPmItemSet_1 = require("./CreatePolizaPmItemSet");
var RetSet_1 = require("./RetSet");
(function (CreatePolizaPmSet) {
    /**
     * Static representation of the [[hdtext]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CreatePolizaPmSet.HDTEXT = new core_1.StringField('Hdtext', CreatePolizaPmSet, 'Edm.String');
    /**
     * Static representation of the [[company]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CreatePolizaPmSet.COMPANY = new core_1.StringField('Company', CreatePolizaPmSet, 'Edm.String');
    /**
     * Static representation of the [[finoper]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CreatePolizaPmSet.FINOPER = new core_1.StringField('Finoper', CreatePolizaPmSet, 'Edm.String');
    /**
     * Static representation of the [[currency]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CreatePolizaPmSet.CURRENCY = new core_1.StringField('Currency', CreatePolizaPmSet, 'Edm.String');
    /**
     * Static representation of the [[docdate]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CreatePolizaPmSet.DOCDATE = new core_1.StringField('Docdate', CreatePolizaPmSet, 'Edm.String');
    /**
     * Static representation of the [[scpuser]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CreatePolizaPmSet.SCPUSER = new core_1.StringField('Scpuser', CreatePolizaPmSet, 'Edm.String');
    /**
     * Static representation of the [[scpapp]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CreatePolizaPmSet.SCPAPP = new core_1.StringField('Scpapp', CreatePolizaPmSet, 'Edm.String');
    /**
     * Static representation of the [[refdocno]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CreatePolizaPmSet.REFDOCNO = new core_1.StringField('Refdocno', CreatePolizaPmSet, 'Edm.String');
    /**
     * Static representation of the one-to-many navigation property [[createPolizaPmItemSet]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CreatePolizaPmSet.CREATE_POLIZA_PM_ITEM_SET = new core_1.Link('CreatePolizaPMItemSet', CreatePolizaPmSet, CreatePolizaPmItemSet_1.CreatePolizaPmItemSet);
    /**
     * Static representation of the one-to-many navigation property [[retSet]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CreatePolizaPmSet.RET_SET = new core_1.Link('RetSet', CreatePolizaPmSet, RetSet_1.RetSet);
    /**
     * All fields of the CreatePolizaPmSet entity.
     */
    CreatePolizaPmSet._allFields = [
        CreatePolizaPmSet.HDTEXT,
        CreatePolizaPmSet.COMPANY,
        CreatePolizaPmSet.FINOPER,
        CreatePolizaPmSet.CURRENCY,
        CreatePolizaPmSet.DOCDATE,
        CreatePolizaPmSet.SCPUSER,
        CreatePolizaPmSet.SCPAPP,
        CreatePolizaPmSet.REFDOCNO,
        CreatePolizaPmSet.CREATE_POLIZA_PM_ITEM_SET,
        CreatePolizaPmSet.RET_SET
    ];
    /**
     * All fields selector.
     */
    CreatePolizaPmSet.ALL_FIELDS = new core_1.AllFields('*', CreatePolizaPmSet);
    /**
     * All key fields of the CreatePolizaPmSet entity.
     */
    CreatePolizaPmSet._keyFields = [CreatePolizaPmSet.HDTEXT];
    /**
     * Mapping of all key field names to the respective static field property CreatePolizaPmSet.
     */
    CreatePolizaPmSet._keys = CreatePolizaPmSet._keyFields.reduce(function (acc, field) {
        acc[field._fieldName] = field;
        return acc;
    }, {});
})(CreatePolizaPmSet = exports.CreatePolizaPmSet || (exports.CreatePolizaPmSet = {}));
exports.CreatePolizaPmSet = CreatePolizaPmSet;
//# sourceMappingURL=CreatePolizaPmSet.js.map