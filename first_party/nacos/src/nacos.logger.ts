import { ConsoleLogger } from '@nestjs/common';
import { format } from 'util';

export class NacosLogger extends ConsoleLogger {
  info(message: any, ...params: any) {
    super.log.apply(this, [format(message, ...params)]);
  }

  override log(message: any, ...params: any[]) {
    super.log.apply(this, [format(message, ...params)]);
  }

  override warn(message: any, ...params: any[]) {
    super.warn.apply(this, [format(message, ...params)]);
  }

  override debug(message: any, ...params: any[]) {
    super.debug.apply(this, [format(message, ...params)]);
  }

  override error(message: any, ...params: any[]) {
    super.error.apply(this, [format(message, ...params)]);
  }
}
