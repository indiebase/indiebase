import type { ErrResponseSchema } from "./ErrResponseSchema";
import type { PaginatedResponseSchema } from "./PaginatedResponseSchema";
import type { OrgDto } from "./OrgDto";

 export type QueryPathParams = {
    org: any;
};
export type QueryHeaderParams = {
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
export type Query200 = (PaginatedResponseSchema & {
    /**
     * @description Response paginated data list
     * @type array | undefined
    */
    body?: OrgDto[];
});
export type Query401 = ErrResponseSchema;
export type Query403 = ErrResponseSchema;
export type Query500 = ErrResponseSchema;
export type QueryQueryResponse = (PaginatedResponseSchema & {
    /**
     * @description Response paginated data list
     * @type array | undefined
    */
    body?: OrgDto[];
});
export type QueryQuery = {
    Response: QueryQueryResponse;
    PathParams: QueryPathParams;
    HeaderParams: QueryHeaderParams;
    Errors: Query401 | Query403 | Query500;
};