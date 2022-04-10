import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
  ManyToOne,
  Generated,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

enum AccountStatus {
  forbidden,
  active,
}

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('varchar', { unique: true })
  account: string;

  @Column('varchar')
  username: string;

  @Column('varchar', { select: false })
  password: string;

  @Column('boolean', {
    name: 'account_status',
    comment: '账户状态',
    default: 1,
  })
  accountStatus?: AccountStatus;

  // 邀请的用户
  @OneToMany(() => UserEntity, (g) => g.inviteBy)
  invitations: UserEntity[];

  // 被谁邀请
  @ManyToOne(() => UserEntity, (g) => g.invitations)
  inviteBy: UserEntity;

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
