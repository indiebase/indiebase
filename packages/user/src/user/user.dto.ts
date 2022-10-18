import { HttpResSchemaDto } from '@letscollab/helper';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { UserEntity } from './user.entity';

export class SignupDto {
  @ApiPropertyOptional({
    description: 'nickname (optional)',
    default: 'letscollabNickname',
  })
  @IsOptional()
  nickname?: string;

  @ApiProperty({
    default: 'letscollabtest',
  })
  @IsNotEmpty({
    message: 'Username is empty',
  })
  username: string;

  @ApiProperty({
    default: 'deskbtm@outlook.com',
  })
  @IsEmail(
    {},
    {
      message: 'The following email incorrect',
    },
  )
  email: string;

  @ApiProperty({
    default: 'dev123456',
  })
  @MinLength(8, {
    message: 'Password length cannot less than 8',
  })
  password: string;

  @ApiProperty({
    default: 12345,
  })
  @IsNotEmpty({
    message: 'Invalid CAPTCHA',
  })
  captcha: number;
}

export class QueryUserDto {
  @ApiPropertyOptional({
    default: 'letscollab',
  })
  username?: string;
}

export class UserResponseDto extends HttpResSchemaDto {
  @ApiPropertyOptional({
    type: () => UserEntity,
  })
  d?: UserEntity;
}
