/* eslint-disable prefer-const */
import * as assert from 'assert';
import exitHook from 'async-exit-hook';
import { MESSAGE } from 'triple-beam';
import Transport from 'winston-transport';

import type { OpenObserveTransportOptions } from './interface';
import { Sender } from './sender';

function isURL(url: string) {
  try {
    new URL('', url);
    return true;
  } catch (error) {
    return false;
  }
}

export class OpenObserveTransport extends Transport {
  #sender: Sender;
  #options: OpenObserveTransportOptions;

  public constructor(options: OpenObserveTransportOptions) {
    super();

    assert.ok(options.defaultOrg, 'Set default org_id');
    assert.ok(options.defaultStream, 'Set default stream name');
    assert.ok(isURL(options.host), 'Host URL can not parse');

    this.#options = {
      bulk: true,
      gracefulShutdown: true,
      timeout: 1e4,
      interval: 1e4,
      cleanOnRequestError: false,
      useNow: false,
      ...options,
    };

    this.#sender = new Sender(this.#options);

    if (this.#options.gracefulShutdown) {
      exitHook(() => {
        this.close();
      });
    }
  }

  #getTimestamp(timestamp) {
    if (this.#options.useNow) return Date.now();

    let ts;

    if (timestamp) {
      ts = new Date(timestamp).getTime();
      ts = isNaN(ts) ? Date.now() : ts;
    } else {
      ts = Date.now();
    }
    return ts;
  }

  public override log(info: any, next: () => void) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    let {
      label,
      labels,
      timestamp,
      level,
      message,
      org,
      stream,
      bulk,
      ...rest
    } = info;
    timestamp = this.#getTimestamp(timestamp);

    const openObserveLabels: Record<string, any> = {
      level,
    };

    labels = Object.assign({}, this.#options.labels);

    for (const key in openObserveLabels) {
      if (Object.prototype.hasOwnProperty.call(openObserveLabels, key)) {
        const value = openObserveLabels[key];
        if (typeof value !== 'string') {
          openObserveLabels[key] = String(value);
        }
      }
    }

    message = this.#options.format
      ? info[MESSAGE]
      : `${message} ${
          rest && Object.keys(rest).length > 0 ? JSON.stringify(rest) : ''
        }`;

    this.#sender
      .push(
        {
          labels,
          timestamp,
          level,
          message,
          label,
          orgId: org ?? this.#options.defaultOrg,
          streamName: stream ?? this.#options.defaultStream,
        },
        bulk ?? this.#options.bulk,
      )
      .then(next);
  }

  public override close(): void {
    this.#sender.close();
  }
}
