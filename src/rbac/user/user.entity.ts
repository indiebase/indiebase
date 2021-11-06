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
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { EntityModel } from '@midwayjs/orm';
// import { DeviceEntity } from './device.entity';
// import { PaymentEntity } from 'src/payment/entity/payment.entity';
// import { GoodsEntity } from 'src/goods/entity/goods.entity';

@EntityModel('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { unique: true })
  username: string;

  @Column('varchar', { select: false })
  password: string;

  // @Column('int', { default: 1 })
  // disable?: boolean;

  // @Column('boolean', { default: false })
  // followedBilibili?: boolean;

  // @Column('varchar', { default: null })
  // bilibiliUid?: string;

  // // 无中间实体表的配置
  // @ManyToMany((type) => RoleEntity, (role) => role.users, { cascade: true })
  // @JoinTable({
  //   name: 'user_role',
  //   joinColumns: [{ name: 'user_id' }],
  //   inverseJoinColumns: [{ name: 'role_id' }],
  // })
  // roles?: RoleEntity[];

  // //TODO
  // @OneToMany(() => UserEntity, g => g.inviteBy)
  // invitations: UserEntity[];

  // //TODO
  // @ManyToOne(() => UserEntity, g => g.invitations)
  // inviteBy: UserEntity;

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

  // @OneToOne(() => DeviceEntity, device => device.user, { cascade: true })
  // @JoinColumn({ name: 'device_id' })
  // device?: DeviceEntity;

  // @OneToMany(() => GoodsEntity, goods => goods.user, { cascade: true })
  // goods?: GoodsEntity[];

  // @OneToMany(() => PaymentEntity, payment => payment.user, { cascade: true })
  // payments?: PaymentEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }
}
