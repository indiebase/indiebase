import { Primordials } from '../../primordials.interface';

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

export interface PrimitiveProject extends Primordials {
  id: number;
  name: string;
  description?: string;
  contactEmail?: string;
  avatarUrl?: string;
  pinnedOrder?: number;
  pinned?: boolean;
  status?: ProjectStatus;
  packageName?: string;
  coverUrl?: string;
  githubRepo?: string;
  namespace: string;
  referenceId: string;
}
