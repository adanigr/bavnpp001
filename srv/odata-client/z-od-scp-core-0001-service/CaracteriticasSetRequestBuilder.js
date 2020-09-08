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
var CaracteriticasSet_1 = require("./CaracteriticasSet");
/**
 * Request builder class for operations supported on the [[CaracteriticasSet]] entity.
 */
var CaracteriticasSetRequestBuilder = /** @class */ (function (_super) {
    __extends(CaracteriticasSetRequestBuilder, _super);
    function CaracteriticasSetRequestBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns a request builder for retrieving one `CaracteriticasSet` entity based on its keys.
     * @param charactname Key property. See [[CaracteriticasSet.charactname]].
     * @returns A request builder for creating requests to retrieve one `CaracteriticasSet` entity based on its keys.
     */
    CaracteriticasSetRequestBuilder.prototype.getByKey = function (charactname) {
        return new core_1.GetByKeyRequestBuilder(CaracteriticasSet_1.CaracteriticasSet, { Charactname: charactname });
    };
    /**
     * Returns a request builder for querying all `CaracteriticasSet` entities.
     * @returns A request builder for creating requests to retrieve all `CaracteriticasSet` entities.
     */
    CaracteriticasSetRequestBuilder.prototype.getAll = function () {
        return new core_1.GetAllRequestBuilder(CaracteriticasSet_1.CaracteriticasSet);
    };
    return CaracteriticasSetRequestBuilder;
}(core_1.RequestBuilder));
exports.CaracteriticasSetRequestBuilder = CaracteriticasSetRequestBuilder;
//# sourceMappingURL=CaracteriticasSetRequestBuilder.js.map