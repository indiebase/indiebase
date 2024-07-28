import client from "@kubb/swagger-client/client";
import { useQuery, queryOptions, useInfiniteQuery, infiniteQueryOptions, useSuspenseQuery } from "@tanstack/react-query";
import type { QueryOwnedQueryResponse, QueryOwnedQueryParams, QueryOwnedHeaderParams, QueryOwned401, QueryOwned403, QueryOwned500 } from "../../../types/QueryOwned";
import type { QueryObserverOptions, UseQueryResult, QueryKey, InfiniteQueryObserverOptions, UseInfiniteQueryResult, InfiniteData, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";

 type QueryOwnedClient = typeof client<QueryOwnedQueryResponse, QueryOwned401 | QueryOwned403 | QueryOwned500, never>;
type QueryOwned = {
    data: QueryOwnedQueryResponse;
    error: QueryOwned401 | QueryOwned403 | QueryOwned500;
    request: never;
    pathParams: never;
    queryParams: QueryOwnedQueryParams;
    headerParams: QueryOwnedHeaderParams;
    response: Awaited<ReturnType<QueryOwnedClient>>;
    client: {
        parameters: Partial<Parameters<QueryOwnedClient>[0]>;
        return: Awaited<ReturnType<QueryOwnedClient>>;
    };
};
export const queryOwnedQueryKey = (params: QueryOwned["queryParams"]) => [{ url: "/v1/mgr/orgs" }, ...(params ? [params] : [])] as const;
export type QueryOwnedQueryKey = ReturnType<typeof queryOwnedQueryKey>;
export function queryOwnedQueryOptions(params: QueryOwned["queryParams"], headers: QueryOwned["headerParams"], options: QueryOwned["client"]["parameters"] = {}) {
    const queryKey = queryOwnedQueryKey(params);
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<QueryOwned["data"], QueryOwned["error"]>({
                method: "get",
                url: `/v1/mgr/orgs`,
                params,
                headers: { ...headers, ...options.headers },
                ...options
            });
            return res;
        },
    });
}
/**
 * @description Query the user-owned organizations
 * @summary Query the user-owned organizations
 * @link /v1/mgr/orgs
 */
export function useQueryOwned<TData = QueryOwned["response"], TQueryData = QueryOwned["response"], TQueryKey extends QueryKey = QueryOwnedQueryKey>(params: QueryOwned["queryParams"], headers: QueryOwned["headerParams"], options: {
    query?: Partial<QueryObserverOptions<QueryOwned["response"], QueryOwned["error"], TData, TQueryData, TQueryKey>>;
    client?: QueryOwned["client"]["parameters"];
} = {}): UseQueryResult<TData, QueryOwned["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? queryOwnedQueryKey(params);
    const query = useQuery({
        ...queryOwnedQueryOptions(params, headers, clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, QueryOwned["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const queryOwnedInfiniteQueryKey = (params: QueryOwned["queryParams"]) => [{ url: "/v1/mgr/orgs" }, ...(params ? [params] : [])] as const;
export type QueryOwnedInfiniteQueryKey = ReturnType<typeof queryOwnedInfiniteQueryKey>;
export function queryOwnedInfiniteQueryOptions(params: QueryOwned["queryParams"], headers: QueryOwned["headerParams"], options: QueryOwned["client"]["parameters"] = {}) {
    const queryKey = queryOwnedInfiniteQueryKey(params);
    return infiniteQueryOptions({
        queryKey,
        queryFn: async ({ pageParam }) => {
            const res = await client<QueryOwned["data"], QueryOwned["error"]>({
                method: "get",
                url: `/v1/mgr/orgs`,
                headers: { ...headers, ...options.headers },
                ...options,
                params: {
                    ...params,
                    ["next_page"]: pageParam,
                    ...(options.params || {}),
                }
            });
            return res;
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage["nextCursor"],
        getPreviousPageParam: (firstPage) => firstPage["nextCursor"]
    });
}
/**
 * @description Query the user-owned organizations
 * @summary Query the user-owned organizations
 * @link /v1/mgr/orgs
 */
export function useQueryOwnedInfinite<TData = InfiniteData<QueryOwned["response"]>, TQueryData = QueryOwned["response"], TQueryKey extends QueryKey = QueryOwnedInfiniteQueryKey>(params: QueryOwned["queryParams"], headers: QueryOwned["headerParams"], options: {
    query?: Partial<InfiniteQueryObserverOptions<QueryOwned["response"], QueryOwned["error"], TData, TQueryData, TQueryKey>>;
    client?: QueryOwned["client"]["parameters"];
} = {}): UseInfiniteQueryResult<TData, QueryOwned["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? queryOwnedInfiniteQueryKey(params);
    const query = useInfiniteQuery({
        ...queryOwnedInfiniteQueryOptions(params, headers, clientOptions) as unknown as InfiniteQueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<InfiniteQueryObserverOptions, "queryKey">
    }) as UseInfiniteQueryResult<TData, QueryOwned["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const queryOwnedSuspenseQueryKey = (params: QueryOwned["queryParams"]) => [{ url: "/v1/mgr/orgs" }, ...(params ? [params] : [])] as const;
export type QueryOwnedSuspenseQueryKey = ReturnType<typeof queryOwnedSuspenseQueryKey>;
export function queryOwnedSuspenseQueryOptions(params: QueryOwned["queryParams"], headers: QueryOwned["headerParams"], options: QueryOwned["client"]["parameters"] = {}) {
    const queryKey = queryOwnedSuspenseQueryKey(params);
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<QueryOwned["data"], QueryOwned["error"]>({
                method: "get",
                url: `/v1/mgr/orgs`,
                params,
                headers: { ...headers, ...options.headers },
                ...options
            });
            return res;
        },
    });
}
/**
 * @description Query the user-owned organizations
 * @summary Query the user-owned organizations
 * @link /v1/mgr/orgs
 */
export function useQueryOwnedSuspense<TData = QueryOwned["response"], TQueryKey extends QueryKey = QueryOwnedSuspenseQueryKey>(params: QueryOwned["queryParams"], headers: QueryOwned["headerParams"], options: {
    query?: Partial<UseSuspenseQueryOptions<QueryOwned["response"], QueryOwned["error"], TData, TQueryKey>>;
    client?: QueryOwned["client"]["parameters"];
} = {}): UseSuspenseQueryResult<TData, QueryOwned["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? queryOwnedSuspenseQueryKey(params);
    const query = useSuspenseQuery({
        ...queryOwnedSuspenseQueryOptions(params, headers, clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseSuspenseQueryResult<TData, QueryOwned["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}