import {
  Catch,
  RpcExceptionFilter,
  ArgumentsHost,
  Logger,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

// /**
//  * @deprecated
//  *
//  */
@Catch(RpcException)
export class MicroserviceExceptionFilter
  implements RpcExceptionFilter<RpcException>
{
  constructor(private readonly logger: Logger) {}

  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    console.log('==============================');
    this.logger.error('Rpc Exception: ' + exception, exception.stack);
    return throwError(() => exception.getError());
  }
}
