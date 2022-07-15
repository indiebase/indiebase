import { faker } from '@faker-js/faker';
import { BaseResSchema } from './../interface';
import { type IProject } from './org';
import { mock } from './request';

mock.onGet('/v1/prj/list').reply<BaseResSchema<IProject[]>>(200, {
  code: 1,
  message: 'Success',
  d: Array.from({ length: 10 }).map(() => ({
    id: faker.datatype.number(),
    name: faker.name.findName(),
    contactEmail: faker.internet.email(),
    createTime: faker.date.past(),
    updateTime: faker.date.past(),
  })),
});
