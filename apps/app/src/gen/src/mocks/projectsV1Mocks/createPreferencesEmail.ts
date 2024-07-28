import { faker } from "@faker-js/faker";
import { createOkedResponseSchema } from "../createOkedResponseSchema";
import { createErrResponseSchema } from "../createErrResponseSchema";
import type { PreferencesEmailHeaderParams, PreferencesEmail200, PreferencesEmail401, PreferencesEmail403, PreferencesEmail500, PreferencesEmailMutationResponse } from "../../../types/PreferencesEmail";


export function createPreferencesEmailHeaderParams(): NonNullable<PreferencesEmailHeaderParams> {
    faker.seed([100]);
    return { "x-indiebase-reference-id": faker.string.alpha(), "x-indiebase-ap": faker.string.alpha() };
}


export function createPreferencesEmail200(): NonNullable<PreferencesEmail200> {
    faker.seed([100]);
    return Object.assign({}, createOkedResponseSchema());
}


export function createPreferencesEmail401(): NonNullable<PreferencesEmail401> {
    faker.seed([100]);
    return createErrResponseSchema();
}


export function createPreferencesEmail403(): NonNullable<PreferencesEmail403> {
    faker.seed([100]);
    return createErrResponseSchema();
}


export function createPreferencesEmail500(): NonNullable<PreferencesEmail500> {
    faker.seed([100]);
    return createErrResponseSchema();
}


export function createPreferencesEmailMutationResponse(): NonNullable<PreferencesEmailMutationResponse> {
    faker.seed([100]);
    return Object.assign({}, createOkedResponseSchema());
}