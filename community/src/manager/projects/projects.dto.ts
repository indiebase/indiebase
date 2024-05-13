import {
  MgrMetaTables,
  IsEntityExisted,
  IsIndiebaseLegalName,
  OkResponseSchema,
  SpecificProjectType,
} from '@indiebase/server-shared';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreatePrjDTO {
  @ApiProperty({
    description: 'Project name',
    default: 'publish',
  })
  @IsEntityExisted({
    type: SpecificProjectType.hardCode,
    schema: 'indiebase_mgr',
    table: MgrMetaTables.projects,
    column: 'name',
  })
  @IsIndiebaseLegalName()
  name!: string;
}

export class UpdatePrjDTO extends CreatePrjDTO {
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
    default: 'https://api-dev.indiebase.deskbtm.com/favicon.ico',
  })
  @IsOptional()
  @IsUrl({}, { message: 'Avatar url format error' })
  avatarUrl?: string;
}

export class CreateOrgResDTO extends OkResponseSchema {}
