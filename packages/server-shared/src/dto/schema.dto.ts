import { ResultCode } from '@indiebase/trait';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class PaginationReqSchema {
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

export class OkResponseSchema {
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

export class PaginationResSchema extends OkResponseSchema {
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

export class ErrorResSchema {
  @ApiProperty({
    description: 'Response logical code',
    default: ResultCode.ERROR,
  })
  code: number;

  @ApiProperty({
    description: 'Response http code',
  })
  statusCode: number;

  @ApiPropertyOptional({
    description: 'Error responses message',
  })
  message?: string | string[];

  @ApiProperty({
    type: Date,
    description: 'Error responses timestamp',
  })
  timestamp: Date;

  @ApiProperty({
    description: 'Error responses api path',
  })
  path: string;
}
