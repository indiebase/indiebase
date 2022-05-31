module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'dev123456',
  database: 'letscollab-dev',
  entities: ['src/**/*.entity.{js,ts}'],
  synchronize: false,
  migrationsTableName: 'custom_migration_table',
  migrations: ['migration/*.{js,ts}'],
  cli: {
    migrationsDir: 'migration',
  },
};
