import { faker } from "@faker-js/faker";
import { createOkedResponseSchema } from "../createOkedResponseSchema";
import { createErrResponseSchema } from "../createErrResponseSchema";
import type { DeletePermanentPathParams, DeletePermanentHeaderParams, DeletePermanent200, DeletePermanent401, DeletePermanent403, DeletePermanent500, DeletePermanentMutationResponse } from "../../../types/DeletePermanent";


export function createDeletePermanentPathParams(): NonNullable<DeletePermanentPathParams> {
    faker.seed([100]);
    return { "org": unknown };
}


export function createDeletePermanentHeaderParams(): NonNullable<DeletePermanentHeaderParams> {
    faker.seed([100]);
    return { "x-indiebase-reference-id": faker.string.alpha(), "x-indiebase-ap": faker.string.alpha() };
}


export function createDeletePermanent200(): NonNullable<DeletePermanent200> {
    faker.seed([100]);
    return Object.assign({}, createOkedResponseSchema());
}


export function createDeletePermanent401(): NonNullable<DeletePermanent401> {
    faker.seed([100]);
    return createErrResponseSchema();
}


export function createDeletePermanent403(): NonNullable<DeletePermanent403> {
    faker.seed([100]);
    return createErrResponseSchema();
}


export function createDeletePermanent500(): NonNullable<DeletePermanent500> {
    faker.seed([100]);
    return createErrResponseSchema();
}


export function createDeletePermanentMutationResponse(): NonNullable<DeletePermanentMutationResponse> {
    faker.seed([100]);
    return Object.assign({}, createOkedResponseSchema());
}