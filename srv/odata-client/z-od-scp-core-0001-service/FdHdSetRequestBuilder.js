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
var FdHdSet_1 = require("./FdHdSet");
/**
 * Request builder class for operations supported on the [[FdHdSet]] entity.
 */
var FdHdSetRequestBuilder = /** @class */ (function (_super) {
    __extends(FdHdSetRequestBuilder, _super);
    function FdHdSetRequestBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns a request builder for retrieving one `FdHdSet` entity based on its keys.
     * @param bukrs Key property. See [[FdHdSet.bukrs]].
     * @param belnr Key property. See [[FdHdSet.belnr]].
     * @returns A request builder for creating requests to retrieve one `FdHdSet` entity based on its keys.
     */
    FdHdSetRequestBuilder.prototype.getByKey = function (bukrs, belnr) {
        return new core_1.GetByKeyRequestBuilder(FdHdSet_1.FdHdSet, {
            Bukrs: bukrs,
            Belnr: belnr
        });
    };
    /**
     * Returns a request builder for querying all `FdHdSet` entities.
     * @returns A request builder for creating requests to retrieve all `FdHdSet` entities.
     */
    FdHdSetRequestBuilder.prototype.getAll = function () {
        return new core_1.GetAllRequestBuilder(FdHdSet_1.FdHdSet);
    };
    return FdHdSetRequestBuilder;
}(core_1.RequestBuilder));
exports.FdHdSetRequestBuilder = FdHdSetRequestBuilder;
//# sourceMappingURL=FdHdSetRequestBuilder.js.map