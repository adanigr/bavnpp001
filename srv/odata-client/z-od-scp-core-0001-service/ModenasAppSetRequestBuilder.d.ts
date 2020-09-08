import { RequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder } from '@sap-cloud-sdk/core';
import { ModenasAppSet } from './ModenasAppSet';
/**
 * Request builder class for operations supported on the [[ModenasAppSet]] entity.
 */
export declare class ModenasAppSetRequestBuilder extends RequestBuilder<ModenasAppSet> {
    /**
     * Returns a request builder for retrieving one `ModenasAppSet` entity based on its keys.
     * @param bukrs Key property. See [[ModenasAppSet.bukrs]].
     * @returns A request builder for creating requests to retrieve one `ModenasAppSet` entity based on its keys.
     */
    getByKey(bukrs: string): GetByKeyRequestBuilder<ModenasAppSet>;
    /**
     * Returns a request builder for querying all `ModenasAppSet` entities.
     * @returns A request builder for creating requests to retrieve all `ModenasAppSet` entities.
     */
    getAll(): GetAllRequestBuilder<ModenasAppSet>;
}
//# sourceMappingURL=ModenasAppSetRequestBuilder.d.ts.map