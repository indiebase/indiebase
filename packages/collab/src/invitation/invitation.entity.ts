import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum InvitationStatus {
  pending,
  rejected,
  fulfilled,
}

export enum InvitationType {
  team,
  prj,
}

@Entity('invitation')
export class InvitationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { comment: 'Invite target ID' })
  targetId: number;

  @Column('int', { comment: 'Host ID' })
  hostId: number;

  @Column('varchar', { name: 'host_username' })
  hostUsername: string;

  @Column('varchar', { name: 'target_username' })
  targetUsername: string;

  @Column('varchar', { name: 'host_nickname', nullable: true })
  hostNickname?: string;

  @Column('varchar', { name: 'target_nickname', nullable: true })
  targetNickname?: string;

  @Column('int', {
    name: 'status',
    comment: 'Invitation status',
  })
  status?: InvitationStatus;

  @Column('int', {
    name: 'status',
    comment: 'Team status',
  })
  type: InvitationType;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'create_time',
  })
  createTime?: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'update_time',
  })
  updateTime?: Date;
}
