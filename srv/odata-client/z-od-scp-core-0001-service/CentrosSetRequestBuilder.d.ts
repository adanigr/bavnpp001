import { RequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder } from '@sap-cloud-sdk/core';
import { CentrosSet } from './CentrosSet';
/**
 * Request builder class for operations supported on the [[CentrosSet]] entity.
 */
export declare class CentrosSetRequestBuilder extends RequestBuilder<CentrosSet> {
    /**
     * Returns a request builder for retrieving one `CentrosSet` entity based on its keys.
     * @param bukrs Key property. See [[CentrosSet.bukrs]].
     * @param werks Key property. See [[CentrosSet.werks]].
     * @returns A request builder for creating requests to retrieve one `CentrosSet` entity based on its keys.
     */
    getByKey(bukrs: string, werks: string): GetByKeyRequestBuilder<CentrosSet>;
    /**
     * Returns a request builder for querying all `CentrosSet` entities.
     * @returns A request builder for creating requests to retrieve all `CentrosSet` entities.
     */
    getAll(): GetAllRequestBuilder<CentrosSet>;
}
//# sourceMappingURL=CentrosSetRequestBuilder.d.ts.map