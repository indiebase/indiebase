import { AccessActions } from '@indiebase/nest-accesscontrol';
import { KnexEx, KnexSchemaEx, TmplMetaTables } from '@indiebase/server-shared';
import { Knex } from 'knex';
import { AuthnTypes, AvailableOAuthProviders } from '@indiebase/sdk';
import { AccountStatus } from '@indiebase/trait';

export const v001_user_table = async (
  schema: string,
  knex: Knex,
  knexExSchema: KnexSchemaEx,
  extend?: (table: Knex.CreateTableBuilder) => void,
) => {
  return knex.schema
    .withSchema(schema)
    .createTable(TmplMetaTables.users, (table) => {
      table.increments('id').primary();
      table.string('email').unique().index();
      table.string('nickname').comment('Nickname');
      table.string('avatar_url').comment('User avatar url');
      table.string('password');
      table.string('language').comment('Prefer language');
      table
        .enum('authn_type', Object.values(AuthnTypes))
        .comment('Authentication Type');
      table.boolean('enabled_otp').comment('Enable 2FA');
      table.string('opt_secret').comment('One time password secret');
      table.string('location').comment('Location of registration');
      table
        .enum('account_status', Object.values(AccountStatus))
        .defaultTo(AccountStatus.active);
      table
        .string('opt_recovery_codes')
        .comment('simple-array OPT recovery codes');

      table.datetime('email_confirmed_at').comment('Email confirmed at');

      table.timestamps(true, true);
      table.timestamp('password_updated_at').comment('Password update at');
      table.timestamp('deleted_at').comment('Soft delete hacker timestamp');
      table.timestamp('sign_in_at').comment('User sign in timestamp');
      extend?.(table);
    })
    .then(async () => {
      await knexExSchema.createUpdatedAtTrigger(TmplMetaTables.users);
    });
};

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
      await v001_user_table(schema, knex, knexExSchema);

      /**
       * ib_oauth_info
       */
      knex.schema
        .withSchema(schema)
        .createTable(TmplMetaTables.oauthUserInfo, (table) => {
          table.increments('id').primary();
          table
            .enum('provider', Object.values(AvailableOAuthProviders))
            .notNullable();
          table.string('access_token').notNullable();
          table.string('refresh_token');
          table
            .jsonb('extra_payload')
            .comment('Extra info get from oauth provider');
          table
            .integer('user_id')
            .unsigned()
            .index()
            .references('id')
            .inTable(`${schema}.${TmplMetaTables.users}`)
            .comment('The user id');

          table.timestamps(true, true);
        })
        .then(async () => {
          await knexExSchema.createUpdatedAtTrigger(
            TmplMetaTables.oauthUserInfo,
          );
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
          table.timestamp('deleted_at').comment('Soft delete role timestamp');
        })
        .then(async () => {
          await knexExSchema.createUpdatedAtTrigger(TmplMetaTables.roles);
        });

      /**
       * ib_grants
       */
      await knex.schema
        .withSchema(schema)
        .createTable(TmplMetaTables.grants, (table) => {
          table.increments('id').primary();
          table.string('role').index().notNullable();
          table.string('resource').notNullable();
          table.enum('action', Object.values(AccessActions)).notNullable();
          table.string('attributes').notNullable();
          table.timestamps(true, true);
          table.timestamp('deleted_at').comment('Soft delete grants timestamp');
        })
        .then(async () => {
          await knexExSchema.createUpdatedAtTrigger(TmplMetaTables.grants);
        });

      /**
       * ib_buckets
       */
      await knex.schema
        .withSchema(schema)
        .createTable(TmplMetaTables.buckets, (table) => {
          table.increments('id').primary();
          table.string('name').unique().index().notNullable();
          table.string('description').notNullable();
          table.timestamps(true, true);
          table
            .timestamp('deleted_at')
            .comment('Soft delete buckets timestamp');
        })
        .then(async () => {
          await knexExSchema.createUpdatedAtTrigger(TmplMetaTables.buckets);
        });
    },
    async down(_knex: Knex) {},
  };
};
