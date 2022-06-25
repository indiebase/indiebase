import { ResourceGroup } from './group';

export interface IResource {
  name: ResourceGroup | string;
  displayName?: string;
  description?: string;
  isGroup?: boolean;
  children?: IResource[];
}
