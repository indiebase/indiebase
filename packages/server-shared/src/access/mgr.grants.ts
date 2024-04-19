import { AccessControl } from '@indiebase/accesscontrol';
import { AccessActions } from '@indiebase/nest-accesscontrol';

import { BuiltinIndiebaseRoles } from './built-in.roles';

export const defaultIndiebaseGrants = {
  [BuiltinIndiebaseRoles.OAA]: {
    '*': {
      [AccessActions.createAny]: ['*'],
      [AccessActions.readAny]: ['*'],
      [AccessActions.deleteAny]: ['*'],
      [AccessActions.updateAny]: ['*'],
      // [AccessActions.banAny]: ['*'],
    },
  },
  // [BuiltinIndiebaseRoles.admin]: {
  //   [ManagerResources.projects]: {
  //     [AccessActions.createAny]: ['*'],
  //   },
  //   [ManagerResources.orgs]: {
  //     [AccessActions.createAny]: ['*'],
  //   },
  //   [ManagerResources.hackers]: {
  //     [AccessActions.createAny]: ['*'],
  //   },
  // },
};

export function createMgrGrants(access: AccessControl) {
  // access.grant()
}
