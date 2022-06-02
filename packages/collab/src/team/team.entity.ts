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

export enum TeamStatus {
  active,
  inactive,
}

@Entity('team')
export class TeamEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('varchar', { unique: true, comment: 'Team name' })
  name: string;

  @ApiProperty()
  @Column('varchar', { name: 'contact_email' })
  contactEmail: string;

  @ApiProperty({
    enum: TeamStatus,
  })
  @Column('int', {
    name: 'status',
    comment: 'Team Status',
    default: TeamStatus.active,
    nullable: true,
  })
  status?: TeamStatus;

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
}
