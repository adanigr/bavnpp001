import { RequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder } from '@sap-cloud-sdk/core';
import { PropuestaPagoSet } from './PropuestaPagoSet';
/**
 * Request builder class for operations supported on the [[PropuestaPagoSet]] entity.
 */
export declare class PropuestaPagoSetRequestBuilder extends RequestBuilder<PropuestaPagoSet> {
    /**
     * Returns a request builder for retrieving one `PropuestaPagoSet` entity based on its keys.
     * @param hbkid Key property. See [[PropuestaPagoSet.hbkid]].
     * @param zlsch Key property. See [[PropuestaPagoSet.zlsch]].
     * @param waers Key property. See [[PropuestaPagoSet.waers]].
     * @param gsber Key property. See [[PropuestaPagoSet.gsber]].
     * @param spras Key property. See [[PropuestaPagoSet.spras]].
     * @returns A request builder for creating requests to retrieve one `PropuestaPagoSet` entity based on its keys.
     */
    getByKey(hbkid: string, zlsch: string, waers: string, gsber: string, spras: string): GetByKeyRequestBuilder<PropuestaPagoSet>;
    /**
     * Returns a request builder for querying all `PropuestaPagoSet` entities.
     * @returns A request builder for creating requests to retrieve all `PropuestaPagoSet` entities.
     */
    getAll(): GetAllRequestBuilder<PropuestaPagoSet>;
}
//# sourceMappingURL=PropuestaPagoSetRequestBuilder.d.ts.map