import {
  Resource,
  ResourceGroup,
  UserResource,
  RoleResource,
} from '@letscollab-nest/trait';
import { I18nContext } from 'nestjs-i18n';

export const createResources: (i18n: I18nContext) => Resource[] = (i18n) => [
  // User
  {
    name: UserResource.list,
    label: i18n.t('res.user_list'),
    description: i18n.t('res.user_list'),
    group: ResourceGroup.USER,
    groupLabel: i18n.t('res.User'),
  },
  {
    name: RoleResource.list,
    label: i18n.t('res.role_list'),
    group: ResourceGroup.USER,
    groupLabel: i18n.t('res.User'),
    description: i18n.t('res.role_list'),
  },
];
