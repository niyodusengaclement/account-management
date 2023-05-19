import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

const config = new DocumentBuilder()
  .addBearerAuth({ type: 'http', scheme: 'bearer' })
  .setTitle('Account management API Docs')
  .setDescription('Account management API documentation')
  .setVersion('1.0.0')
  .addTag('Home')
  .addTag('Authentication')
  .addTag('Profile')
  .build();

const customOptions: SwaggerCustomOptions = {
  customSiteTitle: 'Account management API Doc',
  swaggerOptions: {
    persistAuthorization: true,
  },
};

export const setupSwagger = (app: INestApplication): void => {
  const document = SwaggerModule.createDocument(app, config);
  return SwaggerModule.setup('api-docs', app, document, customOptions);
};
