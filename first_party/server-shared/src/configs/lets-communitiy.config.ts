import { registerAs } from '@nestjs/config';

function handleOrigin(origin: string, originReg: string) {
  return [
    ...origin.split(',').filter(Boolean),
    ...originReg
      .split(',')
      .filter(Boolean)
      .map((v) => new RegExp(v)),
  ];
}

const app = registerAs('app', () => {
  return {
    hostname: process.env.HTTP_HOSTNAME,
    port: process.env.HTTP_PORT,
    corsOrigin: handleOrigin(
      process.env.CORS_ORIGINS_STRING,
      process.env.CORS_ORIGINS_REG,
    ),
    packageName: process.env.PACKAGE_NAME,
    sessionSecret: process.env.SESSION_SECRET,
  };
});

const redis = registerAs('redis', () => {
  return {
    host: process.env.DB_REDIS_HOST,
    port: process.env.DB_REDIS_PORT,
    password: process.env.DB_REDIS_PASSWORD,
  };
});

const mysql = registerAs('mysql', () => {
  return {
    host: process.env.DB_MYSQL_HOST,
    port: process.env.DB_MYSQL_PORT,
    username: process.env.DB_MYSQL_USER,
    password: process.env.DB_MYSQL_PASSWORD,
    database: process.env.DB_MYSQL_DATABASE,
  };
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

const logger = registerAs('logger', () => {
  return {
    host: process.env.LOG_LOKI_HOST,
  };
});

const casbin = registerAs('casbin', () => {
  return {
    database: process.env.AUTH_CASBIN_DATABASE,
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
  };
});

export const letsCommunityDefaultConfigs = [
  app,
  redis,
  mysql,
  smtp,
  casbin,
  logger,
  storage,
];
