import { ConsoleLogger } from '@nestjs/common';
import { format } from 'util';

export class NacosLogger extends ConsoleLogger {
  info(message: any, ...params) {
    super.log.apply(this, [format(message, ...params)]);
  }
}
