import { resolve } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { readJsonSync } from 'fs-extra';
import { AuthModule } from '../auth/auth.module';
import { FastifyRequest } from 'fastify';
import { FastifySwaggerOptions } from '@fastify/swagger';

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

      const authDoc = SwaggerModule.createDocument(app, authOptions, {
        include: [AuthModule],
      });
      SwaggerModule.setup('openapi/auth', app, authDoc, {
        swaggerOptions: {
          persistAuthorization: true,
        },
      });
    } catch (e) {
      console.error(e);
    } finally {
      resolve(null);
    }
  });
