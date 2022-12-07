import { NacosConfigService } from '@letscollab-nest/nacos';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from '@letscollab/helper';
import { setupApiDoc } from './utils';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import fastifyHelmet from '@fastify/helmet';
import { i18nValidationErrorFactory } from 'nestjs-i18n';

declare module 'fastify' {
  interface PassportUser {
    [key: string]: any;
  }
}

const isDevelopment = process.env.NODE_ENV === 'development';

async function bootstrap() {
  // const fastify = Fastify();

  // Compat express passport
  // fastify.addHook('onRequest', (request: any, reply: any, done) => {
  //   reply.setHeader = function (key: string, value: string) {
  //     return this.raw.setHeader(key, value);
  //   };
  //   reply.end = function () {
  //     this.raw.end();
  //   };
  //   request.res = reply;
  //   done();
  // });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      bodyParser: true,
      logger: isDevelopment ? ['verbose'] : ['error', 'warn'],
      cors: true,
    },
  );

  const logger = app.get(Logger);

  try {
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

    app.enableVersioning({
      defaultVersion: '1',
      type: VersioningType.URI,
    });

    await setupApiDoc(app);

    app.useLogger(nestWinston);
    app.useGlobalFilters(new HttpExceptionFilter(nestWinston));

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
  } catch (error) {
    logger.error(error);
  }
}

bootstrap();
