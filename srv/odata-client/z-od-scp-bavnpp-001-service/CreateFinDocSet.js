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
exports.CreateFinDocSet = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var CreateFinDocSetRequestBuilder_1 = require("./CreateFinDocSetRequestBuilder");
var core_1 = require("@sap-cloud-sdk/core");
/**
 * This class represents the entity "CreateFinDocSet" of service "Z_OD_SCP_BAVNPP001_SRV".
 */
var CreateFinDocSet = /** @class */ (function (_super) {
    __extends(CreateFinDocSet, _super);
    function CreateFinDocSet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns an entity builder to construct instances `CreateFinDocSet`.
     * @returns A builder that constructs instances of entity type `CreateFinDocSet`.
     */
    CreateFinDocSet.builder = function () {
        return core_1.Entity.entityBuilder(CreateFinDocSet);
    };
    /**
     * Returns a request builder to construct requests for operations on the `CreateFinDocSet` entity type.
     * @returns A `CreateFinDocSet` request builder.
     */
    CreateFinDocSet.requestBuilder = function () {
        return new CreateFinDocSetRequestBuilder_1.CreateFinDocSetRequestBuilder();
    };
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `CreateFinDocSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `CreateFinDocSet`.
     */
    CreateFinDocSet.customField = function (fieldName) {
        return core_1.Entity.customFieldSelector(fieldName, CreateFinDocSet);
    };
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    CreateFinDocSet.prototype.toJSON = function () {
        return __assign(__assign({}, this), this._customFields);
    };
    /**
     * Technical entity name for CreateFinDocSet.
     */
    CreateFinDocSet._entityName = 'CreateFinDocSet';
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for CreateFinDocSet.
     */
    CreateFinDocSet._serviceName = 'Z_OD_SCP_BAVNPP001_SRV';
    /**
     * Default url path for the according service.
     */
    CreateFinDocSet._defaultServicePath = '/sap/opu/odata/sap/Z_OD_SCP_BAVNPP001_SRV';
    return CreateFinDocSet;
}(core_1.Entity));
exports.CreateFinDocSet = CreateFinDocSet;
var ItemsSet_1 = require("./ItemsSet");
var RetSet_1 = require("./RetSet");
(function (CreateFinDocSet) {
    /**
     * Static representation of the [[hdid]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CreateFinDocSet.HDID = new core_1.StringField('Hdid', CreateFinDocSet, 'Edm.String');
    /**
     * Static representation of the [[hdtext]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CreateFinDocSet.HDTEXT = new core_1.StringField('Hdtext', CreateFinDocSet, 'Edm.String');
    /**
     * Static representation of the [[idvehi]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CreateFinDocSet.IDVEHI = new core_1.StringField('Idvehi', CreateFinDocSet, 'Edm.String');
    /**
     * Static representation of the [[vin]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CreateFinDocSet.VIN = new core_1.StringField('Vin', CreateFinDocSet, 'Edm.String');
    /**
     * Static representation of the [[company]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CreateFinDocSet.COMPANY = new core_1.StringField('Company', CreateFinDocSet, 'Edm.String');
    /**
     * Static representation of the [[finoper]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CreateFinDocSet.FINOPER = new core_1.StringField('Finoper', CreateFinDocSet, 'Edm.String');
    /**
     * Static representation of the [[account]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CreateFinDocSet.ACCOUNT = new core_1.StringField('Account', CreateFinDocSet, 'Edm.String');
    /**
     * Static representation of the [[costcenter]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CreateFinDocSet.COSTCENTER = new core_1.StringField('Costcenter', CreateFinDocSet, 'Edm.String');
    /**
     * Static representation of the [[exchRate]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CreateFinDocSet.EXCH_RATE = new core_1.StringField('Exch_rate', CreateFinDocSet, 'Edm.String');
    /**
     * Static representation of the [[docDate]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CreateFinDocSet.DOC_DATE = new core_1.StringField('DocDate', CreateFinDocSet, 'Edm.String');
    /**
     * Static representation of the [[scpuser]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CreateFinDocSet.SCPUSER = new core_1.StringField('Scpuser', CreateFinDocSet, 'Edm.String');
    /**
     * Static representation of the [[scpapp]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CreateFinDocSet.SCPAPP = new core_1.StringField('Scpapp', CreateFinDocSet, 'Edm.String');
    /**
     * Static representation of the one-to-many navigation property [[itemsSet]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CreateFinDocSet.ITEMS_SET = new core_1.Link('ItemsSet', CreateFinDocSet, ItemsSet_1.ItemsSet);
    /**
     * Static representation of the one-to-many navigation property [[retSet]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CreateFinDocSet.RET_SET = new core_1.Link('RetSet', CreateFinDocSet, RetSet_1.RetSet);
    /**
     * All fields of the CreateFinDocSet entity.
     */
    CreateFinDocSet._allFields = [
        CreateFinDocSet.HDID,
        CreateFinDocSet.HDTEXT,
        CreateFinDocSet.IDVEHI,
        CreateFinDocSet.VIN,
        CreateFinDocSet.COMPANY,
        CreateFinDocSet.FINOPER,
        CreateFinDocSet.ACCOUNT,
        CreateFinDocSet.COSTCENTER,
        CreateFinDocSet.EXCH_RATE,
        CreateFinDocSet.DOC_DATE,
        CreateFinDocSet.SCPUSER,
        CreateFinDocSet.SCPAPP,
        CreateFinDocSet.ITEMS_SET,
        CreateFinDocSet.RET_SET
    ];
    /**
     * All fields selector.
     */
    CreateFinDocSet.ALL_FIELDS = new core_1.AllFields('*', CreateFinDocSet);
    /**
     * All key fields of the CreateFinDocSet entity.
     */
    CreateFinDocSet._keyFields = [CreateFinDocSet.HDID];
    /**
     * Mapping of all key field names to the respective static field property CreateFinDocSet.
     */
    CreateFinDocSet._keys = CreateFinDocSet._keyFields.reduce(function (acc, field) {
        acc[field._fieldName] = field;
        return acc;
    }, {});
})(CreateFinDocSet = exports.CreateFinDocSet || (exports.CreateFinDocSet = {}));
exports.CreateFinDocSet = CreateFinDocSet;
//# sourceMappingURL=CreateFinDocSet.js.map