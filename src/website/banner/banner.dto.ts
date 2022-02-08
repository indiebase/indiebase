import { PaginationDto } from './../../common/dto/pagination.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsBooleanString,
} from 'class-validator';

export class CreateBannerDto {
  @ApiProperty({
    description: 'banner标题',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'banner 副标题',
  })
  @IsString()
  @IsOptional()
  subtitle?: string;

  @ApiProperty({
    description: 'banner 图标uri',
  })
  @IsString()
  @IsOptional()
  imgUri?: string;

  @ApiProperty({
    description: 'banner 描述',
  })
  @IsString()
  @IsOptional()
  desc?: string;

  @ApiProperty({
    description: 'banner 跳转链接',
  })
  @IsString()
  @IsOptional()
  href?: string;

  @ApiProperty({
    description: '禁用',
  })
  @IsBoolean()
  @IsOptional()
  disable?: boolean;
}

export class DeleteBannerDto {
  @ApiProperty({
    description: 'banner ID',
  })
  @IsNumber()
  id: number;
}

export class UpdateBannerDto extends CreateBannerDto {
  @ApiProperty({
    description: 'banner ID',
  })
  @IsNumber()
  id: number;
}

export class QueryBannerDto extends PaginationDto {
  @ApiProperty({
    description: 'banner ID',
  })
  @IsBooleanString()
  @IsOptional()
  disable?: string;
}
