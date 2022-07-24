import { UserEntity } from './user.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { BaseResSchemaDto } from '@letscollab/helper';
import { IsUserExisted } from 'src/utils';

export class SignupDto {
  @ApiPropertyOptional({
    description: 'nickname (optional)',
    default: 'letscollabNickname',
  })
  @IsOptional()
  nickname?: string;

  @ApiProperty({
    default: 'letscollab',
  })
  @IsNotEmpty({
    message: '用户名不可为空',
  })
  @IsUserExisted({
    message: 'username/email already registered',
  })
  username: string;

  @ApiProperty({
    default: 'deskbtm@outlook.com',
  })
  @IsNotEmpty({
    message: '邮箱不可为空',
  })
  @IsEmail(
    {},
    {
      message: '请输入正确邮箱',
    },
  )
  email: string;

  @ApiProperty({
    default: 'dev123456',
  })
  @IsNotEmpty({
    message: '密码不可为空',
  })
  @MinLength(8, {
    message: '密码长度不可低于8',
  })
  password: string;

  @ApiProperty({
    default: 12345,
  })
  @IsNotEmpty({
    message: '请填写验证码',
  })
  captcha: number;
}

export class UserResDto extends BaseResSchemaDto {
  @ApiPropertyOptional({
    type: () => UserEntity,
  })
  d?: UserEntity;
}

export class QueryUserDto {
  @ApiPropertyOptional({
    default: 'letscollab',
  })
  username?: string;
}
