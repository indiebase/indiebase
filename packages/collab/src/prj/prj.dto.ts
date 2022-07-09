import { PaginationReqDto } from '@letscollab/helper';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsOptional,
  IsNumber,
  Matches,
} from 'class-validator';

export class CreatePrjDto {
  @ApiProperty({
    description: 'Project name',
    default: 'letscollab',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Github repository URI',
    default: 'https://github.com/deskbtm-letscollab/letscollab',
    required: true,
  })
  @Matches(/github\.com/g)
  githubRepoUrl: string;

  @ApiProperty({
    description: 'Public email',
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

export class UpdatePrjDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty({
    description: '团队名称',
    default: 'letscollab',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: '公开邮箱',
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

export class QueryPrjDto extends PaginationReqDto {
  @ApiPropertyOptional({
    nullable: true,
  })
  @IsOptional()
  name?: string;
}

export class DeletePrjDto {
  @ApiProperty()
  @IsNumber()
  id: number;
}
