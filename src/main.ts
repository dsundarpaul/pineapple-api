import { NestFactory } from '@nestjs/core';
import { Logger, LoggerService } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './modules/@core/app/app.module';

async function bootstrap() {
  const { PORT = 5000 } = process.env;

  const app = await NestFactory.create(AppModule);

  //security
  app.enableCors();

  // const loggerService = app.get<LoggerService>(LoggerService);

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Pineapple API')
    .setDescription('The Pineapple API description')
    .setVersion('1.0')
    // .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);

  Logger.log(`Server running on http://localhost:${PORT}`, 'Bootstrap');
}
bootstrap();
