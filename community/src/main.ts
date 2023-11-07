/// <reference types="@indiebase/server-shared/extend" />

import '@deskbtm/gadgets/env';

import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { CommunityBootstrap } from './community.bootstrap';
import path from 'path';

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
