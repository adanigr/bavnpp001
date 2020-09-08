import { RequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder } from '@sap-cloud-sdk/core';
import { SociedadSet } from './SociedadSet';
/**
 * Request builder class for operations supported on the [[SociedadSet]] entity.
 */
export declare class SociedadSetRequestBuilder extends RequestBuilder<SociedadSet> {
    /**
     * Returns a request builder for retrieving one `SociedadSet` entity based on its keys.
     * @param bukrs Key property. See [[SociedadSet.bukrs]].
     * @returns A request builder for creating requests to retrieve one `SociedadSet` entity based on its keys.
     */
    getByKey(bukrs: string): GetByKeyRequestBuilder<SociedadSet>;
    /**
     * Returns a request builder for querying all `SociedadSet` entities.
     * @returns A request builder for creating requests to retrieve all `SociedadSet` entities.
     */
    getAll(): GetAllRequestBuilder<SociedadSet>;
}
//# sourceMappingURL=SociedadSetRequestBuilder.d.ts.map