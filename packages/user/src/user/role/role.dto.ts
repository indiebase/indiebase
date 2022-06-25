import { RoleStatus } from './role.entity';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { PaginationReqDto, PaginationResSchemaDto } from '@letscollab/helper';

export class CreateRoleDto {
  @ApiProperty({
    default: 'owner',
  })
  @IsNotEmpty({
    message: `Role name can't be empty`,
  })
  name: string;

  @ApiPropertyOptional({
    description: 'Role description',
    default: 'owner',
  })
  @IsOptional()
  description?: string;
}
export class QueryRoleDto extends PaginationReqDto {
  @ApiPropertyOptional({
    default: 'owner',
  })
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    default: 1,
  })
  @IsOptional()
  id?: number;
}

export class UpdateRoleDto {
  @ApiProperty({
    default: 1,
  })
  @IsNumber()
  id: number;

  @ApiPropertyOptional({
    default: 'owner',
  })
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    default: 'owner',
  })
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Role  status',
    enum: RoleStatus,
    default: RoleStatus.active,
  })
  @IsOptional()
  status?: RoleStatus;
}

export class DeleteRoleDto {
  @ApiProperty({
    default: 1,
  })
  @IsNumber()
  id: number;
}

export class RoleDto extends UpdateRoleDto {}

export class QueryRolesResDto extends PaginationResSchemaDto {
  @ApiProperty({
    type: () => [RoleDto],
  })
  d: RoleDto[];
}
