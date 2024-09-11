export enum M {
  orgs = 'ib_orgs',
  projects = 'ib_projects',
  _usersOrgs = '__ib_users_orgs',
  _usersProjects = '__ib_users_projects',
  roles = 'ib_roles',
  grants = 'ib_grants',
  _migrations = '__knex_indiebase_migration',
  _seedMigrations = '__knex_indiebase_seed_migration',
  oauthProviders = 'ib_oauth_providers',
  oauthUserInfo = 'ib_oauth_user_info',
}

export enum T {
  users = 'ib_users',
  roles = 'ib_roles',
  grants = 'ib_grants',
  buckets = 'ib_buckets',
  oauthProviders = 'ib_oauth_providers',
  oauthUserInfo = 'ib_oauth_user_info',
}
