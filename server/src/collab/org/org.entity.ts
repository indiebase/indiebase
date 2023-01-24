import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { OrgStatus } from '@letscollab-nest/trait';
import { UserEntity } from '../../user/user.entity';
import { ProjectEntity } from '../project/project.entity';

@Entity('organization')
export class OrgEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('varchar', { unique: true, comment: 'Organization name' })
  name: string;

  @ApiProperty()
  @Column('varchar', {
    name: 'github_org_name',
    unique: true,
    comment: 'Github Organization name',
  })
  githubOrgName: string;

  @ApiProperty()
  @Column('varchar', { unique: true, comment: 'Organization domain' })
  domain: string;

  @ApiProperty()
  @Column('varchar', { name: 'contact_email' })
  contactEmail: string;

  @ApiProperty({ description: 'Organization avatar image url' })
  @Column('varchar', { name: 'avatar_url' })
  avatarUrl: string;

  @ApiProperty({
    enum: OrgStatus,
    description: 'Organization status',
  })
  @Column('simple-enum', {
    name: 'status',
    comment: 'Organization Status',
    enum: OrgStatus,
    default: OrgStatus.active,
  })
  status: OrgStatus;

  @ApiProperty()
  @Column({ nullable: true })
  description?: string;

  @ApiProperty()
  @Column({ nullable: true })
  homepage?: string;

  @ApiProperty()
  @CreateDateColumn({
    type: 'timestamp',
    name: 'create_time',
  })
  createTime: Date;

  @ApiProperty()
  @UpdateDateColumn({
    type: 'timestamp',
    name: 'update_time',
  })
  updateTime: Date;

  @ApiProperty({ description: 'Creator id' })
  @Column('int', { name: 'creator_id', comment: 'User id' })
  creatorId: number;

  /**
   * The same as creator id at first time.
   */
  @ApiProperty({
    description: 'Organization owner id, the same as creator id at first time.',
  })
  @Column('int', { name: 'owner_id', comment: 'Owner id' })
  ownerId: number;

  @ManyToMany(() => UserEntity, (u) => u.organizations, { cascade: true })
  @JoinTable({
    joinColumns: [{ name: 'organization_id' }],
    inverseJoinColumns: [{ name: 'user_id' }],
  })
  members: UserEntity[];

  @OneToMany(() => ProjectEntity, (p) => p.organization)
  projects: ProjectEntity[];
}
