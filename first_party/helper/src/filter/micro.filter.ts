import {
  Catch,
  RpcExceptionFilter,
  ArgumentsHost,
  Logger,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class MicroExceptionFilter implements RpcExceptionFilter<RpcException> {
  constructor(private readonly logger: Logger) {}

  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    this.logger.error(exception.message, exception.stack);
    console.log(host, '================================================');
    return throwError(() => exception.getError());
  }
}
