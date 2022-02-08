import { PaginationDto } from '@/common/dto/pagination.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UserLoginDto {
  @ApiProperty({
    description: 'jAccount Oauth授权码',
  })
  @IsNotEmpty({
    message: 'code不能为空',
  })
  code: string;

  @ApiProperty({
    description: 'jAccount 回调地址',
  })
  @IsNotEmpty({
    message: '回调地址不能为空',
  })
  redirect_uri: string;
}
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

export class EditUserDto {
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
