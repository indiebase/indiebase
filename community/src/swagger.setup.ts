import { StoplightElementsModule } from '@indiebase/nest-stoplight-elements';
import { apiDocDefaultContact } from '@indiebase/server-shared';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
const { name, url, email } = apiDocDefaultContact;

export const setupApiDoc = (app: INestApplication) =>
  new Promise(async (resolve) => {
    try {
      const options = new DocumentBuilder()
        .setTitle('indiebase API')
        .setDescription('indiebase community REST API ')
        .setVersion('1.0.0')
        .addBearerAuth(
          {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'paseto',
            description: 'Enter paseto token',
            in: 'header',
          },
          'p-token',
        )
        .setContact(name, url, email)
        .build();

      const doc = SwaggerModule.createDocument(app, options, {
        include: [
          // AuthModule,
          // UserModule,
          // OrgModule,
          // ProjectModule,
          // InvitationModule,
          // MailModule,
          // StorageModule,
        ],
        deepScanRoutes: true,
      });

      await StoplightElementsModule.setup('/docs/api', app, doc, {
        favicon: '/favicon.ico',
        logo: '/logo.png',
      });
    } catch (e) {
      console.error(e);
    } finally {
      resolve(null);
    }
  });
