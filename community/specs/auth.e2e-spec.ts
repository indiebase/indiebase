import { AuthModule } from '../src/auth/auth.module';
import { Test, TestingModule } from '@nestjs/testing';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as request from 'supertest';
import { describe, beforeEach, it } from '@jest/globals';

describe('AuthController (e2e)', () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it('/v1/auth/signin (GET)', () => {
    return request(app.getHttpServer())
      .get('/v1/auth/signin')
      .expect(200)
      .expect('Hello World!');
  });
});
