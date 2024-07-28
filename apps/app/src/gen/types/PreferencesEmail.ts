import type { ErrResponseSchema } from "./ErrResponseSchema";
import type { OkedResponseSchema } from "./OkedResponseSchema";

 export type PreferencesEmailHeaderParams = {
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
export type PreferencesEmail200 = OkedResponseSchema;
export type PreferencesEmail401 = ErrResponseSchema;
export type PreferencesEmail403 = ErrResponseSchema;
export type PreferencesEmail500 = ErrResponseSchema;
export type PreferencesEmailMutationResponse = OkedResponseSchema;
export type PreferencesEmailMutation = {
    Response: PreferencesEmailMutationResponse;
    HeaderParams: PreferencesEmailHeaderParams;
    Errors: PreferencesEmail401 | PreferencesEmail403 | PreferencesEmail500;
};