import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty()
  current?: number;

  @ApiProperty()
  pageSize?: number;

  @ApiProperty()
  total?: number;
}
