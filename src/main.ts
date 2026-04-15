import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import type { RequestHandler } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cookieParserMiddleware = cookieParser as unknown as () => RequestHandler;

  app.use(cookieParserMiddleware());

  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch(() => {
  console.log('error');
});
