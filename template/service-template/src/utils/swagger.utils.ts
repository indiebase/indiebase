import { resolve } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { readJsonSync } from 'fs-extra';
import { AuthModule } from '../auth/auth.module';

const pkg = readJsonSync(resolve(process.cwd(), './package.json'));

export const setupAuthApiDoc = (app: INestApplication) =>
  new Promise(async (resolve) => {
    try {
      app.setGlobalPrefix('v1');

      const authOptions = new DocumentBuilder()
        .setTitle('Auth Api')
        .setDescription('Authorization 接口')
        .setVersion(pkg.version)
        .build();

      const authDoc = SwaggerModule.createDocument(app, authOptions, {
        include: [AuthModule],
      });
      SwaggerModule.setup('api/doc/auth', app, authDoc);
    } catch (e) {
      console.log(e);
    } finally {
      resolve(null);
    }
  });
