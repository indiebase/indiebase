import { faker } from '@faker-js/faker';
import { CommonStatus } from '@letscollab/app-utils';
import { mock } from './request';

mock.onGet('/v1/user/profile').reply(200, {
  code: 1,
  message: 'Success',
  d: {
    id: faker.datatype.number(),
    username: faker.name.findName(),
    nickname: faker.name.findName(),
    status: CommonStatus.active,
    orgs: Array.from({ length: 5 }).map(() => ({
      value: faker.datatype.number().toString(),
      label: faker.company.catchPhraseAdjective(),
      logo: faker.image.food(),
    })),
  },
});
