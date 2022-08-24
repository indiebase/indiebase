import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '@letscollab/user';

export enum PrjStatus {
  /* working in progress */
  wip = 'wip',
  /*  project dead */
  archive = 'archive',
  /* project is operating */
  operating = 'operating',
  /* project has closed */
  closed = 'closed',
}

@Entity('project')
export class PrjEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('varchar', { unique: true, comment: 'Project name' })
  name: string;

  @ApiProperty()
  @Column('varchar', { name: 'contact_email' })
  contactEmail: string;

  @ApiProperty()
  @Column('varchar', { nullable: true })
  cover?: string;

  @ApiProperty({ description: 'Project domain' })
  @Column('varchar', { unique: true, comment: 'Project domain' })
  packageName: string;

  @ApiProperty({
    enum: PrjStatus,
  })
  @Column('simple-enum', {
    name: 'status',
    comment: 'Project Status',
    enum: PrjStatus,
    nullable: true,
  })
  status?: PrjStatus;

  @ApiProperty()
  @Column({ nullable: true })
  description?: string;

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

  // @ManyToMany(() => UserEntity, (u) => u.teams, { cascade: true })
  // @JoinTable()
  // members?: UserEntity[];

  @ApiProperty({
    default: 'Github repo url',
  })
  @Column({
    name: 'github_repo_url',
  })
  githubRepoUrl?: string;
}
