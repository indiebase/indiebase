import { PrjStatus } from './enum';
import { UserProfile } from './user';

export interface IProject {
  id: number;
  name: string;
  contactEmail: string;
  status?: PrjStatus;
  description?: string;
  createTime: Date;
  updateTime: Date;
  members?: UserProfile[];
  githubRepoUrl?: string;
  cover?: string;
}
