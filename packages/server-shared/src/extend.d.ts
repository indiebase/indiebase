import 'fastify';
import type { Project, BasicUser } from '@indiebase/trait/mgr';

declare module 'node:http' {
  interface IncomingMessage {
    project: Project;
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    user: BasicUser;
  }
}
