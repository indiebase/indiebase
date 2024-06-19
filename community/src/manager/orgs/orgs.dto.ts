import {
  INDIEBASE_MGR,
  IsEntityExisted,
  IsIndiebaseLegalName,
  MgrMetaTables,
  OkedResponseSchema,
  PaginatedRequestSchema,
} from '@indiebase/server-shared';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateOrgDTO {
  @ApiProperty({
    description: 'Organization name',
    default: 'publish',
  })
  @IsEntityExisted({
    schema: INDIEBASE_MGR,
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
      schema: INDIEBASE_MGR,
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

export class HackerOwnedOrgsDTO extends PaginatedRequestSchema {}

export class OrgDTO {
  @ApiProperty({
    description: 'Organization ID',
  })
  id!: number;

  @ApiProperty({
    description: 'Organization name',
  })
  name!: string;

  @ApiPropertyOptional({
    description: 'Organization description',
  })
  description?: string;

  @ApiPropertyOptional({
    description: 'Contact email',
  })
  contactEmail?: string;

  @ApiPropertyOptional({
    description: 'Organization avatar url',
  })
  avatarUrl?: string;

  @ApiPropertyOptional({
    description: 'Indiebase associated with the Github organization',
  })
  githubOrg?: string;

  @ApiPropertyOptional({
    description: 'Organization homepage website',
  })
  homepage?: string;

  @ApiPropertyOptional({
    description: 'Organization owner id',
  })
  ownerId?: string;

  @ApiProperty({
    description: 'Organization created timestamp',
  })
  createdAt!: Date;

  @ApiProperty({
    description: 'Organization updated timestamp',
  })
  updatedAt!: Date;
}
