import Transport from 'winston-transport';
import { OpenObserveTransportOptions } from './interface';
import { Sender } from './sender';
import { MESSAGE } from 'triple-beam';
import * as assert from 'assert';
import exitHook from 'async-exit-hook';

export class OpenObserveTransport extends Transport {
  #sender: Sender;
  #options: OpenObserveTransportOptions;

  public constructor(options: OpenObserveTransportOptions) {
    super();

    assert.ok(options.org, 'Set default org_id');
    assert.ok(options.stream, 'Set default stream name');

    this.#options = {
      bulk: true,
      gracefulShutdown: true,
      timeout: 10000,
      interval: 10000,
      cleanOnError: false,
      useNow: false,
      ...options,
    };

    this.#sender = new Sender(this.#options);

    if (options.gracefulShutdown) {
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

    let openobserveLabels: Record<string, any> = {
      level,
    };

    labels = Object.assign({}, this.#options.labels);

    for (const key in openobserveLabels) {
      if (Object.prototype.hasOwnProperty.call(openobserveLabels, key)) {
        const value = openobserveLabels[key];
        if (typeof value !== 'string') {
          openobserveLabels[key] = String(value);
        }
      }
    }

    message = !!this.#options.format
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
          orgId: org ?? this.#options.org,
          streamName: stream ?? this.#options.stream,
        },
        bulk ?? this.#options.bulk,
      )
      .then(next);
  }

  public override close(): void {
    this.#sender.close();
  }
}
