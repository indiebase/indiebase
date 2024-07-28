import { faker } from "@faker-js/faker";
import { createOkedResponseSchema } from "../createOkedResponseSchema";
import { createErrResponseSchema } from "../createErrResponseSchema";
import { createUpdateOrgDto } from "../createUpdateOrgDto";
import type { UpdatePathParams, UpdateHeaderParams, Update200, Update401, Update403, Update500, UpdateMutationRequest, UpdateMutationResponse } from "../../../types/Update";


export function createUpdatePathParams(): NonNullable<UpdatePathParams> {
    faker.seed([100]);
    return { "org": unknown };
}


export function createUpdateHeaderParams(): NonNullable<UpdateHeaderParams> {
    faker.seed([100]);
    return { "x-indiebase-reference-id": faker.string.alpha(), "x-indiebase-ap": faker.string.alpha() };
}


export function createUpdate200(): NonNullable<Update200> {
    faker.seed([100]);
    return Object.assign({}, createOkedResponseSchema());
}


export function createUpdate401(): NonNullable<Update401> {
    faker.seed([100]);
    return createErrResponseSchema();
}


export function createUpdate403(): NonNullable<Update403> {
    faker.seed([100]);
    return createErrResponseSchema();
}


export function createUpdate500(): NonNullable<Update500> {
    faker.seed([100]);
    return createErrResponseSchema();
}


export function createUpdateMutationRequest(): NonNullable<UpdateMutationRequest> {
    faker.seed([100]);
    return createUpdateOrgDto();
}


export function createUpdateMutationResponse(): NonNullable<UpdateMutationResponse> {
    faker.seed([100]);
    return Object.assign({}, createOkedResponseSchema());
}