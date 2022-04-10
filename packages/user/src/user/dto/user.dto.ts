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

export class UserRegisterDto {
  @ApiProperty({
    description: '用户名(选填)',
  })
  username?: string;

  @ApiProperty()
  @IsNotEmpty({
    message: '账户不可为空',
  })
  @IsEmail(
    {},
    {
      message: '邮箱格式不正确',
    },
  )
  account?: string;

  @ApiProperty()
  @IsNotEmpty({
    message: '密码不可为空',
  })
  @MinLength(8, {
    message: '密码长度不可低于8',
  })
  @MaxLength(32, {
    message: '密码长度不可超过32',
  })
  password: string;

  // @ApiProperty()
  // @IsNotEmpty({
  //   message: '请填写验证码',
  // })
  // captcha: string;
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
