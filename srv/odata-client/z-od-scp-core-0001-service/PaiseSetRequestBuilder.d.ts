import { RequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder } from '@sap-cloud-sdk/core';
import { PaiseSet } from './PaiseSet';
/**
 * Request builder class for operations supported on the [[PaiseSet]] entity.
 */
export declare class PaiseSetRequestBuilder extends RequestBuilder<PaiseSet> {
    /**
     * Returns a request builder for retrieving one `PaiseSet` entity based on its keys.
     * @param spras Key property. See [[PaiseSet.spras]].
     * @param land1 Key property. See [[PaiseSet.land1]].
     * @returns A request builder for creating requests to retrieve one `PaiseSet` entity based on its keys.
     */
    getByKey(spras: string, land1: string): GetByKeyRequestBuilder<PaiseSet>;
    /**
     * Returns a request builder for querying all `PaiseSet` entities.
     * @returns A request builder for creating requests to retrieve all `PaiseSet` entities.
     */
    getAll(): GetAllRequestBuilder<PaiseSet>;
}
//# sourceMappingURL=PaiseSetRequestBuilder.d.ts.map