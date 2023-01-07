import { UserProfile } from '@letscollab-nest/trait';
import { atom } from 'jotai';
import { atomsWithMutation, atomsWithQuery } from 'jotai-tanstack-query';
import { fetchMyOrgs, fetchUserProfile } from '../api';

export const userProfileAtom = atom<UserProfile>(null as UserProfile);

export const userProfileQueryAtom = atomsWithQuery((get) => ({
  queryKey: ['user-profile'],
  queryFn: fetchUserProfile,
}));

export const ownOrgsQueryAtom = atomsWithQuery((get) => ({
  queryKey: ['user-orgs', get(userProfileAtom)],
  queryFn: fetchMyOrgs,
}));

export const userProfileMutationAtom = atomsWithMutation((get) => ({
  mutationKey: ['user-profile'],
  mutationFn: fetchUserProfile,
}));
