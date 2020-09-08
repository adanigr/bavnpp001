import { RequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder } from '@sap-cloud-sdk/core';
import { FdHdSet } from './FdHdSet';
/**
 * Request builder class for operations supported on the [[FdHdSet]] entity.
 */
export declare class FdHdSetRequestBuilder extends RequestBuilder<FdHdSet> {
    /**
     * Returns a request builder for retrieving one `FdHdSet` entity based on its keys.
     * @param bukrs Key property. See [[FdHdSet.bukrs]].
     * @param belnr Key property. See [[FdHdSet.belnr]].
     * @returns A request builder for creating requests to retrieve one `FdHdSet` entity based on its keys.
     */
    getByKey(bukrs: string, belnr: string): GetByKeyRequestBuilder<FdHdSet>;
    /**
     * Returns a request builder for querying all `FdHdSet` entities.
     * @returns A request builder for creating requests to retrieve all `FdHdSet` entities.
     */
    getAll(): GetAllRequestBuilder<FdHdSet>;
}
//# sourceMappingURL=FdHdSetRequestBuilder.d.ts.map