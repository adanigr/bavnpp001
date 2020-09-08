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
exports.CreateFinDocSetRequestBuilder = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
var CreateFinDocSet_1 = require("./CreateFinDocSet");
/**
 * Request builder class for operations supported on the [[CreateFinDocSet]] entity.
 */
var CreateFinDocSetRequestBuilder = /** @class */ (function (_super) {
    __extends(CreateFinDocSetRequestBuilder, _super);
    function CreateFinDocSetRequestBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns a request builder for retrieving one `CreateFinDocSet` entity based on its keys.
     * @param hdid Key property. See [[CreateFinDocSet.hdid]].
     * @returns A request builder for creating requests to retrieve one `CreateFinDocSet` entity based on its keys.
     */
    CreateFinDocSetRequestBuilder.prototype.getByKey = function (hdid) {
        return new core_1.GetByKeyRequestBuilder(CreateFinDocSet_1.CreateFinDocSet, { Hdid: hdid });
    };
    /**
     * Returns a request builder for querying all `CreateFinDocSet` entities.
     * @returns A request builder for creating requests to retrieve all `CreateFinDocSet` entities.
     */
    CreateFinDocSetRequestBuilder.prototype.getAll = function () {
        return new core_1.GetAllRequestBuilder(CreateFinDocSet_1.CreateFinDocSet);
    };
    /**
     * Returns a request builder for creating a `CreateFinDocSet` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `CreateFinDocSet`.
     */
    CreateFinDocSetRequestBuilder.prototype.create = function (entity) {
        return new core_1.CreateRequestBuilder(CreateFinDocSet_1.CreateFinDocSet, entity);
    };
    return CreateFinDocSetRequestBuilder;
}(core_1.RequestBuilder));
exports.CreateFinDocSetRequestBuilder = CreateFinDocSetRequestBuilder;
//# sourceMappingURL=CreateFinDocSetRequestBuilder.js.map