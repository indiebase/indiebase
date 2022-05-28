import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

enum Status {
  inactive,
  active,
}

@Entity('role')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('varchar', { unique: true })
  name: string;

  @Column('int', {
    name: 'account_status',
    comment: '角色状态',
    default: 1,
  })
  status?: Status;

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
}
