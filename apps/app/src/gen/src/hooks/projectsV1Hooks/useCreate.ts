import client from "@kubb/swagger-client/client";
import { useMutation } from "@tanstack/react-query";
import type { CreateMutationRequest, CreateMutationResponse, CreatePathParams, CreateHeaderParams, Create401, Create403, Create500 } from "../../../types/Create";
import type { UseMutationOptions } from "@tanstack/react-query";

 type CreateClient = typeof client<CreateMutationResponse, Create401 | Create403 | Create500, CreateMutationRequest>;
type Create = {
    data: CreateMutationResponse;
    error: Create401 | Create403 | Create500;
    request: CreateMutationRequest;
    pathParams: CreatePathParams;
    queryParams: never;
    headerParams: CreateHeaderParams;
    response: Awaited<ReturnType<CreateClient>>;
    client: {
        parameters: Partial<Parameters<CreateClient>[0]>;
        return: Awaited<ReturnType<CreateClient>>;
    };
};
/**
 * @description Creating a project will create a postgresql schema and template tables
 * @summary Create a project
 * @link /v1/mgr/orgs/:org/projects
 */
export function useCreate(org: CreatePathParams["org"], headers: Create["headerParams"], options: {
    mutation?: UseMutationOptions<Create["response"], Create["error"], Create["request"]>;
    client?: Create["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async (data) => {
            const res = await client<Create["data"], Create["error"], Create["request"]>({
                method: "post",
                url: `/v1/mgr/orgs/${org}/projects`,
                data,
                headers: { ...headers, ...clientOptions.headers },
                ...clientOptions
            });
            return res;
        },
        ...mutationOptions
    });
}