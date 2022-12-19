import { registerAs } from '@nestjs/config';

export default registerAs('app', () => {
  return {
    hostname: process.env.HTTP_HOSTNAME,
    port: process.env.HTTP_PORT,
    isDevelopment: process.env.NODE_ENV === 'development',
  };
});
