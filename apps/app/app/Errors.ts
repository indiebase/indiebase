// Whoops

interface ConfigurableErrorOptions {
  retryable?: boolean;
  exportable?: boolean;
  reportable?: boolean;
  showDetails?: boolean;
  message?: string;
  title?: string;
  description?: string;
}

export class ConfigurableError extends Error {
  retryable?: boolean;
  exportable?: boolean;
  reportable?: boolean;
  showDetails?: boolean;
  description?: string;
  title?: string;

  constructor(options: ConfigurableErrorOptions | string = {}) {
    super();

    if (typeof options === 'string') {
      this.message = options;
    } else {
      this.title = options.title;
      this.description = options.description;
      this.message = options.message!;
      this.retryable = options.retryable ?? true;
      this.exportable = options.exportable ?? true;
      this.reportable = options.reportable ?? true;
      this.showDetails = options.showDetails ?? false;
    }
  }
}

export class UnknownError extends ConfigurableError {}
