import { OkResponseSchema } from '@indiebase/server-shared';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsUrl, IsHash } from 'class-validator';

export class CreateHackersDTO {
  @ApiProperty({
    description: 'Hacker account',
    default: 'dev@indiebase.com',
  })
  // @IsEntityExisted({
  //   schema: 'mgr',
  //   table: MgrMetaTables.hackers,
  //   column: 'email',
  // })
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'Hacker account password, the password needs to be converted to SHA256 for transfer',
    default: '1999569bbac0ab43f31808866fcd15a0b20d309ccd64410d470455076e582a6c',
  })
  @IsHash('sha256', {
    message: 'Password needs to be converted to SHA256',
  })
  password: string;
}

export class UpdateHackersDTO extends CreateHackersDTO {
  @ApiPropertyOptional({
    default: 'dev@indiebase.com',
  })
  @IsEmail(
    {},
    {
      message: 'Contact email format error',
    },
  )
  @IsOptional()
  contactEmail?: string;

  @ApiPropertyOptional({
    default: 'xxxxxx',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Project icon url',
    default: 'https://indiebase-dev.deskbtm.com/favicon.ico',
  })
  @IsOptional()
  @IsUrl({}, { message: 'Avatar url format error' })
  avatarUrl?: string;
}

export class CreateHackersResDTO extends OkResponseSchema {}
