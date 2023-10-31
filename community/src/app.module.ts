import { Module } from '@nestjs/common';
import { communityDefaultConfigs } from '@indiebase/server-shared';
import { ConfigModule } from '@nestjs/config';
import path from 'node:path';
import { createCommunityModule } from './community.module';

@Module({
  imports: [
    createCommunityModule({
      i18n: {
        path: path.resolve(__dirname, '../../i18n/'),
      },
      imports: [
        ConfigModule.forRoot({
          envFilePath: path.resolve(
            __dirname,
            `../.env.${process.env.NODE_ENV}`,
          ),
          isGlobal: true,
          load: [...communityDefaultConfigs],
        }),
      ],
    }),
  ],
})
export class AppModule {}
