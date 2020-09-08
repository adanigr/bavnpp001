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
var CaracteriticasV2SetRequestBuilder_1 = require("./CaracteriticasV2SetRequestBuilder");
var core_1 = require("@sap-cloud-sdk/core");
/**
 * This class represents the entity "CaracteriticasV2Set" of service "Z_OD_SCP_CORE_0001_SRV".
 */
var CaracteriticasV2Set = /** @class */ (function (_super) {
    __extends(CaracteriticasV2Set, _super);
    function CaracteriticasV2Set() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns an entity builder to construct instances `CaracteriticasV2Set`.
     * @returns A builder that constructs instances of entity type `CaracteriticasV2Set`.
     */
    CaracteriticasV2Set.builder = function () {
        return core_1.Entity.entityBuilder(CaracteriticasV2Set);
    };
    /**
     * Returns a request builder to construct requests for operations on the `CaracteriticasV2Set` entity type.
     * @returns A `CaracteriticasV2Set` request builder.
     */
    CaracteriticasV2Set.requestBuilder = function () {
        return new CaracteriticasV2SetRequestBuilder_1.CaracteriticasV2SetRequestBuilder();
    };
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `CaracteriticasV2Set`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `CaracteriticasV2Set`.
     */
    CaracteriticasV2Set.customField = function (fieldName) {
        return core_1.Entity.customFieldSelector(fieldName, CaracteriticasV2Set);
    };
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    CaracteriticasV2Set.prototype.toJSON = function () {
        return __assign(__assign({}, this), this._customFields);
    };
    /**
     * Technical entity name for CaracteriticasV2Set.
     */
    CaracteriticasV2Set._entityName = 'CaracteriticasV2Set';
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for CaracteriticasV2Set.
     */
    CaracteriticasV2Set._serviceName = 'Z_OD_SCP_CORE_0001_SRV';
    /**
     * Default url path for the according service.
     */
    CaracteriticasV2Set._defaultServicePath = '/sap/opu/odata/sap/Z_OD_SCP_CORE_0001_SRV';
    return CaracteriticasV2Set;
}(core_1.Entity));
exports.CaracteriticasV2Set = CaracteriticasV2Set;
(function (CaracteriticasV2Set) {
    /**
     * Static representation of the [[mandt]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CaracteriticasV2Set.MANDT = new core_1.StringField('MANDT', CaracteriticasV2Set, 'Edm.String');
    /**
     * Static representation of the [[caractname]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CaracteriticasV2Set.CARACTNAME = new core_1.StringField('CARACTNAME', CaracteriticasV2Set, 'Edm.String');
    /**
     * Static representation of the [[caractdesc]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CaracteriticasV2Set.CARACTDESC = new core_1.StringField('CARACTDESC', CaracteriticasV2Set, 'Edm.String');
    /**
     * Static representation of the [[caractvalcode]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CaracteriticasV2Set.CARACTVALCODE = new core_1.StringField('CARACTVALCODE', CaracteriticasV2Set, 'Edm.String');
    /**
     * Static representation of the [[caractvaldesc]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CaracteriticasV2Set.CARACTVALDESC = new core_1.StringField('CARACTVALDESC', CaracteriticasV2Set, 'Edm.String');
    /**
     * Static representation of the [[depvalcode]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CaracteriticasV2Set.DEPVALCODE = new core_1.StringField('DEPVALCODE', CaracteriticasV2Set, 'Edm.String');
    /**
     * Static representation of the [[depvaldesc]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CaracteriticasV2Set.DEPVALDESC = new core_1.StringField('DEPVALDESC', CaracteriticasV2Set, 'Edm.String');
    /**
     * Static representation of the [[depvalnum]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    CaracteriticasV2Set.DEPVALNUM = new core_1.NumberField('DEPVALNUM', CaracteriticasV2Set, 'Edm.Double');
    /**
     * All fields of the CaracteriticasV2Set entity.
     */
    CaracteriticasV2Set._allFields = [
        CaracteriticasV2Set.MANDT,
        CaracteriticasV2Set.CARACTNAME,
        CaracteriticasV2Set.CARACTDESC,
        CaracteriticasV2Set.CARACTVALCODE,
        CaracteriticasV2Set.CARACTVALDESC,
        CaracteriticasV2Set.DEPVALCODE,
        CaracteriticasV2Set.DEPVALDESC,
        CaracteriticasV2Set.DEPVALNUM
    ];
    /**
     * All fields selector.
     */
    CaracteriticasV2Set.ALL_FIELDS = new core_1.AllFields('*', CaracteriticasV2Set);
    /**
     * All key fields of the CaracteriticasV2Set entity.
     */
    CaracteriticasV2Set._keyFields = [CaracteriticasV2Set.CARACTNAME, CaracteriticasV2Set.CARACTVALCODE];
    /**
     * Mapping of all key field names to the respective static field property CaracteriticasV2Set.
     */
    CaracteriticasV2Set._keys = CaracteriticasV2Set._keyFields.reduce(function (acc, field) {
        acc[field._fieldName] = field;
        return acc;
    }, {});
})(CaracteriticasV2Set = exports.CaracteriticasV2Set || (exports.CaracteriticasV2Set = {}));
exports.CaracteriticasV2Set = CaracteriticasV2Set;
//# sourceMappingURL=CaracteriticasV2Set.js.map