import { AccessActions } from '@indiebase/nest-ac';
import { BuiltinMgrRoles } from './roles.default';

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
