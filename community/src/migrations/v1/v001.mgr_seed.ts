import { createHash } from 'node:crypto';

import { grantsRecord2Array } from '@indiebase/nest-ac';
import {
  BuiltinMgrRoles,
  defaultMgrGrants,
  hashSecret,
  MgrMetaTables,
} from '@indiebase/server-shared';
import type { Knex } from 'knex';

/**
 * Create organization template tables
 *
 * @param schema
 * @returns
 */
export const v001_mgr_seed = async function (
  _schema: string,
): Promise<Knex.Migration> {
  return {
    async up(knex: Knex): Promise<void> {
      // Init default roles.
      const arr = grantsRecord2Array(defaultMgrGrants);
      await knex.withSchema('mgr').insert(arr).into(MgrMetaTables.grants);
      await knex
        .withSchema('mgr')
        .insert({
          role: BuiltinMgrRoles.OAA,
          description: 'Site owner',
        })
        .into(MgrMetaTables.roles);

      // Init OAA user.
      const { OAA_EMAIL, OAA_PASSWORD } = process.env;
      const secret = createHash('sha256').update(OAA_PASSWORD).digest('hex');
      const password = await hashSecret(secret);
      await knex
        .withSchema('mgr')
        .insert({
          email: OAA_EMAIL,
          password,
          role: BuiltinMgrRoles.OAA,
        })
        .into(MgrMetaTables.hackers);
    },
    async down() {},
  };
};
