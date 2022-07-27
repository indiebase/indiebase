import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, timeout, catchError } from 'rxjs';
import { is } from './helper';

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
