import { faker } from "@faker-js/faker";
import { createPaginatedResponseSchema } from "../createPaginatedResponseSchema";
import { createOrgDto } from "../createOrgDto";
import { createErrResponseSchema } from "../createErrResponseSchema";
import type { QueryPathParams, QueryHeaderParams, Query200, Query401, Query403, Query500, QueryQueryResponse } from "../../../types/Query";


export function createQueryPathParams(): NonNullable<QueryPathParams> {
    faker.seed([100]);
    return { "org": unknown };
}


export function createQueryHeaderParams(): NonNullable<QueryHeaderParams> {
    faker.seed([100]);
    return { "x-indiebase-reference-id": faker.string.alpha(), "x-indiebase-ap": faker.string.alpha() };
}


export function createQuery200(): NonNullable<Query200> {
    faker.seed([100]);
    return Object.assign({}, createPaginatedResponseSchema(), { "body": faker.helpers.arrayElements([createOrgDto()]) as any });
}


export function createQuery401(): NonNullable<Query401> {
    faker.seed([100]);
    return createErrResponseSchema();
}


export function createQuery403(): NonNullable<Query403> {
    faker.seed([100]);
    return createErrResponseSchema();
}


export function createQuery500(): NonNullable<Query500> {
    faker.seed([100]);
    return createErrResponseSchema();
}


export function createQueryQueryResponse(): NonNullable<QueryQueryResponse> {
    faker.seed([100]);
    return Object.assign({}, createPaginatedResponseSchema(), { "body": faker.helpers.arrayElements([createOrgDto()]) as any });
}