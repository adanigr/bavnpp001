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
exports.CancelFinDocSet = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var CancelFinDocSetRequestBuilder_1 = require("./CancelFinDocSetRequestBuilder");
var core_1 = require("@sap-cloud-sdk/core");
/**
 * This class represents the entity "CancelFinDocSet" of service "Z_OD_SCP_BAVNPP001_SRV".
 */
var CancelFinDocSet = /** @class */ (function (_super) {
    __extends(CancelFinDocSet, _super);
    function CancelFinDocSet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns an entity builder to construct instances `CancelFinDocSet`.
     * @returns A builder that constructs instances of entity type `CancelFinDocSet`.
     */
    CancelFinDocSet.builder = function () {
        return core_1.Entity.entityBuilder(CancelFinDocSet);
    };
    /**
     * Returns a request builder to construct requests for operations on the `CancelFinDocSet` entity type.
     * @returns A `CancelFinDocSet` request builder.
     */
    CancelFinDocSet.requestBuilder = function () {
        return new CancelFinDocSetRequestBuilder_1.CancelFinDocSetRequestBuilder();
    };
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `CancelFinDocSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `CancelFinDocSet`.
     */
    CancelFinDocSet.customField = function (fieldName) {
        return core_1.Entity.customFieldSelector(fieldName, CancelFinDocSet);
    };
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    CancelFinDocSet.prototype.toJSON = function () {
        return __assign(__assign({}, this), this._customFields);
    };
    /**
     * Technical entity name for CancelFinDocSet.
     */
    CancelFinDocSet._entityName = 'CancelFinDocSet';
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for CancelFinDocSet.
     */
    CancelFinDocSet._serviceName = 'Z_OD_SCP_BAVNPP001_SRV';
    /**
     * Default url path for the according service.
     */
    CancelFinDocSet._defaultServicePath = '/sap/opu/odata/sap/Z_OD_SCP_BAVNPP001_SRV';
    return CancelFinDocSet;
}(core_1.Entity));
exports.CancelFinDocSet = CancelFinDocSet;
(function (CancelFinDocSet) {
    /**
     * Static representation of the [[idvehi]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CancelFinDocSet.IDVEHI = new core_1.StringField('Idvehi', CancelFinDocSet, 'Edm.String');
    /**
     * Static representation of the [[docid]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CancelFinDocSet.DOCID = new core_1.StringField('Docid', CancelFinDocSet, 'Edm.String');
    /**
     * Static representation of the [[scpuser]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CancelFinDocSet.SCPUSER = new core_1.StringField('Scpuser', CancelFinDocSet, 'Edm.String');
    /**
     * Static representation of the [[scpapp]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CancelFinDocSet.SCPAPP = new core_1.StringField('Scpapp', CancelFinDocSet, 'Edm.String');
    /**
     * Static representation of the [[cancelind]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CancelFinDocSet.CANCELIND = new core_1.StringField('Cancelind', CancelFinDocSet, 'Edm.String');
    /**
     * Static representation of the [[canceldoc]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CancelFinDocSet.CANCELDOC = new core_1.StringField('Canceldoc', CancelFinDocSet, 'Edm.String');
    /**
     * All fields of the CancelFinDocSet entity.
     */
    CancelFinDocSet._allFields = [
        CancelFinDocSet.IDVEHI,
        CancelFinDocSet.DOCID,
        CancelFinDocSet.SCPUSER,
        CancelFinDocSet.SCPAPP,
        CancelFinDocSet.CANCELIND,
        CancelFinDocSet.CANCELDOC
    ];
    /**
     * All fields selector.
     */
    CancelFinDocSet.ALL_FIELDS = new core_1.AllFields('*', CancelFinDocSet);
    /**
     * All key fields of the CancelFinDocSet entity.
     */
    CancelFinDocSet._keyFields = [CancelFinDocSet.IDVEHI];
    /**
     * Mapping of all key field names to the respective static field property CancelFinDocSet.
     */
    CancelFinDocSet._keys = CancelFinDocSet._keyFields.reduce(function (acc, field) {
        acc[field._fieldName] = field;
        return acc;
    }, {});
})(CancelFinDocSet = exports.CancelFinDocSet || (exports.CancelFinDocSet = {}));
exports.CancelFinDocSet = CancelFinDocSet;
//# sourceMappingURL=CancelFinDocSet.js.map