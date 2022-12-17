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
type ValuePattern = { cmd: string } | string;

export function awaitValue(
  client: ClientProxy,
  pattern: ValuePattern,
  data: any,
): Promise<any>;
export function awaitValue(
  client: ClientProxy,
  pattern: ValuePattern,
  data: any,
  options?: { duration: number },
): Promise<any>;
export function awaitValue(
  client: ClientProxy,
  pattern: ValuePattern,
  data: any,
  errorCallback?: ValueCallback,
): Promise<any>;
export function awaitValue(
  client: ClientProxy,
  pattern: ValuePattern,
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

export const RpcException2Http = function (val: RpcResSchemaDto) {
  // Not return stack.
  delete (val as any)?.stack;

  switch (val.statusCode) {
    case 400:
      return new BadRequestException(val);
    case 401:
      return new UnauthorizedException(val);
    case 403:
      return new ForbiddenException(val);
    case 404:
      return new NotFoundException(val);
    case 406:
      return new NotAcceptableException(val);
    case 407:
      return new RequestTimeoutException(val);
    case 408:
      return new ConflictException(val);
    case 410:
      return new GoneException(val);
    case 413:
      return new PayloadTooLargeException(val);
    case 415:
      return new UnsupportedMediaTypeException(val);
    case 500:
      return new InternalServerErrorException(val);
    case 501:
      return new NotImplementedException(val);
    case 502:
      return new BadGatewayException(val);
    case 503:
      return new ServiceUnavailableException(val);
    case 504:
      return new GatewayTimeoutException(val);
    default:
      return new InternalServerErrorException(val);
  }
};
