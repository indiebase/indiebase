import { PaginationDto } from '@/common/dto/pagination.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
  id?: number;

  @ApiProperty({
    description: '角色名',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: '',
  })
  @IsOptional()
  @IsNumber()
  disable: number;

  // @ApiProperty({
  //   description:
  //     '角色拥有资源 abilities中的can 需要为["update", "delete", "create", "query"] 之一',
  // })
  // @IsPossessions({
  //   message: '角色拥有资源不合法，请联系站长',
  // })
  // possessions: number[];
}

export class QueryRolesDto extends PaginationDto {
  @IsString()
  @IsOptional()
  name?: string;
}
export class DeleteRoleDto {
  @IsNumber()
  id: number;
}
