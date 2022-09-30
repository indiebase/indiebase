import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { HttpResSchemaDto } from '@letscollab/helper';
import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { UserEntity } from '@letscollab/user';

export class JwtSignResDto extends HttpResSchemaDto {
  @ApiPropertyOptional({
    type: String,
  })
  d?: string;
}

/**
 * @deprecated
 */
export class LocalSignInDto {
  @ApiProperty({
    default: 'letscollabtest',
  })
  @IsNotEmpty({
    message: 'Username empty',
  })
  username: string;

  @ApiProperty({
    default: 'dev123456',
  })
  @IsNotEmpty({
    message: 'Password empty',
  })
  @MinLength(8, {
    message: 'Password length less than 8',
  })
  @MaxLength(64, {
    message: 'Password length more than 8',
  })
  password: string;
}

export class UserResponseDto extends HttpResSchemaDto {
  @ApiPropertyOptional({
    type: () => UserEntity,
  })
  d?: UserEntity;
}
