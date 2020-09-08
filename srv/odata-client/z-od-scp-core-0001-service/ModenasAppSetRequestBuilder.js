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
var ModenasAppSet_1 = require("./ModenasAppSet");
/**
 * Request builder class for operations supported on the [[ModenasAppSet]] entity.
 */
var ModenasAppSetRequestBuilder = /** @class */ (function (_super) {
    __extends(ModenasAppSetRequestBuilder, _super);
    function ModenasAppSetRequestBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns a request builder for retrieving one `ModenasAppSet` entity based on its keys.
     * @param bukrs Key property. See [[ModenasAppSet.bukrs]].
     * @returns A request builder for creating requests to retrieve one `ModenasAppSet` entity based on its keys.
     */
    ModenasAppSetRequestBuilder.prototype.getByKey = function (bukrs) {
        return new core_1.GetByKeyRequestBuilder(ModenasAppSet_1.ModenasAppSet, { Bukrs: bukrs });
    };
    /**
     * Returns a request builder for querying all `ModenasAppSet` entities.
     * @returns A request builder for creating requests to retrieve all `ModenasAppSet` entities.
     */
    ModenasAppSetRequestBuilder.prototype.getAll = function () {
        return new core_1.GetAllRequestBuilder(ModenasAppSet_1.ModenasAppSet);
    };
    return ModenasAppSetRequestBuilder;
}(core_1.RequestBuilder));
exports.ModenasAppSetRequestBuilder = ModenasAppSetRequestBuilder;
//# sourceMappingURL=ModenasAppSetRequestBuilder.js.map