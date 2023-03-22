import { Module } from '@nestjs/common';
import {
  kDevMode,
  letsCommunityDefaultConfigs,
} from '@letscollab/server-shared';
import { OctokitModule } from '@letscollab/nest-octokit';
import { createLetsCommunityModule } from '@letscollab/lets-community';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';
import {
  I18nModule,
  QueryResolver,
  HeaderResolver,
  CookieResolver,
  AcceptLanguageResolver,
} from 'nestjs-i18n';

@Module({
  imports: [
    createLetsCommunityModule({
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
    OctokitModule.forRootAsync({
      async useFactory() {
        return {
          optionsFactory(req) {
            return {
              auth: req.session?.user?.githubAccessToken,
            };
          },
        };
      },
    }),
  ],
})
export class AppModule {}
