import { Actions, InferSubjects, Permissions } from '@indiebase/nest-casl';
import { BuiltinMgrRoles } from '@indiebase/server-shared';

export type Subjects = InferSubjects<{}>;

export const permissions: Permissions<BuiltinMgrRoles, Subjects, Actions> = {
  anonymous({ can }) {
    can(Actions.read, 'Post');
    can(Actions.create, 'Post');
  },
  // customer({ user, can }) {
  //   can(Actions.update, 'Post', { userId: user.id });
  // },
  // operator({ can, cannot, extend }) {
  //   // extend(Roles.customer);
  //   can(Actions.manage, 'PostCategory');
  //   can(Actions.manage, 'Post');
  //   cannot(Actions.delete, 'Post');
  // },
};
