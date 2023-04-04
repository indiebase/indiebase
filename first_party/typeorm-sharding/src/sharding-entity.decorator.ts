import { Entity, EntityOptions } from 'typeorm';

export function ShardingEntity<ENTITY, KEY_TYPE = number>(
  // options: ShardingEntityOptions<ENTITY, KEY_TYPE>,
) {
  return (target: Function) => {
    // Entity(entityOptions)(target);
  };
}
