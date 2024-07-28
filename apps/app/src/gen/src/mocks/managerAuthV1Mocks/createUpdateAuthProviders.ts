import { faker } from "@faker-js/faker";
import { createOkedResponseSchema } from "../createOkedResponseSchema";
import { createErrResponseSchema } from "../createErrResponseSchema";
import type { UpdateAuthProvidersHeaderParams, UpdateAuthProviders200, UpdateAuthProviders401, UpdateAuthProviders403, UpdateAuthProviders500, UpdateAuthProvidersMutationResponse } from "../../../types/UpdateAuthProviders";


export function createUpdateAuthProvidersHeaderParams(): NonNullable<UpdateAuthProvidersHeaderParams> {
    faker.seed([100]);
    return { "x-indiebase-reference-id": faker.string.alpha(), "x-indiebase-ap": faker.string.alpha() };
}


export function createUpdateAuthProviders200(): NonNullable<UpdateAuthProviders200> {
    faker.seed([100]);
    return Object.assign({}, createOkedResponseSchema());
}


export function createUpdateAuthProviders401(): NonNullable<UpdateAuthProviders401> {
    faker.seed([100]);
    return createErrResponseSchema();
}


export function createUpdateAuthProviders403(): NonNullable<UpdateAuthProviders403> {
    faker.seed([100]);
    return createErrResponseSchema();
}


export function createUpdateAuthProviders500(): NonNullable<UpdateAuthProviders500> {
    faker.seed([100]);
    return createErrResponseSchema();
}


export function createUpdateAuthProvidersMutationResponse(): NonNullable<UpdateAuthProvidersMutationResponse> {
    faker.seed([100]);
    return Object.assign({}, createOkedResponseSchema());
}