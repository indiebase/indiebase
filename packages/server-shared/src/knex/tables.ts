export enum MgrMetaTables {
  hackers = 'ib_hackers',
  orgs = 'ib_orgs',
  projects = 'ib_projects',
  _hackersOrgs = '__ib_hackers_orgs',
  _hackersProjects = '__ib_hackers_projects',
  roles = 'ib_roles',
  grants = 'ib_grants',
  _migrations = '__knex_indiebase_migration',
  _seedMigrations = '__knex_indiebase_seed_migration',
  authProviders = 'ib_auth_providers',
}

export enum TmplMetaTables {
  users = 'ib_users',
  roles = 'ib_roles',
  grants = 'ib_grants',
  buckets = 'ib_buckets',
}
