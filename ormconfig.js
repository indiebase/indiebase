function config() {
  switch (process.env.NODE_ENV) {
    case 'development':
      return {
        type: 'mysql',
        host: '0.0.0.0',
        port: 31254,
        username: 'root',
        password: 'zWZTueiwJy',
        database: 'sjtu-tech-mgmt-dev',
        entities: ['dist/**/*.entity.{js,ts}'],
        synchronize: true,
      };
    case 'production':
      return {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'AKd@jU&62h7axhlXtyUJpn',
        database: 'sjtu-tech-mgmt-prodcution',
        entities: ['dist/**/*.entity.{js,ts}'],
        synchronize: false,
        migrationsTableName: 'sjtu_tech_mgmt_prodcution_migration_table',
        migrations: ['dist/migration/*.js'],
        migrationsRun: true,
        cli: {
          migrationsDir: 'src/migration',
        },
      };
    case 'demo':
      return {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '@outlook9423~!@$%',
        database: 'lonely-demo',
        entities: ['dist/**/*.entity.{js,ts}'],
        synchronize: true,
      };
    default:
      throw new Error('not suitable NODE_ENV');
  }
}

module.exports = config();
