import { faker } from "@faker-js/faker";
import { createPaginatedResponseSchema } from "../createPaginatedResponseSchema";
import { createOrgDto } from "../createOrgDto";
import { createErrResponseSchema } from "../createErrResponseSchema";
import type { QueryOwnedQueryParams, QueryOwnedHeaderParams, QueryOwned200, QueryOwned401, QueryOwned403, QueryOwned500, QueryOwnedQueryResponse } from "../../../types/QueryOwned";


export function createQueryOwnedQueryParams(): NonNullable<QueryOwnedQueryParams> {
    faker.seed([100]);
    return { "pageIndex": faker.number.float(), "pageSize": faker.number.float() };
}


export function createQueryOwnedHeaderParams(): NonNullable<QueryOwnedHeaderParams> {
    faker.seed([100]);
    return { "x-indiebase-reference-id": faker.string.alpha(), "x-indiebase-ap": faker.string.alpha() };
}


export function createQueryOwned200(): NonNullable<QueryOwned200> {
    faker.seed([100]);
    return Object.assign({}, createPaginatedResponseSchema(), { "body": faker.helpers.arrayElements([createOrgDto()]) as any });
}


export function createQueryOwned401(): NonNullable<QueryOwned401> {
    faker.seed([100]);
    return createErrResponseSchema();
}


export function createQueryOwned403(): NonNullable<QueryOwned403> {
    faker.seed([100]);
    return createErrResponseSchema();
}


export function createQueryOwned500(): NonNullable<QueryOwned500> {
    faker.seed([100]);
    return createErrResponseSchema();
}


export function createQueryOwnedQueryResponse(): NonNullable<QueryOwnedQueryResponse> {
    faker.seed([100]);
    return Object.assign({}, createPaginatedResponseSchema(), { "body": faker.helpers.arrayElements([createOrgDto()]) as any });
}