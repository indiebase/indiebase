import { OrgSelectProps } from '../components';
import { AccountStatus, SignupType } from '../constant';
import { BaseResSchema } from '@letscollab/app-utils';
import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';
import { req } from './request';
import './user.mock';
import { loadable } from 'jotai/utils';

export interface UserProfile {
  id: number;
  signupType: SignupType;
  githubId?: string;
  profileUrl?: string;
  avatar?: string;
  company?: string;
  username: string;
  email: string;
  bio?: string;
  nickname?: string;
  status?: AccountStatus;
  createTime: Date;
  updateTime: Date;
  orgs?: OrgSelectProps[];
}

export const userProfileAtom = atom({});

export const userProfileQuery = atomWithQuery((get) => ({
  queryKey: ['own-profile', get(userProfileAtom)],
  queryFn: async (...r): Promise<BaseResSchema<UserProfile>> => {
    const { data } = await req.get('/v1/user/profile');
    return data;
  },
}));

export const loadableUserProfile = loadable(userProfileQuery);
