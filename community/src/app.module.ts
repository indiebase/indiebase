import { Module } from '@nestjs/common';
import {
  kDevMode,
  letsCommunityDefaultConfigs,
} from '@indiebase/server-shared';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';
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
          envFilePath: resolve(__dirname, `../.env.${process.env.NODE_ENV}`),
          isGlobal: true,
          load: [...letsCommunityDefaultConfigs],
        }),
        I18nModule.forRoot({
          fallbackLanguage: 'zh-CN',
          loaderOptions: {
            path: resolve(__dirname, '../../i18n/'),
            watch: kDevMode,
          },
          resolvers: [
            new QueryResolver(),
            new HeaderResolver(['X-Custom-Lang']),
            new CookieResolver(),
            AcceptLanguageResolver,
          ],
          logging: kDevMode,
        }),
      ],
    }),
  ],
})
export class AppModule {}
