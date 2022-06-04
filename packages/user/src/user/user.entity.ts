import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { TeamEntity } from '@letscollab/collab';
import { AccountStatus } from './user.enum';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { comment: 'Avatar url' })
  avatar: string;

  @Column('varchar', { unique: true })
  username: string;

  @Column('varchar', { comment: 'Nickname' })
  nickname?: string;

  @Column('varchar', { select: false })
  password: string;

  @Column('int', {
    comment: '账户状态',
    default: 1,
  })
  status?: AccountStatus;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'create_time',
    comment: 'Create time',
  })
  createTime?: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'update_time',
    comment: 'Update time',
  })
  updateTime?: Date;

  @ManyToMany(() => TeamEntity, (t) => t.members)
  teams?: TeamEntity[];

  // @OneToMany(() => )
  // teams:

  // @OneToOne(() => DeviceEntity, (device) => device.user, { cascade: true })
  // @JoinColumn({ name: 'device_id' })
  // device?: DeviceEntity;

  // @OneToMany(() => GoodsEntity, (goods) => goods.user, { cascade: true })
  // goods?: GoodsEntity[];

  // @OneToMany(() => PaymentEntity, (payment) => payment.user, { cascade: true })
  // payments?: PaymentEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
}
