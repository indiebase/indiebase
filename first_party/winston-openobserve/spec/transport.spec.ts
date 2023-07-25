import { OpenObserveTransport, OpenObserveTransportOptions } from '../src';
import { type Logger, createLogger, format } from 'winston';
import { describe, beforeEach, it, afterEach } from '@jest/globals';

const { combine, label } = format;

describe('OpenObserve Transport', function () {
  let logger: Logger;
  let bulkLogger: Logger;

  beforeEach((done) => {
    let options: Omit<OpenObserveTransportOptions, 'stream'> = {
      host: 'http://127.0.0.1:5080',
      org: 'default',
      basicAuth: {
        username: 'dev@indiebase.com',
        password: 'indiebase',
      },
    };
    logger = createLogger({
      format: combine(label()),
      transports: [
        new OpenObserveTransport({
          ...options,
          bulk: false,
          stream: 'no_bulk',
        }),
      ],
    });
    bulkLogger = createLogger({
      transports: [
        new OpenObserveTransport({
          ...options,
          bulk: true,
          stream: 'bulk',
        }),
      ],
    });
    done();
  });

  it('Send log immediately', () => {
    logger.info('test1');
    logger.error('test1');
    logger.warn('test1');
  });

  afterEach(() => {
    logger.close();
    bulkLogger.close();
  });
});
