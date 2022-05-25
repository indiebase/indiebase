import { NacosConfigService } from '@letscollab/nest-nacos';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { FormatExceptionFilter } from '@letscollab/helper';
import { setupAuthApiDoc } from './utils';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import fastifyCookie from 'fastify-cookie';
import { ValidationPipe } from '@nestjs/common';
import { fastifyHelmet } from '@fastify/helmet';

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      bodyParser: true,
      logger: isDevelopment ? ['verbose'] : ['error', 'warn'],
    },
  );

  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const nacosConfigService: NacosConfigService =
    app.get<NacosConfigService>(NacosConfigService);

  const authConfigs = await nacosConfigService.getConfig('service-auth.json');
  const commonConfigs = await nacosConfigService.getConfig('common.json');

  // 接口版本
  app.setGlobalPrefix('v1');

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

  await app.register(fastifyCookie, {
    secret: commonConfigs?.security?.cookieSecret,
  });

  await app.register(fastifyHelmet, {
    global: true,
    contentSecurityPolicy: {},
    enableCSPNonces: true,
    referrerPolicy: true,
  });

  const nestWinston = app.get(WINSTON_MODULE_NEST_PROVIDER);

  app.useLogger(nestWinston);

  app.useGlobalFilters(new FormatExceptionFilter(nestWinston));

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
}

bootstrap();
