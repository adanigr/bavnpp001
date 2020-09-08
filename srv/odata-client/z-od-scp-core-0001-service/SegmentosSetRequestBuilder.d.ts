import { RequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder } from '@sap-cloud-sdk/core';
import { SegmentosSet } from './SegmentosSet';
/**
 * Request builder class for operations supported on the [[SegmentosSet]] entity.
 */
export declare class SegmentosSetRequestBuilder extends RequestBuilder<SegmentosSet> {
    /**
     * Returns a request builder for retrieving one `SegmentosSet` entity based on its keys.
     * @param werks Key property. See [[SegmentosSet.werks]].
     * @param segment Key property. See [[SegmentosSet.segment]].
     * @returns A request builder for creating requests to retrieve one `SegmentosSet` entity based on its keys.
     */
    getByKey(werks: string, segment: string): GetByKeyRequestBuilder<SegmentosSet>;
    /**
     * Returns a request builder for querying all `SegmentosSet` entities.
     * @returns A request builder for creating requests to retrieve all `SegmentosSet` entities.
     */
    getAll(): GetAllRequestBuilder<SegmentosSet>;
}
//# sourceMappingURL=SegmentosSetRequestBuilder.d.ts.map