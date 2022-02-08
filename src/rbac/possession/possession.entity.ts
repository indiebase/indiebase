import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { RoleEntity } from '../role/role.entity';

@Entity('possession')
export class PossessionEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column('varchar', {
    unique: true,
    nullable: false,
  })
  name: string;

  /**
   * 注释
   */
  @Column('varchar', { nullable: true })
  comment?: string;

  /**
   * 接口路由
   */
  @Column('varchar', { nullable: true, unique: true })
  path?: string;

  /**
   * 父级ID 默认顶层节点的pid为0
   */
  @Column('int', { default: 0 })
  pid?: number;

  /**
   *
   * 菜单类型 1菜单 2节点
   */
  @Column('int', { nullable: false })
  type?: number;

  /**
   * 是否启用
   */
  @Column('boolean', { default: false })
  disable?: boolean;

  /**
   * 排序权重
   * 2021-9-26 目前不使用
   */
  @Column('int', { nullable: true })
  gravity: number;

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

  @ManyToOne(() => RoleEntity, (p) => p.possessions)
  role?: RoleEntity;
}
