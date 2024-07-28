import client from '@kubb/swagger-client/client';
import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import type {
  Create401,
  Create403,
  Create500,
  CreateHeaderParams,
  CreateMutationRequest,
  CreateMutationResponse,
} from '../../../types/Create';

type CreateClient = typeof client<
  CreateMutationResponse,
  Create401 | Create403 | Create500,
  CreateMutationRequest
>;
type Create = {
  data: CreateMutationResponse;
  error: Create401 | Create403 | Create500;
  request: CreateMutationRequest;
  pathParams: never;
  queryParams: never;
  headerParams: CreateHeaderParams;
  response: Awaited<ReturnType<CreateClient>>;
  client: {
    parameters: Partial<Parameters<CreateClient>[0]>;
    return: Awaited<ReturnType<CreateClient>>;
  };
};
/**
 * @description Different than create a project. Create an organization will not create the postgresql schema
 * @summary Create an organization
 * @link /v1/mgr/orgs
 */
export function useCreate(
  headers: Create['headerParams'],
  options: {
    mutation?: UseMutationOptions<
      Create['response'],
      Create['error'],
      Create['request']
    >;
    client?: Create['client']['parameters'];
  } = {},
) {
  const { mutation: mutationOptions, client: clientOptions = {} } =
    options ?? {};
  return useMutation({
    mutationFn: async (data) => {
      const res = await client<
        Create['data'],
        Create['error'],
        Create['request']
      >({
        method: 'post',
        url: `/v1/mgr/orgs`,
        data,
        headers: { ...headers, ...clientOptions.headers },
        ...clientOptions,
      });
      return res;
    },
    ...mutationOptions,
  });
}
