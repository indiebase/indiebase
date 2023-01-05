import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  registerDecorator,
  Validate,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import {
  // IsEntityExisted,
  PaginationReqDto,
  PaginationResSchemaDto,
} from '@letscollab-nest/helper';
import { AccessAction } from '@letscollab-nest/accesscontrol';
import {
  RoleResource,
  RoleStatus,
  CreateRoleBody,
  UserResource,
} from '@letscollab-nest/trait';
import { LiteralObject, Injectable } from '@nestjs/common';
import { EntityTarget, DataSource } from 'typeorm';
import { RoleEntity } from './role.entity';

@ValidatorConstraint({ async: true })
@Injectable()
class IsEntityExistedConstraint implements ValidatorConstraintInterface {
  constructor(private readonly dataSource: DataSource) {}

  validate(name: any, _args: ValidationArguments) {
    console.log(this.dataSource);
    return true;
    // return this.dataSource
    //   .getRepository(RoleEntity)
    //   .findOne({
    //     where: {
    //       name,
    //     },
    //   })
    //   .then((e) => {
    //     return !e;
    //   });
  }
}
/**
 *  Check if the target entity is existed.
 * @param {string} key The database field.
 * @param {ValidationOptions} validationOptions
 */
export function IsEntityExisted(
  entity: EntityTarget<LiteralObject>,
  key: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsEntityExisted',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsEntityExistedConstraint,
    });
  };
}

export class CreateRoleDto {
  @ApiProperty({
    default: 'owner',
  })
  @IsNotEmpty({
    message: `Role name can't be empty`,
  })
  // @Validate(IsEntityExistedConstraint, { message: '1' })
  @IsEntityExisted(RoleEntity, 'name', { message: 'Role name has existed' })
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
  possession?: CreateRoleBody['possession'];
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
    description: 'Role status',
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

export class AttachRole2UserDto {
  @ApiProperty({
    default: 'Nawbc',
  })
  @IsString()
  username: string;

  @ApiProperty({
    default: 'owner',
  })
  @IsString()
  roleName: string;

  @ApiProperty({
    default: 'letscollab.letscollab.deskbtm.com',
  })
  @IsString()
  domain: string;
}

export class RoleDto extends UpdateRoleDto {}

export class QueryRolesResDto extends PaginationResSchemaDto {
  @ApiProperty({
    type: () => [RoleDto],
  })
  d: RoleDto[];
}
