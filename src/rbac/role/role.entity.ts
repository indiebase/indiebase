import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { PossessionEntity } from '../possession/possession.entity';

@Entity('role')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column('varchar', { name: 'role_name', unique: true })
  name: string;

  /**
   * 0 运行中 1禁用中
   */
  @Column('int', { default: 0 })
  disable?: number;

  @OneToMany(() => PossessionEntity, (p) => p.role, { cascade: true })
  possessions?: PossessionEntity[];

  @ManyToOne(() => UserEntity, (p) => p.roles)
  user?: UserEntity;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'create_time',
  })
  createTime?: Date;

  /**
   * @description 创建者
   */
  @ManyToOne(() => UserEntity, (p) => p.roles)
  createBy: UserEntity;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'update_time',
  })
  updateTime?: Date;
}
