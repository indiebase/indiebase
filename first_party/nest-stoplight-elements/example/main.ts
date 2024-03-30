import { NestApplication, NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { StoplightElementsModule } from '../src/index';
import { TestModule } from './test.module';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(
    TestModule,
    new FastifyAdapter(),
  );
  const options = new DocumentBuilder()
    .setTitle('Indiebase REST API')
    .setDescription('Stoplight Elements Test API ')
    .build();

  const doc = SwaggerModule.createDocument(app, options, {
    include: [TestModule],
  });

  await StoplightElementsModule.setup('/docs', app, doc);

  app.listen(3000);
}

bootstrap();
