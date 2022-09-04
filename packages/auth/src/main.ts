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
import { Logger, ValidationPipe } from '@nestjs/common';
import fastifyHelmet from '@fastify/helmet';
import { UserSession } from './utils';
import Fastify from 'fastify';
import { i18nValidationErrorFactory } from 'nestjs-i18n';

declare module 'fastify' {
  interface FastifyRequest {
    user: UserSession;
  }
}

const isDevelopment = process.env.NODE_ENV === 'development';

async function bootstrap() {
  const fastify = Fastify();

  // compat express
  fastify.addHook('onRequest', (request: any, reply: any, done) => {
    reply.setHeader = function (key, value) {
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

  const logger = app.get<Logger>(Logger);

  try {
    const configService = app.get<ConfigService>(ConfigService);
    const nacosConfigService = app.get<NacosConfigService>(NacosConfigService);
    const authConfigs = await nacosConfigService.getConfig('service-auth.json');
    const nestWinston = app.get(WINSTON_MODULE_NEST_PROVIDER);

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        enableDebugMessages: isDevelopment,
        whitelist: true,
        forbidNonWhitelisted: true,
        exceptionFactory: i18nValidationErrorFactory,
      }),
    );

    await app.register(fastifyHelmet as any, {
      global: true,
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [`'self'`],
          styleSrc: [`'self'`, `'unsafe-inline'`],
          imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
        },
      },
      enableCSPNonces: true,
      referrerPolicy: true,
    });

    await setupAuthApiDoc(app);

    app.useLogger(nestWinston);
    app.useGlobalFilters(new HttpExceptionFilter(nestWinston));

    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.RMQ,
      options: {
        urls: authConfigs.rabbitmq.urls,
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
