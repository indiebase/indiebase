import { SignupType } from './../constant/enum';
import { AccountStatus } from '../constant';
import { BaseResSchema } from '../interface';
import { faker } from '@faker-js/faker';
import { mock } from './request';
import { type UserProfile } from './user';

mock.onGet('/v1/user/profile').reply<BaseResSchema<UserProfile>>(200, {
  code: 1,
  message: 'Success',
  d: {
    id: faker.datatype.number(),
    username: faker.name.findName(),
    nickname: faker.name.findName(),
    status: AccountStatus.active,
    signupType: SignupType.github,
    avatar: faker.image.business(),
    email: faker.internet.email(),
    createTime: faker.date.past(),
    updateTime: faker.date.past(),
    company: faker.company.companyName(),
    orgs: Array.from({ length: 5 }).map(() => ({
      value: faker.datatype.number().toString(),
      label: faker.company.catchPhraseAdjective(),
      logo: faker.image.food(),
    })),
  },
});
