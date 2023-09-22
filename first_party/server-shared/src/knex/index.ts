import './schema.ex';
import { Knex } from 'knex';
import { KnexSchemaEx } from './schema.ex';

export class KnexEx {
  public schema: KnexSchemaEx;

  constructor(private readonly knex: Knex) {
    this.schema = new KnexSchemaEx(knex);
  }
}
