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
var TipoCambioSet_1 = require("./TipoCambioSet");
/**
 * Request builder class for operations supported on the [[TipoCambioSet]] entity.
 */
var TipoCambioSetRequestBuilder = /** @class */ (function (_super) {
    __extends(TipoCambioSetRequestBuilder, _super);
    function TipoCambioSetRequestBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns a request builder for retrieving one `TipoCambioSet` entity based on its keys.
     * @param kurst Key property. See [[TipoCambioSet.kurst]].
     * @param fcurr Key property. See [[TipoCambioSet.fcurr]].
     * @param tcurr Key property. See [[TipoCambioSet.tcurr]].
     * @param gdatu Key property. See [[TipoCambioSet.gdatu]].
     * @returns A request builder for creating requests to retrieve one `TipoCambioSet` entity based on its keys.
     */
    TipoCambioSetRequestBuilder.prototype.getByKey = function (kurst, fcurr, tcurr, gdatu) {
        return new core_1.GetByKeyRequestBuilder(TipoCambioSet_1.TipoCambioSet, {
            Kurst: kurst,
            Fcurr: fcurr,
            Tcurr: tcurr,
            Gdatu: gdatu
        });
    };
    /**
     * Returns a request builder for querying all `TipoCambioSet` entities.
     * @returns A request builder for creating requests to retrieve all `TipoCambioSet` entities.
     */
    TipoCambioSetRequestBuilder.prototype.getAll = function () {
        return new core_1.GetAllRequestBuilder(TipoCambioSet_1.TipoCambioSet);
    };
    return TipoCambioSetRequestBuilder;
}(core_1.RequestBuilder));
exports.TipoCambioSetRequestBuilder = TipoCambioSetRequestBuilder;
//# sourceMappingURL=TipoCambioSetRequestBuilder.js.map