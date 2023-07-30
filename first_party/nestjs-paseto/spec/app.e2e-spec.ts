import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Injectable, Module } from '@nestjs/common';
import * as request from 'supertest';
import { PasetoModule, PasetoService } from '../src';

@Module({
  imports: [
    PasetoModule.register({
      version: 'V3',
      localKey: 'xxxxxxxxx',
      produceOptions: {
        expiresIn: '60s',
      },
    }),
  ],
})
class TestModule {}

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
