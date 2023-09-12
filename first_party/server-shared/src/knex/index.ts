/// <reference path="./knex.d.ts" />

import './schema.ex';
import { Knex } from 'knex';
import { KnexSchemaEx } from './schema.ex';

export class KnexEx {
  schema: KnexSchemaEx;

  constructor(public readonly knex: Knex) {
    this.schema = new KnexSchemaEx(knex);
  }
}
