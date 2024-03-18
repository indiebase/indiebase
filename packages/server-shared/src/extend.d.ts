import 'fastify';

import type { PrimitiveProject, PrimitiveUser } from '@indiebase/trait/mgr';

declare module 'node:http' {
  interface IncomingMessage {
    project: PrimitiveProject;
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    user: PrimitiveUser;
  }
}
