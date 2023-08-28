import { ApiProperty } from '@nestjs/swagger';
// import { IsNotEmpty } from 'class-validator';

export class GetCaptchaDto {
  @ApiProperty({
    default: 'deskbtm@outlook.com',
  })
  // @IsNotEmpty()
  username: string;
}
