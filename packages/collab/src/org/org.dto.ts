import { PaginationReqDto, PaginationResSchemaDto } from '@letscollab/helper';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsNumber } from 'class-validator';
import { OrgEntity } from './org.entity';

export class CreateOrgDto {
  @ApiPropertyOptional({
    description: 'Org name',
    default: 'deskbtm',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Coding platform org url',
    default: 'deskbtm',
  })
  @IsString()
  codingOrgUrl: string;

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
    type: () => [OrgEntity],
  })
  d?: OrgEntity[];
}

// export class QueryOrgResDto extends PaginationReqDto {
//   @ApiPropertyOptional({
//     nullable: true,
//   })
//   @IsOptional()
//   name?: string;
// }
