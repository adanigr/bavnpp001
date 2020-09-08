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
exports.ActFij_PpSetRequestBuilder = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
var ActFij_PpSet_1 = require("./ActFij_PpSet");
/**
 * Request builder class for operations supported on the [[ActFij_PpSet]] entity.
 */
var ActFij_PpSetRequestBuilder = /** @class */ (function (_super) {
    __extends(ActFij_PpSetRequestBuilder, _super);
    function ActFij_PpSetRequestBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns a request builder for retrieving one `ActFij_PpSet` entity based on its keys.
     * @param bukrs Key property. See [[ActFij_PpSet.bukrs]].
     * @param vin Key property. See [[ActFij_PpSet.vin]].
     * @returns A request builder for creating requests to retrieve one `ActFij_PpSet` entity based on its keys.
     */
    ActFij_PpSetRequestBuilder.prototype.getByKey = function (bukrs, vin) {
        return new core_1.GetByKeyRequestBuilder(ActFij_PpSet_1.ActFij_PpSet, {
            Bukrs: bukrs,
            Vin: vin
        });
    };
    /**
     * Returns a request builder for querying all `ActFij_PpSet` entities.
     * @returns A request builder for creating requests to retrieve all `ActFij_PpSet` entities.
     */
    ActFij_PpSetRequestBuilder.prototype.getAll = function () {
        return new core_1.GetAllRequestBuilder(ActFij_PpSet_1.ActFij_PpSet);
    };
    return ActFij_PpSetRequestBuilder;
}(core_1.RequestBuilder));
exports.ActFij_PpSetRequestBuilder = ActFij_PpSetRequestBuilder;
//# sourceMappingURL=ActFij_PpSetRequestBuilder.js.map