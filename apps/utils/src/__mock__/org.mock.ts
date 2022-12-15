import { faker } from '@faker-js/faker';
import { BaseResSchema, IProject, PrjStatus } from '@letscollab-nest/trait';
import { mock } from '../api';
import { FakeSingleUserProfile } from './user.mock';

mock.onGet('/v1/prj/list').reply<BaseResSchema<IProject[]>>(200, {
  code: 1,
  message: 'Success',
  d: Array.from({ length: 10 }).map((_, i) => ({
    id: faker.datatype.number(),
    name: faker.company.catchPhraseAdjective(),
    description: (i + 1) % 3 === 0 ? null : faker.commerce.productDescription(),
    contactEmail: faker.internet.email(),
    createTime: faker.date.past(),
    updateTime: faker.date.past(),
    githubRepoUrl: faker.internet.url(),
    members: Array.from({ length: Math.ceil(Math.random() * 10) }).map(() =>
      FakeSingleUserProfile(),
    ),
    cover: (i + 1) % 3 === 0 ? null : faker.image.food(),
    status: Object.values(PrjStatus)[Math.floor(Math.random() * 4)],
  })),
});
