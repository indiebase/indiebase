import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { BasicResSchemaDto } from './schema.dto';

export class JwtResultDto {
  @ApiProperty()
  token: string;
}

export class JwtSignDto extends BasicResSchemaDto {
  @ApiPropertyOptional({
    type: () => JwtResultDto,
  })
  d?: JwtResultDto;
}

export class VerifyDto {
  @IsString()
  token: string;

  @IsOptional()
  payload: Record<string, any>;
}
