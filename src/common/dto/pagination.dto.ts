import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({
    description: '当前页面号',
    type: Number,
  })
  current?: number;

  @ApiProperty({
    description: '页面项的数量',
    default: 20,
    type: Number,
  })
  pageSize?: number;
}
