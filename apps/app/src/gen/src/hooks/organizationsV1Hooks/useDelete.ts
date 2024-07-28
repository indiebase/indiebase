import client from "@kubb/swagger-client/client";
import { useMutation } from "@tanstack/react-query";
import type { DeleteMutationResponse, DeletePathParams, DeleteHeaderParams, Delete401, Delete403, Delete500 } from "../../../types/Delete";
import type { UseMutationOptions } from "@tanstack/react-query";

 type DeleteClient = typeof client<DeleteMutationResponse, Delete401 | Delete403 | Delete500, never>;
type Delete = {
    data: DeleteMutationResponse;
    error: Delete401 | Delete403 | Delete500;
    request: never;
    pathParams: DeletePathParams;
    queryParams: never;
    headerParams: DeleteHeaderParams;
    response: Awaited<ReturnType<DeleteClient>>;
    client: {
        parameters: Partial<Parameters<DeleteClient>[0]>;
        return: Awaited<ReturnType<DeleteClient>>;
    };
};
/**
 * @description Soft delete
 * @summary Hide an organization
 * @link /v1/mgr/orgs/:org
 */
export function useDelete(org: DeletePathParams["org"], headers: Delete["headerParams"], options: {
    mutation?: UseMutationOptions<Delete["response"], Delete["error"], Delete["request"]>;
    client?: Delete["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async () => {
            const res = await client<Delete["data"], Delete["error"], Delete["request"]>({
                method: "delete",
                url: `/v1/mgr/orgs/${org}`,
                headers: { ...headers, ...clientOptions.headers },
                ...clientOptions
            });
            return res;
        },
        ...mutationOptions
    });
}