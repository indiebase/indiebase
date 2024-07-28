import { faker } from "@faker-js/faker";
import type { SignUpHackersDto } from "../../types/SignUpHackersDto";


export function createSignUpHackersDto(data: NonNullable<Partial<SignUpHackersDto>> = {}): NonNullable<SignUpHackersDto> {
    faker.seed([100]);
    return {
        ...{ "email": faker.string.alpha(), "username": faker.string.alpha(), "password": faker.string.alpha() },
        ...data
    };
}