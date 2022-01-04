import { DefaultConfig } from '@midwayjs/grpc';
import { join } from 'path';

export default appInfo => {
  const config: any = {};

  config.orm = {
    type: 'mysql',
    host: '192.168.94.2',
    port: 31254,
    username: 'root',
    password: 'zWZTueiwJy',
    database: 'letscollab-dev',
    synchronize: true,
    logging: false,
  };

  // @letscollab/midway-jwt
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

  config.grpc = {
    services: [
      {
        url: '127.0.0.1:9801',
        protoPath: join(__dirname, '../../packages/auth/proto/helloworld.proto'),
        package: 'helloworld',
      },
    ],
  } as DefaultConfig;

  return config;
};
