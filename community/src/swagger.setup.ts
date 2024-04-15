import path from 'node:path';

import { StoplightElementsModule } from '@indiebase/nest-stoplight-elements';
import { X_Indiebase_AP } from '@indiebase/sdk';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AuthModule } from './auth';
import { MgrModule } from './manager/mgr.module';
import { ProbeModule } from './probe';
import { StorageModule } from './storage';
import { UsersModule } from './users/users.module';

const assetsPath = kDevMode
  ? path.resolve(
      require.resolve('@indiebase/nest-stoplight-elements'),
      '../views',
    )
  : undefined;

const contactName = 'deskbtm/indiebase',
  contactUrl = '',
  contactEmail = 'indiebase@deskbtm',
  license = 'Apache-2.0',
  licenseUrl = 'https://github.com/indiebase/indiebase/blob/main/LICENSE',
  termsUrl = 'https://indiebase.deskbtm.com/terms',
  desc = `
  Indiebase Management REST API.
  Click "Export" button, you can use swagger-typescript-api to generate TypeScript API from OpenAPI.
  Send Email to Indiebase (indiebase@deskbtm.com)
`;
const commonApiKey = [
  {
    type: 'apiKey',
    in: 'header',
    name: X_Indiebase_AP,
  },
  'ap',
] as const;
const commonBearerAuth = [
  {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'paseto',
    description: 'Default paseto token Authorization',
    in: 'header',
  },
  'paseto',
] as const;

export const setupApiDoc = async (app: INestApplication) => {
  try {
    const mgrOptions = new DocumentBuilder()
      .setTitle('Indiebase Management REST API')
      .setDescription(desc)
      .setVersion('1.0.0')
      .setContact(contactName, contactUrl, contactEmail)
      .setLicense(license, licenseUrl)
      .setTermsOfService(termsUrl)
      .addBearerAuth(...commonBearerAuth)
      .addServer('http://indiebase-dev.deskbtm.com:8331', 'Development')
      .addServer('https://indiebase.deskbtm.com', 'Production')
      .addApiKey(...commonApiKey)
      .build();

    const options = new DocumentBuilder()
      .setTitle('Indiebase REST API')
      .setDescription(desc)
      .setVersion('1.0.0')
      .addBearerAuth(...commonBearerAuth)
      .setContact(contactName, contactUrl, contactEmail)
      .setLicense(license, licenseUrl)
      .setTermsOfService(termsUrl)
      .addServer('http://indiebase-dev.deskbtm.com:8331', 'Development')
      .addServer('https://indiebase.deskbtm.com', 'Production')
      .addApiKey(...commonApiKey)
      .build();

    const mgrApiDoc = SwaggerModule.createDocument(app, mgrOptions, {
      deepScanRoutes: true,
      operationIdFactory: (_, m) => m + '',
      include: [MgrModule, ProbeModule],
    });

    const apiDoc = SwaggerModule.createDocument(app, options, {
      deepScanRoutes: true,
      operationIdFactory: (_, m) => m + '',
      include: [UsersModule, StorageModule, AuthModule],
    });

    await Promise.all([
      StoplightElementsModule.setup('/docs/mgr/api', app, mgrApiDoc, {
        favicon: '/favicon.ico',
        logo: '/logo.svg',
        assetsPath,
      }),
      StoplightElementsModule.setup('/docs/api', app, apiDoc, {
        favicon: '/favicon.ico',
        logo: '/logo.svg',
        assetsPath,
      }),
    ]);
  } catch (e) {
    console.error(e);
  }
};
