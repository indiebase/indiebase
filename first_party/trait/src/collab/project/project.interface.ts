import { UserProfile } from '../../user';

/**
 * Project Status Enum
 */
export enum ProjectStatus {
  /* proof of concept */
  poc = 'poc',
  /* working in progress */
  wip = 'wip',
  /*  project dead, */
  archive = 'archive',
  /* project is opening, */
  operating = 'operating',
  /* project has closed */
  closed = 'closed',
}

export interface IProject {
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
