import { RpcResSchemaDto } from '../dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, timeout, catchError } from 'rxjs';
import { is } from './helper';
import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  ForbiddenException,
  GatewayTimeoutException,
  GoneException,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
  NotImplementedException,
  PayloadTooLargeException,
  RequestTimeoutException,
  ServiceUnavailableException,
  UnauthorizedException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';

type ValueCallback = (err: any, caught?: any) => any;

export function awaitValue(
  client: ClientProxy,
  pattern: any,
  data: any,
): Promise<any>;
export function awaitValue(
  client: ClientProxy,
  pattern: any,
  data: any,
  options?: { duration: number },
): Promise<any>;
export function awaitValue(
  client: ClientProxy,
  pattern: any,
  data: any,
  errorCallback?: ValueCallback,
): Promise<any>;
export function awaitValue(
  client: ClientProxy,
  pattern: any,
  data: any,
  options?: any,
  errorCallback?: any,
) {
  let callback: ValueCallback;

  if (is.function(options)) {
    callback = options as any;
  } else {
    callback = errorCallback;
  }

  const duration = options?.duration ?? 4000;

  return lastValueFrom(
    client.send(pattern, data).pipe(timeout(duration), catchError(callback)),
  );
}

export const throwRpcException2Http = function (val: RpcResSchemaDto) {
  switch (val.httpStatus) {
    case 400:
      throw new BadRequestException(val);
    case 401:
      throw new UnauthorizedException(val);
    case 403:
      throw new ForbiddenException(val);
    case 404:
      throw new NotFoundException(val);
    case 406:
      throw new NotAcceptableException(val);
    case 407:
      throw new RequestTimeoutException(val);
    case 408:
      throw new ConflictException(val);
    case 410:
      throw new GoneException(val);
    case 413:
      throw new PayloadTooLargeException(val);
    case 415:
      throw new UnsupportedMediaTypeException(val);
    case 500:
      throw new InternalServerErrorException(val);
    case 501:
      throw new NotImplementedException(val);
    case 502:
      throw new BadGatewayException(val);
    case 503:
      throw new ServiceUnavailableException(val);
    case 504:
      throw new GatewayTimeoutException(val);
    default:
      break;
  }
};
