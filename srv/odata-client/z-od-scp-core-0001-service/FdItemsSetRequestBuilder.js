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
var FdItemsSet_1 = require("./FdItemsSet");
/**
 * Request builder class for operations supported on the [[FdItemsSet]] entity.
 */
var FdItemsSetRequestBuilder = /** @class */ (function (_super) {
    __extends(FdItemsSetRequestBuilder, _super);
    function FdItemsSetRequestBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns a request builder for retrieving one `FdItemsSet` entity based on its keys.
     * @param bukrs Key property. See [[FdItemsSet.bukrs]].
     * @param belnr Key property. See [[FdItemsSet.belnr]].
     * @param buzei Key property. See [[FdItemsSet.buzei]].
     * @param gjahr Key property. See [[FdItemsSet.gjahr]].
     * @returns A request builder for creating requests to retrieve one `FdItemsSet` entity based on its keys.
     */
    FdItemsSetRequestBuilder.prototype.getByKey = function (bukrs, belnr, buzei, gjahr) {
        return new core_1.GetByKeyRequestBuilder(FdItemsSet_1.FdItemsSet, {
            Bukrs: bukrs,
            Belnr: belnr,
            Buzei: buzei,
            Gjahr: gjahr
        });
    };
    /**
     * Returns a request builder for querying all `FdItemsSet` entities.
     * @returns A request builder for creating requests to retrieve all `FdItemsSet` entities.
     */
    FdItemsSetRequestBuilder.prototype.getAll = function () {
        return new core_1.GetAllRequestBuilder(FdItemsSet_1.FdItemsSet);
    };
    return FdItemsSetRequestBuilder;
}(core_1.RequestBuilder));
exports.FdItemsSetRequestBuilder = FdItemsSetRequestBuilder;
//# sourceMappingURL=FdItemsSetRequestBuilder.js.map