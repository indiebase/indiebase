import { req } from './request';
import type { BaseResSchema, UserProfile } from '@letscollab-nest/trait';

export const fetchUserProfile = async (): Promise<
  BaseResSchema<UserProfile>
> => {
  const { data } = await req.get('/v1/user/profile');
  return data ?? {};
};