import { RequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder } from '@sap-cloud-sdk/core';
import { FdItemsSet } from './FdItemsSet';
/**
 * Request builder class for operations supported on the [[FdItemsSet]] entity.
 */
export declare class FdItemsSetRequestBuilder extends RequestBuilder<FdItemsSet> {
    /**
     * Returns a request builder for retrieving one `FdItemsSet` entity based on its keys.
     * @param bukrs Key property. See [[FdItemsSet.bukrs]].
     * @param belnr Key property. See [[FdItemsSet.belnr]].
     * @param buzei Key property. See [[FdItemsSet.buzei]].
     * @param gjahr Key property. See [[FdItemsSet.gjahr]].
     * @returns A request builder for creating requests to retrieve one `FdItemsSet` entity based on its keys.
     */
    getByKey(bukrs: string, belnr: string, buzei: string, gjahr: string): GetByKeyRequestBuilder<FdItemsSet>;
    /**
     * Returns a request builder for querying all `FdItemsSet` entities.
     * @returns A request builder for creating requests to retrieve all `FdItemsSet` entities.
     */
    getAll(): GetAllRequestBuilder<FdItemsSet>;
}
//# sourceMappingURL=FdItemsSetRequestBuilder.d.ts.map