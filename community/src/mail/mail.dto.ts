import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SendCaptchaDTO {
  @ApiProperty({
    default: 'dev@indiebase.com',
  })
  @IsString()
  email!: string;
}
