import {
  IsEntityExisted,
  IsIndiebaseLegalName,
  MgrMetaTables,
  OkedResponseSchema,
  PaginationRequestSchema,
} from '@indiebase/server-shared';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateOrgDTO {
  @ApiProperty({
    description: 'Organization name',
    default: 'publish',
  })
  @IsEntityExisted({
    schema: 'indiebase_mgr',
    table: MgrMetaTables.orgs,
    column: 'name',
  })
  @IsIndiebaseLegalName()
  name!: string;
}

export class UpdateOrgParamsDTO {
  @ApiProperty({
    description: 'Update target name',
    default: 'publish',
  })
  @IsEntityExisted(
    {
      schema: 'indiebase_mgr',
      table: MgrMetaTables.orgs,
      column: 'name',
    },
    {
      throwExistedMsg: false,
    },
  )
  @IsIndiebaseLegalName()
  org!: string;
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
    default: 'https://api-dev.indiebase.deskbtm.com/favicon.ico',
  })
  @IsOptional()
  @IsUrl({}, { message: 'Avatar url format error' })
  avatarUrl?: string;
}

export class CreateOrgResDTO extends OkedResponseSchema {}

export class HackerOwnedOrgsDTO extends PaginationRequestSchema {}
