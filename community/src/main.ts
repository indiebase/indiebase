/// <reference types="@indiebase/nest-knex/extend" />

import '@total-typescript/ts-reset';
import '@deskbtm/gadgets/env';
import '@indiebase/nest-knex/ex';

import { Logger } from '@nestjs/common';
import path from 'path';

import { AppModule } from './app.module';
import { CommunityBootstrap } from './community.bootstrap';

declare const module: any;

async function main() {
  try {
    const booter = new CommunityBootstrap({
      staticAssets: {
        root: path.resolve(__dirname, '../public'),
      },
    });
    const app = await booter.create(AppModule);
    await app.start();

    if (kDevMode && module.hot) {
      module.hot.accept();
      module.hot.dispose(async () => {
        await app.close();
      });
    }
  } catch (error) {
    Logger.error(error);
  }
}

main();
