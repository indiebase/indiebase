import { NacosConfigService } from '@letscollab/nest-nacos';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from '@letscollab/helper';
import { setupAuthApiDoc } from './utils';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import fastifyHelmet from '@fastify/helmet';
import Fastify from 'fastify';
import { i18nValidationErrorFactory } from 'nestjs-i18n';

declare module 'fastify' {
  interface FastifyRequest {
    user: any;
  }
}

const isDevelopment = process.env.NODE_ENV === 'development';

let IS_INITIALIZED = false;

async function bootstrap() {
  IS_INITIALIZED = false;

  const fastify = Fastify();

  // Compat express passport
  fastify.addHook('onRequest', (request: any, reply: any, done) => {
    reply.setHeader = function (key: string, value: string) {
      return this.raw.setHeader(key, value);
    };
    reply.end = function () {
      this.raw.end();
    };
    request.res = reply;
    done();
  });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(fastify as any),
    {
      bodyParser: true,
      logger: isDevelopment ? ['verbose'] : ['error', 'warn'],
      cors: true,
    },
  );

  const configService = app.get<ConfigService>(ConfigService);
  const nacosConfig = app.get<NacosConfigService>(NacosConfigService);
  const nestWinston = app.get(WINSTON_MODULE_NEST_PROVIDER);
  const authConfig = await nacosConfig.getConfig('service-auth.json');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      enableDebugMessages: isDevelopment,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: i18nValidationErrorFactory,
    }),
  );

  await app.register(fastifyHelmet, {
    global: true,
    crossOriginOpenerPolicy: false,
    contentSecurityPolicy: false,
    referrerPolicy: true,
  });
  await setupAuthApiDoc(app);

  app.useLogger(nestWinston);
  app.useGlobalFilters(new HttpExceptionFilter(nestWinston));
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: authConfig.rabbitmq.urls,
      queue: 'auth_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(
    configService.get('app.port'),
    configService.get('app.hostname'),
  );

  nacosConfig.subscribe(
    {
      dataId: 'service-auth.json',
      group: 'DEFAULT_GROUP',
    },
    async () => {
      if (IS_INITIALIZED) {
        await app.close();
        await bootstrap();
      }
      IS_INITIALIZED = true;
    },
  );
}

bootstrap();
