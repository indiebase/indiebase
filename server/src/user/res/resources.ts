import {
  Resource,
  ResourceGroup,
  UserResource,
  RoleResource,
} from '@letscollab-nest/trait';
import { I18nContext } from 'nestjs-i18n';

export const createResources: (i18n: I18nContext) => Resource[] = (i18n) => [
  {
    name: ResourceGroup.USER,
    label: i18n.t('res.User'),
    description: i18n.t('res.User'),
    isGroup: true,
    children: [
      {
        // user
        name: UserResource.list,
        label: i18n.t('res.user_list'),
        description: i18n.t('res.user_list'),
      },
    ],
  },
  {
    name: ResourceGroup.ROLE,
    label: i18n.t('res.Role'),
    description: i18n.t('res.Role'),
    isGroup: true,
    children: [
      {
        // role
        name: RoleResource.list,
        label: i18n.t('res.role_list'),
        description: i18n.t('res.role_list'),
      },
    ],
  },
];
