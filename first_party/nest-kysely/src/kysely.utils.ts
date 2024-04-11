import { Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { delay, retryWhen, scan } from 'rxjs/operators';

import {
  DEFAULT_CONNECTION_EX_NAME,
  DEFAULT_CONNECTION_NAME,
} from './kysely.constants';
import { KyselyOptions } from './kysely.interfaces';

const logger = new Logger('KnexModule');

export function getConnectionToken(
  connection?: null | KyselyOptions | string,
  // Inject extended knex.
  ex: boolean = false,
): string | Function {
  if (typeof connection === 'string') {
    return ex ? connection + 'Ex' : connection;
  }

  return ex
    ? `${
        connection?.name ? connection.name + 'Ex' : DEFAULT_CONNECTION_EX_NAME
      }`
    : `${connection?.name ?? DEFAULT_CONNECTION_NAME}`;
}

export function handleRetry(
  retryAttempts = 9,
  retryDelay = 3000,
): <T>(source: Observable<T>) => Observable<T> {
  return <T>(source: Observable<T>) =>
    source.pipe(
      retryWhen((e) =>
        e.pipe(
          scan((errorCount, error: Error) => {
            logger.error(
              `Unable to connect to the database. Retrying (${
                errorCount + 1
              })...`,
              error.stack,
            );
            if (errorCount + 1 >= retryAttempts) {
              throw error;
            }
            return errorCount + 1;
          }, 0),
          delay(retryDelay),
        ),
      ),
    );
}
