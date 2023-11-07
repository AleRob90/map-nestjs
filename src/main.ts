import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { addSwaggerDoc } from './shared/helpers/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      validationError: { target: false, value: false },
      whitelist: true,
      transform: true,
    }),
  );
  addSwaggerDoc(app);
  await app.listen(3000);
}
bootstrap();
