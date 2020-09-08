import { RequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder } from '@sap-cloud-sdk/core';
import { NombreCuentaSet } from './NombreCuentaSet';
/**
 * Request builder class for operations supported on the [[NombreCuentaSet]] entity.
 */
export declare class NombreCuentaSetRequestBuilder extends RequestBuilder<NombreCuentaSet> {
    /**
     * Returns a request builder for retrieving one `NombreCuentaSet` entity based on its keys.
     * @param spras Key property. See [[NombreCuentaSet.spras]].
     * @param ktopl Key property. See [[NombreCuentaSet.ktopl]].
     * @param saknr Key property. See [[NombreCuentaSet.saknr]].
     * @returns A request builder for creating requests to retrieve one `NombreCuentaSet` entity based on its keys.
     */
    getByKey(spras: string, ktopl: string, saknr: string): GetByKeyRequestBuilder<NombreCuentaSet>;
    /**
     * Returns a request builder for querying all `NombreCuentaSet` entities.
     * @returns A request builder for creating requests to retrieve all `NombreCuentaSet` entities.
     */
    getAll(): GetAllRequestBuilder<NombreCuentaSet>;
}
//# sourceMappingURL=NombreCuentaSetRequestBuilder.d.ts.map