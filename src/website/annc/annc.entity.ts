import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('announcement')
export class AnncEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  title: string;

  @Column('varchar', { nullable: true })
  subtitle?: string;

  @Column('text', { nullable: false })
  content: string;

  /**
   * 通知发布者
   */
  // @Column('varchar', { nullable: true, name: 'create_by' })
  createBy: string;

  @Column('int', { default: 1 })
  top: number;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'create_time',
  })
  createTime?: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'update_time',
  })
  updateTime?: Date;
}
