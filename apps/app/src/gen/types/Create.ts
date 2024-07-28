import { SignUpHackersDto } from "./SignUpHackersDto";
import { CreateOrgDto } from "./CreateOrgDto";
import { CreatePrjDto } from "./CreatePrjDto";
import type { ErrResponseSchema } from "./ErrResponseSchema";
import type { OkedResponseSchema } from "./OkedResponseSchema";

 export type CreateHeaderParams = {
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
export type Create201 = OkedResponseSchema;
export type Create401 = ErrResponseSchema;
export type Create403 = ErrResponseSchema;
export type Create500 = ErrResponseSchema;
export type CreateMutationRequest = SignUpHackersDto;
export type CreateMutationResponse = OkedResponseSchema;
export type CreateMutation = {
    Response: CreateMutationResponse;
    Request: CreateMutationRequest;
    HeaderParams: CreateHeaderParams;
    Errors: Create401 | Create403 | Create500;
};

 export type CreateHeaderParams = {
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
export type Create201 = OkedResponseSchema;
export type Create401 = ErrResponseSchema;
export type Create403 = ErrResponseSchema;
export type Create500 = ErrResponseSchema;
export type CreateMutationRequest = CreateOrgDto;
export type CreateMutationResponse = OkedResponseSchema;
export type CreateMutation = {
    Response: CreateMutationResponse;
    Request: CreateMutationRequest;
    HeaderParams: CreateHeaderParams;
    Errors: Create401 | Create403 | Create500;
};

 export type CreatePathParams = {
    /**
     * @type string
    */
    org: string;
};
export type CreateHeaderParams = {
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
export type Create201 = OkedResponseSchema;
export type Create401 = ErrResponseSchema;
export type Create403 = ErrResponseSchema;
export type Create500 = ErrResponseSchema;
export type CreateMutationRequest = CreatePrjDto;
export type CreateMutationResponse = OkedResponseSchema;
export type CreateMutation = {
    Response: CreateMutationResponse;
    Request: CreateMutationRequest;
    PathParams: CreatePathParams;
    HeaderParams: CreateHeaderParams;
    Errors: Create401 | Create403 | Create500;
};