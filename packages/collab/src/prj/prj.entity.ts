import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserEntity } from '@letscollab/user';
import { ApiProperty } from '@nestjs/swagger';

export enum PrjStatus {
  wip = 'wip', // working in progress
  archive = 'archive', //
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
  @Column('varchar', {
    name: 'status',
    length: 32,
    comment: 'Project Status',
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

  @ManyToMany(() => UserEntity, (u) => u.teams, { cascade: true })
  @JoinTable()
  members?: UserEntity[];

  @ApiProperty({
    default: 'Github repository url',
  })
  @Column()
  githubRepositoryUrl?: string;
}
