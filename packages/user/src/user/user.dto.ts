import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AccountStatus } from './user.enum';
import { BasicResSchemaDto } from '@letscollab/helper';

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
      message: '邮箱格式不正确',
    },
  )
  username?: string;

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

export class UserDto {
  @ApiProperty({
    description: 'jwt',
  })
  t?: string;

  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty({
    description: '初始值和username相同',
  })
  nickname: string;

  @ApiProperty({
    enum: AccountStatus,
    description: 'Account status',
  })
  status?: AccountStatus;

  @ApiPropertyOptional({
    description: '邀请的用户',
  })
  invitations?: UserDto[];

  @ApiPropertyOptional({
    description: '被邀请',
  })
  inviteBy?: UserDto;

  createTime?: Date;
  updateTime?: Date;
}

export class UserResDto extends BasicResSchemaDto {
  @ApiPropertyOptional({
    type: () => UserDto,
  })
  d?: UserDto;
}
