import { OpenObserveTransport, OpenObserveTransportOptions } from '../src';
import { type Logger, createLogger } from 'winston';
import { describe, it, afterEach, expect } from 'vitest';
import { logs } from './fixtures.json';

describe('OpenObserve Transport', function () {
  let logger: Logger;
  let bulkLogger: Logger;

  let options: OpenObserveTransportOptions = {
    host: 'http://127.0.0.1:5080',
    defaultOrg: 'default',
    defaultStream: 'default',
    basicAuth: {
      username: 'dev@indiebase.com',
      password: 'indiebase',
    },
  };

  it('OpenObserveTransport should trigger the "logged" event', function () {
    const transport = new OpenObserveTransport(options);
    function eventEmitted() {
      expect(spy).toHaveBeenCalled();
    }
    const spy = jest.fn(eventEmitted);
    transport.on('logged', spy);
    transport.log({}, () => {});
  });

  it('Send log immediately', () => {
    logger = createLogger({
      transports: [
        new OpenObserveTransport({
          ...options,
          bulk: false,
        }),
      ],
    });
    logger.info(logs[0]);
    logger.error(logs[1]);
    logger.warn(logs[2]);
    expect.anything();
  });

  it('Send batch logs', (ctx) => {
    bulkLogger = createLogger({
      transports: [
        new OpenObserveTransport({
          ...options,
          bulk: true,
          interval: 1000,
        }),
      ],
    });
    bulkLogger.info('test2');
    setTimeout(() => {
      bulkLogger.error(logs[0]);
      bulkLogger.warn(logs[1]);
      expect.anything();
    }, 500);
  });

  afterEach(() => {
    logger?.close();
    bulkLogger?.close();
  });
});
