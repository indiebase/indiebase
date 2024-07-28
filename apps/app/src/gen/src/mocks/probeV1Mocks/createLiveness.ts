import { faker } from "@faker-js/faker";
import type { Liveness200, Liveness503, LivenessQueryResponse } from "../../../types/Liveness";

 /**
 * @description The Health Check is successful
 */
export function createLiveness200(): NonNullable<Liveness200> {
    faker.seed([100]);
    return { "status": faker.string.alpha(), "info": {}, "error": {}, "details": {} };
}

 /**
 * @description The Health Check is not successful
 */
export function createLiveness503(): NonNullable<Liveness503> {
    faker.seed([100]);
    return { "status": faker.string.alpha(), "info": {}, "error": {}, "details": {} };
}

 /**
 * @description The Health Check is successful
 */
export function createLivenessQueryResponse(): NonNullable<LivenessQueryResponse> {
    faker.seed([100]);
    return { "status": faker.string.alpha(), "info": {}, "error": {}, "details": {} };
}