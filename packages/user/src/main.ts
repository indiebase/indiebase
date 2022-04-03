import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
