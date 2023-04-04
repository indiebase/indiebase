import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { HealthModule } from './health.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

describe('HealthController (e2e)', () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HealthModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const testBucket = 'test-bucket';

  describe('POST /health/bucket/:bucketName (create bucket)', () => {
    it('returns 201 and creates a new bucket', async () => {
      const response = await request(app.getHttpServer())
        .post(`/health/bucket/${testBucket}`)
        .expect(201);

      expect(response).toBeDefined();
      expect(response.body).not.toBeNull();
      expect(response.body.code).toEqual(0);
    });
  });

  describe('PUT /health/:bucket/upload/file (upload file)', () => {
    it('returns 200 and uploads a file', async () => {
      // write the file upload logic here and test it
    });
  });

  describe('PUT /health/:bucket/upload/files (upload files)', () => {
    it('returns 200 and uploads multiple files', async () => {
      // write the multiple file upload logic here and test it
    });
  });

  describe('DELETE /health/bucket/:bucketName (delete bucket)', () => {
    it('returns 204 and deletes the specified bucket', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/health/bucket/${testBucket}`)
        .expect(204);

      expect(response).toBeDefined();
      expect(response.body).toBeUndefined();
    });
  });
});
