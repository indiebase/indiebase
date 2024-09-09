import { registerAs } from '@nestjs/config';

function handleOrigin(originRegex: string) {
  return [
    ...originRegex
      .split(',')
      .filter(Boolean)
      .map((v) => new RegExp(v)),
  ];
}

const app = registerAs('app', () => {
  return {
    hostname: process.env.HTTP_HOST || '0.0.0.0',
    port: process.env.HTTP_PORT || 23331,
    corsOrigin: process.env.HOSTNAMES && handleOrigin(process.env.HOSTNAMES),
    packageName: process.env.PACKAGE_NAME,
    sessionSecret: process.env.SESSION_SECRET,
  };
});

const redis = registerAs('redis', () => {
  return {
    host: process.env.DB_REDIS_HOST || '0.0.0.0',
    port: parseInt(process.env.DB_REDIS_PORT as string) || 6379,
    password: process.env.DB_REDIS_PASSWORD,
  };
});

// Get postgresql connection config.
export const _getPGConnectionConfig = () => ({
  host: process.env.DB_PG_HOST || '0.0.0.0',
  port: parseInt(process.env.DB_PG_PORT as string) || 5432,
  user: process.env.DB_PG_USER,
  password: process.env.DB_PG_PWD,
  database: process.env.DB_PG_DB,
});

const pg = registerAs('pg', () => {
  return _getPGConnectionConfig();
});

const smtp = registerAs('smtp', () => {
  return {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    username: process.env.SMTP_USERNAME,
    password: process.env.SMTP_PASSWORD,
    from: process.env.SMTP_FROM,
  };
});

const open_observe = registerAs('open_observe', () => {
  return {
    host: process.env.LOG_OO_HOST,
    defaultOrg: process.env.LOG_OO_DEFAULT_ORG,
    defaultStream: process.env.LOG_OO_DEFAULT_STREAM,
    password: process.env.LOG_OO_AUTH_PWD,
    username: process.env.LOG_OO_AUTH_USERNAME,
    enable: process.env.LOG_OO_ENABLE,
  };
});

const auth = registerAs('auth', () => {
  return {
    pasetoSecret: process.env.PASETO_SECRET,
    pasetoPublicKey: process.env.PASETO_PUBLIC,
  };
});

const security = registerAs('security', () => {
  return {
    // Production ready env force on.
    publicApiGuardEnabled:
      process.env.PUBLIC_API_GUARD_ENABLED === 'true' || kProdMode,
    publicApiGuardSalt: process.env.PUBLIC_API_GUARD_SALT,
    publicApiGuardExpiresIn: process.env.PUBLIC_API_GUARD_EXPIRES_IN,
  };
});

const storage = registerAs('storage', () => {
  return {
    s3: {
      accessKey: process.env.STORAGE_S3_ACCESS_KEY,
      secretKey: process.env.STORAGE_S3_SECRET_KEY,
      region: process.env.STORAGE_S3_REGION,
      endpoint: process.env.STORAGE_S3_ENDPOINT,
    },
    file: {
      limit: process.env.STORAGE_SIZE_LIMIT,
    },
  };
});

const docker = registerAs('docker_engine', () => {
  return {
    host: process.env.DOCKER_ENGINE_HOST,
    port: process.env.DOCKER_ENGINE_PORT,
    socket: process.env.DOCKER_ENGINE_SOCKET,
  };
});

export const communityDefaultConfigs = [
  app,
  redis,
  docker,
  pg,
  smtp,
  auth,
  open_observe,
  storage,
  security,
];
