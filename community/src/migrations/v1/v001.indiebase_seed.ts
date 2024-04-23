import { createHash } from 'node:crypto';

import { grantsRecord2Array } from '@indiebase/nest-accesscontrol';
import {
  BuiltinIndiebaseRoles,
  defaultIndiebaseGrants,
  hashSecret,
  IndiebaseMetaTables,
} from '@indiebase/server-shared';
import { Knex } from 'knex';

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
      // Init default roles.
      const arr = grantsRecord2Array(defaultIndiebaseGrants);
      await knex
        .withSchema('indiebase')
        .insert(arr)
        .into(IndiebaseMetaTables.grants);
      await knex
        .withSchema('indiebase')
        .insert({
          role: BuiltinIndiebaseRoles.OAA,
          description: 'Site owner',
        })
        .into(IndiebaseMetaTables.roles);

      // Init OAA user.
      const { OAA_EMAIL, OAA_PASSWORD } = process.env;
      const secret = createHash('sha256').update(OAA_PASSWORD!).digest('hex');
      const password = await hashSecret(secret);
      await knex
        .withSchema('indiebase')
        .insert({
          email: OAA_EMAIL,
          password,
          role: BuiltinIndiebaseRoles.OAA,
        })
        .into(IndiebaseMetaTables.hackers);
      // Init indiebase's OAuth providers.

      if (kDevMode) {
        await knex
          .withSchema('indiebase')
          .insert({})
          .into(IndiebaseMetaTables.authzProviders);
      }
    },
    async down() {},
  };
};
