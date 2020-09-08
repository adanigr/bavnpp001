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
exports.ItemsSet = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var ItemsSetRequestBuilder_1 = require("./ItemsSetRequestBuilder");
var core_1 = require("@sap-cloud-sdk/core");
/**
 * This class represents the entity "ItemsSet" of service "Z_OD_SCP_BAVNPP001_SRV".
 */
var ItemsSet = /** @class */ (function (_super) {
    __extends(ItemsSet, _super);
    function ItemsSet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns an entity builder to construct instances `ItemsSet`.
     * @returns A builder that constructs instances of entity type `ItemsSet`.
     */
    ItemsSet.builder = function () {
        return core_1.Entity.entityBuilder(ItemsSet);
    };
    /**
     * Returns a request builder to construct requests for operations on the `ItemsSet` entity type.
     * @returns A `ItemsSet` request builder.
     */
    ItemsSet.requestBuilder = function () {
        return new ItemsSetRequestBuilder_1.ItemsSetRequestBuilder();
    };
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `ItemsSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `ItemsSet`.
     */
    ItemsSet.customField = function (fieldName) {
        return core_1.Entity.customFieldSelector(fieldName, ItemsSet);
    };
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    ItemsSet.prototype.toJSON = function () {
        return __assign(__assign({}, this), this._customFields);
    };
    /**
     * Technical entity name for ItemsSet.
     */
    ItemsSet._entityName = 'ItemsSet';
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for ItemsSet.
     */
    ItemsSet._serviceName = 'Z_OD_SCP_BAVNPP001_SRV';
    /**
     * Default url path for the according service.
     */
    ItemsSet._defaultServicePath = '/sap/opu/odata/sap/Z_OD_SCP_BAVNPP001_SRV';
    return ItemsSet;
}(core_1.Entity));
exports.ItemsSet = ItemsSet;
(function (ItemsSet) {
    /**
     * Static representation of the [[assignment]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    ItemsSet.ASSIGNMENT = new core_1.StringField('Assignment', ItemsSet, 'Edm.String');
    /**
     * Static representation of the [[hdid]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    ItemsSet.HDID = new core_1.StringField('Hdid', ItemsSet, 'Edm.String');
    /**
     * Static representation of the [[vendorNo]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    ItemsSet.VENDOR_NO = new core_1.StringField('VendorNo', ItemsSet, 'Edm.String');
    /**
     * Static representation of the [[customer]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    ItemsSet.CUSTOMER = new core_1.StringField('Customer', ItemsSet, 'Edm.String');
    /**
     * Static representation of the [[itemtext]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    ItemsSet.ITEMTEXT = new core_1.StringField('Itemtext', ItemsSet, 'Edm.String');
    /**
     * Static representation of the [[segment]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    ItemsSet.SEGMENT = new core_1.StringField('Segment', ItemsSet, 'Edm.String');
    /**
     * Static representation of the [[division]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    ItemsSet.DIVISION = new core_1.StringField('Division', ItemsSet, 'Edm.String');
    /**
     * Static representation of the [[currency]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    ItemsSet.CURRENCY = new core_1.StringField('Currency', ItemsSet, 'Edm.String');
    /**
     * Static representation of the [[amount]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    ItemsSet.AMOUNT = new core_1.BigNumberField('Amount', ItemsSet, 'Edm.Decimal');
    /**
     * All fields of the ItemsSet entity.
     */
    ItemsSet._allFields = [
        ItemsSet.ASSIGNMENT,
        ItemsSet.HDID,
        ItemsSet.VENDOR_NO,
        ItemsSet.CUSTOMER,
        ItemsSet.ITEMTEXT,
        ItemsSet.SEGMENT,
        ItemsSet.DIVISION,
        ItemsSet.CURRENCY,
        ItemsSet.AMOUNT
    ];
    /**
     * All fields selector.
     */
    ItemsSet.ALL_FIELDS = new core_1.AllFields('*', ItemsSet);
    /**
     * All key fields of the ItemsSet entity.
     */
    ItemsSet._keyFields = [ItemsSet.HDID];
    /**
     * Mapping of all key field names to the respective static field property ItemsSet.
     */
    ItemsSet._keys = ItemsSet._keyFields.reduce(function (acc, field) {
        acc[field._fieldName] = field;
        return acc;
    }, {});
})(ItemsSet = exports.ItemsSet || (exports.ItemsSet = {}));
exports.ItemsSet = ItemsSet;
//# sourceMappingURL=ItemsSet.js.map