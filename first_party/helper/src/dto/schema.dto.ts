import { ResultCode } from '../enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

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
    description: 'Response logical code',
    default: ResultCode.SUCCESS,
  })
  code: number;

  @ApiPropertyOptional({
    description: 'Response message',
  })
  message?: string | string[];
}

export class HttpResSchemaDto extends BaseResSchemaDto {
  d?: any;
}

export class PaginationResSchemaDto extends HttpResSchemaDto {
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
