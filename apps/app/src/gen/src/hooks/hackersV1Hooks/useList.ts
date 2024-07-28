import client from "@kubb/swagger-client/client";
import { useQuery, queryOptions, useInfiniteQuery, infiniteQueryOptions, useSuspenseQuery } from "@tanstack/react-query";
import type { ListQueryResponse, ListHeaderParams, List401, List403, List500 } from "../../../types/List";
import type { QueryObserverOptions, UseQueryResult, QueryKey, InfiniteQueryObserverOptions, UseInfiniteQueryResult, InfiniteData, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";

 type ListClient = typeof client<ListQueryResponse, List401 | List403 | List500, never>;
type List = {
    data: ListQueryResponse;
    error: List401 | List403 | List500;
    request: never;
    pathParams: never;
    queryParams: never;
    headerParams: ListHeaderParams;
    response: Awaited<ReturnType<ListClient>>;
    client: {
        parameters: Partial<Parameters<ListClient>[0]>;
        return: Awaited<ReturnType<ListClient>>;
    };
};
export const listQueryKey = () => [{ url: "/v1/mgr/hackers" }] as const;
export type ListQueryKey = ReturnType<typeof listQueryKey>;
export function listQueryOptions(headers: List["headerParams"], options: List["client"]["parameters"] = {}) {
    const queryKey = listQueryKey();
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<List["data"], List["error"]>({
                method: "get",
                url: `/v1/mgr/hackers`,
                headers: { ...headers, ...options.headers },
                ...options
            });
            return res;
        },
    });
}
/**
 * @summary List hackers
 * @link /v1/mgr/hackers
 */
export function useList<TData = List["response"], TQueryData = List["response"], TQueryKey extends QueryKey = ListQueryKey>(headers: List["headerParams"], options: {
    query?: Partial<QueryObserverOptions<List["response"], List["error"], TData, TQueryData, TQueryKey>>;
    client?: List["client"]["parameters"];
} = {}): UseQueryResult<TData, List["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? listQueryKey();
    const query = useQuery({
        ...listQueryOptions(headers, clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, List["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const listInfiniteQueryKey = () => [{ url: "/v1/mgr/hackers" }] as const;
export type ListInfiniteQueryKey = ReturnType<typeof listInfiniteQueryKey>;
export function listInfiniteQueryOptions(headers: List["headerParams"], options: List["client"]["parameters"] = {}) {
    const queryKey = listInfiniteQueryKey();
    return infiniteQueryOptions({
        queryKey,
        queryFn: async ({ pageParam }) => {
            const res = await client<List["data"], List["error"]>({
                method: "get",
                url: `/v1/mgr/hackers`,
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
 * @summary List hackers
 * @link /v1/mgr/hackers
 */
export function useListInfinite<TData = InfiniteData<List["response"]>, TQueryData = List["response"], TQueryKey extends QueryKey = ListInfiniteQueryKey>(headers: List["headerParams"], options: {
    query?: Partial<InfiniteQueryObserverOptions<List["response"], List["error"], TData, TQueryData, TQueryKey>>;
    client?: List["client"]["parameters"];
} = {}): UseInfiniteQueryResult<TData, List["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? listInfiniteQueryKey();
    const query = useInfiniteQuery({
        ...listInfiniteQueryOptions(headers, clientOptions) as unknown as InfiniteQueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<InfiniteQueryObserverOptions, "queryKey">
    }) as UseInfiniteQueryResult<TData, List["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const listSuspenseQueryKey = () => [{ url: "/v1/mgr/hackers" }] as const;
export type ListSuspenseQueryKey = ReturnType<typeof listSuspenseQueryKey>;
export function listSuspenseQueryOptions(headers: List["headerParams"], options: List["client"]["parameters"] = {}) {
    const queryKey = listSuspenseQueryKey();
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<List["data"], List["error"]>({
                method: "get",
                url: `/v1/mgr/hackers`,
                headers: { ...headers, ...options.headers },
                ...options
            });
            return res;
        },
    });
}
/**
 * @summary List hackers
 * @link /v1/mgr/hackers
 */
export function useListSuspense<TData = List["response"], TQueryKey extends QueryKey = ListSuspenseQueryKey>(headers: List["headerParams"], options: {
    query?: Partial<UseSuspenseQueryOptions<List["response"], List["error"], TData, TQueryKey>>;
    client?: List["client"]["parameters"];
} = {}): UseSuspenseQueryResult<TData, List["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? listSuspenseQueryKey();
    const query = useSuspenseQuery({
        ...listSuspenseQueryOptions(headers, clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseSuspenseQueryResult<TData, List["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}