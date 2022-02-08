import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleEntity } from '../role/role.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * jaccount 账户 唯一
   */
  @Column('varchar', { unique: true })
  account: string;

  /**
   * jaccount 用户名
   */
  @Column('varchar', { unique: false, nullable: true })
  username: string;

  /**
   * 用户是否禁用
   */
  @Column('int', { default: 0 })
  disable: number;

  @OneToMany(() => RoleEntity, (p) => p.user, { cascade: true })
  roles?: RoleEntity[];

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
