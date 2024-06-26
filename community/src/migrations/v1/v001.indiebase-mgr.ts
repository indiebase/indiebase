import { AccessActions } from '@indiebase/nest-accesscontrol';
import { AuthnTypes, AvailableOAuthProviders } from '@indiebase/sdk';
import { KnexEx, MgrTables, TmplTables } from '@indiebase/server-shared';
import { AccountStatus, ProjectStatus, Visibility } from '@indiebase/trait';
import { Knex } from 'knex';
import {
  v001_buckets_table,
  v001_oauth_user_info_table,
  v001_user_table,
} from './v001.tmpl';

export const v001_indiebase = async function (
  schema: string,
): Promise<Knex.Migration> {
  return {
    async up(knex: Knex): Promise<void> {
      const knexEx = new KnexEx(knex);
      const knexExSchema = await knexEx.schema
        .withSchema(schema)
        .initBuiltinFuncs();
      /**
       * ib_roles
       */
      await knex.schema
        .withSchema(schema)
        .createTable(MgrTables.roles, (table) => {
          table.increments('id').primary();
          table.string('role').unique().index().notNullable();
          table.string('description');
          table.timestamps(true, true);
          table.timestamp('deleted_at').comment('Soft delete role timestamp');
        })
        .then(async () => {
          await knexExSchema.createUpdatedAtTrigger(MgrTables.roles);
        });
      /**
       * ib_oauth_user_info
       */
      await v001_oauth_user_info_table(schema, knex, knexExSchema);
      /**
       * ib_users
       */
      await v001_user_table(schema, knex, knexExSchema, (table) => {
        table.string('bio').comment('User biography');
        table.string('homepage').unique().nullable().comment('Hacker homepage');
        table.string('github_username').comment('Github username not nickname');
        table
          .string('role')
          .references('role')
          .inTable(`${schema}.${MgrTables.roles}`);
        table
          .enum('visibility', Object.values(Visibility))
          .defaultTo(Visibility.public)
          .comment('User visibility');
      });
      /**
       * ib_orgs
       */
      await knex.schema
        .withSchema(schema)
        .createTable(MgrTables.orgs, (table) => {
          table.increments('id').primary();
          table.string('name').unique().index().notNullable();
          table.string('description');
          table.string('contact_email').comment('Organization contact email');
          table.string('avatar_url').comment('Organization avatar url');
          table
            .string('github_org')
            .unique()
            .comment(
              'Github Organization, Indiebase projects manager depends on the github',
            );
          table
            .string('homepage')
            .unique()
            .nullable()
            .comment('Organization homepage');
          table
            .enum('visibility', Object.values(Visibility))
            .defaultTo(Visibility.public)
            .comment('Organization visibility');
          table
            .integer('owner_id')
            .unsigned()
            .index()
            .references('id')
            .inTable(`${schema}.${TmplTables.users}`)
            .comment('The organization owner id');

          table.timestamps(true, true);
          table
            .timestamp('deleted_at')
            .comment('Soft delete organization timestamp');
        })
        .then(async () => {
          await knexExSchema.createUpdatedAtTrigger(MgrTables.orgs);
        });
      /**
       * ib_projects
       */
      await knex.schema
        .withSchema(schema)
        .createTable(MgrTables.projects, (table) => {
          table.increments('id').primary();
          table.string('name').unique().index().notNullable();
          table.string('description');
          table.string('contact_email').comment('Project contact email');
          table.string('avatar_url').comment('Project avatar url');
          table.integer('pinned_order').comment('Project card pinned order');
          table.boolean('pinned').comment('Pin the project');
          table
            .enum('status', Object.values(ProjectStatus))
            .defaultTo(ProjectStatus.wip)
            .comment('Project status');
          table
            .string('package_name')
            .unique()
            .comment('Fallback package name');
          table.string('cover_url').comment('Project card cover url');
          table
            .string('github_repo')
            .unique()
            .comment('Project github repository');
          table
            .string('namespace')
            .unique()
            .comment('Projects namespace, postgres schema name');
          table
            .string('reference_id')
            .unique()
            .index()
            .notNullable()
            .comment('X-Indiebase-Reference-Id, the ID for business');
          table
            .integer('org_id')
            .unsigned()
            .index()
            .references('id')
            .inTable(`${schema}.${MgrTables.orgs}`)
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
          table
            .integer('owner_id')
            .unsigned()
            .index()
            .references('id')
            .inTable(`${schema}.${TmplTables.users}`)
            .comment('The project owner id');

          table.timestamps(true, true);
          table
            .timestamp('deleted_at')
            .comment('Soft delete project timestamp');
        })
        .then(async () => {
          await knexExSchema.createUpdatedAtTrigger(MgrTables.projects);
        });
      /**
       * ib_grants
       */
      await knex.schema
        .withSchema(schema)
        .createTable(MgrTables.grants, (table) => {
          table.increments('id').primary();
          table.string('role').index().notNullable();
          table.string('resource').notNullable();
          table.enum('action', Object.values(AccessActions)).notNullable();
          table.string('attributes').notNullable();
          table.timestamps(true, true);
          table.timestamp('deleted_at').comment('Soft delete grants timestamp');
        })
        .then(async () => {
          await knexExSchema.createUpdatedAtTrigger(MgrTables.grants);
        });

      /**
       * Intermediate table
       * ib_users_orgs
       */
      await knex.schema
        .withSchema(schema)
        .createTable(MgrTables._usersOrgs, (table) => {
          table.increments('id').primary();
          table
            .integer('user_id')
            .unsigned()
            .index()
            .references('id')
            .inTable(`${schema}.${TmplTables.users}`)
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

          table
            .integer('org_id')
            .unsigned()
            .index()
            .references('id')
            .inTable(`${schema}.${MgrTables.orgs}`)
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

          table.timestamps(true, true);
          table.timestamp('deleted_at');
        })
        .then(async () => {
          await knexExSchema.createUpdatedAtTrigger(MgrTables._usersOrgs);
        });
      /**
       * Intermediate table
       * ib_users_projects
       */
      await knex.schema
        .withSchema(schema)
        .createTable(MgrTables._usersProjects, (table) => {
          table.increments('id').primary();
          table
            .integer('user_id')
            .unsigned()
            .index()
            .references('id')
            .inTable(`${schema}.${TmplTables.users}`)
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
          table
            .integer('project_id')
            .unsigned()
            .index()
            .references('id')
            .inTable(`${schema}.${MgrTables.projects}`)
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
          table.timestamps(true, true);
          table.timestamp('deleted_at');
        })
        .then(async () => {
          await knexExSchema.createUpdatedAtTrigger(MgrTables._usersProjects);
        });

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
        })
        .then(async () => {
          await knexExSchema.createUpdatedAtTrigger(TmplTables.oauthProviders);
        });
      /**
       * ib_buckets
       */
      await v001_buckets_table(schema, knex, knexExSchema);
    },
    async down(knex: Knex) {
      for (const tableName in MgrTables) {
        await knex.schema.withSchema(schema).dropTable(tableName);
      }
    },
  };
};
