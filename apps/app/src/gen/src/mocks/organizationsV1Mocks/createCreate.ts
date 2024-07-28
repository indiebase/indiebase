import { faker } from "@faker-js/faker";
import { createOkedResponseSchema } from "../createOkedResponseSchema";
import { createErrResponseSchema } from "../createErrResponseSchema";
import { createCreateOrgDto } from "../createCreateOrgDto";
import type { CreateHeaderParams, Create201, Create401, Create403, Create500, CreateMutationRequest, CreateMutationResponse } from "../../../types/Create";


export function createCreateHeaderParams(): NonNullable<CreateHeaderParams> {
    faker.seed([100]);
    return { "x-indiebase-reference-id": faker.string.alpha(), "x-indiebase-ap": faker.string.alpha() };
}


export function createCreate201(): NonNullable<Create201> {
    faker.seed([100]);
    return Object.assign({}, createOkedResponseSchema());
}


export function createCreate401(): NonNullable<Create401> {
    faker.seed([100]);
    return createErrResponseSchema();
}


export function createCreate403(): NonNullable<Create403> {
    faker.seed([100]);
    return createErrResponseSchema();
}


export function createCreate500(): NonNullable<Create500> {
    faker.seed([100]);
    return createErrResponseSchema();
}


export function createCreateMutationRequest(): NonNullable<CreateMutationRequest> {
    faker.seed([100]);
    return createCreateOrgDto();
}


export function createCreateMutationResponse(): NonNullable<CreateMutationResponse> {
    faker.seed([100]);
    return Object.assign({}, createOkedResponseSchema());
}