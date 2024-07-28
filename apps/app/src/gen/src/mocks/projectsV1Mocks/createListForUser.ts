import { faker } from "@faker-js/faker";
import { createPaginatedResponseSchema } from "../createPaginatedResponseSchema";
import { createErrResponseSchema } from "../createErrResponseSchema";
import type { ListForUserHeaderParams, ListForUser200, ListForUser401, ListForUser403, ListForUser500, ListForUserQueryResponse } from "../../../types/ListForUser";


export function createListForUserHeaderParams(): NonNullable<ListForUserHeaderParams> {
    faker.seed([100]);
    return { "x-indiebase-reference-id": faker.string.alpha(), "x-indiebase-ap": faker.string.alpha() };
}


export function createListForUser200(): NonNullable<ListForUser200> {
    faker.seed([100]);
    return Object.assign({}, createPaginatedResponseSchema());
}


export function createListForUser401(): NonNullable<ListForUser401> {
    faker.seed([100]);
    return createErrResponseSchema();
}


export function createListForUser403(): NonNullable<ListForUser403> {
    faker.seed([100]);
    return createErrResponseSchema();
}


export function createListForUser500(): NonNullable<ListForUser500> {
    faker.seed([100]);
    return createErrResponseSchema();
}


export function createListForUserQueryResponse(): NonNullable<ListForUserQueryResponse> {
    faker.seed([100]);
    return Object.assign({}, createPaginatedResponseSchema());
}