import { req } from './request';
import type { BaseResSchema, UserProfile } from '@letscollab-nest/trait';

export const fetchUserProfile = async (): Promise<
  BaseResSchema<UserProfile>
> => {
  const { data } = await req.get('/v1/user/profile');
  return data ?? {};
};

export const updateUserProfile = async (
  body: Record<string, any>,
): Promise<BaseResSchema<UserProfile>> => {
  const { data } = await req.put('/v1/user/profile', body);
  return data ?? {};
};

export const fetchMyOrgs = async () => {};
