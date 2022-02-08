import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateAnncDto {
  @ApiProperty({
    description: '通知标题',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: '通知副标题',
  })
  @IsString()
  @IsOptional()
  subtitle?: string;

  @ApiProperty({
    description: '通知内容',
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({
    description: '置顶顺序 没有则正常顺序排',
  })
  @IsString()
  @IsOptional()
  top?: number;
}

export class DeleteAnncDto {
  @ApiProperty({
    description: '通知ID',
  })
  @IsNumber()
  id: number;
}

export class UpdateAnncDto extends CreateAnncDto {
  @ApiProperty({
    description: 'banner ID',
  })
  @IsNumber()
  id: number;
}
