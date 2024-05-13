import { createHash } from 'node:crypto';

import { grantsRecord2Array } from '@indiebase/nest-accesscontrol';
import {
  BuiltinIndiebaseRoles,
  defaultIndiebaseGrants,
  hashSecret,
  MgrMetaTables,
} from '@indiebase/server-shared';
import {
  AuthProvider,
  AvailableAuthProviders,
  PrimitiveProject,
} from '@indiebase/trait';
import { Knex } from 'knex';

const indiebaseMgrProviders: Partial<AuthProvider>[] = Object.values(
  AvailableAuthProviders,
).map((name) => ({
  name,
  callbackPath: `oauth/indiebase/${name}/callback`,
}));

/**
 * Create organization template tables
 *
 * @param schema
 * @returns
 */
export const v001_indiebase_seed = async function (
  _schema: string,
): Promise<Knex.Migration> {
  return {
    async up(knex: Knex): Promise<void> {
      const mgrSchema = knex.withSchema('indiebase_mgr');

      // Init default roles.
      const arr = grantsRecord2Array(defaultIndiebaseGrants);
      await mgrSchema.insert(arr).into(MgrMetaTables.grants);
      await mgrSchema
        .insert({
          role: BuiltinIndiebaseRoles.OAA,
          description: 'Site owner',
        })
        .into(MgrMetaTables.roles);

      // Init OAA user.
      const { OAA_EMAIL, OAA_PASSWORD } = process.env;
      const secret = createHash('sha256').update(OAA_PASSWORD!).digest('hex');
      const password = await hashSecret(secret);
      await mgrSchema
        .insert({
          email: OAA_EMAIL,
          password,
          role: BuiltinIndiebaseRoles.OAA,
        })
        .into(MgrMetaTables.hackers);

      // Init indiebase manager's OAuth providers.
      await mgrSchema
        .insert(indiebaseMgrProviders)
        .into(MgrMetaTables.authProviders);

      // Init indiebase manager self.
      await mgrSchema
        .insert<PrimitiveProject>({
          namespace: 'indiebase_mgr',
          name: 'indiebase_mgr',
          referenceId: 'indiebase_mgr',
        })
        .into(MgrMetaTables.projects);
    },
    async down() {},
  };
};
