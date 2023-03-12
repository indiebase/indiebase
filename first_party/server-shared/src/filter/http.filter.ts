import { ResultCode } from '@letscollab/trait';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

/**
 * This clz will catch all exceptions and send formatted payload.
 *
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    this.logger.error('Http Exception: ' + exception, exception.stack);

    const statusCode = exception.getStatus();
    const resException = exception.getResponse() as any;

    console.log(exception, resException);

    const resExceptionObj =
      typeof resException === 'string'
        ? { message: resException }
        : resException.response ?? resException;

    response.status(statusCode).send({
      ...resExceptionObj,
      statusCode,
      code: ResultCode.ERROR,
      timestamp: new Date().toLocaleString(),
      path: request.url,
    });
  }
}
