import {
  IResource,
  ResourceGroup,
  RoleResource,
  UserResource,
} from '@letscollab/helper';
import { I18nContext } from 'nestjs-i18n';

export const createResources: (i18n: I18nContext) => IResource[] = (i18n) => [
  {
    name: ResourceGroup.USER,
    displayName: i18n.t('res.User'),
    description: i18n.t('res.User'),
    isGroup: true,
    children: [
      {
        name: UserResource.list,
        displayName: i18n.t('res.user_list'),
        description: i18n.t('res.user_list'),
      },
    ],
  },
  {
    name: ResourceGroup.ROLE,
    displayName: i18n.t('res.Role'),
    description: i18n.t('res.Role'),
    isGroup: true,
    children: [
      {
        name: RoleResource.list,
        displayName: i18n.t('res.role_list'),
        description: i18n.t('res.role_list'),
      },
    ],
  },
];
