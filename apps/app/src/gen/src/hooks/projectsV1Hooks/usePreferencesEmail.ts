import client from "@kubb/swagger-client/client";
import { useMutation } from "@tanstack/react-query";
import type { PreferencesEmailMutationResponse, PreferencesEmailHeaderParams, PreferencesEmail401, PreferencesEmail403, PreferencesEmail500 } from "../../../types/PreferencesEmail";
import type { UseMutationOptions } from "@tanstack/react-query";

 type PreferencesEmailClient = typeof client<PreferencesEmailMutationResponse, PreferencesEmail401 | PreferencesEmail403 | PreferencesEmail500, never>;
type PreferencesEmail = {
    data: PreferencesEmailMutationResponse;
    error: PreferencesEmail401 | PreferencesEmail403 | PreferencesEmail500;
    request: never;
    pathParams: never;
    queryParams: never;
    headerParams: PreferencesEmailHeaderParams;
    response: Awaited<ReturnType<PreferencesEmailClient>>;
    client: {
        parameters: Partial<Parameters<PreferencesEmailClient>[0]>;
        return: Awaited<ReturnType<PreferencesEmailClient>>;
    };
};
/**
 * @summary Setup a project email configurations
 * @link /v1/mgr/settings/mail
 */
export function usePreferencesEmail(headers: PreferencesEmail["headerParams"], options: {
    mutation?: UseMutationOptions<PreferencesEmail["response"], PreferencesEmail["error"], PreferencesEmail["request"]>;
    client?: PreferencesEmail["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async () => {
            const res = await client<PreferencesEmail["data"], PreferencesEmail["error"], PreferencesEmail["request"]>({
                method: "put",
                url: `/v1/mgr/settings/mail`,
                headers: { ...headers, ...clientOptions.headers },
                ...clientOptions
            });
            return res;
        },
        ...mutationOptions
    });
}