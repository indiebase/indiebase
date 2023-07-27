import type { Format } from 'logform';

export interface OpenObserveTransportOptions {
  host: string;
  basicAuth?: {
    username: string;
    password: string;
  };
  headers?: Record<string, string>;
  onRequestError?: (error: Error) => void;
  /**
   * milliseconds
   */
  timeout?: number;
  bulk?: boolean;
  /**
   * Request interval, milliseconds.
   */
  interval?: number;
  labels?: Record<string, string>;
  gracefulShutdown?: boolean;
  /**
   * Default org_id.
   */
  defaultOrg: string;
  /**
   * Default stream name.
   */
  defaultStream: string;

  /**
   * Discard any logs that result in an error during transport.
   */
  cleanOnRequestError?: boolean;

  /**
   *
   * When a connection error occurs, close the transport.
   *
   * @param error
   * @param close Close transport, of cause you can not to call it.
   */
  onConnectionError?: (error: Error, close: () => void) => void;

  format?: Format;
  /**
   * using `Date.now` as timestamp for any logs.
   */
  useNow?: boolean;
}

export interface LogEntity {
  labels: Record<string, any>;
  label: string;
  level: string;
  timestamp: number;
  message: string;
  orgId: string;
  streamName: string;
}
