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
import { TeamEntity } from '@letscollab/collab';
import { AccountStatus } from './user.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user')
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('char', { unique: true, nullable: true, length: 32 })
  githubId?: string;

  @ApiProperty()
  @Column('varchar', { nullable: true })
  profileUrl?: string;

  @ApiProperty()
  @Column('varchar', { comment: 'Avatar url', nullable: true })
  avatar?: string;

  @ApiProperty()
  @Column('varchar', { comment: 'company', nullable: true })
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
    enum: AccountStatus,
    description: 'Account status',
  })
  @Column('simple-enum', {
    enum: AccountStatus,
    comment: 'Account status',
    default: AccountStatus.active,
  })
  status?: AccountStatus;

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

  @ManyToMany(() => TeamEntity, (t) => t.members)
  teams?: TeamEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  private async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
}
