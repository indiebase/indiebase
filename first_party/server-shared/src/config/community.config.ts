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
    hostname: process.env.HTTP_HOSTNAME || '0.0.0.0',
    port: process.env.HTTP_PORT || 23331,
    corsOrigin: handleOrigin(process.env.CORS_ORIGINS_REGEX),
    packageName: process.env.PACKAGE_NAME,
    sessionSecret: process.env.SESSION_SECRET,
  };
});

const redis = registerAs('redis', () => {
  return {
    host: process.env.DB_REDIS_HOST || '0.0.0.0',
    port: parseInt(process.env.DB_REDIS_PORT) || 6379,
    password: process.env.DB_REDIS_PASSWORD,
  };
});

// Get postgresql connection config.
export const _getPGConnectionConfig = () => ({
  host: process.env.DB_PG_HOST || '0.0.0.0',
  port: parseInt(process.env.DB_PG_PORT) || 5432,
  user: process.env.DB_PG_USER,
  password: process.env.DB_PG_PWD,
  database: process.env.DB_PG_DB,
});

const pg = registerAs('pg', () => {
  return _getPGConnectionConfig();
});

const smtp = registerAs('smtp', () => {
  return {
    provider: process.env.SMTP_PROVIDER,
    host: process.env.SMTP_HOST,
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
    database: process.env.AUTH_CASBIN_DATABASE,
  };
});

const security = registerAs('security', () => {
  return {
    publicApiGuardEnabled: process.env.PUBLIC_API_GUARD_ENABLED === 'true',
    publicApiGuardSalt: process.env.PUBLIC_API_GUARD_SALT,
    publicApiGuardExpiresIn: parseInt(process.env.PUBLIC_API_GUARD_EXPIRES_IN),
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

export const communityDefaultConfigs = [
  app,
  redis,
  pg,
  smtp,
  auth,
  open_observe,
  storage,
  security,
];
