import type { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesSizeValidationPipe implements PipeTransform {
  maxSize = 100;
  constructor({ maxSize }: any) {
    this.maxSize = maxSize;
  }

  transform(value: any, _metadata: ArgumentMetadata) {
    if (Array.isArray(value)) {
      for (const val of value) {
        console.log(val.size);
      }
    }

    return value;
  }
}
