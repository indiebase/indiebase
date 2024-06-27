import { createHash } from 'node:crypto';

import { grantsRecord2Array } from '@indiebase/nest-accesscontrol';
import {
  BuiltinIndiebaseRoles,
  defaultIndiebaseGrants,
  hashSecret,
  INDIEBASE_MGR,
  MgrTables,
  TmplTables,
} from '@indiebase/server-shared';
import { OAuthProvider, PrimitiveProject } from '@indiebase/trait';
import { Knex } from 'knex';
import { AvailableOAuthProviders } from '@indiebase/sdk';

export const indiebaseMgrOAuthProvidersV1: Partial<OAuthProvider>[] =
  Object.values(AvailableOAuthProviders).map((name) => ({
    name,
  }));

/**
 * Create organization template tables
 *
 * @param schema
 * @returns
 */
export const v001_indiebase_mgr_seed = async function (
  schema: string,
): Promise<Knex.Migration> {
  return {
    async up(knex: Knex): Promise<void> {
      const knexSchema = knex.withSchema(schema);

      // Init default roles.
      const arr = grantsRecord2Array(defaultIndiebaseGrants);
      await knexSchema.insert(arr).into(MgrTables.grants);
      await knexSchema
        .insert({
          role: BuiltinIndiebaseRoles.OAA,
          description: 'Site owner',
        })
        .into(MgrTables.roles);

      // Init OAA user.
      const { OAA_EMAIL, OAA_PASSWORD } = process.env;
      const secret = createHash('sha256').update(OAA_PASSWORD!).digest('hex');
      const password = await hashSecret(secret);
      await knexSchema
        .insert({
          email: OAA_EMAIL,
          password,
          // role: BuiltinIndiebaseRoles.OAA,
        })
        .into(TmplTables.users);

      // Init indiebase manager's OAuth providers.
      await knexSchema
        .insert(indiebaseMgrOAuthProvidersV1)
        .into(TmplTables.oauthProviders);

      // Init indiebase manager self.
      await knexSchema
        .insert<PrimitiveProject>({
          namespace: INDIEBASE_MGR,
          name: INDIEBASE_MGR,
          referenceId: INDIEBASE_MGR,
        })
        .into(MgrTables.projects);
    },
    async down() {},
  };
};
