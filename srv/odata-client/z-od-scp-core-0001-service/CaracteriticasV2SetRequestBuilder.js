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
var CaracteriticasV2Set_1 = require("./CaracteriticasV2Set");
/**
 * Request builder class for operations supported on the [[CaracteriticasV2Set]] entity.
 */
var CaracteriticasV2SetRequestBuilder = /** @class */ (function (_super) {
    __extends(CaracteriticasV2SetRequestBuilder, _super);
    function CaracteriticasV2SetRequestBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns a request builder for retrieving one `CaracteriticasV2Set` entity based on its keys.
     * @param caractname Key property. See [[CaracteriticasV2Set.caractname]].
     * @param caractvalcode Key property. See [[CaracteriticasV2Set.caractvalcode]].
     * @returns A request builder for creating requests to retrieve one `CaracteriticasV2Set` entity based on its keys.
     */
    CaracteriticasV2SetRequestBuilder.prototype.getByKey = function (caractname, caractvalcode) {
        return new core_1.GetByKeyRequestBuilder(CaracteriticasV2Set_1.CaracteriticasV2Set, {
            CARACTNAME: caractname,
            CARACTVALCODE: caractvalcode
        });
    };
    /**
     * Returns a request builder for querying all `CaracteriticasV2Set` entities.
     * @returns A request builder for creating requests to retrieve all `CaracteriticasV2Set` entities.
     */
    CaracteriticasV2SetRequestBuilder.prototype.getAll = function () {
        return new core_1.GetAllRequestBuilder(CaracteriticasV2Set_1.CaracteriticasV2Set);
    };
    return CaracteriticasV2SetRequestBuilder;
}(core_1.RequestBuilder));
exports.CaracteriticasV2SetRequestBuilder = CaracteriticasV2SetRequestBuilder;
//# sourceMappingURL=CaracteriticasV2SetRequestBuilder.js.map