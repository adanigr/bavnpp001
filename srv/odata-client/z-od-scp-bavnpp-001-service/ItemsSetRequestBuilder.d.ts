import { RequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder, CreateRequestBuilder } from '@sap-cloud-sdk/core';
import { ItemsSet } from './ItemsSet';
/**
 * Request builder class for operations supported on the [[ItemsSet]] entity.
 */
export declare class ItemsSetRequestBuilder extends RequestBuilder<ItemsSet> {
    /**
     * Returns a request builder for retrieving one `ItemsSet` entity based on its keys.
     * @param hdid Key property. See [[ItemsSet.hdid]].
     * @returns A request builder for creating requests to retrieve one `ItemsSet` entity based on its keys.
     */
    getByKey(hdid: string): GetByKeyRequestBuilder<ItemsSet>;
    /**
     * Returns a request builder for querying all `ItemsSet` entities.
     * @returns A request builder for creating requests to retrieve all `ItemsSet` entities.
     */
    getAll(): GetAllRequestBuilder<ItemsSet>;
    /**
     * Returns a request builder for creating a `ItemsSet` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `ItemsSet`.
     */
    create(entity: ItemsSet): CreateRequestBuilder<ItemsSet>;
}
//# sourceMappingURL=ItemsSetRequestBuilder.d.ts.map