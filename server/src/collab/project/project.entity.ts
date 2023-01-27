import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ProjectStatus } from '@letscollab-nest/trait';
import { UserEntity } from 'src/user/user.entity';
import { OrgEntity } from '../org/org.entity';

@Entity('project')
export class ProjectEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('varchar', { unique: true, comment: 'Project name' })
  name: string;

  @ApiProperty()
  @Column('varchar', {
    name: 'github_repo_name',
    unique: true,
    comment: 'Github repository name',
  })
  githubRepoName: string;

  @ApiProperty()
  @Column('varchar', {
    name: 'github_repo_url',
    unique: true,
    comment: 'Github repository url',
  })
  githubRepoUrl: string;

  @ApiProperty()
  @Column('varchar', { name: 'contact_email' })
  contactEmail: string;

  @ApiProperty()
  @Column('varchar', { name: 'cover_url', nullable: true })
  coverUrl?: string;

  @ApiProperty({
    description:
      'The project will use reverse words that project name + organization domain as package name. e.g com.deskbtm.letscollab.xxxx.',
  })
  @Column('varchar', {
    name: 'package_name',
    unique: true,
    comment:
      'The project will use reverse words that project name + organization domain as package name. e.g com.deskbtm.letscollab.xxxx.',
  })
  packageName: string;

  @ApiProperty({
    enum: ProjectStatus,
  })
  @Column('simple-enum', {
    name: 'status',
    comment: 'Project Status',
    enum: ProjectStatus,
    nullable: true,
  })
  status?: ProjectStatus;

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
  createTime?: Date;

  @ApiProperty()
  @UpdateDateColumn({
    type: 'timestamp',
    name: 'update_time',
  })
  updateTime?: Date;

  @ApiProperty()
  @ManyToMany(() => UserEntity, (u) => u.projects, { cascade: true })
  @JoinTable({
    joinColumns: [{ name: 'project_id' }],
    inverseJoinColumns: [{ name: 'user_id' }],
  })
  members?: UserEntity[];

  @ApiProperty()
  @ManyToOne(() => OrgEntity, (o) => o.projects)
  organization: OrgEntity;
}
