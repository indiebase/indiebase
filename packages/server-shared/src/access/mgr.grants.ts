import { AccessActions } from '@indiebase/nest-accesscontrol';

import { BuiltinMgrRoles } from './built-in.roles';

export const defaultMgrGrants = {
  [BuiltinMgrRoles.OAA]: {
    '*': {
      [AccessActions.createAny]: ['*'],
      [AccessActions.readAny]: ['*'],
      [AccessActions.updateAny]: ['*'],
      [AccessActions.deleteAny]: ['*'],
    },
  },
};
