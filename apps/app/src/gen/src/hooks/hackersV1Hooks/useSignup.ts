import client from "@kubb/swagger-client/client";
import { useMutation } from "@tanstack/react-query";
import type { SignupMutationRequest, SignupMutationResponse, SignupHeaderParams, Signup401, Signup403, Signup500 } from "../../../types/Signup";
import type { UseMutationOptions } from "@tanstack/react-query";

 type SignupClient = typeof client<SignupMutationResponse, Signup401 | Signup403 | Signup500, SignupMutationRequest>;
type Signup = {
    data: SignupMutationResponse;
    error: Signup401 | Signup403 | Signup500;
    request: SignupMutationRequest;
    pathParams: never;
    queryParams: never;
    headerParams: SignupHeaderParams;
    response: Awaited<ReturnType<SignupClient>>;
    client: {
        parameters: Partial<Parameters<SignupClient>[0]>;
        return: Awaited<ReturnType<SignupClient>>;
    };
};
/**
 * @summary Sign up a hacker
 * @link /v1/mgr/hackers/signup
 */
export function useSignup(headers: Signup["headerParams"], options: {
    mutation?: UseMutationOptions<Signup["response"], Signup["error"], Signup["request"]>;
    client?: Signup["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async (data) => {
            const res = await client<Signup["data"], Signup["error"], Signup["request"]>({
                method: "post",
                url: `/v1/mgr/hackers/signup`,
                data,
                headers: { ...headers, ...clientOptions.headers },
                ...clientOptions
            });
            return res;
        },
        ...mutationOptions
    });
}