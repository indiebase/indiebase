import type { ErrResponseSchema } from "./ErrResponseSchema";
import type { OkedResponseSchema } from "./OkedResponseSchema";

 export type DeletePathParams = {
    org: any;
};
export type DeleteHeaderParams = {
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
export type Delete200 = OkedResponseSchema;
export type Delete401 = ErrResponseSchema;
export type Delete403 = ErrResponseSchema;
export type Delete500 = ErrResponseSchema;
export type DeleteMutationResponse = OkedResponseSchema;
export type DeleteMutation = {
    Response: DeleteMutationResponse;
    PathParams: DeletePathParams;
    HeaderParams: DeleteHeaderParams;
    Errors: Delete401 | Delete403 | Delete500;
};

 export type DeletePathParams = {
    referenceId: any;
};
export type DeleteHeaderParams = {
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
export type Delete200 = OkedResponseSchema;
export type Delete401 = ErrResponseSchema;
export type Delete403 = ErrResponseSchema;
export type Delete500 = ErrResponseSchema;
export type DeleteMutationResponse = OkedResponseSchema;
export type DeleteMutation = {
    Response: DeleteMutationResponse;
    PathParams: DeletePathParams;
    HeaderParams: DeleteHeaderParams;
    Errors: Delete401 | Delete403 | Delete500;
};