import { UserModule } from '../user/user.module';
import { resolve } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { readJsonSync } from 'fs-extra';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import * as path from 'path';
import { overwriteSwaggerStaticAssets } from '@letscollab/helper';
const pkg = readJsonSync(resolve(process.cwd(), './package.json'));

export const setupApiDoc = (app: NestFastifyApplication) =>
  new Promise(async (resolve) => {
    try {
      // const fastify: ReturnType<typeof Fastify> = app
      //   .getHttpAdapter()
      //   .getInstance();

      // fastify.addHook('preHandler', (req, reply, next) => {
      //   console.log(req.routerPath);
      //   next();
      // });

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

      if (process.env.NODE_ENV === 'production') {
        (SwaggerModule as any).serveStatic = overwriteSwaggerStaticAssets;
      }

      SwaggerModule.setup('openapi/user', app, userDoc, {
        swaggerOptions: {
          persistAuthorization: true,
        },
      });

      // app.useStaticAssets({
      //   root: path.resolve(__dirname, './swagger-ui-dist'),
      //   prefix: '/openapi/user',
      // });
    } catch (e) {
      console.log(e);
    } finally {
      resolve(null);
    }
  });
