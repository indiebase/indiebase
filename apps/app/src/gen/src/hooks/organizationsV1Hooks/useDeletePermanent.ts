import client from "@kubb/swagger-client/client";
import { useMutation } from "@tanstack/react-query";
import type { DeletePermanentMutationResponse, DeletePermanentPathParams, DeletePermanentHeaderParams, DeletePermanent401, DeletePermanent403, DeletePermanent500 } from "../../../types/DeletePermanent";
import type { UseMutationOptions } from "@tanstack/react-query";

 type DeletePermanentClient = typeof client<DeletePermanentMutationResponse, DeletePermanent401 | DeletePermanent403 | DeletePermanent500, never>;
type DeletePermanent = {
    data: DeletePermanentMutationResponse;
    error: DeletePermanent401 | DeletePermanent403 | DeletePermanent500;
    request: never;
    pathParams: DeletePermanentPathParams;
    queryParams: never;
    headerParams: DeletePermanentHeaderParams;
    response: Awaited<ReturnType<DeletePermanentClient>>;
    client: {
        parameters: Partial<Parameters<DeletePermanentClient>[0]>;
        return: Awaited<ReturnType<DeletePermanentClient>>;
    };
};
/**
 * @description Nota bene, Once you delete a org, there is no going back. Please be certain.
 * @summary Delete an organization permanently
 * @link /v1/mgr/orgs/:org/permanent
 */
export function useDeletePermanent(org: DeletePermanentPathParams["org"], headers: DeletePermanent["headerParams"], options: {
    mutation?: UseMutationOptions<DeletePermanent["response"], DeletePermanent["error"], DeletePermanent["request"]>;
    client?: DeletePermanent["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async () => {
            const res = await client<DeletePermanent["data"], DeletePermanent["error"], DeletePermanent["request"]>({
                method: "delete",
                url: `/v1/mgr/orgs/${org}/permanent`,
                headers: { ...headers, ...clientOptions.headers },
                ...clientOptions
            });
            return res;
        },
        ...mutationOptions
    });
}