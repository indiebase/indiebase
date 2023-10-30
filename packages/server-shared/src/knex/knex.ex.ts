import { Knex } from 'knex';

import { KnexSchemaEx } from './schema.ex';
import { MgrMetaTables } from './tables';

export class KnexEx {
  public schema: KnexSchemaEx;

  constructor(private readonly knex: Knex) {
    this.schema = new KnexSchemaEx(knex);
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
      .withSchema('mgr')
      .select('*')
      .from(MgrMetaTables.orgs)
      .where('name', orgName)
      .then((v) => {
        return Array.isArray(v) && v.length > 0;
      });
  }

  /**
   * Get get project by project_id(header:x-indiebase-project-id), not the primary key.
   * 
   * @param {String} projectId
   * @returns
   */
  public async getProjectByReferenceId(projectId: string) {
    return this.knex
      .withSchema('mgr')
      .select('*')
      .from(MgrMetaTables.projects)
      .where('project_id', projectId)
      .first();
  }
}
