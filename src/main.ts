import { NestFactory } from '@nestjs/core';
import { Logger, LoggerService } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './modules/@core/app/app.module';
import { writeFileSync } from 'fs';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const { PORT = 5000 } = process.env;

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //security
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true
  });

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

  writeFileSync('swagger.json', JSON.stringify(document));

  await app.listen(PORT);

  Logger.log(`Server running on http://localhost:${PORT}`, 'Bootstrap');
}
bootstrap();
