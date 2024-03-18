import type { NestMiddleware } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';

@Injectable()
export class MountMiddleware implements NestMiddleware {
  use(req: FastifyRequest, res: FastifyReply, next: any) {
    console.log('Request...');
    next();
  }
}
