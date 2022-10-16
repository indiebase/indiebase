import { faker } from '@faker-js/faker';
import {
  AccountStatus,
  SignupType,
  BaseResSchema,
  UserProfile,
} from '@letscollab/common-trait';
import { mock } from '../api';

export const FakeSingleUserProfile = () => ({
  id: faker.datatype.number(),
  username: faker.name.middleName(),
  nickname: faker.name.fullName(),
  status: AccountStatus.active,
  signupType: SignupType.github,
  avatar: faker.image.avatar(),
  email: faker.internet.email(),
  createTime: faker.date.past(),
  updateTime: faker.date.past(),
  company: faker.company.name(),
});

mock.onGet('/v1/user/profile').reply<BaseResSchema<UserProfile>>(200, {
  code: 1,
  message: 'Success',
  d: {
    ...FakeSingleUserProfile(),
    orgs: Array.from({ length: 5 }).map((_, index) => ({
      value: 'organization' + index,
      label: 'organization' + index,
      logo: faker.image.avatar(),
    })),
  },
});
