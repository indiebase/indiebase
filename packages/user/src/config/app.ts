import { registerAs } from '@nestjs/config';

export default registerAs('app', () => {
  return {
    hostname: process.env.HTTP_HOSTNAME,
    port: process.env.HTTP_PORT,
    user_micro_host: process.env.USER_MICRO_HOST,
    user_micro_port: process.env.USER_MICRO_PORT,
  };
});
