import {
  IsCommonLegalString,
  IsEntityExisted,
  MgrMetaTables,
  OkResponseSchema,
  SpecificProjectType,
} from '@indiebase/server-shared';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateOrgDTO {
  @ApiProperty({
    description: 'Organization name',
    default: 'indiebase',
  })
  @IsEntityExisted({
    schema: 'mgr',
    table: MgrMetaTables.orgs,
    column: 'name',
  })
  @IsCommonLegalString()
  name: string;
}

export class UpdateOrgDTO extends CreateOrgDTO {
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
    description: 'Organization icon url',
    default: 'https://indiebase-dev.deskbtm.com/favicon.ico',
  })
  @IsOptional()
  @IsUrl({}, { message: 'Avatar url format error' })
  avatarUrl?: string;
}

export class CreateOrgResDTO extends OkResponseSchema {}

export class ListOrgResDTO {}
