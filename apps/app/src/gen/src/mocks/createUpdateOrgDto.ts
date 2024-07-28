import { faker } from "@faker-js/faker";
import type { UpdateOrgDto } from "../../types/UpdateOrgDto";


export function createUpdateOrgDto(data: NonNullable<Partial<UpdateOrgDto>> = {}): NonNullable<UpdateOrgDto> {
    faker.seed([100]);
    return {
        ...{ "name": faker.string.alpha(), "contactEmail": faker.string.alpha(), "description": faker.string.alpha(), "avatarUrl": faker.string.alpha() },
        ...data
    };
}