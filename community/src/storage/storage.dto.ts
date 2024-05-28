import {
  IsEntityExisted,
  SpecificProjectType,
  TmplMetaTables,
} from '@indiebase/server-shared';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

// Upload multiple files
export class FilesUploadDTO {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  files!: any[];

  @ApiPropertyOptional({
    description: 'Temp storage, object will delete automatically when expire.',
  })
  @IsOptional()
  @IsNumber()
  temp?: number;
}

export class CreateBucketDTO {
  @IsEntityExisted({
    type: SpecificProjectType.fromHeader,
    table: TmplMetaTables.buckets,
    column: 'name',
  })
  @ApiProperty({ type: 'string', default: 'publish' })
  @IsString()
  bucket!: string;

  @ApiPropertyOptional({ type: 'string', default: 'indiebase dev bucket' })
  @IsString()
  @IsOptional()
  description?: string;
}

export class BucketDTO {
  @ApiProperty({ type: 'string', description: 'Bucket name' })
  name?: string;

  @ApiProperty({ type: 'string', description: 'Create timestamp' })
  createdAt?: Date;
}

export class FileDTO {
  @ApiProperty({ type: 'string', description: 'File location' })
  url?: string;

  @ApiProperty({ type: 'string', description: 'Filename' })
  name?: string;

  @ApiProperty({ type: 'string', description: 'Bucket' })
  bucket?: string;
}
