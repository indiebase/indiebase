import path from 'node:path';
import { MgrModule } from '~/manager/mgr.module';
import { INestApplication } from '@nestjs/common';
import { UsersModule } from '~/users/users.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { StoplightElementsModule } from '@indiebase/nest-stoplight-elements';
import { StorageModule } from './storage';
import { MetaModule } from './db';
import { AuthModule } from './auth';
import { ProbeModule } from './probe';

const assetsPath = kDevMode
  ? path.resolve(
      require.resolve('@indiebase/nest-stoplight-elements'),
      '../views',
    )
  : null;

export const setupApiDoc = (app: INestApplication) =>
  new Promise(async (resolve) => {
    const name = process.env.API_DOC_CONTACT_NAME ?? 'deskbtm/indiebase',
      url = process.env.API_DOC_CONTACT_URL ?? '',
      email = process.env.API_DOC_CONTACT_EMAIL ?? 'dev@indiebase.com';

    try {
      const mgrOptions = new DocumentBuilder()
        .setTitle('Indiebase Management REST API')
        .setDescription(
          `
          Indiebase Management REST API.
          Click "Export" button, you can use swagger-typescript-api to generate TypeScript API from OpenAPI.
        `,
        )
        .setVersion('1.0.0')
        .addBearerAuth(
          {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'paseto',
            description: 'Default paseto token Authorization',
            in: 'header',
          },
          'paseto',
        )
        .setContact(name, url, email)
        .build();

      const options = new DocumentBuilder()
        .setTitle('Indiebase REST API')
        .setDescription(
          `
          Indiebase REST API.
        `,
        )
        .setVersion('1.0.0')
        .addBearerAuth(
          {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'paseto',
            description: 'Default paseto token Authorization',
            in: 'header',
          },
          'paseto',
        )
        .setContact(name, url, email)
        .build();

      const mgrApiDoc = SwaggerModule.createDocument(app, mgrOptions, {
        deepScanRoutes: true,
        operationIdFactory: (_, m) => m + '',
        include: [MgrModule, ProbeModule],
      });

      const apiDoc = SwaggerModule.createDocument(app, options, {
        deepScanRoutes: true,
        operationIdFactory: (_, m) => m + '',
        include: [UsersModule, MetaModule, StorageModule, AuthModule],
      });

      await StoplightElementsModule.setup('/docs/mgr/api', app, mgrApiDoc, {
        favicon: '/favicon.ico',
        logo: '/logo.svg',
        assetsPath,
      });

      await StoplightElementsModule.setup('/docs/api', app, apiDoc, {
        favicon: '/favicon.ico',
        logo: '/logo.svg',
        assetsPath,
      });
    } catch (e) {
      console.error(e);
    } finally {
      resolve(null);
    }
  });
