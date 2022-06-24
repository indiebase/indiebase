import { RoleStatus } from './role.entity';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    default: 'member',
  })
  @IsNotEmpty({
    message: `Role name can't be empty`,
  })
  name: string;

  @ApiPropertyOptional({
    description: 'Role description',
    default: 'member',
  })
  @IsOptional()
  description?: string;
}
export class UpdateRoleDto {
  @IsNumber()
  id: number;

  @ApiPropertyOptional({
    default: 'admin',
  })
  name?: string;

  @ApiPropertyOptional({
    default: 'member',
  })
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Role  status',
    enum: RoleStatus,
    default: RoleStatus.active,
  })
  @IsOptional()
  status?: RoleStatus;
}
export class DeleteRoleDto {
  @IsNumber()
  id: number;
}
