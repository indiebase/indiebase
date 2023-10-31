import 'fastify';
import { type Project } from '@indiebase/trait/mgr';

declare module 'fastify' {
  interface FastifyRequest {
    project: Project;
  }
}
