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
exports.CreatePolizaPmItemSet = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var CreatePolizaPmItemSetRequestBuilder_1 = require("./CreatePolizaPmItemSetRequestBuilder");
var core_1 = require("@sap-cloud-sdk/core");
/**
 * This class represents the entity "CreatePolizaPMItemSet" of service "Z_OD_SCP_BAVNPP001_SRV".
 */
var CreatePolizaPmItemSet = /** @class */ (function (_super) {
    __extends(CreatePolizaPmItemSet, _super);
    function CreatePolizaPmItemSet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns an entity builder to construct instances `CreatePolizaPmItemSet`.
     * @returns A builder that constructs instances of entity type `CreatePolizaPmItemSet`.
     */
    CreatePolizaPmItemSet.builder = function () {
        return core_1.Entity.entityBuilder(CreatePolizaPmItemSet);
    };
    /**
     * Returns a request builder to construct requests for operations on the `CreatePolizaPmItemSet` entity type.
     * @returns A `CreatePolizaPmItemSet` request builder.
     */
    CreatePolizaPmItemSet.requestBuilder = function () {
        return new CreatePolizaPmItemSetRequestBuilder_1.CreatePolizaPmItemSetRequestBuilder();
    };
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `CreatePolizaPmItemSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `CreatePolizaPmItemSet`.
     */
    CreatePolizaPmItemSet.customField = function (fieldName) {
        return core_1.Entity.customFieldSelector(fieldName, CreatePolizaPmItemSet);
    };
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    CreatePolizaPmItemSet.prototype.toJSON = function () {
        return __assign(__assign({}, this), this._customFields);
    };
    /**
     * Technical entity name for CreatePolizaPmItemSet.
     */
    CreatePolizaPmItemSet._entityName = 'CreatePolizaPMItemSet';
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for CreatePolizaPmItemSet.
     */
    CreatePolizaPmItemSet._serviceName = 'Z_OD_SCP_BAVNPP001_SRV';
    /**
     * Default url path for the according service.
     */
    CreatePolizaPmItemSet._defaultServicePath = '/sap/opu/odata/sap/Z_OD_SCP_BAVNPP001_SRV';
    return CreatePolizaPmItemSet;
}(core_1.Entity));
exports.CreatePolizaPmItemSet = CreatePolizaPmItemSet;
(function (CreatePolizaPmItemSet) {
    /**
     * Static representation of the [[assignment]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CreatePolizaPmItemSet.ASSIGNMENT = new core_1.StringField('Assignment', CreatePolizaPmItemSet, 'Edm.String');
    /**
     * Static representation of the [[hdid]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CreatePolizaPmItemSet.HDID = new core_1.StringField('Hdid', CreatePolizaPmItemSet, 'Edm.String');
    /**
     * Static representation of the [[account]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CreatePolizaPmItemSet.ACCOUNT = new core_1.StringField('Account', CreatePolizaPmItemSet, 'Edm.String');
    /**
     * Static representation of the [[costcenter]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CreatePolizaPmItemSet.COSTCENTER = new core_1.StringField('Costcenter', CreatePolizaPmItemSet, 'Edm.String');
    /**
     * Static representation of the [[vendorno]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CreatePolizaPmItemSet.VENDORNO = new core_1.StringField('Vendorno', CreatePolizaPmItemSet, 'Edm.String');
    /**
     * Static representation of the [[itemtext]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CreatePolizaPmItemSet.ITEMTEXT = new core_1.StringField('Itemtext', CreatePolizaPmItemSet, 'Edm.String');
    /**
     * Static representation of the [[segment]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CreatePolizaPmItemSet.SEGMENT = new core_1.StringField('Segment', CreatePolizaPmItemSet, 'Edm.String');
    /**
     * Static representation of the [[division]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CreatePolizaPmItemSet.DIVISION = new core_1.StringField('Division', CreatePolizaPmItemSet, 'Edm.String');
    /**
     * Static representation of the [[amount]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CreatePolizaPmItemSet.AMOUNT = new core_1.BigNumberField('Amount', CreatePolizaPmItemSet, 'Edm.Decimal');
    /**
     * All fields of the CreatePolizaPmItemSet entity.
     */
    CreatePolizaPmItemSet._allFields = [
        CreatePolizaPmItemSet.ASSIGNMENT,
        CreatePolizaPmItemSet.HDID,
        CreatePolizaPmItemSet.ACCOUNT,
        CreatePolizaPmItemSet.COSTCENTER,
        CreatePolizaPmItemSet.VENDORNO,
        CreatePolizaPmItemSet.ITEMTEXT,
        CreatePolizaPmItemSet.SEGMENT,
        CreatePolizaPmItemSet.DIVISION,
        CreatePolizaPmItemSet.AMOUNT
    ];
    /**
     * All fields selector.
     */
    CreatePolizaPmItemSet.ALL_FIELDS = new core_1.AllFields('*', CreatePolizaPmItemSet);
    /**
     * All key fields of the CreatePolizaPmItemSet entity.
     */
    CreatePolizaPmItemSet._keyFields = [CreatePolizaPmItemSet.HDID];
    /**
     * Mapping of all key field names to the respective static field property CreatePolizaPmItemSet.
     */
    CreatePolizaPmItemSet._keys = CreatePolizaPmItemSet._keyFields.reduce(function (acc, field) {
        acc[field._fieldName] = field;
        return acc;
    }, {});
})(CreatePolizaPmItemSet = exports.CreatePolizaPmItemSet || (exports.CreatePolizaPmItemSet = {}));
exports.CreatePolizaPmItemSet = CreatePolizaPmItemSet;
//# sourceMappingURL=CreatePolizaPmItemSet.js.map