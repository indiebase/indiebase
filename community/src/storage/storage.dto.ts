import { BucketsEntity } from './buckets.entity';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEntityExisted } from '@indiebase/server-shared';

// Upload multiple files
export class FilesUploadDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  files: any[];

  @ApiPropertyOptional({
    description:
      'Save to the /tmp/ directory, object will delete automatically when expire.',
  })
  @IsOptional()
  @IsBoolean()
  temp?: boolean;
}

// Upload single file
export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;

  @ApiPropertyOptional({
    description:
      'Save to the /tmp/ directory, object will delete automatically when expire.',
  })
  @IsOptional()
  @IsBoolean()
  temp?: boolean;
}

export class CreateBucketDto {
  @ApiProperty({ type: 'string', default: 'indiebase-dev' })
  @IsString()
  @IsEntityExisted(BucketsEntity, 'name', 'Bucket name')
  bucket: string;

  @ApiPropertyOptional({ type: 'string', default: 'indiebase dev bucket' })
  @IsString()
  @IsOptional()
  description?: string;
}
