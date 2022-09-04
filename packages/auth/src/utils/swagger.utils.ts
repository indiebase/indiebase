import { resolve } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { readJsonSync } from 'fs-extra';
import { AuthModule } from '../auth/auth.module';
import { FastifyRequest } from 'fastify';
import { FastifySwaggerOptions } from '@fastify/swagger';

const pkg = readJsonSync(resolve(process.cwd(), './package.json'));

export const setupAuthApiDoc = (app: INestApplication) =>
  new Promise(async (resolve) => {
    try {
      const authOptions = new DocumentBuilder()
        .setTitle('Auth Api')
        .setDescription('Authz and authn interface')
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
        uiConfig: {
          persistAuthorization: true,
        },
        uiHooks: {
          preHandler(req: FastifyRequest, res, next) {
            console.log('-------------------------------');
            next();
          },
          onRequest(req: FastifyRequest, res, next) {
            console.log('-------------------------------');
            next();
          },
        },
      } as FastifySwaggerOptions);
    } catch (e) {
      console.error(e);
    } finally {
      resolve(null);
    }
  });
