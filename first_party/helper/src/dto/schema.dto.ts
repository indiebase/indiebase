import { ResultCode } from '../enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @ApiProperty({
    default: 1,
  })
  @IsNumber()
  current?: number = 1;

  @ApiProperty({
    default: 20,
  })
  @IsNumber()
  pageSize: number = 20;
}
export class PaginationReqDto {
  @ApiProperty({
    default: 1,
  })
  @Type(() => Number)
  @IsNumber()
  current?: number = 1;

  @ApiProperty({
    default: 20,
  })
  @Type(() => Number)
  @IsNumber()
  pageSize: number = 20;
}

export class BaseResSchemaDto {
  @ApiProperty({
    description: 'Response code',
    default: ResultCode.SUCCESS,
  })
  code: number;

  @ApiProperty({
    description: 'Response message',
  })
  message?: string | string[];
}
export class PaginationResSchemaDto extends BaseResSchemaDto {
  @ApiProperty({
    description: 'Total items',
  })
  total: number;

  @ApiProperty({
    description: 'Current page',
  })
  current: number;

  @ApiProperty({
    description: 'Page size',
  })
  pageSize: number;
}
