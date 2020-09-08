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
exports.Bancos_ProveedorSetRequestBuilder = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
var Bancos_ProveedorSet_1 = require("./Bancos_ProveedorSet");
/**
 * Request builder class for operations supported on the [[Bancos_ProveedorSet]] entity.
 */
var Bancos_ProveedorSetRequestBuilder = /** @class */ (function (_super) {
    __extends(Bancos_ProveedorSetRequestBuilder, _super);
    function Bancos_ProveedorSetRequestBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns a request builder for retrieving one `Bancos_ProveedorSet` entity based on its keys.
     * @param partner Key property. See [[Bancos_ProveedorSet.partner]].
     * @param bkvid Key property. See [[Bancos_ProveedorSet.bkvid]].
     * @param bankl Key property. See [[Bancos_ProveedorSet.bankl]].
     * @returns A request builder for creating requests to retrieve one `Bancos_ProveedorSet` entity based on its keys.
     */
    Bancos_ProveedorSetRequestBuilder.prototype.getByKey = function (partner, bkvid, bankl) {
        return new core_1.GetByKeyRequestBuilder(Bancos_ProveedorSet_1.Bancos_ProveedorSet, {
            Partner: partner,
            Bkvid: bkvid,
            Bankl: bankl
        });
    };
    /**
     * Returns a request builder for querying all `Bancos_ProveedorSet` entities.
     * @returns A request builder for creating requests to retrieve all `Bancos_ProveedorSet` entities.
     */
    Bancos_ProveedorSetRequestBuilder.prototype.getAll = function () {
        return new core_1.GetAllRequestBuilder(Bancos_ProveedorSet_1.Bancos_ProveedorSet);
    };
    return Bancos_ProveedorSetRequestBuilder;
}(core_1.RequestBuilder));
exports.Bancos_ProveedorSetRequestBuilder = Bancos_ProveedorSetRequestBuilder;
//# sourceMappingURL=Bancos_ProveedorSetRequestBuilder.js.map