import { PrjStatus } from './../constant/enum';
import { faker } from '@faker-js/faker';
import { BaseResSchema } from './../interface';
import { type IProject } from './org';
import { mock } from './request';
import { FakeSingleUserProfile } from './user.mock';

mock.onGet('/v1/prj/list').reply<BaseResSchema<IProject[]>>(200, {
  code: 1,
  message: 'Success',
  d: Array.from({ length: 10 }).map((_, i) => ({
    id: faker.datatype.number(),
    name: faker.name.findName(),
    description: faker.commerce.productDescription(),
    contactEmail: faker.internet.email(),
    createTime: faker.date.past(),
    updateTime: faker.date.past(),
    githubRepoUrl: faker.internet.url(),
    members: Array.from({ length: Math.ceil(Math.random() * 10) }).map(() =>
      FakeSingleUserProfile(),
    ),
    cover: faker.image.food(),
    status: Object.values(PrjStatus)[Math.floor(Math.random() * 4)],
  })),
});
