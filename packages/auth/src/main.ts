import { NacosConfigService } from '@letscollab/nest-nacos';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import {
  FormatExceptionFilter,
  MicroExceptionFilter,
} from '@letscollab/helper';
import { setupAuthApiDoc } from './utils';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger, ValidationPipe } from '@nestjs/common';
import { fastifyHelmet } from '@fastify/helmet';

import Fastify from 'fastify';

const isDevelopment = process.env.NODE_ENV === 'development';

async function bootstrap() {
  try {
    const fastify = Fastify();

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
      new FastifyAdapter(fastify),
      {
        bodyParser: true,
        logger: isDevelopment ? ['verbose'] : ['error', 'warn'],
        cors: true,
      },
    );

    const configService: ConfigService = app.get<ConfigService>(ConfigService);
    const logger: ConfigService = app.get<ConfigService>(Logger);
    const nacosConfigService: NacosConfigService =
      app.get<NacosConfigService>(NacosConfigService);

    const authConfigs = await nacosConfigService.getConfig('service-auth.json');
    const commonConfigs = await nacosConfigService.getConfig('common.json');

    // 接口版本
    app.setGlobalPrefix('api');

    await setupAuthApiDoc(app);

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        enableDebugMessages: isDevelopment,
        whitelist: true,
        forbidNonWhitelisted: true,
        // exceptionFactory: i18nValidationErrorFactory,
      }),
    );

    // await app.register(fastifyCookie, {
    //   secret: commonConfigs?.security?.cookieSecret,
    // });

    // app.register(fastifySession, {
    //   secret: authConfigs.session.secret,
    //   cookie: {
    //     secure: true,
    //     httpOnly: true,
    //   },
    // });

    // await app.register(secureSession, authConfigs.session);

    // console.log('=-==================================');

    await app.register(fastifyHelmet, {
      global: true,
      contentSecurityPolicy: {},
      enableCSPNonces: true,
      referrerPolicy: true,
    });

    const nestWinston = app.get(WINSTON_MODULE_NEST_PROVIDER);

    app.useLogger(nestWinston);

    app.useGlobalFilters(
      new FormatExceptionFilter(nestWinston),
      new MicroExceptionFilter(nestWinston),
    );

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
    console.log(error);
  }
}

bootstrap();
