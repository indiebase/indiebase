import { ApiProperty } from '@nestjs/swagger';
// import { IsNotEmpty } from 'class-validator';

export class GetCaptchaDTO {
  @ApiProperty({
    default: 'dev@indiebase.com',
  })
  // @IsNotEmpty()
  username: string;
}
