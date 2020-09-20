import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // set swagger options
  const options = new DocumentBuilder()
    .setTitle('Quotes API')
    .setDescription('API to create and retrieve quotes')
    .setVersion('1.0')
    .addTag('quotes')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
