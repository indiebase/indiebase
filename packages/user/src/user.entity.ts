import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import bcrypt from 'bcrypt';
// import { RoleEntity } from '../role/role.entity';

export type UserStatus = 'active' | 'forbid';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   *
   */
  @Column('varchar', { unique: true })
  account: string;

  /**
   * jaccount 用户名
   */
  @Column('varchar', { unique: false, nullable: true })
  username: string;

  @Column('varchar', { select: false })
  password: string;

  /**
   * 用户是否禁用
   */
  @Column('varchar', { default: 0 })
  disable: UserStatus;

  // @OneToMany(() => RoleEntity, (p) => p.user, { cascade: true })
  // roles?: RoleEntity[];

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

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
}
