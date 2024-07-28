import type { ErrResponseSchema } from "./ErrResponseSchema";
import type { OkedResponseSchema } from "./OkedResponseSchema";

 export type GetAuthProvidersHeaderParams = {
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
export type GetAuthProviders200 = OkedResponseSchema;
export type GetAuthProviders401 = ErrResponseSchema;
export type GetAuthProviders403 = ErrResponseSchema;
export type GetAuthProviders500 = ErrResponseSchema;
export type GetAuthProvidersQueryResponse = OkedResponseSchema;
export type GetAuthProvidersQuery = {
    Response: GetAuthProvidersQueryResponse;
    HeaderParams: GetAuthProvidersHeaderParams;
    Errors: GetAuthProviders401 | GetAuthProviders403 | GetAuthProviders500;
};