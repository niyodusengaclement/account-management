import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import * as compression from 'compression';
import helmet from 'helmet';
import { WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';
import { logger, setupSwagger } from './common/config';
import { PORT } from './common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(logger),
  });

  const log = app.get(Logger);

  /** Catch unhandled rejections
   * @param string
   */
  process.on('unhandledRejection', (e) => {
    log.error(e);
    process.exit(1);
  });

  app.enableCors({ origin: '*' });

  /**
   * Add global prefix '<host>/api/'
   */
  app.setGlobalPrefix('api');

  /**
   * Set up Swagger documentation
   * @returns void
   */
  setupSwagger(app);

  /**
   * Use global validation pipe
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  /**
   * Set up bodyParser and data limit
   */
  app.use(json({ limit: '10mb' }));
  app.use(
    urlencoded({ limit: '10mb', extended: true, parameterLimit: 1000000 }),
  );

  /**
   * Set security headers
   */
  app.use(helmet());

  /**
   * Compress the app
   */
  app.use(compression());

  /**
   * Start the app
   * @param port
   * @param callback
   */
  await app.listen(PORT, async () =>
    console.log(`Server is running on port ${PORT}`),
  );
}

bootstrap();
