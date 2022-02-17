import { registerAs } from '@nestjs/config';

export default registerAs('nacos', () => {
  return {
    namespace: process.env.NACOS_NAMESPACE,
    serverList: process.env.NACOS_SERVERLIST,
  };
});
