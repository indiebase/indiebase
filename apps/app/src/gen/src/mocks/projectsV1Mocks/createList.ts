import { faker } from "@faker-js/faker";
import { createPaginatedResponseSchema } from "../createPaginatedResponseSchema";
import { createProjectDto } from "../createProjectDto";
import { createErrResponseSchema } from "../createErrResponseSchema";
import type { List200, List401, List403, List500, ListQueryResponse } from "../../../types/List";


export function createList200(): NonNullable<List200> {
    faker.seed([100]);
    return Object.assign({}, createPaginatedResponseSchema(), { "body": faker.helpers.arrayElements([createProjectDto()]) as any });
}


export function createList401(): NonNullable<List401> {
    faker.seed([100]);
    return createErrResponseSchema();
}


export function createList403(): NonNullable<List403> {
    faker.seed([100]);
    return createErrResponseSchema();
}


export function createList500(): NonNullable<List500> {
    faker.seed([100]);
    return createErrResponseSchema();
}


export function createListQueryResponse(): NonNullable<ListQueryResponse> {
    faker.seed([100]);
    return Object.assign({}, createPaginatedResponseSchema(), { "body": faker.helpers.arrayElements([createProjectDto()]) as any });
}