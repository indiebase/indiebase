import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { readFileSync } from 'fs';
import { setupSwagger } from '@/config/swagger';
import { GlobalHttpExceptionFilter } from '@/common';
import { resolve } from 'path';

const ENV = process.env.NODE_ENV;
const isProd = ENV === 'production';

if (isProd) {
  console.debug = function () {};
}

console.log(
  `--------------------------------${ENV}----------------------------------`,
);

async function bootstrap() {
  const httpsOptions = isProd && {
    key: readFileSync(resolve(__dirname, `../key/${process.env.HTTPS_KEY}`)),
    cert: readFileSync(resolve(__dirname, `../key/${process.env.HTTPS_CERT}`)),
  };

  const whitelist = [
    'http://127.0.0.1:1032',
    'http://localhost:1032',
    'http://172.20.10.3:1032',
  ];

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: whitelist,
      methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
      credentials: true,
    },
    bodyParser: true,
    httpsOptions,
  });

  // 配置swagger
  ENV !== 'production' && setupSwagger(app);

  app.useGlobalFilters(new GlobalHttpExceptionFilter());
  app.setGlobalPrefix('v1');

  // web漏洞
  // app.use(helmet());
  app.useStaticAssets(resolve(__dirname, '../assets/'), {
    prefix: '/assets',
  });

  await app.listen(process.env.PORT || 1031, '127.0.0.1');
}

bootstrap();
