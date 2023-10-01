import { IsEntityExisted } from '@indiebase/server-shared';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateOrgDto {
  @ApiProperty({
    description: 'Org name',
    default: 'indiebase',
  })
  @IsEntityExisted({
    schema: 'mgr',
    table: 'org',
    column: 'name',
  })
  @IsString()
  name: string;

  // @ApiProperty({
  //   description: 'Github organization name',
  //   default: 'indiebase',
  // })
  // @IsEntityExisted(OrgEntity, 'githubOrgName', 'Github Organization')
  // @IsString()
  // githubOrgName: string;

  // @ApiProperty({
  //   description:
  //     'Organization domain is the unique id for indiebase. if the package name is not specific, the project will use reverse words that project name + organization domain as package name. e.g com.deskbtm.indiebase.xxxx.',
  //   default: 'indiebase.deskbtm.com',
  // })
  // @IsEntityExisted(OrgEntity, 'domain', 'Organization domain')
  // @IsString()
  // domain: string;

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
