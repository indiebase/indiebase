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
  description?: string;
  contactEmail?: string;
  avatarUrl?: string;
  pinnedOrder?: number;
  pinned?: boolean;
  projectStatus?: ProjectStatus;
  packageName?: string;
  createAt: Date;
  updateAt: Date;
  coverUrl?: string;
  githubRepo?: string;
  namespace: string;
  projectId: string;
}
