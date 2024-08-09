import {
  IsEntityExisted,
  SpecificProjectType,
  TmplTables,
} from '@indiebase/server-shared';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

// Upload multiple files
export class FilesUploadDTO {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  files!: any[];

  @ApiPropertyOptional({
    description: 'Temp storage, object will delete automatically when expire.',
  })
  @IsOptional()
  @IsBoolean()
  temp?: boolean;
}

export class CreateBucketDTO {
  @IsEntityExisted({
    type: SpecificProjectType.fromHeader,
    table: TmplTables.buckets,
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

  @ApiProperty({ type: 'string', description: 'Original filename' })
  originalname?: string;
}
