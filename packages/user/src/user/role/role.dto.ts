import { RoleStatus } from './role.entity';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  PaginationReqDto,
  PaginationResSchemaDto,
  RoleResource,
  UserResource,
} from '@letscollab/helper';
import { AccessAction } from '@letscollab/nest-acl';

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

  @ApiProperty({
    description: "The same as project's packageName",
    default: 'letscollab.letscollab.deskbtm.com',
  })
  @IsString()
  domain: string;

  @ApiPropertyOptional({
    description: 'Possession',
    type: [],
    default: [
      {
        resource: UserResource.list,
        action: [
          AccessAction.createAny,
          AccessAction.readAny,
          AccessAction.updateAny,
          AccessAction.deleteAny,
        ],
      },
      {
        resource: RoleResource.list,
        action: [AccessAction.createAny],
      },
    ],
  })
  @IsArray()
  @IsOptional()
  possession?: { resource: string; action: AccessAction[] }[];
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
