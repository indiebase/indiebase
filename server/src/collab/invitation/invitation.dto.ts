import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class InviteMemberDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty({
    enum: [],
    // enum: InvitationType,
    description: 'Invitation type team, project',
  })
  @IsNumber()
  type: any;
}
