import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    default: 'admin',
  })
  @IsNotEmpty({
    message: '角色命不可为空',
  })
  name?: string;

  @ApiPropertyOptional({
    description: '角色描述',
    default: '管理员',
  })
  @IsOptional()
  description?: string;
}
