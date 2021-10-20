// export const redis = {
//   HOST: 'localhost',
//   PORT: 6379,
//   AUTH: 'dev123456',
//   DB: 2,
// };

// export const secret = {
//   JWT: 'dev123456',
// };

// export const owner = {
//   NAME: 'dev@dev.com',
//   PWD: 'dev123456',
// };

// export const mailer = {
//   NAME: 'wanghan9423@163.com',
//   PWD: 'outlook9423',
//   PORT: 995,
// };

// export const other = {
//   NET_SPEED_LIMIT_MAX: 400,
// };

// export const security = {
//   csrf: false,
// };

// export const orm = {
//   type: 'mysql',
//   host: '127.0.0.1',
//   port: 3306,
//   username: 'root',
//   password: 'dev123456',
//   database: 'lonely-mgmt-midway-dev',
//   synchronize: true,
//   logging: false,
// };

export default appInfo => {
  const config: any = {};

  config.orm = {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'dev123456',
    database: 'lonely-mgmt-midway-dev',
    synchronize: true,
    logging: false,
  };

  config.jwt = {
    secret: 'dev123456',
  };

  config.redis = {
    host: 'localhost',
    port: 6379,
    auth: 'dev123456',
    db: 2,
  };

  config.mailer = {
    
  };

  config.security = {
    csrf: false,
  };

  config.others = {};

  return config;
};
