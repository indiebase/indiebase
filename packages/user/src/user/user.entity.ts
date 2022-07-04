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
import { AccountStatus, SignupType } from './user.enum';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    length: 64,
    comment: 'signup type e.g. github letscollab',
  })
  signupType: SignupType;

  @Column('char', { unique: true, nullable: true, length: 32 })
  githubId?: string;

  @Column('varchar', { nullable: true })
  profileUrl?: string;

  @Column('varchar', { comment: 'Avatar url', nullable: true })
  avatar?: string;

  @Column('varchar', { comment: 'company', nullable: true })
  company?: string;

  @Column('varchar', { unique: true })
  username: string;

  @Column('varchar', { unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  bio?: string;

  @Column('varchar', { comment: 'Optional name' })
  nickname?: string;

  @Column('varchar', { select: false, nullable: true })
  password?: string;

  @Column('int', {
    comment: 'Account status',
    default: 1,
  })
  status?: AccountStatus;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'create_time',
    comment: 'Create time',
  })
  createTime: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'update_time',
    comment: 'Update time',
  })
  updateTime: Date;

  @ManyToMany(() => TeamEntity, (t) => t.members)
  teams?: TeamEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
}
