export enum AccountStatus {
  inactive = 'inactive',
  active = 'active',
}

export interface UserProfile {
  id: number;
  githubId?: string;
  githubAccessToken?: string;
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
