import { RequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder } from '@sap-cloud-sdk/core';
import { AlmacenesSet } from './AlmacenesSet';
/**
 * Request builder class for operations supported on the [[AlmacenesSet]] entity.
 */
export declare class AlmacenesSetRequestBuilder extends RequestBuilder<AlmacenesSet> {
    /**
     * Returns a request builder for retrieving one `AlmacenesSet` entity based on its keys.
     * @param werks Key property. See [[AlmacenesSet.werks]].
     * @param lgort Key property. See [[AlmacenesSet.lgort]].
     * @returns A request builder for creating requests to retrieve one `AlmacenesSet` entity based on its keys.
     */
    getByKey(werks: string, lgort: string): GetByKeyRequestBuilder<AlmacenesSet>;
    /**
     * Returns a request builder for querying all `AlmacenesSet` entities.
     * @returns A request builder for creating requests to retrieve all `AlmacenesSet` entities.
     */
    getAll(): GetAllRequestBuilder<AlmacenesSet>;
}
//# sourceMappingURL=AlmacenesSetRequestBuilder.d.ts.map