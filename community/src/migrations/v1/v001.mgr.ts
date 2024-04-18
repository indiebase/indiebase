import { AccessActions } from '@indiebase/nest-accesscontrol';
import { KnexEx, MgrMetaTables } from '@indiebase/server-shared';
import { AccountStatus, OrgStatus, ProjectStatus } from '@indiebase/trait';
import { Knex } from 'knex';

export const v001_mgr = async function (
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
       * ib_hackers
       */
      await knex.schema
        .withSchema(schema)
        .createTable(MgrMetaTables.hackers, (table) => {
          table.increments('id').primary();
          table.string('email').unique().index().notNullable();
          table.string('nickname').comment('Nickname');
          table.string('avatar_url').comment('User avatar url');
          table.string('bio').comment('User biography');
          table.string('password');
          table.boolean('enabled_otp').comment('Enable 2FA');
          table.string('opt_secret').comment('One time password secret');
          table
            .enum('account_status', Object.values(AccountStatus))
            .defaultTo(AccountStatus.active);
          table
            .string('github_username')
            .comment('Github username not nickname');
          table
            .string('opt_recovery_codes')
            .comment('simple-array OPT recovery codes');
          table
            .string('role')
            .references('role')
            .inTable(`mgr.${MgrMetaTables.roles}`);
          table.datetime('password_updated_at').comment('Password update at');
          table.datetime('email_confirmed_at').comment('Email confirmed at');
          table.timestamps(true, true);
          table.timestamp('deleted_at').comment('Soft delete hacker timestamp');
        })
        .then(async () => {
          await knexExSchema.createUpdatedAtTrigger(MgrMetaTables.hackers);
        });

      /*  *
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
            .enum('status', Object.values(OrgStatus), {
              useNative: true,
              enumName: 'status',
            })
            .defaultTo(OrgStatus.active)
            .comment('Organization status');
          table
            .integer('owner_id')
            .unsigned()
            .index()
            .references('id')
            .inTable(`mgr.${MgrMetaTables.hackers}`)
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
            .enum('project_status', Object.values(ProjectStatus))
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
            .string('project_id')
            .unique()
            .index()
            .notNullable()
            .comment('X-Indiebase-Project-Id');
          table
            .integer('owner_id')
            .unsigned()
            .index()
            .references('id')
            .inTable(`mgr.${MgrMetaTables.hackers}`)
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
       * ib_hackers_orgs
       */
      await knex.schema
        .withSchema(schema)
        .createTable(MgrMetaTables.hackersOrgs, (table) => {
          table.increments('id').primary();
          table
            .integer('hacker_id')
            .unsigned()
            .index()
            .references('id')
            .inTable(`mgr.${MgrMetaTables.hackers}`);
          table
            .integer('org_id')
            .unsigned()
            .index()
            .references('id')
            .inTable(`mgr.${MgrMetaTables.orgs}`);
          table.timestamps(true, true);
          table.timestamp('deleted_at');
        })
        .then(async () => {
          await knexExSchema.createUpdatedAtTrigger(MgrMetaTables.hackersOrgs);
        });
      /**
       * Intermediate table
       * ib_hackers_projects
       */
      await knex.schema
        .withSchema(schema)
        .createTable(MgrMetaTables.hackersProjects, (table) => {
          table.increments('id').primary();
          table
            .integer('hacker_id')
            .unsigned()
            .index()
            .references('id')
            .inTable(`mgr.${MgrMetaTables.hackers}`);
          table
            .integer('project_id')
            .unsigned()
            .index()
            .references('id')
            .inTable(`mgr.${MgrMetaTables.projects}`);
          table.timestamps(true, true);
          table.timestamp('deleted_at');
        })
        .then(async () => {
          await knexExSchema.createUpdatedAtTrigger(
            MgrMetaTables.hackersProjects,
          );
        });
      /**
       * OAuth provider infos.
       * ib_oauth_providers
       */
      await knex.schema
        .withSchema(schema)
        .createTable(MgrMetaTables.oauthProviders, (table) => {
          table.increments('id').primary();
          table
            .enum('name', Object.values(OrgStatus), {
              useNative: true,
              enumName: 'status',
            })
            .notNullable()
            .comment('Provider name, e.g. google, microsoft');
          table
            .boolean('enabled')
            .defaultTo(false)
            .notNullable()
            .comment('Enable the login method');
          table
            .string('client_id')
            .notNullable()
            .comment('Client ID for OAuth');
          table
            .string('client_secret')
            .notNullable()
            .comment('Client secret for OAuth');
          table
            .string('callback_url')
            .notNullable()
            .comment('Callback URL for OAuth');
          table
            .string('authorized_client_ids')
            .nullable()
            .comment(
              'Authorized Client IDs e.g. Apple (iOS, macOS, watchOS, tvOS bundle IDs or service IDs), Google (for Android, One Tap, and Chrome extensions)',
            );
          table
            .jsonb('extra_payload')
            .nullable()
            .comment('e.g. WorkOS WorkOS URL, gitlab Self Hosted GitLab URL');

          table.timestamps(true, true);
          table.timestamp('deleted_at');
        })
        .then(async () => {
          await knexExSchema.createUpdatedAtTrigger(
            MgrMetaTables.hackersProjects,
          );
        });
    },
    async down(knex: Knex) {
      for (const tableName in MgrMetaTables) {
        await knex.schema.withSchema(schema).dropTable(tableName);
      }
    },
  };
};
