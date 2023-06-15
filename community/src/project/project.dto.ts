import { IsEntityExisted, PaginationReqDto } from '@indiebase/server-shared';
import { ParamDirection, ParamSort } from '@indiebase/trait';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsOptional,
  IsNumber,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { OrgEntity } from '../org/org.entity';
import { ProjectEntity } from './project.entity';

export class CreateProjectDto {
  @ApiProperty({
    description: 'Project name',
    default: 'indiebase',
  })
  @IsString()
  @IsEntityExisted(ProjectEntity, 'name', 'Project name')
  name: string;

  @ApiProperty({
    description: 'Github repository name',
    default: 'indiebase',
  })
  @IsString()
  githubRepoName: string;

  @ApiProperty()
  @IsString()
  @IsEntityExisted(OrgEntity, 'name', 'Organization', { throwOnExist: false })
  orgName: string;

  @ApiProperty({
    description: 'Public email',
    default: 'deskbtm@outlook.com',
  })
  @IsEmail(
    {},
    {
      message: 'Email incorrect',
    },
  )
  contactEmail: string;

  @ApiProperty({
    description: 'Project domain equals project name + organization domain',
    default: 'indiebase.indiebase.deskbtm.com',
  })
  @IsEntityExisted(ProjectEntity, 'packageName', 'Package name')
  packageName: string;

  @ApiPropertyOptional({
    default: 'xxxxxx',
  })
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  pinned?: boolean;
}

export class UpdateProjectDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Project name',
    default: 'indiebase',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'public email',
    default: 'deskbtm@outlook.com',
  })
  @IsEmail(
    {},
    {
      message: 'Email incorrect',
    },
  )
  @IsOptional()
  contactEmail?: string;

  @ApiProperty({
    default: 'xxxxxx',
  })
  @IsOptional()
  description: string;
}

export class QueryProjectsDto extends PaginationReqDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  id?: number;

  @ApiPropertyOptional({
    description: 'Project name',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Organization name',
    default: 'deskbtm',
  })
  @IsString()
  orgName?: string;

  @ApiPropertyOptional({
    enum: ParamSort,
  })
  @IsOptional()
  @IsEnum(ParamSort)
  sort?: ParamSort;

  @ApiPropertyOptional({
    enum: ParamSort,
  })
  @IsOptional()
  @IsEnum(ParamDirection)
  direction?: ParamDirection;
}

export class DeleteProjectDto {
  @ApiProperty()
  @IsNumber()
  id: number;
}

export class SearchGithubDto {
  @ApiPropertyOptional({
    description:
      'Details: https://docs.github.com/en/search-github/searching-on-github/searching-for-repositories',
  })
  @IsString()
  @IsOptional()
  q?: string;
}

// export class ProjectListResDto extends PaginationResSchemaDto {
//   @ApiPropertyOptional({
//     type: () => {},
//   })
//   d?: any;
// }
