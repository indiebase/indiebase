import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';
import configure from './config';
import { IsEntityExistedConstraint } from '@letscollab/server-shared';
import { createLetsCommunityModule } from '@letscollab/lets-community';

@Module({
  imports: [
    createLetsCommunityModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: resolve(__dirname, `../.env.${process.env.NODE_ENV}`),
          isGlobal: true,
          load: configure,
        }),
      ],
    }),
  ],
  providers: [Logger, IsEntityExistedConstraint],
})
export class AppModule {}
