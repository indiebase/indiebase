import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class FilesSizeValidationPipe implements PipeTransform {
  maxSize = 100;
  constructor({ maxSize }: any) {
    this.maxSize = maxSize;
  }

  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value, this.maxSize);

    if (Array.isArray(value)) {
      for (const val of value) {
        console.log(val.size);
      }
    }

    return value;
  }
}
