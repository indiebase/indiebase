import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { BasicSchemaDto } from './schema.dto';

enum AccountStatus {
  forbidden,
  active,
}

export class SignupDto {
  @ApiProperty({
    description: '用户名(选填)',
    default: 'letscollabtest',
    required: false,
  })
  username?: string;

  @ApiProperty({
    default: 'deskbtm@outlook.com',
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

export class LocalSignInDto {
  @ApiProperty({
    default: 'deskbtm@outlook.com',
  })
  @IsNotEmpty({
    message: '用户姓名不可为空',
  })
  @IsEmail(null, {
    message: '邮箱格式不正确',
  })
  account: string;

  @ApiProperty({
    default: 'dev123456',
  })
  @IsNotEmpty({
    message: '密码不可为空',
  })
  @MinLength(8, {
    message: '密码长度不可低于8',
  })
  @MaxLength(64, {
    message: '密码长度不可超过64',
  })
  password: string;
}

export class UserDto {
  @ApiProperty({
    description: 'jwt',
  })
  t?: string;

  @ApiProperty()
  id: number;

  @ApiProperty()
  account: string;

  @ApiProperty({
    description: '初始值和account相同',
  })
  username: string;

  @ApiProperty({
    enum: AccountStatus,
    description: 'account status',
  })
  accountStatus?: AccountStatus;

  @ApiProperty({
    description: '邀请的用户',
  })
  invitations: UserDto[];

  @ApiProperty({
    description: '被谁邀请',
  })
  inviteBy: UserDto;

  createTime?: Date;
  updateTime?: Date;
}

export class UserResDto extends BasicSchemaDto {
  @ApiPropertyOptional({
    type: () => UserDto,
  })
  d?: UserDto;
}
