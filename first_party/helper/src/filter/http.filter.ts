import { ResultCode } from '../enum';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
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

  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    let statusCode;
    let resExceptionObj;

    process.env.NODE_ENV === 'development' && console.debug(exception);

    // http exception will ignore error log
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const resException = exception.getResponse();
      resExceptionObj =
        typeof resException === 'string'
          ? { message: resException }
          : resException;
    } else {
      console.log('=============================================');
      this.logger.error(exception, exception?.stack);

      statusCode = exception?.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR;
      resExceptionObj = {
        message: exception?.message,
      };
    }

    response.status(statusCode).send({
      ...resExceptionObj,
      statusCode,
      code: ResultCode.ERROR,
      timestamp: new Date().toLocaleString(),
      path: request.url,
    });
  }
}
