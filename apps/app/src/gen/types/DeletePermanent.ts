import type { ErrResponseSchema } from "./ErrResponseSchema";
import type { OkedResponseSchema } from "./OkedResponseSchema";

 export type DeletePermanentPathParams = {
    org: any;
};
export type DeletePermanentHeaderParams = {
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
export type DeletePermanent200 = OkedResponseSchema;
export type DeletePermanent401 = ErrResponseSchema;
export type DeletePermanent403 = ErrResponseSchema;
export type DeletePermanent500 = ErrResponseSchema;
export type DeletePermanentMutationResponse = OkedResponseSchema;
export type DeletePermanentMutation = {
    Response: DeletePermanentMutationResponse;
    PathParams: DeletePermanentPathParams;
    HeaderParams: DeletePermanentHeaderParams;
    Errors: DeletePermanent401 | DeletePermanent403 | DeletePermanent500;
};