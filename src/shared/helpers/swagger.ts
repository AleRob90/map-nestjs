import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import * as basicAuth from 'express-basic-auth';

export function addSwaggerDoc(app: INestApplication): void {
  app.use(
    ['/api/docs', '/api/docs-json'],
    basicAuth({
      challenge: true,
      users: {
        ['user@domain.com']: 'user-password',
      },
    }),
  );

  const jwtSecurityScheme: SecuritySchemeObject = {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    description:
      'The JWT token based bearer authentication token in Authorization header.',
  };

  const config = new DocumentBuilder()
    .setTitle('Map APP')
    .setDescription('Map APP REST API documentation')
    .setVersion('0.0.1')
    .addBearerAuth(jwtSecurityScheme, 'JwtAuth')
    .setDescription('Map APP API endpoints detailed documentation.')
    .setExternalDoc('Download OpenAPI json specifications', '/api/docs-json')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const swaggerCustomOptions: SwaggerCustomOptions = {
    customSiteTitle: 'NestJS Map API Documentation',
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      docExpansion: 'none',
      filter: true,
      tryItOutEnabled: true,
      authActions: {
        bearerAuth: {
          name: 'JwtAuth',
          schema: jwtSecurityScheme,
        },
      },
    },
  };
  SwaggerModule.setup('api/docs', app, document, swaggerCustomOptions);
}
