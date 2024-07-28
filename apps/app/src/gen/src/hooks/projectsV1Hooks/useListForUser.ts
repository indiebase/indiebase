import client from "@kubb/swagger-client/client";
import { useQuery, queryOptions, useInfiniteQuery, infiniteQueryOptions, useSuspenseQuery } from "@tanstack/react-query";
import type { ListForUserQueryResponse, ListForUserHeaderParams, ListForUser401, ListForUser403, ListForUser500 } from "../../../types/ListForUser";
import type { QueryObserverOptions, UseQueryResult, QueryKey, InfiniteQueryObserverOptions, UseInfiniteQueryResult, InfiniteData, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";

 type ListForUserClient = typeof client<ListForUserQueryResponse, ListForUser401 | ListForUser403 | ListForUser500, never>;
type ListForUser = {
    data: ListForUserQueryResponse;
    error: ListForUser401 | ListForUser403 | ListForUser500;
    request: never;
    pathParams: never;
    queryParams: never;
    headerParams: ListForUserHeaderParams;
    response: Awaited<ReturnType<ListForUserClient>>;
    client: {
        parameters: Partial<Parameters<ListForUserClient>[0]>;
        return: Awaited<ReturnType<ListForUserClient>>;
    };
};
export const listForUserQueryKey = () => [{ url: "/v1/mgr/user/projects" }] as const;
export type ListForUserQueryKey = ReturnType<typeof listForUserQueryKey>;
export function listForUserQueryOptions(headers: ListForUser["headerParams"], options: ListForUser["client"]["parameters"] = {}) {
    const queryKey = listForUserQueryKey();
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<ListForUser["data"], ListForUser["error"]>({
                method: "get",
                url: `/v1/mgr/user/projects`,
                headers: { ...headers, ...options.headers },
                ...options
            });
            return res;
        },
    });
}
/**
 * @description Lists projects that the authenticated user has explicit permission (:read, :write, or :admin) to access.
 * @summary Query projects for the authenticated user
 * @link /v1/mgr/user/projects
 */
export function useListForUser<TData = ListForUser["response"], TQueryData = ListForUser["response"], TQueryKey extends QueryKey = ListForUserQueryKey>(headers: ListForUser["headerParams"], options: {
    query?: Partial<QueryObserverOptions<ListForUser["response"], ListForUser["error"], TData, TQueryData, TQueryKey>>;
    client?: ListForUser["client"]["parameters"];
} = {}): UseQueryResult<TData, ListForUser["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? listForUserQueryKey();
    const query = useQuery({
        ...listForUserQueryOptions(headers, clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, ListForUser["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const listForUserInfiniteQueryKey = () => [{ url: "/v1/mgr/user/projects" }] as const;
export type ListForUserInfiniteQueryKey = ReturnType<typeof listForUserInfiniteQueryKey>;
export function listForUserInfiniteQueryOptions(headers: ListForUser["headerParams"], options: ListForUser["client"]["parameters"] = {}) {
    const queryKey = listForUserInfiniteQueryKey();
    return infiniteQueryOptions({
        queryKey,
        queryFn: async ({ pageParam }) => {
            const res = await client<ListForUser["data"], ListForUser["error"]>({
                method: "get",
                url: `/v1/mgr/user/projects`,
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
 * @description Lists projects that the authenticated user has explicit permission (:read, :write, or :admin) to access.
 * @summary Query projects for the authenticated user
 * @link /v1/mgr/user/projects
 */
export function useListForUserInfinite<TData = InfiniteData<ListForUser["response"]>, TQueryData = ListForUser["response"], TQueryKey extends QueryKey = ListForUserInfiniteQueryKey>(headers: ListForUser["headerParams"], options: {
    query?: Partial<InfiniteQueryObserverOptions<ListForUser["response"], ListForUser["error"], TData, TQueryData, TQueryKey>>;
    client?: ListForUser["client"]["parameters"];
} = {}): UseInfiniteQueryResult<TData, ListForUser["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? listForUserInfiniteQueryKey();
    const query = useInfiniteQuery({
        ...listForUserInfiniteQueryOptions(headers, clientOptions) as unknown as InfiniteQueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<InfiniteQueryObserverOptions, "queryKey">
    }) as UseInfiniteQueryResult<TData, ListForUser["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const listForUserSuspenseQueryKey = () => [{ url: "/v1/mgr/user/projects" }] as const;
export type ListForUserSuspenseQueryKey = ReturnType<typeof listForUserSuspenseQueryKey>;
export function listForUserSuspenseQueryOptions(headers: ListForUser["headerParams"], options: ListForUser["client"]["parameters"] = {}) {
    const queryKey = listForUserSuspenseQueryKey();
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<ListForUser["data"], ListForUser["error"]>({
                method: "get",
                url: `/v1/mgr/user/projects`,
                headers: { ...headers, ...options.headers },
                ...options
            });
            return res;
        },
    });
}
/**
 * @description Lists projects that the authenticated user has explicit permission (:read, :write, or :admin) to access.
 * @summary Query projects for the authenticated user
 * @link /v1/mgr/user/projects
 */
export function useListForUserSuspense<TData = ListForUser["response"], TQueryKey extends QueryKey = ListForUserSuspenseQueryKey>(headers: ListForUser["headerParams"], options: {
    query?: Partial<UseSuspenseQueryOptions<ListForUser["response"], ListForUser["error"], TData, TQueryKey>>;
    client?: ListForUser["client"]["parameters"];
} = {}): UseSuspenseQueryResult<TData, ListForUser["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? listForUserSuspenseQueryKey();
    const query = useSuspenseQuery({
        ...listForUserSuspenseQueryOptions(headers, clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseSuspenseQueryResult<TData, ListForUser["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}