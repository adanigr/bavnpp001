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
var CentrosSet_1 = require("./CentrosSet");
/**
 * Request builder class for operations supported on the [[CentrosSet]] entity.
 */
var CentrosSetRequestBuilder = /** @class */ (function (_super) {
    __extends(CentrosSetRequestBuilder, _super);
    function CentrosSetRequestBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns a request builder for retrieving one `CentrosSet` entity based on its keys.
     * @param bukrs Key property. See [[CentrosSet.bukrs]].
     * @param werks Key property. See [[CentrosSet.werks]].
     * @returns A request builder for creating requests to retrieve one `CentrosSet` entity based on its keys.
     */
    CentrosSetRequestBuilder.prototype.getByKey = function (bukrs, werks) {
        return new core_1.GetByKeyRequestBuilder(CentrosSet_1.CentrosSet, {
            Bukrs: bukrs,
            Werks: werks
        });
    };
    /**
     * Returns a request builder for querying all `CentrosSet` entities.
     * @returns A request builder for creating requests to retrieve all `CentrosSet` entities.
     */
    CentrosSetRequestBuilder.prototype.getAll = function () {
        return new core_1.GetAllRequestBuilder(CentrosSet_1.CentrosSet);
    };
    return CentrosSetRequestBuilder;
}(core_1.RequestBuilder));
exports.CentrosSetRequestBuilder = CentrosSetRequestBuilder;
//# sourceMappingURL=CentrosSetRequestBuilder.js.map