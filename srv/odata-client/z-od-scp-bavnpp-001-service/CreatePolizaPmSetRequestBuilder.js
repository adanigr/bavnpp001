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
exports.CreatePolizaPmSetRequestBuilder = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
var CreatePolizaPmSet_1 = require("./CreatePolizaPmSet");
/**
 * Request builder class for operations supported on the [[CreatePolizaPmSet]] entity.
 */
var CreatePolizaPmSetRequestBuilder = /** @class */ (function (_super) {
    __extends(CreatePolizaPmSetRequestBuilder, _super);
    function CreatePolizaPmSetRequestBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns a request builder for retrieving one `CreatePolizaPmSet` entity based on its keys.
     * @param hdtext Key property. See [[CreatePolizaPmSet.hdtext]].
     * @returns A request builder for creating requests to retrieve one `CreatePolizaPmSet` entity based on its keys.
     */
    CreatePolizaPmSetRequestBuilder.prototype.getByKey = function (hdtext) {
        return new core_1.GetByKeyRequestBuilder(CreatePolizaPmSet_1.CreatePolizaPmSet, { Hdtext: hdtext });
    };
    /**
     * Returns a request builder for querying all `CreatePolizaPmSet` entities.
     * @returns A request builder for creating requests to retrieve all `CreatePolizaPmSet` entities.
     */
    CreatePolizaPmSetRequestBuilder.prototype.getAll = function () {
        return new core_1.GetAllRequestBuilder(CreatePolizaPmSet_1.CreatePolizaPmSet);
    };
    /**
     * Returns a request builder for creating a `CreatePolizaPmSet` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `CreatePolizaPmSet`.
     */
    CreatePolizaPmSetRequestBuilder.prototype.create = function (entity) {
        return new core_1.CreateRequestBuilder(CreatePolizaPmSet_1.CreatePolizaPmSet, entity);
    };
    return CreatePolizaPmSetRequestBuilder;
}(core_1.RequestBuilder));
exports.CreatePolizaPmSetRequestBuilder = CreatePolizaPmSetRequestBuilder;
//# sourceMappingURL=CreatePolizaPmSetRequestBuilder.js.map