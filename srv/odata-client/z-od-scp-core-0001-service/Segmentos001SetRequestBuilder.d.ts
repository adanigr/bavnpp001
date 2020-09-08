import { RequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder } from '@sap-cloud-sdk/core';
import { Segmentos001Set } from './Segmentos001Set';
/**
 * Request builder class for operations supported on the [[Segmentos001Set]] entity.
 */
export declare class Segmentos001SetRequestBuilder extends RequestBuilder<Segmentos001Set> {
    /**
     * Returns a request builder for retrieving one `Segmentos001Set` entity based on its keys.
     * @param werks Key property. See [[Segmentos001Set.werks]].
     * @param matnr Key property. See [[Segmentos001Set.matnr]].
     * @param segment Key property. See [[Segmentos001Set.segment]].
     * @returns A request builder for creating requests to retrieve one `Segmentos001Set` entity based on its keys.
     */
    getByKey(werks: string, matnr: string, segment: string): GetByKeyRequestBuilder<Segmentos001Set>;
    /**
     * Returns a request builder for querying all `Segmentos001Set` entities.
     * @returns A request builder for creating requests to retrieve all `Segmentos001Set` entities.
     */
    getAll(): GetAllRequestBuilder<Segmentos001Set>;
}
//# sourceMappingURL=Segmentos001SetRequestBuilder.d.ts.map