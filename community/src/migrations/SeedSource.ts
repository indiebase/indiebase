import { Knex } from 'knex';
import { v001_mgr_seed } from './v1/v001.mgr_seed';

export class SeedSource implements Knex.SeedSource<any> {
  #schema: string;

  constructor(schema?: string) {
    this.#schema = schema ?? 'mgr';
  }

  getSeeds(_config: Knex.SeederConfig<any>): Promise<any[]> {
    return Promise.resolve(['v001_mgr']);
  }

  getSeed(seed: any): Promise<Knex.Seed> {
    switch (seed) {
      case 'v001_mgr':
        return v001_mgr_seed(this.#schema);
    }
  }
}
