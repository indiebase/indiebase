import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';
import { req } from './request';
import { loadable } from 'jotai/utils';
import { BaseResSchema, UserProfile } from '@letscollab-nest/trait';

export const userProfileAtom = atom<BaseResSchema<UserProfile>>({} as any);

export const fetchUserProfile = async (): Promise<
  BaseResSchema<UserProfile>
> => {
  const { data } = await req.get('/v1/user/profile');
  return data ?? {};
};

export const userProfileQuery = atomWithQuery((get) => ({
  queryKey: ['profile', get(userProfileAtom)],
  queryFn: fetchUserProfile,
}));

export const loadableUserProfile = loadable(userProfileQuery);
