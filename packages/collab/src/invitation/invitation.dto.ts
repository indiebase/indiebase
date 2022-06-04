import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { InvitationType } from './invitation.entity';

export class InviteMemberDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty({
    enum: InvitationType,
    description: 'Invitation type team, project',
  })
  @IsNumber()
  type: InvitationType;
}
