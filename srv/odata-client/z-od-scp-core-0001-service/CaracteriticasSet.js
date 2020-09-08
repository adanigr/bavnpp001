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
var CaracteriticasSetRequestBuilder_1 = require("./CaracteriticasSetRequestBuilder");
var core_1 = require("@sap-cloud-sdk/core");
/**
 * This class represents the entity "CaracteriticasSet" of service "Z_OD_SCP_CORE_0001_SRV".
 */
var CaracteriticasSet = /** @class */ (function (_super) {
    __extends(CaracteriticasSet, _super);
    function CaracteriticasSet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns an entity builder to construct instances `CaracteriticasSet`.
     * @returns A builder that constructs instances of entity type `CaracteriticasSet`.
     */
    CaracteriticasSet.builder = function () {
        return core_1.Entity.entityBuilder(CaracteriticasSet);
    };
    /**
     * Returns a request builder to construct requests for operations on the `CaracteriticasSet` entity type.
     * @returns A `CaracteriticasSet` request builder.
     */
    CaracteriticasSet.requestBuilder = function () {
        return new CaracteriticasSetRequestBuilder_1.CaracteriticasSetRequestBuilder();
    };
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `CaracteriticasSet`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `CaracteriticasSet`.
     */
    CaracteriticasSet.customField = function (fieldName) {
        return core_1.Entity.customFieldSelector(fieldName, CaracteriticasSet);
    };
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    CaracteriticasSet.prototype.toJSON = function () {
        return __assign(__assign({}, this), this._customFields);
    };
    /**
     * Technical entity name for CaracteriticasSet.
     */
    CaracteriticasSet._entityName = 'CaracteriticasSet';
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for CaracteriticasSet.
     */
    CaracteriticasSet._serviceName = 'Z_OD_SCP_CORE_0001_SRV';
    /**
     * Default url path for the according service.
     */
    CaracteriticasSet._defaultServicePath = '/sap/opu/odata/sap/Z_OD_SCP_CORE_0001_SRV';
    return CaracteriticasSet;
}(core_1.Entity));
exports.CaracteriticasSet = CaracteriticasSet;
(function (CaracteriticasSet) {
    /**
     * Static representation of the [[charactname]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CaracteriticasSet.CHARACTNAME = new core_1.StringField('Charactname', CaracteriticasSet, 'Edm.String');
    /**
     * Static representation of the [[valueCharLong]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CaracteriticasSet.VALUE_CHAR_LONG = new core_1.StringField('ValueCharLong', CaracteriticasSet, 'Edm.String');
    /**
     * Static representation of the [[descriptionLong]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CaracteriticasSet.DESCRIPTION_LONG = new core_1.StringField('DescriptionLong', CaracteriticasSet, 'Edm.String');
    /**
     * All fields of the CaracteriticasSet entity.
     */
    CaracteriticasSet._allFields = [
        CaracteriticasSet.CHARACTNAME,
        CaracteriticasSet.VALUE_CHAR_LONG,
        CaracteriticasSet.DESCRIPTION_LONG
    ];
    /**
     * All fields selector.
     */
    CaracteriticasSet.ALL_FIELDS = new core_1.AllFields('*', CaracteriticasSet);
    /**
     * All key fields of the CaracteriticasSet entity.
     */
    CaracteriticasSet._keyFields = [CaracteriticasSet.CHARACTNAME];
    /**
     * Mapping of all key field names to the respective static field property CaracteriticasSet.
     */
    CaracteriticasSet._keys = CaracteriticasSet._keyFields.reduce(function (acc, field) {
        acc[field._fieldName] = field;
        return acc;
    }, {});
})(CaracteriticasSet = exports.CaracteriticasSet || (exports.CaracteriticasSet = {}));
exports.CaracteriticasSet = CaracteriticasSet;
//# sourceMappingURL=CaracteriticasSet.js.map