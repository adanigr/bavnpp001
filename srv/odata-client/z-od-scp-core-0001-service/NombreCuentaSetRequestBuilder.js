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
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
var NombreCuentaSet_1 = require("./NombreCuentaSet");
/**
 * Request builder class for operations supported on the [[NombreCuentaSet]] entity.
 */
var NombreCuentaSetRequestBuilder = /** @class */ (function (_super) {
    __extends(NombreCuentaSetRequestBuilder, _super);
    function NombreCuentaSetRequestBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns a request builder for retrieving one `NombreCuentaSet` entity based on its keys.
     * @param spras Key property. See [[NombreCuentaSet.spras]].
     * @param ktopl Key property. See [[NombreCuentaSet.ktopl]].
     * @param saknr Key property. See [[NombreCuentaSet.saknr]].
     * @returns A request builder for creating requests to retrieve one `NombreCuentaSet` entity based on its keys.
     */
    NombreCuentaSetRequestBuilder.prototype.getByKey = function (spras, ktopl, saknr) {
        return new core_1.GetByKeyRequestBuilder(NombreCuentaSet_1.NombreCuentaSet, {
            Spras: spras,
            Ktopl: ktopl,
            Saknr: saknr
        });
    };
    /**
     * Returns a request builder for querying all `NombreCuentaSet` entities.
     * @returns A request builder for creating requests to retrieve all `NombreCuentaSet` entities.
     */
    NombreCuentaSetRequestBuilder.prototype.getAll = function () {
        return new core_1.GetAllRequestBuilder(NombreCuentaSet_1.NombreCuentaSet);
    };
    return NombreCuentaSetRequestBuilder;
}(core_1.RequestBuilder));
exports.NombreCuentaSetRequestBuilder = NombreCuentaSetRequestBuilder;
//# sourceMappingURL=NombreCuentaSetRequestBuilder.js.map