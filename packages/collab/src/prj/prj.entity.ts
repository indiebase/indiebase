import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum PrjStatus {
  /* working in progress */
  wip = 'wip',
  /*  project dead, */
  archive = 'archive',
  /* project is opening, */
  open = 'open',
  /* project has closed */
  closed = 'archive',
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
