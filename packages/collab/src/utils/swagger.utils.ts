import { resolve } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { readJsonSync } from 'fs-extra';
import { OrgModule } from '../org/org.module';
import { PrjModule } from '../prj/prj.module';
import { InvitationModule } from '../invitation/invitation.module';
import { type FastifyRequest } from 'fastify';

const pkg = readJsonSync(resolve(process.cwd(), './package.json'));

export const setupCollabApiDoc = (app: INestApplication) =>
  new Promise(async (resolve) => {
    try {
      const userOptions = new DocumentBuilder()
        .setTitle('Collab Api')
        .setDescription('Collab REST API')
        .setVersion(pkg.version)
        .addCookieAuth('SID', {
          type: 'apiKey',
          in: 'cookie',
        })
        .build();

      const userDoc = SwaggerModule.createDocument(app, userOptions, {
        include: [PrjModule, OrgModule, InvitationModule],
      });
      SwaggerModule.setup('openapi/collab', app, userDoc, {
        swaggerOptions: {
          persistAuthorization: true,
        },
      });
    } catch (e) {
      console.log(e);
    } finally {
      resolve(null);
    }
  });
