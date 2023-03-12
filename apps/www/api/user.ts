import { req } from './request';
import { BaseResSchema, UserProfile } from '@letscollab/trait';

export const fetchUserProfile = async (): Promise<
  BaseResSchema<UserProfile>
> => {
  const { data } = await req.get('/v1/user/profile');
  return data ?? {};
};
