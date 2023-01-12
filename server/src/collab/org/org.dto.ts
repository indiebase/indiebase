import { PaginationReqDto } from '@letscollab-nest/helper';
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
  @IsString()
  name: string;

  @ApiProperty({
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

  @ApiPropertyOptional({
    default: 'xxxxxx',
  })
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Organization icon url',
  })
  @IsOptional()
  avatarUrl?: string;
}

export class UpdateOrgDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiPropertyOptional({
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
  contactEmail: string;

  @ApiPropertyOptional({
    default: 'xxxxxx',
  })
  @IsOptional()
  description: string;

  @ApiPropertyOptional({
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

export class InviteMemberDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty({
    enum: [],
    // enum: InvitationType,
    description: 'Invitation type team, project',
  })
  @IsNumber()
  type: any;
}
