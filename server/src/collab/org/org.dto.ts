import {
  PaginationReqDto,
  PaginationResSchemaDto,
} from '@letscollab-nest/helper';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsOptional,
  IsNumber,
  IsUrl,
} from 'class-validator';

export class CreateOrgDto {
  @ApiPropertyOptional({
    description: 'Org name',
    default: 'deskbtm',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Github organization name',
    default: 'deskbtm-letscollab',
  })
  @IsString()
  githubOrgName: string;

  @ApiProperty({
    description:
      'Organization domain is the unique id for letscollab. if the package name is not specific, the project will use reverse words that project name + organization domain as package name. e.g com.deskbtm.letscollab.xxxx.',
    default: 'letscollab.deskbtm.com',
  })
  @IsString()
  domain: string;

  @ApiProperty({
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
    description: 'Organization homepage',
    default: 'https://letscollab.deskbtm.com',
  })
  @IsUrl(
    {},
    {
      message: 'Illegal http Url',
    },
  )
  @IsOptional()
  homepage?: string;

  @ApiProperty({
    default: 'xxxxxx',
  })
  @IsOptional()
  description?: string;
}

export class UpdateOrgDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Team name',
    default: 'letscollab',
  })
  @IsOptional()
  @IsString()
  name?: string;

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
  @IsOptional()
  contactEmail?: string;

  @ApiProperty({
    default: 'xxxxxx',
  })
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'Organization domain',
    default: 'letscollab.deskbtm.com',
  })
  domain: string;
}

export class DeleteOrgDto {
  @ApiProperty()
  @IsNumber()
  id: number;
}

export class QueryOrgDto extends PaginationReqDto {
  @ApiPropertyOptional({
    nullable: true,
  })
  @IsOptional()
  name?: string;
}

export class QueryOrgResDto extends PaginationResSchemaDto {
  @ApiPropertyOptional({
    // type: () => [OrgEntity],
  })
  d?: [];
}

// export class QueryOrgResDto extends PaginationReqDto {
//   @ApiPropertyOptional({
//     nullable: true,
//   })
//   @IsOptional()
//   name?: string;
// }
