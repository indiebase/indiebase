import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class LocalSignInDto {
  @ApiProperty({
    default: 'Nawbc',
  })
  @IsNotEmpty({
    message: "Username shouldn't empty",
  })
  username: string;

  @ApiProperty({
    default: 'letscollab',
  })
  @IsNotEmpty({
    message: "Password shouldn't be empty",
  })
  @MinLength(8, {
    message: 'Password length less than 8',
  })
  @MaxLength(64, {
    message: 'Password length more than 8',
  })
  password: string;
}
