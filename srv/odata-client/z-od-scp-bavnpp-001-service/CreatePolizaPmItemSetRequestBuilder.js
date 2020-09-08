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
exports.CreatePolizaPmItemSetRequestBuilder = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
var CreatePolizaPmItemSet_1 = require("./CreatePolizaPmItemSet");
/**
 * Request builder class for operations supported on the [[CreatePolizaPmItemSet]] entity.
 */
var CreatePolizaPmItemSetRequestBuilder = /** @class */ (function (_super) {
    __extends(CreatePolizaPmItemSetRequestBuilder, _super);
    function CreatePolizaPmItemSetRequestBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns a request builder for retrieving one `CreatePolizaPmItemSet` entity based on its keys.
     * @param hdid Key property. See [[CreatePolizaPmItemSet.hdid]].
     * @returns A request builder for creating requests to retrieve one `CreatePolizaPmItemSet` entity based on its keys.
     */
    CreatePolizaPmItemSetRequestBuilder.prototype.getByKey = function (hdid) {
        return new core_1.GetByKeyRequestBuilder(CreatePolizaPmItemSet_1.CreatePolizaPmItemSet, { Hdid: hdid });
    };
    /**
     * Returns a request builder for querying all `CreatePolizaPmItemSet` entities.
     * @returns A request builder for creating requests to retrieve all `CreatePolizaPmItemSet` entities.
     */
    CreatePolizaPmItemSetRequestBuilder.prototype.getAll = function () {
        return new core_1.GetAllRequestBuilder(CreatePolizaPmItemSet_1.CreatePolizaPmItemSet);
    };
    /**
     * Returns a request builder for creating a `CreatePolizaPmItemSet` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `CreatePolizaPmItemSet`.
     */
    CreatePolizaPmItemSetRequestBuilder.prototype.create = function (entity) {
        return new core_1.CreateRequestBuilder(CreatePolizaPmItemSet_1.CreatePolizaPmItemSet, entity);
    };
    return CreatePolizaPmItemSetRequestBuilder;
}(core_1.RequestBuilder));
exports.CreatePolizaPmItemSetRequestBuilder = CreatePolizaPmItemSetRequestBuilder;
//# sourceMappingURL=CreatePolizaPmItemSetRequestBuilder.js.map