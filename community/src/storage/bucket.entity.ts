import { Entity, PrimaryColumn, Column } from 'typeorm';

export const createBucketEntity = function (name: string) {
  @Entity({ name })
  class EntityClass {
    static tableName = name;

    @PrimaryColumn()
    name: string;

    @Column()
    value: number;
  }

  return EntityClass;
};
