import client from "@kubb/swagger-client/client";
import { useQuery, queryOptions, useInfiniteQuery, infiniteQueryOptions, useSuspenseQuery } from "@tanstack/react-query";
import type { LivenessQueryResponse, Liveness503 } from "../../../types/Liveness";
import type { QueryObserverOptions, UseQueryResult, QueryKey, InfiniteQueryObserverOptions, UseInfiniteQueryResult, InfiniteData, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";

 type LivenessClient = typeof client<LivenessQueryResponse, Liveness503, never>;
type Liveness = {
    data: LivenessQueryResponse;
    error: Liveness503;
    request: never;
    pathParams: never;
    queryParams: never;
    headerParams: never;
    response: Awaited<ReturnType<LivenessClient>>;
    client: {
        parameters: Partial<Parameters<LivenessClient>[0]>;
        return: Awaited<ReturnType<LivenessClient>>;
    };
};
export const livenessQueryKey = () => [{ url: "/v1/probe/liveness" }] as const;
export type LivenessQueryKey = ReturnType<typeof livenessQueryKey>;
export function livenessQueryOptions(options: Liveness["client"]["parameters"] = {}) {
    const queryKey = livenessQueryKey();
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<Liveness["data"], Liveness["error"]>({
                method: "get",
                url: `/v1/probe/liveness`,
                ...options
            });
            return res;
        },
    });
}
/**
 * @summary Liveness probe includes http, storage, memory, database
 * @link /v1/probe/liveness
 */
export function useLiveness<TData = Liveness["response"], TQueryData = Liveness["response"], TQueryKey extends QueryKey = LivenessQueryKey>(options: {
    query?: Partial<QueryObserverOptions<Liveness["response"], Liveness["error"], TData, TQueryData, TQueryKey>>;
    client?: Liveness["client"]["parameters"];
} = {}): UseQueryResult<TData, Liveness["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? livenessQueryKey();
    const query = useQuery({
        ...livenessQueryOptions(clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, Liveness["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const livenessInfiniteQueryKey = () => [{ url: "/v1/probe/liveness" }] as const;
export type LivenessInfiniteQueryKey = ReturnType<typeof livenessInfiniteQueryKey>;
export function livenessInfiniteQueryOptions(options: Liveness["client"]["parameters"] = {}) {
    const queryKey = livenessInfiniteQueryKey();
    return infiniteQueryOptions({
        queryKey,
        queryFn: async ({ pageParam }) => {
            const res = await client<Liveness["data"], Liveness["error"]>({
                method: "get",
                url: `/v1/probe/liveness`,
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
 * @summary Liveness probe includes http, storage, memory, database
 * @link /v1/probe/liveness
 */
export function useLivenessInfinite<TData = InfiniteData<Liveness["response"]>, TQueryData = Liveness["response"], TQueryKey extends QueryKey = LivenessInfiniteQueryKey>(options: {
    query?: Partial<InfiniteQueryObserverOptions<Liveness["response"], Liveness["error"], TData, TQueryData, TQueryKey>>;
    client?: Liveness["client"]["parameters"];
} = {}): UseInfiniteQueryResult<TData, Liveness["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? livenessInfiniteQueryKey();
    const query = useInfiniteQuery({
        ...livenessInfiniteQueryOptions(clientOptions) as unknown as InfiniteQueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<InfiniteQueryObserverOptions, "queryKey">
    }) as UseInfiniteQueryResult<TData, Liveness["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const livenessSuspenseQueryKey = () => [{ url: "/v1/probe/liveness" }] as const;
export type LivenessSuspenseQueryKey = ReturnType<typeof livenessSuspenseQueryKey>;
export function livenessSuspenseQueryOptions(options: Liveness["client"]["parameters"] = {}) {
    const queryKey = livenessSuspenseQueryKey();
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<Liveness["data"], Liveness["error"]>({
                method: "get",
                url: `/v1/probe/liveness`,
                ...options
            });
            return res;
        },
    });
}
/**
 * @summary Liveness probe includes http, storage, memory, database
 * @link /v1/probe/liveness
 */
export function useLivenessSuspense<TData = Liveness["response"], TQueryKey extends QueryKey = LivenessSuspenseQueryKey>(options: {
    query?: Partial<UseSuspenseQueryOptions<Liveness["response"], Liveness["error"], TData, TQueryKey>>;
    client?: Liveness["client"]["parameters"];
} = {}): UseSuspenseQueryResult<TData, Liveness["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? livenessSuspenseQueryKey();
    const query = useSuspenseQuery({
        ...livenessSuspenseQueryOptions(clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseSuspenseQueryResult<TData, Liveness["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}