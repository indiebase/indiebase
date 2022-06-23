import { UserModule } from '../user/user.module';
import { resolve } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { readJsonSync } from 'fs-extra';
import { INestApplication } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { type FastifyRequest } from 'fastify';

const pkg = readJsonSync(resolve(process.cwd(), './package.json'));

export const setupUserApiDoc = (app: INestApplication) =>
  new Promise(async (resolve) => {
    try {
      const redisService = app.get(RedisService);

      const userOptions = new DocumentBuilder()
        .setTitle('User Api')
        .setDescription('User REST API')
        .setVersion(pkg.version)
        .addCookieAuth('SID', {
          type: 'apiKey',
          in: 'cookie',
        })
        .build();

      const userDoc = SwaggerModule.createDocument(app, userOptions, {
        include: [UserModule],
      });

      SwaggerModule.setup('openapi/user', app, userDoc, {
        uiConfig: {
          persistAuthorization: true,
        },
        uiHooks: {
          preHandler(req: FastifyRequest, res, next) {
            next();
          },
        },
      });
    } catch (e) {
      console.log(e);
    } finally {
      resolve(null);
    }
  });
