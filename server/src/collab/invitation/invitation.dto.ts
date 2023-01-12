import { IsEmailsConstraint } from '@letscollab-nest/helper';
import { ApiProperty } from '@nestjs/swagger';
import { Validate } from 'class-validator';

export class InviteMembersDto {
  @ApiProperty()
  @Validate(IsEmailsConstraint, {
    message: 'Contain the wrong email.',
  })
  inviteesEmails: string[];
}
