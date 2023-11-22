import { StoplightElementsModule } from '../src/stoplight-elements.module';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TestModule } from '../example/test.module';

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    const options = new DocumentBuilder()
      .setTitle('Auth Api')
      .setDescription('Stoplight Elements Test API ')
      .build();

    const doc = SwaggerModule.createDocument(app, options, {
      include: [TestModule],
    });

    StoplightElementsModule.setup('/docs', app, doc);

    await app.init();
  });

  it('/test (GET)', () => {
    console.log(app.getHttpServer());
    return request(app.getHttpServer())
      .get('/test')
      .expect(200)
      .expect('Hello World!');
  });

  afterEach(async () => {
    app.close();
  });
});
