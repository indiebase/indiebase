import { faker } from "@faker-js/faker";
import { createOkedResponseSchema } from "../createOkedResponseSchema";
import { createErrResponseSchema } from "../createErrResponseSchema";
import { createSignUpHackersDto } from "../createSignUpHackersDto";
import type { SignupHeaderParams, Signup201, Signup401, Signup403, Signup500, SignupMutationRequest, SignupMutationResponse } from "../../../types/Signup";


export function createSignupHeaderParams(): NonNullable<SignupHeaderParams> {
    faker.seed([100]);
    return { "x-indiebase-reference-id": faker.string.alpha(), "x-indiebase-ap": faker.string.alpha() };
}


export function createSignup201(): NonNullable<Signup201> {
    faker.seed([100]);
    return Object.assign({}, createOkedResponseSchema());
}


export function createSignup401(): NonNullable<Signup401> {
    faker.seed([100]);
    return createErrResponseSchema();
}


export function createSignup403(): NonNullable<Signup403> {
    faker.seed([100]);
    return createErrResponseSchema();
}


export function createSignup500(): NonNullable<Signup500> {
    faker.seed([100]);
    return createErrResponseSchema();
}


export function createSignupMutationRequest(): NonNullable<SignupMutationRequest> {
    faker.seed([100]);
    return createSignUpHackersDto();
}


export function createSignupMutationResponse(): NonNullable<SignupMutationResponse> {
    faker.seed([100]);
    return Object.assign({}, createOkedResponseSchema());
}