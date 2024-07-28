import { faker } from "@faker-js/faker";
import { createOkedResponseSchema } from "../createOkedResponseSchema";
import { createErrResponseSchema } from "../createErrResponseSchema";
import type { GetAuthProvidersHeaderParams, GetAuthProviders200, GetAuthProviders401, GetAuthProviders403, GetAuthProviders500, GetAuthProvidersQueryResponse } from "../../../types/GetAuthProviders";


export function createGetAuthProvidersHeaderParams(): NonNullable<GetAuthProvidersHeaderParams> {
    faker.seed([100]);
    return { "x-indiebase-reference-id": faker.string.alpha(), "x-indiebase-ap": faker.string.alpha() };
}


export function createGetAuthProviders200(): NonNullable<GetAuthProviders200> {
    faker.seed([100]);
    return Object.assign({}, createOkedResponseSchema());
}


export function createGetAuthProviders401(): NonNullable<GetAuthProviders401> {
    faker.seed([100]);
    return createErrResponseSchema();
}


export function createGetAuthProviders403(): NonNullable<GetAuthProviders403> {
    faker.seed([100]);
    return createErrResponseSchema();
}


export function createGetAuthProviders500(): NonNullable<GetAuthProviders500> {
    faker.seed([100]);
    return createErrResponseSchema();
}


export function createGetAuthProvidersQueryResponse(): NonNullable<GetAuthProvidersQueryResponse> {
    faker.seed([100]);
    return Object.assign({}, createOkedResponseSchema());
}