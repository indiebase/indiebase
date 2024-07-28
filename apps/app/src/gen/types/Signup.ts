import { SignUpHackersDto } from "./SignUpHackersDto";
import type { ErrResponseSchema } from "./ErrResponseSchema";
import type { OkedResponseSchema } from "./OkedResponseSchema";

 export type SignupHeaderParams = {
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
export type Signup201 = OkedResponseSchema;
export type Signup401 = ErrResponseSchema;
export type Signup403 = ErrResponseSchema;
export type Signup500 = ErrResponseSchema;
export type SignupMutationRequest = SignUpHackersDto;
export type SignupMutationResponse = OkedResponseSchema;
export type SignupMutation = {
    Response: SignupMutationResponse;
    Request: SignupMutationRequest;
    HeaderParams: SignupHeaderParams;
    Errors: Signup401 | Signup403 | Signup500;
};