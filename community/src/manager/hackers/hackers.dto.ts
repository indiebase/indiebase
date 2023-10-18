import {
  IsCommonLegalString,
  IsEntityExisted,
  MgrMetaTables,
  OkResponseSchema,
} from '@indiebase/server-shared';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsUrl } from 'class-validator';

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
