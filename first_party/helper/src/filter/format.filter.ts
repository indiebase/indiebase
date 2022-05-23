import { ResultCode } from '../constants';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

/**
 * 此类会捕获所有错误  它会将错误格式化并返回
 */
@Catch()
export class FormatExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    let statusCode;
    let resExceptionObj;

    // 如果是http错误
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const resException = exception.getResponse();
      resExceptionObj =
        typeof resException === 'string'
          ? { message: resException }
          : resException;
    } else {
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
