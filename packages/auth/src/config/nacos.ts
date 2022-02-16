import { registerAs } from '@nestjs/config';

export default registerAs('nacos', () => {
  return {
    namespace: process.env.NACOS_NAMESPACE,
  };
});
