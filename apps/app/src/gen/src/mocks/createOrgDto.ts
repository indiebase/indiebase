import { faker } from '@faker-js/faker';
import type { OrgDto } from '../../types/OrgDto';

export function createOrgDto(
  data: NonNullable<Partial<OrgDto>> = {},
): NonNullable<OrgDto> {
  faker.seed([100]);
  return {
    ...{
      id: faker.number.float(),
      name: faker.string.alpha(),
      description: faker.string.alpha(),
      contactEmail: faker.string.alpha(),
      avatarUrl: faker.string.alpha(),
      githubOrg: faker.string.alpha(),
      homepage: faker.string.alpha(),
      ownerId: faker.string.alpha(),
      createdAt: faker.date.anytime(),
      updatedAt: faker.date.anytime(),
    },
    ...data,
  };
}
