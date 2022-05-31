import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NacosConfigService } from '@letscollab/nest-nacos';
import {
  FormatExceptionFilter,
  MicroExceptionFilter,
} from '@letscollab/helper';
import fastifyCookie from 'fastify-cookie';
import { setupUserApiDoc } from './utils';
// import { i18nValidationErrorFactory } from 'nestjs-i18n';

const isProduction = process.env.NODE_ENV === 'production';
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

  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const nacosConfigService: NacosConfigService =
    app.get<NacosConfigService>(NacosConfigService);

  const userConfigs = await nacosConfigService.getConfig('service-user.json');
  const commonConfigs = await nacosConfigService.getConfig('common.json');

  app.setGlobalPrefix('v1');

  // 配置swagger
  await setupUserApiDoc(app);

  //dto 国际化
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
}

bootstrap();
