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
exports.CancelFinDocSetRequestBuilder = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
var CancelFinDocSet_1 = require("./CancelFinDocSet");
/**
 * Request builder class for operations supported on the [[CancelFinDocSet]] entity.
 */
var CancelFinDocSetRequestBuilder = /** @class */ (function (_super) {
    __extends(CancelFinDocSetRequestBuilder, _super);
    function CancelFinDocSetRequestBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns a request builder for retrieving one `CancelFinDocSet` entity based on its keys.
     * @param idvehi Key property. See [[CancelFinDocSet.idvehi]].
     * @returns A request builder for creating requests to retrieve one `CancelFinDocSet` entity based on its keys.
     */
    CancelFinDocSetRequestBuilder.prototype.getByKey = function (idvehi) {
        return new core_1.GetByKeyRequestBuilder(CancelFinDocSet_1.CancelFinDocSet, { Idvehi: idvehi });
    };
    /**
     * Returns a request builder for querying all `CancelFinDocSet` entities.
     * @returns A request builder for creating requests to retrieve all `CancelFinDocSet` entities.
     */
    CancelFinDocSetRequestBuilder.prototype.getAll = function () {
        return new core_1.GetAllRequestBuilder(CancelFinDocSet_1.CancelFinDocSet);
    };
    /**
     * Returns a request builder for creating a `CancelFinDocSet` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `CancelFinDocSet`.
     */
    CancelFinDocSetRequestBuilder.prototype.create = function (entity) {
        return new core_1.CreateRequestBuilder(CancelFinDocSet_1.CancelFinDocSet, entity);
    };
    return CancelFinDocSetRequestBuilder;
}(core_1.RequestBuilder));
exports.CancelFinDocSetRequestBuilder = CancelFinDocSetRequestBuilder;
//# sourceMappingURL=CancelFinDocSetRequestBuilder.js.map