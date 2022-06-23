import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    default: 'admin',
  })
  @IsNotEmpty({
    message: `Role name can't be empty`,
  })
  name?: string;

  @ApiPropertyOptional({
    description: '角色描述',
    default: '管理员',
  })
  @IsOptional()
  description?: string;
}
