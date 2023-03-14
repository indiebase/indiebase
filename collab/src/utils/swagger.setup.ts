import { INestApplication } from '@nestjs/common';

export const setupApiDoc = (app: INestApplication) =>
  new Promise(async (resolve) => {
    try {
    } catch (e) {
      console.error(e);
    } finally {
      resolve(null);
    }
  });
