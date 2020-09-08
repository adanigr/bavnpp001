import { RequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder } from '@sap-cloud-sdk/core';
import { RetSet } from './RetSet';
/**
 * Request builder class for operations supported on the [[RetSet]] entity.
 */
export declare class RetSetRequestBuilder extends RequestBuilder<RetSet> {
    /**
     * Returns a request builder for retrieving one `RetSet` entity based on its keys.
     * @param hdId Key property. See [[RetSet.hdId]].
     * @returns A request builder for creating requests to retrieve one `RetSet` entity based on its keys.
     */
    getByKey(hdId: string): GetByKeyRequestBuilder<RetSet>;
    /**
     * Returns a request builder for querying all `RetSet` entities.
     * @returns A request builder for creating requests to retrieve all `RetSet` entities.
     */
    getAll(): GetAllRequestBuilder<RetSet>;
    /**
     * Returns a request builder for creating a `RetSet` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `RetSet`.
     */
    create(entity: RetSet): CreateRequestBuilder<RetSet>;
}
//# sourceMappingURL=RetSetRequestBuilder.d.ts.map