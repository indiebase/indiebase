import { OrgEntity } from './org.entity';
import { IsEntityExisted, PaginationReqDto } from '@letscollab-nest/helper';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsOptional,
  IsNumber,
  IsUrl,
} from 'class-validator';

export class CreateOrgDto {
  @ApiProperty({
    description: 'Org name',
    default: 'deskbtm-letscollab',
  })
  @IsEntityExisted(OrgEntity, 'name', 'Organization name')
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Github organization name',
    default: 'deskbtm-letscollab',
  })
  @IsEntityExisted(OrgEntity, 'githubOrgName', 'Github Organization')
  @IsString()
  githubOrgName: string;

  @ApiProperty({
    description:
      'Organization domain is the unique id for letscollab. if the package name is not specific, the project will use reverse words that project name + organization domain as package name. e.g com.deskbtm.letscollab.xxxx.',
    default: 'letscollab.deskbtm.com',
  })
  @IsEntityExisted(OrgEntity, 'domain', 'Organization domain')
  @IsString()
  domain: string;

  @ApiPropertyOptional({
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

  @ApiPropertyOptional({
    default: 'xxxxxx',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Organization icon url',
  })
  @IsOptional()
  @IsUrl()
  avatarUrl?: string;
}

export class UpdateOrgDto {
  @ApiProperty()
  @IsNumber()
  id: number;

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

  @ApiPropertyOptional({
    default: 'xxxxxx',
  })
  @IsOptional()
  description: string;

  @ApiPropertyOptional({
    default: 'xxxxxx',
  })
  @IsOptional()
  @IsUrl()
  avatarUrl: string;

  @ApiPropertyOptional({
    description: 'Organization domain',
    default: 'letscollab.deskbtm.com',
  })
  @IsEntityExisted(OrgEntity, 'domain', 'Organization domain')
  @IsOptional()
  domain: string;

  @ApiPropertyOptional({
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
