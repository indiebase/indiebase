import { faker } from "@faker-js/faker";
import type { ProjectDto } from "../../types/ProjectDto";


export function createProjectDto(data: NonNullable<Partial<ProjectDto>> = {}): NonNullable<ProjectDto> {
    faker.seed([100]);
    return {
        ...{ "id": faker.number.float(), "name": faker.string.alpha(), "description": faker.string.alpha(), "contactEmail": faker.string.alpha(), "avatarUrl": faker.string.alpha(), "pinnedOrder": faker.number.float(), "pinned": faker.datatype.boolean(), "status": faker.helpers.arrayElement<any>(["poc", "wip", "archive", "operating", "closed"]), "packageName": faker.string.alpha(), "githubRepo": faker.string.alpha(), "referenceId": faker.string.alpha(), "createdAt": faker.date.anytime(), "updatedAt": faker.date.anytime() },
        ...data
    };
}