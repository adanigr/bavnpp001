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
exports.RetSetRequestBuilder = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
var RetSet_1 = require("./RetSet");
/**
 * Request builder class for operations supported on the [[RetSet]] entity.
 */
var RetSetRequestBuilder = /** @class */ (function (_super) {
    __extends(RetSetRequestBuilder, _super);
    function RetSetRequestBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns a request builder for retrieving one `RetSet` entity based on its keys.
     * @param hdId Key property. See [[RetSet.hdId]].
     * @returns A request builder for creating requests to retrieve one `RetSet` entity based on its keys.
     */
    RetSetRequestBuilder.prototype.getByKey = function (hdId) {
        return new core_1.GetByKeyRequestBuilder(RetSet_1.RetSet, { HdId: hdId });
    };
    /**
     * Returns a request builder for querying all `RetSet` entities.
     * @returns A request builder for creating requests to retrieve all `RetSet` entities.
     */
    RetSetRequestBuilder.prototype.getAll = function () {
        return new core_1.GetAllRequestBuilder(RetSet_1.RetSet);
    };
    /**
     * Returns a request builder for creating a `RetSet` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `RetSet`.
     */
    RetSetRequestBuilder.prototype.create = function (entity) {
        return new core_1.CreateRequestBuilder(RetSet_1.RetSet, entity);
    };
    return RetSetRequestBuilder;
}(core_1.RequestBuilder));
exports.RetSetRequestBuilder = RetSetRequestBuilder;
//# sourceMappingURL=RetSetRequestBuilder.js.map