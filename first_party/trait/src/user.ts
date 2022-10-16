import { AccountStatus, SignupType } from './enum';

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
  orgs?: any[];
}
