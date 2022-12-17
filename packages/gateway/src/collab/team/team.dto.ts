import {
  PaginationReqDto,
  PaginationResSchemaDto,
} from '@letscollab-nest/helper';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateTeamDto {
  @ApiPropertyOptional({
    description: 'Team name',
    default: 'letscollab',
  })
  @IsString()
  name: string;

  @ApiProperty({
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

export class UpdateTeamDto {
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

export class DeleteTeamDto {
  @ApiProperty()
  @IsNumber()
  id: number;
}

export class QueryTeamDto extends PaginationReqDto {
  @ApiPropertyOptional({
    nullable: true,
  })
  @IsOptional()
  name?: string;
}

export class QueryTeamResDto extends PaginationResSchemaDto {
  @ApiPropertyOptional({
    // type: () => TeamEntity,
  })
  d?: any;
}

// export class QueryTeamResDto extends PaginationReqDto {
//   @ApiPropertyOptional({
//     nullable: true,
//   })
//   @IsOptional()
//   name?: string;
// }