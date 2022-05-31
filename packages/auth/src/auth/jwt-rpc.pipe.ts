import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class JwtPayloadPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value);
    return value;
  }
}
