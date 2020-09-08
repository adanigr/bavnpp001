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
exports.InfoVtasSetRequestBuilder = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
var InfoVtasSet_1 = require("./InfoVtasSet");
/**
 * Request builder class for operations supported on the [[InfoVtasSet]] entity.
 */
var InfoVtasSetRequestBuilder = /** @class */ (function (_super) {
    __extends(InfoVtasSetRequestBuilder, _super);
    function InfoVtasSetRequestBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns a request builder for retrieving one `InfoVtasSet` entity based on its keys.
     * @param idvehi Key property. See [[InfoVtasSet.idvehi]].
     * @returns A request builder for creating requests to retrieve one `InfoVtasSet` entity based on its keys.
     */
    InfoVtasSetRequestBuilder.prototype.getByKey = function (idvehi) {
        return new core_1.GetByKeyRequestBuilder(InfoVtasSet_1.InfoVtasSet, { Idvehi: idvehi });
    };
    /**
     * Returns a request builder for querying all `InfoVtasSet` entities.
     * @returns A request builder for creating requests to retrieve all `InfoVtasSet` entities.
     */
    InfoVtasSetRequestBuilder.prototype.getAll = function () {
        return new core_1.GetAllRequestBuilder(InfoVtasSet_1.InfoVtasSet);
    };
    return InfoVtasSetRequestBuilder;
}(core_1.RequestBuilder));
exports.InfoVtasSetRequestBuilder = InfoVtasSetRequestBuilder;
//# sourceMappingURL=InfoVtasSetRequestBuilder.js.map