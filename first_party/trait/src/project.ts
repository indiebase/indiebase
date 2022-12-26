import { UserProfile } from './user/user.interface';

/**
 * Project Status Enum
 */
export enum PrjStatus {
  /* proof of concept */
  poc = 'poc',
  /* working in progress */
  wip = 'wip',
  /*  project dead */
  archive = 'archive',
  /* project is operating, */
  operating = 'operating',
  /* project has closed */
  closed = 'closed',
}

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
