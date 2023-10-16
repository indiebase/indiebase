import { Knex } from 'knex';

import { KnexSchemaEx } from './schema.ex';
import { MgrMetaTables } from './tables';
import { Kysely, sql } from 'kysely';

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
}

export class KyselyEx {
  public schema: KnexSchemaEx;

  constructor(private readonly kysely: Kysely<any>) {
    // this.schema = new KnexSchemaEx(knex);
  }

  public listSchemas(select: string = '*') {
    // return this.knex.select(select).from('information_schema.schemata');
  }

  public async hasSchema(schema: string = 'public') {
    const schemas = await this.kysely
      .selectFrom('information_schema.schemata')
      .selectAll()
      .where('schema_name', '=', schema)
      .execute();

    return schemas.length > 0;
  }

  public async hasOrg(orgName: string) {
    // return this.knex
    //   .withSchema('mgr')
    //   .select('*')
    //   .from(MgrMetaTables.orgs)
    //   .where('name', orgName)
    //   .then((v) => {
    //     return Array.isArray(v) && v.length > 0;
    //   });
  }
}
