import { StatusCode } from '../constants';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Catch(HttpException)
export class FormatExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const status = exception.getStatus();
    const resException = exception.getResponse();
    const resExceptionObj =
      typeof resException === 'string'
        ? { message: resException }
        : resException;

    response.status(status).send({
      ...resExceptionObj,
      statusCode: status,
      code: StatusCode.ERROR,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
