import { OkedResponseSchema } from '@indiebase/server-shared';
import { AccountStatus } from '@indiebase/trait';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SignUpResDTO extends OkedResponseSchema {}

export class UserDTO {
  @ApiProperty({
    description: 'User ID',
  })
  id!: number;

  @ApiProperty({
    description: 'User email',
  })
  email!: string;

  @ApiPropertyOptional({
    description: 'User nickname',
  })
  nickname?: string;

  @ApiPropertyOptional({
    description: 'User avatar url',
  })
  avatarUrl?: string;

  @ApiPropertyOptional({
    description: 'Prefer language',
  })
  language?: string;

  @ApiPropertyOptional({
    description: 'Authentication Type',
  })
  authnType?: string;

  @ApiPropertyOptional({
    description: 'One time password secret',
  })
  enabled2FA?: boolean;

  @ApiPropertyOptional({
    description: 'Location of registration',
  })
  location?: string;

  @ApiPropertyOptional({
    description: 'Account status',
    enum: AccountStatus,
  })
  accountStatus?: AccountStatus;

  @ApiPropertyOptional({
    description: 'Role',
  })
  role?: string;

  @ApiPropertyOptional({
    description: 'User sign in timestamp',
  })
  signInAt?: string;

  @ApiProperty({
    description: 'Organization created timestamp',
  })
  createdAt!: Date;

  @ApiProperty({
    description: 'Organization updated timestamp',
  })
  updatedAt!: Date;
}
