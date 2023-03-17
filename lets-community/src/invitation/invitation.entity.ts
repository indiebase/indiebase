import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { InvitationSource, InvitationStatus } from '@letscollab/trait';

@Entity('invitation')
export class InvitationEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('int', { name: 'invitees_id', comment: 'Invitees ID' })
  inviteesId: number;

  @ApiProperty()
  @Column('varchar', { name: 'invitees_username' })
  inviteesUsername: string;

  @ApiProperty({
    description: 'Invitees email',
  })
  @Column('varchar', { name: 'invitees_email' })
  inviteesEmail: string;

  @ApiProperty()
  @Column('int', { name: 'inviter_id', comment: 'Inviter ID' })
  inviterId: number;

  @ApiProperty()
  @Column('int', { name: 'inviter_username', comment: 'inviter username' })
  inviterUsername: number;

  @ApiProperty({
    enum: InvitationStatus,
    description: 'Invitation status',
  })
  @Column('simple-enum', {
    comment: 'Invitation status',
    enum: InvitationStatus,
    default: InvitationStatus.pending,
  })
  status?: InvitationStatus;

  @ApiProperty({
    enum: InvitationSource,
    description: 'Invitation source',
  })
  @Column('simple-enum', {
    comment: 'Invitation type',
    enum: InvitationSource,
  })
  type: InvitationSource;

  @ApiProperty()
  @CreateDateColumn({
    type: 'timestamp',
    name: 'create_time',
  })
  createTime: Date;

  @ApiProperty()
  @UpdateDateColumn({
    type: 'timestamp',
    name: 'update_time',
  })
  updateTime: Date;
}
