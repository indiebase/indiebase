import {
  Injectable,
  CanActivate,
  Logger,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { FastifyRequest, FastifyReply } from 'fastify';

/**
 * @deprecated
 */
@Injectable()
export class CsrfGuard implements CanActivate {
  constructor(
    private readonly logger: Logger,
    private readonly adapterHost: HttpAdapterHost,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const http = context.switchToHttp();
      const request = http.getRequest<FastifyRequest>(),
        response = http.getResponse<FastifyReply>(),
        next = http.getNext();
      const instance = this.adapterHost.httpAdapter.getInstance();

      instance.csrfProtection(request, response, next);

      return true;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException();
    }
  }
}
