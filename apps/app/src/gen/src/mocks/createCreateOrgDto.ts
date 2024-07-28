import { faker } from "@faker-js/faker";
import type { CreateOrgDto } from "../../types/CreateOrgDto";


export function createCreateOrgDto(data: NonNullable<Partial<CreateOrgDto>> = {}): NonNullable<CreateOrgDto> {
    faker.seed([100]);
    return {
        ...{ "name": faker.string.alpha() },
        ...data
    };
}