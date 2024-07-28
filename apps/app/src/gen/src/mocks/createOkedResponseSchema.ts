import { faker } from "@faker-js/faker";
import type { OkedResponseSchema } from "../../types/OkedResponseSchema";


export function createOkedResponseSchema(data: NonNullable<Partial<OkedResponseSchema>> = {}): NonNullable<OkedResponseSchema> {
    faker.seed([100]);
    return {
        ...{ "code": faker.number.float(), "message": {} },
        ...data
    };
}