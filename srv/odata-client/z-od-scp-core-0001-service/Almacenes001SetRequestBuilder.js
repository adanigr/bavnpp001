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
var Almacenes001Set_1 = require("./Almacenes001Set");
/**
 * Request builder class for operations supported on the [[Almacenes001Set]] entity.
 */
var Almacenes001SetRequestBuilder = /** @class */ (function (_super) {
    __extends(Almacenes001SetRequestBuilder, _super);
    function Almacenes001SetRequestBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns a request builder for retrieving one `Almacenes001Set` entity based on its keys.
     * @param werks Key property. See [[Almacenes001Set.werks]].
     * @param lgort Key property. See [[Almacenes001Set.lgort]].
     * @returns A request builder for creating requests to retrieve one `Almacenes001Set` entity based on its keys.
     */
    Almacenes001SetRequestBuilder.prototype.getByKey = function (werks, lgort) {
        return new core_1.GetByKeyRequestBuilder(Almacenes001Set_1.Almacenes001Set, {
            Werks: werks,
            Lgort: lgort
        });
    };
    /**
     * Returns a request builder for querying all `Almacenes001Set` entities.
     * @returns A request builder for creating requests to retrieve all `Almacenes001Set` entities.
     */
    Almacenes001SetRequestBuilder.prototype.getAll = function () {
        return new core_1.GetAllRequestBuilder(Almacenes001Set_1.Almacenes001Set);
    };
    return Almacenes001SetRequestBuilder;
}(core_1.RequestBuilder));
exports.Almacenes001SetRequestBuilder = Almacenes001SetRequestBuilder;
//# sourceMappingURL=Almacenes001SetRequestBuilder.js.map