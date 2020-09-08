import { RequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder } from '@sap-cloud-sdk/core';
import { CancelFinDocSet } from './CancelFinDocSet';
/**
 * Request builder class for operations supported on the [[CancelFinDocSet]] entity.
 */
export declare class CancelFinDocSetRequestBuilder extends RequestBuilder<CancelFinDocSet> {
    /**
     * Returns a request builder for retrieving one `CancelFinDocSet` entity based on its keys.
     * @param idvehi Key property. See [[CancelFinDocSet.idvehi]].
     * @returns A request builder for creating requests to retrieve one `CancelFinDocSet` entity based on its keys.
     */
    getByKey(idvehi: string): GetByKeyRequestBuilder<CancelFinDocSet>;
    /**
     * Returns a request builder for querying all `CancelFinDocSet` entities.
     * @returns A request builder for creating requests to retrieve all `CancelFinDocSet` entities.
     */
    getAll(): GetAllRequestBuilder<CancelFinDocSet>;
    /**
     * Returns a request builder for creating a `CancelFinDocSet` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `CancelFinDocSet`.
     */
    create(entity: CancelFinDocSet): CreateRequestBuilder<CancelFinDocSet>;
}
//# sourceMappingURL=CancelFinDocSetRequestBuilder.d.ts.map