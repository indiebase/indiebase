import { Module } from '@nestjs/common';
import { communityDefaultConfigs } from '@indiebase/server-shared';
import { ConfigModule } from '@nestjs/config';
import path from 'node:path';
import {
  I18nModule,
  QueryResolver,
  HeaderResolver,
  CookieResolver,
  AcceptLanguageResolver,
} from 'nestjs-i18n';
import { createCommunityModule } from './community.module';
import { X_Indiebase_Lang } from '@indiebase/sdk';

@Module({
  imports: [
    createCommunityModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: path.resolve(
            __dirname,
            `../.env.${process.env.NODE_ENV}`,
          ),
          isGlobal: true,
          load: [...communityDefaultConfigs],
        }),
        I18nModule.forRoot({
          fallbackLanguage: 'en',
          loaderOptions: {
            path: path.resolve(__dirname, '../../i18n/'),
            watch: kDevMode,
          },
          resolvers: [
            new QueryResolver(),
            new HeaderResolver([X_Indiebase_Lang]),
            new CookieResolver(),
            new AcceptLanguageResolver(),
          ],
          logging: kDevMode,
        }),
      ],
    }),
  ],
})
export class AppModule {}
