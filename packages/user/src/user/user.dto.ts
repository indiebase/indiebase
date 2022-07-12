import { UserEntity } from './user.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { BaseResSchemaDto } from '@letscollab/helper';

export class SignupDto {
  @ApiPropertyOptional({
    description: '用户名(选填)',
    default: 'letscollabtest',
  })
  @IsOptional()
  nickname?: string;

  @ApiProperty({
    default: 'deskbtm@outlook.com',
  })
  @IsNotEmpty({
    message: '账户不可为空',
  })
  @IsEmail(
    {},
    {
      message: '用户名需使用邮箱',
    },
  )
  username: string;

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
