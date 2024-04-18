/// <reference types="@indiebase/server-shared/extend" />
/// <reference types="@indiebase/nest-knex/extend" />

import '@deskbtm/gadgets/env';
import '@indiebase/nest-knex/ex';

import { Logger } from '@nestjs/common';
import path from 'path';

import { AppModule } from './app.module';
import { CommunityBootstrap } from './community.bootstrap';

async function main() {
  try {
    const boot = new CommunityBootstrap({
      staticAssets: {
        root: path.resolve(__dirname, '../public'),
      },
    });
    const app = await boot.create(AppModule);
    await app.start();
  } catch (error) {
    Logger.error(error);
  }
}

main();
