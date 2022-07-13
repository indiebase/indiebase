import { OrgSelectProps } from '../components';
import { AccountStatus, SignupType } from '../constant';
import { BaseResSchema } from '@letscollab/app-utils';
import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';
import { req } from './request';
import './user.mock';

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

export const userProfile = atom({});

export const userProfileQuery = atomWithQuery((get) => ({
  queryKey: ['user-profile', get(userProfile)],
  queryFn: async (...r): Promise<BaseResSchema<UserProfile>> => {
    const { data } = await req.get('/v1/user/profile');
    return data;
  },
}));
