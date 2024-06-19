import { ResultCode } from '@indiebase/sdk';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class OkedResponseSchema<TData = any> {
  @ApiProperty({
    description: 'Response logical code',
    default: ResultCode.SUCCESS,
  })
  code!: number;

  @ApiPropertyOptional({
    description: 'Response message',
  })
  message?: string | string[];

  body?: TData;
}

export class PaginatedRequestSchema {
  @ApiProperty({
    default: 1,
  })
  @Type(() => Number)
  @IsNumber()
  pageIndex?: number = 1;

  @ApiProperty({
    default: 20,
  })
  @Type(() => Number)
  @IsNumber()
  pageSize: number = 20;
}

export class PaginatedResponseSchema<TData = any> {
  @ApiProperty({
    description: 'Total items',
  })
  total!: number;

  @ApiProperty({
    description: 'Current page',
  })
  pageIndex!: number;

  @ApiProperty({
    description: 'Page size',
  })
  pageSize!: number;

  @ApiProperty({
    description: 'Last page',
  })
  lastPage!: number;

  @ApiProperty({
    description: 'Previous page',
  })
  prevPage!: number;

  @ApiProperty({
    description: 'Next page',
  })
  nextPage!: number;

  @ApiProperty({
    description: 'Response logical code',
    default: ResultCode.SUCCESS,
  })
  code!: number;

  @ApiPropertyOptional({
    description: 'Response message',
  })
  message?: string | string[];

  body?: TData[];
}

export class ErrResponseSchema {
  @ApiProperty({
    description: 'Response logical code',
    default: ResultCode.ERROR,
  })
  code!: number;

  @ApiProperty({
    description: 'Response http code',
  })
  statusCode!: number;

  @ApiPropertyOptional({
    description: 'Error responses message',
  })
  message?: string | string[];

  @ApiProperty({
    type: Date,
    description: 'Error responses timestamp',
  })
  timestamp!: Date;

  @ApiProperty({
    description: 'Error responses api path',
  })
  path!: string;
}
