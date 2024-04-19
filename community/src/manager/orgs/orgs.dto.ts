import {
  IndiebaseMetaTables,
  IsCommonLegalString,
  IsEntityExisted,
  OkResponseSchema,
  PaginationRequestSchema,
} from '@indiebase/server-shared';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateOrgDTO {
  @ApiProperty({
    description: 'Organization name',
    default: 'indiebase',
  })
  @IsEntityExisted({
    schema: 'indiebase',
    table: IndiebaseMetaTables.orgs,
    column: 'name',
  })
  @IsCommonLegalString()
  name!: string;
}

export class UpdateOrgParamsDTO {
  @ApiProperty({
    description: 'Update target name',
    default: 'indiebase',
  })
  @IsEntityExisted(
    {
      schema: 'indiebase',
      table: IndiebaseMetaTables.orgs,
      column: 'name',
    },
    {
      throwExistedMsg: false,
    },
  )
  @IsCommonLegalString()
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

export class CreateOrgResDTO extends OkResponseSchema {}

export class HackerOwnedOrgsDTO extends PaginationRequestSchema {}
