export class NacosLogger {
  info(message: any, ...params) {
    // log.apply(this, [format(message, ...params)]);
  }

  log(info, callback) {
    // super.log.apply
    // super.log.apply(this, [format(message, ...params)]);
  }

  warn(message: any, ...params: any[]) {
    // super.warn.apply(this, [format(message, ...params)]);
  }

  debug(message: any, ...params: any[]) {
    // super.debug.apply(this, [format(message, ...params)]);
  }

  error(message: any, ...params: any[]) {
    // super.error.apply(this, [format(message, ...params)]);
  }
}
