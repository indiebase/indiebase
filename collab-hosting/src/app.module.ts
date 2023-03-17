import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';
import { IsEntityExistedConstraint, kDevMode } from '@letscollab/server-shared';
import { createLetsCommunityModule } from '@letscollab/lets-community';
import { letsCommunityDefaultConfigs } from '@letscollab/server-shared';
import {
  AcceptLanguageResolver,
  CookieResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
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
            new HeaderResolver(['x-custom-lang']),
            new CookieResolver(),
            AcceptLanguageResolver,
          ],
          logging: kDevMode,
        }),
      ],
    }),
  ],
  providers: [Logger, IsEntityExistedConstraint],
})
export class AppModule {}
