import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { setupUserApiDoc } from './utils/swagger.utils';
import { ValidationPipe } from '@nestjs/common';
import { i18nValidationErrorFactory } from 'nestjs-i18n';

const ENV = process.env.NODE_ENV;
const isProd = ENV === 'production';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // 配置swagger
  ENV !== 'production' && (await setupUserApiDoc(app));

  //dto 国际化
  app.useGlobalPipes(
    new ValidationPipe({
      // exceptionFactory: i18nValidationErrorFactory,
    }),
  );

  const configService: ConfigService = app.get<ConfigService>(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: configService.get('app.user_micro_port'),
      host: configService.get('app.user_micro_host'),
    },
  });

  await app.listen(
    configService.get('app.port'),
    configService.get('app.hostname'),
  );
}

bootstrap();
