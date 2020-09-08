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
var Segmentos001Set_1 = require("./Segmentos001Set");
/**
 * Request builder class for operations supported on the [[Segmentos001Set]] entity.
 */
var Segmentos001SetRequestBuilder = /** @class */ (function (_super) {
    __extends(Segmentos001SetRequestBuilder, _super);
    function Segmentos001SetRequestBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns a request builder for retrieving one `Segmentos001Set` entity based on its keys.
     * @param werks Key property. See [[Segmentos001Set.werks]].
     * @param matnr Key property. See [[Segmentos001Set.matnr]].
     * @param segment Key property. See [[Segmentos001Set.segment]].
     * @returns A request builder for creating requests to retrieve one `Segmentos001Set` entity based on its keys.
     */
    Segmentos001SetRequestBuilder.prototype.getByKey = function (werks, matnr, segment) {
        return new core_1.GetByKeyRequestBuilder(Segmentos001Set_1.Segmentos001Set, {
            Werks: werks,
            Matnr: matnr,
            Segment: segment
        });
    };
    /**
     * Returns a request builder for querying all `Segmentos001Set` entities.
     * @returns A request builder for creating requests to retrieve all `Segmentos001Set` entities.
     */
    Segmentos001SetRequestBuilder.prototype.getAll = function () {
        return new core_1.GetAllRequestBuilder(Segmentos001Set_1.Segmentos001Set);
    };
    return Segmentos001SetRequestBuilder;
}(core_1.RequestBuilder));
exports.Segmentos001SetRequestBuilder = Segmentos001SetRequestBuilder;
//# sourceMappingURL=Segmentos001SetRequestBuilder.js.map