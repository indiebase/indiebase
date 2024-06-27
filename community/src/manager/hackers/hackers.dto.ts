import { UserDTO } from '../../users/users.dto';
import {
  INDIEBASE_MGR,
  IsEntityExisted,
  OkedResponseSchema,
  PaginatedRequestSchema,
  TmplTables,
} from '@indiebase/server-shared';
import { AccountStatus, Visibility } from '@indiebase/trait';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsHash, IsOptional, IsString, IsUrl } from 'class-validator';

export class SignUpHackersDTO {
  @ApiProperty({
    description: 'Hacker account',
    default: 'dev@indiebase.com',
  })
  @IsEntityExisted({
    schema: INDIEBASE_MGR,
    table: TmplTables.users,
    column: 'email',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    description:
      'Hacker account password, the password needs to be converted to SHA256 for transfer',
    default: '9b1ddbbcf45a850c792465c816bb43423fe9dc6383b6fbc3a16d25be907e3988',
  })
  @IsHash('sha256', {
    message: 'Password needs to be converted to SHA256',
  })
  password!: string;
}

export class UpdateHackersDTO extends SignUpHackersDTO {
  @ApiPropertyOptional({
    default: 'dev@indiebase.com',
  })
  @IsEmail(
    {},
    {
      message: 'Contact email format error',
    },
  )
  @IsOptional()
  contactEmail?: string;

  @ApiPropertyOptional({
    default: 'xxxxxx',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Project icon url',
    default: 'https://api-dev.indiebase.deskbtm.com/favicon.ico',
  })
  @IsOptional()
  @IsUrl({}, { message: 'Avatar url format error' })
  avatarUrl?: string;
}

export class ListHackersRequestDTO extends PaginatedRequestSchema {}

export class CreateHackersResDTO extends OkedResponseSchema {}

export class HackerDTO extends UserDTO {
  @ApiPropertyOptional({
    description: 'Biography',
  })
  bio?: string;

  @ApiPropertyOptional({
    description: 'User visibility',
    enum: Visibility,
  })
  visibility?: Visibility;

  @ApiPropertyOptional({
    description: 'User homepage',
  })
  homepage?: string;

  @ApiPropertyOptional({
    description: 'Github username not nickname',
  })
  githubUsername?: string;
}
