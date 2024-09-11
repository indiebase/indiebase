import { type PrimitiveProject } from '@indiebase/trait/mgr';
import { Knex } from 'knex';

import { INDIEBASE_MGR } from '../constants';
import { KnexKV } from './knex.kv';
import { KnexSchemaEx } from './schema.ex';
import { M, T } from './tables';

export class KnexEx {
  public schema: KnexSchemaEx;
  public kv: KnexKV;

  constructor(private readonly knex: Knex) {
    this.schema = new KnexSchemaEx(knex);
    this.kv = new KnexKV(knex);
  }

  public listSchemas(select = '*') {
    return this.knex.select(select).from('information_schema.schemata');
  }

  public async hasSchema(schema = '*') {
    const schemas = await this.knex
      .select('*')
      .from('information_schema.schemata')
      .where('schema_name', schema);
    return schemas.length > 0;
  }

  public async hasOrg(orgName: string) {
    return this.knex
      .withSchema(INDIEBASE_MGR)
      .select('*')
      .from(M.orgs)
      .where('name', orgName)
      .then((v) => {
        return Array.isArray(v) && v.length > 0;
      });
  }

  public async listProjects(): Promise<PrimitiveProject[]> {
    return this.knex.withSchema(INDIEBASE_MGR).select('*').from(M.projects);
  }

  /**
   * Get get project by reference_id(header:x-indiebase-reference-id), not the primary key.
   *
   * @param {String} referenceId
   * @returns
   */
  public async getProjectByReferenceId(referenceId: string) {
    return this.knex
      .withSchema(INDIEBASE_MGR)
      .select('*')
      .from(M.projects)
      .where('reference_id', referenceId)
      .first();
  }

  /**
   *
   * @param email
   * @param namespace
   * @param {Object} options
   * @param {Array<string>|boolean} options.exclude - if set to false will include all, default ['password']
   * @returns
   */
  public async getUser(
    cond: { email?: string; id?: number },
    namespace: string = INDIEBASE_MGR,
    options?: { exclude: string[] | boolean },
  ) {
    options = Object.assign(
      {},
      {
        exclude: ['password'],
      },
    );
    const result = await this.knex
      .withSchema(namespace)
      .select('*')
      .from(T.users)
      .where(cond)
      .first();

    if (!options.exclude) {
      return result;
    } else if (Array.isArray(options.exclude)) {
      for (const key in result) {
        if (
          Object.prototype.hasOwnProperty.call(result, key) &&
          options.exclude.includes(key)
        ) {
          Reflect.deleteProperty(options, key);
        }
      }
    }

    return result;
  }
}
