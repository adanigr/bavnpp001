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
exports.ItemsSetRequestBuilder = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
var ItemsSet_1 = require("./ItemsSet");
/**
 * Request builder class for operations supported on the [[ItemsSet]] entity.
 */
var ItemsSetRequestBuilder = /** @class */ (function (_super) {
    __extends(ItemsSetRequestBuilder, _super);
    function ItemsSetRequestBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns a request builder for retrieving one `ItemsSet` entity based on its keys.
     * @param hdid Key property. See [[ItemsSet.hdid]].
     * @returns A request builder for creating requests to retrieve one `ItemsSet` entity based on its keys.
     */
    ItemsSetRequestBuilder.prototype.getByKey = function (hdid) {
        return new core_1.GetByKeyRequestBuilder(ItemsSet_1.ItemsSet, { Hdid: hdid });
    };
    /**
     * Returns a request builder for querying all `ItemsSet` entities.
     * @returns A request builder for creating requests to retrieve all `ItemsSet` entities.
     */
    ItemsSetRequestBuilder.prototype.getAll = function () {
        return new core_1.GetAllRequestBuilder(ItemsSet_1.ItemsSet);
    };
    /**
     * Returns a request builder for creating a `ItemsSet` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `ItemsSet`.
     */
    ItemsSetRequestBuilder.prototype.create = function (entity) {
        return new core_1.CreateRequestBuilder(ItemsSet_1.ItemsSet, entity);
    };
    return ItemsSetRequestBuilder;
}(core_1.RequestBuilder));
exports.ItemsSetRequestBuilder = ItemsSetRequestBuilder;
//# sourceMappingURL=ItemsSetRequestBuilder.js.map