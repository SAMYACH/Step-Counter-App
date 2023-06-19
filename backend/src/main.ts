/* eslint-disable @typescript-eslint/no-unused-vars */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/exception.filter';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { TestGuard } from './User/guards/test-guard';
/**
 * bootstarp function to satrt application
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // app.enableVersioning({
  //   type: VersioningType.URI,
  //   defaultVersion: ['1', '2', '3'],
  // });

  /**
   * to satrt document builder
   */
  const config = new DocumentBuilder()
    .setTitle('Company-leaderboard')
    .setDescription('Company Leaderboard Application')
    .setVersion('v1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(5000);
}
bootstrap();

//.setContact('diya','','abc@hcl.com')
