import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class SignupDto {
  @ApiProperty({
    description: '用户名(选填)',
    default: 'letscollabtest',
    required: false,
  })
  username?: string;

  @ApiProperty({
    default: 'letscollabtest@outlook.com',
  })
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

  @ApiProperty({
    default: 'dev123456',
  })
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

  @ApiProperty({
    default: 12345,
  })
  @IsNotEmpty({
    message: '请填写验证码',
  })
  captcha: number;
}
