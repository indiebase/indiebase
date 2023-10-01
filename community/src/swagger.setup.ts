import { StoplightElementsModule } from '@indiebase/nest-stoplight-elements';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import path from 'node:path';

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
      email = process.env.API_DOC_CONTACT_EMAIL ?? 'deskbtm@outlook.com';

    try {
      const options = new DocumentBuilder()
        .setTitle('Indiebase API')
        .setDescription('Indiebase REST API.')
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

      const doc = SwaggerModule.createDocument(app, options, {
        deepScanRoutes: true,
      });

      await StoplightElementsModule.setup('/docs/api', app, doc, {
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
