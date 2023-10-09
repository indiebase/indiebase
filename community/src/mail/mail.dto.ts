import { ApiProperty } from '@nestjs/swagger';
// import { IsNotEmpty } from 'class-validator';

export class GetCaptchaDto {
  @ApiProperty({
    default: 'dev@indiebase.com',
  })
  // @IsNotEmpty()
  username: string;
}
