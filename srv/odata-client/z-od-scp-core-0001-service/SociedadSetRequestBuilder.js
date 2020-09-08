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
var SociedadSet_1 = require("./SociedadSet");
/**
 * Request builder class for operations supported on the [[SociedadSet]] entity.
 */
var SociedadSetRequestBuilder = /** @class */ (function (_super) {
    __extends(SociedadSetRequestBuilder, _super);
    function SociedadSetRequestBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns a request builder for retrieving one `SociedadSet` entity based on its keys.
     * @param bukrs Key property. See [[SociedadSet.bukrs]].
     * @returns A request builder for creating requests to retrieve one `SociedadSet` entity based on its keys.
     */
    SociedadSetRequestBuilder.prototype.getByKey = function (bukrs) {
        return new core_1.GetByKeyRequestBuilder(SociedadSet_1.SociedadSet, { Bukrs: bukrs });
    };
    /**
     * Returns a request builder for querying all `SociedadSet` entities.
     * @returns A request builder for creating requests to retrieve all `SociedadSet` entities.
     */
    SociedadSetRequestBuilder.prototype.getAll = function () {
        return new core_1.GetAllRequestBuilder(SociedadSet_1.SociedadSet);
    };
    return SociedadSetRequestBuilder;
}(core_1.RequestBuilder));
exports.SociedadSetRequestBuilder = SociedadSetRequestBuilder;
//# sourceMappingURL=SociedadSetRequestBuilder.js.map