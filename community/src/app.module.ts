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
          fallbackLanguage: 'zh-CN',
          loaderOptions: {
            path: path.resolve(__dirname, '../../i18n/'),
            watch: kDevMode,
          },
          resolvers: [
            new QueryResolver(),
            new HeaderResolver(['X-Custom-Lang']),
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
