import 'fastify';

import { PrimitiveProject, PrimitiveUser } from '@indiebase/trait';

declare module 'node:http' {
  interface IncomingMessage {
    project: PrimitiveProject;
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    user: PrimitiveUser;
    project: PrimitiveProject;
  }
}
