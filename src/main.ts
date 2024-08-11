import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const configService = app.get(ConfigService);

  const port = configService.get<number>('port');

  await app.listen(port);
  Logger.log(`Application running on port ${port}`);
}
bootstrap();
