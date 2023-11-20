import { grantsRecord2Array } from '@indiebase/nest-ac';
import {
  MgrMetaTables,
  defaultMgrGrants,
  hashSecret,
} from '@indiebase/server-shared';
import { Knex } from 'knex';

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
      const arr = grantsRecord2Array(defaultMgrGrants);
      // Init default roles.
      await knex.withSchema('mgr').insert(arr).into(MgrMetaTables.roles);

      // Init OAA user.
      const { OAA_EMAIL, OAA_PASSWORD } = process.env;
      const password = await hashSecret(OAA_PASSWORD);
      await knex
        .withSchema('mgr')
        .insert({
          email: OAA_EMAIL,
          password,
        })
        .into(MgrMetaTables.hackers);
    },
    async down() {},
  };
};
