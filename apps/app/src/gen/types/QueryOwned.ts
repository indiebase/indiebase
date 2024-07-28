import type { ErrResponseSchema } from "./ErrResponseSchema";
import type { PaginatedResponseSchema } from "./PaginatedResponseSchema";
import type { OrgDto } from "./OrgDto";

 export type QueryOwnedQueryParams = {
    /**
     * @type number
    */
    pageIndex: number;
    /**
     * @type number
    */
    pageSize: number;
};
export type QueryOwnedHeaderParams = {
    /**
     * @description Indiebase Project ID. e.g. 4b3643f67affc66d. `indiebase_mgr` is a specific value for manager API
     * @default "indiebase_mgr"
     * @type string
    */
    "x-indiebase-reference-id": string;
    /**
     * @description Protect public APIs
     * @default "1711726948199;dev;057a041a310de100868068c2ab3b30dd"
     * @type string
    */
    "x-indiebase-ap": string;
};
export type QueryOwned200 = (PaginatedResponseSchema & {
    /**
     * @description Response paginated data list
     * @type array | undefined
    */
    body?: OrgDto[];
});
export type QueryOwned401 = ErrResponseSchema;
export type QueryOwned403 = ErrResponseSchema;
export type QueryOwned500 = ErrResponseSchema;
export type QueryOwnedQueryResponse = (PaginatedResponseSchema & {
    /**
     * @description Response paginated data list
     * @type array | undefined
    */
    body?: OrgDto[];
});
export type QueryOwnedQuery = {
    Response: QueryOwnedQueryResponse;
    QueryParams: QueryOwnedQueryParams;
    HeaderParams: QueryOwnedHeaderParams;
    Errors: QueryOwned401 | QueryOwned403 | QueryOwned500;
};