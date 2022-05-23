import { ResultCode } from '../constants';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty()
  current?: number;

  @ApiProperty()
  pageSize?: number;

  @ApiProperty()
  total?: number;
}

export abstract class BasicSchemaDto {
  @ApiProperty({
    description: 'Response code',
    default: ResultCode.SUCCESS,
  })
  code: number;

  @ApiProperty({
    description: 'Response message',
  })
  message: string;
}
