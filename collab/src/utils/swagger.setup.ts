import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { overwriteSwaggerStaticAssets } from '@letscollab/server-shared';
import { InvitationModule } from '../invitation/invitation.module';
import { INestApplication } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { OrgModule } from '../collab/org/org.module';
import { ProjectModule } from '../collab/project/project.module';
import { FileModule } from '../file';

const commonContact = [
  'deskbtm/letscollab',
  'https://letscollab.deskbtm.com/contact',
  'deskbtm@outlook.com',
];

export const setupApiDoc = (app: INestApplication) =>
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

      const collabDoc = SwaggerModule.createDocument(app, collabOptions, {
        include: [OrgModule, ProjectModule, InvitationModule],
      });

      const msgDoc = SwaggerModule.createDocument(app, userOptions, {
        include: [UserModule],
      });

      const commonDoc = SwaggerModule.createDocument(app, commonOptions, {
        include: [FileModule],
      });

      SwaggerModule.setup('openapi/auth', app, authDoc, {
        swaggerOptions: {
          persistAuthorization: true,
        },
      });

      SwaggerModule.setup('openapi/user', app, userDoc, {
        swaggerOptions: {
          persistAuthorization: true,
        },
      });

      SwaggerModule.setup('openapi/collab', app, collabDoc, {
        swaggerOptions: {
          persistAuthorization: true,
        },
      });

      SwaggerModule.setup('openapi/msg', app, msgDoc, {
        swaggerOptions: {
          persistAuthorization: true,
        },
      });

      SwaggerModule.setup('openapi/common', app, commonDoc, {
        swaggerOptions: {
          persistAuthorization: true,
        },
      });

      // Resolve swagger-ui-dist
      if (process.env.NODE_ENV === 'production') {
        (SwaggerModule as any).serveStatic = overwriteSwaggerStaticAssets;
      }
    } catch (e) {
      console.error(e);
    } finally {
      resolve(null);
    }
  });
