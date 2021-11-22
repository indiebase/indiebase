export default appInfo => {
  const config: any = {};

  config.orm = {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'dev123456',
    database: 'megumin-dev',
    synchronize: true,
    logging: false,
  };

  // @midwayjs/jwt
  config.jwt = {
    secret: 'dev123456',
    expiresIn: '100d',
  };

  config.view = {
    root: 'view',
  };

  config.redis = {
    host: 'localhost',
    port: 6379,
    auth: 'dev123456',
    db: 2,
  };

  config.mailer = {};

  config.security = {
    csrf: false,
  };

  config.others = {
    whileListDomain: [],
  };

  return config;
};
