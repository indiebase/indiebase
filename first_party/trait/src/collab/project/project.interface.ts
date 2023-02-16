import { UserProfile } from '../../user';

/**
 * Project Status Enum
 */
export enum ProjectStatus {
  /* proof of concept */
  poc = 'poc',
  /* working in progress */
  wip = 'wip',
  /*  project archive */
  archive = 'archive',
  /* project is opening, */
  operating = 'operating',
  /* project dead */
  closed = 'closed',
}

export interface Project {
  id: number;
  name: string;
  contactEmail: string;
  status?: ProjectStatus;
  description?: string;
  createTime: Date;
  updateTime: Date;
  members?: UserProfile[];
  githubRepoUrl?: string;
  cover?: string;
}

export interface QueryOwnedProjects {
  orgName: string;
  name?: string;
}
