import { registerAs } from '@nestjs/config';

export default registerAs('app', () => {
  return {
    hostname: process.env.HTTP_HOSTNAME,
    port: process.env.HTTP_PORT,
    auth_micro_host: process.env.AUTH_MICRO_HOST,
    auth_micro_port: process.env.AUTH_MICRO_PORT,
    isDevelopment: process.env.NODE_ENV === 'development',
  };
});
