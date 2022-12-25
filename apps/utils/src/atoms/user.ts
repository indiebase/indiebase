import { UserProfile } from '@letscollab-nest/trait';
import { atom } from 'jotai';

export const userProfileAtom = atom<UserProfile>(null as UserProfile);
