// import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginationDto } from '@letscollab/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  MinLength,
} from 'class-validator';

export class QueryUserDto extends PaginationDto {
  @ApiProperty({
    description: '用户id',
  })
  id?: number;

  @ApiProperty({
    description: 'jaccount账户',
  })
  account?: string;

  @ApiProperty({
    description: '是否禁用',
  })
  disable?: number;
}

export class UpdateUserDto {
  @ApiProperty({
    description: '用户id',
    required: true,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: '是否禁用',
    default: false,
  })
  disable?: number;
}
