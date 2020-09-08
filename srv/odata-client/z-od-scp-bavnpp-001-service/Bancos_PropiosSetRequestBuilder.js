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
exports.Bancos_PropiosSetRequestBuilder = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
var Bancos_PropiosSet_1 = require("./Bancos_PropiosSet");
/**
 * Request builder class for operations supported on the [[Bancos_PropiosSet]] entity.
 */
var Bancos_PropiosSetRequestBuilder = /** @class */ (function (_super) {
    __extends(Bancos_PropiosSetRequestBuilder, _super);
    function Bancos_PropiosSetRequestBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns a request builder for retrieving one `Bancos_PropiosSet` entity based on its keys.
     * @param bukrs Key property. See [[Bancos_PropiosSet.bukrs]].
     * @param hbkid Key property. See [[Bancos_PropiosSet.hbkid]].
     * @param hktid Key property. See [[Bancos_PropiosSet.hktid]].
     * @param waers Key property. See [[Bancos_PropiosSet.waers]].
     * @param gsber Key property. See [[Bancos_PropiosSet.gsber]].
     * @param zlsch Key property. See [[Bancos_PropiosSet.zlsch]].
     * @param bankl Key property. See [[Bancos_PropiosSet.bankl]].
     * @returns A request builder for creating requests to retrieve one `Bancos_PropiosSet` entity based on its keys.
     */
    Bancos_PropiosSetRequestBuilder.prototype.getByKey = function (bukrs, hbkid, hktid, waers, gsber, zlsch, bankl) {
        return new core_1.GetByKeyRequestBuilder(Bancos_PropiosSet_1.Bancos_PropiosSet, {
            Bukrs: bukrs,
            Hbkid: hbkid,
            Hktid: hktid,
            Waers: waers,
            Gsber: gsber,
            Zlsch: zlsch,
            Bankl: bankl
        });
    };
    /**
     * Returns a request builder for querying all `Bancos_PropiosSet` entities.
     * @returns A request builder for creating requests to retrieve all `Bancos_PropiosSet` entities.
     */
    Bancos_PropiosSetRequestBuilder.prototype.getAll = function () {
        return new core_1.GetAllRequestBuilder(Bancos_PropiosSet_1.Bancos_PropiosSet);
    };
    return Bancos_PropiosSetRequestBuilder;
}(core_1.RequestBuilder));
exports.Bancos_PropiosSetRequestBuilder = Bancos_PropiosSetRequestBuilder;
//# sourceMappingURL=Bancos_PropiosSetRequestBuilder.js.map