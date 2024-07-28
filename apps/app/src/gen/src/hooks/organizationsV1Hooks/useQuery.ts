import client from "@kubb/swagger-client/client";
import { useQuery, queryOptions, useInfiniteQuery, infiniteQueryOptions, useSuspenseQuery } from "@tanstack/react-query";
import type { QueryQueryResponse, QueryPathParams, QueryHeaderParams, Query401, Query403, Query500 } from "../../../types/Query";
import type { QueryObserverOptions, UseQueryResult, QueryKey, InfiniteQueryObserverOptions, UseInfiniteQueryResult, InfiniteData, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";

 type QueryClient = typeof client<QueryQueryResponse, Query401 | Query403 | Query500, never>;
type Query = {
    data: QueryQueryResponse;
    error: Query401 | Query403 | Query500;
    request: never;
    pathParams: QueryPathParams;
    queryParams: never;
    headerParams: QueryHeaderParams;
    response: Awaited<ReturnType<QueryClient>>;
    client: {
        parameters: Partial<Parameters<QueryClient>[0]>;
        return: Awaited<ReturnType<QueryClient>>;
    };
};
export const queryQueryKey = (org: QueryPathParams["org"]) => [{ url: "/v1/mgr/orgs/query/:org", params: { org: org } }] as const;
export type QueryQueryKey = ReturnType<typeof queryQueryKey>;
export function queryQueryOptions(org: QueryPathParams["org"], headers: Query["headerParams"], options: Query["client"]["parameters"] = {}) {
    const queryKey = queryQueryKey(org);
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<Query["data"], Query["error"]>({
                method: "get",
                url: `/v1/mgr/orgs/query/${org}`,
                headers: { ...headers, ...options.headers },
                ...options
            });
            return res;
        },
    });
}
/**
 * @description Lists organizations that the authenticated user has explicit permission (:read, :write, or :admin) to access.
 * @summary Query organizations for the authenticated user
 * @link /v1/mgr/orgs/query/:org
 */
export function useQuery<TData = Query["response"], TQueryData = Query["response"], TQueryKey extends QueryKey = QueryQueryKey>(org: QueryPathParams["org"], headers: Query["headerParams"], options: {
    query?: Partial<QueryObserverOptions<Query["response"], Query["error"], TData, TQueryData, TQueryKey>>;
    client?: Query["client"]["parameters"];
} = {}): UseQueryResult<TData, Query["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? queryQueryKey(org);
    const query = useQuery({
        ...queryQueryOptions(org, headers, clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, Query["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const queryInfiniteQueryKey = (org: QueryPathParams["org"]) => [{ url: "/v1/mgr/orgs/query/:org", params: { org: org } }] as const;
export type QueryInfiniteQueryKey = ReturnType<typeof queryInfiniteQueryKey>;
export function queryInfiniteQueryOptions(org: QueryPathParams["org"], headers: Query["headerParams"], options: Query["client"]["parameters"] = {}) {
    const queryKey = queryInfiniteQueryKey(org);
    return infiniteQueryOptions({
        queryKey,
        queryFn: async ({ pageParam }) => {
            const res = await client<Query["data"], Query["error"]>({
                method: "get",
                url: `/v1/mgr/orgs/query/${org}`,
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
 * @description Lists organizations that the authenticated user has explicit permission (:read, :write, or :admin) to access.
 * @summary Query organizations for the authenticated user
 * @link /v1/mgr/orgs/query/:org
 */
export function useQueryInfinite<TData = InfiniteData<Query["response"]>, TQueryData = Query["response"], TQueryKey extends QueryKey = QueryInfiniteQueryKey>(org: QueryPathParams["org"], headers: Query["headerParams"], options: {
    query?: Partial<InfiniteQueryObserverOptions<Query["response"], Query["error"], TData, TQueryData, TQueryKey>>;
    client?: Query["client"]["parameters"];
} = {}): UseInfiniteQueryResult<TData, Query["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? queryInfiniteQueryKey(org);
    const query = useInfiniteQuery({
        ...queryInfiniteQueryOptions(org, headers, clientOptions) as unknown as InfiniteQueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<InfiniteQueryObserverOptions, "queryKey">
    }) as UseInfiniteQueryResult<TData, Query["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const querySuspenseQueryKey = (org: QueryPathParams["org"]) => [{ url: "/v1/mgr/orgs/query/:org", params: { org: org } }] as const;
export type QuerySuspenseQueryKey = ReturnType<typeof querySuspenseQueryKey>;
export function querySuspenseQueryOptions(org: QueryPathParams["org"], headers: Query["headerParams"], options: Query["client"]["parameters"] = {}) {
    const queryKey = querySuspenseQueryKey(org);
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<Query["data"], Query["error"]>({
                method: "get",
                url: `/v1/mgr/orgs/query/${org}`,
                headers: { ...headers, ...options.headers },
                ...options
            });
            return res;
        },
    });
}
/**
 * @description Lists organizations that the authenticated user has explicit permission (:read, :write, or :admin) to access.
 * @summary Query organizations for the authenticated user
 * @link /v1/mgr/orgs/query/:org
 */
export function useQuerySuspense<TData = Query["response"], TQueryKey extends QueryKey = QuerySuspenseQueryKey>(org: QueryPathParams["org"], headers: Query["headerParams"], options: {
    query?: Partial<UseSuspenseQueryOptions<Query["response"], Query["error"], TData, TQueryKey>>;
    client?: Query["client"]["parameters"];
} = {}): UseSuspenseQueryResult<TData, Query["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? querySuspenseQueryKey(org);
    const query = useSuspenseQuery({
        ...querySuspenseQueryOptions(org, headers, clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseSuspenseQueryResult<TData, Query["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}