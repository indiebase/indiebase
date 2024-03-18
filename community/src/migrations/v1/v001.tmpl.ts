import { AccessActions } from '@indiebase/nest-ac';
import { KnexEx, TmplMetaTables } from '@indiebase/server-shared';
import type { Knex } from 'knex';
import knex from 'knex';

/**
 * Create organization template tables
 *
 * @param schema
 * @returns
 */
export const v001_tmpl = async function (
  schema: string,
): Promise<Knex.Migration> {
  return {
    async up(knex: Knex): Promise<void> {
      const knexEx = new KnexEx(knex);
      const knexExSchema = await knexEx.schema
        .withSchema(schema)
        .initBuiltinFuncs();

      /** ib_users */
      await knex.schema
        .withSchema(schema)
        .createTable(TmplMetaTables.users, (table) => {
          table.increments('id').primary();
          table.string('email').unique().index().notNullable();
          table.string('nickname').comment('Nickname');
          table.string('avatar_url').comment('User avatar url');
          table.string('bio').comment('User biography');
          table.string('password');
          table.boolean('enabled_otp').defaultTo(false).comment('Enable 2FA');
          table.string('opt_secret').comment('One time password secret');
          table.timestamp('password_updated_at').comment('Password update at');
          table.datetime('email_confirmed_at').comment('Email confirmed at');
          table.timestamps(true, true);
        })
        .then(async () => {
          await knexExSchema.createUpdatedAtTrigger(TmplMetaTables.users);
        });

      /** ib_roles */
      await knex.schema
        .withSchema(schema)
        .createTable(TmplMetaTables.roles, (table) => {
          table.increments('id').primary();
          table.string('role').notNullable();
          table.string('resource').notNullable();
          table.enum('action', Object.values(AccessActions)).notNullable();
          table.string('attributes').notNullable();
          table.string('description');
          table.timestamps(true, true);
        })
        .then(async () => {
          await knexExSchema.createUpdatedAtTrigger(TmplMetaTables.roles);
        });
    },
    async down(knex: Knex) {},
  };
};
