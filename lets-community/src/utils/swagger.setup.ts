import { StorageModule } from '../storage/storage.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { InvitationModule } from '../invitation/invitation.module';
import { INestApplication } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { ProjectModule } from '../project/project.module';
import { OrgModule } from '../org/org.module';

const commonContact = [
  'deskbtm/letscollab',
  'https://letscollab.deskbtm.com/contact',
  'deskbtm@outlook.com',
];

export const letsCommunityApiDocs = (app: INestApplication) =>
  new Promise(async (resolve) => {
    try {
      const authOptions = new DocumentBuilder()
        .setTitle('Auth Api')
        .setDescription('Authz and authn REST API ')
        .setVersion('1.0.0')
        .addCookieAuth('SID', {
          type: 'apiKey',
          in: 'cookie',
        })
        //@ts-ignore
        .setContact(...commonContact)
        .build();

      const userOptions = new DocumentBuilder()
        .setTitle('User Api')
        .setDescription('User REST API')
        .setVersion('1.0.0')
        .addCookieAuth('SID', {
          type: 'apiKey',
          in: 'cookie',
        })
        //@ts-ignore
        .setContact(...commonContact)
        .build();

      const commonOptions = new DocumentBuilder()
        .setTitle('COmmon Api')
        .setDescription('Common REST API')
        .setVersion('1.0.0')
        //@ts-ignore
        .setContact(...commonContact)
        .addCookieAuth('SID', {
          type: 'apiKey',
          in: 'cookie',
        })
        .build();

      const collabOptions = new DocumentBuilder()
        .setTitle('Collaboration Api')
        .setDescription('Collaboration REST API')
        .setVersion('1.0.0')
        .addCookieAuth('SID', {
          type: 'apiKey',
          in: 'cookie',
        })
        //@ts-ignore
        .setContact(...commonContact)
        .addSecurity('basic', {
          type: 'http',
          scheme: 'basic',
          description: 'Api requires permission',
        })
        .build();

      const authDoc = SwaggerModule.createDocument(app, authOptions, {
        include: [AuthModule],
      });

      const userDoc = SwaggerModule.createDocument(app, userOptions, {
        include: [UserModule],
      });

      const schemaDoc = SwaggerModule.createDocument(app, collabOptions, {
        include: [OrgModule, ProjectModule, InvitationModule],
      });

      const msgDoc = SwaggerModule.createDocument(app, userOptions, {
        include: [UserModule],
      });

      const commonDoc = SwaggerModule.createDocument(app, commonOptions, {
        include: [StorageModule],
      });

      SwaggerModule.setup('openapi/auth', app, authDoc, {
        swaggerOptions: {
          persistAuthorization: true,
        },
      });

      return [authDoc, userDoc];
    } catch (e) {
      console.error(e);
    } finally {
      resolve(null);
    }
  });
