export enum IndiebaseMetaTables {
  hackers = 'ib_hackers',
  orgs = 'ib_orgs',
  projects = 'ib_projects',
  hackersOrgs = '__ib_hackers_orgs',
  hackersProjects = '__ib_hackers_projects',
  roles = 'ib_roles',
  grants = 'ib_grants',
  migrations = '__knex_indiebase_migration',
  seedMigrations = '__knex_indiebase_seed_migration',
  authzProviders = 'ib_authz_providers',
}

export enum TmplMetaTables {
  users = 'ib_users',
  roles = 'ib_roles',
  grants = 'ib_grants',
}
