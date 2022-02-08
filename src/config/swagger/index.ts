import { resolve } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

import { readJsonSync } from 'fs-extra';

const pkg = readJsonSync(resolve(__dirname, '../../../package.json'));

export const setupSwagger = (app: INestApplication) =>
  new Promise((resolve) => {
    try {
      const userOptions = new DocumentBuilder()
        .setTitle('API总汇')
        .setDescription('上海交通大学在线科创信息服务系统接口')
        .setVersion(pkg.version)
        .build();
      const userDoc = SwaggerModule.createDocument(app, userOptions, {
        include: [],
      });
      SwaggerModule.setup('api-doc', app, userDoc);
    } catch (e) {
      console.log(e);
    } finally {
      resolve(null);
    }
  });
