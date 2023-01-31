import { atomsWithMutation, atomsWithQuery } from 'jotai-tanstack-query';
import { fetchUserProfile } from '../api';

export const userProfileQueryAtom = atomsWithQuery(() => ({
  queryKey: ['user-profile'],
  queryFn: fetchUserProfile,
}));

export const userProfileMutationAtom = atomsWithMutation(() => ({
  mutationKey: ['user-profile'],
  mutationFn: fetchUserProfile,
}));
