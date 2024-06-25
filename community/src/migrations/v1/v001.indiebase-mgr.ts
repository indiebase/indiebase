import { AccessActions } from '@indiebase/nest-accesscontrol';
import { AuthnTypes, AvailableOAuthProviders } from '@indiebase/sdk';
import {
  KnexEx,
  MgrMetaTables,
  TmplMetaTables,
} from '@indiebase/server-shared';
import { AccountStatus, ProjectStatus, Visibility } from '@indiebase/trait';
import { Knex } from 'knex';
import { v001_user_table } from './v001.tmpl';

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
        .createTable(MgrMetaTables.roles, (table) => {
          table.increments('id').primary();
          table.string('role').unique().index().notNullable();
          table.string('description');
          table.timestamps(true, true);
          table.timestamp('deleted_at').comment('Soft delete role timestamp');
        })
        .then(async () => {
          await knexExSchema.createUpdatedAtTrigger(MgrMetaTables.roles);
        });

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

      /**
       * ib_users
       */

      await v001_user_table(schema, knex, knexExSchema, (table) => {
        table.string('bio').comment('User biography');
        table.string('homepage').unique().nullable().comment('Hacker homepage');
        table.string('github_username').comment('Github username not nickname');
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
        .createTable(MgrMetaTables.orgs, (table) => {
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
            .inTable(`${schema}.${TmplMetaTables.users}`)
            .comment('The organization owner id');

          table.timestamps(true, true);
          table
            .timestamp('deleted_at')
            .comment('Soft delete organization timestamp');
        })
        .then(async () => {
          await knexExSchema.createUpdatedAtTrigger(MgrMetaTables.orgs);
        });

      /**
       * ib_projects
       */
      await knex.schema
        .withSchema(schema)
        .createTable(MgrMetaTables.projects, (table) => {
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
            .inTable(`${schema}.${MgrMetaTables.orgs}`)
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
          table
            .integer('owner_id')
            .unsigned()
            .index()
            .references('id')
            .inTable(`${schema}.${TmplMetaTables.users}`)
            .comment('The project owner id');

          table.timestamps(true, true);
          table
            .timestamp('deleted_at')
            .comment('Soft delete project timestamp');
        })
        .then(async () => {
          await knexExSchema.createUpdatedAtTrigger(MgrMetaTables.projects);
        });

      /**
       * ib_grants
       */
      await knex.schema
        .withSchema(schema)
        .createTable(MgrMetaTables.grants, (table) => {
          table.increments('id').primary();
          table.string('role').index().notNullable();
          table.string('resource').notNullable();
          table.enum('action', Object.values(AccessActions)).notNullable();
          table.string('attributes').notNullable();
          table.timestamps(true, true);
          table.timestamp('deleted_at').comment('Soft delete grants timestamp');
        })
        .then(async () => {
          await knexExSchema.createUpdatedAtTrigger(MgrMetaTables.grants);
        });

      /**
       * Intermediate table
       * ib_users_orgs
       */
      await knex.schema
        .withSchema(schema)
        .createTable(MgrMetaTables._usersOrgs, (table) => {
          table.increments('id').primary();
          table
            .integer('user_id')
            .unsigned()
            .index()
            .references('id')
            .inTable(`${schema}.${TmplMetaTables.users}`)
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

          table
            .integer('org_id')
            .unsigned()
            .index()
            .references('id')
            .inTable(`${schema}.${MgrMetaTables.orgs}`)
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

          table.timestamps(true, true);
          table.timestamp('deleted_at');
        })
        .then(async () => {
          await knexExSchema.createUpdatedAtTrigger(MgrMetaTables._usersOrgs);
        });
      /**
       * Intermediate table
       * ib_users_projects
       */
      await knex.schema
        .withSchema(schema)
        .createTable(MgrMetaTables._usersProjects, (table) => {
          table.increments('id').primary();
          table
            .integer('user_id')
            .unsigned()
            .index()
            .references('id')
            .inTable(`${schema}.${TmplMetaTables.users}`)
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
          table
            .integer('project_id')
            .unsigned()
            .index()
            .references('id')
            .inTable(`${schema}.${MgrMetaTables.projects}`)
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
          table.timestamps(true, true);
          table.timestamp('deleted_at');
        })
        .then(async () => {
          await knexExSchema.createUpdatedAtTrigger(
            MgrMetaTables._usersProjects,
          );
        });
      /**
       * OAuth provider infos.
       * ib_oauth_providers
       */
      await knex.schema
        .withSchema(schema)
        .createTable(TmplMetaTables.oauthProviders, (table) => {
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
          table
            .integer('project_id')
            .unsigned()
            .index()
            .references('id')
            .inTable(`${schema}.${MgrMetaTables.projects}`);

          table.timestamps(true, true);
          table.timestamp('deleted_at');
        })
        .then(async () => {
          await knexExSchema.createUpdatedAtTrigger(
            TmplMetaTables.oauthProviders,
          );
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
    async down(knex: Knex) {
      for (const tableName in MgrMetaTables) {
        await knex.schema.withSchema(schema).dropTable(tableName);
      }
    },
  };
};
