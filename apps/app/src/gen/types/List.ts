import type { ErrResponseSchema } from "./ErrResponseSchema";
import type { PaginatedResponseSchema } from "./PaginatedResponseSchema";
import type { HackerDto } from "./HackerDto";
import type { ProjectDto } from "./ProjectDto";

 export type ListHeaderParams = {
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
export type List200 = (PaginatedResponseSchema & {
    /**
     * @description Response paginated data list
     * @type array | undefined
    */
    body?: HackerDto[];
});
export type List401 = ErrResponseSchema;
export type List403 = ErrResponseSchema;
export type List500 = ErrResponseSchema;
export type ListQueryResponse = (PaginatedResponseSchema & {
    /**
     * @description Response paginated data list
     * @type array | undefined
    */
    body?: HackerDto[];
});
export type ListQuery = {
    Response: ListQueryResponse;
    HeaderParams: ListHeaderParams;
    Errors: List401 | List403 | List500;
};

 export type List200 = (PaginatedResponseSchema & {
    /**
     * @description Response paginated data list
     * @type array | undefined
    */
    body?: ProjectDto[];
});
export type List401 = ErrResponseSchema;
export type List403 = ErrResponseSchema;
export type List500 = ErrResponseSchema;
export type ListQueryResponse = (PaginatedResponseSchema & {
    /**
     * @description Response paginated data list
     * @type array | undefined
    */
    body?: ProjectDto[];
});
export type ListQuery = {
    Response: ListQueryResponse;
    Errors: List401 | List403 | List500;
};