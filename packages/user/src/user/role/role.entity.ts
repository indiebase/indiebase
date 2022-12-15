import { RoleStatus } from '@letscollab-nest/trait';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('role')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { unique: true })
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
