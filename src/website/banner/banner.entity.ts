import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('banner')
export class BannerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  title: string;

  @Column('varchar', { nullable: true })
  subtitle: string;

  @Column('varchar', { nullable: true, name: 'img_uri' })
  imgUri: string;

  /**
   * 目前没使用
   * 2021-9-26
   */
  @Column('varchar', { nullable: true })
  desc: string;

  @Column('boolean', { default: true })
  disable: boolean;

  /**
   * 跳转链接
   */
  @Column('varchar', { nullable: true })
  href: string;

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
