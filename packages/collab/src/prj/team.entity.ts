import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { UserEntity } from '@letscollab/user';

export enum TeamStatus {
  active,
  inactive,
}

@Entity('team')
export class TeamEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { unique: true, comment: 'Team name' })
  name: string;

  @Column('varchar', { name: 'contact_name', comment: '昵称' })
  contactEmail: string;

  @Column('int', {
    name: 'status',
    comment: '团队状态',
    default: TeamStatus.active,
  })
  status?: TeamStatus;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'create_time',
    comment: '创建时间',
  })
  createTime?: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'update_time',
    comment: '更新时间',
  })
  updateTime?: Date;

  @ManyToMany(() => UserEntity, (u) => u.teams, { cascade: true })
  members?: UserEntity[];

  // @OneToOne(() => DeviceEntity, (device) => device.user, { cascade: true })
  // @JoinColumn({ name: 'device_id' })
  // device?: DeviceEntity;

  // @OneToMany(() => PaymentEntity, (payment) => payment.user, { cascade: true })
  // payments?: PaymentEntity[];
}
