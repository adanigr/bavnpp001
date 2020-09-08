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
var UpdtVinMatriculaSet_1 = require("./UpdtVinMatriculaSet");
/**
 * Request builder class for operations supported on the [[UpdtVinMatriculaSet]] entity.
 */
var UpdtVinMatriculaSetRequestBuilder = /** @class */ (function (_super) {
    __extends(UpdtVinMatriculaSetRequestBuilder, _super);
    function UpdtVinMatriculaSetRequestBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns a request builder for retrieving one `UpdtVinMatriculaSet` entity based on its keys.
     * @param idvehi Key property. See [[UpdtVinMatriculaSet.idvehi]].
     * @returns A request builder for creating requests to retrieve one `UpdtVinMatriculaSet` entity based on its keys.
     */
    UpdtVinMatriculaSetRequestBuilder.prototype.getByKey = function (idvehi) {
        return new core_1.GetByKeyRequestBuilder(UpdtVinMatriculaSet_1.UpdtVinMatriculaSet, { Idvehi: idvehi });
    };
    /**
     * Returns a request builder for querying all `UpdtVinMatriculaSet` entities.
     * @returns A request builder for creating requests to retrieve all `UpdtVinMatriculaSet` entities.
     */
    UpdtVinMatriculaSetRequestBuilder.prototype.getAll = function () {
        return new core_1.GetAllRequestBuilder(UpdtVinMatriculaSet_1.UpdtVinMatriculaSet);
    };
    /**
     * Returns a request builder for creating a `UpdtVinMatriculaSet` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `UpdtVinMatriculaSet`.
     */
    UpdtVinMatriculaSetRequestBuilder.prototype.create = function (entity) {
        return new core_1.CreateRequestBuilder(UpdtVinMatriculaSet_1.UpdtVinMatriculaSet, entity);
    };
    return UpdtVinMatriculaSetRequestBuilder;
}(core_1.RequestBuilder));
exports.UpdtVinMatriculaSetRequestBuilder = UpdtVinMatriculaSetRequestBuilder;
//# sourceMappingURL=UpdtVinMatriculaSetRequestBuilder.js.map