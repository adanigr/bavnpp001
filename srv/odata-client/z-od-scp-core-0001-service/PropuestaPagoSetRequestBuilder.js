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
var PropuestaPagoSet_1 = require("./PropuestaPagoSet");
/**
 * Request builder class for operations supported on the [[PropuestaPagoSet]] entity.
 */
var PropuestaPagoSetRequestBuilder = /** @class */ (function (_super) {
    __extends(PropuestaPagoSetRequestBuilder, _super);
    function PropuestaPagoSetRequestBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns a request builder for retrieving one `PropuestaPagoSet` entity based on its keys.
     * @param hbkid Key property. See [[PropuestaPagoSet.hbkid]].
     * @param zlsch Key property. See [[PropuestaPagoSet.zlsch]].
     * @param waers Key property. See [[PropuestaPagoSet.waers]].
     * @param gsber Key property. See [[PropuestaPagoSet.gsber]].
     * @param spras Key property. See [[PropuestaPagoSet.spras]].
     * @returns A request builder for creating requests to retrieve one `PropuestaPagoSet` entity based on its keys.
     */
    PropuestaPagoSetRequestBuilder.prototype.getByKey = function (hbkid, zlsch, waers, gsber, spras) {
        return new core_1.GetByKeyRequestBuilder(PropuestaPagoSet_1.PropuestaPagoSet, {
            Hbkid: hbkid,
            Zlsch: zlsch,
            Waers: waers,
            Gsber: gsber,
            Spras: spras
        });
    };
    /**
     * Returns a request builder for querying all `PropuestaPagoSet` entities.
     * @returns A request builder for creating requests to retrieve all `PropuestaPagoSet` entities.
     */
    PropuestaPagoSetRequestBuilder.prototype.getAll = function () {
        return new core_1.GetAllRequestBuilder(PropuestaPagoSet_1.PropuestaPagoSet);
    };
    return PropuestaPagoSetRequestBuilder;
}(core_1.RequestBuilder));
exports.PropuestaPagoSetRequestBuilder = PropuestaPagoSetRequestBuilder;
//# sourceMappingURL=PropuestaPagoSetRequestBuilder.js.map