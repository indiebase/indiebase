import { faker } from "@faker-js/faker";
import { createOkedResponseSchema } from "../createOkedResponseSchema";
import { createErrResponseSchema } from "../createErrResponseSchema";
import type { DeletePathParams, DeleteHeaderParams, Delete200, Delete401, Delete403, Delete500, DeleteMutationResponse } from "../../../types/Delete";


export function createDeletePathParams(): NonNullable<DeletePathParams> {
    faker.seed([100]);
    return { "org": unknown };
}


export function createDeleteHeaderParams(): NonNullable<DeleteHeaderParams> {
    faker.seed([100]);
    return { "x-indiebase-reference-id": faker.string.alpha(), "x-indiebase-ap": faker.string.alpha() };
}


export function createDelete200(): NonNullable<Delete200> {
    faker.seed([100]);
    return Object.assign({}, createOkedResponseSchema());
}


export function createDelete401(): NonNullable<Delete401> {
    faker.seed([100]);
    return createErrResponseSchema();
}


export function createDelete403(): NonNullable<Delete403> {
    faker.seed([100]);
    return createErrResponseSchema();
}


export function createDelete500(): NonNullable<Delete500> {
    faker.seed([100]);
    return createErrResponseSchema();
}


export function createDeleteMutationResponse(): NonNullable<DeleteMutationResponse> {
    faker.seed([100]);
    return Object.assign({}, createOkedResponseSchema());
}