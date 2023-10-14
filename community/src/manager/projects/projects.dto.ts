import {
  IsCommonLegalString,
  IsEntityExisted,
  MgrMetaTables,
  OkResSchema,
} from '@indiebase/server-shared';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsUrl } from 'class-validator';

export class CreatePrjDto {
  @ApiProperty({
    description: 'Project name',
    default: 'indiebase',
  })
  @IsEntityExisted({
    schema: 'mgr',
    table: MgrMetaTables.projects,
    column: 'name',
  })
  @IsCommonLegalString()
  name: string;
}

export class UpdatePrjDto extends CreatePrjDto {
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

export class CreateOrgResDto extends OkResSchema {}
