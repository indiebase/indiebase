import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';
import { AccountStatus } from '@letscollab/trait';
import { ProjectEntity } from '../project/project.entity';
import { OrgEntity } from '../org/org.entity';

@Entity('user')
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('varchar', { comment: 'Avatar url', nullable: true })
  avatar?: string;

  @ApiProperty()
  @Column('char', { comment: 'company', nullable: true, length: 64 })
  company?: string;

  @ApiProperty()
  @Column('varchar', { unique: true })
  username: string;

  @ApiProperty()
  @Column('varchar', { unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  bio?: string;

  @ApiProperty({
    description: 'The default value is same as username',
  })
  @Column('varchar', { comment: 'Optional name', nullable: true })
  nickname?: string;

  @Column('varchar', { select: false, nullable: true })
  password?: string;

  @ApiProperty({
    description: '2fa enabled',
  })
  @Column('bool', {
    name: 'enabled_2fa',
    default: false,
  })
  enabled2FA: boolean;

  @Column('varchar', {
    name: 'opt_secret',
    nullable: true,
  })
  optSecret?: string;

  @ApiProperty({
    description: '2fa recovery code',
  })
  @Column('simple-array', {
    name: 'opt_recovery_code',
    nullable: true,
  })
  optRecoveryCode?: string[];

  @ApiProperty({
    enum: AccountStatus,
    description: 'Account status',
  })
  @Column('simple-enum', {
    name: 'account_status',
    enum: AccountStatus,
    comment: 'Account status',
    default: AccountStatus.active,
  })
  accountStatus?: AccountStatus;

  @ApiProperty({
    description: 'User status',
  })
  @Column('varchar', {
    name: 'status',
    comment: 'User status',
    nullable: true,
  })
  status?: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'create_time',
    comment: 'Create time',
  })
  @ApiProperty()
  createTime: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'update_time',
    comment: 'Update time',
  })
  @ApiProperty()
  updateTime: Date;

  @ManyToMany(() => OrgEntity, (t) => t.members)
  organizations?: OrgEntity[];

  @ManyToMany(() => ProjectEntity, (t) => t.members)
  projects?: ProjectEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  private async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
}
