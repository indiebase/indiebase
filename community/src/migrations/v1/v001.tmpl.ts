import { AccessActions } from '@indiebase/nest-accesscontrol';
import { AuthnTypes, AvailableOAuthProviders } from '@indiebase/sdk';
import { KnexEx, KnexSchemaEx, TmplTables } from '@indiebase/server-shared';
import { AccountStatus } from '@indiebase/trait';
import { Knex } from 'knex';

export const v001_user_table = async (
  schema: string,
  knex: Knex,
  knexExSchema: KnexSchemaEx,
  extend?: (table: Knex.CreateTableBuilder) => void,
) => {
  return knex.schema
    .withSchema(schema)
    .createTable(TmplTables.users, (table) => {
      table.increments('id').primary();
      table.string('email').unique().index();
      table.string('nickname').comment('Nickname');
      table.string('avatar_url').comment('User avatar url');
      table.string('password');
      table.string('language').comment('Prefer language');
      table
        .enum('authn_type', Object.values(AuthnTypes))
        .comment('Authentication Type');
      table.boolean('enabled_2fa').comment('Enable 2FA');
      table.string('otp_secret').comment('One time password secret');
      table.string('location').comment('Location of registration');
      table
        .enum('account_status', Object.values(AccountStatus))
        .defaultTo(AccountStatus.active);
      table
        .specificType('otp_recovery_codes', 'varchar[]')
        .comment('simple-array OTp recovery codes');

      table.datetime('email_confirmed_at').comment('Email confirmed at');

      table.timestamps(true, true);
      table.timestamp('password_updated_at').comment('Password update at');
      table.timestamp('deleted_at').comment('Soft delete hacker timestamp');
      table.timestamp('sign_in_at').comment('User sign in timestamp');
      extend?.(table);
    })
    .then(async () => {
      await knexExSchema.createUpdatedAtTrigger(TmplTables.users);
    });
};

export const v001_oauth_user_info_table = async (
  schema: string,
  knex: Knex,
  knexExSchema: KnexSchemaEx,
  extend?: (table: Knex.CreateTableBuilder) => void,
) => {
  knex.schema
    .withSchema(schema)
    .createTable(TmplTables.oauthUserInfo, (table) => {
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
        .inTable(`${schema}.${TmplTables.users}`)
        .comment('The user id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.timestamps(true, true);

      extend?.(table);
    })
    .then(async () => {
      await knexExSchema.createUpdatedAtTrigger(TmplTables.oauthUserInfo);
    });
};

export const v001_buckets_table = async (
  schema: string,
  knex: Knex,
  knexExSchema: KnexSchemaEx,
  extend?: (table: Knex.CreateTableBuilder) => void,
) => {
  return knex.schema
    .withSchema(schema)
    .createTable(TmplTables.buckets, (table) => {
      table.increments('id').primary();
      table.string('name').unique().index().notNullable();
      table.string('description').notNullable();
      table.timestamps(true, true);
      table.timestamp('deleted_at').comment('Soft delete buckets timestamp');
      extend?.(table);
    })
    .then(async () => {
      await knexExSchema.createUpdatedAtTrigger(TmplTables.buckets);
    });
};

export const v001_oauth_providers_table = async (
  schema: string,
  knex: Knex,
  knexExSchema: KnexSchemaEx,
  extend?: (table: Knex.CreateTableBuilder) => void,
) => {
  /**
   * OAuth provider infos.
   * ib_oauth_providers
   */
  await knex.schema
    .withSchema(schema)
    .createTable(TmplTables.oauthProviders, (table) => {
      table.increments('id').primary();
      table
        .enum('name', Object.values(AvailableOAuthProviders))
        .comment('Provider name, e.g. google, microsoft');
      table
        .boolean('enabled')
        .defaultTo(false)
        .comment('Enable the login method');
      table.string('client_id').comment('Client ID for OAuth');
      table.string('client_secret').comment('Client secret for OAuth');
      table
        .string('callback_path')
        .comment('Callback URL for OAuth. Only the path is stored');
      table
        .specificType('authorized_client_ids', 'varchar[]')
        .comment(
          'Authorized Client IDs e.g. Apple (iOS, macOS, watchOS, tvOS bundle IDs or service IDs), Google (for Android, One Tap, and Chrome extensions)',
        );
      table
        .jsonb('extra_payload')
        .comment('e.g. WorkOS URL, gitlab Self Hosted GitLab URL');

      table.timestamps(true, true);
      table.timestamp('deleted_at');
      extend?.(table);
    })
    .then(async () => {
      await knexExSchema.createUpdatedAtTrigger(TmplTables.oauthProviders);
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
      await v001_user_table(schema, knex, knexExSchema, (table) => {
        table.string('username').unique().index();
      });

      /**
       * ib_oauth_user_info
       */
      await v001_oauth_user_info_table(schema, knex, knexExSchema);

      /** ib_roles */
      await knex.schema
        .withSchema(schema)
        .createTable(TmplTables.roles, (table) => {
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
          await knexExSchema.createUpdatedAtTrigger(TmplTables.roles);
        });

      /**
       * ib_grants
       */
      await knex.schema
        .withSchema(schema)
        .createTable(TmplTables.grants, (table) => {
          table.increments('id').primary();
          table.string('role').index().notNullable();
          table.string('resource').notNullable();
          table.enum('action', Object.values(AccessActions)).notNullable();
          table.string('attributes').notNullable();
          table.timestamps(true, true);
          table.timestamp('deleted_at').comment('Soft delete grants timestamp');
        })
        .then(async () => {
          await knexExSchema.createUpdatedAtTrigger(TmplTables.grants);
        });

      /**
       * ib_buckets
       */
      await v001_buckets_table(schema, knex, knexExSchema);

      await v001_oauth_providers_table(schema, knex, knexExSchema);
    },
    async down(_knex: Knex) {},
  };
};
