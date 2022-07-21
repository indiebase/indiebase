import { Entity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('policy')
export class PolicyEntity {
  @ApiProperty()
  @Column({
    comment: 'Policy name',
  })
  name: string;

  @ApiProperty()
  @Column({
    comment: 'Content resource url',
  })
  url: string;

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
}
