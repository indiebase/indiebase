import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum OrgStatus {
  active = 'active',
  inactive = 'inactive',
}

@Entity('org')
export class OrgEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('varchar', { unique: true, comment: 'Organization name' })
  name: string;

  @ApiProperty()
  @Column('varchar', { name: 'contact_email' })
  contactEmail: string;

  @ApiProperty({
    enum: OrgStatus,
  })
  @Column('simple-enum', {
    name: 'status',
    comment: 'Organization Status',
    enum: OrgStatus,
    default: OrgStatus.active,
  })
  status?: OrgStatus;

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

  // @ManyToMany(() => UserEntity, (u) => u.teams, { cascade: true })
  // @JoinTable()
  // members?: UserEntity[];
}
