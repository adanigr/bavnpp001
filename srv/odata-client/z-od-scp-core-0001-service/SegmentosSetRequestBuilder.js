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
var SegmentosSet_1 = require("./SegmentosSet");
/**
 * Request builder class for operations supported on the [[SegmentosSet]] entity.
 */
var SegmentosSetRequestBuilder = /** @class */ (function (_super) {
    __extends(SegmentosSetRequestBuilder, _super);
    function SegmentosSetRequestBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns a request builder for retrieving one `SegmentosSet` entity based on its keys.
     * @param werks Key property. See [[SegmentosSet.werks]].
     * @param segment Key property. See [[SegmentosSet.segment]].
     * @returns A request builder for creating requests to retrieve one `SegmentosSet` entity based on its keys.
     */
    SegmentosSetRequestBuilder.prototype.getByKey = function (werks, segment) {
        return new core_1.GetByKeyRequestBuilder(SegmentosSet_1.SegmentosSet, {
            Werks: werks,
            Segment: segment
        });
    };
    /**
     * Returns a request builder for querying all `SegmentosSet` entities.
     * @returns A request builder for creating requests to retrieve all `SegmentosSet` entities.
     */
    SegmentosSetRequestBuilder.prototype.getAll = function () {
        return new core_1.GetAllRequestBuilder(SegmentosSet_1.SegmentosSet);
    };
    return SegmentosSetRequestBuilder;
}(core_1.RequestBuilder));
exports.SegmentosSetRequestBuilder = SegmentosSetRequestBuilder;
//# sourceMappingURL=SegmentosSetRequestBuilder.js.map