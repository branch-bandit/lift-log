import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // todo: only enable cors in dev mode
  app.enableCors();

  // if (process.env.NODE_ENV === 'development') {
  // app.enableCors();
  // }

  await app.listen(3001);
}
bootstrap();
