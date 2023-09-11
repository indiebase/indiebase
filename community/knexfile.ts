import type { Knex } from 'knex';
import dotenv from 'dotenv';
import path from 'node:path';
import { _getPGConnectionConfig } from '@indiebase/server-shared';

// Update with your config settings.
dotenv.config({
  path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`),
});

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: _getPGConnectionConfig(),
    migrations: {
      tableName: 'demo',
      extension: 'ts',
      directory: path.resolve(__dirname, './src/migrations'),
    },
  },

  // staging: {
  //   client: 'pg',
  //   connection: {
  //     database: 'my_db',
  //     user: 'username',
  //     password: 'password',
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10,
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations',
  //   },
  // },

  // production: {
  //   client: 'pg',
  //   connection: {
  //     database: '',
  //     user: 'username',
  //     password: 'password',
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10,
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations',
  //   },
  // },
};

module.exports = config;
