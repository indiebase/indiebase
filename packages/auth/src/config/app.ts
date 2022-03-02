import { registerAs } from '@nestjs/config';

export default registerAs('app', () => {
  return {
    hostname: process.env.SERVICE_HOSTNAME,
    port: process.env.SERVICE_PORT,
    auth_microservice_host: process.env.AUTH_MICROSERVICE_HOST,
    auth_microservice_port: process.env.AUTH_MICROSERVICE_PORT,
  };
});
