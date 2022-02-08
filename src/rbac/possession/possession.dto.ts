import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsNumberString,
} from 'class-validator';

export class CreatePossessionDto {
  id?: number;

  @ApiProperty({
    description: '菜单名',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: '路径',
  })
  @IsString({ message: '请添加菜单路径' })
  @IsOptional()
  path: string;

  @ApiProperty({
    description: '父级节点id',
  })
  @IsNumber({}, { message: '请添加父级菜单' })
  pid: number;

  @ApiProperty({
    description: '是否使用',
  })
  @IsOptional()
  @IsBoolean()
  disable?: boolean;

  @ApiProperty({
    description: '菜单排序',
  })
  @IsOptional()
  gravity?: number;

  @ApiProperty({
    description: '菜单注释',
  })
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiProperty({
    description: '菜单类型',
  })
  @IsIn([1, 2], {
    message: '没有该类型菜单',
  })
  type: number;
}

export class QueryPossessionDto {
  @ApiProperty({
    description: '父级节点id',
  })
  @IsString()
  pid: string;
}
export class DeletePossessionDto {
  @ApiProperty({
    description: '节点id 初始请设为0',
    default: 0,
  })
  @IsNumber()
  id: number;
}
export class TreePossessionDto {
  @ApiProperty({
    description: '作为根节点的节点id',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: '是否展示叶子节点',
  })
  @IsOptional()
  @IsNumberString()
  showLeaf: string;
}
