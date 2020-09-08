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
exports.InfoVtasSet = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var InfoVtasSetRequestBuilder_1 = require("./InfoVtasSetRequestBuilder");
var core_1 = require("@sap-cloud-sdk/core");
/**
 * This class represents the entity "InfoVtasSet" of service "Z_OD_SCP_BAVNPP001_SRV".
 */
var InfoVtasSet = /** @class */ (function (_super) {
    __extends(InfoVtasSet, _super);
    function InfoVtasSet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns an entity builder to construct instances `InfoVtasSet`.
     * @returns A builder that constructs instances of entity type `InfoVtasSet`.
     */
    InfoVtasSet.builder = function () {
        return core_1.Entity.entityBuilder(InfoVtasSet);
    };
    /**
     * Returns a request builder to construct requests for operations on the `InfoVtasSet` entity type.
     * @returns A `InfoVtasSet` request builder.
     */
    InfoVtasSet.requestBuilder = function () {
        return new InfoVtasSetRequestBuilder_1.InfoVtasSetRequestBuilder();
    };
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `InfoVtasSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `InfoVtasSet`.
     */
    InfoVtasSet.customField = function (fieldName) {
        return core_1.Entity.customFieldSelector(fieldName, InfoVtasSet);
    };
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    InfoVtasSet.prototype.toJSON = function () {
        return __assign(__assign({}, this), this._customFields);
    };
    /**
     * Technical entity name for InfoVtasSet.
     */
    InfoVtasSet._entityName = 'InfoVtasSet';
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for InfoVtasSet.
     */
    InfoVtasSet._serviceName = 'Z_OD_SCP_BAVNPP001_SRV';
    /**
     * Default url path for the according service.
     */
    InfoVtasSet._defaultServicePath = '/sap/opu/odata/sap/Z_OD_SCP_BAVNPP001_SRV';
    return InfoVtasSet;
}(core_1.Entity));
exports.InfoVtasSet = InfoVtasSet;
(function (InfoVtasSet) {
    /**
     * Static representation of the [[idvehi]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    InfoVtasSet.IDVEHI = new core_1.StringField('Idvehi', InfoVtasSet, 'Edm.String');
    /**
     * Static representation of the [[kunnr]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    InfoVtasSet.KUNNR = new core_1.StringField('Kunnr', InfoVtasSet, 'Edm.String');
    /**
     * Static representation of the [[name1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    InfoVtasSet.NAME_1 = new core_1.StringField('Name1', InfoVtasSet, 'Edm.String');
    /**
     * Static representation of the [[vbelnVa]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    InfoVtasSet.VBELN_VA = new core_1.StringField('VbelnVa', InfoVtasSet, 'Edm.String');
    /**
     * Static representation of the [[vbelnVf]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    InfoVtasSet.VBELN_VF = new core_1.StringField('VbelnVf', InfoVtasSet, 'Edm.String');
    /**
     * Static representation of the [[fkdat]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    InfoVtasSet.FKDAT = new core_1.DateField('Fkdat', InfoVtasSet, 'Edm.DateTime');
    /**
     * Static representation of the [[wrbtr]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    InfoVtasSet.WRBTR = new core_1.BigNumberField('Wrbtr', InfoVtasSet, 'Edm.Decimal');
    /**
     * All fields of the InfoVtasSet entity.
     */
    InfoVtasSet._allFields = [
        InfoVtasSet.IDVEHI,
        InfoVtasSet.KUNNR,
        InfoVtasSet.NAME_1,
        InfoVtasSet.VBELN_VA,
        InfoVtasSet.VBELN_VF,
        InfoVtasSet.FKDAT,
        InfoVtasSet.WRBTR
    ];
    /**
     * All fields selector.
     */
    InfoVtasSet.ALL_FIELDS = new core_1.AllFields('*', InfoVtasSet);
    /**
     * All key fields of the InfoVtasSet entity.
     */
    InfoVtasSet._keyFields = [InfoVtasSet.IDVEHI];
    /**
     * Mapping of all key field names to the respective static field property InfoVtasSet.
     */
    InfoVtasSet._keys = InfoVtasSet._keyFields.reduce(function (acc, field) {
        acc[field._fieldName] = field;
        return acc;
    }, {});
})(InfoVtasSet = exports.InfoVtasSet || (exports.InfoVtasSet = {}));
exports.InfoVtasSet = InfoVtasSet;
//# sourceMappingURL=InfoVtasSet.js.map