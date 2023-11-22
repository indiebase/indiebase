import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { StorageModule } from './storage.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { afterAll, beforeEach, describe, expect, it } from 'vitest';

describe('StorageController (e2e)', () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [StorageModule],
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

  describe('POST /storage/bucket/:bucketName (create bucket)', () => {
    it('returns 201 and creates a new bucket', async () => {
      const response = await request(app.getHttpServer())
        .post(`/storage/bucket/${testBucket}`)
        .expect(201);

      expect(response).toBeDefined();
      expect(response.body).not.toBeNull();
      expect(response.body.code).toEqual(0);
    });
  });

  describe('PUT /storage/:bucket/upload/file (upload file)', () => {
    it('returns 200 and uploads a file', async () => {
      // write the file upload logic here and test it
    });
  });

  describe('PUT /storage/:bucket/upload/files (upload files)', () => {
    it('returns 200 and uploads multiple files', async () => {
      // write the multiple file upload logic here and test it
    });
  });

  describe('DELETE /storage/bucket/:bucketName (delete bucket)', () => {
    it('returns 204 and deletes the specified bucket', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/storage/bucket/${testBucket}`)
        .expect(204);

      expect(response).toBeDefined();
      expect(response.body).toBeUndefined();
    });
  });
});
