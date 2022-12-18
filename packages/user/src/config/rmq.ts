import { registerAs } from '@nestjs/config';

export default registerAs('rmq', () => {
  return {
    urls: process.env.RMQ_ADDR?.split(',') ?? [],
  };
});
