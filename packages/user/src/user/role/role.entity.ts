import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum RoleStatus {
  inactive = 'inactive',
  active = 'active',
}

@Entity('role')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  description: string;

  @Column({ type: 'varchar' })
  domain: string;

  @Column('simple-enum', {
    enum: RoleStatus,
    comment: 'Role status',
    default: RoleStatus.active,
  })
  status?: RoleStatus;

  @Column('simple-array', {
    comment: 'Possession',
    nullable: true,
  })
  possession?: string[];

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
