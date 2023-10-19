import {
  IsCommonLegalString,
  IsEntityExisted,
  MgrMetaTables,
  OkResponseSchema,
} from '@indiebase/server-shared';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsUrl, IsHash } from 'class-validator';

export class CreateHackersDto {
  @ApiProperty({
    description: 'Hacker account',
    default: 'dev@deskbtm.com',
  })
  @IsEntityExisted({
    schema: 'mgr',
    table: MgrMetaTables.hackers,
    column: 'email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Hacker account',
    default: '7cc0dc81e477b2b24aca4cf86f61cc913daa47edae72027b900543f8686772b0',
  })
  @IsHash('sha256', {
    message: 'Password is illegal',
  })
  password: string;
}

export class UpdateHackersDto extends CreateHackersDto {
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

export class CreateHackersResDto extends OkResponseSchema {}
