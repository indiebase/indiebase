import type { Format } from "logform";

export interface OpenObserveTransportOptions {
  host: string;
  basicAuth?: {
    username: string;
    password: string;
  };
  headers?: Record<string, string>;
  onRequestError?: (error: Error) => void;
  timeout?: number;
  bulk?: boolean;
  /**
   * Request interval, seconds.
   */
  interval?: number;
  labels?: Record<string, string>;
  gracefulShutdown?: boolean;
  /**
   * Default org_id.
   */
  org: string;
  /**
   * Default stream name.
   */
  stream: string;

  /**
   * Discard any logs that result in an error during transport.
   */
  cleanOnError?: boolean;
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
