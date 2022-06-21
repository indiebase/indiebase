import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NacosConfigService } from '@letscollab/nest-nacos';
import {
  FormatExceptionFilter,
  MicroExceptionFilter,
} from '@letscollab/helper';
import { setupUserApiDoc } from './utils';
// import { i18nValidationErrorFactory } from 'nestjs-i18n';

const isDevelopment = process.env.NODE_ENV === 'development';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: isDevelopment ? ['verbose'] : ['error', 'warn'],
      bodyParser: true,
    },
  );

  const logger = app.get<Logger>(Logger);

  try {
    const configService = app.get<ConfigService>(ConfigService);
    const nacosConfigService = app.get<NacosConfigService>(NacosConfigService);

    const userConfigs = await nacosConfigService.getConfig('service-user.json');

    app.setGlobalPrefix('api');

    // setup swagger
    await setupUserApiDoc(app);

    //dto international
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        enableDebugMessages: isDevelopment,
        whitelist: true,
        forbidNonWhitelisted: true,
        // exceptionFactory: i18nValidationErrorFactory,
      }),
    );

    const nestWinston = app.get(WINSTON_MODULE_NEST_PROVIDER);
    app.useLogger(nestWinston);

    app.useGlobalFilters(
      new FormatExceptionFilter(nestWinston),
      new MicroExceptionFilter(nestWinston),
    );

    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.RMQ,
      options: {
        urls: userConfigs.rabbitmq.urls,
        queue: 'user_queue',
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
