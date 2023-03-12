import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ResultCode } from '@letscollab/trait';

export class PaginationReqDto {
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
