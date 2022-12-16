import { registerAs } from '@nestjs/config';

export default registerAs('amqp', () => {
  return {
    urls: process.env.AMQP_ADDR?.split(',') ?? [],
  };
});
