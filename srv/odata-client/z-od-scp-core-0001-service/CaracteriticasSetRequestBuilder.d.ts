import { RequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder } from '@sap-cloud-sdk/core';
import { CaracteriticasSet } from './CaracteriticasSet';
/**
 * Request builder class for operations supported on the [[CaracteriticasSet]] entity.
 */
export declare class CaracteriticasSetRequestBuilder extends RequestBuilder<CaracteriticasSet> {
    /**
     * Returns a request builder for retrieving one `CaracteriticasSet` entity based on its keys.
     * @param charactname Key property. See [[CaracteriticasSet.charactname]].
     * @returns A request builder for creating requests to retrieve one `CaracteriticasSet` entity based on its keys.
     */
    getByKey(charactname: string): GetByKeyRequestBuilder<CaracteriticasSet>;
    /**
     * Returns a request builder for querying all `CaracteriticasSet` entities.
     * @returns A request builder for creating requests to retrieve all `CaracteriticasSet` entities.
     */
    getAll(): GetAllRequestBuilder<CaracteriticasSet>;
}
//# sourceMappingURL=CaracteriticasSetRequestBuilder.d.ts.map