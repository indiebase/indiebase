import {
  AuthModule,
  InvitationModule,
  MailModule,
  OrgModule,
  ProjectModule,
  StorageModule,
  UserModule,
} from '@letscollab/lets-community';
import { StoplightElementsModule } from '@letscollab/nest-stoplight-elements';
import { apiDocDefaultContact } from '@letscollab/server-shared';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DemoOrgModule } from '../org/org.module';
const { name, url, email } = apiDocDefaultContact;

export const setupApiDoc = (app: INestApplication) =>
  new Promise(async (resolve) => {
    try {
      const options = new DocumentBuilder()
        .setTitle('Letscollab API')
        .setDescription('Letscollab lets-community REST API ')
        .setVersion('1.0.0')
        .addBearerAuth(
          {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'paseto',
            description: 'Enter paseto token',
            in: 'header'
          },
          'paseto-token',
        )
        .setContact(name, url, email)
        .build();

      const doc = SwaggerModule.createDocument(app, options, {
        include: [
          DemoOrgModule,
          AuthModule,
          UserModule,
          OrgModule,
          ProjectModule,
          InvitationModule,
          MailModule,
          StorageModule,
        ],
        deepScanRoutes: true,
      });

      await StoplightElementsModule.setup('/docs/api', app, doc, {
        logo: 'https://user-images.githubusercontent.com/45007226/220814748-96ec88ec-673d-4d38-abae-dce7d7c6695f.png',
      });
    } catch (e) {
      console.error(e);
    } finally {
      resolve(null);
    }
  });
