import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get<ConfigService>(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: configService.get('app.auth_micro_port'),
      host: configService.get('app.auth_micro_host'),
    },
  });
  await app.listen(
    configService.get('app.port'),
    configService.get('app.hostname'),
  );
}

bootstrap();
