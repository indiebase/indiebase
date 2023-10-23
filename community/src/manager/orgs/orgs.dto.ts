import {
  IsCommonLegalString,
  IsEntityExisted,
  MgrMetaTables,
  OkResponseSchema,
} from '@indiebase/server-shared';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateOrgDto {
  @ApiProperty({
    description: 'Organization name',
    default: 'indiebase',
  })
  @IsEntityExisted({
    type: 'specificProject',
    schema: 'mgr',
    table: MgrMetaTables.orgs,
    column: 'name',
  })
  @IsCommonLegalString()
  name: string;
}

export class UpdateOrgDto extends CreateOrgDto {
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

export class CreateOrgResDto extends OkResponseSchema {}

export class ListOrgResDto {}
