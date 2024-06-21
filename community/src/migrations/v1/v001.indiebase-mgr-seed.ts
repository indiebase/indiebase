import { createHash } from 'node:crypto';

import { grantsRecord2Array } from '@indiebase/nest-accesscontrol';
import {
  BuiltinIndiebaseRoles,
  defaultIndiebaseGrants,
  hashSecret,
  INDIEBASE_MGR,
  MgrMetaTables,
} from '@indiebase/server-shared';
import { OAuthProvider, PrimitiveProject } from '@indiebase/trait';
import { Knex } from 'knex';
import { AvailableOAuthProviders } from '@indiebase/sdk';

const indiebaseMgrOAuthProviders: Partial<OAuthProvider>[] = Object.values(
  AvailableOAuthProviders,
).map((name) => ({
  name,
  callbackPath: `auth/oauth/${INDIEBASE_MGR}/${name}/callback`,
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
      const mgrSchema = knex.withSchema(INDIEBASE_MGR);

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
        .insert(indiebaseMgrOAuthProviders)
        .into(MgrMetaTables.oauthProviders);

      // Init indiebase manager self.
      await mgrSchema
        .insert<PrimitiveProject>({
          namespace: INDIEBASE_MGR,
          name: INDIEBASE_MGR,
          referenceId: INDIEBASE_MGR,
        })
        .into(MgrMetaTables.projects);
    },
    async down() {},
  };
};
