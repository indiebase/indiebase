import { resolve } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { readJsonSync } from 'fs-extra';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { FastifyRequest } from 'fastify';
import { FastifySwaggerOptions } from '@fastify/swagger';
import { overwriteSwaggerStaticAssets } from '@letscollab-nest/helper';

const pkg = readJsonSync(resolve(process.cwd(), './package.json'));

export const setupApiDoc = (app: INestApplication) =>
  new Promise(async (resolve) => {
    try {
      const authOptions = new DocumentBuilder()
        .setTitle('Auth Api')
        .setDescription('Authz and authn REST API ')
        .setVersion(pkg.version)
        .addCookieAuth('SID', {
          type: 'apiKey',
          in: 'cookie',
        })
        .build();

      const userOptions = new DocumentBuilder()
        .setTitle('User Api')
        .setDescription('User REST API')
        .setVersion(pkg.version)
        .addCookieAuth('SID', {
          type: 'apiKey',
          in: 'cookie',
        })
        .build();

      const authDoc = SwaggerModule.createDocument(app, authOptions, {
        include: [AuthModule],
      });

      const userDoc = SwaggerModule.createDocument(app, userOptions, {
        include: [UserModule],
      });

      const collabDoc = SwaggerModule.createDocument(app, userOptions, {
        include: [UserModule],
      });

      const msgDoc = SwaggerModule.createDocument(app, userOptions, {
        include: [UserModule],
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
