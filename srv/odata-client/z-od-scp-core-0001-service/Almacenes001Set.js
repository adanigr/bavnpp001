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
var Almacenes001SetRequestBuilder_1 = require("./Almacenes001SetRequestBuilder");
var core_1 = require("@sap-cloud-sdk/core");
/**
 * This class represents the entity "Almacenes001Set" of service "Z_OD_SCP_CORE_0001_SRV".
 */
var Almacenes001Set = /** @class */ (function (_super) {
    __extends(Almacenes001Set, _super);
    function Almacenes001Set() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns an entity builder to construct instances `Almacenes001Set`.
     * @returns A builder that constructs instances of entity type `Almacenes001Set`.
     */
    Almacenes001Set.builder = function () {
        return core_1.Entity.entityBuilder(Almacenes001Set);
    };
    /**
     * Returns a request builder to construct requests for operations on the `Almacenes001Set` entity type.
     * @returns A `Almacenes001Set` request builder.
     */
    Almacenes001Set.requestBuilder = function () {
        return new Almacenes001SetRequestBuilder_1.Almacenes001SetRequestBuilder();
    };
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `Almacenes001Set`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `Almacenes001Set`.
     */
    Almacenes001Set.customField = function (fieldName) {
        return core_1.Entity.customFieldSelector(fieldName, Almacenes001Set);
    };
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    Almacenes001Set.prototype.toJSON = function () {
        return __assign(__assign({}, this), this._customFields);
    };
    /**
     * Technical entity name for Almacenes001Set.
     */
    Almacenes001Set._entityName = 'Almacenes001Set';
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for Almacenes001Set.
     */
    Almacenes001Set._serviceName = 'Z_OD_SCP_CORE_0001_SRV';
    /**
     * Default url path for the according service.
     */
    Almacenes001Set._defaultServicePath = '/sap/opu/odata/sap/Z_OD_SCP_CORE_0001_SRV';
    return Almacenes001Set;
}(core_1.Entity));
exports.Almacenes001Set = Almacenes001Set;
(function (Almacenes001Set) {
    /**
     * Static representation of the [[werks]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    Almacenes001Set.WERKS = new core_1.StringField('Werks', Almacenes001Set, 'Edm.String');
    /**
     * Static representation of the [[lgort]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    Almacenes001Set.LGORT = new core_1.StringField('Lgort', Almacenes001Set, 'Edm.String');
    /**
     * Static representation of the [[lgobe]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    Almacenes001Set.LGOBE = new core_1.StringField('Lgobe', Almacenes001Set, 'Edm.String');
    /**
     * Static representation of the [[lfdnr]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    Almacenes001Set.LFDNR = new core_1.StringField('Lfdnr', Almacenes001Set, 'Edm.String');
    /**
     * All fields of the Almacenes001Set entity.
     */
    Almacenes001Set._allFields = [
        Almacenes001Set.WERKS,
        Almacenes001Set.LGORT,
        Almacenes001Set.LGOBE,
        Almacenes001Set.LFDNR
    ];
    /**
     * All fields selector.
     */
    Almacenes001Set.ALL_FIELDS = new core_1.AllFields('*', Almacenes001Set);
    /**
     * All key fields of the Almacenes001Set entity.
     */
    Almacenes001Set._keyFields = [Almacenes001Set.WERKS, Almacenes001Set.LGORT];
    /**
     * Mapping of all key field names to the respective static field property Almacenes001Set.
     */
    Almacenes001Set._keys = Almacenes001Set._keyFields.reduce(function (acc, field) {
        acc[field._fieldName] = field;
        return acc;
    }, {});
})(Almacenes001Set = exports.Almacenes001Set || (exports.Almacenes001Set = {}));
exports.Almacenes001Set = Almacenes001Set;
//# sourceMappingURL=Almacenes001Set.js.map