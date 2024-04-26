import { type PrimitiveProject } from '@indiebase/trait/mgr';
import { Knex } from 'knex';

import { KnexKV } from './knex.kv';
import { KnexSchemaEx } from './schema.ex';
import { IbMetaTables, TmplMetaTables } from './tables';

export class KnexEx {
  public schema: KnexSchemaEx;
  public kv: KnexKV;

  constructor(private readonly knex: Knex) {
    this.schema = new KnexSchemaEx(knex);
    this.kv = new KnexKV(knex);
  }

  public listSchemas(select: string = '*') {
    return this.knex.select(select).from('information_schema.schemata');
  }

  public async hasSchema(schema: string = '*') {
    const schemas = await this.knex
      .select('*')
      .from('information_schema.schemata')
      .where('schema_name', schema);
    return schemas.length > 0;
  }

  public async hasOrg(orgName: string) {
    return this.knex
      .withSchema('indiebase_mgr')
      .select('*')
      .from(IbMetaTables.orgs)
      .where('name', orgName)
      .then((v) => {
        return Array.isArray(v) && v.length > 0;
      });
  }

  public async listProjects(): Promise<PrimitiveProject[]> {
    return this.knex
      .withSchema('indiebase_mgr')
      .select('*')
      .from(IbMetaTables.projects);
  }

  /**
   * Get get project by project_id(header:x-indiebase-project-id), not the primary key.
   *
   * @param {String} projectId
   * @returns
   */
  public async getProjectByReferenceId(projectId: string) {
    return this.knex
      .withSchema('indiebase_mgr')
      .select('*')
      .from(IbMetaTables.projects)
      .where('project_id', projectId)
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
  public async getUserByEmail(
    email: string,
    namespace: string = 'indiebase_mgr',
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
      .from(
        namespace === 'indiebase_mgr'
          ? IbMetaTables.hackers
          : TmplMetaTables.users,
      )
      .where('email', email)
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
