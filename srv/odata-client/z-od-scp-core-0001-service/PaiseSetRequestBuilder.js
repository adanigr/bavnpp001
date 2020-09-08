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
var PaiseSet_1 = require("./PaiseSet");
/**
 * Request builder class for operations supported on the [[PaiseSet]] entity.
 */
var PaiseSetRequestBuilder = /** @class */ (function (_super) {
    __extends(PaiseSetRequestBuilder, _super);
    function PaiseSetRequestBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns a request builder for retrieving one `PaiseSet` entity based on its keys.
     * @param spras Key property. See [[PaiseSet.spras]].
     * @param land1 Key property. See [[PaiseSet.land1]].
     * @returns A request builder for creating requests to retrieve one `PaiseSet` entity based on its keys.
     */
    PaiseSetRequestBuilder.prototype.getByKey = function (spras, land1) {
        return new core_1.GetByKeyRequestBuilder(PaiseSet_1.PaiseSet, {
            Spras: spras,
            Land1: land1
        });
    };
    /**
     * Returns a request builder for querying all `PaiseSet` entities.
     * @returns A request builder for creating requests to retrieve all `PaiseSet` entities.
     */
    PaiseSetRequestBuilder.prototype.getAll = function () {
        return new core_1.GetAllRequestBuilder(PaiseSet_1.PaiseSet);
    };
    return PaiseSetRequestBuilder;
}(core_1.RequestBuilder));
exports.PaiseSetRequestBuilder = PaiseSetRequestBuilder;
//# sourceMappingURL=PaiseSetRequestBuilder.js.map