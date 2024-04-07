import { faker } from '@faker-js/faker';
import { mock } from './request';

export const FakeSingleUserProfile = () => ({
  id: faker.number.int(),
  username: faker.person.middleName(),
  nickname: faker.person.fullName(),
  status: 1,
  signupType: 'github',
  avatar: faker.image.avatar(),
  email: faker.internet.email(),
  createTime: faker.date.past(),
  updateTime: faker.date.past(),
  company: faker.company.name(),
});

mock.onGet('/v1/user/profile').reply(200, {
  code: 1,
  message: 'Success',
  ...FakeSingleUserProfile(),
  organizations: Array.from({ length: 5 }).map((_, index) => ({
    value: 'organization' + index,
    label: 'organization' + index,
    logo: faker.image.avatar(),
  })),
});

mock.onPost('/v1/auth/2fa').reply(200, {
  code: 1,
  message: 'Success',
  ...FakeSingleUserProfile(),
  organizations: Array.from({ length: 5 }).map((_, index) => ({
    value: 'organization' + index,
    label: 'organization' + index,
    logo: faker.image.avatar(),
  })),
});

mock.onPost('/v1/auth/2fa/verify').reply(200, {
  code: 1,
  message: 'Success',
  ...FakeSingleUserProfile(),
  organizations: Array.from({ length: 5 }).map((_, index) => ({
    value: 'organization' + index,
    label: 'organization' + index,
    logo: faker.image.avatar(),
  })),
});
