import { AccessActions } from '@indiebase/nest-accesscontrol';
import { IbMetaTables, KnexEx } from '@indiebase/server-shared';
import {
  AccountStatus,
  AvailableAuthProviders,
  ProjectStatus,
  Visibility,
} from '@indiebase/trait';
import { Knex } from 'knex';

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
        .createTable(IbMetaTables.roles, (table) => {
          table.increments('id').primary();
          table.string('role').unique().index().notNullable();
          table.string('description');
          table.timestamps(true, true);
          table.timestamp('deleted_at').comment('Soft delete role timestamp');
        })
        .then(async () => {
          await knexExSchema.createUpdatedAtTrigger(IbMetaTables.roles);
        });

      /**
       * ib_hackers
       */
      await knex.schema
        .withSchema(schema)
        .createTable(IbMetaTables.hackers, (table) => {
          table.increments('id').primary();
          table.string('email').unique().index().notNullable();
          table.string('nickname').comment('Nickname');
          table.string('avatar_url').comment('User avatar url');
          table.string('bio').comment('User biography');
          table.string('password');
          table.string('language');
          table
            .string('sign_in_type')
            .comment('User sign in type. oauth, local');
          table.boolean('enabled_otp').comment('Enable 2FA');
          table.string('opt_secret').comment('One time password secret');
          table
            .enum('visibility', Object.values(Visibility))
            .defaultTo(Visibility.public)
            .comment('User visibility');
          table
            .enum('account_status', Object.values(AccountStatus))
            .defaultTo(AccountStatus.active);
          table
            .string('homepage')
            .unique()
            .nullable()
            .comment('Organization homepage');
          table
            .string('github_username')
            .comment('Github username not nickname');
          table
            .string('opt_recovery_codes')
            .comment('simple-array OPT recovery codes');
          table
            .string('role')
            .references('role')
            .inTable(`indiebase_mgr.${IbMetaTables.roles}`);
          table.datetime('email_confirmed_at').comment('Email confirmed at');

          table.timestamps(true, true);
          table.timestamp('password_updated_at').comment('Password update at');
          table.timestamp('deleted_at').comment('Soft delete hacker timestamp');
          table.timestamp('sign_in_at').comment('User sign in timestamp');
        })
        .then(async () => {
          await knexExSchema.createUpdatedAtTrigger(IbMetaTables.hackers);
        });

      /**
       * ib_orgs
       */
      await knex.schema
        .withSchema(schema)
        .createTable(IbMetaTables.orgs, (table) => {
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
            .inTable(`indiebase_mgr.${IbMetaTables.hackers}`)
            .comment('The organization owner id');

          table.timestamps(true, true);
          table
            .timestamp('deleted_at')
            .comment('Soft delete organization timestamp');
        })
        .then(async () => {
          await knexExSchema.createUpdatedAtTrigger(IbMetaTables.orgs);
        });

      /**
       * ib_projects
       */
      await knex.schema
        .withSchema(schema)
        .createTable(IbMetaTables.projects, (table) => {
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
            .inTable(`indiebase_mgr.${IbMetaTables.orgs}`)
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
          table
            .integer('owner_id')
            .unsigned()
            .index()
            .references('id')
            .inTable(`indiebase_mgr.${IbMetaTables.hackers}`)
            .comment('The project owner id');

          table.timestamps(true, true);
          table
            .timestamp('deleted_at')
            .comment('Soft delete project timestamp');
        })
        .then(async () => {
          await knexExSchema.createUpdatedAtTrigger(IbMetaTables.projects);
        });

      /**
       * ib_grants
       */
      await knex.schema
        .withSchema(schema)
        .createTable(IbMetaTables.grants, (table) => {
          table.increments('id').primary();
          table.string('role').index().notNullable();
          table.string('resource').notNullable();
          table.enum('action', Object.values(AccessActions)).notNullable();
          table.string('attributes').notNullable();
          table.timestamps(true, true);
          table.timestamp('deleted_at').comment('Soft delete grants timestamp');
        })
        .then(async () => {
          await knexExSchema.createUpdatedAtTrigger(IbMetaTables.grants);
        });

      /**
       * Intermediate table
       * ib_hackers_orgs
       */
      await knex.schema
        .withSchema(schema)
        .createTable(IbMetaTables.hackersOrgs, (table) => {
          table.increments('id').primary();
          table
            .integer('hacker_id')
            .unsigned()
            .index()
            .references('id')
            .inTable(`indiebase_mgr.${IbMetaTables.hackers}`)
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

          table
            .integer('org_id')
            .unsigned()
            .index()
            .references('id')
            .inTable(`indiebase_mgr.${IbMetaTables.orgs}`)
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

          table.timestamps(true, true);
          table.timestamp('deleted_at');
        })
        .then(async () => {
          await knexExSchema.createUpdatedAtTrigger(IbMetaTables.hackersOrgs);
        });
      /**
       * Intermediate table
       * ib_hackers_projects
       */
      await knex.schema
        .withSchema(schema)
        .createTable(IbMetaTables.hackersProjects, (table) => {
          table.increments('id').primary();
          table
            .integer('hacker_id')
            .unsigned()
            .index()
            .references('id')
            .inTable(`indiebase_mgr.${IbMetaTables.hackers}`)
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
          table
            .integer('project_id')
            .unsigned()
            .index()
            .references('id')
            .inTable(`indiebase_mgr.${IbMetaTables.projects}`)
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
          table.timestamps(true, true);
          table.timestamp('deleted_at');
        })
        .then(async () => {
          await knexExSchema.createUpdatedAtTrigger(
            IbMetaTables.hackersProjects,
          );
        });
      /**
       * OAuth provider infos.
       * ib_oauth_providers
       */
      await knex.schema
        .withSchema(schema)
        .createTable(IbMetaTables.authProviders, (table) => {
          table.increments('id').primary();
          table
            .enum('name', Object.values(AvailableAuthProviders))
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
            .comment('e.g. WorkOS WorkOS URL, gitlab Self Hosted GitLab URL');
          table
            .integer('project_id')
            .unsigned()
            .index()
            .references('id')
            .inTable(`indiebase_mgr.${IbMetaTables.projects}`);

          table.timestamps(true, true);
          table.timestamp('deleted_at');
        })
        .then(async () => {
          await knexExSchema.createUpdatedAtTrigger(IbMetaTables.authProviders);
        });
    },
    async down(knex: Knex) {
      for (const tableName in IbMetaTables) {
        await knex.schema.withSchema(schema).dropTable(tableName);
      }
    },
  };
};
