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
var AlmacenesSet_1 = require("./AlmacenesSet");
/**
 * Request builder class for operations supported on the [[AlmacenesSet]] entity.
 */
var AlmacenesSetRequestBuilder = /** @class */ (function (_super) {
    __extends(AlmacenesSetRequestBuilder, _super);
    function AlmacenesSetRequestBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns a request builder for retrieving one `AlmacenesSet` entity based on its keys.
     * @param werks Key property. See [[AlmacenesSet.werks]].
     * @param lgort Key property. See [[AlmacenesSet.lgort]].
     * @returns A request builder for creating requests to retrieve one `AlmacenesSet` entity based on its keys.
     */
    AlmacenesSetRequestBuilder.prototype.getByKey = function (werks, lgort) {
        return new core_1.GetByKeyRequestBuilder(AlmacenesSet_1.AlmacenesSet, {
            Werks: werks,
            Lgort: lgort
        });
    };
    /**
     * Returns a request builder for querying all `AlmacenesSet` entities.
     * @returns A request builder for creating requests to retrieve all `AlmacenesSet` entities.
     */
    AlmacenesSetRequestBuilder.prototype.getAll = function () {
        return new core_1.GetAllRequestBuilder(AlmacenesSet_1.AlmacenesSet);
    };
    return AlmacenesSetRequestBuilder;
}(core_1.RequestBuilder));
exports.AlmacenesSetRequestBuilder = AlmacenesSetRequestBuilder;
//# sourceMappingURL=AlmacenesSetRequestBuilder.js.map