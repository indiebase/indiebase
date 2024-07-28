import { faker } from '@faker-js/faker';

import type { HackerDto } from '../../types/HackerDto';

export function createHackerDto(
  data: NonNullable<Partial<HackerDto>> = {},
): NonNullable<HackerDto> {
  faker.seed([100]);
  return {
    ...{
      id: faker.number.float(),
      email: faker.number.float(),
      nickname: faker.string.alpha(),
      avatarUrl: faker.string.alpha(),
      language: faker.string.alpha(),
      authnType: faker.string.alpha(),
      enabled2FA: faker.datatype.boolean(),
      location: faker.string.alpha(),
      accountStatus: faker.helpers.arrayElement<any>(['inactive', 'active']),
      role: faker.string.alpha(),
      signInAt: faker.string.alpha(),
      createdAt: faker.date.anytime(),
      updatedAt: faker.date.anytime(),
      bio: faker.string.alpha(),
      visibility: faker.helpers.arrayElement<any>([
        'public',
        'protected',
        'private',
      ]),
      homepage: faker.string.alpha(),
      githubUsername: faker.string.alpha(),
    },
    ...data,
  };
}
