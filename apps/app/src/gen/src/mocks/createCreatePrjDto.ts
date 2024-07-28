import { faker } from "@faker-js/faker";
import type { CreatePrjDto } from "../../types/CreatePrjDto";


export function createCreatePrjDto(data: NonNullable<Partial<CreatePrjDto>> = {}): NonNullable<CreatePrjDto> {
    faker.seed([100]);
    return {
        ...{ "name": faker.string.alpha() },
        ...data
    };
}