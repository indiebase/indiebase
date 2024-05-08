import {
  ArgumentMetadata,
  Injectable,
  SetMetadata,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';

export const INDIEBASE_VALIDATION_OPTIONS = Symbol(
  'INDIEBASE_VALIDATION_OPTIONS',
);

@Injectable()
export class IndiebaseValidationPipe extends ValidationPipe {
  override async transform(value: any, metadata: ArgumentMetadata) {
    const options = Reflect.getMetadata(
      INDIEBASE_VALIDATION_OPTIONS,
      metadata.metatype!,
    );
    let originOptions;
    if (options) {
      originOptions = Object.assign({}, this.validatorOptions);
      this.validatorOptions = Object.assign(this.validatorOptions, options);
    }
    const result = super.transform(value, metadata);
    if (originOptions) {
      this.validatorOptions = originOptions;
    }
    return result;
  }
}

export function ValidationOptions(options: ValidationPipeOptions) {
  return SetMetadata(INDIEBASE_VALIDATION_OPTIONS, options);
}
