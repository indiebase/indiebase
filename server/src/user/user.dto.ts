import { BaseResSchemaDto, PaginationReqDto } from '@letscollab-nest/helper';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, MinLength } from 'class-validator';
import { OrgEntity } from '../collab/org/org.entity';
import { UserEntity } from './user.entity';

export class UpdateUserProfileDto {
  @ApiProperty({
    default: 'deskbtm@outlook.com',
  })
  @IsOptional()
  @IsEmail(
    {},
    {
      message: 'The following email incorrect',
    },
  )
  email: string;

  @ApiProperty({
    default: 'letscollab',
  })
  @IsOptional()
  @MinLength(8, {
    message: 'Password length cannot less than 8',
  })
  password: string;
}

export class QueryUserDto extends PaginationReqDto {
  @ApiPropertyOptional()
  username?: string;
}

export class QueryPossessionDto {
  @ApiProperty({ default: 'Nawbc', required: true })
  username: string;
}

export class UserResponseDto extends BaseResSchemaDto {
  @ApiPropertyOptional({
    type: () => UserEntity,
  })
  d?: UserEntity;
}

export class OwnOrgsResDto extends BaseResSchemaDto {
  @ApiProperty({
    type: [OrgEntity],
  })
  d?: any;
}
