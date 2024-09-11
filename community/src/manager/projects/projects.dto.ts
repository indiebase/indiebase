import {
  INDIEBASE_MGR,
  IsEntityExisted,
  IsLegalName,
  M,
  SpecificProjectType,
} from '@indiebase/server-shared';
import { ProjectStatus } from '@indiebase/trait';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreatePrjDTO {
  @ApiProperty({
    description: 'Project name',
    default: 'publish',
  })
  @IsEntityExisted({
    type: SpecificProjectType.hardCode,
    schema: INDIEBASE_MGR,
    table: M.projects,
    column: 'name',
  })
  @IsLegalName()
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

export class ProjectDTO {
  @ApiProperty({
    description: 'Project ID',
  })
  id!: number;

  @ApiProperty({
    description: 'Project name',
  })
  name!: string;

  @ApiPropertyOptional({
    description: 'Project description',
  })
  description?: string;

  @ApiPropertyOptional({
    description: 'Contact email',
  })
  contactEmail?: string;

  @ApiPropertyOptional({
    description: 'Project avatar url ',
  })
  avatarUrl?: string;

  @ApiPropertyOptional({
    description: 'Project card pinned order',
  })
  pinnedOrder?: number;

  @ApiPropertyOptional({
    description: 'Pin the project',
  })
  pinned?: boolean;

  @ApiPropertyOptional({
    enum: ProjectStatus,
    description: 'Project status',
  })
  status?: ProjectStatus;

  @ApiPropertyOptional({
    description: 'Fallback package name',
  })
  packageName?: string;

  @ApiPropertyOptional({
    description: 'Project github repository',
  })
  githubRepo?: string;

  @ApiProperty({
    description: 'X-Indiebase-Reference-Id, the ID for business',
  })
  referenceId!: string;

  @ApiProperty({
    description: 'Project created timestamp',
  })
  @IsString()
  createdAt!: Date;

  @ApiProperty({
    description: 'Project updated timestamp',
  })
  @IsString()
  updatedAt!: Date;
}
