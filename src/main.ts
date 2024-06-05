import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as FileStore from 'session-file-store';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder().setTitle('FE features').build();
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: 'http://localhost:4200',
  });
  app.use(
    session({
      // TODO add key
      secret: 'some-secret-key',
      resave: true,
      saveUninitialized: false,
      store: new (FileStore(session))({
        path: './ses-store',
      }),
    }),
  );
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-swagger', app, document);
  await app.listen(3000);
}
bootstrap();

// TODO:
// + зробити схему для таблиці ... для ордерів,ORDER {_orderID(cам створиться), idUser: '', wayToPayId: '', orderList: [ids..]}
// !зробила, але не можу додати к-сть qty до повного списку продуктів щздерів, які відправляю на фронтенд адміну
