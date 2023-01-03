import { UserProfile } from '@letscollab-nest/trait';
import { atom } from 'jotai';
import { atomsWithMutation, atomsWithQuery } from 'jotai-tanstack-query';
import { fetchUserProfile } from '../api';

export const userProfileAtom = atom<UserProfile>(null as UserProfile);

export const userProfileQueryAtom = atomsWithQuery((get) => ({
  queryKey: ['user-profile', get(userProfileAtom)],
  queryFn: fetchUserProfile,
}));

export const userProfileMutationAtom = atomsWithMutation((get) => ({
  mutationKey: ['user-profile'],
  mutationFn: fetchUserProfile,
}));
