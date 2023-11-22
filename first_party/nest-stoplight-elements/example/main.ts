import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { StoplightElementsModule } from '../src';
import { TestModule } from './test.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
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

  await StoplightElementsModule.setup('/docs', app, doc, {
    logo: 'https://user-images.githubusercontent.com/45007226/220814748-96ec88ec-673d-4d38-abae-dce7d7c6695f.png',
  });

  app.listen(3000);
}

bootstrap();
