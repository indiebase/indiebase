import { RoleStatus } from '@letscollab-nest/trait';
import { ApiProperty } from '@nestjs/swagger';
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

  @Column('varchar', { nullable: true })
  description?: string;

  @Column({ type: 'varchar' })
  domain: string;

  @ApiProperty({
    enum: RoleStatus,
    description: 'Role status',
  })
  @Column('simple-enum', {
    enum: RoleStatus,
    comment: 'Role status',
    default: RoleStatus.active,
  })
  status: RoleStatus;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'create_time',
  })
  createTime: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'update_time',
  })
  updateTime: Date;

  possession?: Record<string, string[]>;
}
