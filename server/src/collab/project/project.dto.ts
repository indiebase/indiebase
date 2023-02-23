import { IsEntityExisted, PaginationReqDto } from '@letscollab-nest/helper';
import { ParamDirection, ParamSort } from '@letscollab-nest/trait';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsOptional,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { OrgEntity } from '../org/org.entity';
import { ProjectEntity } from './project.entity';

export class CreateProjectDto {
  @ApiProperty({
    description: 'Project name',
    default: 'letscollab',
  })
  @IsString()
  @IsEntityExisted(ProjectEntity, 'name', 'Project name')
  name: string;

  @ApiProperty({
    description: 'Github repository name',
    default: 'letscollab',
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
    default: 'letscollab.letscollab.deskbtm.com',
  })
  @IsEntityExisted(ProjectEntity, 'packageName', 'Package name')
  packageName: string;

  @ApiPropertyOptional({
    default: 'xxxxxx',
  })
  @IsOptional()
  description?: string;
}

export class UpdateProjectDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Project name',
    default: 'letscollab',
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
      message: '邮箱格式不正确',
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

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
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

// export class ProjectListResDto extends PaginationResSchemaDto {
//   @ApiPropertyOptional({
//     type: () => {},
//   })
//   d?: any;
// }
