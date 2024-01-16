import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: configService.get('WEB_URL'),
    methods: 'GET',
    allowedHeaders: 'Content-Type, Authorization',
  });
  await app.listen(3005);
}
bootstrap();
