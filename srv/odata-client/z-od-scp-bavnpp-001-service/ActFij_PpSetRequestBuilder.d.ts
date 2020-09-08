import { RequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder } from '@sap-cloud-sdk/core';
import { ActFij_PpSet } from './ActFij_PpSet';
/**
 * Request builder class for operations supported on the [[ActFij_PpSet]] entity.
 */
export declare class ActFij_PpSetRequestBuilder extends RequestBuilder<ActFij_PpSet> {
    /**
     * Returns a request builder for retrieving one `ActFij_PpSet` entity based on its keys.
     * @param bukrs Key property. See [[ActFij_PpSet.bukrs]].
     * @param vin Key property. See [[ActFij_PpSet.vin]].
     * @returns A request builder for creating requests to retrieve one `ActFij_PpSet` entity based on its keys.
     */
    getByKey(bukrs: string, vin: string): GetByKeyRequestBuilder<ActFij_PpSet>;
    /**
     * Returns a request builder for querying all `ActFij_PpSet` entities.
     * @returns A request builder for creating requests to retrieve all `ActFij_PpSet` entities.
     */
    getAll(): GetAllRequestBuilder<ActFij_PpSet>;
}
//# sourceMappingURL=ActFij_PpSetRequestBuilder.d.ts.map