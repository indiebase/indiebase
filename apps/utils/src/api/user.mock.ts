import { SignupType } from '../constant/enum';
import { AccountStatus } from '../constant';
import { BaseResSchema } from '../interface';
import { faker } from '@faker-js/faker';
import { mock } from './request';
import { type UserProfile } from './user';

export const FakeSingleUserProfile = () => ({
  id: faker.datatype.number(),
  username: faker.name.findName(),
  nickname: faker.name.findName(),
  status: AccountStatus.active,
  signupType: SignupType.github,
  avatar: faker.image.avatar(),
  email: faker.internet.email(),
  createTime: faker.date.past(),
  updateTime: faker.date.past(),
  company: faker.company.companyName(),
});

mock.onGet('/v1/user/profile').reply<BaseResSchema<UserProfile>>(200, {
  code: 1,
  message: 'Success',
  d: {
    ...FakeSingleUserProfile(),
    orgs: Array.from({ length: 5 }).map((_, index) => ({
      value: index.toString(),
      label: 'organization' + index,
      logo: faker.image.food(),
    })),
  },
});
