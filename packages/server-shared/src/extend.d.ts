import 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    project: string;
  }
}
