import { Knex } from 'knex';

/**
 * Create organization template tables
 *
 * @param schema
 * @returns
 */
export const v001_mgr_seed = async function (schema: string) {
  return {
    async seed(knex: Knex): Promise<void> {},
  };
};
