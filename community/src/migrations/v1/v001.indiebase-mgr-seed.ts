import { createHash } from 'node:crypto';

import { grantsRecord2Array } from '@indiebase/nest-accesscontrol';
import { AvailableOAuthProviders } from '@indiebase/sdk';
import {
  BuiltinIndiebaseRoles,
  defaultIndiebaseGrants,
  hashSecret,
  INDIEBASE_MGR,
  M,
  T,
} from '@indiebase/server-shared';
import { OAuthProvider, PrimitiveProject } from '@indiebase/trait';
import { Knex } from 'knex';

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
      await knexSchema.insert(arr).into(M.grants);
      await knexSchema
        .insert({
          role: BuiltinIndiebaseRoles.OAA,
          description: 'Site owner',
        })
        .into(M.roles);

      // Init OAA user.
      const { OAA_EMAIL, OAA_PASSWORD } = process.env;
      const secret = createHash('sha256').update(OAA_PASSWORD!).digest('hex');
      const password = await hashSecret(secret);
      await knexSchema
        .insert({
          email: OAA_EMAIL,
          password,
        })
        .into(T.users);

      // Init indiebase manager's OAuth providers.
      await knexSchema
        .insert(indiebaseMgrOAuthProvidersV1)
        .into(T.oauthProviders);

      // Init indiebase manager self.
      await knexSchema
        .insert<PrimitiveProject>({
          namespace: INDIEBASE_MGR,
          name: INDIEBASE_MGR,
          referenceId: INDIEBASE_MGR,
        })
        .into(M.projects);
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async down() {},
  };
};
