import { faker } from "@faker-js/faker";
import type { ErrResponseSchema } from "../../types/ErrResponseSchema";


export function createErrResponseSchema(data: NonNullable<Partial<ErrResponseSchema>> = {}): NonNullable<ErrResponseSchema> {
    faker.seed([100]);
    return {
        ...{ "code": faker.number.float(), "statusCode": faker.number.float(), "message": {}, "timestamp": faker.date.anytime(), "path": faker.string.alpha() },
        ...data
    };
}