import { ResultCode } from '@indiebase/trait';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

/**
 * This clz will catch all exceptions and send formatted payload.
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    this.logger.error('Exception: ' + exception, exception.stack);

    const statusCode =
      exception.getStatus?.() ?? HttpStatus.INTERNAL_SERVER_ERROR;
    const resException = exception.getResponse?.() as any;

    const resExceptionObj =
      typeof resException === 'string'
        ? { message: resException }
        : resException?.response ??
          resException ?? { message: 'Internal Server Error' };

    response.status(statusCode).send({
      ...resExceptionObj,
      statusCode,
      code: ResultCode.ERROR,
      timestamp: new Date().toUTCString(),
      path: request.url,
    });
  }
}
