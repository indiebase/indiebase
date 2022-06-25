import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseResSchemaDto } from '@letscollab/helper';
import { IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator';

export class JwtSignResDto extends BaseResSchemaDto {
  @ApiPropertyOptional({
    type: String,
  })
  d?: string;
}

export class LocalSignInDto {
  @ApiProperty({
    default: 'deskbtm@outlook.com',
  })
  @IsNotEmpty({
    message: '用户姓名不可为空',
  })
  @IsEmail(
    {},
    {
      message: '邮箱格式不正确',
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
  @MaxLength(64, {
    message: '密码长度不可超过64',
  })
  password: string;
}
