import client from "@kubb/swagger-client/client";
import { useQuery, queryOptions, useInfiniteQuery, infiniteQueryOptions, useSuspenseQuery } from "@tanstack/react-query";
import type { GetAuthProvidersQueryResponse, GetAuthProvidersHeaderParams, GetAuthProviders401, GetAuthProviders403, GetAuthProviders500 } from "../../../types/GetAuthProviders";
import type { QueryObserverOptions, UseQueryResult, QueryKey, InfiniteQueryObserverOptions, UseInfiniteQueryResult, InfiniteData, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";

 type GetAuthProvidersClient = typeof client<GetAuthProvidersQueryResponse, GetAuthProviders401 | GetAuthProviders403 | GetAuthProviders500, never>;
type GetAuthProviders = {
    data: GetAuthProvidersQueryResponse;
    error: GetAuthProviders401 | GetAuthProviders403 | GetAuthProviders500;
    request: never;
    pathParams: never;
    queryParams: never;
    headerParams: GetAuthProvidersHeaderParams;
    response: Awaited<ReturnType<GetAuthProvidersClient>>;
    client: {
        parameters: Partial<Parameters<GetAuthProvidersClient>[0]>;
        return: Awaited<ReturnType<GetAuthProvidersClient>>;
    };
};
export const getAuthProvidersQueryKey = () => [{ url: "/v1/mgr/auth/providers" }] as const;
export type GetAuthProvidersQueryKey = ReturnType<typeof getAuthProvidersQueryKey>;
export function getAuthProvidersQueryOptions(headers: GetAuthProviders["headerParams"], options: GetAuthProviders["client"]["parameters"] = {}) {
    const queryKey = getAuthProvidersQueryKey();
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<GetAuthProviders["data"], GetAuthProviders["error"]>({
                method: "get",
                url: `/v1/mgr/auth/providers`,
                headers: { ...headers, ...options.headers },
                ...options
            });
            return res;
        },
    });
}
/**
 * @summary Get auth providers
 * @link /v1/mgr/auth/providers
 */
export function useGetAuthProviders<TData = GetAuthProviders["response"], TQueryData = GetAuthProviders["response"], TQueryKey extends QueryKey = GetAuthProvidersQueryKey>(headers: GetAuthProviders["headerParams"], options: {
    query?: Partial<QueryObserverOptions<GetAuthProviders["response"], GetAuthProviders["error"], TData, TQueryData, TQueryKey>>;
    client?: GetAuthProviders["client"]["parameters"];
} = {}): UseQueryResult<TData, GetAuthProviders["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getAuthProvidersQueryKey();
    const query = useQuery({
        ...getAuthProvidersQueryOptions(headers, clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, GetAuthProviders["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const getAuthProvidersInfiniteQueryKey = () => [{ url: "/v1/mgr/auth/providers" }] as const;
export type GetAuthProvidersInfiniteQueryKey = ReturnType<typeof getAuthProvidersInfiniteQueryKey>;
export function getAuthProvidersInfiniteQueryOptions(headers: GetAuthProviders["headerParams"], options: GetAuthProviders["client"]["parameters"] = {}) {
    const queryKey = getAuthProvidersInfiniteQueryKey();
    return infiniteQueryOptions({
        queryKey,
        queryFn: async ({ pageParam }) => {
            const res = await client<GetAuthProviders["data"], GetAuthProviders["error"]>({
                method: "get",
                url: `/v1/mgr/auth/providers`,
                headers: { ...headers, ...options.headers },
                ...options
            });
            return res;
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage["nextCursor"],
        getPreviousPageParam: (firstPage) => firstPage["nextCursor"]
    });
}
/**
 * @summary Get auth providers
 * @link /v1/mgr/auth/providers
 */
export function useGetAuthProvidersInfinite<TData = InfiniteData<GetAuthProviders["response"]>, TQueryData = GetAuthProviders["response"], TQueryKey extends QueryKey = GetAuthProvidersInfiniteQueryKey>(headers: GetAuthProviders["headerParams"], options: {
    query?: Partial<InfiniteQueryObserverOptions<GetAuthProviders["response"], GetAuthProviders["error"], TData, TQueryData, TQueryKey>>;
    client?: GetAuthProviders["client"]["parameters"];
} = {}): UseInfiniteQueryResult<TData, GetAuthProviders["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getAuthProvidersInfiniteQueryKey();
    const query = useInfiniteQuery({
        ...getAuthProvidersInfiniteQueryOptions(headers, clientOptions) as unknown as InfiniteQueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<InfiniteQueryObserverOptions, "queryKey">
    }) as UseInfiniteQueryResult<TData, GetAuthProviders["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const getAuthProvidersSuspenseQueryKey = () => [{ url: "/v1/mgr/auth/providers" }] as const;
export type GetAuthProvidersSuspenseQueryKey = ReturnType<typeof getAuthProvidersSuspenseQueryKey>;
export function getAuthProvidersSuspenseQueryOptions(headers: GetAuthProviders["headerParams"], options: GetAuthProviders["client"]["parameters"] = {}) {
    const queryKey = getAuthProvidersSuspenseQueryKey();
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<GetAuthProviders["data"], GetAuthProviders["error"]>({
                method: "get",
                url: `/v1/mgr/auth/providers`,
                headers: { ...headers, ...options.headers },
                ...options
            });
            return res;
        },
    });
}
/**
 * @summary Get auth providers
 * @link /v1/mgr/auth/providers
 */
export function useGetAuthProvidersSuspense<TData = GetAuthProviders["response"], TQueryKey extends QueryKey = GetAuthProvidersSuspenseQueryKey>(headers: GetAuthProviders["headerParams"], options: {
    query?: Partial<UseSuspenseQueryOptions<GetAuthProviders["response"], GetAuthProviders["error"], TData, TQueryKey>>;
    client?: GetAuthProviders["client"]["parameters"];
} = {}): UseSuspenseQueryResult<TData, GetAuthProviders["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getAuthProvidersSuspenseQueryKey();
    const query = useSuspenseQuery({
        ...getAuthProvidersSuspenseQueryOptions(headers, clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseSuspenseQueryResult<TData, GetAuthProviders["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}