import { UpdateOrgDto } from "./UpdateOrgDto";
import type { ErrResponseSchema } from "./ErrResponseSchema";
import type { OkedResponseSchema } from "./OkedResponseSchema";

 export type UpdatePathParams = {
    org: any;
};
export type UpdateHeaderParams = {
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
export type Update200 = OkedResponseSchema;
export type Update401 = ErrResponseSchema;
export type Update403 = ErrResponseSchema;
export type Update500 = ErrResponseSchema;
export type UpdateMutationRequest = UpdateOrgDto;
export type UpdateMutationResponse = OkedResponseSchema;
export type UpdateMutation = {
    Response: UpdateMutationResponse;
    Request: UpdateMutationRequest;
    PathParams: UpdatePathParams;
    HeaderParams: UpdateHeaderParams;
    Errors: Update401 | Update403 | Update500;
};