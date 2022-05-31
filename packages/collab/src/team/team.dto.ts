import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateTeamDto {
  @ApiPropertyOptional({
    description: '团队名称',
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

export class DeleteTeamDto {
  @ApiProperty()
  @IsNumber()
  id: number;
}

export class InviteMemberDto {
  @ApiProperty()
  @IsNumber()
  id: number;
}
