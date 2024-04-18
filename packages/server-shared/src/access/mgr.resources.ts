import { I18nContext } from 'nestjs-i18n';

import { Resource } from './resource.interface';

export enum ManagerResources {
  hackers = 'hackers',
  admins = 'admins',
  orgs = 'orgs',
  projects = 'projects',
}

export const getManagerResources: (i18n: I18nContext) => Resource[] = (
  i18n,
) => [];
