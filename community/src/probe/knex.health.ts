import { getConnectionToken } from '@indiebase/nest-knex';
import { Injectable, Scope } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { HealthIndicatorResult } from '@nestjs/terminus';
import {
  ConnectionNotFoundError,
  HealthCheckError,
  HealthIndicator,
  TimeoutError,
} from '@nestjs/terminus';
import { checkPackages, promiseTimeout } from '@nestjs/terminus/dist/utils';
import { Knex } from 'knex';

export interface KnexPingCheckSettings {
  /**
   * The connection which the ping check should get executed
   */
  // `any` type in case of Knex version mismatch
  connection?: any;
  /**
   * The amount of time the check should require in ms
   */
  timeout?: number;
}

@Injectable({ scope: Scope.TRANSIENT })
export class KnexHealthIndicator extends HealthIndicator {
  /**
   * Initializes the KnexHealthIndicator
   *
   * @param {ModuleRef} moduleRef The NestJS module reference
   */
  constructor(private moduleRef: ModuleRef) {
    super();
    // this.checkDependantPackages();
  }

  /**
   * Checks if the dependant packages are present
   */
  private checkDependantPackages() {
    checkPackages(['@indiebase/nest-knex', 'knex'], this.constructor.name);
  }

  /**
   * Returns the connection of the current DI context
   */
  private getContextConnection() {
    try {
      return this.moduleRef.get(getConnectionToken() as string, {
        strict: false,
      });
    } catch (err) {
      return null;
    }
  }

  /**
   * Pings a Knex connection
   *
   * @param connection The connection which the ping should get executed
   * @param timeout The timeout how long the ping should maximum take
   *
   */
  private async pingDb(connection: Knex, timeout: number) {
    const check = connection.raw('SELECT 1');
    return await promiseTimeout(timeout, check);
  }
  /**
   * Checks if responds in (default) 1000ms and
   * returns a result object corresponding to the result
   * @param key The key which will be used for the result object
   * @param options The options for the ping
   *
   * @example
   * KnexHealthIndicator.pingCheck('database', { timeout: 1500 });
   */
  async pingCheck(
    key: string,
    options: KnexPingCheckSettings = {},
  ): Promise<HealthIndicatorResult> {
    let isHealthy = false;
    // this.checkDependantPackages();

    const connection = options.connection || this.getContextConnection();
    const timeout = options.timeout || 1e3;

    if (!connection) {
      throw new ConnectionNotFoundError(
        this.getStatus(key, isHealthy, {
          message: 'Connection provider not found in application context',
        }),
      );
    }

    try {
      await this.pingDb(connection, timeout);
      isHealthy = true;
    } catch (err) {
      if (err instanceof TimeoutError) {
        throw new TimeoutError(
          timeout,
          this.getStatus(key, isHealthy, {
            message: `timeout of ${timeout}ms exceeded`,
          }),
        );
      }
    }

    if (isHealthy) {
      return this.getStatus(key, isHealthy);
    } else {
      throw new HealthCheckError(
        `${key} is not available`,
        this.getStatus(key, isHealthy),
      );
    }
  }
}
