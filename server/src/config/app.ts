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

export default registerAs('app', () => {
  return {
    hostname: process.env.HTTP_HOSTNAME,
    port: process.env.HTTP_PORT,
    isDevelopment: process.env.NODE_ENV === 'development',
    corsOrigin: handleOrigin(
      process.env.CORS_ORIGINS_STRING,
      process.env.CORS_ORIGINS_REG,
    ),
    packageName: process.env.PACKAGE_NAME,
  };
});
