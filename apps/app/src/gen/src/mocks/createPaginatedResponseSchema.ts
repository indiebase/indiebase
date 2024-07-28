import { faker } from '@faker-js/faker';

import type { PaginatedResponseSchema } from '../../types/PaginatedResponseSchema';

export function createPaginatedResponseSchema(
  data: NonNullable<Partial<PaginatedResponseSchema>> = {},
): NonNullable<PaginatedResponseSchema> {
  faker.seed([100]);
  return {
    ...{
      total: faker.number.float(),
      pageIndex: faker.number.float(),
      pageSize: faker.number.float(),
      lastPage: faker.number.float(),
      prevPage: faker.number.float(),
      nextPage: faker.number.float(),
      code: faker.number.float(),
      message: {},
    },
    ...data,
  };
}
