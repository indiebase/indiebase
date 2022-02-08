import { StatusCode } from './status';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { is } from './utils';

@Catch(HttpException)
export class GlobalHttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const resException = exception.getResponse();
    const resExceptionObj = is.string(resException)
      ? { message: resException }
      : resException;

    response.status(status).json({
      ...resExceptionObj,
      statusCode: status,
      code: StatusCode.ERROR,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
